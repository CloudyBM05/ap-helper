#!/usr/bin/env python3
"""
Test script to verify AP Macroeconomics API endpoints and topics.
This script tests that all 6 units have sidebar topics available.
"""

import requests
import json

def test_ap_macroeconomics_units():
    """Test that all 6 AP Macroeconomics units have topics available."""
    
    # Use Heroku backend
    API_BASE = 'https://ap-helper-2d9f117e9bdb.herokuapp.com'
    
    units_tested = 0
    units_with_topics = 0
    
    print("Testing AP Macroeconomics API topics...")
    print("=" * 50)
    
    # Test all 6 units
    for unit_num in range(1, 7):
        unit = f'unit{unit_num}'
        url = f'{API_BASE}/api/unit-topics?course=apmacro&unit={unit}'
        
        try:
            response = requests.get(url, timeout=10)
            units_tested += 1
            
            if response.status_code == 200:
                data = response.json()
                topics = data.get('topics', [])
                topic_count = len(topics)
                
                print(f"✅ Unit {unit_num}: {topic_count} topics available")
                
                if topic_count > 0:
                    units_with_topics += 1
                    
                    # Show first topic as example
                    if topics:
                        first_topic = topics[0]
                        print(f"   Sample topic: {first_topic.get('title', 'No title')}")
                        print(f"   Key facts: {len(first_topic.get('keyFacts', []))} facts")
                else:
                    print(f"   ⚠️  No topics returned for unit {unit_num}")
            else:
                print(f"❌ Unit {unit_num}: HTTP {response.status_code}")
                print(f"   Response: {response.text[:100]}...")
                
        except requests.exceptions.RequestException as e:
            print(f"❌ Unit {unit_num}: Network error - {str(e)}")
        except Exception as e:
            print(f"❌ Unit {unit_num}: Error - {str(e)}")
        
        print()
    
    print("=" * 50)
    print(f"RESULTS: {units_with_topics}/{units_tested} units have working sidebar topics")
    
    if units_with_topics == 6:
        print("🎉 SUCCESS: All AP Macroeconomics units have topics available!")
        print("You can access the bot at these URLs:")
        print("• Main page: https://cloudybm05.github.io/socratic-learning")
        for i in range(1, 7):
            print(f"• Unit {i}: https://cloudybm05.github.io/socratic-chat/apmacro/unit{i}")
        return True
    else:
        print(f"⚠️  WARNING: {6 - units_with_topics} units missing topics")
        return False

if __name__ == "__main__":
    test_ap_macroeconomics_units()
