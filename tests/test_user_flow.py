#!/usr/bin/env python3
"""Test script to check the live API responses for the specific user questions"""

import requests
import json

# Test the live backend with the exact user messages
backend_url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/chat/send"

test_conversation = [
    {
        "message": "Give me a overview of what this unit is about and then we can dive deep",
        "history": []
    },
    {
        "message": "it harmed their population right?", 
        "history": [
            {"sender": "user", "content": "Give me a overview of what this unit is about and then we can dive deep"},
            {"sender": "ai", "content": "Previous AI response"}
        ]
    },
    {
        "message": "idk",
        "history": [
            {"sender": "user", "content": "Give me a overview of what this unit is about and then we can dive deep"},
            {"sender": "ai", "content": "Previous response"},
            {"sender": "user", "content": "it harmed their population right?"},
            {"sender": "ai", "content": "Previous response"}
        ]
    },
    {
        "message": "What were Native Americans like?",
        "history": [
            {"sender": "user", "content": "idk"},
            {"sender": "ai", "content": "Previous response"}
        ]
    }
]

print("Testing exact user conversation flow...")
print("=" * 70)

for i, test_case in enumerate(test_conversation, 1):
    message = test_case["message"]
    history = test_case["history"]
    
    print(f"\n{i}. User: {message}")
    print("-" * 50)
    
    try:
        response = requests.post(backend_url, json={
            "message": message,
            "course": "apush", 
            "unit": "unit1",
            "conversationHistory": history,
            "userId": "test_user_flow"
        }, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            ai_response = data.get('response', '')
            source = data.get('source', 'unknown')
            
            print(f"Source: {source}")
            print(f"AI Response:")
            print(ai_response)
            
            # Check for specific issues
            has_markdown = '**' in ai_response
            is_repetitive = ai_response.count('Cahokia') > 0
            is_dynamic = 'Let me know' in ai_response or 'What catches' in ai_response
            
            print(f"\nResponse Analysis:")
            print(f"  Contains markdown: {has_markdown}")
            print(f"  Mentions Cahokia: {is_repetitive}")
            print(f"  Uses dynamic language: {is_dynamic}")
            print(f"  Length: {len(ai_response)} chars")
            
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"Request failed: {e}")
    
    print("=" * 70)

print("\nFlow analysis complete!")
