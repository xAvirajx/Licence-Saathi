import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { questions } from '../data/questions';
import { CheckCircle2, XCircle, RefreshCw, ArrowRight, ShieldAlert } from 'lucide-react';

const TOTAL_QUESTIONS = 15;
const PASSING_SCORE = 9;

export default function MockTest() {
  const { lang } = useContext(AppContext);
  const [testQuestions, setTestQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Initialize test with 15 random questions
  const startNewTest = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setTestQuestions(shuffled.slice(0, TOTAL_QUESTIONS));
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  useEffect(() => {
    startNewTest();
  }, []);

  const handleAnswer = (index) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === testQuestions[currentIndex].correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < TOTAL_QUESTIONS) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  if (testQuestions.length === 0) return <div>Loading...</div>;

  const currentQ = testQuestions[currentIndex];
  const passed = score >= PASSING_SCORE;

  return (
    <div className="max-w-2xl mx-auto p-4 py-8">
      {!showResult ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6 text-sm font-semibold text-slate-500">
            <span>{lang === 'en' ? 'Question' : 'प्रश्न'} {currentIndex + 1} / {TOTAL_QUESTIONS}</span>
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
              {lang === 'en' ? 'Target: 9 to Pass' : 'लक्ष्य: पास होने के लिए 9'}
            </span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-6">
            {currentQ.question[lang]}
          </h2>

          <div className="space-y-3 mb-8">
            {currentQ.options[lang].map((opt, idx) => {
              let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all ";
              if (selectedOption === null) {
                btnClass += "border-slate-100 hover:border-blue-500 hover:bg-blue-50";
              } else if (idx === currentQ.correct) {
                btnClass += "border-emerald-500 bg-emerald-50 text-emerald-900";
              } else if (idx === selectedOption) {
                btnClass += "border-red-500 bg-red-50 text-red-900";
              } else {
                btnClass += "border-slate-100 opacity-50";
              }

              return (
                <button key={idx} onClick={() => handleAnswer(idx)} className={btnClass} disabled={selectedOption !== null}>
                  {opt}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <button onClick={nextQuestion} className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 flex items-center justify-center gap-2">
              {currentIndex + 1 === TOTAL_QUESTIONS ? (lang === 'en' ? 'Finish Test' : 'टेस्ट समाप्त करें') : (lang === 'en' ? 'Next Question' : 'अगला प्रश्न')} <ArrowRight size={20} />
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 text-center">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${passed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
            {passed ? <CheckCircle2 size={48} /> : <ShieldAlert size={48} />}
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {passed ? (lang === 'en' ? 'Test Passed!' : 'टेस्ट पास!') : (lang === 'en' ? 'Test Failed' : 'टेस्ट फेल')}
          </h2>
          <p className="text-slate-600 text-lg mb-8">
            {lang === 'en' ? `You scored ${score} out of ${TOTAL_QUESTIONS}.` : `आपने ${TOTAL_QUESTIONS} में से ${score} अंक प्राप्त किए।`}
            <br />
            <span className="text-sm font-semibold">({lang === 'en' ? '9 correct answers required' : '9 सही उत्तर आवश्यक हैं'})</span>
          </p>

          <button onClick={startNewTest} className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 flex items-center justify-center gap-2">
            <RefreshCw size={20} /> {lang === 'en' ? 'Try Again' : 'पुनः प्रयास करें'}
          </button>
        </div>
      )}
    </div>
  );
}