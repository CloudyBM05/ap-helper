with open('grader_api.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix all instances of the missing closing brace
content = content.replace(
    'return jsonify({"error": "AI response could not be parsed."), 500',
    'return jsonify({"error": "AI response could not be parsed."}), 500'
)

with open('grader_api.py', 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed all instances')
