import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
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
import APUSHUnit1StudyGuide from './pages/APUSHUnit1StudyGuide';
import APUSHUnit2StudyGuide from './pages/APUSHUnit2StudyGuide';
import APUSHUnit3StudyGuide from './pages/APUSHUnit3StudyGuide';
import APUSHUnit4StudyGuide from './pages/APUSHUnit4StudyGuide';
import APUSHUnit5StudyGuide from './pages/APUSHUnit5StudyGuide';
import APUSHUnit6StudyGuide from './pages/APUSHUnit6StudyGuide';
import APUSHUnit7StudyGuide from './pages/APUSHUnit7StudyGuide';
import APUSHUnit8StudyGuide from './pages/APUSHUnit8StudyGuide';
import APUSHUnit9StudyGuide from './pages/APUSHUnit9StudyGuide';
import APUSHUnit1Quiz from './pages/APUSHUnit1Quiz';
import APUSHUnit2Quiz from './pages/APUSHUnit2Quiz';
import APUSHUnit3Quiz from './pages/APUSHUnit3Quiz';
import APUSHUnit4Quiz from './pages/APUSHUnit4Quiz';
import APUSHUnit5Quiz from './pages/APUSHUnit5Quiz';
import APUSHUnit6Quiz from './pages/APUSHUnit6Quiz';
import APUSHUnit7Quiz from './pages/APUSHUnit7Quiz';
import APUSHUnit8Quiz from './pages/APUSHUnit8Quiz';
import APUSHUnit9Quiz from './pages/APUSHUnit9Quiz';
import APUSHTimeline from './pages/APUSHTimeline';
import APUSHPracticeExamMCQSelect from './pages/APUSHPracticeExamMCQSelect';
import APUSHPracticeExamMCQ2015 from './pages/APUSHPracticeExamMCQ2015';
import APUSHPracticeExamMCQAPHelper from './pages/APUSHPracticeExamMCQAPHelper';
import APUSHPracticeExamMCQMarco from './pages/APUSHPracticeExamMCQMarco';
import APUSHPracticeExamMCQPrinceton from './pages/APUSHPracticeExamMCQPrinceton';
import APUSHPracticeExamMCQ2015Results from './pages/APUSHPracticeExamMCQ2015Results';
import APUSHPracticeExamSAQSelect from './pages/APUSHPracticeExamSAQSelect';
import APUSHPracticeExamSAQ2025 from './pages/APUSHPracticeExamSAQ2025';
import APUSHPracticeExamSAQ2025Set2 from './pages/APUSHPracticeExamSAQ2025Set2';
import APUSHPracticeExamLEQSelect from './pages/APUSHPracticeExamLEQSelect';
import APUSHPracticeExamLEQ from './pages/APUSHPracticeExamLEQ';
import APUSHPracticeExamDBQSelect from './pages/APUSHPracticeExamDBQSelect';
import APUSHPracticeExamDBQ from './pages/APUSHPracticeExamDBQ';
import APGovStudyGuide from './pages/APGovStudyGuide';
import APPhysicsStudyGuide from './pages/APPhysicsStudyGuide';
import APPhysicsUnit1 from './pages/APPhysicsUnit1';
import APPhysicsUnit1Quiz from './pages/APPhysicsUnit1Quiz';
import APPhysicsUnit2 from './pages/APPhysicsUnit2';
import APPhysicsUnit2Quiz from './pages/APPhysicsUnit2Quiz';
import APPhysicsUnit3 from './pages/APPhysicsUnit3';
import APPhysicsUnit3Quiz from './pages/APPhysicsUnit3Quiz';
import APPhysicsUnit4 from './pages/APPhysicsUnit4';
import APPhysicsUnit4Quiz from './pages/APPhysicsUnit4Quiz';
import APPhysicsUnit5 from './pages/APPhysicsUnit5';
import APPhysicsUnit5Quiz from './pages/APPhysicsUnit5Quiz';
import APPhysicsUnit6 from './pages/APPhysicsUnit6';
import APPhysicsUnit6Quiz from './pages/APPhysicsUnit6Quiz';
import APPhysicsUnit7 from './pages/APPhysicsUnit7';
import APPhysicsUnit7Quiz from './pages/APPhysicsUnit7Quiz';
import APPhysicsUnit8 from './pages/APPhysicsUnit8';
import APPhysicsUnit8Quiz from './pages/APPhysicsUnit8Quiz';
import APPhysicsMCQSelect from './pages/APPhysicsMCQSelect';
import APPhysicsCollegeBoard2017 from './pages/APPhysicsCollegeBoard2017';
import APPhysicsMITWorkbook from './pages/APPhysicsMITWorkbook';
import APPhysicsLabExperiments from './pages/APPhysicsLabExperiments';
import APPhysicsMathematicalRoutines from './pages/APPhysicsMathematicalRoutines';
import APPhysicsMathematicalRoutinesQ1 from './pages/APPhysicsMathematicalRoutinesQ1';
import APPhysicsTranslationRepresentations from './pages/APPhysicsTranslationRepresentations';
import APPhysicsTranslationRepresentationsQ1 from './pages/APPhysicsTranslationRepresentationsQ1';
import APPhysicsExperimentalDesign from './pages/APPhysicsExperimentalDesign';
import APPhysicsExperimentalDesignQ1 from './pages/APPhysicsExperimentalDesignQ1';
import APPhysicsQualitativeQuantitative from './pages/APPhysicsQualitativeQuantitative';
import APPhysicsQualitativeQuantitativeQ1 from './pages/APPhysicsQualitativeQuantitativeQ1';
import APGovUnit from './pages/APGovUnit';
import APGovUnit1 from './pages/APGovUnit1';
import APGovUnit2 from './pages/APGovUnit2';
import APGovUnit3 from './pages/APGovUnit3';
import APGovUnit4 from './pages/APGovUnit4';
import APGovUnit5 from './pages/APGovUnit5';
import AuthForms from './components/AuthForms';
import NotesFeed, { EditNote } from './pages/NotesFeed';
import APGovUnit1QuizPage from './pages/APGovUnit1Quiz';
import APGovUnit2QuizPage from './pages/APGovUnit2Quiz';
import APGovUnit3QuizPage from './pages/APGovUnit3Quiz';
import APGovUnit4QuizPage from './pages/APGovUnit4Quiz';
import APGovUnit5QuizPage from './pages/APGovUnit5Quiz';
import APGovCases from './pages/APGovCases';
import APGovMCQSelect from './pages/APGovMCQSelect';
import APGovPracticeExam1 from './pages/APGovPracticeExam1';
import APGovPracticeExamPrinceton from './pages/APGovPracticeExamPrinceton';
import APGovPracticeExamMarco from './pages/APGovPracticeExamMarco';
import APGovConceptApplication from './pages/APGovConceptApplication';
import APGovConceptApplicationSelect from './pages/APGovConceptApplicationSelect';
import APGovQuantitativeAnalysisSelect from './pages/APGovQuantitativeAnalysisSelect';
import APGovQuantitativeAnalysis from './pages/APGovQuantitativeAnalysis';
import APGovSCOTUSCaseSelect from './pages/APGovSCOTUSCaseSelect';
import APGovSCOTUSCase from './pages/APGovSCOTUSCase';
import APGovArgumentativeEssaySelect from './pages/APGovArgumentativeEssaySelect';
import APGovArgumentativeEssay from './pages/APGovArgumentativeEssay';
import APWorldStudyGuide from './pages/APWorldStudyGuide';
import APPsychologyStudyGuide from './pages/APPsychologyStudyGuide';
import APStatisticsStudyGuide from './pages/APStatisticsStudyGuide';
import APCSPStudyGuide from './pages/APCSPStudyGuide';
import APBiologyStudyGuide from './pages/APBiologyStudyGuide';
import APBiologyUnit1 from './pages/APBiologyUnit1';
import APBiologyUnit1Quiz from './pages/APBiologyUnit1Quiz';
import APBiologyUnit2 from './pages/APBiologyUnit2';
import APBiologyUnit2Quiz from './pages/APBiologyUnit2Quiz';
import APBiologyUnit3 from './pages/APBiologyUnit3';
import APBiologyUnit3Quiz from './pages/APBiologyUnit3Quiz';
import APBiologyUnit4 from './pages/APBiologyUnit4';
import APBiologyUnit4Quiz from './pages/APBiologyUnit4Quiz';
import APBiologyUnit5 from './pages/APBiologyUnit5';
import APBiologyUnit5Quiz from './pages/APBiologyUnit5Quiz';
import APBiologyUnit6 from './pages/APBiologyUnit6';
import APBiologyUnit6Quiz from './pages/APBiologyUnit6Quiz';
import APBiologyUnit7 from './pages/APBiologyUnit7';
import APBiologyUnit7Quiz from './pages/APBiologyUnit7Quiz';
import APBiologyUnit8 from './pages/APBiologyUnit8';
import APBiologyUnit8Quiz from './pages/APBiologyUnit8Quiz';
import APCSPUnit1 from './pages/APCSPUnit1';
import APCSPUnit1Quiz from './pages/APCSPUnit1Quiz';
import APCSPUnit2 from './pages/APCSPUnit2';
import APCSPUnit2Quiz from './pages/APCSPUnit2Quiz';
import APCSPUnit3 from './pages/APCSPUnit3';
import APCSPUnit3Quiz from './pages/APCSPUnit3Quiz';
import APCSPUnit4 from './pages/APCSPUnit4';
import APCSPUnit4Quiz from './pages/APCSPUnit4Quiz';
import APCSPUnit5 from './pages/APCSPUnit5';
import APCSPUnit5Quiz from './pages/APCSPUnit5Quiz';
import APCSPMCQOptions from './pages/APCSPMCQOptions';
import APCSPPracticeExamMCQPracticeBook from './pages/APCSPPracticeExamMCQPracticeBook';
import APCSP2016PracticeExamMCQ from './pages/APCSP2016PracticeExamMCQ';
import APPsychUnit1 from './pages/APPsychUnit1';
import APPsychUnit2 from './pages/APPsychUnit2';
import APPsychUnit3 from './pages/APPsychUnit3';
import APPsychUnit4 from './pages/APPsychUnit4';
import APPsychUnit5 from './pages/APPsychUnit5';
import APWorldUnit1 from './pages/APWorldUnit1';
import APWorldUnit2 from './pages/APWorldUnit2';
import APWorldUnit3 from './pages/APWorldUnit3';
import APWorldUnit4 from './pages/APWorldUnit4';
import APWorldUnit5 from './pages/APWorldUnit5';
import APWorldUnit6 from './pages/APWorldUnit6';
import APWorldUnit7 from './pages/APWorldUnit7';
import APWorldUnit8 from './pages/APWorldUnit8';
import APWorldUnit9 from './pages/APWorldUnit9';
import APWorldUnit1Quiz from './pages/APWorldUnit1Quiz';
import APWorldUnit2Quiz from './pages/APWorldUnit2Quiz';
import APWorldUnit3Quiz from './pages/APWorldUnit3Quiz';
import APWorldUnit4Quiz from './pages/APWorldUnit4Quiz';
import APWorldUnit5Quiz from './pages/APWorldUnit5Quiz';
import APWorldUnit6Quiz from './pages/APWorldUnit6Quiz';
import APWorldUnit7Quiz from './pages/APWorldUnit7Quiz';
import APWorldUnit8Quiz from './pages/APWorldUnit8Quiz';
import APWorldUnit9Quiz from './pages/APWorldUnit9Quiz';
import APWorldTimeline from './pages/APWorldTimeline';
import APPsychUnit1Quiz from './pages/APPsychUnit1Quiz';
import APPsychUnit2Quiz from './pages/APPsychUnit2Quiz';
import APPsychUnit3Quiz from './pages/APPsychUnit3Quiz';
import APPsychUnit4Quiz from './pages/APPsychUnit4Quiz';
import APPsychUnit5Quiz from './pages/APPsychUnit5Quiz';
import APPsychMCQSelect from './pages/APPsychMCQSelect';
import APPsychPracticeExamMCQ2012 from './pages/APPsychPracticeExamMCQ2012';
import APPsychPracticeExamMCQPrinceton from './pages/APPsychPracticeExamMCQPrinceton';
import APPsychPracticeExamMCQPrinceton2 from './pages/APPsychPracticeExamMCQPrinceton2';
import APWorldPracticeExamMCQSelect from './pages/APWorldPracticeExamMCQSelect';
import APWorldPracticeExamMCQCollegeboard from './pages/APWorldPracticeExamMCQCollegeboard';
import APWorldPracticeExamMCQPrinceton from './pages/APWorldPracticeExamMCQPrinceton';
import APWorldPracticeExamMCQCracked from './pages/APWorldPracticeExamMCQCracked';
import APWorldPracticeExamMCQCracked2 from './pages/APWorldPracticeExamMCQCracked2';
import APPsychPracticeExamAAQSelect from './pages/APPsychPracticeExamAAQSelect';
import APWorldPracticeExamSAQSelect from './pages/APWorldPracticeExamSAQSelect';
import APWorldPracticeExamDBQSelect from './pages/APWorldPracticeExamDBQSelect';
import APWorldPracticeExamLEQSelect from './pages/APWorldPracticeExamLEQSelect';
import APWorldPracticeExamSAQ2025 from './pages/APWorldPracticeExamSAQ2025';
import APWorldPracticeExamDBQ2025 from './pages/APWorldPracticeExamDBQ2025';
import APWorldPracticeExamLEQ2025 from './pages/APWorldPracticeExamLEQ2025';
import APPsychPracticeExamEBQSelect from './pages/APPsychPracticeExamEBQSelect';
import APMicroeconomicsStudyGuide from './pages/APMicroeconomicsStudyGuide';
import APMicroeconomicsUnit1 from './pages/APMicroeconomicsUnit1';
import APMicroeconomicsUnit2 from './pages/APMicroeconomicsUnit2';
import APMicroeconomicsUnit3 from './pages/APMicroeconomicsUnit3';
import APMicroeconomicsUnit4 from './pages/APMicroeconomicsUnit4';
import APMicroeconomicsUnit5 from './pages/APMicroeconomicsUnit5';
import APMicroeconomicsUnit6 from './pages/APMicroeconomicsUnit6';
import APMicroeconomicsUnit1Quiz from './pages/APMicroeconomicsUnit1Quiz';
import APStatisticsUnit1Quiz from './pages/APStatisticsUnit1Quiz';
import APStatisticsUnit2Quiz from './pages/APStatisticsUnit2Quiz';
import APStatisticsUnit3Quiz from './pages/APStatisticsUnit3Quiz';
import APStatisticsUnit4Quiz from './pages/APStatisticsUnit4Quiz';
import APStatisticsUnit5Quiz from './pages/APStatisticsUnit5Quiz';
import APStatisticsUnit6Quiz from './pages/APStatisticsUnit6Quiz';
import APStatisticsUnit7Quiz from './pages/APStatisticsUnit7Quiz';
import APStatisticsUnit8Quiz from './pages/APStatisticsUnit8Quiz';
import APStatisticsUnit9Quiz from './pages/APStatisticsUnit9Quiz';
import APStatisticsMCQSelect from './pages/APStatisticsMCQSelect';
import APStatisticsPracticeExamMCQ2012 from './pages/APStatisticsPracticeExamMCQ2012';
import APStatisticsPracticeExamMCQ1998 from './pages/APStatisticsPracticeExamMCQ1998';
import APStatisticsShortFRQSelect from './pages/APStatisticsShortFRQSelect';
import APStatisticsInvestigativeTaskSelect from './pages/APStatisticsInvestigativeTaskSelect';
import APStatisticsInvestigativeTask1 from './pages/APStatisticsInvestigativeTask1';
import APMicroUnit2Quiz from './pages/APMicroeconomicsUnit2Quiz';
import APMicroUnit3Quiz from './pages/APMicroeconomicsUnit3Quiz';
import APMicroUnit4Quiz from './pages/APMicroeconomicsUnit4Quiz';
import APMicroeconomicsUnit5Quiz from './pages/APMicroeconomicsUnit5Quiz';
import APMicroeconomicsUnit6Quiz from './pages/APMicroeconomicsUnit6Quiz';
import APMicroeconomicsMCQOptions from './pages/APMicroeconomicsMCQOptions';
import APMicroPracticeExamMCQ2012 from './pages/APMicroPracticeExamMCQ2012';
import APMicroPracticeExamMCQPrinceton from './pages/APMicroPracticeExamMCQPrinceton';
import APMicroPracticeExamMCQ2011 from './pages/APMicroPracticeExamMCQ2011';
import APMicroLongFRQSelect from './pages/APMicroLongFRQSelect';
import APMicroLongFRQ from './pages/APMicroLongFRQ';
import APMicroShortFRQSelect from './pages/APMicroShortFRQSelect';
import APMicroShortFRQSet1Select from './pages/APMicroShortFRQSet1Select';
import APMicroShortFRQSet1Q1 from './pages/APMicroShortFRQSet1Q1';
import APMicroShortFRQSet1Q2 from './pages/APMicroShortFRQSet1Q2';
import APMicroShortFRQSet1Q3 from './pages/APMicroShortFRQSet1Q3';
import APMicroShortFRQSet2Select from './pages/APMicroShortFRQSet2Select';
import APMicroShortFRQSet2Q2 from './pages/APMicroShortFRQSet2Q2';
import APMicroShortFRQSet2Q3 from './pages/APMicroShortFRQSet2Q3';
import APMacroeconomicsStudyGuide from './pages/APMacroeconomicsStudyGuide';
import APMacroUnit1 from './pages/APMacroUnit1';
import APMacroUnit2 from './pages/APMacroUnit2';
import APMacroUnit3 from './pages/APMacroUnit3';
import APMacroUnit4 from './pages/APMacroUnit4';
import APMacroUnit5 from './pages/APMacroUnit5';
import APMacroUnit6 from './pages/APMacroUnit6';
import APMacroUnit1Quiz from './pages/APMacroUnit1Quiz';
import APMacroUnit2Quiz from './pages/APMacroUnit2Quiz';
import APMacroUnit3Quiz from './pages/APMacroUnit3Quiz';
import APMacroUnit4Quiz from './pages/APMacroUnit4Quiz';
import APMacroUnit5Quiz from './pages/APMacroUnit5Quiz';
import APMacroUnit6Quiz from './pages/APMacroUnit6Quiz';
import APMacroPracticeExamMCQ from './pages/APMacroPracticeExamMCQ';
import APMacroeconomicsMCQOptions from './pages/APMacroeconomicsMCQOptions';
import APMacroPracticeExamMCQ2012 from './pages/APMacroPracticeExamMCQ2012';
import APMacroPracticeExamMCQPrinceton from './pages/APMacroPracticeExamMCQPrinceton';
import APMacroPracticeExamMCQ2010 from './pages/APMacroPracticeExamMCQ2010';
import APMacroPracticeExamLongFRQ from './pages/APMacroPracticeExamLongFRQ';
import APMacroPracticeExamShortFRQ from './pages/APMacroPracticeExamShortFRQ';
import APMacroPracticeExamLongFRQExam from './pages/APMacroPracticeExamLongFRQExam';
import APMacroShortFRQSelect from './pages/APMacroShortFRQSelect';
import APMacroShortFRQSetSelect from './pages/APMacroShortFRQSetSelect';
import APMacroShortFRQ from './pages/APMacroShortFRQ';
import APHumanGeographyStudyGuide from './pages/APHumanGeographyStudyGuide';
import APHumanGeographyUnit1 from './pages/APHumanGeographyUnit1';
import APHumanGeographyUnit2 from './pages/APHumanGeographyUnit2';
import APHumanGeographyUnit1Quiz from './pages/APHumanGeographyUnit1Quiz';
import APHumanGeographyUnit2Quiz from './pages/APHumanGeographyUnit2Quiz';
import APHumanGeographyUnit3 from './pages/APHumanGeographyUnit3';
import APHumanGeographyUnit4 from './pages/APHumanGeographyUnit4';
import APHumanGeographyUnit4Quiz from './pages/APHumanGeographyUnit4Quiz';
import APHumanGeographyUnit3Quiz from './pages/APHumanGeographyUnit3Quiz';
import APHumanGeographyUnit5 from './pages/APHumanGeographyUnit5';
import APHumanGeographyUnit5Quiz from './pages/APHumanGeographyUnit5Quiz';
import APHumanGeographyUnit6 from './pages/APHumanGeographyUnit6';
import APHumanGeographyUnit6Quiz from './pages/APHumanGeographyUnit6Quiz';
import APHumanGeographyUnit7 from './pages/APHumanGeographyUnit7';
import APHumanGeographyUnit7Quiz from './pages/APHumanGeographyUnit7Quiz';
import APHumanGeographyMCQSelect from './pages/APHumanGeographyMCQSelect';
import APHumanGeographyPracticeExamMCQ2022 from './pages/APHumanGeographyPracticeExamMCQ2022';
import APHumanGeographyPracticeExamMCQPrinceton from './pages/APHumanGeographyPracticeExamMCQPrinceton';
import APHumanGeographyConceptApplicationSelect from './pages/APHumanGeographyConceptApplicationSelect';
import APHumanGeographyConceptApplicationSet1 from './pages/APHumanGeographyConceptApplicationSet1';
import APHumanGeographyConceptApplicationSet2 from './pages/APHumanGeographyConceptApplicationSet2';
import APHumanGeographySpatialRelationshipsSelect from './pages/APHumanGeographySpatialRelationshipsSelect';
import APHumanGeographySpatialRelationshipsSet1 from './pages/APHumanGeographySpatialRelationshipsSet1';
import APHumanGeographySpatialRelationshipsSet2 from './pages/APHumanGeographySpatialRelationshipsSet2';
import APHumanGeographyScaleAnalysisSelect from './pages/APHumanGeographyScaleAnalysisSelect';
import APHumanGeographyScaleAnalysisSet1 from './pages/APHumanGeographyScaleAnalysisSet1';
import APHumanGeographyScaleAnalysisSet2 from './pages/APHumanGeographyScaleAnalysisSet2';
import APStatisticsUnit1 from './pages/APStatisticsUnit1';
import APStatisticsUnit2 from './pages/APStatisticsUnit2';
import APStatisticsUnit3 from './pages/APStatisticsUnit3';
import APStatisticsUnit4 from './pages/APStatisticsUnit4';
import APStatisticsUnit5 from './pages/APStatisticsUnit5';
import APStatisticsUnit6 from './pages/APStatisticsUnit6';
import APStatisticsUnit7 from './pages/APStatisticsUnit7';
import APStatisticsUnit8 from './pages/APStatisticsUnit8';
import APStatisticsUnit9 from './pages/APStatisticsUnit9';
import APStatisticsShortFRQ1 from './pages/APStatisticsShortFRQ1';
import APStatisticsShortFRQ2 from './pages/APStatisticsShortFRQ2';
import APStatisticsShortFRQ3 from './pages/APStatisticsShortFRQ3';
import APStatisticsShortFRQ4 from './pages/APStatisticsShortFRQ4';
import APStatisticsShortFRQ5 from './pages/APStatisticsShortFRQ5';
import APBiologyMCQSelect from './pages/APBiologyMCQSelect';
import APBiologyCollegeboard2013 from './pages/APBiologyCollegeboard2013';
import APBiologyPrinceton from './pages/APBiologyPrinceton';
import APBiologyTextbook from './pages/APBiologyTextbook';
import APBiologyLongFRQSelect from './pages/APBiologyLongFRQSelect';
import APBiologyLongFRQ from './pages/APBiologyLongFRQ';
import APBiologyShortFRQSelect from './pages/APBiologyShortFRQSelect';
import APBiologyShortFRQ from './pages/APBiologyShortFRQ';
import SocraticLearning from './pages/SocraticLearning';
import SocraticChat from './pages/SocraticChat';
import CollectionsPage from './pages/CollectionsPage';
import CollectionsDebug from './pages/CollectionsDebug';
import CollectionsTest from './pages/CollectionsTest';
import Arena from './pages/Arena';

