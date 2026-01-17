#!/usr/bin/env python3
"""Test script to check unit topics for all courses"""

import requests
import json

# Test the unit topics endpoint for different courses
backend_url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/unit-topics"

test_courses = [
    {"course": "apush", "unit": "unit1"},
    {"course": "apush", "unit": "unit2"},
    {"course": "apworld", "unit": "unit1"},
    {"course": "apworld", "unit": "unit2"},
    {"course": "apgov", "unit": "unit1"},
    {"course": "apgov", "unit": "unit2"}
]

print("Testing unit topics for all courses...")
print("=" * 70)

for test in test_courses:
    course = test["course"]
    unit = test["unit"]
    
    print(f"\n🎓 {course.upper()} {unit.upper()}")
    print("-" * 50)
    
    try:
        response = requests.get(backend_url, params={
            "course": course,
            "unit": unit
        }, timeout=15)
        
        if response.status_code == 200:
            data = response.json()
            topics = data.get('topics', [])
            
            print(f"✅ {len(topics)} topics found")
            print(f"Course: {data.get('course', 'N/A')}")
            print(f"Unit: {data.get('unit', 'N/A')}")
            print(f"Overview: {data.get('overview', 'N/A')[:100]}...")
            
            if topics:
                print("\nTopics:")
                for i, topic in enumerate(topics[:3], 1):  # Show first 3 topics
                    print(f"  {i}. {topic.get('title', 'N/A')}")
                    key_facts = topic.get('keyFacts', [])
                    print(f"     ({len(key_facts)} key facts)")
                
                if len(topics) > 3:
                    print(f"  ... and {len(topics) - 3} more topics")
            
        else:
            print(f"❌ Error: {response.status_code}")
            print(response.text[:200])
            
    except Exception as e:
        print(f"❌ Request failed: {e}")
    
    print("=" * 70)

print("\nTopics test complete!")
