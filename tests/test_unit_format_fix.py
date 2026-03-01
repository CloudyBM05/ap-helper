#!/usr/bin/env python3
"""
Test script to verify the unit format fix for "Unit 1" vs "unit1"
"""

import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

# Import the functions from grader_api
try:
    from grader_api import load_study_guide_content, get_socratic_response
    print("✅ Successfully imported functions from grader_api.py")
except ImportError as e:
    print(f"❌ Failed to import: {e}")
    sys.exit(1)

def test_unit_format_normalization():
    """Test that both unit formats work correctly"""
    print("\n🧪 Testing unit format normalization...")
    
    # Test different unit formats
    test_formats = [
        "Unit 1", "unit1", "UNIT 1", "Unit1",
        "Unit 2", "unit2", "UNIT 2", "Unit2", 
        "Unit 3", "unit3", "UNIT 3", "Unit3",
        "Unit 9", "unit9", "UNIT 9", "Unit9"
    ]
    
    for unit_format in test_formats:
        try:
            content = load_study_guide_content(unit_format)
            if content and content.get('sections'):
                print(f"  ✅ {unit_format:<8} -> Found {len(content['sections'])} sections")
            else:
                print(f"  ❌ {unit_format:<8} -> No content found")
        except Exception as e:
            print(f"  ❌ {unit_format:<8} -> Error: {e}")

def test_socratic_response():
    """Test that Socratic responses work for different unit formats"""
    print("\n🤖 Testing Socratic response generation...")
    
    test_cases = [
        {"unit": "Unit 1", "message": "Tell me about colonial America"},
        {"unit": "Unit 2", "message": "What was the Great Awakening?"},
        {"unit": "Unit 3", "message": "Explain the American Revolution"},
        {"unit": "Unit 5", "message": "What caused the Civil War?"},
        {"unit": "Unit 9", "message": "Tell me about the Cold War"}
    ]
    
    for test in test_cases:
        try:
            response_data = get_socratic_response(
                user_input=test["message"],
                course="apush", 
                unit=test["unit"],
                conversation_history=[]
            )
            
            response = response_data.get('response', '')
            if response and len(response) > 50 and 'Unknown Unit' not in response:
                print(f"  ✅ {test['unit']}: Generated {len(response)} character response")
            elif 'Unknown Unit' in response:
                print(f"  ❌ {test['unit']}: Still getting 'Unknown Unit' error")
            else:
                print(f"  ⚠️ {test['unit']}: Response too short or missing")
                
        except Exception as e:
            print(f"  ❌ {test['unit']}: Error - {e}")

def test_all_nine_units():
    """Test that all 9 units work correctly"""
    print("\n📚 Testing all 9 APUSH units...")
    
    for i in range(1, 10):
        unit = f"Unit {i}"
        try:
            # Test content loading
            content = load_study_guide_content(unit)
            if content and content.get('sections'):
                sections_count = len(content['sections'])
                print(f"  ✅ {unit}: {sections_count} sections loaded")
                
                # Test response generation
                response_data = get_socratic_response(
                    user_input=f"Tell me about {unit}",
                    course="apush",
                    unit=unit,
                    conversation_history=[]
                )
                
                response = response_data.get('response', '')
                if 'Unknown Unit' in response:
                    print(f"    ❌ {unit}: Still showing 'Unknown Unit'")
                elif len(response) > 50:
                    print(f"    ✅ {unit}: Socratic response generated successfully")
                else:
                    print(f"    ⚠️ {unit}: Response too short")
            else:
                print(f"  ❌ {unit}: No content found")
        except Exception as e:
            print(f"  ❌ {unit}: Error - {e}")

def main():
    """Run all tests"""
    print("🚀 Testing unit format fix for Socratic AI...")
    
    test_unit_format_normalization()
    test_socratic_response() 
    test_all_nine_units()
    
    print("\n🎉 Unit format fix testing completed!")

if __name__ == "__main__":
    main()
