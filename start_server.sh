#!/bin/bash
# Start the Socratic AI server
echo "🚀 Starting Socratic AI Server..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "📝 Please create a .env file with your OpenAI API key:"
    echo "   OPENAI_API_KEY=your_key_here"
    echo ""
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Start the server
echo "🎓 Starting Socratic AI on port 8080..."
echo "🔗 Access at: http://localhost:8080"
echo "📊 API endpoint: http://localhost:8080/api/chat/send"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python grader_api_improved.py
