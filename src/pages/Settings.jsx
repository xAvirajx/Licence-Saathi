import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import { Settings as SettingsIcon, Type, Languages, Eye, Volume2, ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Settings() {
  const { 
    lang, setLang, 
    textSize, setTextSize, 
    highContrast, setHighContrast, 
    readAloud, setReadAloud 
  } = useContext(AppContext);

  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  // PWA Install Prompt Listener
  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Check if app is already installed and running in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result.outcome === 'accepted') {
      setInstallPrompt(null);
      setIsInstalled(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-6 flex flex-col font-sans overflow-hidden">
      
      {/* Background Gradient */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-2xl mx-auto w-full relative z-10">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-10">
          <Link to="/" className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center hover:bg-slate-800 transition">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <SettingsIcon className="text-blue-400" size={32} />
              {lang === 'en' && 'App Settings'}
              {lang === 'hi' && 'ऐप सेटिंग्स'}
              {lang === 'gu' && 'એપ સેટિંગ્સ'}
            </h1>
            <p className="text-slate-400 mt-1">
              {lang === 'en' && 'Customize your experience and offline options.'}
              {lang === 'hi' && 'अपने अनुभव और ऑफ़लाइन विकल्पों को अनुकूलित करें।'}
              {lang === 'gu' && 'તમારો અનુભવ અને ઓફલાઇન વિકલ્પો કસ્ટમાઇઝ કરો.'}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          
          {/* 1. PWA Install App Box (Conditionally Displayed) */}
          {(installPrompt || isInstalled) && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-blue-950/40 border border-blue-900/60 rounded-3xl p-6 shadow-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center shrink-0">
                  <Download size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {lang === 'en' && 'Install App'}
                    {lang === 'hi' && 'ऐप इंस्टॉल करें'}
                    {lang === 'gu' && 'એપ ઇન્સ્ટોલ કરો'}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {isInstalled && lang === 'en' && 'App is installed on your device.'}
                    {isInstalled && lang === 'hi' && 'ऐप आपके डिवाइस पर इंस्टॉल है।'}
                    {isInstalled && lang === 'gu' && 'એપ તમારા ઉપકરણ પર ઇન્સ્ટોલ કરેલી છે.'}
                    
                    {!isInstalled && lang === 'en' && 'Install Licence Saathi for fast offline access.'}
                    {!isInstalled && lang === 'hi' && 'तेज़ ऑफ़लाइन एक्सेस के लिए लाइसेंस साथी इंस्टॉल करें।'}
                    {!isInstalled && lang === 'gu' && 'ઝડપી ઓફલાઇન ઉપયોગ માટે લાઇસન્સ સાથી ઇન્સ્ટોલ કરો.'}
                  </p>
                </div>
              </div>
              
              {!isInstalled && installPrompt && (
                <button 
                  onClick={handleInstallClick}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-3 rounded-xl transition shadow-lg shrink-0"
                >
                  {lang === 'en' && 'Install'}
                  {lang === 'hi' && 'इंस्टॉल'}
                  {lang === 'gu' && 'ઇન્સ્ટોલ'}
                </button>
              )}
            </motion.div>
          )}

          {/* 2. Language Toggle Box */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center shrink-0">
                <Languages size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {lang === 'en' && 'Language'}
                  {lang === 'hi' && 'भाषा'}
                  {lang === 'gu' && 'ભાષા'}
                </h3>
                <p className="text-sm text-slate-400">
                  {lang === 'en' && 'Choose preferred language'}
                  {lang === 'hi' && 'पसंदीदा भाषा चुनें'}
                  {lang === 'gu' && 'પસંદગીની ભાષા પસંદ કરો'}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 bg-slate-950 border border-slate-800 rounded-xl p-1 gap-1 w-full md:w-auto">
              <button onClick={() => setLang('en')} className={`py-2 px-3 rounded-lg font-bold text-xs sm:text-sm transition text-center ${lang === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                English
              </button>
              <button onClick={() => setLang('hi')} className={`py-2 px-3 rounded-lg font-bold text-xs sm:text-sm transition text-center ${lang === 'hi' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                हिंदी
              </button>
              <button onClick={() => setLang('gu')} className={`py-2 px-3 rounded-lg font-bold text-xs sm:text-sm transition text-center ${lang === 'gu' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                ગુજરાતી
              </button>
            </div>
          </motion.div>

          {/* 3. Text Size Toggle Box */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center shrink-0">
                <Type size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {lang === 'en' && 'Text Size'}
                  {lang === 'hi' && 'पाठ का आकार'}
                  {lang === 'gu' && 'ટેક્સ્ટ સાઈઝ'}
                </h3>
                <p className="text-sm text-slate-400">
                  {lang === 'en' && 'Make text easier to read'}
                  {lang === 'hi' && 'पाठ को पढ़ने में आसान बनाएं'}
                  {lang === 'gu' && 'વાંચવામાં સરળતા માટે'}
                </p>
              </div>
            </div>
            
            <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1">
              <button onClick={() => setTextSize('normal')} className={`px-4 py-2 rounded-lg font-bold text-sm transition ${textSize === 'normal' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                {lang === 'en' && 'Normal'}
                {lang === 'hi' && 'सामान्य'}
                {lang === 'gu' && 'સામાન્ય'}
              </button>
              <button onClick={() => setTextSize('large')} className={`px-4 py-2 rounded-lg font-bold text-sm transition ${textSize === 'large' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                {lang === 'en' && 'Large'}
                {lang === 'hi' && 'बड़ा'}
                {lang === 'gu' && 'મોટું'}
              </button>
              <button onClick={() => setTextSize('extra')} className={`px-4 py-2 rounded-lg font-bold text-sm transition ${textSize === 'extra' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                {lang === 'en' && 'Extra'}
                {lang === 'hi' && 'विशाल'}
                {lang === 'gu' && 'વિશાળ'}
              </button>
            </div>
          </motion.div>

          {/* 4. High Contrast Toggle Box */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center shrink-0">
                <Eye size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {lang === 'en' && 'High Contrast'}
                  {lang === 'hi' && 'उच्च कंट्रास्ट'}
                  {lang === 'gu' && 'હાઈ કોન્ટ્રાસ્ટ'}
                </h3>
                <p className="text-sm text-slate-400">
                  {lang === 'en' && 'Increase screen visibility'}
                  {lang === 'hi' && 'स्क्रीन दृश्यता बढ़ाएं'}
                  {lang === 'gu' && 'દેખાવ સ્પષ્ટ કરો'}
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setHighContrast(!highContrast)}
              className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out shrink-0 ${highContrast ? 'bg-amber-500' : 'bg-slate-800'}`}
            >
              <motion.div 
                layout 
                className="w-6 h-6 bg-white rounded-full shadow-md" 
                initial={false} 
                animate={{ x: highContrast ? 24 : 0 }} 
              />
            </button>
          </motion.div>

          {/* 5. Read Aloud Toggle Box */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center shrink-0">
                <Volume2 size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {lang === 'en' && 'Read Aloud'}
                  {lang === 'hi' && 'जोर से पढ़ें'}
                  {lang === 'gu' && 'મોટેથી વાંચો'}
                </h3>
                <p className="text-sm text-slate-400">
                  {lang === 'en' && 'Enable voice assistance features'}
                  {lang === 'hi' && 'वॉयस सहायता सुविधाएँ सक्षम करें'}
                  {lang === 'gu' && 'અવાજ સહાયતા ચાલુ કરો'}
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setReadAloud(!readAloud)}
              className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out shrink-0 ${readAloud ? 'bg-purple-500' : 'bg-slate-800'}`}
            >
              <motion.div 
                layout 
                className="w-6 h-6 bg-white rounded-full shadow-md" 
                initial={false} 
                animate={{ x: readAloud ? 24 : 0 }} 
              />
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}