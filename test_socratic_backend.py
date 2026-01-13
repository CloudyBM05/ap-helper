#!/usr/bin/env python3
"""
Test script to verify Socratic chat functionality end-to-end
"""

import requests
import json

# Test endpoints
BASE_URL = "https://ap-helper-2d9f117e9bdb.herokuapp.com"

def test_unit_topics():
    """Test the unit topics endpoint"""
    print("🧪 Testing /api/unit-topics endpoint...")
    
    response = requests.get(f"{BASE_URL}/api/unit-topics", params={
        "course": "apush",
        "unit": "unit1"
    })
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Unit topics loaded successfully")
        print(f"   Course: {data['course']}")
        print(f"   Unit: {data['unit']}")
        print(f"   Topics count: {len(data['topics'])}")
        for topic in data['topics'][:2]:  # Show first 2 topics
            print(f"   - {topic['title']}")
        return True
    else:
        print(f"❌ Failed: {response.status_code} - {response.text}")
        return False

def test_chat_endpoint():
    """Test the Socratic chat endpoint"""
    print("\n🧪 Testing /api/chat/send endpoint...")
    
    payload = {
        "message": "I don't know anything about this period",
        "course": "apush", 
        "unit": "unit1",
        "userId": "test-user",
        "conversationHistory": []
    }
    
    response = requests.post(f"{BASE_URL}/api/chat/send", 
                           headers={"Content-Type": "application/json"},
                           json=payload)
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Chat response received successfully")
        print(f"   Response: {data['response'][:100]}...")
        print(f"   Source: {data.get('source', 'unknown')}")
        print(f"   Topic: {data.get('topicFocus', 'general')}")
        return True
    else:
        print(f"❌ Failed: {response.status_code} - {response.text}")
        return False

def test_chat_with_topic():
    """Test chat with a specific topic question"""
    print("\n🧪 Testing specific topic question...")
    
    payload = {
        "message": "Tell me about Native American societies before Columbus",
        "course": "apush",
        "unit": "unit1", 
        "userId": "test-user",
        "conversationHistory": []
    }
    
    response = requests.post(f"{BASE_URL}/api/chat/send",
                           headers={"Content-Type": "application/json"},
                           json=payload)
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Topic-specific chat response received")
        print(f"   Response: {data['response'][:150]}...")
        print(f"   Progress update: {bool(data.get('progressUpdate'))}")
        print(f"   Overall progress: {data.get('overallProgress', 0)}%")
        return True
    else:
        print(f"❌ Failed: {response.status_code} - {response.text}")
        return False

def main():
    print("🚀 Testing Socratic Chat Backend Integration\n")
    
    tests = [
        test_unit_topics,
        test_chat_endpoint, 
        test_chat_with_topic
    ]
    
    passed = 0
    for test in tests:
        if test():
            passed += 1
            
    print(f"\n📊 Results: {passed}/{len(tests)} tests passed")
    
    if passed == len(tests):
        print("✅ All tests passed! The Socratic chat backend is working correctly.")
        print("\n🎯 Ready for frontend testing:")
        print("   1. Open https://aphelper.tech/socratic-chat/apush/unit1")
        print("   2. Try chatting with questions like:")
        print("      - 'I don't know anything about this'")  
        print("      - 'Tell me about Native Americans'")
        print("      - 'What motivated European exploration?'")
    else:
        print("❌ Some tests failed. Please check the backend deployment.")

if __name__ == "__main__":
    main()
