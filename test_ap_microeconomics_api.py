#!/usr/bin/env python3
"""Test script to validate AP Microeconomics API endpoints and sidebar topics"""

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
    """Test all AP Microeconomics units"""
    print("🧪 Testing AP Microeconomics API Endpoints")
    print("=" * 60)
    
    course = "apmicro"
    units = ["unit1", "unit2", "unit3", "unit4", "unit5", "unit6"]
    
    # Test unit topics API
    print("\n📚 Testing Unit Topics API:")
    print("-" * 40)
    
    topics_results = []
    for unit in units:
        result = test_unit_topics(course, unit)
        topics_results.append(result)
        
        if result['status'] == 'success':
            print(f"✅ {unit.upper()}: {result['topics_count']} topics, overview: {result['overview_present']}")
            print(f"   Topics: {', '.join(result['topics_preview'])}{'...' if result['topics_count'] > 3 else ''}")
        else:
            print(f"❌ {unit.upper()}: {result['error']}")
    
    # Test Socratic chat API  
    print("\n🤖 Testing Socratic Chat API:")
    print("-" * 40)
    
    chat_results = []
    for unit in units:
        result = test_socratic_chat(course, unit)
        chat_results.append(result)
        
        if result['status'] == 'success':
            gemini_status = "🤖 Gemini AI" if result['has_gemini'] else "📝 Fallback"
            print(f"✅ {unit.upper()}: {gemini_status}, response: {result['response_length']} chars")
        else:
            print(f"❌ {unit.upper()}: {result['error']}")
    
    # Summary
    print("\n📊 Summary:")
    print("-" * 40)
    
    topics_success = sum(1 for r in topics_results if r['status'] == 'success')
    chat_success = sum(1 for r in chat_results if r['status'] == 'success')
    
    print(f"Unit Topics API: {topics_success}/{len(units)} units working")
    print(f"Socratic Chat API: {chat_success}/{len(units)} units working")
    
    if topics_success == len(units) and chat_success == len(units):
        print("\n🎉 All AP Microeconomics units have working sidebar topics and Socratic AI!")
    else:
        print("\n⚠️  Some units may have issues. Check the logs above.")
    
    return topics_success == len(units) and chat_success == len(units)

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
