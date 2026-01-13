#!/usr/bin/env python3
"""
Final comprehensive test of APUSH and AP Gov Socratic AI
"""
import requests
import json

def test_complete_system():
    """Test entire Socratic AI system for both courses"""
    print("🚀 Final Socratic AI Test - APUSH & AP Gov")
    print("=" * 60)
    
    base_url = "https://ap-helper-2d9f117e9bdb.herokuapp.com"
    
    # Test backend for both courses
    print("\n🔧 BACKEND TESTS:")
    
    # Test APUSH units
    print("\n📚 APUSH Units:")
    for unit in range(1, 10):  # APUSH has 9 units
        try:
            response = requests.get(f"{base_url}/api/unit-topics?course=apush&unit=unit{unit}")
            if response.status_code == 200:
                data = response.json()
                topics = data.get('topics', [])
                print(f"   ✅ APUSH Unit {unit}: {len(topics)} topics")
            else:
                print(f"   ❌ APUSH Unit {unit}: {response.status_code}")
        except Exception as e:
            print(f"   ❌ APUSH Unit {unit}: {e}")
    
    # Test AP Gov units  
    print("\n🏛️ AP Gov Units:")
    for unit in range(1, 6):  # AP Gov has 5 units
        try:
            response = requests.get(f"{base_url}/api/unit-topics?course=apgov&unit=unit{unit}")
            if response.status_code == 200:
                data = response.json()
                topics = data.get('topics', [])
                print(f"   ✅ AP Gov Unit {unit}: {len(topics)} topics")
            else:
                print(f"   ❌ AP Gov Unit {unit}: {response.status_code}")
        except Exception as e:
            print(f"   ❌ AP Gov Unit {unit}: {e}")
    
    # Test Socratic chat for both courses
    print("\n💬 SOCRATIC CHAT TESTS:")
    
    # Test APUSH chat
    print("\n📜 APUSH Chat Test:")
    try:
        payload = {
            "message": "What caused the American Revolution?",
            "course": "apush", 
            "unit": "unit3",
            "conversationHistory": [],
            "userId": "test_user"
        }
        
        response = requests.post(f"{base_url}/api/chat/send", json=payload)
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ APUSH Chat working - Response: {data.get('response', '')[:100]}...")
        else:
            print(f"   ❌ APUSH Chat failed: {response.status_code}")
    except Exception as e:
        print(f"   ❌ APUSH Chat error: {e}")
    
    # Test AP Gov chat
    print("\n🏛️ AP Gov Chat Test:")
    try:
        payload = {
            "message": "Explain separation of powers",
            "course": "apgov",
            "unit": "unit1", 
            "conversationHistory": [],
            "userId": "test_user"
        }
        
        response = requests.post(f"{base_url}/api/chat/send", json=payload)
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ AP Gov Chat working - Response: {data.get('response', '')[:100]}...")
        else:
            print(f"   ❌ AP Gov Chat failed: {response.status_code}")
    except Exception as e:
        print(f"   ❌ AP Gov Chat error: {e}")
    
    # Test frontend access
    print("\n🌐 FRONTEND ACCESS TEST:")
    frontend_urls = [
        ("Main Site", "https://aphelper.tech/"),
        ("APUSH Unit 3", "https://aphelper.tech/socratic-chat/apush/unit3"), 
        ("AP Gov Unit 1", "https://aphelper.tech/socratic-chat/apgov/unit1"),
        ("Socratic Learning", "https://aphelper.tech/socratic-learning")
    ]
    
    for name, url in frontend_urls:
        try:
            response = requests.get(url)
            if response.status_code == 200:
                print(f"   ✅ {name}")
            else:
                print(f"   ❌ {name}: Status {response.status_code}")
        except Exception as e:
            print(f"   ❌ {name}: {e}")
    
    print("\n" + "=" * 60)
    print("🎯 MANUAL TESTING REQUIRED:")
    print("   1. Open: https://aphelper.tech")
    print("   2. Navigate to: Socratic Learning → AP Government → Unit 1")
    print("   3. Test chat: Ask 'What is federalism?'")
    print("   4. Navigate to: Socratic Learning → APUSH → Unit 3")  
    print("   5. Test chat: Ask 'What caused the Civil War?'")
    print("\n✨ Expected: Both should provide intelligent Socratic responses!")

if __name__ == "__main__":
    test_complete_system()
