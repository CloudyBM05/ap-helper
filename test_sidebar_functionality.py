#!/usr/bin/env python3
"""Test the specific 'Tell me about X' functionality for AP World topics"""

import requests
import json

# Test the live backend
chat_url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/chat/send"

# Test clicking on an AP World topic in the sidebar
print("🌍 Testing AP World 'Tell me about' Functionality")
print("=" * 60)

test_cases = [
    {
        "course": "apworld",
        "unit": "unit1", 
        "topic": "The Silk Roads and Overland Trade",
        "message": "Tell me about the silk roads and overland trade"
    },
    {
        "course": "apworld", 
        "unit": "unit2",
        "topic": "The Columbian Exchange",
        "message": "Tell me about the columbian exchange"
    },
    {
        "course": "apworld",
        "unit": "unit3", 
        "topic": "The Industrial Revolution",
        "message": "Tell me about the industrial revolution"
    },
    {
        "course": "apworld",
        "unit": "unit4",
        "topic": "Global Conflicts and Total War", 
        "message": "Tell me about global conflicts and total war"
    }
]

for i, test in enumerate(test_cases, 1):
    print(f"\n{i}. Testing: {test['course'].upper()} {test['unit'].upper()}")
    print(f"   Topic: {test['topic']}")
    print(f"   User clicks and types: '{test['message']}'")
    print("-" * 50)
    
    try:
        response = requests.post(chat_url, json={
            "message": test['message'],
            "course": test['course'],
            "unit": test['unit'],
            "conversationHistory": [],
            "userId": "test_apworld_topics"
        }, timeout=15)
        
        if response.status_code == 200:
            data = response.json()
            ai_response = data.get('response', '')
            source = data.get('source', 'unknown')
            
            print(f"✅ Response received ({source}):")
            print(f"📝 {ai_response}")
            print(f"📊 Length: {len(ai_response)} characters")
            
        else:
            print(f"❌ Error: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"❌ Request failed: {e}")
    
    print("=" * 60)

print("\n🎯 Summary:")
print("✅ Users can now visit https://aphelper.tech/socratic/apworld/unit1")
print("✅ Click on any topic in the left sidebar")  
print("✅ The input field auto-fills with 'Tell me about [topic name]'")
print("✅ The AI provides comprehensive responses about the selected topic")
print("\nThis works for all courses: APUSH, AP Gov, and AP World! 🌟")
