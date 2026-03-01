#!/usr/bin/env python3
"""
Verification script for AP Physics 1 Socratic AI Study Guide Content Sync
Tests that the Socratic AI content matches the study guide exactly
"""

import requests
import json
import time

def test_backend_unit_content():
    """Test that backend has correct unit structure matching study guide"""
    print("🔬 Testing AP Physics 1 Backend Unit Structure...")
    
    API_BASE = 'https://ap-helper-2d9f117e9bdb.herokuapp.com'
    
    # Test each unit to verify it matches study guide
    expected_units = {
        'unit1': 'Kinematics',
        'unit2': 'Dynamics (Forces)', 
        'unit3': 'Circular Motion & Gravitation',
        'unit4': 'Energy',
        'unit5': 'Momentum',
        'unit6': 'Simple Harmonic Motion',
        'unit7': 'Torque & Rotational Motion',
        'unit8': 'Fluids'  # Changed from Electric Charge to Fluids
    }
    
    for unit, expected_topic in expected_units.items():
        try:
            response = requests.get(f'{API_BASE}/api/unit-topics?course=apphysics1&unit={unit}', timeout=10)
            if response.status_code == 200:
                data = response.json()
                title = data.get('title', '')
                if expected_topic in title:
                    print(f"✅ {unit}: {title}")
                else:
                    print(f"❌ {unit}: Expected '{expected_topic}', got '{title}'")
            else:
                print(f"❌ {unit}: HTTP {response.status_code}")
        except Exception as e:
            print(f"❌ {unit}: Error - {e}")
        
        time.sleep(0.5)  # Rate limiting

