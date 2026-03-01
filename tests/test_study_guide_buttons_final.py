#!/usr/bin/env python3
"""
TEST: Study Guide Button Functionality

Verify that "Take UNIT Study Guide" buttons work for all courses and units.
"""

import webbrowser
import time

def main():
    print("🎯 TESTING STUDY GUIDE BUTTON FUNCTIONALITY")
    print("=" * 55)
    print()
    
    print("✅ WHAT SHOULD HAPPEN WHEN CLICKING STUDY GUIDE BUTTONS:")
    print()
    
    expected_behavior = {
        'APUSH': {
            'behavior': 'Navigate to quiz page with document-based questions',
            'example_url': '/apush-study-guide/unit/9/quiz',
            'button_text': 'Take UNIT9 Quiz →'
        },
        'AP Gov': {
            'behavior': 'Navigate to comprehensive study guide page',
            'example_url': '/ap-gov-unit/1',
            'button_text': 'Take UNIT1 Study Guide →'
        },
        'AP World': {
            'behavior': 'Navigate to study guide with practice questions',
            'example_url': '/ap-world-study-guide/unit/4',
            'button_text': 'Take UNIT4 Study Guide →'
        }
    }
    
    for course, info in expected_behavior.items():
        print(f"📚 {course}:")
        print(f"   Button Text: {info['button_text']}")
        print(f"   Expected URL: {info['example_url']}")
        print(f"   Behavior: {info['behavior']}")
        print()
    
    print("❌ WHAT SHOULD NOT HAPPEN:")
    print("- NO 'Study guide for [COURSE] [UNIT] is coming soon!' alert")
    print("- NO blank page or 404 error")
    print("- NO JavaScript console errors")
    print()
    
    # Test URLs for different courses and units
    test_urls = [
        # APUSH (should go to quiz pages)
        ("APUSH Unit 1 Study Guide", "https://aphelper.tech/?p=/socratic-chat/apush/unit1"),
        ("APUSH Unit 9 Study Guide", "https://aphelper.tech/?p=/socratic-chat/apush/unit9"),
        
        # AP Gov (should go to study guide pages)
        ("AP Gov Unit 1 Study Guide", "https://aphelper.tech/?p=/socratic-chat/apgov/unit1"),
        ("AP Gov Unit 5 Study Guide", "https://aphelper.tech/?p=/socratic-chat/apgov/unit5"),
        
        # AP World (should go to study guide pages)
        ("AP World Unit 1 Study Guide", "https://aphelper.tech/?p=/socratic-chat/apworld/unit1"),
        ("AP World Unit 4 Study Guide", "https://aphelper.tech/?p=/socratic-chat/apworld/unit4"),
        ("AP World Unit 9 Study Guide", "https://aphelper.tech/?p=/socratic-chat/apworld/unit9"),
    ]
    
    print("🌐 MANUAL TESTING INSTRUCTIONS:")
    print("For each page that opens:")
    print("1. Look for the study guide button in the sidebar")
    print("2. Click the 'Take [UNIT] Study Guide/Quiz →' button")
    print("3. Verify you are redirected to the correct page")
    print("4. Check that no error alerts appear")
    print()
    
    print("Opening test pages...")
    print()
    
    for i, (name, url) in enumerate(test_urls, 1):
        print(f"{i}. Opening {name}...")
        try:
            webbrowser.open(url)
            time.sleep(3)  # Wait between opens
        except Exception as e:
            print(f"   ⚠️ Error opening browser: {e}")
            print(f"   📋 Manual URL: {url}")
    
    print()
    print("🎯 SUCCESS CRITERIA:")
    print("   ✅ APUSH: Button navigates to quiz pages (/apush-study-guide/unit/X/quiz)")
    print("   ✅ AP Gov: Button navigates to unit pages (/ap-gov-unit/X)")
    print("   ✅ AP World: Button navigates to study guide pages (/ap-world-study-guide/unit/X)")
    print("   ✅ No error alerts or 'coming soon' messages")
    print("   ✅ Pages load successfully without 404 errors")
    print()
    print("❌ FAILURE INDICATORS:")
    print("   - Alert popup saying 'Study guide is coming soon!'")
    print("   - 404 page not found errors")
    print("   - Button does nothing when clicked")
    print("   - JavaScript console errors")

if __name__ == "__main__":
    main()
