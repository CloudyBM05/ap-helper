#!/usr/bin/env python3
"""
Test script to verify Gemini API integration in Socratic chat
"""
import requests
import json

# Backend URL
BACKEND_URL = "https://ap-helper-2d9f117e9bdb.herokuapp.com"

def test_gemini_response():
    """Test if Gemini API is being called for advanced questions"""
    print("🧠 Testing Gemini API Integration for Advanced Questions")
    print("=" * 60)
    
    # Test payload for advanced question that should trigger Gemini
    advanced_question = {
        "message": "Can you explain the complex relationship between Native American societies and European colonization, and analyze the long-term consequences of these encounters?",
        "course": "apush",
        "unit": "unit1",
        "context": {
            "currentTopic": None,
            "unitProgress": 0.5,
            "difficulty": "advanced"
        }
    }
    
    print(f"🔍 Sending advanced question to test Gemini integration...")
    print(f"Question: {advanced_question['message'][:80]}...")
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/chat/send",
            json=advanced_question,
            headers={'Content-Type': 'application/json'},
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Response received successfully")
            print(f"📊 Response details:")
            print(f"   Source: {data.get('source', 'N/A')}")
            print(f"   Length: {len(data.get('response', ''))} characters")
            
            if data.get('source') == 'gemini_ai':
                print("🚀 SUCCESS: Gemini API is being used!")
                print(f"   Response preview: {data.get('response', '')[:200]}...")
            else:
                print(f"⚠️  WARNING: Response source is '{data.get('source')}', not 'gemini_ai'")
                print(f"   This might indicate fallback to standard response")
            
            return True
        else:
            print(f"❌ HTTP Error: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing Gemini integration: {e}")
        return False

def test_multiple_scenarios():
    """Test various question types to see response sources"""
    print("\n🔬 Testing Multiple Question Scenarios")
    print("=" * 60)
    
    test_cases = [
        {
            "name": "Basic Question", 
            "message": "What is this unit about?",
            "expected_source": "enhanced_socratic_system"
        },
        {
            "name": "Advanced Analysis", 
            "message": "Analyze the complex economic, political, and social factors that led to the different colonization strategies employed by Spain, France, and England in the Americas.",
            "expected_source": "gemini_ai"
        },
        {
            "name": "Specific Topic", 
            "message": "Tell me about the Pueblo people",
            "expected_source": "enhanced_socratic_system"
        }
    ]
    
    results = []
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n📝 Test {i}: {test_case['name']}")
        
        payload = {
            "message": test_case["message"],
            "course": "apush", 
            "unit": "unit1",
            "context": {
                "currentTopic": None,
                "unitProgress": 0.5,
                "difficulty": "intermediate"
            }
        }
        
        try:
            response = requests.post(
                f"{BACKEND_URL}/api/chat/send",
                json=payload,
                headers={'Content-Type': 'application/json'},
                timeout=20
            )
            
            if response.status_code == 200:
                data = response.json()
                source = data.get('source', 'unknown')
                
                print(f"   ✅ Response source: {source}")
                print(f"   📏 Response length: {len(data.get('response', ''))} chars")
                
                if source == test_case['expected_source']:
                    print(f"   🎯 Expected source matched!")
                else:
                    print(f"   ⚠️  Expected '{test_case['expected_source']}', got '{source}'")
                
                results.append({
                    'test': test_case['name'],
                    'source': source,
                    'expected': test_case['expected_source'],
                    'success': source == test_case['expected_source']
                })
                
            else:
                print(f"   ❌ HTTP Error: {response.status_code}")
                results.append({
                    'test': test_case['name'],
                    'source': 'error',
                    'expected': test_case['expected_source'],
                    'success': False
                })
                
        except Exception as e:
            print(f"   ❌ Error: {e}")
            results.append({
                'test': test_case['name'],
                'source': 'error',
                'expected': test_case['expected_source'],
                'success': False
            })
    
    # Summary
    print(f"\n📊 Test Results Summary:")
    print("=" * 40)
    successes = sum(1 for r in results if r['success'])
    total = len(results)
    print(f"✅ {successes}/{total} tests passed expected source matching")
    
    for result in results:
        status = "✅" if result['success'] else "❌"
        print(f"{status} {result['test']}: {result['source']} (expected: {result['expected']})")
    
    return results

if __name__ == "__main__":
    print("🧪 Comprehensive Gemini Integration Test")
    print("=" * 60)
    
    # Test basic functionality first
    basic_success = test_gemini_response()
    
    if basic_success:
        # Test various scenarios
        test_multiple_scenarios()
    else:
        print("❌ Basic test failed, skipping comprehensive tests")
    
    print("\n🎉 Test Complete!")
