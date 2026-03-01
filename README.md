# AP Helper – AI-Powered AP Study Platform

AP Helper is a full-stack web application designed to help students prepare for Advanced Placement (AP) courses through AI-guided learning, practice exams, and performance analytics.

This project is an early-stage MVP. Core functionality is implemented, with ongoing improvements to UI polish, testing, and feature expansion.

---

## 🚀 Live Demo

🔗 https://aphelper.tech

---

## ✨ Core Features

### 🧠 Socratic AI Tutoring
- Integrates OpenAI GPT-4 and Google Gemini APIs
- Guides students using Socratic questioning (avoids direct answer dumping)
- Maintains conversational context across sessions
- Generates adaptive hints based on difficulty and student responses

### 📚 Practice & Assessment
- AP-style multiple choice and free response practice
- AI-assisted FRQ grading
- Unit-based study organization aligned with official AP structures

### 📊 Progress Tracking
- Firebase-authenticated user accounts
- Study session tracking and quiz analytics
- Personalized dashboard based on selected subjects

---

## 🏗️ Technical Architecture

### Frontend
- React 18 (functional components + hooks)
- TypeScript for type safety
- Context API for state management
- Firebase SDK for authentication
- Responsive CSS design


src/
├── components/
├── pages/
├── context/
├── hooks/
└── utils/


### Backend
- Python + FastAPI
- RESTful API design
- OpenAI & Gemini API integration
- JSON-based persistence layer
- CORS middleware configuration


backend/
├── grader_api.py
├── auth_api.py
└── utils/


---

## 🧠 Example: Socratic Prompt Logic

```python
def generate_socratic_response(question, context, difficulty):
    prompt = f"""
    You are an AP-level Socratic tutor.
    Guide the student through this {difficulty}-level question:
    {question}

    Context: {context}

    Ask guiding questions that help them reason toward the answer.
    Do not provide the final solution directly.
    """
    return llm_api.generate(prompt)

This approach emphasizes reasoning and critical thinking rather than answer delivery.

🛠️ Local Setup
Prerequisites

Node.js 18+

Python 3.9+

OpenAI API key

Google Gemini API key

Firebase project

Frontend
npm install
npm run dev
Backend
pip install -r requirements.txt
uvicorn grader_api:app --reload
🧩 Design Decisions

FastAPI chosen for lightweight async API development and strong schema validation.

TypeScript used to reduce runtime bugs and improve maintainability.

Socratic AI design encourages conceptual mastery rather than passive answer consumption.

Modular frontend/backend separation improves scalability and maintainability.

📌 Current Status

Core tutoring flow implemented

Multi-subject support functional

Authentication and dashboard complete

Ongoing work: testing coverage, analytics expansion, UI refinement

🛣️ Future Improvements

Improved adaptive difficulty modeling

Expanded FRQ grading rubric intelligence

Database-backed persistence (migrating from JSON storage)

Performance optimization and caching layer

👨‍💻 About the Developer

Built by Brandon, a student developer focused on AI-powered educational tools and full-stack systems.

Tech focus:

React + TypeScript

Python + FastAPI

LLM integration & prompt engineering

Cloud deployment workflows
