import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Clock, AlertTriangle, BookOpen } from 'lucide-react';
import { questionsData } from '../data/questions';
import { signsData } from '../data/signs';
import { rulesConfig } from '../data/config';
import { motion, AnimatePresence } from 'framer-motion';

export default function MockTest() {
  const { t, lang } = useContext(AppContext);
  const [mode, setMode] = useState(null); // 'practice' or 'test'
  
  // Test State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(rulesConfig.testRules.timePerQuestionSeconds);
  const [testFinished, setTestFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  // Setup the test questions (shuffle in real app, take first N for now)
  const testQuestions = questionsData.slice(0, rulesConfig.testRules.totalQuestions);
  const currentQ = testQuestions[currentIndex];

  // Timer logic for Test Mode
  useEffect(() => {
    if (mode === 'test' && !testFinished && !showExplanation) {
      if (timeLeft === 0) {
        handleTimeout();
        return;
      }
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, mode, testFinished, showExplanation]);

  const handleTimeout = () => {
    setWrongAnswers(prev => [...prev, { q: currentQ, selected: null }]);
    handleNextQuestion();
  };

  const handleAnswerSelect = (index) => {
    if (showExplanation) return; // Prevent clicking again
    
    setSelectedAnswer(index);
    const isCorrect = index === currentQ.correctIndex;
    
    if (isCorrect) setScore(prev => prev + 1);
    else setWrongAnswers(prev => [...prev, { q: currentQ, selected: index }]);

    if (mode === 'practice') {
      setShowExplanation(true); // Show instant feedback
    } else {
      // In test mode, wait 1 second then move on automatically
      setTimeout(handleNextQuestion, 1000);
    }
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);
    setTimeLeft(rulesConfig.testRules.timePerQuestionSeconds);
    
    if (currentIndex + 1 < testQuestions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setTestFinished(true);
    }
  };

  // Helper to render SVG string safely
  const renderSign = (signId) => {
    const sign = signsData.find(s => s.id === signId);
    if (!sign) return null;
    return <div className="w-32 h-32 mx-auto mb-4" dangerouslySetInnerHTML={{ __html: sign.svg }} />;
  };

  // --- RENDERING VIEWS ---

  // View 1: Mode Selection
  if (!mode) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 mt-2">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/" className="p-2 bg-white rounded-full shadow-sm text-brand-600">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold">Mock Test</h1>
        </div>

        {/* The new "Study Traffic Signs" button! */}
        <Link to="/learn" className="w-full flex items-center justify-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 font-bold p-4 rounded-xl mb-4 hover:bg-brand-100 transition-colors">
          <BookOpen size={20} /> Study Traffic Signs First
        </Link>

        <div className="grid gap-4">
          <button onClick={() => setMode('practice')} className="bg-white p-6 rounded-2xl shadow-sm border-2 border-brand-200 hover:border-brand-500 text-left transition-all">
            <h2 className="text-lg font-bold text-brand-700 flex items-center gap-2 mb-2">
              <BookOpen size={20}/> Practice Mode
            </h2>
            <p className="text-sm text-gray-600">Take your time. Get instant feedback and explanations after every question.</p>
          </button>

          <button onClick={() => setMode('test')} className="bg-white p-6 rounded-2xl shadow-sm border-2 border-red-200 hover:border-red-500 text-left transition-all">
            <h2 className="text-lg font-bold text-red-700 flex items-center gap-2 mb-2">
              <AlertTriangle size={20}/> Real Test Mode
            </h2>
            <p className="text-sm text-gray-600">Simulates the real RTO test. {rulesConfig.testRules.timePerQuestionSeconds} seconds per question. Pass mark: {rulesConfig.testRules.passMark}/{rulesConfig.testRules.totalQuestions}.</p>
          </button>
        </div>
      </motion.div>
    );
  }

  // View 2: Test Results
  if (testFinished) {
    const passed = score >= rulesConfig.testRules.passMark;
    return (
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="space-y-6 mt-2 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {passed ? <CheckCircle size={40}/> : <XCircle size={40}/>}
          </div>
          <h1 className="text-3xl font-bold mb-2">{score} / {testQuestions.length}</h1>
          <h2 className={`text-xl font-bold mb-6 ${passed ? 'text-green-700' : 'text-red-700'}`}>
            {passed ? 'You Passed!' : 'You Failed'}
          </h2>
          <p className="text-gray-600 mb-6">
            You need {rulesConfig.testRules.passMark} to pass the real test.
          </p>
          <button onClick={() => window.location.reload()} className="w-full py-3 bg-brand-600 text-white font-bold rounded-xl shadow-sm">
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  // View 3: Active Question
  return (
    <motion.div key={currentIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
      {/* Header Area */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <span className="font-bold text-gray-500">Q {currentIndex + 1} / {testQuestions.length}</span>
        {mode === 'test' && (
          <div className={`flex items-center gap-1 font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-brand-600'}`}>
            <Clock size={16} /> {timeLeft}s
          </div>
        )}
      </div>

      {/* Question Area */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {currentQ.signId && renderSign(currentQ.signId)}
        <h2 className="text-lg font-bold text-gray-900 mb-6 leading-relaxed">
          {currentQ.question[lang]}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options[lang].map((opt, idx) => {
            let btnClass = "bg-gray-50 border-gray-200 text-gray-700 hover:bg-brand-50 hover:border-brand-300";
            
            // Visual feedback logic
            if (showExplanation || (mode === 'test' && selectedAnswer !== null)) {
              if (idx === currentQ.correctIndex) {
                btnClass = "bg-green-100 border-green-500 text-green-800 font-bold";
              } else if (idx === selectedAnswer) {
                btnClass = "bg-red-100 border-red-500 text-red-800 font-bold";
              } else {
                btnClass = "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
              }
            }

            return (
              <button 
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                disabled={showExplanation || (mode === 'test' && selectedAnswer !== null)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${btnClass}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Practice Mode Explanation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6">
              <div className={`p-4 rounded-xl text-sm font-medium ${selectedAnswer === currentQ.correctIndex ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {selectedAnswer === currentQ.correctIndex ? '✅ Correct!' : '❌ Incorrect.'} 
                <span className="block mt-2 font-normal text-gray-700">{currentQ.explanation[lang]}</span>
              </div>
              <button onClick={handleNextQuestion} className="w-full mt-4 py-3 bg-brand-600 text-white font-bold rounded-xl shadow-sm">
                Next Question
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}