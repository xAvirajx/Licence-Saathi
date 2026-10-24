import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { questions } from '../data/questions';
import { rulesConfig } from '../data/config';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, XCircle, AlertTriangle, Clock, 
  RotateCcw, ArrowRight, Play, BookOpen, ChevronRight, Activity, Share2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MockTest() {
  const { lang } = useContext(AppContext);
  const [mode, setMode] = useState(null); // 'practice' | 'test' | 'result'
  
  const [testQuestions, setTestQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);

  // History for Readiness Meter
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('mockTestHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const TOTAL_Q = rulesConfig?.testRules?.totalQuestions || 15;
  const PASS_MARK = rulesConfig?.testRules?.passMark || 9;
  const TIME_PER_Q = rulesConfig?.testRules?.timePerQuestionSeconds || 30;

  // Calculate Readiness (Average of last 3 attempts)
  const recentScores = history.slice(-3);
  const avgScore = recentScores.length > 0
    ? recentScores.reduce((acc, curr) => acc + curr, 0) / recentScores.length
    : 0;
  const readinessPercent = (avgScore / TOTAL_Q) * 100;

  useEffect(() => {
    // Timer logic for TEST mode
    if (mode === 'test' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (mode === 'test' && timeLeft === 0) {
      handleNext(); // Auto-skip when time runs out
    }
  }, [mode, timeLeft]);

  const startSession = (selectedMode) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random()).slice(0, TOTAL_Q);
    setTestQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setTimeLeft(TIME_PER_Q);
    setMode(selectedMode);
  };

  const handleAnswer = (index) => {
    if (selectedOption !== null && mode === 'practice') return;
    setSelectedOption(index);

    if (mode === 'test') {
      const newUserAnswers = [...userAnswers];
      newUserAnswers[currentIndex] = index;
      setUserAnswers(newUserAnswers);
      setTimeout(() => handleNext(newUserAnswers), 300);
    } else {
      const newUserAnswers = [...userAnswers];
      newUserAnswers[currentIndex] = index;
      setUserAnswers(newUserAnswers);
    }
  };

  const handleNext = (currentAnswers = userAnswers) => {
    if (currentIndex + 1 < TOTAL_Q) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setTimeLeft(TIME_PER_Q);
    } else {
      finishTest(currentAnswers);
    }
  };

  const finishTest = (finalAnswers) => {
    const score = finalAnswers.reduce((acc, ans, idx) => {
      return ans === testQuestions[idx].correct ? acc + 1 : acc;
    }, 0);

    if (mode === 'test') {
      const newHistory = [...history, score];
      setHistory(newHistory);
      localStorage.setItem('mockTestHistory', JSON.stringify(newHistory));
      localStorage.setItem('licenceJourneyStage', '3'); // Advance Journey Map
    }

    setMode('result');
  };

  // Helper for localized questions
  const getLocalizedQ = (q) => {
    const questionText = q.question[lang] || q.question.en;
    const options = q.options[lang] || q.options.en;
    const explanation = q.explanation ? (q.explanation[lang] || q.explanation.en) : null;
    return { questionText, options, explanation };
  };

  // --- START SCREEN ---
  if (!mode) {
    return (
      <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-6 flex flex-col items-center justify-center">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-xl w-full relative z-10 text-center">
          <div className="w-20 h-20 bg-slate-900 border border-slate-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Activity className="text-blue-400" size={40} />
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            {lang === 'en' ? 'Mock Test Engine' : lang === 'hi' ? 'मॉक टेस्ट इंजन' : 'મોક ટેસ્ટ એન્જિન'}
          </h1>

          {/* READINESS METER */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 mb-8 shadow-2xl">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
              {lang === 'en' ? 'Exam Readiness' : lang === 'hi' ? 'परीक्षा की तैयारी' : 'પરીક્ષાની તૈયારી'}
            </h2>
            <div className="flex items-end justify-center gap-2 mb-4">
              <span className={`text-5xl font-extrabold ${readinessPercent >= 60 ? 'text-emerald-400' : readinessPercent > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                {Math.round(readinessPercent)}%
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${readinessPercent >= 60 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                initial={{ width: 0 }}
                animate={{ width: `${readinessPercent}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <p className="text-sm text-slate-400 mt-4">
              {lang === 'en' 
                ? 'Based on your last 3 test attempts.' 
                : lang === 'hi' 
                ? 'आपके पिछले 3 टेस्ट प्रयासों के आधार पर।' 
                : 'તમારા છેલ્લા 3 ટેસ્ટ પ્રયાસોના આધારે.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => startSession('practice')}
              className="bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white p-6 rounded-2xl flex flex-col items-center gap-3 transition"
            >
              <BookOpen className="text-emerald-400" size={32} />
              <span className="font-bold text-lg">{lang === 'en' ? 'Practice Mode' : lang === 'hi' ? 'अभ्यास मोड' : 'પ્રેક્ટિસ મોડ'}</span>
              <span className="text-xs text-slate-400">{lang === 'en' ? 'Instant answers & explanations' : lang === 'hi' ? 'त्वरित उत्तर और स्पष्टीकरण' : 'ત્વરિત જવાબો અને સમજૂતી'}</span>
            </button>

            <button
              onClick={() => startSession('test')}
              className="bg-blue-600 hover:bg-blue-500 text-white p-6 rounded-2xl flex flex-col items-center gap-3 transition shadow-lg shadow-blue-600/30"
            >
              <Clock className="text-white" size={32} />
              <span className="font-bold text-lg">{lang === 'en' ? 'Real Test Mode' : lang === 'hi' ? 'असली टेस्ट मोड' : 'અસલી ટેસ્ટ મોડ'}</span>
              <span className="text-xs text-blue-200">{lang === 'en' ? 'Strict 30s timer, no hints' : lang === 'hi' ? 'सख्त 30s टाइमर, कोई संकेत नहीं' : 'સખત 30s ટાઈમર, સંકેત વિના'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RESULT SCREEN ---
  if (mode === 'result') {
    const score = userAnswers.reduce((acc, ans, idx) => ans === testQuestions[idx].correct ? acc + 1 : acc, 0);
    const passed = score >= PASS_MARK;

    // Localized WhatsApp Share text
    const shareMessage = 
      lang === 'gu'
        ? `🚗 મેં લાઇસન્સ સાથી RTO મોક ટેસ્ટમાં ${TOTAL_Q} માંથી ${score} ગુણ મેળવ્યા! તમારી તૈયારી અહીં ચકાસો: https://licence-saathi-v2.onrender.com/mock-test`
        : lang === 'hi'
        ? `🚗 मैंने लाइसेंस साथी आरटीओ मॉक टेस्ट में ${TOTAL_Q} में से ${score} अंक प्राप्त किए! अपनी तैयारी यहाँ जांचें: https://licence-saathi-v2.onrender.com/mock-test`
        : `🚗 I scored ${score}/${TOTAL_Q} on the Licence Saathi RTO Mock Test! Test your driving licence knowledge here: https://licence-saathi-v2.onrender.com/mock-test`;

    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

    return (
      <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-6">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className={`p-8 rounded-3xl text-center mb-8 border ${passed ? 'bg-emerald-950/30 border-emerald-900' : 'bg-red-950/30 border-red-900'}`}>
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
              {passed ? <CheckCircle2 size={48} /> : <XCircle size={48} />}
            </div>

            <h1 className="text-4xl font-extrabold text-white mb-2">
              {passed 
                ? (lang === 'en' ? 'Test Passed!' : lang === 'hi' ? 'टेस्ट पास!' : 'ટેસ્ટ પાસ!') 
                : (lang === 'en' ? 'Test Failed' : lang === 'hi' ? 'टेस्ट फेल' : 'ટેસ્ટ ફેઇલ')}
            </h1>

            <p className="text-xl text-slate-300 mb-6">
              {lang === 'en' && `You scored ${score} out of ${TOTAL_Q}`}
              {lang === 'hi' && `आपने ${TOTAL_Q} में से ${score} अंक प्राप्त किए`}
              {lang === 'gu' && `તમે ${TOTAL_Q} માંથી ${score} ગુણ મેળવ્યા`}
            </p>

            {/* ACTION & WHATSAPP BUTTONS */}
            <div className="flex flex-wrap gap-3 justify-center mb-2">
              <button
                onClick={() => setMode(null)}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold transition text-sm"
              >
                {lang === 'en' ? 'Back to Menu' : lang === 'hi' ? 'मेनू पर वापस जाएं' : 'મેનૂ પર પાછા જાઓ'}
              </button>

              {/* WhatsApp One-Click Share Button */}
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold px-6 py-3 rounded-full transition shadow-lg shadow-emerald-950/40 text-sm"
              >
                <Share2 size={16} />
                {lang === 'en' ? 'Share Score on WhatsApp' : lang === 'hi' ? 'व्हाट्सएप पर स्कोर शेयर करें' : 'વોટ્સએપ પર સ્કોર શેર કરો'}
              </a>

              {passed && (
                <Link
                  to="/permanent-licence"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition text-sm flex items-center gap-1.5"
                >
                  {lang === 'en' ? 'Next Step' : lang === 'hi' ? 'अगला कदम' : 'આગળનું પગલું'}
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">
            {lang === 'en' ? 'Review Answers' : lang === 'hi' ? 'उत्तरों की समीक्षा करें' : 'જવાબોની સમીક્ષા કરો'}
          </h2>

          <div className="space-y-4">
            {testQuestions.map((q, idx) => {
              const uAns = userAnswers[idx];
              const isCorrect = uAns === q.correct;
              const { questionText, options, explanation } = getLocalizedQ(q);

              return (
                <div key={idx} className={`p-6 rounded-2xl border ${isCorrect ? 'bg-emerald-950/10 border-emerald-900/30' : 'bg-red-950/10 border-red-900/30'}`}>
                  <div className="flex gap-3 items-start mb-4">
                    {isCorrect ? (
                      <CheckCircle2 className="text-emerald-500 mt-1 shrink-0" size={20} />
                    ) : (
                      <XCircle className="text-red-500 mt-1 shrink-0" size={20} />
                    )}
                    <h3 className="text-lg font-bold text-white">{idx + 1}. {questionText}</h3>
                  </div>

                  <div className="ml-8 space-y-2">
                    <p className="text-sm text-slate-400">
                      <span className="text-slate-500">
                        {lang === 'en' ? 'Your Answer: ' : lang === 'hi' ? 'आपका उत्तर: ' : 'તમારો જવાબ: '}
                      </span>
                      <span className={isCorrect ? 'text-emerald-400 font-medium' : 'text-red-400 line-through font-medium'}>
                        {uAns !== undefined && uAns !== null ? options[uAns] : (lang === 'en' ? 'Time out' : 'समय समाप्त')}
                      </span>
                    </p>

                    {!isCorrect && (
                      <p className="text-sm text-emerald-400 font-semibold">
                        <span className="text-slate-500">
                          {lang === 'en' ? 'Correct: ' : lang === 'hi' ? 'सही: ' : 'સાચો જવાબ: '}
                        </span>
                        {options[q.correct]}
                      </p>
                    )}

                    {explanation && (
                      <p className="text-sm text-blue-300 mt-3 p-3 bg-blue-950/30 rounded-lg border border-blue-900/30">
                        {explanation}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // --- QUESTION SCREEN ---
  const currentQ = testQuestions[currentIndex];
  const { questionText, options, explanation } = getLocalizedQ(currentQ);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-4 md:px-6">
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-sm font-bold text-slate-300">
            {lang === 'en' ? 'Question' : lang === 'hi' ? 'प्रश्न' : 'પ્રશ્ન'} {currentIndex + 1} / {TOTAL_Q}
          </div>

          {mode === 'test' && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${timeLeft <= 10 ? 'bg-red-950 border-red-900 text-red-400 animate-pulse' : 'bg-slate-900 border-slate-800 text-blue-400'}`}>
              <Clock size={16} /> 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </div>
          )}

          {mode === 'practice' && (
            <div className="bg-emerald-950 border border-emerald-900 px-4 py-2 rounded-full text-sm font-bold text-emerald-400 flex items-center gap-2">
              <BookOpen size={16} /> Practice
            </div>
          )}
        </div>

        {/* Question Card */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
            {questionText}
          </h2>

          <div className="space-y-3">
            {options.map((opt, idx) => {
              let btnClass = "w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 font-medium ";

              if (selectedOption === null) {
                btnClass += "bg-slate-950 border-slate-800 hover:border-blue-500 hover:bg-slate-900 text-slate-300";
              } else if (mode === 'practice') {
                if (idx === currentQ.correct) {
                  btnClass += "bg-emerald-950 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                } else if (idx === selectedOption) {
                  btnClass += "bg-red-950 border-red-500 text-red-400 opacity-70";
                } else {
                  btnClass += "bg-slate-950 border-slate-800 text-slate-600 opacity-40";
                }
              } else if (mode === 'test') {
                if (idx === selectedOption) {
                  btnClass += "bg-blue-900/50 border-blue-500 text-blue-400";
                } else {
                  btnClass += "bg-slate-950 border-slate-800 text-slate-600 opacity-40";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={btnClass}
                  disabled={selectedOption !== null && mode === 'practice'}
                >
                  <div className="flex justify-between items-center">
                    <span>{opt}</span>
                    {mode === 'practice' && selectedOption !== null && idx === currentQ.correct && <CheckCircle2 size={20} />}
                    {mode === 'practice' && selectedOption === idx && idx !== currentQ.correct && <XCircle size={20} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Practice Mode Explanation & Next Button */}
          <AnimatePresence>
            {mode === 'practice' && selectedOption !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                className="mt-8"
              >
                {explanation && (
                  <div className="p-4 bg-blue-950/30 border border-blue-900/50 rounded-xl mb-6">
                    <p className="text-sm text-blue-200">
                      <strong className="text-blue-400">Why?</strong> {explanation}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => handleNext()}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/30"
                >
                  {currentIndex + 1 === TOTAL_Q 
                    ? (lang === 'en' ? 'Finish Practice' : lang === 'hi' ? 'अभ्यास समाप्त करें' : 'પ્રેક્ટિસ પૂર્ણ કરો') 
                    : (lang === 'en' ? 'Next Question' : lang === 'hi' ? 'अगला प्रश्न' : 'આગળનો પ્રશ્ન')}
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}