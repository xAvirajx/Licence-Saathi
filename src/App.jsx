import { useState, createContext, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Settings as SettingsIcon, WifiOff, Car, Menu, X, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { en } from './i18n/en';
import { hi } from './i18n/hi';
import { gu } from './i18n/gu';
import ChatHelper from './components/ChatHelper';
import { trackPageView } from './utils/analytics';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Eligibility = lazy(() => import('./pages/Eligibility'));
const Documents = lazy(() => import('./pages/Documents'));
const LlApplication = lazy(() => import('./pages/LlApplication'));
const MockTest = lazy(() => import('./pages/MockTest'));
const TestDay = lazy(() => import('./pages/TestDay'));
const TrackApp = lazy(() => import('./pages/TrackApp'));
const PermanentLicence = lazy(() => import('./pages/PermanentLicence'));
const Learn = lazy(() => import('./pages/Learn'));
const DrivingTest = lazy(() => import('./pages/DrivingTest'));
const Settings = lazy(() => import('./pages/Settings'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Accessible Loading Fallback with Heading
const PageLoader = () => (
  <div role="status" aria-live="polite" className="w-full min-h-[50vh] flex flex-col items-center justify-center gap-4">
    <h2 className="sr-only">Loading page content...</h2>
    <div className="flex gap-2">
      <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
      <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-75"></span>
      <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></span>
    </div>
  </div>
);

export const AppContext = createContext();

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('ls_lang') || 'en');
  const [textSize, setTextSize] = useState(() => localStorage.getItem('ls_textSize') || 'normal');
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('ls_contrast') === 'true');
  const [readAloud, setReadAloud] = useState(() => localStorage.getItem('ls_readAloud') === 'true');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const dictionaries = { en, hi, gu };
  const t = dictionaries[lang] || en;

  useEffect(() => {
    localStorage.setItem('ls_lang', lang);
    localStorage.setItem('ls_textSize', textSize);
    localStorage.setItem('ls_contrast', highContrast);
    localStorage.setItem('ls_readAloud', readAloud);

    const html = document.documentElement;
    if (textSize === 'large') html.style.fontSize = '18px';
    else if (textSize === 'extra') html.style.fontSize = '20px';
    else html.style.fontSize = '16px'; 
  }, [lang, textSize, highContrast, readAloud]);

  // Global WhatsApp referral message for footer
  const footerShareText = 
    lang === 'gu'
      ? `🚗 લાઇસન્સ સાથી - સરળ RTO ડ્રાઇવિંગ લાઇસન્સ માર્ગદર્શિકા! પાત્રતા તપાસો, મોક ટેસ્ટ આપો અને રોડ સાઇન શીખો: https://licence-saathi-v2.onrender.com/`
      : lang === 'hi'
      ? `🚗 लाइसेंस साथी - तनाव मुक्त एम-परिवहन सहायता और आरटीओ ड्राइविंग लाइसेंस गाइड! पात्रता जांचें, मॉक टेस्ट दें और रोड साइन्स सीखें: https://licence-saathi-v2.onrender.com/`
      : `🚗 Licence Saathi - Stress-free mParivahan assistance and RTO driving licence guide for India! Check eligibility, practice mock tests, and learn road signs: https://licence-saathi-v2.onrender.com/`;

  const footerWhatsappUrl = `https://wa.me/?text=${encodeURIComponent(footerShareText)}`;

  return (
    <AppContext.Provider value={{ lang, setLang, textSize, setTextSize, highContrast, setHighContrast, readAloud, setReadAloud, t }}>
      <div className={`w-full min-h-screen bg-slate-950 flex flex-col relative overflow-x-hidden text-slate-50 font-sans transition-all duration-300 ${highContrast ? 'contrast-150 saturate-150 brightness-110' : ''}`}>
        
        {/* Skip Link for Screen Readers */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg"
        >
          Skip to main content
        </a>

        {/* Offline Notification Banner */}
        {!isOnline && (
          <div role="status" aria-live="polite" className="bg-amber-500 text-slate-950 px-4 py-2 font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 sticky top-0 z-50 shadow-md">
            <WifiOff size={16} />
            <span>
              {lang === 'en' && "You are offline. Journey map, documents, and mock tests remain available."}
              {lang === 'hi' && "आप ऑफ़लाइन हैं। यात्रा मानचित्र, दस्तावेज़ और मॉक टेस्ट उपलब्ध हैं।"}
              {lang === 'gu' && "તમે ઓફલાઇન છો. પ્રવાસ નકશો, દસ્તાવેજો અને મોક ટેસ્ટ ઉપલબ્ધ છે."}
            </span>
          </div>
        )}

        {/* 1. GLOBAL HEADER & BANNER LANDMARK */}
        <header role="banner" className="relative z-30 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-5xl mx-auto p-4 sm:px-6 flex items-center justify-between">
            <Link to="/" aria-label="Licence Saathi Home" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Car size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Licence Saathi</span>
            </Link>

            {/* Desktop Navigation */}
            <nav role="navigation" aria-label="Main Navigation" className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-300">
              <Link to="/application" className="hover:text-white transition">
                {lang === 'en' ? 'Apply Now' : lang === 'hi' ? 'अभी आवेदन करें' : 'હવે અરજી કરો'}
              </Link>
              <Link to="/learn" className="hover:text-white transition">
                {lang === 'en' ? 'Learn Signs' : lang === 'hi' ? 'संकेत सीखें' : 'સાઇન શીખો'}
              </Link>
              <Link to="/permanent-licence" className="hover:text-white transition">
                {lang === 'en' ? 'Permanent DL' : lang === 'hi' ? 'स्थायी डीएल' : 'કાયમી DL'}
              </Link>
              <Link to="/mock-test" className="hover:text-white transition">
                {lang === 'en' ? 'Mock Test' : lang === 'hi' ? 'मॉक टेस्ट' : 'મોક ટેસ્ટ'}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle Menu"
              className="md:hidden text-slate-300 hover:text-white p-2"
            >
              <Menu size={28} />
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 bg-slate-950 flex flex-col p-6"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Menu"
                  className="text-slate-300 hover:text-white p-2"
                >
                  <X size={32} />
                </button>
              </div>

              <nav role="navigation" aria-label="Mobile Navigation" className="flex flex-col items-center justify-center flex-1 gap-8 text-2xl font-bold">
                <Link to="/application" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-blue-400 transition">
                  {lang === 'en' ? 'Apply Now' : lang === 'hi' ? 'अभी आवेदन करें' : 'હવે અરજી કરો'}
                </Link>
                <Link to="/learn" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-blue-400 transition">
                  {lang === 'en' ? 'Learn Signs' : lang === 'hi' ? 'संकेत सीखें' : 'સાઇન શીખો'}
                </Link>
                <Link to="/permanent-licence" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-blue-400 transition">
                  {lang === 'en' ? 'Permanent DL' : lang === 'hi' ? 'स्थायी डीएल' : 'કાયમી DL'}
                </Link>
                <Link to="/mock-test" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-blue-400 transition">
                  {lang === 'en' ? 'Mock Test' : lang === 'hi' ? 'मॉक टेस्ट' : 'મોક ટેસ્ટ'}
                </Link>
                <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-blue-400 transition">
                  {lang === 'en' ? 'Settings' : lang === 'hi' ? 'सेटिंग्स' : 'સેટિંગ્સ'}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. MAIN REGION LANDMARK */}
        <main id="main-content" role="main" className="flex-1 w-full">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/eligibility" element={<Eligibility />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/application" element={<LlApplication />} />
              <Route path="/mock-test" element={<MockTest />} />
              <Route path="/test-day" element={<TestDay />} />
              <Route path="/track-app" element={<TrackApp />} />
              <Route path="/permanent-licence" element={<PermanentLicence />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/driving-test" element={<DrivingTest />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        
        {/* Floating Chat Helper */}
        <ChatHelper />
        
        {/* Floating Settings Button */}
        <Link 
          to="/settings" 
          aria-label="App Settings"
          className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-slate-900 border border-slate-700 text-slate-300 rounded-full flex items-center justify-center shadow-lg shadow-black/50 hover:bg-slate-800 hover:text-white transition-all"
        >
          <SettingsIcon size={24} />
        </Link>

        {/* 3. CONTENTINFO FOOTER WITH WHATSAPP REFERRAL BUTTON */}
        <footer role="contentinfo" className="relative z-10 border-t border-slate-800/80 w-full mt-auto py-8 px-6 bg-slate-950/60">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Car size={20} className="text-blue-500" />
              <span className="font-bold text-white tracking-tight">Licence Saathi</span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 text-xs text-slate-400 font-medium">
              <Link to="/privacy" className="hover:text-blue-400 transition-colors">
                {lang === 'en' ? 'Privacy Policy' : lang === 'hi' ? 'गोपनीयता नीति' : 'પ્રાઇવસી પોલિસી'}
              </Link>
              <span className="text-slate-700">•</span>
              <Link to="/terms" className="hover:text-blue-400 transition-colors">
                {lang === 'en' ? 'Terms & Disclaimer' : lang === 'hi' ? 'नियम और अस्वीकरण' : 'નિયમો અને શરતો'}
              </Link>
            </div>

            {/* Global WhatsApp Referral Pill */}
            <div className="flex items-center gap-3">
              <a
                href={footerWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-slate-950 border border-[#25D366]/40 font-bold px-4 py-2 rounded-xl transition-all text-xs shadow-sm"
              >
                <Share2 size={14} />
                {lang === 'en' ? 'Share on WhatsApp' : lang === 'hi' ? 'व्हाट्सएप पर शेयर करें' : 'વોટ્સએપ પર શેર કરો'}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </AppContext.Provider>
  );
}