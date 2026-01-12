#!/usr/bin/env python3

# Test to diagnose the "unknown unit" issue
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from grader_api import load_study_guide_content
    
    # Test each unit
    for unit_num in range(1, 10):
        unit = f"unit{unit_num}"
        print(f"\n=== Testing {unit} ===")
        
        content = load_study_guide_content(unit)
        if content:
            overview = content.get('overview', 'No overview')
            sections = content.get('sections', {})
            print(f"✅ Content loaded: {len(sections)} sections")
            print(f"Overview: {overview[:100]}...")
            
            # Check if sections have proper structure
            if sections:
                first_section_key = list(sections.keys())[0]
                first_section = sections[first_section_key]
                print(f"First section: {first_section_key}")
                print(f"Title: {first_section.get('title', 'No title')}")
                print(f"Key facts: {len(first_section.get('key_facts', []))}")
            else:
                print("❌ No sections found")
        else:
            print("❌ No content loaded")
    
    # Test the socratic response function
    print(f"\n=== Testing Socratic Response ===")
    
    try:
        from grader_api import get_socratic_response
        
        # Test unit 2 (which should show the issue)
        response = get_socratic_response("Tell me about unit2", "apush", "unit2", [])
        print(f"Response for unit2: {response.get('response', 'No response')[:100]}...")
        print(f"Topic: {response.get('topic', 'No topic')}")
        
        # Test unit 5 
        response = get_socratic_response("Tell me about unit5", "apush", "unit5", [])
        print(f"Response for unit5: {response.get('response', 'No response')[:100]}...")
        print(f"Topic: {response.get('topic', 'No topic')}")
        
    except Exception as e:
        print(f"Error testing socratic response: {e}")
        
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
