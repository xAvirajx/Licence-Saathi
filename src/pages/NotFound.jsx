import { useContext } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  const { lang } = useContext(AppContext);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 py-16 px-6 flex flex-col items-center justify-center font-sans overflow-hidden text-center">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10 flex flex-col items-center">
        {/* Warning Symbol Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-24 h-24 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center mb-6 shadow-2xl text-amber-400"
        >
          <AlertTriangle size={48} />
        </motion.div>

        {/* 404 Badge */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-5xl font-extrabold text-blue-500 mb-2 tracking-wider"
        >
          404
        </motion.span>

        {/* Localized Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl font-extrabold text-white mb-3"
        >
          {lang === 'en' && 'Dead End Ahead!'}
          {lang === 'hi' && 'आगे रास्ता बंद है!'}
          {lang === 'gu' && 'આગળ રસ્તો બંધ છે!'}
        </motion.h1>

        {/* Localized Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base mb-8 leading-relaxed"
        >
          {lang === 'en' && "The turn or page you took does not exist or has taken a detour."}
          {lang === 'hi' && 'आप जिस मोड़ या पृष्ठ पर पहुंचे हैं वह मौजूद नहीं है या उसका रास्ता बदल दिया गया है।'}
          {lang === 'gu' && 'તમે જે વળાંક કે પેજ પર ગયા છો તે અસ્તિત્વમાં નથી અથવા રસ્તો બદલાઈ ગયો છે.'}
        </motion.p>

        {/* Navigation Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 w-full justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-lg shadow-blue-900/40 text-sm sm:text-base"
          >
            <Home size={18} />
            {lang === 'en' && 'Back to Safe Route (Home)'}
            {lang === 'hi' && 'सुरक्षित मार्ग पर लौटें (होम)'}
            {lang === 'gu' && 'મુખ્ય રસ્તા પર પાછા જાઓ (હોમ)'}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}