#!/usr/bin/env python3
"""
TEST: AP World Units 5-9 Sidebar Topics

Verify that AP World units 5-9 now show specific topics instead of generic messages.
"""

import webbrowser
import time

def main():
    print("🎯 TESTING AP WORLD UNITS 5-9 SIDEBAR TOPICS")
    print("=" * 55)
    print()
    
    print("✅ WHAT SHOULD APPEAR IN SIDEBAR FOR EACH UNIT:")
    print()
    
    units_topics = {
        'unit5': [
            'Enlightenment and Political Revolutions',
            'Spread of Industrialization',
            'Social Reform and Abolition',
            'Nationalism and Nation-Building',
            'Economic Imperialism and Resistance'
        ],
        'unit6': [
            'Mass Production and Consumer Culture',
            'Urbanization and Social Changes',
            'Labor Organization and Strikes',
            'New Imperialism and Scramble for Africa',
            'Global Migration Patterns'
        ],
        'unit7': [
            'World War I and Total War',
            'Interwar Period and Economic Crisis',
            'World War II and Holocaust',
            'Origins of the Cold War',
            'Beginning of Decolonization'
        ],
        'unit8': [
            'Cold War Proxy Conflicts',
            'Completion of Decolonization',
            'Economic Development Models',
            'Global Social Movements',
            'Cultural Exchange and Resistance'
        ],
        'unit9': [
            'End of Cold War',
            'Economic Globalization',
            'Technological Revolution',
            'Environmental and Health Challenges',
            'Contemporary Global Conflicts'
        ]
    }
    
    for unit, topics in units_topics.items():
        print(f"📚 AP World {unit.upper()}:")
        for i, topic in enumerate(topics, 1):
            print(f"   {i}. {topic}")
        print()
    
    print("❌ WHAT SHOULD NOT APPEAR:")
    print("- NO 'Socratic AI Ready' message")
    print("- NO generic 'Advanced AI tutor available for all topics'")
    print("- NO 'Start chatting below to explore any concept!'")
    print()
    
    # Test each unit
    test_urls = [
        ("AP World Unit 5", "https://aphelper.tech/?p=/socratic-chat/apworld/unit5"),
        ("AP World Unit 6", "https://aphelper.tech/?p=/socratic-chat/apworld/unit6"),
        ("AP World Unit 7", "https://aphelper.tech/?p=/socratic-chat/apworld/unit7"),
        ("AP World Unit 8", "https://aphelper.tech/?p=/socratic-chat/apworld/unit8"),
        ("AP World Unit 9", "https://aphelper.tech/?p=/socratic-chat/apworld/unit9"),
    ]
    
    print("🌐 Opening AP World Units 5-9...")
    print()
    
    for i, (name, url) in enumerate(test_urls, 1):
        print(f"{i}. Opening {name}...")
        try:
            webbrowser.open(url)
            time.sleep(2)  # Wait between opens
        except Exception as e:
            print(f"   ⚠️ Error opening browser: {e}")
            print(f"   📋 Manual URL: {url}")
    
    print()
    print("👀 MANUAL VERIFICATION REQUIRED:")
    print("For each opened unit, check:")
    print("1. Left sidebar shows '📚 UNIT[X] Topics' section")
    print("2. 5 specific clickable topic buttons appear")
    print("3. Topics match the curriculum content above")
    print("4. NO generic 'Socratic AI Ready' message")
    print("5. Each topic shows '5 key concepts' or similar")
    print()
    print("🎯 SUCCESS = All units show specific historical topics")
    print("❌ FAILURE = Any unit shows generic 'Socratic AI Ready'")

if __name__ == "__main__":
    main()
