@echo off
REM Start the Socratic AI server on Windows
echo 🚀 Starting Socratic AI Server...

REM Check if .env file exists
if not exist .env (
    echo ⚠️  Warning: .env file not found!
    echo 📝 Please create a .env file with your OpenAI API key:
    echo    OPENAI_API_KEY=your_key_here
    echo.
)

REM Check if virtual environment exists
if not exist venv (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate

REM Install dependencies
echo 📥 Installing dependencies...
pip install -r requirements.txt

REM Start the server
echo 🎓 Starting Socratic AI on port 8080...
echo 🔗 Access at: http://localhost:8080
echo 📊 API endpoint: http://localhost:8080/api/chat/send
echo.
echo Press Ctrl+C to stop the server
echo.

python grader_api_improved.py

pause
