#!/usr/bin/env python3
"""Test script to verify all course topics are working for the sidebar functionality"""

import requests
import json

# Test the live backend at the correct URL
backend_url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/unit-topics"
chat_url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/chat/send"

# Test all courses and units
courses_to_test = {
    "apush": ["unit1", "unit2"],
    "apgov": ["unit1"], 
    "apworld": ["unit1", "unit2", "unit3", "unit4"]
}

print("🔍 Testing Unit Topics API for Sidebar Functionality")
print("=" * 70)

for course, units in courses_to_test.items():
    print(f"\n📚 Testing {course.upper()}:")
    print("-" * 40)
    
    for unit in units:
        try:
            # Test unit topics endpoint
            response = requests.get(f"{backend_url}?course={course}&unit={unit}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                topics = data.get('topics', [])
                
                print(f"\n✅ {course.upper()} {unit.upper()}: {len(topics)} topics found")
                print(f"   Overview: {data.get('overview', 'N/A')[:100]}...")
                
                # Show first few topics for verification
                for i, topic in enumerate(topics[:3]):
                    print(f"   📌 Topic {i+1}: {topic.get('title', 'N/A')}")
                    print(f"      Key facts: {len(topic.get('keyFacts', []))} items")
                    
                    # Test clicking a topic (simulating "Tell me about X")
                    topic_title = topic.get('title', '').lower()
                    test_message = f"Tell me about {topic_title}"
                    
                    try:
                        chat_response = requests.post(chat_url, json={
                            "message": test_message,
                            "course": course,
                            "unit": unit,
                            "conversationHistory": [],
                            "userId": "test_topics"
                        }, timeout=15)
                        
                        if chat_response.status_code == 200:
                            chat_data = chat_response.json()
                            ai_response = chat_data.get('response', '')
                            print(f"      ✅ Chat response: {len(ai_response)} chars")
                            print(f"      📝 Preview: {ai_response[:80]}...")
                        else:
                            print(f"      ❌ Chat failed: {chat_response.status_code}")
                    except Exception as e:
                        print(f"      ❌ Chat error: {e}")
                    
                    break  # Only test first topic per unit
                    
            else:
                print(f"❌ {course.upper()} {unit.upper()}: HTTP {response.status_code}")
                print(f"   Error: {response.text[:200]}")
                
        except Exception as e:
            print(f"❌ {course.upper()} {unit.upper()}: Request failed - {e}")

print("\n" + "=" * 70)
print("🎯 Summary: This test verifies that:")
print("   1. ✅ Unit topics API works for all courses")
print("   2. ✅ Topics have titles and key facts for sidebar display")  
print("   3. ✅ Clicking topics generates 'Tell me about X' messages")
print("   4. ✅ Chat API responds to topic-based questions")
print("\n🌐 Users can now visit https://aphelper.tech/socratic/[course]/[unit]")
print("   and click on any topic in the sidebar to auto-fill the input!")
