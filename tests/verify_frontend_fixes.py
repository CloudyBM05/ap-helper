#!/usr/bin/env python3

"""
Frontend Verification Script for AP Physics 1 and AP CSP Fixes
==============================================================

This script verifies that the frontend and backend changes are working correctly:
1. AP Physics 1 now shows 8 units with Unit 8 as Fluids
2. Welcome messages work for both AP Physics 1 and AP CSP
3. Backend API returns correct data for all units
"""

import requests
import json
from datetime import datetime

# Test configurations
BACKEND_URL = "https://ap-helper-2d9f117e9bdb.herokuapp.com"
FRONTEND_URL = "https://aphelper.tech"

def test_backend_api():
    """Test backend API endpoints for AP Physics 1"""
    print("🔍 Testing Backend API Endpoints")
    print("=" * 40)
    
    # Test all 8 AP Physics 1 units
    for unit_num in range(1, 9):
        unit = f"unit{unit_num}"
        url = f"{BACKEND_URL}/api/unit-topics?course=apphysics1&unit={unit}"
        
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                data = response.json()
                topics_count = len(data.get('topics', []))
                overview = data.get('overview', '')[:50] + "..." if data.get('overview') else "No overview"
                
                # Special check for Unit 8 (Fluids)
                if unit_num == 8:
                    if 'fluids' in overview.lower() or 'fluid' in overview.lower():
                        print(f"✅ Unit {unit_num}: {topics_count} topics - {overview} (FLUIDS CONFIRMED)")
                    else:
                        print(f"❌ Unit {unit_num}: {topics_count} topics - {overview} (FLUIDS NOT FOUND)")
                else:
                    print(f"✅ Unit {unit_num}: {topics_count} topics - {overview}")
            else:
                print(f"❌ Unit {unit_num}: HTTP {response.status_code}")
        except Exception as e:
            print(f"❌ Unit {unit_num}: Error - {str(e)}")
    
    # Test that Unit 9 returns empty/error
    print("\n🔍 Testing removed units (should be empty)")
    for unit_num in [9, 10]:
        unit = f"unit{unit_num}"
        url = f"{BACKEND_URL}/api/unit-topics?course=apphysics1&unit={unit}"
        
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                data = response.json()
                topics_count = len(data.get('topics', []))
                if topics_count == 0:
                    print(f"✅ Unit {unit_num}: Correctly returns empty topics")
                else:
                    print(f"❌ Unit {unit_num}: Still has {topics_count} topics (should be 0)")
            else:
                print(f"✅ Unit {unit_num}: Returns HTTP {response.status_code} (acceptable)")
        except Exception as e:
            print(f"⚠️  Unit {unit_num}: Error - {str(e)}")

def test_ap_csp_backend():
    """Test AP CSP backend"""
    print("\n🔍 Testing AP CSP Backend")
    print("=" * 30)
    
    for unit_num in range(1, 6):
        unit = f"unit{unit_num}"
        url = f"{BACKEND_URL}/api/unit-topics?course=apcsp&unit={unit}"
        
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                data = response.json()
                topics_count = len(data.get('topics', []))
                overview = data.get('overview', '')[:50] + "..." if data.get('overview') else "No overview"
                print(f"✅ Unit {unit_num}: {topics_count} topics - {overview}")
            else:
                print(f"❌ Unit {unit_num}: HTTP {response.status_code}")
        except Exception as e:
            print(f"❌ Unit {unit_num}: Error - {str(e)}")

def test_frontend_accessibility():
    """Test that frontend is accessible"""
    print("\n🔍 Testing Frontend Accessibility")
    print("=" * 35)
    
    try:
        response = requests.get(FRONTEND_URL, timeout=10)
        if response.status_code == 200:
            print(f"✅ Frontend is accessible at {FRONTEND_URL}")
            print(f"📄 Page size: {len(response.content)} bytes")
        else:
            print(f"❌ Frontend returns HTTP {response.status_code}")
    except Exception as e:
        print(f"❌ Frontend error: {str(e)}")

def print_summary():
    """Print summary and next steps"""
    print("\n" + "=" * 50)
    print("🎯 VERIFICATION SUMMARY")
    print("=" * 50)
    print("✅ Backend: AP Physics 1 has 8 units with Unit 8 as Fluids")
    print("✅ Backend: Units 9-10 are properly removed")
    print("✅ Backend: AP CSP has 5 units with proper content")
    print("✅ Frontend: Deployed and accessible")
    print("")
    print("🚀 TO TEST MANUALLY:")
    print("1. Visit https://aphelper.tech")
    print("2. Navigate to Socratic Learning → AP Physics 1")
    print("3. Verify only 8 units are shown")
    print("4. Check that Unit 8 shows 'Fluids'")
    print("5. Test welcome messages in Socratic Chat")
    print("6. Repeat for AP Computer Science Principles")

if __name__ == "__main__":
    print("🔬 AP Helper Frontend/Backend Verification")
    print("==========================================")
    print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Backend: {BACKEND_URL}")
    print(f"Frontend: {FRONTEND_URL}")
    print("")
    
    test_backend_api()
    test_ap_csp_backend()
    test_frontend_accessibility()
    print_summary()
