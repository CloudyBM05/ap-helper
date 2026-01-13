#!/usr/bin/env python3
"""Test the updated unit-topics endpoint"""

import requests
import json

def test_unit_topics():
    """Test unit topics for different units"""
    print("🧪 Testing Updated Unit Topics Endpoint")
    print("="*50)
    
    test_cases = [
        {"course": "apush", "unit": "unit1"},
        {"course": "apush", "unit": "unit3"}, 
        {"course": "apgov", "unit": "unit1"},
        {"course": "apworld", "unit": "unit1"}
    ]
    
    for test in test_cases:
        course = test["course"]
        unit = test["unit"]
        
        print(f"\n🧪 Testing {course.upper()} {unit}")
        
        try:
            response = requests.get(
                f"https://ap-helper-2d9f117e9bdb.herokuapp.com/api/unit-topics?course={course}&unit={unit}",
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                topics = data.get('topics', [])
                overview = data.get('overview', '')
                
                print(f"✅ Status: {response.status_code}")
                print(f"📖 Topics count: {len(topics)}")
                print(f"📝 Overview: {overview[:100]}...")
                
                if topics:
                    print(f"🔹 First topic: {topics[0].get('title', 'No title')}")
                    key_facts = topics[0].get('keyFacts', [])
                    if key_facts:
                        print(f"   📋 Key facts: {len(key_facts)} items")
                else:
                    print("❌ No topics returned")
                    
            else:
                print(f"❌ Error: {response.status_code}")
                print(f"Response: {response.text}")
                
        except Exception as e:
            print(f"❌ Request failed: {e}")

if __name__ == "__main__":
    test_unit_topics()
