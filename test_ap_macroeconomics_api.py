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
        return True
    else:
        print(f"⚠️  WARNING: {6 - units_with_topics} units missing topics")
        return False

def test_socratic_chat_endpoint():
    """Test the Socratic chat endpoint for AP Macroeconomics."""
    
    API_BASE = 'https://ap-helper-2d9f117e9bdb.herokuapp.com'
    url = f'{API_BASE}/api/socratic-chat'
    
    test_payload = {
        "message": "What is GDP and how is it calculated?",
        "course": "apmacro",
        "unit": "unit2",
        "conversation_history": []
    }
    
    try:
        print("Testing AP Macroeconomics Socratic chat endpoint...")
        response = requests.post(url, json=test_payload, timeout=15)
        
        if response.status_code == 200:
            data = response.json()
            ai_response = data.get('response', '')
            
            print("✅ Socratic chat endpoint working")
            print(f"   AI Response length: {len(ai_response)} characters")
            print(f"   Sample: {ai_response[:150]}...")
            return True
        else:
            print(f"❌ Socratic chat endpoint failed: HTTP {response.status_code}")
            print(f"   Response: {response.text[:200]}...")
            return False
            
    except Exception as e:
        print(f"❌ Socratic chat endpoint error: {str(e)}")
        return False

if __name__ == "__main__":
    print("AP Macroeconomics API Test")
    print("=" * 50)
    
    # Test unit topics
    topics_success = test_ap_macroeconomics_units()
    
    print()
    
    # Test Socratic chat
    chat_success = test_socratic_chat_endpoint()
    
    print()
    print("=" * 50)
    if topics_success and chat_success:
        print("🎉 ALL TESTS PASSED: AP Macroeconomics bot is ready!")
    else:
        print("⚠️  SOME TESTS FAILED: Check the issues above")
    
    print("=" * 50)
