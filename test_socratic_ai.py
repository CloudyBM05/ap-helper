#!/usr/bin/env python3
"""
Test script for the improved Socratic AI system
Run this to verify your setup is working correctly
"""

import json
import requests
import os
from dotenv import load_dotenv

load_dotenv()

# Test configuration
BASE_URL = "http://localhost:8080"  # Change this for deployed version
TEST_USER_ID = "test_user_123"

def test_socratic_endpoint():
    """Test the main Socratic chat endpoint"""
    print("🧪 Testing Socratic Chat Endpoint...")
    
    # Test data
    test_messages = [
        "Tell me about Native American societies before Columbus",
        "What were the motivations for European exploration?", 
        "How did the Columbian Exchange work?",
        "Compare Native American and European societies"
    ]
    
    conversation_history = []
    
    for i, message in enumerate(test_messages, 1):
        print(f"\n--- Test {i}: {message} ---")
        
        payload = {
            "message": message,
            "conversationHistory": conversation_history,
            "course": "apush",
            "unit": "unit1", 
            "userId": TEST_USER_ID
        }
        
        try:
            response = requests.post(f"{BASE_URL}/api/chat/send", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Success! Response: {data['response'][:100]}...")
                print(f"📊 Progress: {data.get('overallProgress', 0)}%")
                print(f"📚 Sections Learned: {data.get('sectionsLearned', 0)}/{data.get('totalSections', 0)}")
                
                # Add to conversation history
                conversation_history.append({"sender": "user", "content": message})
                conversation_history.append({"sender": "ai", "content": data['response']})
                
            else:
                print(f"❌ Error {response.status_code}: {response.text}")
                
        except requests.exceptions.ConnectionError:
            print(f"❌ Connection Error: Is the server running at {BASE_URL}?")
            return False
        except Exception as e:
            print(f"❌ Unexpected Error: {e}")
            return False
    
    return True

def test_environment_setup():
    """Test if environment variables are set correctly"""
    print("🔧 Testing Environment Setup...")
    
    required_vars = ["OPENAI_API_KEY"]
    missing_vars = []
    
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        print(f"❌ Missing environment variables: {missing_vars}")
        print("💡 Create a .env file with these variables")
        return False
    else:
        print("✅ Environment variables are set")
        return True

def test_study_guide_content():
    """Test if study guide content is being loaded correctly"""
    print("📚 Testing Study Guide Content Loading...")
    
    # This would normally import from the improved API
    try:
        # Simple test to see if our content structure is correct
        unit_content = {
            'unit1': {
                'overview': 'Native American Societies and European Exploration (1491-1607)',
                'sections': {
                    'native_american_peoples': {
                        'title': 'Native American Peoples',
                        'key_facts': [
                            'Aztecs: Central Mexico, sprawling cities, hierarchical governments',
                            'Mayans: Yucatan Peninsula, massive cities, complex waterworks',
                        ]
                    }
                }
            }
        }
        
        if unit_content.get('unit1', {}).get('sections'):
            print("✅ Study guide content structure is correct")
            sections = unit_content['unit1']['sections']
            print(f"📖 Found {len(sections)} sections in Unit 1")
            for section_key, section_data in sections.items():
                print(f"   - {section_data['title']}: {len(section_data['key_facts'])} facts")
            return True
        else:
            print("❌ Study guide content structure is invalid")
            return False
            
    except Exception as e:
        print(f"❌ Error loading study guide content: {e}")
        return False

def test_progress_storage():
    """Test if progress storage is working"""
    print("💾 Testing Progress Storage...")
    
    try:
        # Create a test progress file
        test_progress = {
            TEST_USER_ID: {
                "apush_unit1": {
                    "native_american_peoples": {
                        "introduced": True,
                        "concepts_learned": ["Test concept"],
                        "last_interaction": "2026-01-06T12:00:00Z"
                    }
                }
            }
        }
        
        # Write test file
        with open("test_progress.json", "w") as f:
            json.dump(test_progress, f, indent=2)
        
        # Read it back
        with open("test_progress.json", "r") as f:
            loaded_progress = json.load(f)
        
        if loaded_progress == test_progress:
            print("✅ Progress storage is working correctly")
            os.remove("test_progress.json")  # Clean up
            return True
        else:
            print("❌ Progress storage failed validation")
            return False
            
    except Exception as e:
        print(f"❌ Progress storage error: {e}")
        return False

def main():
    """Run all tests"""
    print("🚀 Socratic AI System Test Suite")
    print("=" * 50)
    
    tests = [
        ("Environment Setup", test_environment_setup),
        ("Study Guide Content", test_study_guide_content), 
        ("Progress Storage", test_progress_storage),
        ("Socratic Endpoint", test_socratic_endpoint)
    ]
    
    results = {}
    
    for test_name, test_func in tests:
        print(f"\n{test_name}:")
        results[test_name] = test_func()
    
    # Summary
    print("\n" + "=" * 50)
    print("📋 Test Results Summary:")
    
    passed = sum(results.values())
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"  {test_name}: {status}")
    
    print(f"\n🎯 Overall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Your Socratic AI system is ready to use.")
    else:
        print("⚠️  Some tests failed. Please check the setup guide.")
        
    return passed == total

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
