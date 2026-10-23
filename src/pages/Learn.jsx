import { useContext } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import { ArrowLeft, Volume2, Info } from 'lucide-react';
import { signsData } from '../data/signs';
import { motion } from 'framer-motion';

export default function Learn() {
  const { lang } = useContext(AppContext);

  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech not supported in this browser.");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 mt-2">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/mock-test" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 text-brand-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Learn Traffic Signs</h1>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex gap-3 text-blue-800 text-sm mb-6">
        <Info size={20} className="shrink-0 mt-0.5" />
        <p>Tap the Listen button to hear the sign name aloud. This helps with memorization!</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {signsData.map((sign) => (
          <div key={sign.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-between transition-all hover:shadow-md">
            <div className="w-20 h-20 mb-3" dangerouslySetInnerHTML={{ __html: sign.svg }} />
            <p className="font-bold text-sm text-gray-800 mb-3 h-10 flex items-center justify-center">{sign.title[lang]}</p>
            <button 
              onClick={() => playAudio(sign.title[lang])}
              className="w-full py-2 bg-brand-50 text-brand-700 rounded-lg text-sm font-bold hover:bg-brand-100 flex items-center justify-center gap-2 transition-colors"
            >
              <Volume2 size={16} /> Listen
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}