function App() {
  const [showAuth, setShowAuth] = React.useState(false);
  const [showProfileEdit, setShowProfileEdit] = React.useState(false);

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar
          onShowAuth={() => setShowAuth(true)}
          onEditProfile={() => setShowProfileEdit(true)}
        />
        <main>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/essay-grader" element={<EssayGrader />} />
            <Route path="/study-guides" element={<StudyGuides />} />
            <Route path="/practice-exams" element={<PracticeExams />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/socratic-learning" element={<SocraticLearning />} />
            <Route path="/socratic-chat/:course/:unit" element={<SocraticChat />} />
            <Route path="/ap-gov-study-guide" element={<APGovStudyGuide />} />
            <Route path="/ap-physics-study-guide" element={<APPhysicsStudyGuide />} />
            <Route path="/ap-computer-science-principles-study-guide" element={<APCSPStudyGuide />} />
            <Route path="/ap-biology-study-guide" element={<APBiologyStudyGuide />} />
            <Route path="/ap-biology/unit/1" element={<APBiologyUnit1 />} />
            <Route path="/ap-biology/unit/1/quiz" element={<APBiologyUnit1Quiz />} />
            <Route path="/ap-biology/unit/2" element={<APBiologyUnit2 />} />
            <Route path="/ap-biology/unit/2/quiz" element={<APBiologyUnit2Quiz />} />
            <Route path="/ap-biology/unit/3" element={<APBiologyUnit3 />} />
            <Route path="/ap-biology/unit/3/quiz" element={<APBiologyUnit3Quiz />} />
            <Route path="/ap-biology/unit/4" element={<APBiologyUnit4 />} />
            <Route path="/ap-biology/unit/4/quiz" element={<APBiologyUnit4Quiz />} />
            <Route path="/ap-biology/unit/5" element={<APBiologyUnit5 />} />
            <Route path="/ap-biology/unit/5/quiz" element={<APBiologyUnit5Quiz />} />
            <Route path="/ap-biology/unit/6" element={<APBiologyUnit6 />} />
            <Route path="/ap-biology/unit/6/quiz" element={<APBiologyUnit6Quiz />} />
            <Route path="/ap-biology/unit/7" element={<APBiologyUnit7 />} />
            <Route path="/ap-biology/unit/7/quiz" element={<APBiologyUnit7Quiz />} />
            <Route path="/ap-biology/unit/8" element={<APBiologyUnit8 />} />
            <Route path="/ap-biology/unit/8/quiz" element={<APBiologyUnit8Quiz />} />
            <Route path="/ap-biology-practice-exam/mcq/select" element={<APBiologyMCQSelect />} />
            <Route path="/ap-biology-practice-exam/mcq/collegeboard-2013" element={<APBiologyCollegeboard2013 />} />
            <Route path="/ap-biology-practice-exam/mcq/princeton" element={<APBiologyPrinceton />} />
            <Route path="/ap-biology-practice-exam/mcq/textbook" element={<APBiologyTextbook />} />
            <Route path="/ap-biology-practice-exam/long-frq" element={<APBiologyLongFRQSelect />} />
            <Route path="/ap-biology-practice-exam/long-frq/:setId" element={<APBiologyLongFRQ />} />
            <Route path="/ap-biology-practice-exam/short-frq" element={<APBiologyShortFRQSelect />} />
            <Route path="/ap-biology-practice-exam/short-frq/:setId" element={<APBiologyShortFRQ />} />
            <Route path="/ap-csp-big-idea/1" element={<APCSPUnit1 />} />
            <Route path="/ap-csp-big-idea/1/quiz" element={<APCSPUnit1Quiz />} />
            <Route path="/ap-csp-big-idea/2" element={<APCSPUnit2 />} />
            <Route path="/ap-csp-big-idea/2/quiz" element={<APCSPUnit2Quiz />} />
            <Route path="/ap-csp-big-idea/3" element={<APCSPUnit3 />} />
            <Route path="/ap-csp-big-idea/3/quiz" element={<APCSPUnit3Quiz />} />
            <Route path="/ap-csp-big-idea/4" element={<APCSPUnit4 />} />
            <Route path="/ap-csp-big-idea/4/quiz" element={<APCSPUnit4Quiz />} />
            <Route path="/ap-csp-big-idea/5" element={<APCSPUnit5 />} />
            <Route path="/ap-csp-big-idea/5/quiz" element={<APCSPUnit5Quiz />} />
            <Route path="/ap-csp-practice-exam/mcq" element={<APCSPMCQOptions />} />
            <Route path="/ap-csp-practice-exam/mcq/2016" element={<APCSP2016PracticeExamMCQ />} />
            <Route path="/ap-csp-practice-exam/mcq/practice-book" element={<APCSPPracticeExamMCQPracticeBook />} />
            <Route path="/ap-physics/unit/1" element={<APPhysicsUnit1 />} />
            <Route path="/ap-physics/unit/1/quiz" element={<APPhysicsUnit1Quiz />} />
            <Route path="/ap-physics/unit/2" element={<APPhysicsUnit2 />} />
            <Route path="/ap-physics/unit/2/quiz" element={<APPhysicsUnit2Quiz />} />
            <Route path="/ap-physics/unit/3" element={<APPhysicsUnit3 />} />
            <Route path="/ap-physics/unit/3/quiz" element={<APPhysicsUnit3Quiz />} />
            <Route path="/ap-physics/unit/4" element={<APPhysicsUnit4 />} />
            <Route path="/ap-physics/unit/4/quiz" element={<APPhysicsUnit4Quiz />} />
            <Route path="/ap-physics/unit/5" element={<APPhysicsUnit5 />} />
            <Route path="/ap-physics/unit/5/quiz" element={<APPhysicsUnit5Quiz />} />
            <Route path="/ap-physics/unit/6" element={<APPhysicsUnit6 />} />
            <Route path="/ap-physics/unit/6/quiz" element={<APPhysicsUnit6Quiz />} />
            <Route path="/ap-physics/unit/7" element={<APPhysicsUnit7 />} />
            <Route path="/ap-physics/unit/7/quiz" element={<APPhysicsUnit7Quiz />} />
            <Route path="/ap-physics/unit/8" element={<APPhysicsUnit8 />} />
            <Route path="/ap-physics/unit/8/quiz" element={<APPhysicsUnit8Quiz />} />
            <Route path="/ap-physics-practice-exam/mcq" element={<APPhysicsMCQSelect />} />
            <Route path="/ap-physics-practice-exam/mcq/collegeboard-2017" element={<APPhysicsCollegeBoard2017 />} />
            <Route path="/ap-physics-practice-exam/mcq/mit-workbook" element={<APPhysicsMITWorkbook />} />
            <Route path="/ap-physics-practice-exam/mcq/physics-lab" element={<APPhysicsLabExperiments />} />
            <Route path="/ap-physics-practice-exam/mathematical-routines" element={<APPhysicsMathematicalRoutines />} />
            <Route path="/ap-physics-practice-exam/mathematical-routines/q1" element={<APPhysicsMathematicalRoutinesQ1 />} />
            <Route path="/ap-physics-practice-exam/translation-representations" element={<APPhysicsTranslationRepresentations />} />
            <Route path="/ap-physics-practice-exam/translation-representations/q1" element={<APPhysicsTranslationRepresentationsQ1 />} />
            <Route path="/ap-physics-practice-exam/experimental-design" element={<APPhysicsExperimentalDesign />} />
            <Route path="/ap-physics-practice-exam/experimental-design/q1" element={<APPhysicsExperimentalDesignQ1 />} />
            <Route path="/ap-physics-practice-exam/qualitative-quantitative" element={<APPhysicsQualitativeQuantitative />} />
            <Route path="/ap-physics-practice-exam/qualitative-quantitative/q1" element={<APPhysicsQualitativeQuantitativeQ1 />} />
            <Route path="/ap-gov-unit/:unitId" element={<APGovUnit />} />
            <Route path="/ap-gov-study-guide/unit/1" element={<APGovUnit1 />} />
            <Route path="/ap-gov-study-guide/unit/1/quiz" element={<APGovUnit1QuizPage />} />
            <Route path="/ap-gov-study-guide/unit/2" element={<APGovUnit2 />} />
            <Route path="/ap-gov-study-guide/unit/2/quiz" element={<APGovUnit2QuizPage />} />
            <Route path="/ap-gov-study-guide/unit/3" element={<APGovUnit3 />} />
            <Route path="/ap-gov-study-guide/unit/3/quiz" element={<APGovUnit3QuizPage />} />
            <Route path="/ap-gov-study-guide/unit/4" element={<APGovUnit4 />} />
            <Route path="/ap-gov-study-guide/unit/4/quiz" element={<APGovUnit4QuizPage />} />
            <Route path="/ap-gov-study-guide/unit/5" element={<APGovUnit5 />} />
            <Route path="/ap-gov-study-guide/unit/5/quiz" element={<APGovUnit5QuizPage />} />
            {/* APUSH Study Guide and Quizzes */}
            <Route path="/apush-study-guide" element={<APUSHStudyGuide />} />
            <Route path="/apush-study-guide/unit/1" element={<APUSHUnit1StudyGuide />} />
            <Route path="/apush-study-guide/unit/2" element={<APUSHUnit2StudyGuide />} />
            <Route path="/apush-study-guide/unit/3" element={<APUSHUnit3StudyGuide />} />
            <Route path="/apush-study-guide/unit/4" element={<APUSHUnit4StudyGuide />} />
            <Route path="/apush-study-guide/unit/5" element={<APUSHUnit5StudyGuide />} />
            <Route path="/apush-study-guide/unit/6" element={<APUSHUnit6StudyGuide />} />
            <Route path="/apush-study-guide/unit/7" element={<APUSHUnit7StudyGuide />} />
            <Route path="/apush-study-guide/unit/8" element={<APUSHUnit8StudyGuide />} />
            <Route path="/apush-study-guide/unit/9" element={<APUSHUnit9StudyGuide />} />
            <Route path="/apush-study-guide/unit/1/quiz" element={<APUSHUnit1Quiz />} />
            <Route path="/apush-study-guide/unit/2/quiz" element={<APUSHUnit2Quiz />} />
            <Route path="/apush-study-guide/unit/3/quiz" element={<APUSHUnit3Quiz />} />
            <Route path="/apush-study-guide/unit/4/quiz" element={<APUSHUnit4Quiz />} />
            <Route path="/apush-study-guide/unit/5/quiz" element={<APUSHUnit5Quiz />} />
            <Route path="/apush-study-guide/unit/6/quiz" element={<APUSHUnit6Quiz />} />
            <Route path="/apush-study-guide/unit/7/quiz" element={<APUSHUnit7Quiz />} />
            <Route path="/apush-study-guide/unit/8/quiz" element={<APUSHUnit8Quiz />} />
            <Route path="/apush-study-guide/unit/9/quiz" element={<APUSHUnit9Quiz />} />
            <Route path="/apush-timeline" element={<APUSHTimeline />} />
            <Route path="/apush-practice-exam/mcq/select" element={<APUSHPracticeExamMCQSelect />} />
            <Route path="/apush-practice-exam/mcq/2015" element={<APUSHPracticeExamMCQ2015 />} />
            <Route path="/apush-practice-exam/mcq/ap-helper" element={<APUSHPracticeExamMCQAPHelper />} />
            <Route path="/apush-practice-exam/mcq/marco-apush" element={<APUSHPracticeExamMCQMarco />} />
            <Route path="/apush-practice-exam/mcq/princeton" element={<APUSHPracticeExamMCQPrinceton />} />
            <Route path="/apush-practice-exam/mcq/2015/results" element={<APUSHPracticeExamMCQ2015Results />} />
            <Route path="/apush-practice-exam/saq/select" element={<APUSHPracticeExamSAQSelect />} />
            <Route path="/apush-practice-exam/saq/2025/:questionId" element={<APUSHPracticeExamSAQ2025 />} />
            <Route path="/apush-practice-exam/saq/2025-set-2/:questionId" element={<APUSHPracticeExamSAQ2025Set2 />} />
            <Route path="/apush-practice-exam/leq/select" element={<APUSHPracticeExamLEQSelect />} />
            <Route path="/apush-practice-exam/leq/:setId/:questionId" element={<APUSHPracticeExamLEQ />} />
            <Route path="/apush-practice-exam/dbq/select" element={<APUSHPracticeExamDBQSelect />} />
            <Route path="/apush-practice-exam/dbq/:setId" element={<APUSHPracticeExamDBQ />} />
            <Route path="/register" element={<AuthForms />} />
            <Route path="/login" element={<AuthForms />} />
            <Route path="/notes" element={<NotesFeed />} />
            <Route path="/notes/edit/:id" element={<EditNote />} />
            <Route path="/ap-gov-unit-5-quiz" element={<APGovUnit5QuizPage />} />
            <Route path="/ap-gov-unit/all-cases" element={<APGovCases />} />
            <Route path="/apush-study-guide" element={<APUSHStudyGuide />} />
            <Route path="/apush-study-guide/unit/1" element={<APUSHUnit1StudyGuide />} />
            <Route path="/apush-study-guide/unit/2" element={<APUSHUnit2StudyGuide />} />
            <Route path="/apush-study-guide/unit/3" element={<APUSHUnit3StudyGuide />} />
            <Route path="/apush-study-guide/unit/4" element={<APUSHUnit4StudyGuide />} />
            <Route path="/apush-study-guide/unit/5" element={<APUSHUnit5StudyGuide />} />
            <Route path="/apush-study-guide/unit/6" element={<APUSHUnit6StudyGuide />} />
            <Route path="/apush-study-guide/unit/7" element={<APUSHUnit7StudyGuide />} />
            <Route path="/apush-study-guide/unit/8" element={<APUSHUnit8StudyGuide />} />
            <Route path="/apush-study-guide/unit/9" element={<APUSHUnit9StudyGuide />} />
            <Route path="/ap-psychology-study-guide" element={<APPsychologyStudyGuide />} />
            <Route path="/ap-statistics-study-guide" element={<APStatisticsStudyGuide />} />
            <Route path="/ap-statistics/unit/1" element={<APStatisticsUnit1 />} />
            <Route path="/ap-statistics/unit/2" element={<APStatisticsUnit2 />} />
            <Route path="/ap-statistics/unit/3" element={<APStatisticsUnit3 />} />
            <Route path="/ap-statistics/unit/4" element={<APStatisticsUnit4 />} />
            <Route path="/ap-statistics/unit/5" element={<APStatisticsUnit5 />} />
            <Route path="/ap-statistics/unit/6" element={<APStatisticsUnit6 />} />
            <Route path="/ap-statistics/unit/7" element={<APStatisticsUnit7 />} />
            <Route path="/ap-statistics/unit/8" element={<APStatisticsUnit8 />} />
            <Route path="/ap-statistics/unit/9" element={<APStatisticsUnit9 />} />
            <Route path="/ap-statistics/unit/1/quiz" element={<APStatisticsUnit1Quiz />} />
            <Route path="/ap-statistics/unit/2/quiz" element={<APStatisticsUnit2Quiz />} />
            <Route path="/ap-statistics/unit/3/quiz" element={<APStatisticsUnit3Quiz />} />
            <Route path="/ap-statistics/unit/4/quiz" element={<APStatisticsUnit4Quiz />} />
            <Route path="/ap-statistics/unit/5/quiz" element={<APStatisticsUnit5Quiz />} />
            <Route path="/ap-statistics/unit/6/quiz" element={<APStatisticsUnit6Quiz />} />
            <Route path="/ap-statistics/unit/7/quiz" element={<APStatisticsUnit7Quiz />} />
            <Route path="/ap-statistics/unit/8/quiz" element={<APStatisticsUnit8Quiz />} />
            <Route path="/ap-statistics/unit/9/quiz" element={<APStatisticsUnit9Quiz />} />
            <Route path="/ap-statistics-practice-exam/mcq/select" element={<APStatisticsMCQSelect />} />
            <Route path="/ap-statistics-practice-exam/mcq/2012" element={<APStatisticsPracticeExamMCQ2012 />} />
            <Route path="/ap-statistics-practice-exam/mcq/1998" element={<APStatisticsPracticeExamMCQ1998 />} />
            <Route path="/ap-statistics-practice-exam/shorter-frq" element={<APStatisticsShortFRQSelect />} />
            <Route path="/ap-statistics-practice-exam/shorter-frq/2" element={<APStatisticsShortFRQ2 />} />
            <Route path="/ap-statistics-practice-exam/shorter-frq/3" element={<APStatisticsShortFRQ3 />} />
            <Route path="/ap-statistics-practice-exam/shorter-frq/4" element={<APStatisticsShortFRQ4 />} />
            <Route path="/ap-statistics-practice-exam/shorter-frq/5" element={<APStatisticsShortFRQ5 />} />
            <Route path="/ap-statistics-practice-exam/investigative-task/select" element={<APStatisticsInvestigativeTaskSelect />} />
            <Route path="/ap-statistics-practice-exam/investigative-task/1" element={<APStatisticsInvestigativeTask1 />} />
            <Route path="/ap-psychology/unit/1" element={<APPsychUnit1 />} />
            <Route path="/ap-psychology/unit/1/quiz" element={<APPsychUnit1Quiz />} />
            <Route path="/ap-psychology/unit/2" element={<APPsychUnit2 />} />
            <Route path="/ap-psychology/unit/2/quiz" element={<APPsychUnit2Quiz />} />
            <Route path="/ap-psychology/unit/3" element={<APPsychUnit3 />} />
            <Route path="/ap-psychology/unit/3/quiz" element={<APPsychUnit3Quiz />} />
            <Route path="/ap-psychology/unit/4" element={<APPsychUnit4 />} />
            <Route path="/ap-psychology/unit/4/quiz" element={<APPsychUnit4Quiz />} />
            <Route path="/ap-psychology/unit/5" element={<APPsychUnit5 />} />
            <Route path="/ap-psychology/unit/5/quiz" element={<APPsychUnit5Quiz />} />
            <Route path="/ap-gov-practice-exam/mcq/select" element={<APGovMCQSelect />} />
            <Route path="/apgov-practice-exam-1" element={<APGovPracticeExam1 />} />
            <Route path="/ap-gov-practice-exam/mcq/2018" element={<APGovPracticeExam1 />} />
            <Route path="/ap-gov-practice-exam/mcq/princeton" element={<APGovPracticeExamPrinceton />} />
            <Route path="/ap-gov-practice-exam/mcq/marco" element={<APGovPracticeExamMarco />} />
            <Route path="/ap-gov-practice-exam/concept-application" element={<APGovConceptApplicationSelect />} />
            <Route path="/ap-gov-practice-exam/concept-application/:setId" element={<APGovConceptApplication />} />
            <Route path="/ap-gov-practice-exam/quantitative-analysis" element={<APGovQuantitativeAnalysisSelect />} />
            <Route path="/ap-gov-practice-exam/quantitative-analysis/:setId" element={<APGovQuantitativeAnalysis />} />
            <Route path="/ap-gov-practice-exam/scotus-case" element={<APGovSCOTUSCaseSelect />} />
            <Route path="/ap-gov-practice-exam/scotus-case/:setId" element={<APGovSCOTUSCase />} />
            <Route path="/ap-gov-practice-exam/argumentative-essay" element={<APGovArgumentativeEssaySelect />} />
            <Route path="/ap-gov-practice-exam/argumentative-essay/:setId" element={<APGovArgumentativeEssay />} />
            <Route path="/ap-world-study-guide" element={<APWorldStudyGuide />} />
            <Route path="/ap-world-study-guide/unit/1" element={<APWorldUnit1 />} />
            <Route path="/ap-world-study-guide/unit/2" element={<APWorldUnit2 />} />
            <Route path="/ap-world-study-guide/unit/3" element={<APWorldUnit3 />} />
            <Route path="/ap-world-study-guide/unit/4" element={<APWorldUnit4 />} />
            <Route path="/ap-world-study-guide/unit/5" element={<APWorldUnit5 />} />
            <Route path="/ap-world-study-guide/unit/6" element={<APWorldUnit6 />} />
            <Route path="/ap-world-study-guide/unit/7" element={<APWorldUnit7 />} />
            <Route path="/ap-world-study-guide/unit/8" element={<APWorldUnit8 />} />
            <Route path="/ap-world-study-guide/unit/9" element={<APWorldUnit9 />} />
            <Route path="/ap-world-study-guide/unit/1/quiz" element={<APWorldUnit1Quiz />} />
            <Route path="/ap-world-study-guide/unit/2/quiz" element={<APWorldUnit2Quiz />} />
            <Route path="/ap-world-study-guide/unit/3/quiz" element={<APWorldUnit3Quiz />} />
            <Route path="/ap-world-study-guide/unit/4/quiz" element={<APWorldUnit4Quiz />} />
            <Route path="/ap-world-study-guide/unit/5/quiz" element={<APWorldUnit5Quiz />} />
            <Route path="/ap-world-study-guide/unit/6/quiz" element={<APWorldUnit6Quiz />} />
            <Route path="/ap-world-study-guide/unit/7/quiz" element={<APWorldUnit7Quiz />} />
            <Route path="/ap-world-study-guide/unit/8/quiz" element={<APWorldUnit8Quiz />} />
            <Route path="/ap-world-study-guide/unit/9/quiz" element={<APWorldUnit9Quiz />} />
            <Route path="/apworld-timeline" element={<APWorldTimeline />} />
            <Route path="/ap-psychology-practice-exam/mcq/select" element={<APPsychMCQSelect />} />
            <Route path="/ap-psychology-practice-exam/mcq/2012" element={<APPsychPracticeExamMCQ2012 />} />
            <Route path="/ap-psychology-practice-exam/mcq/princeton" element={<APPsychPracticeExamMCQPrinceton />} />
            <Route path="/ap-psychology-practice-exam/mcq/princeton2" element={<APPsychPracticeExamMCQPrinceton2 />} />
            <Route path="/apworld-practice-exam/mcq/select" element={<APWorldPracticeExamMCQSelect />} />
            <Route path="/apworld-practice-exam/mcq/collegeboard" element={<APWorldPracticeExamMCQCollegeboard />} />
            <Route path="/apworld-practice-exam/mcq/princeton" element={<APWorldPracticeExamMCQPrinceton />} />
            <Route path="/apworld-practice-exam/mcq/cracked" element={<APWorldPracticeExamMCQCracked />} />
            <Route path="/apworld-practice-exam/mcq/cracked2" element={<APWorldPracticeExamMCQCracked2 />} />
            <Route path="/ap-psychology-practice-exam/article-analysis" element={<APPsychPracticeExamAAQSelect />} />
            <Route path="/apworld-practice-exam/saq/select" element={<APWorldPracticeExamSAQSelect />} />
            <Route path="/apworld-practice-exam/dbq/select" element={<APWorldPracticeExamDBQSelect />} />
            <Route path="/apworld-practice-exam/leq/select" element={<APWorldPracticeExamLEQSelect />} />
            <Route path="/apworld-practice-exam/saq/:questionId" element={<APWorldPracticeExamSAQ2025 />} />
            <Route path="/apworld-practice-exam/dbq/2025" element={<APWorldPracticeExamDBQ2025 />} />
            <Route path="/apworld-practice-exam/leq/2025" element={<APWorldPracticeExamLEQ2025 />} />
            <Route path="/ap-psychology-practice-exam/evidence-based" element={<APPsychPracticeExamEBQSelect />} />
            <Route path="/ap-microeconomics-study-guide" element={<APMicroeconomicsStudyGuide />} />
            <Route path="/ap-microeconomics/unit/1" element={<APMicroeconomicsUnit1 />} />
            <Route path="/ap-microeconomics/unit/1/quiz" element={<APMicroeconomicsUnit1Quiz />} />
            <Route path="/ap-microeconomics/unit/2" element={<APMicroeconomicsUnit2 />} />
            <Route path="/ap-microeconomics/unit/2/quiz" element={<APMicroUnit2Quiz />} />
            <Route path="/ap-microeconomics/unit/3" element={<APMicroeconomicsUnit3 />} />
            <Route path="/ap-microeconomics/unit/3/quiz" element={<APMicroUnit3Quiz />} />
            <Route path="/ap-microeconomics/unit/4" element={<APMicroeconomicsUnit4 />} />
            <Route path="/ap-microeconomics/unit/4/quiz" element={<APMicroUnit4Quiz />} />
            <Route path="/ap-microeconomics/unit/5" element={<APMicroeconomicsUnit5 />} />
            <Route path="/ap-microeconomics/unit/5/quiz" element={<APMicroeconomicsUnit5Quiz />} />
            <Route path="/ap-microeconomics/unit/6" element={<APMicroeconomicsUnit6 />} />
            <Route path="/ap-microeconomics/unit/6/quiz" element={<APMicroeconomicsUnit6Quiz />} />
            <Route path="/ap-microeconomics-practice-exam/mcq/select" element={<APMicroeconomicsMCQOptions />} />
            <Route path="/ap-microeconomics-practice-exam/mcq/2012" element={<APMicroPracticeExamMCQ2012 />} />
            <Route path="/ap-microeconomics-practice-exam/mcq/princeton" element={<APMicroPracticeExamMCQPrinceton />} />
            <Route path="/ap-microeconomics-practice-exam/mcq/2011" element={<APMicroPracticeExamMCQ2011 />} />
            <Route path="/ap-microeconomics-practice-exam/long-frq" element={<APMicroLongFRQSelect />} />
            <Route path="/ap-microeconomics-practice-exam/long-frq/:setId" element={<APMicroLongFRQ />} />
            <Route path="/ap-microeconomics-practice-exam/short-frq" element={<APMicroShortFRQSelect />} />
            <Route path="/ap-microeconomics-practice-exam/short-frq/set1" element={<APMicroShortFRQSet1Select />} />
            <Route path="/ap-microeconomics-practice-exam/short-frq/set1/q1" element={<APMicroShortFRQSet1Q1 />} />
            <Route path="/ap-microeconomics-practice-exam/short-frq/set1/q2" element={<APMicroShortFRQSet1Q2 />} />
            <Route path="/ap-microeconomics-practice-exam/short-frq/set1/q3" element={<APMicroShortFRQSet1Q3 />} />
            <Route path="/ap-microeconomics-practice-exam/short-frq/set2" element={<APMicroShortFRQSet2Select />} />
            <Route path="/ap-microeconomics-practice-exam/short-frq/set2/q2" element={<APMicroShortFRQSet2Q2 />} />
            <Route path="/ap-microeconomics-practice-exam/short-frq/set2/q3" element={<APMicroShortFRQSet2Q3 />} />
            <Route path="/ap-macroeconomics-study-guide" element={<APMacroeconomicsStudyGuide />} />
            <Route path="/ap-macroeconomics/unit/1" element={<APMacroUnit1 />} />
            <Route path="/ap-macroeconomics/unit/1/quiz" element={<APMacroUnit1Quiz />} />
            <Route path="/ap-macroeconomics/unit/2" element={<APMacroUnit2 />} />
            <Route path="/ap-macroeconomics/unit/2/quiz" element={<APMacroUnit2Quiz />} />
            <Route path="/ap-macroeconomics/unit/3" element={<APMacroUnit3 />} />
            <Route path="/ap-macroeconomics/unit/3/quiz" element={<APMacroUnit3Quiz />} />
            <Route path="/ap-macroeconomics/unit/4" element={<APMacroUnit4 />} />
            <Route path="/ap-macroeconomics/unit/4/quiz" element={<APMacroUnit4Quiz />} />
            <Route path="/ap-macroeconomics/unit/5" element={<APMacroUnit5 />} />
            <Route path="/ap-macroeconomics/unit/5/quiz" element={<APMacroUnit5Quiz />} />
            <Route path="/ap-macroeconomics/unit/6" element={<APMacroUnit6 />} />
            <Route path="/ap-macroeconomics/unit/6/quiz" element={<APMacroUnit6Quiz />} />
            <Route path="/ap-macro-practice-exam/mcq" element={<APMacroPracticeExamMCQ />} />
            <Route path="/ap-macroeconomics-practice-exam/mcq/select" element={<APMacroeconomicsMCQOptions />} />
            <Route path="/ap-macroeconomics-practice-exam/mcq/2012" element={<APMacroPracticeExamMCQ2012 />} />
            <Route path="/ap-macroeconomics-practice-exam/mcq/princeton" element={<APMacroPracticeExamMCQPrinceton />} />
            <Route path="/ap-macroeconomics-practice-exam/mcq/2010" element={<APMacroPracticeExamMCQ2010 />} />
            <Route path="/ap-macro-practice-exam/long-frq" element={<APMacroPracticeExamLongFRQ />} />
            <Route path="/ap-macro-practice-exam/long-frq/:setId" element={<APMacroPracticeExamLongFRQExam />} />
            <Route path="/ap-macroeconomics-practice-exam/long-frq" element={<APMacroPracticeExamLongFRQ />} />
            <Route path="/ap-macroeconomics-practice-exam/long-frq/:setId" element={<APMacroPracticeExamLongFRQExam />} />
            <Route path="/ap-macro-short-frq-select" element={<APMacroShortFRQSelect />} />
            <Route path="/ap-macro-practice-exam/short-frq/:setId" element={<APMacroShortFRQSetSelect />} />
            <Route path="/ap-macro-practice-exam/short-frq/:setId/:questionId" element={<APMacroShortFRQ />} />
            <Route path="/ap-human-geography-study-guide" element={<APHumanGeographyStudyGuide />} />
            <Route path="/ap-human-geography/unit/1" element={<APHumanGeographyUnit1 />} />
            <Route path="/ap-human-geography/unit/1/quiz" element={<APHumanGeographyUnit1Quiz />} />
            <Route path="/ap-human-geography/unit/2" element={<APHumanGeographyUnit2 />} />
            <Route path="/ap-human-geography/unit/2/quiz" element={<APHumanGeographyUnit2Quiz />} />
            <Route path="/ap-human-geography/unit/3" element={<APHumanGeographyUnit3 />} />
            <Route path="/ap-human-geography/unit/3/quiz" element={<APHumanGeographyUnit3Quiz />} />
            <Route path="/ap-human-geography/unit/4" element={<APHumanGeographyUnit4 />} />
            <Route path="/ap-human-geography/unit/4/quiz" element={<APHumanGeographyUnit4Quiz />} />
            <Route path="/ap-human-geography/unit/5" element={<APHumanGeographyUnit5 />} />
            <Route path="/ap-human-geography/unit/5/quiz" element={<APHumanGeographyUnit5Quiz />} />
            <Route path="/ap-human-geography/unit/6" element={<APHumanGeographyUnit6 />} />
            <Route path="/ap-human-geography/unit/6/quiz" element={<APHumanGeographyUnit6Quiz />} />
            <Route path="/ap-human-geography/unit/7" element={<APHumanGeographyUnit7 />} />
            <Route path="/ap-human-geography/unit/7/quiz" element={<APHumanGeographyUnit7Quiz />} />
            <Route path="/ap-human-geography-practice-exam/mcq/select" element={<APHumanGeographyMCQSelect />} />
            <Route path="/ap-human-geography-practice-exam/mcq/2022" element={<APHumanGeographyPracticeExamMCQ2022 />} />
            <Route path="/ap-human-geography-practice-exam/mcq/princeton" element={<APHumanGeographyPracticeExamMCQPrinceton />} />
            <Route path="/ap-human-geography-practice-exam/concept-application" element={<APHumanGeographyConceptApplicationSelect />} />
            <Route path="/ap-human-geography-practice-exam/concept-application/set1" element={<APHumanGeographyConceptApplicationSet1 />} />
            <Route path="/ap-human-geography-practice-exam/concept-application/set2" element={<APHumanGeographyConceptApplicationSet2 />} />
            <Route path="/ap-human-geography-practice-exam/spatial-relationships" element={<APHumanGeographySpatialRelationshipsSelect />} />
            <Route path="/ap-human-geography-practice-exam/spatial-relationships/set1" element={<APHumanGeographySpatialRelationshipsSet1 />} />
            <Route path="/ap-human-geography-practice-exam/spatial-relationships/set2" element={<APHumanGeographySpatialRelationshipsSet2 />} />
            <Route path="/ap-human-geography-practice-exam/scale-analysis" element={<APHumanGeographyScaleAnalysisSelect />} />
            <Route path="/ap-human-geography-practice-exam/scale-analysis/set1" element={<APHumanGeographyScaleAnalysisSet1 />} />
            <Route path="/ap-human-geography-practice-exam/scale-analysis/set2" element={<APHumanGeographyScaleAnalysisSet2 />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections-debug" element={<CollectionsDebug />} />
            <Route path="/collections-test" element={<CollectionsTest />} />
            <Route path="/arena" element={<Arena />} />
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