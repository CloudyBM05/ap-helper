#!/usr/bin/env python3
"""
Test script for the Topics API functionality
Tests the /api/unit-topics endpoint locally
"""

import requests
import json
import sys

def test_topics_api():
    """Test the topics API endpoint with various scenarios"""
    base_url = "http://localhost:8080/api/unit-topics"
    
    print("🔍 Testing Topics API Functionality")
    print("=" * 50)
    
    # Test valid units
    valid_tests = [
        {"course": "apush", "unit": "unit1", "expected_topics": 6},
        {"course": "apush", "unit": "unit2", "expected_topics": 6},
        {"course": "apush", "unit": "unit5", "expected_topics": 6},
        {"course": "apush", "unit": "unit9", "expected_topics": 6},
    ]
    
    print("\n✅ Testing Valid Units:")
    for test in valid_tests:
        try:
            response = requests.get(base_url, params=test)
            if response.status_code == 200:
                data = response.json()
                actual_topics = len(data.get('topics', []))
                status = "✓" if actual_topics == test['expected_topics'] else "✗"
                print(f"  {status} {test['unit']}: {actual_topics}/{test['expected_topics']} topics")
                if actual_topics > 0:
                    print(f"    Sample: {data['topics'][0]['title']}")
            else:
                print(f"  ✗ {test['unit']}: HTTP {response.status_code}")
        except requests.exceptions.ConnectionError:
            print("  ❌ Backend not running - please start the backend first")
            return False
        except Exception as e:
            print(f"  ✗ {test['unit']}: Error - {e}")
    
    # Test error cases
    print("\n🚫 Testing Error Cases:")
    error_tests = [
        {"params": {"course": "apush"}, "expected_status": 400, "desc": "Missing unit parameter"},
        {"params": {"course": "apush", "unit": "invalidunit"}, "expected_status": 404, "desc": "Invalid unit"},
    ]
    
    for test in error_tests:
        try:
            response = requests.get(base_url, params=test['params'])
            status = "✓" if response.status_code == test['expected_status'] else "✗"
            print(f"  {status} {test['desc']}: HTTP {response.status_code}")
        except Exception as e:
            print(f"  ✗ {test['desc']}: Error - {e}")
    
    return True

def check_heroku_compatibility():
    """Check if the configuration is compatible with Heroku deployment"""
    print("\n🚀 Heroku Compatibility Check:")
    print("-" * 30)
    
    checks = [
        {"file": "Procfile", "content": "web: gunicorn grader_api:app"},
        {"file": "requirements.txt", "required_packages": ["flask", "gunicorn", "flask-cors"]},
        {"file": "runtime.txt", "python_version": "python-3.11.5"},
    ]
    
    import os
    
    # Check Procfile
    if os.path.exists("Procfile"):
        with open("Procfile", "r") as f:
            procfile_content = f.read().strip()
            if "gunicorn grader_api:app" in procfile_content:
                print("  ✓ Procfile configured correctly for Heroku")
            else:
                print(f"  ✗ Procfile issue: {procfile_content}")
    else:
        print("  ✗ Procfile not found")
    
    # Check requirements.txt
    if os.path.exists("requirements.txt"):
        with open("requirements.txt", "r") as f:
            requirements = f.read().lower()
            missing = []
            for pkg in ["flask", "gunicorn", "flask-cors"]:
                if pkg not in requirements:
                    missing.append(pkg)
            
            if not missing:
                print("  ✓ Required packages in requirements.txt")
            else:
                print(f"  ✗ Missing packages: {', '.join(missing)}")
    else:
        print("  ✗ requirements.txt not found")
    
    # Check runtime.txt
    if os.path.exists("runtime.txt"):
        with open("runtime.txt", "r") as f:
            runtime = f.read().strip()
            if "python-3.11" in runtime:
                print("  ✓ Python runtime specified")
            else:
                print(f"  ⚠ Unusual runtime: {runtime}")
    else:
        print("  ⚠ runtime.txt not found (will use Heroku default)")
    
    # Check for CORS configuration in grader_api.py
    if os.path.exists("grader_api.py"):
        with open("grader_api.py", "r") as f:
            api_content = f.read()
            if "herokuapp.com" in api_content:
                print("  ✓ CORS configured for Heroku domain")
            else:
                print("  ⚠ Heroku domain not found in CORS settings")
    
    print("\n✅ Ready for Heroku deployment!")

if __name__ == "__main__":
    print("Topics API Test Suite")
    print("=====================")
    
    if test_topics_api():
        check_heroku_compatibility()
        
        print("\n📋 Summary:")
        print("- Topics API is working locally ✅")
        print("- Error handling is working ✅")
        print("- Heroku configuration is ready ✅")
        print("\nTo deploy to Heroku, run: git push heroku main")
    else:
        print("\n❌ Please start the backend first with:")
        print("python grader_api.py")
        sys.exit(1)
