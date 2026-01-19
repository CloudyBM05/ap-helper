#!/usr/bin/env python3
"""
AP Statistics Socratic AI Implementation Verification
Checks all components of the implementation
"""
import os
import re

def verify_implementation():
    """Verify that AP Statistics Socratic AI is properly implemented"""
    
    print("🧮 AP Statistics Socratic AI Implementation Verification")
    print("=" * 60)
    
    base_path = "c:\\Users\\Brandon\\Downloads\\ap-helper"
    checks = []
    
    # Check 1: Backend implementation in grader_api.py
    print("\n📊 Checking Backend Implementation...")
    grader_api_path = os.path.join(base_path, "grader_api.py")
    
    try:
        with open(grader_api_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Check for AP Statistics content definition
        if 'apstat_content = {' in content:
            checks.append("✅ AP Statistics content defined in backend")
        else:
            checks.append("❌ AP Statistics content NOT found in backend")
            
        # Check for all 9 units
        unit_count = len(re.findall(r"'unit[1-9]':", content))
        if unit_count >= 9:
            checks.append(f"✅ All 9 units defined in apstat_content ({unit_count} units found)")
        else:
            checks.append(f"⚠️  Only {unit_count} units found in apstat_content")
            
        # Check for course selection logic
        if "elif course == 'apstat':" in content:
            checks.append("✅ AP Statistics course selection logic implemented")
        else:
            checks.append("❌ AP Statistics course selection logic NOT found")
            
        # Check for statistics question handler
        if "handle_statistics_questions" in content:
            checks.append("✅ Statistics-specific question handler implemented")
        else:
            checks.append("❌ Statistics question handler NOT found")
            
    except Exception as e:
        checks.append(f"❌ Error reading grader_api.py: {e}")
    
    # Check 2: Frontend integration in SocraticLearning.tsx
    print("\n🎨 Checking Frontend Integration...")
    socratic_learning_path = os.path.join(base_path, "src", "pages", "SocraticLearning.tsx")
    
    try:
        with open(socratic_learning_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Check for AP Statistics in courses list
        if "'apstat'" in content and "AP Statistics" in content:
            checks.append("✅ AP Statistics included in SocraticLearning page")
        else:
            checks.append("❌ AP Statistics NOT found in SocraticLearning page")
            
        # Count units in apstat definition
        apstat_section = content[content.find("id: 'apstat'"):content.find("id: 'apcsp'") if "id: 'apcsp'" in content else len(content)]
        unit_matches = re.findall(r"id: \d+", apstat_section)
        if len(unit_matches) >= 9:
            checks.append(f"✅ All 9 units defined in frontend ({len(unit_matches)} units)")
        else:
            checks.append(f"⚠️  Only {len(unit_matches)} units in frontend")
            
    except Exception as e:
        checks.append(f"❌ Error reading SocraticLearning.tsx: {e}")
    
    # Check 3: SocraticChat.tsx fallback topics
    print("\n💬 Checking SocraticChat Implementation...")
    socratic_chat_path = os.path.join(base_path, "src", "pages", "SocraticChat.tsx")
    
    try:
        with open(socratic_chat_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Check for AP Statistics course handling
        if "course === 'apstat'" in content:
            checks.append("✅ AP Statistics course handling in SocraticChat")
        else:
            checks.append("❌ AP Statistics course handling NOT found")
            
        # Check for fallback topics
        if "if (course === 'apstat') {" in content and "unit1" in content:
            checks.append("✅ AP Statistics fallback topics defined")
        else:
            checks.append("❌ AP Statistics fallback topics NOT found")
            
    except Exception as e:
        checks.append(f"❌ Error reading SocraticChat.tsx: {e}")
    
    # Check 4: App.tsx routing
    print("\n🛣️  Checking Routing Configuration...")
    app_path = os.path.join(base_path, "src", "App.tsx")
    
    try:
        with open(app_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if '/socratic-chat/:course/:unit' in content:
            checks.append("✅ Socratic chat routing configured")
        else:
            checks.append("❌ Socratic chat routing NOT found")
            
    except Exception as e:
        checks.append(f"❌ Error reading App.tsx: {e}")
    
    # Check 5: Study guide integration
    print("\n📚 Checking Study Guide Integration...")
    study_guide_path = os.path.join(base_path, "src", "pages", "APStatisticsStudyGuide.tsx")
    
    try:
        with open(study_guide_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if "socratic-chat" in content or "socratic-learning" in content:
            checks.append("✅ Socratic chat links added to study guide")
        else:
            checks.append("⚠️  Socratic chat links not yet added to study guide")
            
    except Exception as e:
        checks.append(f"❌ Error reading APStatisticsStudyGuide.tsx: {e}")
    
    # Summary
    print("\n🏁 Implementation Summary:")
    print("-" * 40)
    
    success_count = sum(1 for check in checks if check.startswith("✅"))
    warning_count = sum(1 for check in checks if check.startswith("⚠️"))
    error_count = sum(1 for check in checks if check.startswith("❌"))
    
    for check in checks:
        print(check)
    
    print(f"\n📊 Results: {success_count} ✅ | {warning_count} ⚠️ | {error_count} ❌")
    
    if success_count >= 7 and error_count <= 1:
        print("\n🎉 AP Statistics Socratic AI Implementation: SUCCESS!")
        print("\n🚀 Ready to use at: https://aphelper.tech/socratic-learning")
        print("   Select 'AP Statistics' and choose any unit to start learning!")
        
        print("\n📝 Direct Links:")
        for i in range(1, 10):
            print(f"   Unit {i}: https://aphelper.tech/socratic-chat/apstat/unit{i}")
    else:
        print("\n⚠️  Implementation may need attention. Please review the failed checks above.")

if __name__ == "__main__":
    verify_implementation()
