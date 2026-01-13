#!/usr/bin/env python3
"""Test the Socratic chat endpoint to verify it's working properly"""

import requests
import json

def test_socratic_chat():
    """Test the deployed Socratic chat system"""
    print("🧪 Testing Socratic Chat Endpoint")
    print("="*50)
    
    backend_url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/chat/send"
    
    test_cases = [
        {
            "message": "Tell me about this unit",
            "course": "apush",
            "unit": "unit3",
            "expected_topics": ["revolution", "constitution", "independence"]
        },
        {
            "message": "What about government?", 
            "course": "apgov",
            "unit": "unit1",
            "expected_topics": ["constitution", "federalism", "democracy"]
        },
        {
            "message": "How did trade work?",
            "course": "apworld", 
            "unit": "unit1",
            "expected_topics": ["silk roads", "trade", "exchange"]
        }
    ]
    
    for i, test in enumerate(test_cases, 1):
        print(f"\n🧪 Test {i}: {test['course'].upper()} {test['unit']}")
        print(f"Question: '{test['message']}'")
        
        try:
            response = requests.post(backend_url, json={
                "message": test["message"],
                "course": test["course"],
                "unit": test["unit"], 
                "conversationHistory": [],
                "userId": "test_user"
            }, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                ai_response = data.get('response', '')
                source = data.get('source', 'unknown')
                
                print(f"✅ Status: {response.status_code}")
                print(f"📡 Source: {source}")
                print(f"💬 Response: {ai_response[:150]}...")
                
                # Check response quality
                if len(ai_response) > 50:
                    print("✅ Good length")
                if '**' in ai_response:
                    print("✅ Has formatting")
                if '?' in ai_response:
                    print("✅ Asks questions (Socratic)")
                    
                # Check for expected topics
                response_lower = ai_response.lower()
                found_topics = [topic for topic in test['expected_topics'] if topic in response_lower]
                if found_topics:
                    print(f"✅ Found topics: {found_topics}")
                else:
                    print("ℹ️ No specific expected topics found (may still be good)")
                
            else:
                print(f"❌ Error: {response.status_code}")
                print(f"Response: {response.text}")
                
        except Exception as e:
            print(f"❌ Request failed: {e}")
    
    print(f"\n🎯 Chat endpoint testing complete!")

if __name__ == "__main__":
    test_socratic_chat()
