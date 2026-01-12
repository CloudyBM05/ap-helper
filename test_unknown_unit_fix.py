#!/usr/bin/env python3
"""
Test script to specifically verify that "Unknown Unit" error is fixed
"""

import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

# Import the functions from grader_api
try:
    from grader_api import get_socratic_response
    print("✅ Successfully imported get_socratic_response from grader_api.py")
except ImportError as e:
    print(f"❌ Failed to import: {e}")
    sys.exit(1)

def test_unknown_unit_fix():
    """Test that 'Unknown Unit' error is resolved for all APUSH units"""
    print("\n🔍 Testing for 'Unknown Unit' error across all APUSH units...")
    
    test_cases = [
        {"unit": "Unit 1", "message": "Tell me about colonial America"},
        {"unit": "Unit 2", "message": "What was the Great Awakening?"},
        {"unit": "Unit 3", "message": "Explain the American Revolution"},
        {"unit": "Unit 4", "message": "What was Manifest Destiny?"},
        {"unit": "Unit 5", "message": "What caused the Civil War?"},
        {"unit": "Unit 6", "message": "Tell me about industrialization"},
        {"unit": "Unit 7", "message": "What was the Progressive Era?"},
        {"unit": "Unit 8", "message": "Explain the Civil Rights Movement"},
        {"unit": "Unit 9", "message": "Tell me about the Cold War"}
    ]
    
    all_passed = True
    
    for test in test_cases:
        try:
            response_data = get_socratic_response(
                user_input=test["message"],
                course="apush", 
                unit=test["unit"],
                conversation_history=[]
            )
            
            response = response_data.get('response', '')
            
            # Check for "Unknown Unit" text (case-insensitive)
            if 'unknown unit' in response.lower():
                print(f"  ❌ {test['unit']}: Still showing 'Unknown Unit'")
                print(f"      Response: {response[:100]}...")
                all_passed = False
            elif len(response) > 50:
                print(f"  ✅ {test['unit']}: Valid response generated ({len(response)} chars)")
            else:
                print(f"  ⚠️ {test['unit']}: Response too short, might be an issue")
                print(f"      Response: {response}")
                
        except Exception as e:
            print(f"  ❌ {test['unit']}: Error - {e}")
            all_passed = False
    
    if all_passed:
        print("\n🎉 SUCCESS: All units are working correctly! No more 'Unknown Unit' errors!")
    else:
        print("\n❌ ISSUE: Some units still showing 'Unknown Unit' or errors")
    
    return all_passed

def test_specific_unit_formats():
    """Test different unit formats that frontend might send"""
    print("\n🔤 Testing various unit formats that frontend might send...")
    
    frontend_formats = [
        "Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5",
        "Unit 6", "Unit 7", "Unit 8", "Unit 9"
    ]
    
    all_passed = True
    
    for unit_format in frontend_formats:
        try:
            response_data = get_socratic_response(
                user_input=f"Tell me about {unit_format}",
                course="apush",
                unit=unit_format, 
                conversation_history=[]
            )
            
            response = response_data.get('response', '')
            
            if 'unknown unit' in response.lower():
                print(f"  ❌ {unit_format}: 'Unknown Unit' error")
                all_passed = False
            elif len(response) > 30:
                print(f"  ✅ {unit_format}: Working correctly")
            else:
                print(f"  ⚠️ {unit_format}: Unexpected short response")
                
        except Exception as e:
            print(f"  ❌ {unit_format}: Error - {e}")
            all_passed = False
    
    return all_passed

def main():
    """Run the unknown unit fix tests"""
    print("🚀 Testing 'Unknown Unit' error fix...")
    
    result1 = test_unknown_unit_fix()
    result2 = test_specific_unit_formats()
    
    if result1 and result2:
        print("\n✅ FINAL RESULT: 'Unknown Unit' issue has been completely resolved!")
        print("   The Socratic AI now works for all 9 APUSH units.")
    else:
        print("\n❌ FINAL RESULT: There are still some issues to address.")
    
    return result1 and result2

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