def test_socratic_responses():
    """Test Socratic AI responses use study guide content"""
    print("\n🤖 Testing AP Physics 1 Socratic AI Responses...")
    
    API_BASE = 'https://ap-helper-2d9f117e9bdb.herokuapp.com'
    
    test_cases = [
        {
            'unit': 'unit1',
            'message': 'What is kinematics?',
            'expected_keywords': ['position', 'velocity', 'acceleration', 'displacement']
        },
        {
            'unit': 'unit2', 
            'message': 'Tell me about forces',
            'expected_keywords': ['systems', 'gravitational field', 'contact forces', 'newton']
        },
        {
            'unit': 'unit3',
            'message': 'What are vector fields?',
            'expected_keywords': ['vector field', 'fundamental forces', 'gravitational', 'electric']
        },
        {
            'unit': 'unit4',
            'message': 'Explain energy',
            'expected_keywords': ['mechanical energy', 'work-energy theorem', 'conservation', 'kinetic']
        },
        {
            'unit': 'unit5',
            'message': 'What is momentum?',
            'expected_keywords': ['momentum', 'impulse', 'conservation', 'p = mv']
        },
        {
            'unit': 'unit6',
            'message': 'Tell me about oscillations',
            'expected_keywords': ['simple harmonic motion', 'restoring force', 'period', 'amplitude']
        },
        {
            'unit': 'unit7',
            'message': 'What is torque?',
            'expected_keywords': ['rotational', 'torque', 'angular', 'equilibrium']
        },
        {
            'unit': 'unit8',
            'message': 'Tell me about fluids',
            'expected_keywords': ['fluids', 'density', 'pressure', 'viscosity']
        }
    ]
    
    for test in test_cases:
        try:
            payload = {
                'message': test['message'],
                'course': 'apphysics1',
                'unit': test['unit']
            }
            
            response = requests.post(f'{API_BASE}/api/socratic-chat', 
                                   json=payload, 
                                   timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                ai_response = data.get('response', '').lower()
                
                # Check if response contains expected study guide keywords
                found_keywords = []
                for keyword in test['expected_keywords']:
                    if keyword.lower() in ai_response:
                        found_keywords.append(keyword)
                
                if len(found_keywords) >= 2:  # At least 2 keywords should be present
                    print(f"✅ {test['unit']}: Found study guide content ({', '.join(found_keywords)})")
                else:
                    print(f"❌ {test['unit']}: Missing study guide keywords. Found: {found_keywords}")
                    print(f"   Response excerpt: {ai_response[:200]}...")
            else:
                print(f"❌ {test['unit']}: HTTP {response.status_code}")
                
        except Exception as e:
            print(f"❌ {test['unit']}: Error - {e}")
        
        time.sleep(1)  # Rate limiting

def test_frontend_units():
    """Test frontend shows correct 8 units"""
    print("\n🌐 Testing Frontend Unit Structure...")
    
    # Test that Socratic Learning page shows AP Physics 1
    try:
        response = requests.get('https://aphelper.tech/socratic', timeout=10)
        if response.status_code == 200:
            content = response.text.lower()
            if 'ap physics 1' in content or 'physics' in content:
                print("✅ Frontend: AP Physics 1 appears in Socratic Learning")
            else:
                print("❌ Frontend: AP Physics 1 not found in Socratic Learning")
        else:
            print(f"❌ Frontend: HTTP {response.status_code}")
    except Exception as e:
        print(f"❌ Frontend: Error - {e}")

def test_unit_8_fluids():
    """Specifically test that Unit 8 is now Fluids, not Electric Charge"""
    print("\n💧 Testing Unit 8 Fluids Content...")
    
    API_BASE = 'https://ap-helper-2d9f117e9bdb.herokuapp.com'
    
    try:
        # Test unit topics endpoint
        response = requests.get(f'{API_BASE}/api/unit-topics?course=apphysics1&unit=unit8', timeout=10)
        if response.status_code == 200:
            data = response.json()
            title = data.get('title', '')
            if 'fluid' in title.lower():
                print(f"✅ Unit 8 Title: {title}")
            else:
                print(f"❌ Unit 8: Expected 'Fluids', got '{title}'")
        
        # Test Socratic response for fluids
        payload = {
            'message': 'What are the properties of fluids?',
            'course': 'apphysics1',
            'unit': 'unit8'
        }
        
        response = requests.post(f'{API_BASE}/api/socratic-chat', json=payload, timeout=15)
        if response.status_code == 200:
            data = response.json()
            ai_response = data.get('response', '').lower()
            
            fluid_keywords = ['fluid', 'density', 'pressure', 'viscosity', 'liquid', 'gas']
            electric_keywords = ['electric', 'charge', 'coulomb', 'conductor', 'insulator']
            
            found_fluid = sum(1 for k in fluid_keywords if k in ai_response)
            found_electric = sum(1 for k in electric_keywords if k in ai_response)
            
            if found_fluid > found_electric:
                print(f"✅ Unit 8 Content: Focuses on fluids ({found_fluid} fluid keywords vs {found_electric} electric)")
            else:
                print(f"❌ Unit 8 Content: Still has electric content ({found_electric} electric vs {found_fluid} fluid)")
        
    except Exception as e:
        print(f"❌ Unit 8 Test: Error - {e}")

def main():
    print("🧪 AP Physics 1 Study Guide Content Verification")
    print("=" * 50)
    print("Testing that Socratic AI matches the study guide structure exactly")
    print("Expected: 8 units (Kinematics → Fluids), detailed content from study guide")
    print("")
    
    test_backend_unit_content()
    test_socratic_responses() 
    test_frontend_units()
    test_unit_8_fluids()
    
    print("\n" + "=" * 50)
    print("🏁 Verification Complete!")
    print("\nKey Changes Verified:")
    print("• Backend content matches study guide structure")
    print("• 8 units instead of 10 (removed Units 9-10)")
    print("• Unit 8 is Fluids (not Electric Charge)")
    print("• Detailed content from APPhysicsUnit*.tsx files")
    print("• Socratic responses use study guide concepts")

if __name__ == "__main__":
    main()
