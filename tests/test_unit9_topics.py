#!/usr/bin/env python3
"""
QUICK TEST: APUSH Unit 9 Sidebar Topics

Verify that APUSH Unit 9 shows specific topics instead of generic message.
"""

import webbrowser
import time

def main():
    print("🎯 TESTING APUSH UNIT 9 SIDEBAR TOPICS")
    print("=" * 50)
    print()
    
    print("✅ WHAT SHOULD APPEAR IN SIDEBAR:")
    print("📚 UNIT9 Topics section should show:")
    print("1. Reagan Revolution and Conservatism")
    print("2. End of Cold War")
    print("3. Economic and Technological Changes")
    print("4. Political Polarization")
    print("5. Modern Challenges and Issues")
    print()
    
    print("❌ WHAT SHOULD NOT APPEAR:")
    print("- NO 'Socratic AI Ready' message")
    print("- NO generic 'Advanced AI tutor available for all topics'")
    print("- NO 'Start chatting below to explore any concept!'")
    print()
    
    print("🌐 Opening APUSH Unit 9...")
    url = "https://aphelper.tech/?p=/socratic-chat/apush/unit9"
    
    try:
        webbrowser.open(url)
        print(f"✅ Opened: {url}")
        print()
        print("👀 MANUAL VERIFICATION REQUIRED:")
        print("1. Look at the left sidebar")
        print("2. Find the '📚 UNIT9 Topics' section")
        print("3. Verify you see 5 specific topic buttons")
        print("4. Verify NO generic 'Socratic AI Ready' message")
        print()
        print("🎯 SUCCESS = Specific topics visible")
        print("❌ FAILURE = Generic 'Socratic AI Ready' message")
        
    except Exception as e:
        print(f"❌ Error opening browser: {e}")
        print(f"📋 Manual URL: {url}")

if __name__ == "__main__":
    main()
