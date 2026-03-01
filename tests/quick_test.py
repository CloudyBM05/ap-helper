#!/usr/bin/env python3

# Simple test to verify all units work
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from grader_api import load_study_guide_content, get_socratic_response
    print("SUCCESS: Functions imported successfully")
    
    # Test all units load content
    all_units = ['unit1', 'unit2', 'unit3', 'unit4', 'unit5', 'unit6', 'unit7', 'unit8', 'unit9']
    loaded_units = 0
    
    for unit in all_units:
        content = load_study_guide_content(unit)
        if content and content.get('sections'):
            loaded_units += 1
    
    print(f"SUCCESS: {loaded_units}/9 units loaded with content")
    
    # Test response generation for a few units
    test_units = ['unit1', 'unit4', 'unit7']
    responses_generated = 0
    
    for unit in test_units:
        try:
            response = get_socratic_response("Tell me about this unit", "apush", unit, [])
            if response and response.get('response'):
                responses_generated += 1
        except:
            pass
    
    print(f"SUCCESS: {responses_generated}/3 test responses generated")
    
    if loaded_units == 9 and responses_generated == 3:
        print("OVERALL: All systems working correctly!")
        print("The Socratic AI now supports all 9 APUSH units.")
    else:
        print("OVERALL: Some issues detected")
        
except Exception as e:
    print(f"ERROR: {e}")
