"""
Test the Socratic AI chat functionality for AP Psychology
"""

import requests
import json

def test_ap_psychology_socratic_chat():
    """Test the Socratic AI chat for AP Psychology"""
    
    url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/chat/send"
    
    # Test cases covering different AP Psychology units
    test_cases = [
        {
            "message": "What is the difference between classical and operant conditioning?",
            "course": "appsychology", 
            "unit": "unit5",
            "description": "Learning unit - conditioning concepts"
        },
        {
            "message": "How do neurons communicate with each other?",
            "course": "appsychology",
            "unit": "unit2", 
            "description": "Biological bases unit - neuron communication"
        },
        {
            "message": "What are the stages of Piaget's cognitive development theory?",
            "course": "appsychology",
            "unit": "unit6",
            "description": "Developmental psychology unit"
        },
        {
            "message": "Explain the difference between short-term and long-term memory",
            "course": "appsychology",
            "unit": "unit3",
            "description": "Sensation and perception unit - memory processes"
        },
        {
            "message": "What is the difference between reliability and validity in psychological research?",
            "course": "appsychology",
            "unit": "unit1",
            "description": "Scientific foundations unit - research methods"
        },
        {
            "message": "How does social facilitation affect performance?",
            "course": "appsychology",
            "unit": "unit9",
            "description": "Social psychology unit"
        },
        {
            "message": "What are the symptoms of major depressive disorder?",
            "course": "appsychology",
            "unit": "unit8",
            "description": "Abnormal psychology unit"
        },
        {
            "message": "Explain Maslow's hierarchy of needs",
            "course": "appsychology",
            "unit": "unit7",
            "description": "Personality unit - motivation theories"
        }
    ]
    
    print("Testing Socratic AI Chat for AP Psychology")
    print("=" * 60)
    
    success_count = 0
    total_tests = len(test_cases)
    
    for i, test in enumerate(test_cases, 1):
        print(f"\nTest {i}/{total_tests}: {test['description']}")
        print(f"Unit: {test['unit']}")
        print(f"Question: {test['message']}")
        print("-" * 40)
        
        payload = {
            "message": test["message"],
            "course": test["course"],
            "unit": test["unit"],
            "conversationHistory": [],
            "userId": "test_user_appsych"
        }
        
        try:
            response = requests.post(
                url, 
                headers={"Content-Type": "application/json"},
                json=payload,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                ai_response = data.get("response", "No response")
                source = data.get("source", "unknown")
                
                print(f"✓ Status: {response.status_code}")
                print(f"✓ AI Source: {source}")
                print(f"✓ Response Length: {len(ai_response)} characters")
                print(f"✓ Response Preview: {ai_response[:150]}...")
                
                # Check if it's actually a Socratic response
                socratic_indicators = ["question", "what do you think", "why", "how", "curious", "explore", "consider", "reflect"]
                is_socratic = any(indicator in ai_response.lower() for indicator in socratic_indicators)
                print(f"✓ Socratic Style: {'Yes' if is_socratic else 'No'}")
                
                # Check for psychology-specific content
                psych_indicators = ["psychology", "psychological", "behavior", "mental", "cognitive", "brain", "research", "study"]
                has_psych_content = any(indicator in ai_response.lower() for indicator in psych_indicators)
                print(f"✓ Psychology Context: {'Yes' if has_psych_content else 'No'}")
                
                # Check if response is from Gemini AI (not prewritten)
                if source in ["gemini", "gemini_ai"]:
                    print("✓ Using Gemini AI: Yes")
                    success_count += 1
                else:
                    print(f"⚠ Using: {source} (expected: gemini or gemini_ai)")
                
            else:
                print(f"✗ HTTP Error: {response.status_code}")
                print(f"✗ Response: {response.text}")
                
        except Exception as e:
            print(f"✗ Error: {e}")
    
    print("\n" + "=" * 60)
    print(f"AP Psychology Socratic Chat Test Complete!")
    print(f"Success Rate: {success_count}/{total_tests} ({(success_count/total_tests)*100:.1f}%)")
    
    if success_count == total_tests:
        print("🎉 All tests passed! AP Psychology Socratic chat is working correctly.")
    else:
        print(f"⚠ {total_tests - success_count} test(s) failed. Check the output above for details.")

def test_topic_coverage():
    """Test if AP Psychology topics are properly defined in the backend"""
    
    url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/chat/send"
    
    print("\n" + "=" * 60)
    print("Testing AP Psychology Topic Coverage")
    print("=" * 60)
    
    # Test each unit to see if topics are defined
    units = [f"unit{i}" for i in range(1, 11)]
    
    for unit in units:
        print(f"\nTesting {unit}...")
        
        payload = {
            "message": "What topics are covered in this unit?",
            "course": "appsychology",
            "unit": unit,
            "conversationHistory": [],
            "userId": "test_topics"
        }
        
        try:
            response = requests.post(
                url, 
                headers={"Content-Type": "application/json"},
                json=payload,
                timeout=20
            )
            
            if response.status_code == 200:
                data = response.json()
                ai_response = data.get("response", "")
                source = data.get("source", "unknown")
                
                print(f"✓ {unit}: Response received ({len(ai_response)} chars, source: {source})")
            else:
                print(f"✗ {unit}: HTTP {response.status_code}")
                
        except Exception as e:
            print(f"✗ {unit}: Error - {e}")

if __name__ == "__main__":
    test_ap_psychology_socratic_chat()
    test_topic_coverage()
