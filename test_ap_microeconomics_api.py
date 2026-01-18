#!/usr/bin/env python3
"""Test script to validate AP Course API endpoints and sidebar topics"""

import requests
import json
from typing import Dict, List

# Backend API base URL
API_BASE = "https://ap-helper-2d9f117e9bdb.herokuapp.com"

def test_unit_topics(course: str, unit: str) -> Dict:
    """Test unit topics API endpoint"""
    url = f"{API_BASE}/api/unit-topics?course={course}&unit={unit}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return {
            'status': 'success',
            'unit': unit,
            'course': course,
            'topics_count': len(data.get('topics', [])),
            'overview_present': bool(data.get('overview')),
            'topics_preview': [topic.get('title', 'No title') for topic in data.get('topics', [])[:3]]
        }
    except Exception as e:
        return {
            'status': 'error',
            'unit': unit,
            'course': course,
            'error': str(e)
        }

def test_socratic_chat(course: str, unit: str) -> Dict:
    """Test Socratic chat API endpoint"""
    url = f"{API_BASE}/api/socratic-chat"
    
    payload = {
        'message': 'What is scarcity in economics?',
        'course': course,
        'unit': unit,
        'conversationHistory': []
    }
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        data = response.json()
        return {
            'status': 'success',
            'unit': unit,
            'course': course,
            'response_length': len(data.get('response', '')),
            'has_gemini': 'gemini' in data.get('source', '').lower(),
            'topic_provided': bool(data.get('topic'))
        }
    except Exception as e:
        return {
            'status': 'error',
            'unit': unit,
            'course': course,
            'error': str(e)
        }

def main():
    """Test AP Microeconomics, AP Macroeconomics, and AP Human Geography units"""
    print("🧪 Testing AP Course API Endpoints")
    print("=" * 60)
    
    courses = {
        "apmicro": "AP Microeconomics",
        "apmacro": "AP Macroeconomics", 
        "aphug": "AP Human Geography"
    }
    
    # Different unit counts for different courses
    units_config = {
        "apmicro": ["unit1", "unit2", "unit3", "unit4", "unit5", "unit6"],
        "apmacro": ["unit1", "unit2", "unit3", "unit4", "unit5", "unit6"],
        "aphug": ["unit1", "unit2", "unit3", "unit4", "unit5", "unit6", "unit7"]
    }
    
    all_topics_success = 0
    all_chat_success = 0
    total_tests = 0
    
    for course_id, course_name in courses.items():
        print(f"\n🎓 Testing {course_name}:")
        print("-" * 50)
        
        units = units_config[course_id]
        
        # Test unit topics API
        print(f"\n📚 {course_name} Unit Topics API:")
        print("-" * 40)
        
        topics_results = []
        for unit in units:
            result = test_unit_topics(course_id, unit)
            topics_results.append(result)
            total_tests += 1
            
            if result['status'] == 'success':
                all_topics_success += 1
                print(f"✅ {unit.upper()}: {result['topics_count']} topics, overview: {result['overview_present']}")
                print(f"   Topics: {', '.join(result['topics_preview'])}{'...' if result['topics_count'] > 3 else ''}")
            else:
                print(f"❌ {unit.upper()}: {result['error']}")
        
        # Test Socratic chat API  
        print(f"\n🤖 {course_name} Socratic Chat API:")
        print("-" * 40)
        
        chat_results = []
        for unit in units:
            # Use appropriate test message for each course
            if course_id == 'aphug':
                test_message = 'What is spatial thinking in geography?'
            else:
                test_message = 'What is scarcity in economics?'
            
            result = test_socratic_chat(course_id, unit)
            chat_results.append(result)
            
            if result['status'] == 'success':
                all_chat_success += 1
                gemini_status = "🤖 Gemini AI" if result['has_gemini'] else "📝 Fallback"
                print(f"✅ {unit.upper()}: {gemini_status}, response: {result['response_length']} chars")
            else:
                print(f"❌ {unit.upper()}: {result['error']}")
        
        # Course summary
        topics_success = sum(1 for r in topics_results if r['status'] == 'success')
        chat_success = sum(1 for r in chat_results if r['status'] == 'success')
        
        print(f"\n📊 {course_name} Summary:")
        print(f"   Unit Topics: {topics_success}/{len(units)} working")
        print(f"   Socratic Chat: {chat_success}/{len(units)} working")
    
    # Overall Summary
    print("\n🎯 OVERALL SUMMARY:")
    print("=" * 60)
    
    print(f"Unit Topics API: {all_topics_success}/{total_tests} total tests passing")
    print(f"Socratic Chat API: {all_chat_success}/{total_tests} total tests passing")
    
    if all_topics_success == total_tests:
        print("\n🎉 ALL AP COURSES HAVE WORKING TOPICS!")
        print("✅ AP Microeconomics: Complete (6 units)")
        print("✅ AP Macroeconomics: Complete (6 units)")
        print("✅ AP Human Geography: Complete (7 units)")
        print("\n🌐 Access at: https://aphelper.tech/socratic-learning")
    else:
        missing_topics = total_tests - all_topics_success
        missing_chat = total_tests - all_chat_success
        print(f"\n⚠️  Issues found: {missing_topics} topic failures, {missing_chat} chat failures")
    
    return all_topics_success == total_tests

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
