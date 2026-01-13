#!/usr/bin/env python3
"""Debug what load_study_guide_content returns for different units"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from grader_api import load_study_guide_content
    print("✅ Successfully imported load_study_guide_content")
except ImportError as e:
    print(f"❌ Failed to import: {e}")
    exit(1)

def debug_study_guide():
    """Debug what content is returned for different units"""
    test_units = ['unit1', 'unit3', 'unit5']
    
    for unit in test_units:
        print(f"\n🔍 Debugging {unit}:")
        print("-" * 30)
        
        try:
            content = load_study_guide_content(unit, 'apush')
            print(f"Type: {type(content)}")
            print(f"Content: {content}")
            
            if content:
                print(f"Has 'sections': {'sections' in content}")
                if 'sections' in content:
                    sections = content.get('sections', {})
                    print(f"Sections count: {len(sections)}")
                    print(f"Sections keys: {list(sections.keys())}")
                
                overview = content.get('overview', '')
                print(f"Overview: '{overview.strip()}'")
                print(f"Overview == 'Unit information not available yet.': {overview.strip() == 'Unit information not available yet.'}")
            else:
                print("Content is None or empty")
                
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    debug_study_guide()
