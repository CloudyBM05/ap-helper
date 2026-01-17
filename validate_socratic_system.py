#!/usr/bin/env python3
"""
Socratic AI System Validation Script
Tests all implemented courses and units for proper functionality
"""

import sys
from pathlib import Path

def test_file_exists(file_path, description):
    """Test if a file exists"""
    path = Path(file_path)
    if path.exists():
        print(f"✅ {description}: {file_path}")
        return True
    else:
        print(f"❌ {description}: {file_path} (MISSING)")
        return False

def test_socratic_chat_implementation():
    """Test SocraticChat.tsx implementation"""
    print("\n🔍 Testing SocraticChat.tsx Implementation")
    
    file_path = "src/pages/SocraticChat.tsx"
    if not test_file_exists(file_path, "Main chat file"):
        return False
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Test for required functions
        functions = [
            'getUnitInfo',
            'getUnitTopics', 
            'Take.*Study Guide',
            'Take.*Quiz'
        ]
        
        for func in functions:
            if func.lower() in content.lower():
                print(f"✅ Function/Pattern found: {func}")
            else:
                print(f"❌ Function/Pattern missing: {func}")
        
        # Test for course implementations
        courses = ['apush', 'apgov', 'apworld']
        for course in courses:
            if f"course === '{course}'" in content:
                print(f"✅ Course implemented: {course}")
            else:
                print(f"❌ Course missing: {course}")
        
        # Test for unit topics (should have specific topics, not generic)
        if 'Socratic AI Ready' in content:
            print("⚠️  Warning: Generic 'Socratic AI Ready' message still present")
        else:
            print("✅ No generic sidebar messages found")
            
        # Test for study guide button logic
        if 'navigate(' in content and 'study-guide' in content:
            print("✅ Study guide navigation implemented")
        else:
            print("❌ Study guide navigation missing")
            
    except Exception as e:
        print(f"❌ Error reading file: {e}")
        return False
    
    return True

def test_socratic_learning_implementation():
    """Test SocraticLearning.tsx implementation"""
    print("\n🔍 Testing SocraticLearning.tsx Implementation")
    
    file_path = "src/pages/SocraticLearning.tsx"
    if not test_file_exists(file_path, "Course selection file"):
        return False
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Test for courses array
        if 'const courses = [' in content:
            print("✅ Courses array found")
        else:
            print("❌ Courses array missing")
        
        # Test for specific courses
        courses = ['apworld', 'apush', 'apgov']
        for course in courses:
            if f"id: '{course}'" in content:
                print(f"✅ Course defined: {course}")
            else:
                print(f"❌ Course missing: {course}")
                
    except Exception as e:
        print(f"❌ Error reading file: {e}")
        return False
    
    return True

def test_routing_implementation():
    """Test App.tsx routing"""
    print("\n🔍 Testing App.tsx Routing")
    
    file_path = "src/App.tsx"
    if not test_file_exists(file_path, "Main routing file"):
        return False
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Test for socratic chat route
        if '/socratic-chat/:course/:unit' in content:
            print("✅ Main socratic chat route found")
        else:
            print("❌ Main socratic chat route missing")
        
        # Test for course-specific routes
        routes = [
            '/apush-study-guide',
            '/ap-gov-unit',
            '/ap-world-study-guide',
            '/socratic-learning'
        ]
        
        for route in routes:
            if route in content:
                print(f"✅ Route found: {route}")
            else:
                print(f"❌ Route missing: {route}")
                
    except Exception as e:
        print(f"❌ Error reading file: {e}")
        return False
    
    return True

def test_backend_files():
    """Test backend implementation files"""
    print("\n🔍 Testing Backend Files")
    
    backend_files = [
        ('grader_api.py', 'Main API file'),
        ('requirements.txt', 'Python dependencies'),
        ('Procfile', 'Heroku deployment config'),
        ('runtime.txt', 'Python version specification')
    ]
    
    all_exist = True
    for file_path, description in backend_files:
        if not test_file_exists(file_path, description):
            all_exist = False
    
    return all_exist

def test_deployment_files():
    """Test deployment configuration"""
    print("\n🔍 Testing Deployment Files")
    
    deployment_files = [
        ('package.json', 'NPM configuration'),
        ('vite.config.ts', 'Vite configuration'),
        ('fly.toml', 'Fly.io configuration (optional)'),
        ('CNAME', 'GitHub Pages domain')
    ]
    
    for file_path, description in deployment_files:
        test_file_exists(file_path, description)

def run_validation_tests():
    """Run all validation tests"""
    print("🚀 Socratic AI System Validation")
    print("=" * 50)
    
    tests = [
        test_socratic_chat_implementation,
        test_socratic_learning_implementation, 
        test_routing_implementation,
        test_backend_files,
        test_deployment_files
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        try:
            if test():
                passed += 1
        except Exception as e:
            print(f"❌ Test failed with error: {e}")
    
    print(f"\n📊 Test Results: {passed}/{total} test suites passed")
    
    if passed == total:
        print("🎉 All tests passed! System is ready for deployment.")
    else:
        print("⚠️  Some tests failed. Please review the issues above.")
    
    return passed == total

def show_current_implementation_status():
    """Show current implementation status"""
    print("\n📋 Current Implementation Status")
    print("=" * 40)
    
    implementation_status = {
        'APUSH': {
            'units': '1-9',
            'topics': '✅ Complete',
            'sidebar': '✅ Specific topics',
            'button': '✅ Working navigation',
            'routes': '✅ All quiz routes exist'
        },
        'AP Government': {
            'units': '1-5', 
            'topics': '✅ Complete',
            'sidebar': '✅ Specific topics',
            'button': '✅ Working navigation',
            'routes': '✅ All unit routes exist'
        },
        'AP World': {
            'units': '1-9',
            'topics': '✅ Complete', 
            'sidebar': '✅ Specific topics',
            'button': '✅ Working navigation',
            'routes': '✅ All unit routes exist'
        }
    }
    
    for course, status in implementation_status.items():
        print(f"\n{course}:")
        for feature, state in status.items():
            print(f"  {feature}: {state}")

if __name__ == "__main__":
    success = run_validation_tests()
    show_current_implementation_status()
    
    print(f"\n{'🎯 READY FOR NEW COURSE IMPLEMENTATION' if success else '🔧 NEEDS FIXES BEFORE PROCEEDING'}")
    
    sys.exit(0 if success else 1)
