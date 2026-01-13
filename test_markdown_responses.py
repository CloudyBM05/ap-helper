#!/usr/bin/env python3
"""Test script to check markdown rendering in Socratic AI responses"""

import requests
import json

# Test the live backend for markdown responses
backend_url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/chat/send"

test_messages = [
    "Tell me about the Spanish colonization of the Americas",
    "What were the key technological advantages that Europeans had?",
    "How did disease impact Native American populations?",
    "Analyze the encomienda system and its effects"
]

print("Testing Socratic AI markdown responses...")
print("=" * 60)

for i, message in enumerate(test_messages, 1):
    print(f"\n{i}. Testing: {message}")
    print("-" * 50)
    
    try:
        response = requests.post(backend_url, json={
            "message": message,
            "course": "apush",
            "unit": "unit1",
            "conversationHistory": [],
            "userId": "test_user"
        }, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            ai_response = data.get('response', '')
            source = data.get('source', 'unknown')
            
            print(f"Source: {source}")
            print(f"Response ({len(ai_response)} chars):")
            print(ai_response)
            
            # Check for markdown elements
            has_bold = '**' in ai_response
            has_bullets = '•' in ai_response or '- ' in ai_response
            has_headers = '#' in ai_response
            
            print(f"\nMarkdown elements found:")
            print(f"  Bold (**text**): {has_bold}")
            print(f"  Bullets: {has_bullets}")
            print(f"  Headers: {has_headers}")
            
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"Request failed: {e}")
    
    print("=" * 60)

print("\nTesting complete!")
