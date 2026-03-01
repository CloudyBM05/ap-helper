#!/usr/bin/env python3
"""
Final verification test for Socratic AI chatbot
Tests all APUSH units to ensure no "Unknown Unit" or hardcoded issues remain
"""

import requests
import json

def test_all_units():
    """Test all APUSH units to verify they work correctly"""
    base_url = "http://localhost:5000"
    
    print("🔍 Testing all APUSH units...")
    print("=" * 50)
    
    for unit_num in range(1, 10):
        unit_formats = [f"unit{unit_num}", f"Unit {unit_num}", f"UNIT {unit_num}"]
        
        for unit_format in unit_formats:
            print(f"\n📚 Testing {unit_format}...")
            
            # Test Socratic response
            try:
                response = requests.post(
                    f"{base_url}/socratic",
                    json={
                        "course": "apush",
                        "unit": unit_format,
                        "message": "What can you tell me about this unit?",
                        "conversation_memory": {}
                    },
                    timeout=30
                )
                
                if response.status_code == 200:
                    data = response.json()
                    if "Unknown Unit" in data.get('response', ''):
                        print(f"❌ FAILURE: {unit_format} returned 'Unknown Unit'")
                    else:
                        print(f"✅ SUCCESS: {unit_format} works correctly")
                        
                        # Check for unit-specific content
                        response_text = data.get('response', '').lower()
                        if f"unit {unit_num}" in response_text or unit_format.lower() in response_text:
                            print(f"   📝 Contains unit-specific content")
                        else:
                            print(f"   ⚠️  Generic response (may be normal)")
                else:
                    print(f"❌ HTTP Error {response.status_code} for {unit_format}")
                    
            except Exception as e:
                print(f"❌ Exception testing {unit_format}: {e}")
                
            # Brief pause between requests
            import time
            time.sleep(0.1)
    
    print(f"\n{'=' * 50}")
    print("🎯 Test completed! Check results above.")

if __name__ == "__main__":
    test_all_units()
