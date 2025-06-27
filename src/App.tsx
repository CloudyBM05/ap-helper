import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import AuthForms from './components/AuthForms';
import NotesFeed, { EditNote } from './pages/NotesFeed';

function App() {
  const [showAuth, setShowAuth] = React.useState(false);
  const [showProfileEdit, setShowProfileEdit] = React.useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar
          onShowAuth={() => setShowAuth(true)}
          onEditProfile={() => setShowProfileEdit(true)}
        />
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
            <Route path="/register" element={<AuthForms />} />
            <Route path="/login" element={<AuthForms />} />
            <Route path="/notes" element={<NotesFeed />} />
            <Route path="/notes/edit/:id" element={<EditNote />} />
          </Routes>
        </main>
        <Footer />
        {/* Auth modal (for login/signup/profile) */}
        {(showAuth || showProfileEdit) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl p-0 max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-2xl text-slate-400 hover:text-slate-700"
                onClick={() => { setShowAuth(false); setShowProfileEdit(false); }}
                aria-label="Close"
              >×</button>
              <AuthForms
                forceProfileEdit={showProfileEdit}
                onClose={() => { setShowAuth(false); setShowProfileEdit(false); }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;