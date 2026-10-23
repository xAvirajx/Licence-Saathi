import { useContext } from 'react';
import { AppContext } from '../App';
import { Settings as SettingsIcon, Type, Languages, Eye, Volume2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Settings() {
  const { 
    lang, setLang, 
    textSize, setTextSize, 
    highContrast, setHighContrast, 
    readAloud, setReadAloud 
  } = useContext(AppContext);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-6 flex flex-col font-sans overflow-hidden">
      {/* Mesh Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-2xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link to="/" className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center hover:bg-slate-800 transition">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <SettingsIcon className="text-blue-400" size={32} />
              {lang === 'en' ? 'App Settings' : 'ऐप सेटिंग्स'}
            </h1>
            <p className="text-slate-400 mt-1">
              {lang === 'en' ? 'Customize your experience.' : 'अपने अनुभव को अनुकूलित करें।'}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          
          {/* 1. Language Toggle */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center">
                <Languages size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{lang === 'en' ? 'Language' : 'भाषा'}</h3>
                <p className="text-sm text-slate-400">{lang === 'en' ? 'Choose your preferred language' : 'अपनी पसंदीदा भाषा चुनें'}</p>
              </div>
            </div>
            <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1">
              <button onClick={() => setLang('en')} className={`px-6 py-2 rounded-lg font-bold text-sm transition ${lang === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>English</button>
              <button onClick={() => setLang('hi')} className={`px-6 py-2 rounded-lg font-bold text-sm transition ${lang === 'hi' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>हिंदी</button>
            </div>
          </motion.div>

          {/* 2. Text Size Toggle */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center">
                <Type size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{lang === 'en' ? 'Text Size' : 'पाठ का आकार'}</h3>
                <p className="text-sm text-slate-400">{lang === 'en' ? 'Make text easier to read' : 'पाठ को पढ़ने में आसान बनाएं'}</p>
              </div>
            </div>
            <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1">
              <button onClick={() => setTextSize('normal')} className={`px-4 py-2 rounded-lg font-bold text-sm transition ${textSize === 'normal' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>{lang === 'en' ? 'Normal' : 'सामान्य'}</button>
              <button onClick={() => setTextSize('large')} className={`px-4 py-2 rounded-lg font-bold text-sm transition ${textSize === 'large' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>{lang === 'en' ? 'Large' : 'बड़ा'}</button>
              <button onClick={() => setTextSize('extra')} className={`px-4 py-2 rounded-lg font-bold text-sm transition ${textSize === 'extra' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>{lang === 'en' ? 'Extra' : 'विशाल'}</button>
            </div>
          </motion.div>

          {/* 3. High Contrast Toggle */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center">
                <Eye size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{lang === 'en' ? 'High Contrast' : 'उच्च कंट्रास्ट'}</h3>
                <p className="text-sm text-slate-400">{lang === 'en' ? 'Increase screen visibility' : 'स्क्रीन दृश्यता बढ़ाएं'}</p>
              </div>
            </div>
            <button 
              onClick={() => setHighContrast(!highContrast)}
              className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out shrink-0 ${highContrast ? 'bg-amber-500' : 'bg-slate-800'}`}
            >
              <motion.div layout className="w-6 h-6 bg-white rounded-full shadow-md" initial={false} animate={{ x: highContrast ? 24 : 0 }} />
            </button>
          </motion.div>

          {/* 4. Read Aloud Toggle */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center">
                <Volume2 size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{lang === 'en' ? 'Read Aloud' : 'जोर से पढ़ें'}</h3>
                <p className="text-sm text-slate-400">{lang === 'en' ? 'Enable voice assistance features' : 'वॉयस सहायता सुविधाएँ सक्षम करें'}</p>
              </div>
            </div>
            <button 
              onClick={() => setReadAloud(!readAloud)}
              className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out shrink-0 ${readAloud ? 'bg-purple-500' : 'bg-slate-800'}`}
            >
              <motion.div layout className="w-6 h-6 bg-white rounded-full shadow-md" initial={false} animate={{ x: readAloud ? 24 : 0 }} />
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}