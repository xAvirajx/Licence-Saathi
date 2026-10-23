import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { questions } from '../data/questions';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, AlertTriangle, Camera, MonitorSmartphone, 
  ArrowRight, Clock, UserSquare2, CheckCircle2, XCircle, RotateCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TestDay() {
  const { lang } = useContext(AppContext);
  const [mode, setMode] = useState('guide'); // 'guide' | 'simulator' | 'result'
  
  // Simulator State
  const [simQuestions, setSimQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (mode === 'simulator' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (mode === 'simulator' && timeLeft === 0) {
      handleNext();
    }
  }, [mode, timeLeft]);

  const startSimulator = () => {
    // Grab exactly 3 random questions for the run
    const shuffled = [...questions].sort(() => 0.5 - Math.random()).slice(0, 3);
    setSimQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setTimeLeft(30);
    setMode('simulator');
  };

  const handleNext = () => {
    if (selectedOption === simQuestions[currentIndex].correct) {
      setScore(prev => prev + 1);
    }
    
    if (currentIndex + 1 < 3) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setTimeLeft(30);
    } else {
      setMode('result');
    }
  };

  // --- 1. GUIDE MODE ---
  if (mode === 'guide') {
    return (
      <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-6 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl mb-6 shadow-lg">
              <MonitorSmartphone className="text-blue-400" size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              {lang === 'en' ? 'Test Day Guide' : 'टेस्ट डे गाइड'}
            </h1>
            <p className="text-slate-400">
              {lang === 'en' ? 'What to expect when taking the official online RTO Learner\'s Test.' : 'आधिकारिक ऑनलाइन आरटीओ लर्नर टेस्ट देते समय क्या अपेक्षा करें।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6">
              <Camera className="text-emerald-400 mb-4" size={28} />
              <h3 className="text-lg font-bold text-white mb-2">{lang === 'en' ? 'Face Authentication' : 'चेहरा प्रमाणीकरण'}</h3>
              <p className="text-sm text-slate-400">
                {lang === 'en' ? 'The system uses your webcam to verify your face against your Aadhaar photo. Ensure you are in a well-lit room.' : 'सिस्टम आपके आधार फोटो के साथ आपके चेहरे को सत्यापित करने के लिए वेबकैम का उपयोग करता है। सुनिश्चित करें कि आप अच्छी रोशनी वाले कमरे में हैं।'}
              </p>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6">
              <AlertTriangle className="text-amber-400 mb-4" size={28} />
              <h3 className="text-lg font-bold text-white mb-2">{lang === 'en' ? 'Strict Anti-Cheat' : 'सख्त एंटी-चीट'}</h3>
              <p className="text-sm text-slate-400">
                {lang === 'en' ? 'Do NOT switch tabs, minimize the window, or look away from the camera. The test will auto-terminate and you will fail.' : 'टैब स्विच न करें, विंडो को छोटा न करें, या कैमरे से दूर न देखें। टेस्ट स्वतः समाप्त हो जाएगा और आप फेल हो जाएंगे।'}
              </p>
            </div>
          </div>

          <div className="bg-blue-950/20 border border-blue-900/50 rounded-3xl p-8 text-center shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">
              {lang === 'en' ? 'Try the Real Layout' : 'असली लेआउट आज़माएं'}
            </h2>
            <p className="text-sm text-slate-400 mb-8 max-w-md mx-auto">
              {lang === 'en' ? 'We have recreated the exact layout of the government portal. Take a quick 3-question run to get comfortable with the interface.' : 'हमने सरकारी पोर्टल का सटीक लेआउट फिर से बनाया है। इंटरफ़ेस के साथ सहज होने के लिए 3-प्रश्नों का त्वरित टेस्ट लें।'}
            </p>
            <button 
              onClick={startSimulator}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            >
              <MonitorSmartphone size={20} /> {lang === 'en' ? 'Start Test Simulation' : 'टेस्ट सिमुलेशन शुरू करें'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. SIMULATOR MODE (Rigid, Official-looking Layout) ---
  if (mode === 'simulator') {
    const currentQ = simQuestions[currentIndex];
    
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans">
        
        {/* Fake Government Header */}
        <div className="bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-emerald-500" size={24} />
            <div>
              <div className="text-xs font-bold text-slate-400 tracking-wider">MINISTRY OF ROAD TRANSPORT</div>
              <div className="text-sm font-bold text-white">Learner's Licence Test (Simulated)</div>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-xs text-slate-400">Applicant: <span className="text-white">Ramesh Kumar</span></div>
            <div className="text-xs text-slate-400">App No: <span className="text-white">LL-948201</span></div>
          </div>
        </div>

        {/* Main Test Area */}
        <div className="flex-1 flex flex-col md:flex-row max-w-6xl mx-auto w-full p-4 gap-6">
          
          {/* Left: Question Area */}
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
              <span className="font-bold text-slate-300">Q {currentIndex + 1} / 3</span>
              <div className={`flex items-center gap-2 px-4 py-1 rounded-full font-bold text-sm ${timeLeft <= 10 ? 'bg-red-950 text-red-400 animate-pulse' : 'bg-blue-950/50 text-blue-400'}`}>
                <Clock size={16} /> Time Left: {timeLeft}s
              </div>
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold text-white mb-8">
              {currentQ.question[lang]}
            </h2>

            <div className="space-y-4 flex-1">
              {currentQ.options[lang].map((opt, idx) => (
                <label 
                  key={idx} 
                  className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                    selectedOption === idx 
                      ? 'bg-blue-600/20 border-blue-500' 
                      : 'bg-slate-950 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="simQuestion" 
                    checked={selectedOption === idx}
                    onChange={() => setSelectedOption(idx)}
                    className="mr-4 w-5 h-5 accent-blue-500"
                  />
                  <span className="text-slate-200 font-medium">{opt}</span>
                </label>
              ))}
            </div>

            <button 
              onClick={handleNext}
              disabled={selectedOption === null}
              className="mt-8 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 transition"
            >
              {currentIndex + 1 === 3 ? 'Submit Test' : 'Next Question'} <ArrowRight size={20} />
            </button>
          </div>

          {/* Right: Camera Feed & Status (Mimicking real test) */}
          <div className="w-full md:w-64 flex flex-col gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center aspect-video md:aspect-square relative overflow-hidden">
              <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/50 px-2 py-1 rounded text-[10px] text-white">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div> REC
              </div>
              <UserSquare2 className="text-slate-700 mb-2" size={48} />
              <span className="text-xs text-slate-500 font-medium tracking-widest uppercase">Live Feed</span>
            </div>
            
            <div className="bg-amber-950/20 border border-amber-900/50 rounded-xl p-4 text-xs text-amber-200/70">
              <AlertTriangle className="text-amber-500 mb-2" size={16} />
              <strong>Warning:</strong> System is monitoring eye movement and tab switches. Do not look away from screen.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 3. RESULT MODE ---
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 text-center shadow-2xl">
        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${score >= 2 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
          {score >= 2 ? <CheckCircle2 size={40} /> : <XCircle size={40} />}
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          {score >= 2 ? 'Simulation Passed!' : 'Simulation Failed'}
        </h2>
        <p className="text-slate-400 mb-8">
          You scored {score} out of 3 in the simulated environment.
        </p>
        
        <div className="flex flex-col gap-4">
          <button onClick={() => setMode('guide')} className="w-full bg-slate-800 hover:bg-slate-700 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 transition">
            <RotateCcw size={20} /> {lang === 'en' ? 'Try Again' : 'पुनः प्रयास करें'}
          </button>
          <Link to="/" className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl font-bold transition">
            {lang === 'en' ? 'Back to Home' : 'होम पर वापस जाएं'}
          </Link>
        </div>
      </div>
    </div>
  );
}