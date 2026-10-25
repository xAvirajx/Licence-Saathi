import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import { Settings as SettingsIcon, Type, Languages, Eye, Volume2, ArrowLeft, Download, Trash2, CheckCircle2, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getAnalyticsSummary, clearAnalytics } from '../utils/analytics';

export default function Settings() {
  const {
    lang, setLang,
    textSize, setTextSize,
    highContrast, setHighContrast,
    readAloud, setReadAloud
  } = useContext(AppContext);

  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [analytics, setAnalytics] = useState({ totalViews: 0, totalEvents: 0, topPages: [] });

  useEffect(() => {
    setAnalytics(getAnalyticsSummary());

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

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

  const handleClearData = () => {
    // Clear all persistent user state & analytics
    localStorage.removeItem('licenceJourneyStage');
    localStorage.removeItem('mockTestHistory');
    localStorage.removeItem('ls_doc_checks');
    clearAnalytics();
    
    setShowResetConfirm(false);
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
      window.location.href = '/';
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-6 flex flex-col font-sans overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-2xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link to="/" aria-label="Go Home" className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition">
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
              {lang === 'en' && 'Customize your experience, offline options, and data.'}
              {lang === 'hi' && 'अपने अनुभव, ऑफ़लाइन विकल्पों और डेटा को अनुकूलित करें।'}
              {lang === 'gu' && 'તમારો અનુભવ, ઓફલાઇન વિકલ્પો અને ડેટા કસ્ટમાઇઝ કરો.'}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* 1. PWA Install Button */}
          {(installPrompt || isInstalled) && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-blue-950/40 border border-blue-800/60 rounded-3xl p-6 shadow-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center shrink-0">
                  <Download size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {lang === 'en' && 'Install App'}
                    {lang === 'hi' && 'ऐप इंस्टॉल करें'}
                    {lang === 'gu' && 'એપ ઇન્સ્ટોલ કરો'}
                  </h2>
                  <p className="text-sm text-slate-300">
                    {isInstalled && lang === 'en' && 'App is installed on your device.'}
                    {isInstalled && lang === 'hi' && 'ऐप आपके डिवाइस पर इंस्टॉल है।'}
                    {isInstalled && lang === 'gu' && 'એપ તમારા ઉપકરણ પર ઇન્સ્ટોલ કરેલી છે.'}
                    {!isInstalled && lang === 'en' && 'Install License Saathi for fast offline access.'}
                    {!isInstalled && lang === 'hi' && 'तेज़ ऑफ़लाइन एक्सेस के लिए लाइसेंस साथी इंस्टॉल करें।'}
                    {!isInstalled && lang === 'gu' && 'ઝડપી ઓફલાઇન ઉપયોગ માટે લાઇસન્સ સાથી ઇન્સ્ટોલ કરો.'}
                  </p>
                </div>
              </div>
              {!isInstalled && installPrompt && (
                <button
                  onClick={handleInstallClick}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-3 rounded-xl transition shadow-lg shrink-0 ml-4"
                >
                  {lang === 'en' && 'Install'}
                  {lang === 'hi' && 'इंस्टॉल'}
                  {lang === 'gu' && 'ઇન્સ્ટોલ'}
                </button>
              )}
            </motion.div>
          )}

          {/* 2. Language Picker */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center shrink-0">
                <Languages size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {lang === 'en' && 'Language'}
                  {lang === 'hi' && 'भाषा'}
                  {lang === 'gu' && 'ભાષા'}
                </h2>
                <p className="text-sm text-slate-400">
                  {lang === 'en' && 'Choose preferred language'}
                  {lang === 'hi' && 'पसंदीदा भाषा चुनें'}
                  {lang === 'gu' && 'પસંદગીની ભાષા પસંદ કરો'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 bg-slate-950 border border-slate-800 rounded-xl p-1 gap-1 w-full sm:w-auto">
              <button
                onClick={() => setLang('en')}
                className={`py-2 px-3 rounded-lg font-bold text-xs sm:text-sm transition ${lang === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                English
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`py-2 px-3 rounded-lg font-bold text-xs sm:text-sm transition ${lang === 'hi' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLang('gu')}
                className={`py-2 px-3 rounded-lg font-bold text-xs sm:text-sm transition ${lang === 'gu' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                ગુજરાતી
              </button>
            </div>
          </motion.div>

          {/* 3. Text Size */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center shrink-0">
                <Type size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {lang === 'en' && 'Text Size'}
                  {lang === 'hi' && 'पाठ का आकार'}
                  {lang === 'gu' && 'ટેક્સ્ટ સાઈઝ'}
                </h2>
                <p className="text-sm text-slate-400">
                  {lang === 'en' && 'Make text easier to read'}
                  {lang === 'hi' && 'पाठ को पढ़ने में आसान बनाएं'}
                  {lang === 'gu' && 'વાંચવામાં સરળતા માટે'}
                </p>
              </div>
            </div>
            <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1 w-full sm:w-auto">
              <button
                onClick={() => setTextSize('normal')}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg font-bold text-sm transition ${textSize === 'normal' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                {lang === 'en' && 'Normal'}
                {lang === 'hi' && 'सामान्य'}
                {lang === 'gu' && 'સામાન્ય'}
              </button>
              <button
                onClick={() => setTextSize('large')}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg font-bold text-sm transition ${textSize === 'large' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                {lang === 'en' && 'Large'}
                {lang === 'hi' && 'बड़ा'}
                {lang === 'gu' && 'મોટું'}
              </button>
              <button
                onClick={() => setTextSize('extra')}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg font-bold text-sm transition ${textSize === 'extra' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                {lang === 'en' && 'Extra'}
                {lang === 'hi' && 'विशाल'}
                {lang === 'gu' && 'વિશાળ'}
              </button>
            </div>
          </motion.div>

          {/* 4. High Contrast */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center shrink-0">
                <Eye size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {lang === 'en' && 'High Contrast'}
                  {lang === 'hi' && 'उच्च कंट्रास्ट'}
                  {lang === 'gu' && 'હાઈ કોન્ટ્રાસ્ટ'}
                </h2>
                <p className="text-sm text-slate-400">
                  {lang === 'en' && 'Increase screen visibility'}
                  {lang === 'hi' && 'स्क्रीन दृश्यता बढ़ाएं'}
                  {lang === 'gu' && 'દેખાવ સ્પષ્ટ કરો'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              aria-label="Toggle High Contrast"
              className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out shrink-0 ${highContrast ? 'bg-amber-500' : 'bg-slate-800'}`}
            >
              <motion.div layout className="w-6 h-6 bg-white rounded-full shadow-md" initial={false} animate={{ x: highContrast ? 24 : 0 }} />
            </button>
          </motion.div>

          {/* 5. Read Aloud */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center shrink-0">
                <Volume2 size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {lang === 'en' && 'Read Aloud'}
                  {lang === 'hi' && 'जोर से पढ़ें'}
                  {lang === 'gu' && 'મોટેથી વાંચો'}
                </h2>
                <p className="text-sm text-slate-400">
                  {lang === 'en' && 'Enable voice assistance features'}
                  {lang === 'hi' && 'वॉयस सहायता सुविधाएँ सक्षम करें'}
                  {lang === 'gu' && 'અવાજ સહાયતા ચાલુ કરો'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setReadAloud(!readAloud)}
              aria-label="Toggle Read Aloud"
              className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out shrink-0 ${readAloud ? 'bg-purple-600' : 'bg-slate-800'}`}
            >
              <motion.div layout className="w-6 h-6 bg-white rounded-full shadow-md" initial={false} animate={{ x: readAloud ? 24 : 0 }} />
            </button>
          </motion.div>

          {/* 6. Local Analytics & Usage Insights (Item 14) */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center shrink-0">
                <BarChart2 size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {lang === 'en' && 'Local Usage Insights'}
                  {lang === 'hi' && 'स्थानीय उपयोग आँकड़े'}
                  {lang === 'gu' && 'લોકલ વપરાશ આંકડા'}
                </h2>
                <p className="text-sm text-slate-400">
                  {lang === 'en' && 'Zero tracking cookies. Private metrics stored only on your device.'}
                  {lang === 'hi' && 'शून्य ट्रैकिंग कुकीज़। निजी डेटा केवल आपके डिवाइस पर सुरक्षित है।'}
                  {lang === 'gu' && 'કોઈ ટ્રેકિંગ કૂકીઝ નથી. ખાનગી ડેટા માત્ર તમારા ઉપકરણ પર છે.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 text-center">
                <p className="text-2xl font-bold font-mono text-blue-400">{analytics.totalViews}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">
                  {lang === 'en' ? 'Pages Viewed' : lang === 'hi' ? 'देखे गए पृष्ठ' : 'જોયેલા પેજ'}
                </p>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 text-center">
                <p className="text-2xl font-bold font-mono text-emerald-400">{analytics.totalEvents}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">
                  {lang === 'en' ? 'Actions Taken' : lang === 'hi' ? 'किए गए कार्य' : 'કરેલી ક્રિયાઓ'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* 7. Reset Journey & Clear Data */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-red-950/20 border border-red-900/40 rounded-3xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500/10 text-red-400 rounded-2xl flex items-center justify-center shrink-0">
                  <Trash2 size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {lang === 'en' && 'Reset Journey & Data'}
                    {lang === 'hi' && 'यात्रा और डेटा रीसेट करें'}
                    {lang === 'gu' && 'પ્રવાસ અને ડેટા રીસેટ કરો'}
                  </h2>
                  <p className="text-sm text-slate-400">
                    {lang === 'en' && 'Erase mock test scores, application forms, checklist, and stats.'}
                    {lang === 'hi' && 'मॉक टेस्ट स्कोर, आवेदन फॉर्म, चेकलिस्ट और आंकड़े हटाएं।'}
                    {lang === 'gu' && 'મોક ટેસ્ટ સ્કોર, અરજી વિગતો, ચેકલિસ્ટ અને આંકડા દૂર કરો.'}
                  </p>
                </div>
              </div>

              {!showResetConfirm ? (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="bg-red-900/30 hover:bg-red-800/50 text-red-300 border border-red-800 font-bold px-5 py-2.5 rounded-xl transition text-sm shrink-0"
                >
                  {lang === 'en' && 'Clear Progress'}
                  {lang === 'hi' && 'प्रगति हटाएं'}
                  {lang === 'gu' && 'ડેટા સાફ કરો'}
                </button>
              ) : (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleClearData}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-xl transition text-sm shadow-md"
                  >
                    {lang === 'en' && 'Yes, Reset'}
                    {lang === 'hi' && 'हाँ, रीसेट करें'}
                    {lang === 'gu' && 'હા, રીસેટ કરો'}
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-4 py-2 rounded-xl transition text-sm"
                  >
                    {lang === 'en' && 'Cancel'}
                    {lang === 'hi' && 'रद्द करें'}
                    {lang === 'gu' && 'રદ કરો'}
                  </button>
                </div>
              )}
            </div>

            <AnimatePresence>
              {resetSuccess && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-300 rounded-xl text-sm flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>
                    {lang === 'en' && 'All local progress cleared. Redirecting to home...'}
                    {lang === 'hi' && 'सभी स्थानीय प्रगति हटा दी गई। होम पेज पर पुनः निर्देशित किया जा रहा है...'}
                    {lang === 'gu' && 'બધો લોકલ ડેટા સાફ થઈ ગયો છે. હોમ પેજ પર લઈ જઈ રહ્યા છીએ...'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}