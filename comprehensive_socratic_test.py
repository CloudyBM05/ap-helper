#!/usr/bin/env python3
"""
Comprehensive test of the Socratic AI system across all AP courses and units.
Tests conversational flow, context awareness, and unit coverage.
"""

import sys
import os

# Add the current directory to Python path to import grader_api
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from grader_api import get_socratic_response, get_course_context
    print("✅ Successfully imported Socratic AI functions")
except ImportError as e:
    print(f"❌ Failed to import: {e}")
    exit(1)

def test_course_coverage():
    """Test that all courses and units have proper content"""
    print("\n" + "="*60)
    print("🔍 TESTING COURSE COVERAGE")
    print("="*60)
    
    # Define expected units for each course
    courses_units = {
        'apush': ['unit1', 'unit2', 'unit3', 'unit4', 'unit5', 'unit6', 'unit7', 'unit8', 'unit9'],
        'apgov': ['unit1', 'unit2', 'unit3', 'unit4', 'unit5'],
        'apworld': ['unit1', 'unit2', 'unit3', 'unit4']
    }
    
    coverage_results = {}
    
    for course, units in courses_units.items():
        print(f"\n📚 Testing {course.upper()} coverage:")
        course_coverage = {}
        
        for unit in units:
            try:
                course_context = get_course_context(course, unit)
                
                # Check if context has required fields
                required_fields = ['title', 'overview', 'key_themes', 'topics_overview', 'main_concepts']
                has_all_fields = all(field in course_context for field in required_fields)
                
                if has_all_fields:
                    print(f"  ✅ {unit}: {course_context['title']}")
                    course_coverage[unit] = True
                else:
                    print(f"  ❌ {unit}: Missing required fields")
                    course_coverage[unit] = False
                    
            except Exception as e:
                print(f"  ❌ {unit}: Error - {e}")
                course_coverage[unit] = False
        
        coverage_results[course] = course_coverage
    
    return coverage_results

def test_conversational_flow():
    """Test that the system provides contextual, conversational responses"""
    print("\n" + "="*60)
    print("💬 TESTING CONVERSATIONAL FLOW")
    print("="*60)
    
    # Test scenarios for different conversation patterns
    test_scenarios = [
        {
            'course': 'apush',
            'unit': 'unit1',
            'conversation': [
                "Tell me about this unit",
                "What about Native Americans?",
                "I'm confused about the disease topic",
                "How did this change everything?"
            ]
        },
        {
            'course': 'apgov', 
            'unit': 'unit1',
            'conversation': [
                "What is this unit about?",
                "Tell me about the Constitution",
                "Why separation of powers?",
                "I don't understand"
            ]
        },
        {
            'course': 'apworld',
            'unit': 'unit2',
            'conversation': [
                "Give me an overview",
                "What was the Columbian Exchange?",
                "How did people get harmed?",
                "That's really interesting"
            ]
        }
    ]
    
    for i, scenario in enumerate(test_scenarios, 1):
        print(f"\n🧪 Scenario {i}: {scenario['course'].upper()} {scenario['unit']}")
        print("-" * 40)
        
        chat_history = []
        
        for j, user_input in enumerate(scenario['conversation'], 1):
            print(f"\n👤 User: {user_input}")
            
            try:
                response_data = get_socratic_response(
                    user_input, 
                    scenario['course'], 
                    scenario['unit'], 
                    chat_history
                )
                
                print(f"🤖 AI: {response_data['response'][:150]}...")
                print(f"   Topic: {response_data.get('topic', 'Unknown')}")
                print(f"   Concepts: {response_data.get('concepts_introduced', [])}")
                
                # Add to chat history for context
                chat_history.append({
                    'sender': 'user',
                    'content': user_input
                })
                chat_history.append({
                    'sender': 'ai', 
                    'content': response_data['response']
                })
                
                # Validate response quality
                response_text = response_data['response'].lower()
                if len(response_data['response']) < 50:
                    print("   ⚠️  Warning: Response seems too short")
                if 'error' in response_text or 'failed' in response_text:
                    print("   ⚠️  Warning: Response contains error indicators")
                    
            except Exception as e:
                print(f"   ❌ Error: {e}")

