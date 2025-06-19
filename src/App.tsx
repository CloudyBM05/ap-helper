import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EssayGrader from './pages/EssayGrader';
import StudyGuides from './pages/StudyGuides';
import PracticeExams from './pages/PracticeExams';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Footer from './components/Footer';
import APUSHStudyGuide from './pages/APUSHStudyGuide';
import APUSHUnit from './pages/APUSHUnit';
import APUSHUnitQuiz from './pages/APUSHUnitQuiz';
import APUSHTimeline from './pages/APUSHTimeline';
import APUSHPracticeExamMCQSelect from './pages/APUSHPracticeExamMCQSelect';
import APUSHPracticeExamMCQ2014 from './pages/APUSHPracticeExamMCQ2014';
import APUSHPracticeExamMCQ2014Results from './pages/APUSHPracticeExamMCQ2014Results';
import APUSHPracticeExamSAQSelect from './pages/APUSHPracticeExamSAQSelect';
import APUSHPracticeExamSAQ2025 from './pages/APUSHPracticeExamSAQ2025';
import { Register, Login } from './components/AuthForms';
import NotesFeed, { EditNote } from './pages/NotesFeed';
import GradeGames from './pages/GradeGames';

function App() {
  return (
    <Router basename="/AP-Helper/">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/essay-grader" element={<EssayGrader />} />
            <Route path="/study-guides" element={<StudyGuides />} />
            <Route path="/practice-exams" element={<PracticeExams />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/apush-study-guide" element={<APUSHStudyGuide />} />
            <Route path="/apush-study-guide/unit/:unitId" element={<APUSHUnit />} />
            <Route path="/apush-study-guide/unit/1/quiz" element={<APUSHUnitQuiz />} />
            <Route path="/apush-timeline" element={<APUSHTimeline />} />
            <Route path="/apush-practice-exam/mcq/select" element={<APUSHPracticeExamMCQSelect />} />
            <Route path="/apush-practice-exam/mcq/2014" element={<APUSHPracticeExamMCQ2014 />} />
            <Route path="/apush-practice-exam/mcq/2014/results" element={<APUSHPracticeExamMCQ2014Results />} />
            <Route path="/apush-practice-exam/saq/select" element={<APUSHPracticeExamSAQSelect />} />
            <Route path="/apush-practice-exam/saq/2025" element={<APUSHPracticeExamSAQ2025 />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={() => {}} />} />
            <Route path="/notes" element={<NotesFeed />} />
            <Route path="/notes/edit/:id" element={<EditNote />} />
            <Route path="/grade-games" element={<GradeGames />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;