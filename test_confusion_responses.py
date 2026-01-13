#!/usr/bin/env python3
"""Test script to check confusion handling responses"""

import requests
import json

# Test the live backend for confusion handling
backend_url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/chat/send"

test_messages = [
    "I'm not sure what you're talking about",
    "I don't understand",
    "What are you referring to?",
    "I'm confused"
]

print("Testing confusion handling responses...")
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
            print(f"Response:")
            print(ai_response)
            
            # Check for markdown elements
            has_bold = '**' in ai_response
            has_bullets = '•' in ai_response or '- ' in ai_response
            has_headers = '#' in ai_response
            has_emojis = any(emoji in ai_response for emoji in ['📚', '🌍', '⭐', '😅', '🤔', '🌎'])
            
            print(f"\nFormatting found:")
            print(f"  Bold: {has_bold}")
            print(f"  Bullets: {has_bullets}")
            print(f"  Headers: {has_headers}")
            print(f"  Emojis: {has_emojis}")
            
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"Request failed: {e}")
    
    print("=" * 60)

print("\nTesting complete!")
