#!/usr/bin/env python3
"""
Test specific topic detection to debug why wrong topics are being detected
"""
import requests
import json

# Backend URL  
BACKEND_URL = "https://ap-helper-2d9f117e9bdb.herokuapp.com"

def test_individual_detection():
    """Test each specific phrase to see what topic gets detected"""
    print("🔍 Testing Individual Topic Detection")
    print("=" * 50)
    
    # Test each phrase individually
    test_phrases = [
        "Tell me about european motivations",
        "Tell me about native american agriculture", 
        "Tell me about the columbian exchange",
        "Tell me about spanish colonization",
        "european technological advantages",
        "native american",
        "columbian exchange",
        "spanish"
    ]
    
    for phrase in test_phrases:
        print(f"\n📝 Testing: '{phrase}'")
        
        payload = {
            "message": phrase,
            "course": "apush", 
            "unit": "unit1",
            "context": {"currentTopic": None}
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
                topic_focus = data.get('topicFocus', 'unknown')
                
                # Extract title from response if present
                if '**' in response_text:
                    title = response_text.split('**')[1] if len(response_text.split('**')) > 1 else 'No title'
                else:
                    title = response_text[:50] + "..."
                
                print(f"   Topic Focus: {topic_focus}")
                print(f"   Title/Preview: {title}")
                
        except Exception as e:
            print(f"   ❌ Error: {e}")

if __name__ == "__main__":
    test_individual_detection()
