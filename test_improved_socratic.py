#!/usr/bin/env python3
"""
Test script to verify the improved Socratic AI responses
"""
import requests
import json

# Backend URL
BACKEND_URL = "https://ap-helper-2d9f117e9bdb.herokuapp.com"

def test_tell_me_about_requests():
    """Test 'tell me about X' type requests"""
    print("🧪 Testing 'Tell Me About' Requests")
    print("=" * 50)
    
    test_cases = [
        {
            "message": "Tell me about european technological advantages",
            "expected": "informative_response"
        },
        {
            "message": "Tell me about native american agriculture", 
            "expected": "informative_response"
        },
        {
            "message": "Tell me about the columbian exchange",
            "expected": "informative_response"
        },
        {
            "message": "Tell me about spanish colonization impact",
            "expected": "informative_response"
        }
    ]
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n📝 Test {i}: {test_case['message']}")
        
        payload = {
            "message": test_case["message"],
            "course": "apush",
            "unit": "unit1",
            "context": {
                "currentTopic": None,
                "unitProgress": 0.5,
                "difficulty": "intermediate"
            }
        }
        
        try:
            response = requests.post(
                f"{BACKEND_URL}/api/chat/send",
                json=payload,
                headers={'Content-Type': 'application/json'},
                timeout=20
            )
            
            if response.status_code == 200:
                data = response.json()
                response_text = data.get('response', '')
                source = data.get('source', 'unknown')
                
                print(f"   ✅ Response received (source: {source})")
                print(f"   📏 Length: {len(response_text)} characters")
                print(f"   📄 Preview: {response_text[:200]}...")
                
                # Check if response is informative (not just questions)
                if len(response_text) > 100 and ('•' in response_text or 'Key' in response_text):
                    print(f"   🎯 Response appears informative!")
                else:
                    print(f"   ⚠️  Response may still be too Socratic")
                    
            else:
                print(f"   ❌ HTTP Error: {response.status_code}")
                
        except Exception as e:
            print(f"   ❌ Error: {e}")

def test_confusion_responses():
    """Test responses to user confusion"""
    print(f"\n🤔 Testing Confusion Responses")
    print("=" * 50)
    
    confusion_messages = [
        "im confused",
        "i'm not sure", 
        "i dont understand",
        "help me"
    ]
    
    for message in confusion_messages:
        print(f"\n📝 Testing: '{message}'")
        
        payload = {
            "message": message,
            "course": "apush", 
            "unit": "unit1",
            "context": {"currentTopic": None, "unitProgress": 0.0}
        }
        
        try:
            response = requests.post(
                f"{BACKEND_URL}/api/chat/send",
                json=payload,
                headers={'Content-Type': 'application/json'},
                timeout=15
            )
            
            if response.status_code == 200:
                data = response.json()
                response_text = data.get('response', '')
                
                print(f"   ✅ Response: {response_text[:150]}...")
                
                if any(helpful_word in response_text.lower() for helpful_word in ['help', 'let me', 'start', 'specific']):
                    print(f"   🎯 Response is helpful!")
                else:
                    print(f"   ⚠️  Response could be more helpful")
                    
        except Exception as e:
            print(f"   ❌ Error: {e}")

if __name__ == "__main__":
    print("🚀 Testing Improved Socratic AI")
    print("=" * 60)
    
    test_tell_me_about_requests()
    test_confusion_responses()
    
    print(f"\n🎉 Testing Complete!")
    print("\n💡 Key improvements expected:")
    print("  - 'Tell me about X' should provide informative responses with bullet points")
    print("  - Confusion should get helpful guidance, not just questions")
    print("  - Responses should teach first, then guide with questions")
