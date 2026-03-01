#!/usr/bin/env python3
"""
Test the improved Socratic AI topic detection
"""

import requests
import json

def test_socratic_topic_detection():
    """Test the Socratic AI topic detection issue"""
    print("🧠 Testing Improved Socratic AI Topic Detection...")
    print("=" * 60)
    
    # Backend API endpoint
    api_url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/chat/send"
    
    # Test scenarios that were failing
    test_cases = [
        {
            "name": "European explorers/colonizers request", 
            "message": "I guess we can start with European explorers/colonizers",
            "expected_topic": "european_tech",
            "course": "apush",
            "unit": "unit1"
        },
        {
            "name": "General European mention",
            "message": "Tell me about European exploration",
            "expected_topic": "european_tech", 
            "course": "apush",
            "unit": "unit1"
        },
        {
            "name": "Native American societies",
            "message": "What about native american societies?",
            "expected_topic": "cahokia_details",
            "course": "apush", 
            "unit": "unit1"
        },
        {
            "name": "Spanish colonization",
            "message": "Spanish colonization and impact",
            "expected_topic": "encomienda_system",
            "course": "apush",
            "unit": "unit1"
        },
        {
            "name": "Columbian exchange diseases",
            "message": "columbian exchange diseases",
            "expected_topic": "disease_impact",
            "course": "apush", 
            "unit": "unit1"
        }
    ]
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n{i}. Testing: {test_case['name']}")
        print(f"   Message: '{test_case['message']}'")
        print(f"   Expected Topic: {test_case['expected_topic']}")
        
        payload = {
            "message": test_case["message"],
            "course": test_case["course"],
            "unit": test_case["unit"],
            "conversationHistory": [],
            "userId": "test_user"
        }
        
        try:
            response = requests.post(api_url, 
                                   json=payload, 
                                   timeout=30,
                                   headers={'Content-Type': 'application/json'})
            
            if response.status_code == 200:
                data = response.json()
                detected_topic = data.get('topicFocus', 'unknown')
                response_text = data.get('response', '')
                source = data.get('source', 'unknown')
                
                print(f"   ✅ Status: {response.status_code}")
                print(f"   🎯 Detected Topic: {detected_topic}")
                print(f"   📝 Response Source: {source}")
                print(f"   📄 Response Preview: {response_text[:100]}...")
                
                # Check if topic detection is correct
                if detected_topic == test_case['expected_topic']:
                    print(f"   🎉 TOPIC DETECTION: ✅ CORRECT")
                else:
                    print(f"   ❌ TOPIC DETECTION: FAILED (got {detected_topic}, expected {test_case['expected_topic']})")
                    
                # Check if response mentions the right concepts
                response_lower = response_text.lower()
                if test_case['expected_topic'] == 'european_tech':
                    if any(word in response_lower for word in ['european', 'technology', 'steel', 'horses', 'guns', 'navigation']):
                        print(f"   📚 CONTENT CHECK: ✅ Contains relevant European technology concepts")
                    else:
                        print(f"   📚 CONTENT CHECK: ❌ Missing European technology concepts")
                        
                elif test_case['expected_topic'] == 'cahokia_details':
                    if any(word in response_lower for word in ['cahokia', 'pre-columbian', 'civilization', 'mound', 'population']):
                        print(f"   📚 CONTENT CHECK: ✅ Contains relevant Cahokia/Pre-Columbian concepts")
                    else:
                        print(f"   📚 CONTENT CHECK: ❌ Missing Cahokia/Pre-Columbian concepts")
                        
                elif test_case['expected_topic'] == 'encomienda_system':
                    if any(word in response_lower for word in ['spanish', 'encomienda', 'labor', 'tribute', 'colonization']):
                        print(f"   📚 CONTENT CHECK: ✅ Contains relevant Spanish labor system concepts")
                    else:
                        print(f"   📚 CONTENT CHECK: ❌ Missing Spanish labor system concepts")
                        
                elif test_case['expected_topic'] == 'disease_impact':
                    if any(word in response_lower for word in ['disease', 'smallpox', 'population', 'decline', 'immunity']):
                        print(f"   📚 CONTENT CHECK: ✅ Contains relevant disease impact concepts")
                    else:
                        print(f"   📚 CONTENT CHECK: ❌ Missing disease impact concepts")
                        
            else:
                print(f"   ❌ Status: {response.status_code}")
                print(f"   📄 Error: {response.text}")
                
        except Exception as e:
            print(f"   ❌ Error: {e}")
    
    print("\n" + "=" * 60)
    print("🔧 Test Summary:")
    print("   - The improved topic detection uses keyword scoring")
    print("   - 'European explorers/colonizers' should now detect 'europeanMotivations'")
    print("   - Each topic gets scored based on relevant keywords")
    print("   - Check Heroku logs for debug output: 'DEBUG Topic Detection'")
    print("\n💡 To debug further:")
    print("   1. Check Heroku logs: heroku logs --tail --app ap-helper")
    print("   2. Look for 'DEBUG Topic Detection' messages")
    print("   3. Verify keyword matching scores")

if __name__ == "__main__":
    test_socratic_topic_detection()
