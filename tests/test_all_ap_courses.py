"""
Comprehensive test suite for ALL AP courses Socratic AI chat functionality
Tests: AP Biology, AP Psychology, AP Government, AP Micro, AP Human Geography, AP Statistics, AP History
"""

import requests
import json
import time

def test_all_ap_courses():
    """Test Socratic AI chat across all supported AP courses"""
    
    url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/chat/send"
    
    # Comprehensive test cases for all AP courses
    test_cases = [
        # AP Biology
        {
            "message": "What is the role of ATP in cellular respiration?",
            "course": "apbiology", 
            "unit": "unit3",
            "description": "AP Biology - ATP and cellular respiration"
        },
        {
            "message": "How does DNA replication work?",
            "course": "apbiology",
            "unit": "unit6",
            "description": "AP Biology - DNA replication"
        },
        
        # AP Psychology (sample from our detailed test)
        {
            "message": "What is the difference between classical and operant conditioning?",
            "course": "appsychology",
            "unit": "unit5", 
            "description": "AP Psychology - Learning theories"
        },
        {
            "message": "How do neurons communicate?",
            "course": "appsychology",
            "unit": "unit2",
            "description": "AP Psychology - Biological bases"
        },
        
        # AP Government & Politics
        {
            "message": "What are the key principles of federalism?",
            "course": "apgov",
            "unit": "unit1",
            "description": "AP Government - Federalism"
        },
        {
            "message": "How does the electoral college work?",
            "course": "apgov",
            "unit": "unit5",
            "description": "AP Government - Electoral process"
        },
        
        # AP Microeconomics
        {
            "message": "Explain the law of supply and demand",
            "course": "apmicro",
            "unit": "unit2",
            "description": "AP Micro - Supply and demand"
        },
        {
            "message": "What is market failure?",
            "course": "apmicro",
            "unit": "unit6",
            "description": "AP Micro - Market efficiency"
        },
        
        # AP Human Geography
        {
            "message": "What is population density and how is it calculated?",
            "course": "aphug",
            "unit": "unit2",
            "description": "AP Human Geography - Population"
        },
        {
            "message": "Explain urban sprawl and its effects",
            "course": "aphug",
            "unit": "unit6",
            "description": "AP Human Geography - Cities and urban land use"
        },
        
        # AP Statistics
        {
            "message": "What is the difference between Type I and Type II errors?",
            "course": "apstat",
            "unit": "unit4",
            "description": "AP Statistics - Statistical inference"
        },
        {
            "message": "How do you calculate a confidence interval?",
            "course": "apstat",
            "unit": "unit4",
            "description": "AP Statistics - Confidence intervals"
        },
        
        # AP U.S. History
        {
            "message": "What were the causes of the American Revolution?",
            "course": "apush",
            "unit": "unit3",
            "description": "AP U.S. History - Colonial America and independence"
        },
        {
            "message": "Explain the impact of the New Deal",
            "course": "apush",
            "unit": "unit7",
            "description": "AP U.S. History - Great Depression and New Deal"
        }
    ]
    
    print("Testing Socratic AI Chat Across All AP Courses")
    print("=" * 70)
    
    # Track success by course
    course_results = {}
    overall_success = 0
    total_tests = len(test_cases)
    
    for i, test in enumerate(test_cases, 1):
        course = test['course']
        if course not in course_results:
            course_results[course] = {"success": 0, "total": 0, "responses": []}
        
        course_results[course]["total"] += 1
        
        print(f"\nTest {i}/{total_tests}: {test['description']}")
        print(f"Course: {course.upper()}, Unit: {test['unit']}")
        print(f"Question: {test['message']}")
        print("-" * 50)
        
        payload = {
            "message": test["message"],
            "course": test["course"],
            "unit": test["unit"],
            "conversationHistory": [],
            "userId": f"test_user_{course}"
        }
        
        try:
            response = requests.post(
                url, 
                headers={"Content-Type": "application/json"},
                json=payload,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                ai_response = data.get("response", "No response")
                source = data.get("source", "unknown")
                
                print(f"✓ Status: {response.status_code}")
                print(f"✓ AI Source: {source}")
                print(f"✓ Response Length: {len(ai_response)} characters")
                print(f"✓ Response Preview: {ai_response[:120]}...")
                
                # Check if it's using AI (Gemini or enhanced responses)
                is_ai_powered = source in ["gemini", "gemini_ai", "enhanced_socratic_system"]
                is_fallback = source == "conversational_socratic"
                
                if is_ai_powered:
                    print("✓ AI-Powered: Yes")
                    course_results[course]["success"] += 1
                    overall_success += 1
                elif is_fallback:
                    print("⚠ Using Fallback: conversational_socratic")
                else:
                    print(f"? Unknown Source: {source}")
                
                # Store response info
                course_results[course]["responses"].append({
                    "test": test['description'],
                    "source": source,
                    "length": len(ai_response),
                    "success": is_ai_powered
                })
                
            else:
                print(f"✗ HTTP Error: {response.status_code}")
                print(f"✗ Response: {response.text}")
                
        except Exception as e:
            print(f"✗ Error: {e}")
        
        # Add small delay between requests to be respectful to the API
        time.sleep(0.5)
    
    # Summary by course
    print("\n" + "=" * 70)
    print("COURSE-BY-COURSE RESULTS")
    print("=" * 70)
    
    for course, results in course_results.items():
        success_rate = (results["success"] / results["total"]) * 100 if results["total"] > 0 else 0
        print(f"\n{course.upper()}: {results['success']}/{results['total']} ({success_rate:.1f}%)")
        
        # Show details for each test
        for resp in results["responses"]:
            status = "✓" if resp["success"] else "⚠"
            print(f"  {status} {resp['test']} - {resp['source']} ({resp['length']} chars)")
    
    # Overall summary
    print("\n" + "=" * 70)
    print("OVERALL RESULTS")
    print("=" * 70)
    
    overall_rate = (overall_success / total_tests) * 100
    print(f"Total Success Rate: {overall_success}/{total_tests} ({overall_rate:.1f}%)")
    print(f"Courses Tested: {len(course_results)}")
    
    if overall_rate >= 70:
        print("🎉 Excellent! Most courses are using AI-powered responses.")
    elif overall_rate >= 50:
        print("✅ Good! Majority of courses are AI-powered. Some optimization needed.")
    else:
        print("⚠ Needs improvement. Many courses falling back to basic responses.")
    
    # Recommendations
    print("\n" + "=" * 70)
    print("RECOMMENDATIONS")
    print("=" * 70)
    
    struggling_courses = [course for course, results in course_results.items() 
                         if (results["success"] / results["total"]) < 0.5]
    
    if struggling_courses:
        print("Courses needing backend topic definition improvements:")
        for course in struggling_courses:
            print(f"  • {course.upper()}")
    else:
        print("✓ All courses performing well!")

def test_course_switching():
    """Test switching between different courses in the same session"""
    
    url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/chat/send"
    
    print("\n" + "=" * 70)
    print("TESTING COURSE SWITCHING")
    print("=" * 70)
    
    # Test switching between different courses
    switch_tests = [
        {"message": "What is photosynthesis?", "course": "apbiology", "unit": "unit3"},
        {"message": "What is federalism?", "course": "apgov", "unit": "unit1"}, 
        {"message": "Explain classical conditioning", "course": "appsychology", "unit": "unit5"},
        {"message": "What is supply and demand?", "course": "apmicro", "unit": "unit2"}
    ]
    
    user_id = "course_switcher_test"
    
    for i, test in enumerate(switch_tests, 1):
        print(f"\nSwitch Test {i}: {test['course'].upper()} - {test['message']}")
        
        payload = {
            "message": test["message"],
            "course": test["course"],
            "unit": test["unit"],
            "conversationHistory": [],
            "userId": user_id
        }
        
        try:
            response = requests.post(url, headers={"Content-Type": "application/json"}, json=payload, timeout=20)
            if response.status_code == 200:
                data = response.json()
                source = data.get("source", "unknown")
                print(f"✓ Course {test['course']}: {source}")
            else:
                print(f"✗ Error: {response.status_code}")
        except Exception as e:
            print(f"✗ Exception: {e}")
        
        time.sleep(0.3)
    
    print("\n✓ Course switching test complete!")

if __name__ == "__main__":
    test_all_ap_courses()
    test_course_switching()
