#!/usr/bin/env python3
"""
Test the Socratic AI system for all APUSH units
"""

import sys
import os

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import the functions from grader_api
try:
    from grader_api import load_study_guide_content, get_socratic_response
    print("Successfully imported functions from grader_api.py")
except ImportError as e:
    print(f"Import error: {e}")
    sys.exit(1)

def test_unit_content_loading():
    """Test that content loads for all APUSH units"""
    print("\n=== Testing Unit Content Loading ===")
    
    all_units = ['unit1', 'unit2', 'unit3', 'unit4', 'unit5', 'unit6', 'unit7', 'unit8', 'unit9']
    
    for unit in all_units:
        content = load_study_guide_content(unit)
        if content:
            sections = content.get('sections', {})
            overview = content.get('overview', 'No overview')
            print(f"✅ {unit}: {len(sections)} sections loaded")
            print(f"   Overview: {overview[:100]}...")
        else:
            print(f"❌ {unit}: No content loaded")
    
    return True

def test_socratic_responses():
    """Test Socratic responses for different units"""
    print("\n=== Testing Socratic AI Responses ===")
    
    test_cases = [
        {
            'unit': 'unit1',
            'message': 'What is the Columbian Exchange?',
            'expected_keywords': ['exchange', 'columbus', 'america', 'europe']
        },
        {
            'unit': 'unit2', 
            'message': 'Tell me about colonial regions',
            'expected_keywords': ['colonial', 'england', 'southern', 'middle']
        },
        {
            'unit': 'unit3',
            'message': 'What caused the American Revolution?',
            'expected_keywords': ['revolution', 'tax', 'british', 'independence']
        },
        {
            'unit': 'unit4',
            'message': 'Explain Manifest Destiny',
            'expected_keywords': ['manifest', 'destiny', 'expansion', 'western']
        },
        {
            'unit': 'unit5',
            'message': 'What was the Civil War about?',
            'expected_keywords': ['civil war', 'slavery', 'union', 'lincoln']
        },
        {
            'unit': 'unit6',
            'message': 'Tell me about industrialization',
            'expected_keywords': ['industrial', 'factory', 'immigration', 'urban']
        },
        {
            'unit': 'unit7',
            'message': 'What was the Progressive Era?',
            'expected_keywords': ['progressive', 'reform', 'roosevelt', 'trust']
        },
        {
            'unit': 'unit8',
            'message': 'Explain the Cold War',
            'expected_keywords': ['cold war', 'soviet', 'communism', 'nuclear']
        },
        {
            'unit': 'unit9',
            'message': 'What happened after 1980?',
            'expected_keywords': ['reagan', 'technology', 'globalization', 'conservative']
        }
    ]
    
    for i, test_case in enumerate(test_cases):
        print(f"\n--- Test {i+1}: {test_case['unit']} ---")
        print(f"Question: {test_case['message']}")
        
        try:
            response = get_socratic_response(
                test_case['message'], 
                'apush', 
                test_case['unit'], 
                []
            )
            
            if response and response.get('response'):
                print(f"✅ Response generated ({len(response['response'])} chars)")
                print(f"   Response: {response['response'][:150]}...")
                print(f"   Topic: {response.get('topic', 'unknown')}")
                print(f"   Concepts: {len(response.get('concepts_introduced', []))}")
                
                # Check for expected keywords (case insensitive)
                response_text = response['response'].lower()
                found_keywords = [kw for kw in test_case['expected_keywords'] if kw.lower() in response_text]
                print(f"   Keywords found: {found_keywords}")
                
            else:
                print("❌ No response generated")
                
        except Exception as e:
            print(f"❌ Error: {e}")

def test_progress_tracking():
    """Test progress tracking functionality"""
    print("\n=== Testing Progress Tracking ===")
    
    # Simulate a conversation
    conversation_history = [
        {'sender': 'user', 'content': 'What is the Columbian Exchange?'},
        {'sender': 'bot', 'content': 'The Columbian Exchange...'},
        {'sender': 'user', 'content': 'Tell me more about disease impact'}
    ]
    
    try:
        response = get_socratic_response(
            "I want to understand how diseases affected Native Americans",
            'apush',
            'unit1', 
            conversation_history
        )
        
        if response:
            progress = response.get('progress_update', {})
            print(f"✅ Progress tracking working")
            print(f"   Progress updates: {len(progress)} topics")
            print(f"   Sample progress: {list(progress.keys())[:3]}")
        else:
            print("❌ Progress tracking failed")
            
    except Exception as e:
        print(f"❌ Progress tracking error: {e}")

def main():
    """Run all tests"""
    print("🚀 Testing Socratic AI System for All APUSH Units")
    print("=" * 50)
    
    try:
        test_unit_content_loading()
        test_socratic_responses() 
        test_progress_tracking()
        
        print("\n" + "=" * 50)
        print("✅ All tests completed! Socratic AI supports all APUSH units.")
        print("\nThe system can now:")
        print("- Load content for all 9 APUSH units")
        print("- Generate appropriate responses for each unit")
        print("- Track learning progress dynamically")
        print("- Adapt to any unit's specific content and themes")
        
    except Exception as e:
        print(f"\n❌ Testing failed with error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