def test_topic_specific_responses():
    """Test responses to specific topic areas"""
    print("\n" + "="*60)
    print("🎯 TESTING TOPIC-SPECIFIC RESPONSES")
    print("="*60)
    
    topic_tests = [
        # Disease/population questions
        {
            'input': 'How did disease affect populations?',
            'course': 'apush',
            'unit': 'unit1',
            'expected_keywords': ['disease', 'population', 'immunity', 'smallpox']
        },
        # Government questions
        {
            'input': 'How does the Constitution work?',
            'course': 'apgov',
            'unit': 'unit1', 
            'expected_keywords': ['constitution', 'separation', 'powers', 'branches']
        },
        # Trade questions
        {
            'input': 'Tell me about trade networks',
            'course': 'apworld',
            'unit': 'unit1',
            'expected_keywords': ['trade', 'silk roads', 'networks', 'exchange']
        },
        # War/conflict questions
        {
            'input': 'What about wars and conflicts?',
            'course': 'apush',
            'unit': 'unit5',
            'expected_keywords': ['war', 'conflict', 'civil war']
        },
        # Economic questions
        {
            'input': 'How did the economy change?',
            'course': 'apush',
            'unit': 'unit4',
            'expected_keywords': ['economic', 'market', 'revolution', 'industry']
        }
    ]
    
    for i, test in enumerate(topic_tests, 1):
        print(f"\n🧪 Test {i}: {test['course'].upper()} {test['unit']}")
        print(f"Input: '{test['input']}'")
        
        try:
            response_data = get_socratic_response(
                test['input'],
                test['course'], 
                test['unit'],
                []  # Empty chat history
            )
            
            response_text = response_data['response'].lower()
            
            # Check for expected keywords
            found_keywords = [kw for kw in test['expected_keywords'] if kw in response_text]
            missing_keywords = [kw for kw in test['expected_keywords'] if kw not in response_text]
            
            print(f"Response length: {len(response_data['response'])} chars")
            print(f"✅ Found keywords: {found_keywords}")
            if missing_keywords:
                print(f"❌ Missing keywords: {missing_keywords}")
            
            # Check response structure
            if response_data.get('topic'):
                print(f"✅ Has topic: {response_data['topic']}")
            if response_data.get('concepts_introduced'):
                print(f"✅ Introduces concepts: {response_data['concepts_introduced']}")
                
        except Exception as e:
            print(f"❌ Error: {e}")

def test_confusion_handling():
    """Test how the system handles confused users"""
    print("\n" + "="*60)
    print("❓ TESTING CONFUSION HANDLING")
    print("="*60)
    
    confusion_inputs = [
        "I'm confused",
        "I don't understand",
        "What are you talking about?",
        "This doesn't make sense",
        "IDK what you mean"
    ]
    
    # Test with prior context about diseases
    chat_history = [
        {'sender': 'ai', 'content': 'Disease outbreaks devastated Native American populations...'},
        {'sender': 'user', 'content': 'Tell me more'}
    ]
    
    print("🧪 Testing confusion after disease discussion:")
    for confusion_input in confusion_inputs:
        try:
            response_data = get_socratic_response(
                confusion_input,
                'apush',
                'unit1', 
                chat_history
            )
            
            print(f"\n👤 '{confusion_input}'")
            print(f"🤖 {response_data['response'][:100]}...")
            
            # Check if clarification is contextual
            response_lower = response_data['response'].lower()
            if 'disease' in response_lower or 'clarify' in response_lower:
                print("✅ Provides contextual clarification")
            else:
                print("⚠️ May not be contextually relevant")
                
        except Exception as e:
            print(f"❌ Error with '{confusion_input}': {e}")

def generate_summary_report(coverage_results):
    """Generate a summary report of test results"""
    print("\n" + "="*60)
    print("📊 SUMMARY REPORT")
    print("="*60)
    
    total_units = 0
    covered_units = 0
    
    for course, units in coverage_results.items():
        course_total = len(units)
        course_covered = sum(1 for covered in units.values() if covered)
        
        total_units += course_total
        covered_units += course_covered
        
        coverage_percentage = (course_covered / course_total * 100) if course_total > 0 else 0
        print(f"\n📚 {course.upper()}:")
        print(f"   Coverage: {course_covered}/{course_total} units ({coverage_percentage:.1f}%)")
        
        if course_covered < course_total:
            missing_units = [unit for unit, covered in units.items() if not covered]
            print(f"   Missing: {missing_units}")
    
    overall_percentage = (covered_units / total_units * 100) if total_units > 0 else 0
    print(f"\n🎯 OVERALL COVERAGE: {covered_units}/{total_units} units ({overall_percentage:.1f}%)")
    
    if overall_percentage >= 90:
        print("✅ Excellent coverage!")
    elif overall_percentage >= 75:
        print("✅ Good coverage!")
    elif overall_percentage >= 50:
        print("⚠️ Partial coverage - needs improvement")
    else:
        print("❌ Poor coverage - major issues need fixing")
    
    return overall_percentage

def main():
    """Run all tests"""
    print("🚀 COMPREHENSIVE SOCRATIC AI TEST SUITE")
    print("Testing all AP courses and units for conversational capability")
    
    try:
        # Test 1: Course coverage
        coverage_results = test_course_coverage()
        
        # Test 2: Conversational flow  
        test_conversational_flow()
        
        # Test 3: Topic-specific responses
        test_topic_specific_responses()
        
        # Test 4: Confusion handling
        test_confusion_handling()
        
        # Generate summary
        overall_score = generate_summary_report(coverage_results)
        
        print(f"\n" + "="*60)
        print("🏁 TESTING COMPLETE")
        print("="*60)
        print(f"Overall Score: {overall_score:.1f}%")
        
        if overall_score >= 90:
            print("🎉 The Socratic AI system is working excellently!")
        elif overall_score >= 75:
            print("👍 The Socratic AI system is working well!")
        else:
            print("🔧 The Socratic AI system needs improvements.")
            
    except Exception as e:
        print(f"\n❌ Critical error during testing: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
