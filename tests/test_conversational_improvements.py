#!/usr/bin/env python3
"""
Test the improved Socratic AI conversational experience
"""

import requests
import json

def test_conversational_improvements():
    """Test the natural conversation improvements"""
    print("💬 Testing Improved Socratic AI Conversation...")
    print("=" * 60)
    
    # Backend API endpoint
    api_url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/chat/send"
    
    # Test scenarios from the user's complaint
    test_cases = [
        {
            "name": "User confusion - not sure what referring to", 
            "message": "i'm not sure what you are talking about",
            "course": "apush",
            "unit": "unit1",
            "conversation_history": [
                {"sender": "ai", "content": "Let me tell you about European technological advantages! They had steel weapons, horses, gunpowder, and ships..."}
            ]
        },
        {
            "name": "User doesn't know anything about events",
            "message": "im not sure about any event, or anything you are referring to",
            "course": "apush", 
            "unit": "unit1",
            "conversation_history": [
                {"sender": "ai", "content": "Since Unit 1 (1491–1607) focuses on the first interactions..."}
            ]
        },
        {
            "name": "Fresh start - European explorers",
            "message": "Tell me about European explorers",
            "course": "apush",
            "unit": "unit1",
            "conversation_history": []
        }
    ]
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n{i}. Testing: {test_case['name']}")
        print(f"   User Message: '{test_case['message']}'")
        
        payload = {
            "message": test_case["message"],
            "course": test_case["course"],
            "unit": test_case["unit"],
            "conversationHistory": test_case.get("conversation_history", []),
            "userId": "test_user"
        }
        
        try:
            response = requests.post(api_url, 
                                   json=payload, 
                                   timeout=30,
                                   headers={'Content-Type': 'application/json'})
            
            if response.status_code == 200:
                data = response.json()
                response_text = data.get('response', '')
                source = data.get('source', 'unknown')
                detected_topic = data.get('topicFocus', 'unknown')
                
                print(f"   ✅ Status: {response.status_code}")
                print(f"   📝 Source: {source}")
                print(f"   🎯 Topic: {detected_topic}")
                print(f"   💭 Response Preview: {response_text[:150]}...")
                
                # Check for improvements
                response_lower = response_text.lower()
                
                # Check if response is conversational (not templated)
                template_phrases = ["here's what you should know:", "key information:", "**here's what you should know**", "building on what we've discussed"]
                has_templates = any(phrase in response_lower for phrase in template_phrases)
                if not has_templates:
                    print(f"   ✅ CONVERSATIONAL: Natural, non-templated response")
                else:
                    print(f"   ❌ TEMPLATED: Still using template phrases")
                
                # Check if it addresses user confusion appropriately
                if "not sure" in test_case['message'].lower() or "don't know" in test_case['message'].lower():
                    confusion_responses = ["sorry for the confusion", "no worries", "let me clarify", "i'm here to help"]
                    addresses_confusion = any(phrase in response_lower for phrase in confusion_responses)
                    if addresses_confusion:
                        print(f"   ✅ CONFUSION HANDLING: Properly addresses user confusion")
                    else:
                        print(f"   ❌ CONFUSION HANDLING: Doesn't address user confusion")
                
                # Check if response has markdown that will render properly
                has_markdown = "**" in response_text or "*" in response_text
                if has_markdown:
                    print(f"   ℹ️ MARKDOWN: Contains formatting (should render as bold/italic in frontend)")
                else:
                    print(f"   ℹ️ MARKDOWN: Plain text response")
                    
            else:
                print(f"   ❌ Status: {response.status_code}")
                print(f"   📄 Error: {response.text}")
                
        except Exception as e:
            print(f"   ❌ Error: {e}")
    
    print("\n" + "=" * 60)
    print("🔧 Summary of Improvements Made:")
    print("   ✅ Removed template-like responses ('Here's what you should know')")
    print("   ✅ Added natural conversation handling")
    print("   ✅ Improved confusion detection and response")
    print("   ✅ Added markdown rendering support in frontend") 
    print("   ✅ Made responses more engaging and less formal")
    print("\n💡 Frontend Changes:")
    print("   - Added ReactMarkdown component")
    print("   - **Bold text** now renders as actual bold")
    print("   - Lists and formatting work properly")
    print("\n🚀 Test the live site:")
    print("   1. Go to https://aphelper.tech/socratic-learning/apush/unit1")
    print("   2. Try saying 'I'm not sure what you're talking about'")
    print("   3. Notice improved natural responses and proper text formatting")

if __name__ == "__main__":
    test_conversational_improvements()
