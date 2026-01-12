#!/usr/bin/env python3

# Test topic detection for all units
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from grader_api import get_socratic_response
    print("Testing topic detection for all APUSH units...")
    
    # Test specific topic detection for each unit
    test_cases = [
        {
            'unit': 'unit1',
            'message': 'What is the Columbian Exchange?',
            'expected_topic_keywords': ['columbian', 'exchange', 'disease', 'european']
        },
        {
            'unit': 'unit2', 
            'message': 'Tell me about Jamestown',
            'expected_topic_keywords': ['jamestown', 'virginia', 'tobacco', 'colony']
        },
        {
            'unit': 'unit3',
            'message': 'What was the Stamp Act?',
            'expected_topic_keywords': ['stamp', 'tax', 'resistance', 'colonial']
        },
        {
            'unit': 'unit4',
            'message': 'Explain the Market Revolution',
            'expected_topic_keywords': ['market', 'revolution', 'transportation', 'factory']
        },
        {
            'unit': 'unit5',
            'message': 'What caused the Civil War?',
            'expected_topic_keywords': ['civil war', 'slavery', 'union', 'emancipation']
        },
        {
            'unit': 'unit6',
            'message': 'Tell me about immigration',
            'expected_topic_keywords': ['immigration', 'european', 'nativism', 'exclusion']
        },
        {
            'unit': 'unit7',
            'message': 'What was the Progressive Era?',
            'expected_topic_keywords': ['progressive', 'reform', 'muckraker', 'trust']
        },
        {
            'unit': 'unit8',
            'message': 'Explain the Cold War',
            'expected_topic_keywords': ['cold war', 'truman', 'marshall', 'nuclear']
        },
        {
            'unit': 'unit9',
            'message': 'What was the Reagan Revolution?',
            'expected_topic_keywords': ['reagan', 'conservative', 'supply-side', 'deregulation']
        }
    ]
    
    successful_detections = 0
    
    for i, test_case in enumerate(test_cases):
        print(f"\n--- Test {i+1}: {test_case['unit']} ---")
        print(f"Question: {test_case['message']}")
        
        try:
            response = get_socratic_response(
                test_case['message'], 
                'apush', 
                test_case['unit'], 
                []
            )
            
            response_text = response.get('response', '').lower()
            topic = response.get('topic', 'unknown')
            concepts = response.get('concepts_introduced', [])
            
            print(f"Topic detected: {topic}")
            print(f"Response length: {len(response_text)} chars")
            print(f"Concepts introduced: {len(concepts)}")
            
            # Check if specific topic was detected (not just 'general')
            if topic != 'general':
                print(f"SUCCESS: Specific topic detected - {topic}")
                successful_detections += 1
            else:
                # Check if response contains expected keywords
                keyword_matches = sum(1 for keyword in test_case['expected_topic_keywords'] 
                                    if keyword.lower() in response_text)
                if keyword_matches >= 2:
                    print(f"SUCCESS: Keywords found ({keyword_matches}/{len(test_case['expected_topic_keywords'])})")
                    successful_detections += 1
                else:
                    print(f"PARTIAL: General response with some keywords ({keyword_matches}/{len(test_case['expected_topic_keywords'])})")
                    successful_detections += 0.5
            
        except Exception as e:
            print(f"ERROR: {e}")
    
    print(f"\n=== SUMMARY ===")
    print(f"Successful topic detections: {successful_detections}/{len(test_cases)}")
    
    if successful_detections >= len(test_cases) * 0.8:
        print("SUCCESS: Topic detection working well across all units!")
    else:
        print("NEEDS IMPROVEMENT: Some units may need better topic detection")
        
except Exception as e:
    print(f"ERROR: {e}")
