#!/usr/bin/env python3
"""
Firebase Auth Error Diagnosis Script
Tests Firebase configuration and helps identify authentication issues
"""

import requests
import json
from urllib.parse import urljoin

def test_firebase_config():
    """Test if Firebase configuration is working"""
    print("🔍 Testing Firebase Authentication...")
    print("=" * 50)
    
    # Test the live site (custom domain)
    base_url = "https://aphelper.tech/"
    
    # 1. Test if main site loads
    print("\n1. Testing main site accessibility...")
    try:
        response = requests.get(base_url, timeout=10)
        if response.status_code == 200:
            print("   ✅ Main site accessible")
            
            # Check if Firebase scripts are loading
            if "firebasejs" in response.text:
                print("   ✅ Firebase scripts found in HTML")
            else:
                print("   ❌ Firebase scripts not found in HTML")
                
            # Check CSP headers
            csp = response.headers.get('Content-Security-Policy', '')
            if 'firebaseapp.com' in csp:
                print("   ✅ Firebase domains found in CSP")
            else:
                print("   ❌ Firebase domains not found in CSP")
                
        else:
            print(f"   ❌ Site not accessible: {response.status_code}")
    except Exception as e:
        print(f"   ❌ Error accessing site: {e}")
    
    # 2. Test Firebase test page
    print("\n2. Testing Firebase test page...")
    test_url = urljoin(base_url, "firebase_test.html")
    try:
        response = requests.get(test_url, timeout=10)
        if response.status_code == 200:
            print("   ✅ Firebase test page accessible")
        else:
            print(f"   ❌ Firebase test page not accessible: {response.status_code}")
    except Exception as e:
        print(f"   ❌ Error accessing Firebase test page: {e}")
    
    # 3. Test login page
    print("\n3. Testing login page...")
    login_url = urljoin(base_url, "login")
    try:
        response = requests.get(login_url, timeout=10)
        if response.status_code == 200:
            print("   ✅ Login page accessible")
        else:
            print(f"   ❌ Login page not accessible: {response.status_code}")
    except Exception as e:
        print(f"   ❌ Error accessing login page: {e}")
    
    # 4. Check Firebase project status
    print("\n4. Checking Firebase project configuration...")
    firebase_config = {
        "apiKey": "AIzaSyAxrYV2R8PLLrJLHSwgcg_gkFttWtr-2Go",
        "authDomain": "ap-helper-7a6ac.firebaseapp.com",
        "projectId": "ap-helper-7a6ac"
    }
    
    # Test if Firebase project auth domain is accessible
    auth_domain = f"https://{firebase_config['authDomain']}"
    try:
        response = requests.get(auth_domain, timeout=10, allow_redirects=True)
        print(f"   ✅ Firebase auth domain accessible: {response.status_code}")
    except Exception as e:
        print(f"   ❌ Firebase auth domain not accessible: {e}")
    
    # 5. Test Firebase Auth API endpoint
    print("\n5. Testing Firebase Auth API...")
    auth_api_url = f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={firebase_config['apiKey']}"
    try:
        # Send a test request (will fail but should return proper error)
        response = requests.post(auth_api_url, 
                               json={"email": "test@example.com", "password": "test123"},
                               timeout=10)
        if response.status_code in [400, 401, 403]:
            print("   ✅ Firebase Auth API responding (expected auth error)")
        else:
            print(f"   ❓ Unexpected Firebase Auth API response: {response.status_code}")
    except Exception as e:
        print(f"   ❌ Firebase Auth API not accessible: {e}")
    
    print("\n" + "=" * 50)
    print("🔧 Diagnosis Summary:")
    print("   - Check browser console for detailed JavaScript errors")
    print("   - Ensure Firebase project is properly configured")
    print("   - Verify API keys and domain settings in Firebase Console")
    print("   - Test Google OAuth setup in Firebase Console")
    print("\n💡 Next steps:")
    print("   1. Open browser dev tools and check Console tab")
    print("   2. Try the login process and note exact error messages")
    print("   3. Verify Firebase project settings match configuration")

if __name__ == "__main__":
    test_firebase_config()
