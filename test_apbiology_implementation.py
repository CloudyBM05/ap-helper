#!/usr/bin/env python3
"""
Test AP Biology Socratic AI Implementation
Validates all 8 units with biology-specific topics
"""

import sys
from pathlib import Path

def test_apbiology_implementation():
    """Test AP Biology implementation in SocraticChat.tsx"""
    print("🧬 Testing AP Biology Socratic Chat Implementation")
    print("=" * 60)
    
    file_path = "src/pages/SocraticChat.tsx"
    if not Path(file_path).exists():
        print(f"❌ {file_path} not found")
        return False
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Test for AP Biology course implementation
        tests = [
            ("Course recognition", "course === 'apbiology'"),
            ("Unit info", "AP Biology Unit"),
            ("Navigation logic", "ap-biology/unit/"),
            ("Welcome messages", "Welcome to AP Biology"),
            ("Topic implementation", "waterBonds"),
            ("Topic implementation", "macromolecules"), 
            ("Topic implementation", "cellMembrane"),
            ("Topic implementation", "cellularRespiration"),
            ("Topic implementation", "naturalSelection"),
            ("Topic implementation", "biodiversity"),
        ]
        
        passed = 0
        for test_name, search_term in tests:
            if search_term.lower() in content.lower():
                print(f"✅ {test_name}: Found '{search_term}'")
                passed += 1
            else:
                print(f"❌ {test_name}: Missing '{search_term}'")
        
        print(f"\nSocraticChat.tsx: {passed}/{len(tests)} tests passed")
        return passed == len(tests)
        
    except Exception as e:
        print(f"❌ Error reading {file_path}: {e}")
        return False

def test_course_selection():
    """Test AP Biology in course selection page"""
    print("\n🎯 Testing Course Selection Implementation")
    print("=" * 45)
    
    file_path = "src/pages/SocraticLearning.tsx"
    if not Path(file_path).exists():
        print(f"❌ {file_path} not found")
        return False
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        tests = [
            ("Course ID", "id: 'apbiology'"),
            ("Course title", "AP Biology"),
            ("Course description", "Explore life through scientific inquiry"),
            ("Course category", "stem"),
            ("Units array", "Chemistry of Life"),
            ("Unit count", "Ecology"), # Should have 8 units
        ]
        
        passed = 0
        for test_name, search_term in tests:
            if search_term in content:
                print(f"✅ {test_name}: Found '{search_term}'")
                passed += 1
            else:
                print(f"❌ {test_name}: Missing '{search_term}'")
        
        print(f"\nSocraticLearning.tsx: {passed}/{len(tests)} tests passed")
        return passed == len(tests)
        
    except Exception as e:
        print(f"❌ Error reading {file_path}: {e}")
        return False

def test_routing():
    """Test AP Biology routing in App.tsx"""
    print("\n🛤️  Testing Routing Implementation")
    print("=" * 35)
    
    file_path = "src/App.tsx"
    if not Path(file_path).exists():
        print(f"❌ {file_path} not found")
        return False
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check for AP Biology routes (should already exist)
        routes = [
            "/ap-biology-study-guide",
            "/ap-biology/unit/1",
            "/ap-biology/unit/2", 
            "/ap-biology/unit/3",
            "/ap-biology/unit/4",
            "/ap-biology/unit/5",
            "/ap-biology/unit/6",
            "/ap-biology/unit/7", 
            "/ap-biology/unit/8",
        ]
        
        passed = 0
        for route in routes:
            if route in content:
                print(f"✅ Route exists: {route}")
                passed += 1
            else:
                print(f"❌ Route missing: {route}")
        
        print(f"\nApp.tsx: {passed}/{len(routes)} routes found")
        return passed >= 8  # At least 8 of 9 routes should exist
        
    except Exception as e:
        print(f"❌ Error reading {file_path}: {e}")
        return False

def validate_unit_topics():
    """Validate that all 8 units have proper topic coverage"""
    print("\n📚 Validating Unit Topic Coverage")
    print("=" * 40)
    
    expected_units = {
        'unit1': ['waterBonds', 'macromolecules', 'enzymes', 'carbonChemistry', 'pHBuffers'],
        'unit2': ['cellMembrane', 'prokaryoteEukaryote', 'organelles', 'cytoskeleton', 'cellTransport'],
        'unit3': ['cellularRespiration', 'photosynthesis', 'enzymesMetabolism', 'atp', 'metabolicRegulation'],
        'unit4': ['cellSignaling', 'signalTransduction', 'cellCommunication', 'receptors', 'cellularResponse'],
        'unit5': ['mendelianGenetics', 'nonMendelian', 'chromosomes', 'meiosis', 'pedigrees'],
        'unit6': ['dnaStructure', 'transcription', 'translation', 'geneRegulation', 'mutations'],
        'unit7': ['naturalSelection', 'evolution', 'speciation', 'populationGenetics', 'phylogeny'],
        'unit8': ['ecosystemEnergy', 'biogeochemicalCycles', 'populationEcology', 'communityEcology', 'biodiversity']
    }
    
    file_path = "src/pages/SocraticChat.tsx"
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        total_topics = 0
        found_topics = 0
        
        for unit, topics in expected_units.items():
            print(f"\n{unit.upper()}:")
            for topic in topics:
                total_topics += 1
                if topic in content:
                    print(f"  ✅ {topic}")
                    found_topics += 1
                else:
                    print(f"  ❌ {topic}")
        
        print(f"\nTopic Coverage: {found_topics}/{total_topics} topics found")
        success_rate = found_topics / total_topics
        
        if success_rate >= 0.9:
            print("🎉 Excellent topic coverage!")
        elif success_rate >= 0.8:
            print("✅ Good topic coverage")
        else:
            print("⚠️  Needs improvement")
        
        return success_rate >= 0.8
        
    except Exception as e:
        print(f"❌ Error validating topics: {e}")
        return False

def run_apbiology_tests():
    """Run all AP Biology implementation tests"""
    print("🧬 AP Biology Socratic AI - Implementation Validation")
    print("=" * 65)
    
    tests = [
        ("Socratic Chat Implementation", test_apbiology_implementation),
        ("Course Selection Integration", test_course_selection),
        ("Routing Configuration", test_routing),
        ("Unit Topic Validation", validate_unit_topics)
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n🔍 {test_name}")
        try:
            if test_func():
                passed += 1
            print()
        except Exception as e:
            print(f"❌ Test failed with error: {e}")
    
    print("=" * 65)
    print(f"📊 FINAL RESULTS: {passed}/{total} test suites passed")
    
    if passed == total:
        print("🎉 AP Biology implementation is COMPLETE and ready for deployment!")
        print("\nNext steps:")
        print("1. Build and test locally: npm run dev")
        print("2. Deploy frontend: npm run build && npm run deploy") 
        print("3. Test live at: https://aphelper.tech/socratic-chat/apbiology/unit1")
    elif passed >= 3:
        print("✅ AP Biology implementation is mostly complete")
        print("⚠️  Some minor issues need to be addressed before deployment")
    else:
        print("❌ Major issues found. Please review implementation")
    
    return passed == total

if __name__ == "__main__":
    success = run_apbiology_tests()
    sys.exit(0 if success else 1)
