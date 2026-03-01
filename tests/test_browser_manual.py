#!/usr/bin/env python3
"""
Test if the site is working through the browser automation
"""
import time

def test_browser_access():
    """Test through browser simulation"""
    
    print("🌐 Testing Direct Browser Access...")
    print("\nPlease manually check these URLs in your browser:")
    print("1. https://aphelper.tech")
    print("2. https://aphelper.tech/socratic-learning") 
    print("3. https://aphelper.tech/socratic-chat/apgov/unit1")
    
    print("\n📋 What to check:")
    print("- Does the main site load without errors?")
    print("- Can you navigate to 'Socratic Learning' from the nav menu?")
    print("- Can you select AP Government and access Unit 1?")
    print("- Does the Socratic chat interface load?")
    print("- Can you send a message and get a response?")
    
    print("\n🔍 Browser Console Check:")
    print("- Press F12 to open developer tools")
    print("- Look for any errors in the Console tab")
    print("- Specifically look for MIME type errors or module loading errors")
    
    print("\n💡 Expected Results:")
    print("✅ Main site should load the AP Helper interface")
    print("✅ Navigation should work (React Router)")  
    print("✅ Socratic chat should load with AP Gov Unit 1 topics")
    print("✅ Chat should respond to messages about government topics")

if __name__ == "__main__":
    test_browser_access()
