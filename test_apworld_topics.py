#!/usr/bin/env python3
"""Test AP World topics endpoint"""

import requests
import json

# Test the live backend for AP World topics
backend_url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/unit-topics"

courses_to_test = [
    ("apworld", "unit1"),
    ("apworld", "unit2"), 
    ("apworld", "unit3"),
    ("apworld", "unit4"),
    ("world", "unit1"),  # Test alternate course name
]

print("Testing AP World unit topics...")
print("=" * 70)

for course, unit in courses_to_test:
    print(f"\n🌍 Testing {course.upper()} {unit.upper()}")
    print("-" * 50)
    
    try:
        response = requests.get(f"{backend_url}?course={course}&unit={unit}", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success!")
            print(f"Unit: {data.get('unit')}")
            print(f"Course: {data.get('course')}")
            print(f"Overview: {data.get('overview', 'No overview')[:100]}...")
            
            topics = data.get('topics', [])
            print(f"Topics found: {len(topics)}")
            
            for i, topic in enumerate(topics[:3], 1):  # Show first 3 topics
                print(f"  {i}. {topic.get('title', 'No title')}")
                print(f"     Key facts: {len(topic.get('keyFacts', []))} items")
                
            if len(topics) > 3:
                print(f"  ... and {len(topics) - 3} more topics")
                
        else:
            print(f"❌ Error: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"❌ Request failed: {e}")
    
    print("=" * 70)

print("\nAP World topics test complete!")
