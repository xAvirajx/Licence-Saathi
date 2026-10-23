import { useContext, useState } from 'react';
import { AppContext } from '../App';
import { signsData } from '../data/signs';
import { Volume2, RefreshCw, AlertTriangle, Info, Octagon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Learn() {
  const { lang } = useContext(AppContext);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Web Speech API
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'en' ? 'en-IN' : 'hi-IN';
    window.speechSynthesis.speak(utterance);
  };

  const nextCard = () => {
    setShowAnswer(false);
    setFlashcardIndex((prev) => (prev + 1) % signsData.length);
  };

  // Helper to draw SVG shapes based on sign type
  const renderSignShape = (type, icon) => {
    if (type === 'mandatory') {
      return (
        <div className="relative w-20 h-20 bg-white border-4 border-red-500 rounded-full flex items-center justify-center shadow-md">
          <span className="text-3xl">{icon}</span>
        </div>
      );
    }
    if (type === 'cautionary') {
      return (
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-md">
            <polygon points="50,10 90,85 10,85" fill="white" stroke="#ef4444" strokeWidth="6" strokeLinejoin="round" />
          </svg>
          <span className="text-3xl z-10 mt-3">{icon}</span>
        </div>
      );
    }
    return (
      <div className="relative w-20 h-20 bg-blue-600 border-2 border-white rounded-lg flex items-center justify-center shadow-md">
        <span className="text-3xl">{icon}</span>
      </div>
    );
  };

  const rules = [
    { en: "Keep Left: Always drive on the left side of the road.", hi: "बाईं ओर रहें: हमेशा सड़क के बाईं ओर ड्राइव करें।" },
    { en: "Overtake on the Right: Only pass other vehicles from their right side.", hi: "दाईं ओर से ओवरटेक करें: अन्य वाहनों को केवल उनके दाईं ओर से पार करें।" },
    { en: "Emergency Vehicles: Always give way to ambulances and fire engines.", hi: "आपातकालीन वाहन: एम्बुलेंस और दमकल गाड़ियों को हमेशा रास्ता दें।" },
    { en: "Pedestrian Crossings: Stop and give way to pedestrians at zebra crossings.", hi: "पैदल यात्री क्रॉसिंग: ज़ेबरा क्रॉसिंग पर रुकें और पैदल चलने वालों को रास्ता दें।" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-20">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">
        {lang === 'en' ? 'Learn Road Safety' : 'सड़क सुरक्षा सीखें'}
      </h1>

      {/* FLASHCARDS SECTION */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-slate-700 mb-4">
          {lang === 'en' ? 'Sign Flashcards' : 'संकेत फ्लैशकार्ड'}
        </h2>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 text-center flex flex-col items-center min-h-[300px] justify-center">
          <motion.div 
            key={flashcardIndex + (showAnswer ? 'a' : 'q')}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center w-full"
          >
            {renderSignShape(signsData[flashcardIndex].type, signsData[flashcardIndex].icon)}
            
            <div className="mt-8 h-20">
              {showAnswer ? (
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{signsData[flashcardIndex].name[lang]}</h3>
                  <p className="text-slate-600 text-sm">{signsData[flashcardIndex].desc[lang]}</p>
                </div>
              ) : (
                <div className="text-slate-400 font-medium italic mt-4">
                  {lang === 'en' ? 'Tap to reveal answer' : 'उत्तर देखने के लिए टैप करें'}
                </div>
              )}
            </div>
          </motion.div>

          <div className="flex gap-4 mt-8 w-full">
            <button 
              onClick={() => setShowAnswer(!showAnswer)}
              className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition"
            >
              {lang === 'en' ? 'Flip Card' : 'कार्ड पलटें'}
            </button>
            <button 
              onClick={nextCard}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              {lang === 'en' ? 'Next Sign' : 'अगला संकेत'} <RefreshCw size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* RULES OF THE ROAD SECTION */}
      <section>
        <h2 className="text-lg font-bold text-slate-700 mb-4">
          {lang === 'en' ? 'Rules of the Road' : 'सड़क के नियम'}
        </h2>
        <div className="space-y-4">
          {rules.map((rule, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0 mt-1">
                <Info size={20} />
              </div>
              <p className="text-slate-700 font-medium flex-1 text-sm leading-relaxed">
                {rule[lang]}
              </p>
              <button 
                onClick={() => speak(rule[lang])}
                aria-label="Listen"
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition shrink-0"
              >
                <Volume2 size={24} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}