#!/usr/bin/env python3
"""
Test script to check Gemini configuration
"""
import requests
import json

# Backend URL
BACKEND_URL = "https://ap-helper-2d9f117e9bdb.herokuapp.com"

def test_gemini_config():
    """Test if Gemini is configured correctly"""
    print("🔧 Testing Gemini Configuration")
    print("=" * 40)
    
    # Create a test payload that should definitely trigger Gemini
    test_payload = {
        "message": "Can you analyze and compare the complex political and economic relationships between Spanish colonial policies and Native American societies?",
        "course": "apush",
        "unit": "unit1",
        "context": {
            "currentTopic": None,
            "unitProgress": 0.5,
            "difficulty": "advanced"
        }
    }
    
    print(f"📤 Sending request with advanced keywords...")
    print(f"Message keywords: analyze, compare, complex, relationships, policies")
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/chat/send",
            json=test_payload,
            headers={'Content-Type': 'application/json'},
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            source = data.get('source', 'unknown')
            response_text = data.get('response', '')
            
            print(f"✅ Response received:")
            print(f"   Source: {source}")
            print(f"   Length: {len(response_text)} characters")
            print(f"   Response preview: {response_text[:150]}...")
            
            if source == 'gemini_ai':
                print("🎉 SUCCESS: Gemini API is working!")
                return True
            else:
                print(f"❌ FAILED: Expected 'gemini_ai', got '{source}'")
                return False
                
        else:
            print(f"❌ HTTP Error: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    print("🔍 Gemini Configuration Test")
    print("=" * 50)
    
    success = test_gemini_config()
    
    if not success:
        print("\n💡 Troubleshooting tips:")
        print("1. Check if GEMINI_API_KEY is set in Heroku config")
        print("2. Verify the advanced question detection logic")
        print("3. Check if Gemini model name is correct")
        print("4. Review Heroku logs for Gemini API errors")
    else:
        print("\n🎉 Gemini integration is working correctly!")
