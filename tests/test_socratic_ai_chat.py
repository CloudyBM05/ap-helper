"""
Test the Socratic AI chat functionality for AP Biology
"""

import requests
import json

def test_socratic_ai_chat():
    """Test the Socratic AI chat for AP Biology"""
    
    url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/chat/send"
    
    test_cases = [
        {
            "message": "What is photosynthesis?",
            "course": "apbiology", 
            "unit": "unit3",
            "description": "Basic photosynthesis question"
        },
        {
            "message": "Explain how natural selection works",
            "course": "apbiology",
            "unit": "unit7", 
            "description": "Evolution concept question"
        },
        {
            "message": "What happens during mitosis?",
            "course": "apbiology",
            "unit": "unit4",
            "description": "Cell cycle question"
        }
    ]
    
    print("Testing Socratic AI Chat for AP Biology")
    print("=" * 60)
    
    for i, test in enumerate(test_cases, 1):
        print(f"\nTest {i}: {test['description']}")
        print(f"Question: {test['message']}")
        print("-" * 40)
        
        payload = {
            "message": test["message"],
            "course": test["course"],
            "unit": test["unit"],
            "conversationHistory": [],
            "userId": "test_user"
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
                print(f"✓ Response: {ai_response[:200]}...")
                
                # Check if it's actually a Socratic response
                socratic_indicators = ["question", "what do you think", "why", "how", "curious", "explore"]
                is_socratic = any(indicator in ai_response.lower() for indicator in socratic_indicators)
                print(f"✓ Socratic Style: {'Yes' if is_socratic else 'No'}")
                
            else:
                print(f"✗ HTTP Error: {response.status_code}")
                print(f"✗ Response: {response.text}")
                
        except Exception as e:
            print(f"✗ Error: {e}")
    
    print("\n" + "=" * 60)
    print("AI Chat Test Complete!")

if __name__ == "__main__":
    test_socratic_ai_chat()
