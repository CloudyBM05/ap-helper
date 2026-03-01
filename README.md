# AP Helper – AI-Powered AP Study Platform

AP Helper is a full-stack web application designed to help students prepare for Advanced Placement (AP) courses through AI-guided learning, practice exams, progress tracking, and analytics.

This project is an early-stage MVP. Core functionality is implemented, with ongoing improvements to UI polish, testing, and feature expansion.

---

## 🚀 Live Demo

🔗 **[https://aphelper.tech](https://aphelper.tech)**

---

## ✨ Core Features

### 🧠 Socratic AI Tutoring
* **LLM Integration**: Integrates OpenAI GPT-4 and Google Gemini APIs.
* **Guided Discovery**: Uses Socratic methodology to help students reason through problems (avoids direct answer dumping).
* **Context Awareness**: Maintains conversational history across sessions.
* **Adaptive Hints**: Generates progressive hints based on difficulty and student responses.

### 📚 Practice & Assessment
* **Exam Formats**: AP-style multiple choice and free-response (FRQ) practice.
* **AI Grading**: Automated, rubric-based FRQ grading for instant feedback.
* **Curriculum Alignment**: Unit-based study organization aligned with official AP course structures.

### 📊 Progress Tracking
* **Secure Auth**: Firebase-authenticated user accounts with Google Sign-In.
* **Analytics**: Study session tracking and quiz performance metrics.
* **Personalized Dashboard**: Customized experience based on user-selected subjects.

---

## 🏗️ Technical Architecture

### Frontend (React + TypeScript)
* **Framework**: React 18 (functional components + hooks)
* **State Management**: Context API
* **Backend Integration**: Firebase SDK & Fetch API
* **UI**: Responsive CSS with custom animations

📁 src/
├── 📁 components/      # Reusable UI elements
├── 📁 pages/           # Application views
├── 📁 context/         # Global state management
├── 📁 hooks/           # Custom React logic
└── 📁 utils/           # Helper functions

### Backend (Python + FastAPI)
* **Framework**: FastAPI for high-performance async processing.
* **AI Engine**: OpenAI & Gemini API integration.
* **Data Layer**: JSON-based persistence (migrating to SQL).
* **Security**: CORS middleware and Firebase token verification.

📁 backend/
├── grader_api.py    # Main API endpoints
├── auth_api.py      # Authentication logic
└── 📁 utils/        # AI prompt logic & helpers

---

## 🧠 Example: Socratic Prompt Logic

This approach emphasizes critical thinking by using the AI as a tutor rather than a calculator.

    def generate_socratic_response(question, context, difficulty):
    prompt = f"""
    You are an AP-level Socratic tutor.
    Guide the student through this {difficulty}-level question: {question}

    Context: {context}

    Ask guiding questions that help the student reason toward the answer.
    Do not provide the final solution directly.
    """
    return llm_api.generate(prompt)
---

## 🛠️ Local Setup

### Prerequisites
* **Node.js 18+** & npm
* **Python 3.9+**
* **API Keys**: OpenAI, Google Gemini, and Firebase project credentials.

### Installation
1. **Clone the Repo**: 
   `git clone https://github.com/CloudyBM05/ap-helper.git`
2. **Frontend Setup**:
   `cd ap-helper && npm install && npm run dev`
3. **Backend Setup**:
   `cd backend && pip install -r requirements.txt && uvicorn grader_api:app --reload`

---

## 🧩 Design Decisions
* **FastAPI**: Chosen for lightweight asynchronous development and strong schema validation.
* **TypeScript**: Implemented to reduce runtime bugs and improve long-term maintainability.
* **Socratic AI**: Designed to encourage conceptual mastery rather than passive answer consumption.
* **Modular Design**: Strict separation of concerns between frontend and backend for better scalability.

---

## 🛣️ Future Improvements
- [ ] Improved adaptive difficulty modeling using historical student data.
- [ ] Expanded FRQ grading rubric intelligence.
- [ ] Migration from JSON storage to a production-grade database (PostgreSQL).
- [ ] Performance optimization and caching layer for frequent AI queries.

---

## 👨‍💻 About the Developer
Built by **Brandon**, a student developer focused on AI-powered educational tools and full-stack systems.

**Tech Focus:**
* React + TypeScript
* Python + FastAPI
* LLM Integration & Prompt Engineering
* Cloud Deployment Workflows

