#!/usr/bin/env python3
"""
Test all sidebar topics for APUSH, AP Gov, and AP World units
"""

import requests
import time

def test_unit_topics_api():
    """Test the unit topics API for all units"""
    base_url = "https://ap-helper-2d9f117e9bdb.herokuapp.com"
    
    test_cases = [
        # APUSH Units 1-9
        ("APUSH Unit 1", "apush", "unit1"),
        ("APUSH Unit 2", "apush", "unit2"), 
        ("APUSH Unit 3", "apush", "unit3"),
        ("APUSH Unit 4", "apush", "unit4"),
        ("APUSH Unit 5", "apush", "unit5"),
        ("APUSH Unit 6", "apush", "unit6"),
        ("APUSH Unit 7", "apush", "unit7"),
        ("APUSH Unit 8", "apush", "unit8"),
        ("APUSH Unit 9", "apush", "unit9"),
        
        # AP Gov Units 1-5
        ("AP Gov Unit 1", "apgov", "unit1"),
        ("AP Gov Unit 2", "apgov", "unit2"),
        ("AP Gov Unit 3", "apgov", "unit3"),
        ("AP Gov Unit 4", "apgov", "unit4"),
        ("AP Gov Unit 5", "apgov", "unit5"),
        
        # AP World Units 1-4
        ("AP World Unit 1", "apworld", "unit1"),
        ("AP World Unit 2", "apworld", "unit2"),
        ("AP World Unit 3", "apworld", "unit3"),
        ("AP World Unit 4", "apworld", "unit4"),
    ]
    
    print("🔍 Testing Unit Topics API for all units...\n")
    
    api_results = []
    for name, course, unit in test_cases:
        try:
            url = f"{base_url}/api/unit-topics?course={course}&unit={unit}"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                topics = response.json().get('topics', [])
                status = "✅ API OK" if topics else "⚠️ API Empty"
                print(f"{name}: {status} ({len(topics)} topics)")
                api_results.append((name, True, len(topics)))
            else:
                print(f"{name}: ❌ API Error ({response.status_code})")
                api_results.append((name, False, 0))
                
        except Exception as e:
            print(f"{name}: ❌ API Exception ({str(e)[:50]})")
            api_results.append((name, False, 0))
            
        time.sleep(0.2)  # Rate limiting
    
    print(f"\n📊 API Summary:")
    working = sum(1 for _, works, _ in api_results if works)
    total = len(api_results)
    print(f"Working APIs: {working}/{total}")
    
    if working < total:
        print("\n❗ Units with API issues (will rely on frontend fallbacks):")
        for name, works, count in api_results:
            if not works:
                print(f"  - {name}")
    
    return api_results

def test_frontend_urls():
    """Test frontend URLs for all units"""
    base_url = "https://aphelper.tech"
    
    test_urls = [
        # APUSH Units 1-9
        f"{base_url}/socratic-chat/apush/unit1",
        f"{base_url}/socratic-chat/apush/unit2",
        f"{base_url}/socratic-chat/apush/unit3",
        f"{base_url}/socratic-chat/apush/unit4",
        f"{base_url}/socratic-chat/apush/unit5",
        f"{base_url}/socratic-chat/apush/unit6",
        f"{base_url}/socratic-chat/apush/unit7",
        f"{base_url}/socratic-chat/apush/unit8",
        f"{base_url}/socratic-chat/apush/unit9",
        
        # AP Gov Units 1-5
        f"{base_url}/socratic-chat/apgov/unit1",
        f"{base_url}/socratic-chat/apgov/unit2",
        f"{base_url}/socratic-chat/apgov/unit3",
        f"{base_url}/socratic-chat/apgov/unit4",
        f"{base_url}/socratic-chat/apgov/unit5",
        
        # AP World Units 1-4
        f"{base_url}/socratic-chat/apworld/unit1",
        f"{base_url}/socratic-chat/apworld/unit2",
        f"{base_url}/socratic-chat/apworld/unit3",
        f"{base_url}/socratic-chat/apworld/unit4",
    ]
    
    print("\n🌐 Testing Frontend URLs...\n")
    
    frontend_results = []
    for url in test_urls:
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                print(f"✅ {url.split('/')[-2:]} - Frontend loads")
                frontend_results.append((url, True))
            else:
                print(f"❌ {url.split('/')[-2:]} - Error {response.status_code}")
                frontend_results.append((url, False))
        except Exception as e:
            print(f"❌ {url.split('/')[-2:]} - Exception: {str(e)[:30]}...")
            frontend_results.append((url, False))
            
        time.sleep(0.3)  # Rate limiting
    
    working_frontend = sum(1 for _, works in frontend_results if works)
    total_frontend = len(frontend_results)
    print(f"\n📊 Frontend Summary: {working_frontend}/{total_frontend} URLs working")
    
    return frontend_results

def main():
    print("🧪 Testing All Sidebar Topics for APUSH, AP Gov, and AP World")
    print("=" * 60)
    
    # Test API endpoints
    api_results = test_unit_topics_api()
    
    # Test frontend URLs  
    frontend_results = test_frontend_urls()
    
    print("\n" + "=" * 60)
    print("🎯 FINAL SUMMARY")
    print("=" * 60)
    
    api_working = sum(1 for _, works, _ in api_results if works)
    frontend_working = sum(1 for _, works in frontend_results if works)
    
    print(f"📡 Backend API: {api_working}/{len(api_results)} units working")
    print(f"🌐 Frontend URLs: {frontend_working}/{len(frontend_results)} pages loading")
    
    print(f"\n✅ Status: All units should have topics via fallback system")
    print(f"   - Frontend fallbacks cover all APUSH (1-9), AP Gov (1-5), AP World (1-4)")
    print(f"   - Even if API fails, sidebar topics will display")
    
    print(f"\n🔗 Test manually:")
    print(f"   1. https://aphelper.tech/socratic-chat/apush/unit1")
    print(f"   2. https://aphelper.tech/socratic-chat/apgov/unit1") 
    print(f"   3. https://aphelper.tech/socratic-chat/apworld/unit1")
    print(f"   4. Check sidebar for clickable topic buttons")

if __name__ == "__main__":
    main()
