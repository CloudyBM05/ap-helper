#!/usr/bin/env python3

# Test the actual API response to see what's being returned
import sys
import os
import json

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from grader_api import get_enhanced_socratic_response, load_study_guide_content
    
    # Simulate what the /api/chat/send endpoint does
    def test_unit_response(unit, message):
        print(f"\n=== Testing {unit} with message: '{message}' ===")
        
        try:
            # This is what the inline function in /api/chat/send does
            msg = message.lower()
            
            # Load accurate study guide content
            study_content = load_study_guide_content(unit)
            if not study_content:
                print("❌ No study content loaded")
                return {
                    'response': f"I'm ready to help you learn about {unit}! What specific topic or question would you like to explore?",
                    'topic': 'general',
                    'concepts_introduced': [],
                    'progress_update': {}
                }
            
            # Get unit sections
            unit_sections = study_content.get('sections', {})
            print(f"✅ Loaded {len(unit_sections)} sections: {list(unit_sections.keys())}")
            
            # Check topic detection
            detected_topic = None
            for section_key, section_data in unit_sections.items():
                section_keywords = section_key.replace('_', ' ').split()
                title_keywords = section_data['title'].lower().split()
                
                print(f"Checking section '{section_key}' (title: '{section_data['title']}')")
                print(f"  Section keywords: {section_keywords}")
                print(f"  Title keywords: {title_keywords}")
                
                # Check if message contains topic keywords
                if any(keyword in msg for keyword in section_keywords) or any(keyword in msg for keyword in title_keywords):
                    detected_topic = section_key
                    print(f"  ✅ MATCH FOUND: {detected_topic}")
                    break
                else:
                    print(f"  ❌ No match")
            
            print(f"Final detected_topic: {detected_topic}")
            
            # Check question types
            is_question = any(q in msg for q in ["what", "who", "when", "where", "why", "how", "can you explain", "tell me about"])
            is_confused = any(phrase in msg for phrase in ["don't understand", "confused", "don't know", "help me", "explain"])
            
            print(f"is_question: {is_question}, is_confused: {is_confused}")
            
            if is_question or is_confused:
                if detected_topic and detected_topic in unit_sections:
                    print(f"✅ Using specific topic response for {detected_topic}")
                    section = unit_sections[detected_topic]
                    return {
                        'response': f"Great question about {section['title']}! Here's what you should know...",
                        'topic': detected_topic,
                        'concepts_introduced': section['key_facts'],
                        'progress_update': {detected_topic: {'introduced': True}}
                    }
                else:
                    print("❌ Using general overview response")
                    overview = study_content.get('overview', '')
                    return {
                        'response': f"Let me give you an overview of {overview}...",
                        'topic': 'overview',
                        'concepts_introduced': [overview],
                        'progress_update': {'overview': {'introduced': True}}
                    }
            
            return {
                'response': "General response",
                'topic': 'general',
                'concepts_introduced': [],
                'progress_update': {}
            }
            
        except Exception as e:
            print(f"Error: {e}")
            import traceback
            traceback.print_exc()
            return None
    
    # Test different units and messages
    test_cases = [
        ("unit2", "tell me about jamestown"),
        ("unit2", "what is jamestown"),
        ("unit3", "what was the stamp act"),
        ("unit4", "explain manifest destiny"),
        ("unit5", "tell me about the civil war"),
    ]
    
    for unit, message in test_cases:
        result = test_unit_response(unit, message)
        if result:
            print(f"RESULT: topic='{result['topic']}', response_preview='{result['response'][:50]}...'")
        
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
