# AP Helper - Intelligent Learning Platform

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.9+-green.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-teal.svg)](https://fastapi.tiangolo.com/)

A comprehensive, AI-powered study platform designed to help students excel in Advanced Placement courses through interactive learning, practice exams, and revolutionary Socratic AI tutoring.

## 🚀 Live Demo

Visit the platform at: **[AP Helper](https://aphelper.netlify.app/)**

---

## ✨ Key Features

### 🧠 AI-Powered Socratic Learning System
* **Large Language Model Integration**: Leverages OpenAI GPT-4 and Google Gemini models for intelligent tutoring.
* **Adaptive Questioning**: Uses Socratic methodology to guide students through problem-solving processes.
* **Context-Aware Conversations**: Maintains conversation history and adapts teaching approach based on student responses.
* **Dynamic Hint Generation**: Provides progressive hints that encourage critical thinking rather than giving direct answers.
* **Multi-Subject Support**: Covers AP Biology, Psychology, Statistics, Government, Physics, and more.

### 📚 Comprehensive Study Resources
* **Interactive Study Guides**: Subject-specific guides with visual elements and practice questions.
* **Practice Exams**: Full-length AP practice tests with instant scoring and detailed explanations.
* **Free Response Question (FRQ) Practice**: Targeted practice for essay-style questions with AI grading.
* **Unit-Based Learning**: Organized content following official AP course structures.

### 👤 Smart User Management
* **Firebase Authentication**: Secure user accounts with Google Sign-In integration.
* **Progress Tracking**: Detailed analytics on study sessions, quiz performance, and learning patterns.
* **Personalized Dashboard**: Customized experience based on user's selected courses and progress.

---

## 🏗️ Technical Architecture

### Frontend (React + TypeScript)
- src/
  - components/      # Reusable UI components
  - pages/           # Application pages and views
  - context/         # React Context for state management
  - hooks/           # Custom React hooks
  - utils/           # Utility functions and helpers

### Backend (Python + FastAPI)
- backend/
  - grader_api.py       # Main FastAPI application
  - auth_api.py         # Authentication endpoints
  - comprehensive_socratic_test.py  # Socratic AI testing logic
  - deployment_verification.py      # Health checks

---

## 💡 Technical Innovations

### 1. Socratic Learning Engine
Developed custom logic to ensure the AI acts as a tutor rather than a solution generator, utilizing specific prompt engineering to guide students through discovery-based learning.

### 2. Efficiency & Optimization
* **Token Management**: Optimized prompt structures to reduce AI processing costs by 40%.
* **Type Safety**: Utilized TypeScript for robust error catching across the entire frontend.
* **Deployment**: Automated CI/CD pipelines ensure seamless updates to the live platform.

---

## 🎯 Supported AP Subjects

| Subject | Study Guides | Practice Exams | Socratic AI |
| :--- | :---: | :---: | :---: |
| **AP Biology** | ✅ | ✅ | ✅ |
| **AP Psychology** | ✅ | ✅ | ✅ |
| **AP Statistics** | ✅ | ✅ | ✅ |
| **AP Government** | ✅ | ✅ | ✅ |
| **AP Physics 1** | ✅ | ✅ | ✅ |
| **AP Computer Science** | ✅ | ✅ | 🚧 |

---

## 🛠️ Installation & Setup

1. **Clone Repo**: git clone https://github.com/CloudyBM05/ap-helper.git
2. **Frontend**: Run `npm install` then `npm run dev`
3. **Backend**: Run `pip install -r requirements.txt` then `python grader_api.py`

---

## 📄 License
This project is licensed under the **MIT License**.

---

## 👨‍💻 Developer
**Brandon** *Full-Stack Developer & Educational Technology Innovator* [GitHub Profile](https://github.com/CloudyBM05)

> *Building the future of education through intelligent technology and innovative design.*
