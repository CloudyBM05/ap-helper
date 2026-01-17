"""
Enhanced test to check if Gemini AI is working or if it's using fallback responses
"""

import requests
import json

def test_ai_source():
    """Test to determine if Gemini AI is actually being used"""
    
    url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/chat/send"
    
    # Test with a question that should trigger Gemini for advanced responses
    advanced_payload = {
        "message": "Analyze the relationship between photosynthesis and cellular respiration in terms of energy conversion and biochemical pathways",
        "course": "apbiology",
        "unit": "unit3",
        "conversationHistory": [],
        "userId": "test_user"
    }
    
    print("Testing AI Source Detection...")
    print("=" * 60)
    print("Sending advanced question to trigger Gemini...")
    print(f"Question: {advanced_payload['message']}")
    print("-" * 60)
    
    try:
        response = requests.post(
            url, 
            headers={"Content-Type": "application/json"},
            json=advanced_payload,
            timeout=45
        )
        
        if response.status_code == 200:
            data = response.json()
            
            print(f"✓ Status: {response.status_code}")
            print(f"✓ Response received: {len(data.get('response', ''))} characters")
            
            # Check the source field
            source = data.get("source", "unknown")
            print(f"✓ AI Source: {source}")
            
            # Get the actual response
            ai_response = data.get("response", "No response")
            print(f"\n📝 AI Response:")
            print("-" * 40)
            print(ai_response)
            print("-" * 40)
            
            # Analyze response characteristics
            response_lower = ai_response.lower()
            
            # Check for Gemini characteristics
            gemini_indicators = [
                "**" in ai_response,  # Bold formatting typical of Gemini
                len(ai_response) > 150,  # Longer responses
                "bullet" in response_lower or "•" in ai_response,
                "analysis" in response_lower or "relationship" in response_lower
            ]
            
            # Check for fallback characteristics  
            fallback_indicators = [
                "that's a great question" in response_lower,
                len(ai_response) < 100,  # Shorter responses
                "tell me more about" in response_lower
            ]
            
            print(f"\n🔍 Response Analysis:")
            print(f"  Source field: {source}")
            print(f"  Length: {len(ai_response)} chars")
            print(f"  Has formatting: {'**' in ai_response}")
            print(f"  Gemini indicators: {sum(gemini_indicators)}/4")
            print(f"  Fallback indicators: {sum(fallback_indicators)}/3")
            
            if source == "gemini_ai":
                print("✅ USING GEMINI AI - Real AI responses!")
            elif source == "enhanced_socratic_system":
                print("⚠️  USING FALLBACK - Prewritten responses")
            else:
                print(f"❓ UNKNOWN SOURCE: {source}")
                
        else:
            print(f"✗ HTTP Error: {response.status_code}")
            print(f"✗ Response: {response.text}")
            
    except Exception as e:
        print(f"✗ Error: {e}")
    
    print("\n" + "=" * 60)

def test_basic_question():
    """Test a basic question to see response pattern"""
    
    url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/chat/send"
    
    basic_payload = {
        "message": "What is DNA?",
        "course": "apbiology", 
        "unit": "unit5",
        "conversationHistory": [],
        "userId": "test_user"
    }
    
    print("Testing Basic Question Response...")
    print("=" * 60)
    
    try:
        response = requests.post(url, headers={"Content-Type": "application/json"}, json=basic_payload, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            source = data.get("source", "unknown")
            ai_response = data.get("response", "")
            
            print(f"Basic Question Source: {source}")
            print(f"Response length: {len(ai_response)} chars")
            print(f"First 200 chars: {ai_response[:200]}...")
            
        else:
            print(f"Error: {response.status_code}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_ai_source()
    print("\n")
    test_basic_question()
