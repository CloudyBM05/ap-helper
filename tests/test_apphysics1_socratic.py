#!/usr/bin/env python3
"""
Test script to verify AP Physics 1 Socratic AI implementation is working correctly.
Tests both backend content retrieval and Socratic response generation.
"""
import requests
import json

def test_apphysics1_backend():
    """Test backend endpoints for AP Physics 1 content"""
    print("🔬 Testing AP Physics 1 Backend Implementation...")
    
    # Test unit topics endpoint
    base_url = "https://ap-helper-2d9f117e9bdb.herokuapp.com"
    
    # Test a few key units
    test_units = ['unit1', 'unit2', 'unit4', 'unit8', 'unit10']
    
    for unit in test_units:
        print(f"\n📍 Testing {unit} (Physics concepts)...")
        
        try:
            # Test unit topics API
            response = requests.get(f"{base_url}/api/unit-topics", params={
                'course': 'apphysics1',
                'unit': unit
            }, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data and 'topics' in data:
                    print(f"  ✅ Unit topics loaded: {len(data['topics'])} topics")
                    print(f"  📋 Overview: {data['overview'][:80]}...")
                else:
                    print(f"  ❌ No topics data found")
            else:
                print(f"  ❌ Failed to load unit topics: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            print(f"  ❌ Request error: {e}")
    
    # Test Socratic AI chat endpoint
    print(f"\n🤖 Testing Socratic AI responses...")
    
    test_questions = [
        {
            'unit': 'unit1',
            'question': 'What is velocity?',
            'topic': 'kinematics'
        },
        {
            'unit': 'unit2', 
            'question': 'Tell me about Newton\'s laws',
            'topic': 'forces'
        },
        {
            'unit': 'unit4',
            'question': 'How does energy conservation work?',
            'topic': 'energy'
        },
        {
            'unit': 'unit8',
            'question': 'What is electric charge?',
            'topic': 'electricity'
        },
        {
            'unit': 'unit10',
            'question': 'How do waves work?',
            'topic': 'waves'
        }
    ]
    
    for test in test_questions:
        print(f"\n🎯 Testing {test['topic']} question: '{test['question']}'")
        
        try:
            chat_data = {
                'message': test['question'],
                'conversationHistory': [],
                'course': 'apphysics1',
                'unit': test['unit'],
                'userId': 'test_user'
            }
            
            response = requests.post(f"{base_url}/api/chat/send", 
                                   json=chat_data, 
                                   timeout=15)
            
            if response.status_code == 200:
                result = response.json()
                if result and 'response' in result:
                    response_text = result['response']
                    print(f"  ✅ Got Socratic response ({len(response_text)} chars)")
                    print(f"  🤖 Source: {result.get('source', 'unknown')}")
                    print(f"  📝 Preview: {response_text[:100]}...")
                    
                    # Check if response is physics-related
                    physics_keywords = ['force', 'motion', 'energy', 'velocity', 'acceleration', 
                                      'charge', 'wave', 'electric', 'momentum', 'physics']
                    if any(keyword in response_text.lower() for keyword in physics_keywords):
                        print(f"  ✅ Response contains physics content")
                    else:
                        print(f"  ⚠️  Response may not be physics-specific")
                else:
                    print(f"  ❌ No response content found")
            else:
                print(f"  ❌ Socratic chat failed: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            print(f"  ❌ Chat request error: {e}")

def test_apphysics1_frontend():
    """Test that AP Physics 1 is visible in the frontend"""
    print(f"\n🌐 Testing Frontend Integration...")
    
    frontend_url = "https://cloudybm05.github.io/ap-helper"
    
    try:
        response = requests.get(f"{frontend_url}/socratic", timeout=10)
        if response.status_code == 200:
            print(f"  ✅ Frontend Socratic page accessible")
            
            # Check if physics is mentioned (basic check)
            if 'physics' in response.text.lower():
                print(f"  ✅ Physics mentioned in frontend")
            else:
                print(f"  ⚠️  Physics not found in page source")
        else:
            print(f"  ❌ Frontend not accessible: {response.status_code}")
            
    except requests.exceptions.RequestException as e:
        print(f"  ❌ Frontend request error: {e}")

def test_direct_physics_access():
    """Test direct access to AP Physics 1 chat"""
    print(f"\n🔗 Testing Direct Access to AP Physics 1...")
    
    frontend_url = "https://cloudybm05.github.io/ap-helper"
    
    test_urls = [
        f"{frontend_url}/socratic-chat/apphysics1/unit1",
        f"{frontend_url}/socratic-chat/apphysics1/unit4", 
        f"{frontend_url}/socratic-chat/physics1/unit1"
    ]
    
    for url in test_urls:
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                print(f"  ✅ {url.split('/')[-2:][-2:]} accessible")
            else:
                print(f"  ❌ {url.split('/')[-2:][-2:]} not accessible: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"  ❌ Error accessing {url.split('/')[-2:][-2:]}: {e}")

if __name__ == "__main__":
    print("🧪 AP Physics 1 Socratic AI Testing Suite")
    print("=" * 50)
    
    test_apphysics1_backend()
    test_apphysics1_frontend() 
    test_direct_physics_access()
    
    print(f"\n🎉 Testing Complete!")
    print(f"\n📋 Summary:")
    print(f"  • Backend: AP Physics 1 content and Socratic AI")
    print(f"  • Frontend: Socratic Learning page integration") 
    print(f"  • Direct access: Unit-specific chat pages")
    print(f"\n🚀 AP Physics 1 Socratic AI should now be live!")
    print(f"   Frontend: https://cloudybm05.github.io/ap-helper/socratic")
    print(f"   Backend:  https://ap-helper-2d9f117e9bdb.herokuapp.com/api/chat/send")
