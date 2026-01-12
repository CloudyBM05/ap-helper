#!/usr/bin/env python3
"""
Comprehensive test script for AP Government Socratic AI functionality
Tests all key features: topics loading, chat responses, progress tracking
"""

import requests
import json
import time

# Test configuration
BASE_URL = "http://127.0.0.1:8080"
HEADERS = {"Content-Type": "application/json"}

def test_unit_topics():
    """Test that all AP Gov units load topics correctly"""
    print("🧪 Testing AP Gov Unit Topics...")
    
    for unit_num in range(1, 6):
        unit = f"unit{unit_num}"
        url = f"{BASE_URL}/api/unit-topics"
        params = {"course": "apgov", "unit": unit}
        
        try:
            response = requests.get(url, params=params)
            if response.status_code == 200:
                data = response.json()
                topics_count = len(data.get("topics", []))
                print(f"  ✅ AP Gov {unit.upper()}: {topics_count} topics loaded")
                print(f"     Overview: {data.get('overview', '')[:80]}...")
            else:
                print(f"  ❌ AP Gov {unit.upper()}: HTTP {response.status_code}")
        except Exception as e:
            print(f"  ❌ AP Gov {unit.upper()}: Error - {e}")
    
def test_socratic_responses():
    """Test different types of Socratic AI responses"""
    print("\n🧪 Testing AP Gov Socratic AI Responses...")
    
    test_scenarios = [
        {
            "name": "Complete Beginner",
            "message": "I don't know anything about government",
            "unit": "unit1",
            "expected_keywords": ["overview", "foundation", "democracy"]
        },
        {
            "name": "Explanation Request", 
            "message": "Can you explain federalism?",
            "unit": "unit1",
            "expected_keywords": ["federalism", "concepts", "key facts"]
        },
        {
            "name": "Specific Topic",
            "message": "What is separation of powers?",
            "unit": "unit1", 
            "expected_keywords": ["separation", "powers", "branches"]
        },
        {
            "name": "Civil Rights Topic",
            "message": "Tell me about the Civil Rights Movement",
            "unit": "unit3",
            "expected_keywords": ["civil rights", "movement", "freedoms"]
        },
        {
            "name": "Elections Topic",
            "message": "How do elections work?",
            "unit": "unit5",
            "expected_keywords": ["elections", "voting", "participation"]
        }
    ]
    
    for scenario in test_scenarios:
        payload = {
            "message": scenario["message"],
            "course": "apgov",
            "unit": scenario["unit"], 
            "userId": f"test_{scenario['name'].lower().replace(' ', '_')}",
            "detectedTopic": "general",
            "conversationHistory": []
        }
        
        try:
            response = requests.post(f"{BASE_URL}/api/chat/send", 
                                   headers=HEADERS, 
                                   json=payload)
            
            if response.status_code == 200:
                data = response.json()
                response_text = data.get("response", "").lower()
                
                # Check if response contains expected keywords
                keyword_found = any(keyword.lower() in response_text 
                                  for keyword in scenario["expected_keywords"])
                
                progress = data.get("overallProgress", 0)
                concepts_learned = len(data.get("conceptsLearned", {}))
                
                if keyword_found and len(response_text) > 50:
                    print(f"  ✅ {scenario['name']}: Good response, {concepts_learned} concepts, {progress:.1f}% progress")
                else:
                    print(f"  ⚠️  {scenario['name']}: Response may be generic")
                    print(f"     Response: {response_text[:100]}...")
            else:
                print(f"  ❌ {scenario['name']}: HTTP {response.status_code}")
                
        except Exception as e:
            print(f"  ❌ {scenario['name']}: Error - {e}")
        
        time.sleep(0.5)  # Rate limiting

def test_progress_tracking():
    """Test that learning progress accumulates correctly"""
    print("\n🧪 Testing AP Gov Progress Tracking...")
    
    user_id = "progress_test_user"
    conversation_history = []
    
    # Simulate a learning conversation
    learning_sequence = [
        "I don't know anything about government",
        "Can you explain the Constitution?", 
        "What about federalism?",
        "How does separation of powers work?",
        "Tell me about checks and balances",
        "What are civil liberties?"
    ]
    
    for i, message in enumerate(learning_sequence):
        payload = {
            "message": message,
            "course": "apgov", 
            "unit": "unit1",
            "userId": user_id,
            "detectedTopic": "general",
            "conversationHistory": conversation_history
        }
        
        try:
            response = requests.post(f"{BASE_URL}/api/chat/send",
                                   headers=HEADERS,
                                   json=payload)
            
            if response.status_code == 200:
                data = response.json()
                
                # Track progress accumulation
                progress = data.get("overallProgress", 0)
                concepts_count = len(data.get("conceptsLearned", {}))
                sections_learned = data.get("sectionsLearned", 0)
                ready_for_assessment = data.get("readyForFinalAssessment", False)
                
                print(f"  Step {i+1}: {progress:.1f}% complete, {concepts_count} concepts, {sections_learned} sections")
                
                # Add to conversation history
                conversation_history.append({"content": message, "sender": "user"})
                conversation_history.append({"content": data.get("response", ""), "sender": "ai"})
                
                if ready_for_assessment:
                    print(f"  ✅ Ready for assessment at step {i+1}!")
                    break
                    
        except Exception as e:
            print(f"  ❌ Step {i+1}: Error - {e}")
            
        time.sleep(0.5)

def test_multiple_units():
    """Test that different AP Gov units work correctly"""
    print("\n🧪 Testing Multiple AP Gov Units...")
    
    unit_tests = {
        "unit1": "What are the foundations of democracy?",
        "unit2": "How does Congress work?", 
        "unit3": "What are civil liberties?",
        "unit4": "What shapes political beliefs?",
        "unit5": "How do elections work?"
    }
    
    for unit, question in unit_tests.items():
        payload = {
            "message": question,
            "course": "apgov",
            "unit": unit,
            "userId": f"unit_test_{unit}",
            "detectedTopic": "general", 
            "conversationHistory": []
        }
        
        try:
            response = requests.post(f"{BASE_URL}/api/chat/send",
                                   headers=HEADERS,
                                   json=payload)
            
            if response.status_code == 200:
                data = response.json()
                response_text = data.get("response", "")
                concepts_count = len(data.get("conceptsLearned", {}))
                
                if len(response_text) > 50 and concepts_count > 0:
                    print(f"  ✅ {unit.upper()}: Good response with {concepts_count} concepts")
                else:
                    print(f"  ⚠️  {unit.upper()}: Response may be limited")
            else:
                print(f"  ❌ {unit.upper()}: HTTP {response.status_code}")
                
        except Exception as e:
            print(f"  ❌ {unit.upper()}: Error - {e}")

def main():
    """Run all AP Gov Socratic AI tests"""
    print("🚀 AP Government Socratic AI Comprehensive Test")
    print("=" * 50)
    
    try:
        # Test server connectivity
        response = requests.get(f"{BASE_URL}/api/unit-topics?course=apgov&unit=unit1")
        if response.status_code != 200:
            print("❌ Server not responding! Make sure grader_api.py is running.")
            return
            
        print("✅ Server is responding")
        
        # Run all tests
        test_unit_topics()
        test_socratic_responses() 
        test_progress_tracking()
        test_multiple_units()
        
        print("\n🎉 AP Gov Socratic AI testing complete!")
        print("   Check results above for any issues.")
        
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to server! Make sure grader_api.py is running on port 8080.")
    except Exception as e:
        print(f"❌ Test failed with error: {e}")

if __name__ == "__main__":
    main()
