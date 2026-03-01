"""
Test script to verify AP Biology sidebar topics are working
"""

import requests
import json

def test_apbiology_topics():
    """Test that all AP Biology units have topics available"""
    base_url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/unit-topics"
    
    print("Testing AP Biology sidebar topics...")
    print("=" * 50)
    
    for unit_num in range(1, 9):  # Units 1-8
        unit = f"unit{unit_num}"
        url = f"{base_url}?course=apbiology&unit={unit}"
        
        try:
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                topic_count = len(data.get('topics', []))
                print(f"✓ Unit {unit_num}: {topic_count} topics available")
                
                # Print first topic as sample
                if data.get('topics'):
                    first_topic = data['topics'][0]
                    print(f"  Sample topic: {first_topic.get('title', 'N/A')}")
                else:
                    print("  ⚠ No topics found!")
            else:
                print(f"✗ Unit {unit_num}: HTTP {response.status_code}")
        except Exception as e:
            print(f"✗ Unit {unit_num}: Error - {e}")
    
    print("=" * 50)
    print("Test complete!")

if __name__ == "__main__":
    test_apbiology_topics()
