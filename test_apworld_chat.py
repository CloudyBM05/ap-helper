#!/usr/bin/env python3
"""Test AP World Socratic chat functionality"""

import requests
import json

# Test the live backend with AP World
backend_url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/chat/send"

test_cases = [
    {
        "message": "Tell me about the Silk Roads",
        "course": "apworld",
        "unit": "unit1",
        "conversationHistory": [],
        "userId": "test_apworld"
    },
    {
        "message": "Tell me about the Columbian Exchange", 
        "course": "world",
        "unit": "unit2",
        "conversationHistory": [],
        "userId": "test_world"
    }
]

print("Testing AP World Socratic Chat...")
print("=" * 70)

for i, test_case in enumerate(test_cases, 1):
    print(f"\n{i}. Course: {test_case['course'].upper()}, Unit: {test_case['unit'].upper()}")
    print(f"   Message: {test_case['message']}")
    print("-" * 50)
    
    try:
        response = requests.post(backend_url, json=test_case, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            ai_response = data.get('response', '')
            source = data.get('source', 'unknown')
            
            print(f"✅ Success!")
            print(f"Source: {source}")
            print(f"Response length: {len(ai_response)} chars")
            print(f"Response preview: {ai_response[:150]}...")
            
            # Check for AP World specific content
            ap_world_terms = ['trade', 'silk', 'mongol', 'exchange', 'civilization', 'route', 'network']
            found_terms = [term for term in ap_world_terms if term.lower() in ai_response.lower()]
            print(f"AP World terms found: {', '.join(found_terms)}")
            
        else:
            print(f"❌ Error: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"❌ Request failed: {e}")
    
    print("=" * 70)

print("\nAP World Socratic chat test complete!")
