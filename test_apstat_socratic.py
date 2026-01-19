#!/usr/bin/env python3
"""
Test AP Statistics Socratic AI Implementation
Tests if the AP Statistics Socratic chat is working correctly.
"""
import requests
import json
import sys

def test_apstat_socratic_ai():
    """Test the AP Statistics Socratic AI implementation"""
    
    # Base URL for the API
    API_BASE = "https://ap-helper-2d9f117e9bdb.herokuapp.com"
    
    # Test data for AP Statistics Unit 1
    test_cases = [
        {
            "course": "apstat",
            "unit": "unit1", 
            "question": "What is the mean and median?",
            "chat_history": [],
            "user_id": "test_user"
        },
        {
            "course": "apstat",
            "unit": "unit2",
            "question": "Tell me about correlation and regression",
            "chat_history": [],
            "user_id": "test_user"
        },
        {
            "course": "apstat", 
            "unit": "unit4",
            "question": "How does probability work?",
            "chat_history": [],
            "user_id": "test_user"
        },
        {
            "course": "apstat",
            "unit": "unit6",
            "question": "What are confidence intervals?",
            "chat_history": [],
            "user_id": "test_user"
        }
    ]
    
    print("🧮 Testing AP Statistics Socratic AI Implementation...")
    print("=" * 60)
    
    success_count = 0
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n📊 Test {i}: {test_case['course']} {test_case['unit']}")
        print(f"Question: {test_case['question']}")
        
        try:
            # Make request to socratic-chat endpoint
            response = requests.post(
                f"{API_BASE}/api/socratic-chat",
                json=test_case,
                headers={
                    "Authorization": "Bearer test_token_123",
                    "Content-Type": "application/json"
                },
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Success! Response received.")
                print(f"📝 Response length: {len(data.get('response', ''))} characters")
                print(f"🎯 Topic: {data.get('topic', 'N/A')}")
                print(f"🔬 Source: {data.get('source', 'N/A')}")
                
                # Check if response contains statistics-related content
                response_text = data.get('response', '').lower()
                stats_keywords = ['statistics', 'data', 'distribution', 'mean', 'median', 'probability', 'inference']
                
                if any(keyword in response_text for keyword in stats_keywords):
                    print("🎉 Response contains statistics-related content!")
                    success_count += 1
                else:
                    print("⚠️  Response might not be statistics-specific")
                    
            else:
                print(f"❌ Error: HTTP {response.status_code}")
                print(f"Response: {response.text[:200]}...")
                
        except Exception as e:
            print(f"❌ Request failed: {e}")
        
        print("-" * 40)
    
    print(f"\n🏁 Test Summary:")
    print(f"Successful tests: {success_count}/{len(test_cases)}")
    
    if success_count == len(test_cases):
        print("🎉 All AP Statistics Socratic AI tests passed!")
        print("\n✅ Implementation appears to be working correctly!")
        print("\n🔗 You can now access AP Statistics Socratic chat at:")
        print("   https://aphelper.tech/socratic-chat/apstat/unit1")
        print("   https://aphelper.tech/socratic-chat/apstat/unit2") 
        print("   ... etc for all 9 units")
    else:
        print(f"⚠️  Some tests failed. Implementation may need attention.")

    # Test topics endpoint as well
    print(f"\n📚 Testing unit topics for AP Statistics...")
    try:
        response = requests.get(
            f"{API_BASE}/api/unit-topics?course=apstat&unit=unit1",
            headers={"Authorization": "Bearer test_token_123"},
            timeout=15
        )
        
        if response.status_code == 200:
            data = response.json()
            topics = data.get('topics', [])
            print(f"✅ Topics endpoint working! Found {len(topics)} topics for Unit 1")
            for topic in topics[:3]:  # Show first 3 topics
                print(f"   • {topic.get('title', 'N/A')}")
        else:
            print(f"⚠️  Topics endpoint returned HTTP {response.status_code}")
            
    except Exception as e:
        print(f"⚠️  Topics test failed: {e}")

if __name__ == "__main__":
    test_apstat_socratic_ai()
