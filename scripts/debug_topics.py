#!/usr/bin/env python3
"""
Debug script to see what topics are actually available in the study guide
"""
import requests
import json

# Backend URL
BACKEND_URL = "https://ap-helper-2d9f117e9bdb.herokuapp.com"

def debug_topics():
    """Check what topics are actually available"""
    print("🔍 Debugging Available Topics")
    print("=" * 40)
    
    try:
        response = requests.get(
            f"{BACKEND_URL}/api/unit-topics?course=apush&unit=unit1",
            headers={'Content-Type': 'application/json'},
            timeout=15
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Unit topics loaded successfully:")
            print(f"   Course: {data.get('course')}")
            print(f"   Unit: {data.get('unit')}")
            print(f"   Topics count: {len(data.get('topics', []))}")
            
            for i, topic in enumerate(data.get('topics', []), 1):
                key = topic.get('key', 'unknown')
                title = topic.get('title', 'No title')
                print(f"\n   {i}. Key: '{key}'")
                print(f"      Title: {title}")
                print(f"      Facts: {len(topic.get('keyFacts', []))} items")
                if topic.get('keyFacts'):
                    print(f"      First fact: {topic['keyFacts'][0][:80]}...")
        else:
            print(f"❌ HTTP Error: {response.status_code}")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    debug_topics()
