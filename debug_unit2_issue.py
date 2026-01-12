#!/usr/bin/env python3
"""
Debug script to investigate the APUSH Unit 2 Socratic AI issue
"""

import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

try:
    from grader_api import load_study_guide_content, get_socratic_response
    print("✅ Successfully imported functions from grader_api.py")
except ImportError as e:
    print(f"❌ Failed to import: {e}")
    sys.exit(1)

def debug_unit_2_specifically():
    """Debug Unit 2 specifically to see what's happening"""
    print("\n🔍 Debugging APUSH Unit 2 specifically...")
    
    test_formats = ["Unit 2", "unit2", "UNIT 2", "Unit2"]
    
    for unit_format in test_formats:
        print(f"\n--- Testing format: '{unit_format}' ---")
        
        # Test content loading
        try:
            content = load_study_guide_content(unit_format)
            print(f"Content loaded: {bool(content)}")
            
            if content:
                print(f"Overview length: {len(content.get('overview', ''))}")
                sections = content.get('sections', {})
                print(f"Number of sections: {len(sections)}")
                
                if sections:
                    print("Section keys:")
                    for i, key in enumerate(sections.keys()):
                        print(f"  {i+1}. {key}")
                        
                    print("First section details:")
                    first_key = list(sections.keys())[0]
                    first_section = sections[first_key]
                    print(f"  Title: {first_section.get('title')}")
                    print(f"  Key facts count: {len(first_section.get('key_facts', []))}")
                    if first_section.get('key_facts'):
                        print(f"  First fact: {first_section['key_facts'][0][:100]}...")
                else:
                    print("❌ No sections found!")
            else:
                print("❌ No content loaded!")
                
        except Exception as e:
            print(f"❌ Error loading content: {e}")
            
        # Test Socratic response
        try:
            response_data = get_socratic_response(
                user_input="Tell me about Unit 2",
                course="apush",
                unit=unit_format,
                conversation_history=[]
            )
            
            response = response_data.get('response', '')
            print(f"Socratic response length: {len(response)}")
            
            if 'unknown unit' in response.lower():
                print("❌ Still getting 'Unknown Unit' error!")
                print(f"Response: {response}")
            elif len(response) > 50:
                print("✅ Valid response generated")
                print(f"Response preview: {response[:150]}...")
            else:
                print("⚠️ Response too short")
                print(f"Response: {response}")
                
        except Exception as e:
            print(f"❌ Error generating response: {e}")

def debug_unit_normalization():
    """Test the unit normalization logic specifically"""
    print("\n🔧 Testing unit normalization logic...")
    
    test_units = ["Unit 2", "unit2", "UNIT 2", "Unit2", "unit 2"]
    
    for original_unit in test_units:
        # Simulate the normalization logic
        unit = original_unit
        if unit and isinstance(unit, str):
            unit = unit.lower()
            if "unit " in unit:
                unit = unit.replace(" ", "")
        
        print(f"'{original_unit}' -> '{unit}'")

def debug_content_structure():
    """Debug the content structure for Unit 2"""
    print("\n📚 Debugging Unit 2 content structure...")
    
    try:
        content = load_study_guide_content("unit2")
        
        if not content:
            print("❌ No content returned for unit2")
            return
            
        print(f"Content keys: {list(content.keys())}")
        
        if 'overview' in content:
            overview = content['overview']
            print(f"Overview: {overview[:200]}...")
            
        if 'sections' in content:
            sections = content['sections']
            print(f"Sections count: {len(sections)}")
            
            for section_key, section_data in sections.items():
                print(f"\nSection: {section_key}")
                print(f"  Title: {section_data.get('title', 'NO TITLE')}")
                key_facts = section_data.get('key_facts', [])
                print(f"  Key facts count: {len(key_facts)}")
                
                if key_facts:
                    print(f"  First fact: {key_facts[0][:100]}...")
        else:
            print("❌ No 'sections' key in content")
            
    except Exception as e:
        print(f"❌ Error debugging content: {e}")
        import traceback
        traceback.print_exc()

def test_actual_unit2_message():
    """Test with a realistic Unit 2 message"""
    print("\n💬 Testing realistic Unit 2 conversation...")
    
    test_messages = [
        "Tell me about colonial America",
        "What was the Great Awakening?", 
        "Explain Jamestown",
        "What about the tobacco economy?",
        "Help me understand Unit 2"
    ]
    
    for message in test_messages:
        print(f"\n--- Message: '{message}' ---")
        
        try:
            response_data = get_socratic_response(
                user_input=message,
                course="apush",
                unit="Unit 2",
                conversation_history=[]
            )
            
            response = response_data.get('response', '')
            topic = response_data.get('topic', 'unknown')
            concepts = response_data.get('concepts_introduced', [])
            
            print(f"Response length: {len(response)}")
            print(f"Topic detected: {topic}")
            print(f"Concepts introduced: {len(concepts)}")
            
            if 'unknown unit' in response.lower():
                print("❌ 'Unknown Unit' detected!")
            elif 'unit 1' in response.lower():
                print("⚠️ Response mentions Unit 1 instead of Unit 2")
            elif 'colonial' in response.lower() or 'jamestown' in response.lower() or 'tobacco' in response.lower():
                print("✅ Unit 2 relevant content detected")
            else:
                print("❓ Unclear if response is Unit 2 specific")
                
            print(f"Response preview: {response[:200]}...")
            
        except Exception as e:
            print(f"❌ Error: {e}")

def main():
    """Run comprehensive Unit 2 debugging"""
    print("🐛 Debugging APUSH Unit 2 Socratic AI Issue...")
    
    debug_unit_normalization()
    debug_content_structure()
    debug_unit_2_specifically()
    test_actual_unit2_message()
    
    print("\n🔍 Debug analysis complete!")

if __name__ == "__main__":
    main()
