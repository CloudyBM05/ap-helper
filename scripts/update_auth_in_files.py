"""
Script to add authentication to remaining grading pages
This script updates all the remaining TSX files that call grading endpoints
to include authentication checks and headers.

Run this script from the project root directory.
"""

import os
import re

# Files that need to be updated
FILES_TO_UPDATE = [
    "src/pages/APUSHPracticeExamSAQ2025Set2.tsx",
    "src/pages/APWorldPracticeExamSAQ2025.tsx",
    "src/pages/APStatisticsShortFRQ1.tsx",
    "src/pages/APStatisticsShortFRQ2.tsx",
    "src/pages/APStatisticsShortFRQ3.tsx",
    "src/pages/APStatisticsShortFRQ4.tsx",
    "src/pages/APStatisticsShortFRQ5.tsx",
    "src/pages/APStatisticsInvestigativeTask1.tsx",
    "src/pages/APMicroShortFRQSet1Q2.tsx",
    "src/pages/APMicroShortFRQSet1Q3.tsx",
    "src/pages/APMicroShortFRQSet2Q2.tsx",
    "src/pages/APMicroShortFRQSet2Q3.tsx",
    "src/pages/APMacroShortFRQ.tsx",
    "src/pages/APHumanGeographyScaleAnalysisSet1.tsx",
    "src/pages/APUSHPracticeExamLEQ.tsx",
    "src/pages/APWorldPracticeExamDBQ2025.tsx",
    "src/pages/APWorldPracticeExamLEQ2025.tsx",
]


def add_useauth_import(content):
    """Add useAuth import if not present"""
    if "import { useAuth }" in content:
        return content
    
    # Find the react-router-dom import
    pattern = r"(import .* from 'react-router-dom';)"
    replacement = r"\1\nimport { useAuth } from '../hooks/useAuth';"
    return re.sub(pattern, replacement, content, count=1)


def add_useauth_hook(content):
    """Add useAuth hook destructuring in component"""
    # Find the component declaration and add hook
    pattern = r"(const \w+: React\.FC.*?= \(\) => \{[\s\S]*?const navigate = useNavigate\(\);)"
    
    def replacer(match):
        text = match.group(1)
        if "useAuth()" in text:
            return text
        return text + "\n\tconst { isAuthenticated, getAuthHeaders } = useAuth();"
    
    return re.sub(pattern, replacer, content, count=1)


def add_auth_check_to_submit(content):
    """Add authentication check at the start of handleSubmit"""
    # Find handleSubmit function and add auth check
    pattern = r"(const handleSubmit = async \(\) => \{[\s\S]*?)(setGrading\(true\);)"
    
    def replacer(match):
        func_start = match.group(1)
        set_grading = match.group(2)
        
        if "isAuthenticated" in func_start:
            return match.group(0)
        
        auth_check = """\n\t\t// Check if user is authenticated
\t\tif (!isAuthenticated) {
\t\t\tsetError('Please log in to use AI grading. Click the "Login" button in the navigation bar.');
\t\t\treturn;
\t\t}

\t\t"""
        return func_start + auth_check + set_grading
    
    return re.sub(pattern, replacer, content, count=1)


def add_auth_headers_to_fetch(content):
    """Add auth headers to fetch requests"""
    # Find fetch calls and add auth headers
    pattern = r"(headers: \{[\s\S]*?'Content-Type': 'application/json',)([\s\S]*?\},)"
    
    def replacer(match):
        headers_start = match.group(1)
        headers_end = match.group(2)
        
        if "...getAuthHeaders()" in headers_start:
            return match.group(0)
        
        return headers_start + "\n\t\t\t\t\t...getAuthHeaders()," + headers_end
    
    return re.sub(pattern, replacer, content)


def update_file(filepath):
    """Update a single file with all authentication changes"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Apply all transformations
        content = add_useauth_import(content)
        content = add_useauth_hook(content)
        content = add_auth_check_to_submit(content)
        content = add_auth_headers_to_fetch(content)
        
        # Only write if changes were made
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Updated: {filepath}")
            return True
        else:
            print(f"- Skipped (no changes needed): {filepath}")
            return False
            
    except FileNotFoundError:
        print(f"✗ File not found: {filepath}")
        return False
    except Exception as e:
        print(f"✗ Error updating {filepath}: {e}")
        return False


def main():
    """Main function to update all files"""
    print("=" * 60)
    print("Authentication Update Script for AP Helper")
    print("=" * 60)
    print()
    
    updated_count = 0
    skipped_count = 0
    error_count = 0
    
    for filepath in FILES_TO_UPDATE:
        if update_file(filepath):
            updated_count += 1
        elif os.path.exists(filepath):
            skipped_count += 1
        else:
            error_count += 1
    
    print()
    print("=" * 60)
    print(f"Summary:")
    print(f"  ✓ Updated: {updated_count} files")
    print(f"  - Skipped: {skipped_count} files")
    print(f"  ✗ Errors:  {error_count} files")
    print("=" * 60)
    print()
    print("Next steps:")
    print("1. Review the changes in each file")
    print("2. Test the authentication flow")
    print("3. Deploy to production")


if __name__ == "__main__":
    main()
