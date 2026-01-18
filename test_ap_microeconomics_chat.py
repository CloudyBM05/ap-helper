"""
Test the Socratic AI chat functionality for AP Microeconomics
"""

import requests
import json

def test_ap_micro_socratic_chat():
    """Test the Socratic AI chat for AP Microeconomics"""
    
    url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/chat/send"
    
    # Comprehensive test cases covering all AP Microeconomics units
    test_cases = [
        # Unit 1: Basic Economic Concepts
        {
            "message": "What is opportunity cost and why is it important?",
            "course": "apmicro", 
            "unit": "unit1",
            "description": "Unit 1 - Opportunity cost concept"
        },
        {
            "message": "How do you read a production possibilities frontier?",
            "course": "apmicro",
            "unit": "unit1",
            "description": "Unit 1 - PPF analysis"
        },
        
        # Unit 2: Supply and Demand
        {
            "message": "Why does the demand curve slope downward?",
            "course": "apmicro",
            "unit": "unit2",
            "description": "Unit 2 - Demand curve fundamentals"
        },
        {
            "message": "What happens to equilibrium when supply increases?",
            "course": "apmicro",
            "unit": "unit2",
            "description": "Unit 2 - Market equilibrium shifts"
        },
        {
            "message": "How does price elasticity affect total revenue?",
            "course": "apmicro",
            "unit": "unit2",
            "description": "Unit 2 - Elasticity and revenue relationship"
        },
        
        # Unit 3: Production, Cost, and Perfect Competition
        {
            "message": "What is the difference between fixed and variable costs?",
            "course": "apmicro",
            "unit": "unit3",
            "description": "Unit 3 - Cost concepts"
        },
        {
            "message": "When should a firm shut down in the short run?",
            "course": "apmicro",
            "unit": "unit3",
            "description": "Unit 3 - Shutdown decision"
        },
        
        # Unit 4: Imperfect Competition
        {
            "message": "How does a monopolist determine price and quantity?",
            "course": "apmicro",
            "unit": "unit4",
            "description": "Unit 4 - Monopoly pricing"
        },
        {
            "message": "What makes oligopolies different from other market structures?",
            "course": "apmicro",
            "unit": "unit4",
            "description": "Unit 4 - Oligopoly characteristics"
        },
        
        # Unit 5: Factor Markets
        {
            "message": "How is the demand for labor determined?",
            "course": "apmicro",
            "unit": "unit5",
            "description": "Unit 5 - Labor demand"
        },
        {
            "message": "What causes wage differences between workers?",
            "course": "apmicro",
            "unit": "unit5",
            "description": "Unit 5 - Wage determination"
        },
        
        # Unit 6: Market Failures and Government Intervention
        {
            "message": "What causes negative externalities and how can they be corrected?",
            "course": "apmicro",
            "unit": "unit6",
            "description": "Unit 6 - Negative externalities"
        },
        {
            "message": "Why do public goods create market failures?",
            "course": "apmicro",
            "unit": "unit6",
            "description": "Unit 6 - Public goods problem"
        },
        {
            "message": "How do Pigouvian taxes work to correct market failures?",
            "course": "apmicro",
            "unit": "unit6",
            "description": "Unit 6 - Government intervention"
        }
    ]
    
    print("Testing Socratic AI Chat for AP Microeconomics")
    print("=" * 70)
    
    success_count = 0
    total_tests = len(test_cases)
    unit_results = {}
    
    for i, test in enumerate(test_cases, 1):
        unit = test['unit']
        if unit not in unit_results:
            unit_results[unit] = {"success": 0, "total": 0, "responses": []}
        
        unit_results[unit]["total"] += 1
        
        print(f"\nTest {i}/{total_tests}: {test['description']}")
        print(f"Unit: {unit}, Question: {test['message']}")
        print("-" * 60)
        
        payload = {
            "message": test["message"],
            "course": test["course"],
            "unit": test["unit"],
            "conversationHistory": [],
            "userId": "test_apmicro_user"
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
                print(f"✓ Response Preview: {ai_response[:150]}...")
                
                # Check if it's using AI (Gemini or enhanced responses)
                is_ai_powered = source in ["gemini", "gemini_ai", "enhanced_socratic_system"]
                
                # Check for Socratic style
                socratic_indicators = ["question", "what do you think", "why", "how", "curious", "explore", "consider", "what if"]
                is_socratic = any(indicator in ai_response.lower() for indicator in socratic_indicators)
                print(f"✓ Socratic Style: {'Yes' if is_socratic else 'No'}")
                
                # Check for economics-specific content
                econ_indicators = ["economic", "economics", "market", "price", "cost", "demand", "supply", "profit", "efficiency", "elasticity"]
                has_econ_content = any(indicator in ai_response.lower() for indicator in econ_indicators)
                print(f"✓ Economics Context: {'Yes' if has_econ_content else 'No'}")
                
                if is_ai_powered:
                    print("✓ AI-Powered: Yes")
                    success_count += 1
                    unit_results[unit]["success"] += 1
                else:
                    print(f"⚠ Using Fallback: {source}")
                
                unit_results[unit]["responses"].append({
                    "question": test['message'][:50] + "...",
                    "source": source,
                    "length": len(ai_response),
                    "socratic": is_socratic,
                    "econ_context": has_econ_content,
                    "ai_powered": is_ai_powered
                })
                
            else:
                print(f"✗ HTTP Error: {response.status_code}")
                print(f"✗ Response: {response.text}")
                
        except Exception as e:
            print(f"✗ Error: {e}")
    
    # Unit-by-unit analysis
    print("\n" + "=" * 70)
    print("AP MICROECONOMICS UNIT ANALYSIS")
    print("=" * 70)
    
    for unit in sorted(unit_results.keys()):
        results = unit_results[unit]
        success_rate = (results["success"] / results["total"]) * 100 if results["total"] > 0 else 0
        
        unit_name = {
            "unit1": "Basic Economic Concepts",
            "unit2": "Supply and Demand", 
            "unit3": "Production and Costs",
            "unit4": "Imperfect Competition",
            "unit5": "Factor Markets", 
            "unit6": "Market Failures"
        }.get(unit, unit)
        
        print(f"\n{unit.upper()} - {unit_name}: {results['success']}/{results['total']} ({success_rate:.1f}%)")
        
        for resp in results["responses"]:
            status = "✓" if resp["ai_powered"] else "⚠"
            socratic = "S" if resp["socratic"] else "-"
            econ = "E" if resp["econ_context"] else "-"
            print(f"  {status}[{socratic}{econ}] {resp['question']} ({resp['source']}, {resp['length']} chars)")
    
    # Overall summary
    print("\n" + "=" * 70)
    print("OVERALL AP MICROECONOMICS RESULTS")
    print("=" * 70)
    
    overall_rate = (success_count / total_tests) * 100
    print(f"Success Rate: {success_count}/{total_tests} ({overall_rate:.1f}%)")
    
    # Identify units needing improvement
    struggling_units = [unit for unit, results in unit_results.items() 
                       if (results["success"] / results["total"]) < 0.8]
    
    if struggling_units:
        print(f"\nUnits needing topic definition improvements:")
        for unit in struggling_units:
            unit_name = {
                "unit1": "Basic Economic Concepts",
                "unit2": "Supply and Demand", 
                "unit3": "Production and Costs",
                "unit4": "Imperfect Competition",
                "unit5": "Factor Markets", 
                "unit6": "Market Failures"
            }.get(unit, unit)
            print(f"  • {unit.upper()} - {unit_name}")
    else:
        print("\n✅ All units performing excellently!")
    
    if overall_rate >= 80:
        print("🎉 AP Microeconomics Socratic AI is working great!")
    elif overall_rate >= 60:
        print("✅ Good performance, minor optimizations needed.")
    else:
        print("⚠ Needs improvement - adding more unit definitions recommended.")

def test_microeconomics_conversation_flow():
    """Test conversational flow for AP Microeconomics"""
    
    url = "https://ap-helper-2d9f117e9bdb.herokuapp.com/api/chat/send"
    
    print("\n" + "=" * 70)
    print("TESTING AP MICROECONOMICS CONVERSATION FLOW")
    print("=" * 70)
    
    # Simulate a realistic conversation about supply and demand
    conversation = [
        "What is the law of demand?",
        "Why does the demand curve slope downward?", 
        "What factors can shift the demand curve?",
        "How does this relate to market equilibrium?"
    ]
    
    conversation_history = []
    user_id = "micro_conversation_test"
    
    for i, message in enumerate(conversation, 1):
        print(f"\nConversation Step {i}: {message}")
        
        payload = {
            "message": message,
            "course": "apmicro",
            "unit": "unit2",
            "conversationHistory": conversation_history,
            "userId": user_id
        }
        
        try:
            response = requests.post(url, headers={"Content-Type": "application/json"}, json=payload, timeout=25)
            if response.status_code == 200:
                data = response.json()
                ai_response = data.get("response", "")
                source = data.get("source", "unknown")
                
                print(f"✓ AI Response ({source}): {ai_response[:200]}...")
                
                # Add to conversation history
                conversation_history.append({"sender": "user", "content": message})
                conversation_history.append({"sender": "ai", "content": ai_response})
                
            else:
                print(f"✗ Error: {response.status_code}")
        except Exception as e:
            print(f"✗ Exception: {e}")
    
    print("\n✅ Conversation flow test complete!")

if __name__ == "__main__":
    test_ap_micro_socratic_chat()
    test_microeconomics_conversation_flow()
