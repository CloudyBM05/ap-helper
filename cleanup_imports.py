#!/usr/bin/env python3
"""
Script to remove inline import statements that are now at the top
"""

import re

def clean_inline_imports():
    """Remove inline import traceback and import re statements"""
    
    with open('grader_api.py', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove inline traceback imports
    content = re.sub(r'\s+import traceback\n', '\n', content)
    
    # Remove inline re imports 
    content = re.sub(r'\s+import re\n', '\n', content)
    
    with open('grader_api.py', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Cleaned up inline imports in grader_api.py")

if __name__ == "__main__":
    clean_inline_imports()
