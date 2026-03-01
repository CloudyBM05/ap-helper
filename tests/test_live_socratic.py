#!/usr/bin/env python3
"""
Test script to verify AP Gov Socratic AI is working on live site
"""
import requests
import json

def test_api_endpoints():
    """Test that backend API endpoints are working"""
    base_url = "https://ap-helper-2d9f117e9bdb.herokuapp.com"
    
    print("🧪 Testing AP Gov Socratic AI Backend...")
    
    # Test root endpoint
    print("\n1. Testing root endpoint...")
    try:
        response = requests.get(f"{base_url}/")
        if response.status_code == 200:
            print("✅ Root endpoint working")
        else:
            print(f"❌ Root endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Root endpoint error: {e}")
    
    # Test unit topics endpoint for AP Gov
    print("\n2. Testing AP Gov unit topics...")
    for unit_num in range(1, 6):
        try:
            response = requests.get(f"{base_url}/api/unit-topics?course=apgov&unit=unit{unit_num}")
            if response.status_code == 200:
                data = response.json()
                topics = data.get('topics', [])
                print(f"✅ Unit {unit_num}: {len(topics)} topics loaded")
            else:
                print(f"❌ Unit {unit_num} failed: {response.status_code}")
        except Exception as e:
            print(f"❌ Unit {unit_num} error: {e}")
    
    # Test socratic chat endpoint
    print("\n3. Testing Socratic chat...")
    try:
        payload = {
            "message": "What is federalism?",
            "course": "apgov",
            "unit": "unit1",
            "conversationHistory": [],
            "userId": "test_user"
        }
        
        response = requests.post(
            f"{base_url}/api/chat/send",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Socratic chat working")
            print(f"Response preview: {data.get('response', '')[:100]}...")
        else:
            print(f"❌ Socratic chat failed: {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"❌ Socratic chat error: {e}")

def test_frontend_access():
    """Test that frontend pages are accessible"""
    print("\n🌐 Testing Frontend Access...")
    
    urls = [
        "https://aphelper.tech/",
        "https://aphelper.tech/socratic-learning",
        "https://aphelper.tech/socratic-chat/apgov/unit1",
        "https://aphelper.tech/socratic-chat/apgov/unit2",
        "https://aphelper.tech/socratic-chat/apgov/unit3"
    ]
    
    for url in urls:
        try:
            response = requests.get(url)
            if response.status_code == 200:
                print(f"✅ {url}")
            else:
                print(f"❌ {url} - Status: {response.status_code}")
        except Exception as e:
            print(f"❌ {url} - Error: {e}")

if __name__ == "__main__":
    print("🚀 AP Gov Socratic AI Live Test")
    print("=" * 50)
    
    test_api_endpoints()
    test_frontend_access()
    
    print("\n✨ Test completed!")
    print("\nIf all tests passed, the AP Gov Socratic AI should be working at:")
    print("🔗 https://aphelper.tech/socratic-chat/apgov/unit1")
