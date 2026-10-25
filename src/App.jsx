import { useState, createContext, useEffect, Suspense, lazy, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Settings as SettingsIcon, WifiOff, Car, Menu, X, Share2, 
  Languages, Check, Sun, Moon, Monitor 
} from 'lucide-react';
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
  
  // Theme state: 'system' | 'light' | 'dark' (Default is 'system')
  const [theme, setTheme] = useState(() => localStorage.getItem('ls_theme') || 'system');
  const [effectiveTheme, setEffectiveTheme] = useState('dark');
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef(null);

  // Floating language switcher menu state
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const location = useLocation();

  // Track page views locally
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  // System Theme Detector & Listener
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const computeTheme = () => {
      if (theme === 'system') {
        setEffectiveTheme(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setEffectiveTheme(theme);
      }
    };

    computeTheme();
    localStorage.setItem('ls_theme', theme);

    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        computeTheme();
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target)) {
        setThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Online / Offline listener
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

  // Sync settings & font scaling to root HTML document
  useEffect(() => {
    localStorage.setItem('ls_lang', lang);
    localStorage.setItem('ls_textSize', textSize);
    localStorage.setItem('ls_contrast', highContrast);
    localStorage.setItem('ls_readAloud', readAloud);

    const html = document.documentElement;
    if (textSize === 'large') html.style.fontSize = '18px';
    else if (textSize === 'extra') html.style.fontSize = '20px';
    else html.style.fontSize = '16px'; 

    if (effectiveTheme === 'light') {
      html.classList.add('light-mode');
      html.classList.remove('dark-mode');
    } else {
      html.classList.add('dark-mode');
      html.classList.remove('light-mode');
    }
  }, [lang, textSize, highContrast, readAloud, effectiveTheme]);

  // Global WhatsApp referral message for footer
  const footerShareText = 
    lang === 'gu'
      ? `🚗 લાઇસન્સ સાથી - સરળ RTO ડ્રાઇવિંગ લાઇસન્સ માર્ગદર્શિકા! પાત્રતા તપાસો, મોક ટેસ્ટ આપો અને રોડ સાઇન શીખો: https://licence-saathi-v2.onrender.com/`
      : lang === 'hi'
      ? `🚗 लाइसेंस साथी - तनाव मुक्त एम-परिवहन सहायता और आरटीओ ड्राइविंग लाइसेंस गाइड! पात्रता जांचें, मॉक टेस्ट दें और रोड साइन्स सीखें: https://licence-saathi-v2.onrender.com/`
      : `🚗 Licence Saathi - Stress-free mParivahan assistance and RTO driving licence guide for India! Check eligibility, practice mock tests, and learn road signs: https://licence-saathi-v2.onrender.com/`;

  const footerWhatsappUrl = `https://wa.me/?text=${encodeURIComponent(footerShareText)}`;

  return (
    <AppContext.Provider value={{ 
      lang, setLang, 
      textSize, setTextSize, 
      highContrast, setHighContrast, 
      readAloud, setReadAloud, 
      theme, setTheme,
      effectiveTheme,
      t 
    }}>
      {/* Light Theme Dynamic Stylesheet */}
      {effectiveTheme === 'light' && (
        <style>{`
          .light-mode {
            background-color: #f8fafc !important;
            color: #0f172a !important;
          }
          .light-mode .bg-slate-950 {
            background-color: #f8fafc !important;
            color: #0f172a !important;
          }
          .light-mode .bg-slate-900 {
            background-color: #ffffff !important;
            color: #0f172a !important;
          }
          .light-mode .bg-slate-900\\/50,
          .light-mode .bg-slate-900\\/60,
          .light-mode .bg-slate-900\\/80 {
            background-color: rgba(255, 255, 255, 0.85) !important;
            color: #0f172a !important;
          }
          .light-mode .bg-slate-950\\/50,
          .light-mode .bg-slate-950\\/60,
          .light-mode .bg-slate-950\\/70,
          .light-mode .bg-slate-950\\/80 {
            background-color: #f1f5f9 !important;
            color: #0f172a !important;
          }
          .light-mode .bg-slate-800 {
            background-color: #e2e8f0 !important;
            color: #1e293b !important;
          }
          .light-mode .border-slate-800,
          .light-mode .border-slate-800\\/80,
          .light-mode .border-slate-700 {
            border-color: #e2e8f0 !important;
          }
          .light-mode .text-white,
          .light-mode .text-slate-50 {
            color: #0f172a !important;
          }
          .light-mode .text-slate-200,
          .light-mode .text-slate-300 {
            color: #334155 !important;
          }
          .light-mode .text-slate-400 {
            color: #64748b !important;
          }
          .light-mode input[type="text"],
          .light-mode input[type="tel"],
          .light-mode input[type="date"],
          .light-mode select {
            background-color: #ffffff !important;
            color: #0f172a !important;
            border-color: #cbd5e1 !important;
          }
          .light-mode header {
            background-color: rgba(255, 255, 255, 0.85) !important;
            border-color: #e2e8f0 !important;
          }
          .light-mode footer {
            background-color: #f1f5f9 !important;
            border-color: #e2e8f0 !important;
          }
          .light-mode .fixed.bottom-6.left-6,
          .light-mode .fixed.bottom-24.left-6 > button {
            background-color: #ffffff !important;
            border-color: #cbd5e1 !important;
            color: #1e293b !important;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1) !important;
          }
        `}</style>
      )}

      <div className={`w-full min-h-screen ${effectiveTheme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-50'} flex flex-col relative overflow-x-hidden font-sans transition-colors duration-300 ${highContrast ? 'contrast-150 saturate-150 brightness-110' : ''}`}>
        
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

        {/* 1. GLOBAL HEADER WITH TOP THEME TOGGLE & NAVIGATION */}
        <header role="banner" className={`relative z-30 w-full border-b ${effectiveTheme === 'light' ? 'border-slate-200 bg-white/80' : 'border-slate-800/80 bg-slate-950/80'} backdrop-blur-md`}>
          <div className="max-w-5xl mx-auto p-4 sm:px-6 flex items-center justify-between">
            <Link to="/" aria-label="Licence Saathi Home" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Car size={24} className="text-white" />
              </div>
              <span className={`text-xl font-bold tracking-tight ${effectiveTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>Licence Saathi</span>
            </Link>

            {/* Desktop Navigation */}
            <nav role="navigation" aria-label="Main Navigation" className="hidden md:flex items-center gap-7 font-medium text-sm text-slate-300">
              <Link to="/application" className="hover:text-blue-500 transition">
                {lang === 'en' ? 'Apply Now' : lang === 'hi' ? 'अभी आवेदन करें' : 'હવે અરજી કરો'}
              </Link>
              <Link to="/learn" className="hover:text-blue-500 transition">
                {lang === 'en' ? 'Learn Signs' : lang === 'hi' ? 'संकेत सीखें' : 'સાઇન શીખો'}
              </Link>
              <Link to="/permanent-licence" className="hover:text-blue-500 transition">
                {lang === 'en' ? 'Permanent DL' : lang === 'hi' ? 'स्थायी डीएल' : 'કાયમી DL'}
              </Link>
              <Link to="/mock-test" className="hover:text-blue-500 transition">
                {lang === 'en' ? 'Mock Test' : lang === 'hi' ? 'मॉक टेस्ट' : 'મોક ટેસ્ટ'}
              </Link>
            </nav>

            {/* Top Controls: Theme Switcher & Mobile Menu Button */}
            <div className="flex items-center gap-2">
              
              {/* THEME SWITCHER DROPDOWN (TOP BAR) */}
              <div className="relative" ref={themeMenuRef}>
                <button
                  onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                  aria-label="Toggle Theme Mode"
                  title="Theme: System / Light / Dark"
                  className={`flex items-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-bold transition-all shadow-sm ${
                    effectiveTheme === 'light'
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  {theme === 'system' && <Monitor size={16} className="text-blue-400" />}
                  {theme === 'light' && <Sun size={16} className="text-amber-500" />}
                  {theme === 'dark' && <Moon size={16} className="text-indigo-400" />}
                  
                  <span className="hidden sm:inline capitalize">
                    {theme === 'system' 
                      ? (lang === 'en' ? 'Auto' : lang === 'hi' ? 'सिस्टम' : 'ઓટો') 
                      : (theme === 'light' 
                        ? (lang === 'en' ? 'Light' : lang === 'hi' ? 'लाइट' : 'લાઇટ') 
                        : (lang === 'en' ? 'Dark' : lang === 'hi' ? 'डार्क' : 'ડાર્ક'))}
                  </span>
                </button>

                {/* Popover Menu */}
                <AnimatePresence>
                  {themeMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute right-0 top-12 w-48 rounded-2xl p-1.5 shadow-2xl border z-50 backdrop-blur-xl ${
                        effectiveTheme === 'light'
                          ? 'bg-white/95 border-slate-200 text-slate-800'
                          : 'bg-slate-900/95 border-slate-700 text-slate-100'
                      }`}
                    >
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700/40">
                        {lang === 'en' ? 'Appearance' : lang === 'hi' ? 'थीम मोड' : 'થીમ મોડ'}
                      </div>

                      {[
                        { 
                          id: 'system', 
                          icon: <Monitor size={15} />, 
                          title: { en: 'System Default', hi: 'सिस्टम डिफ़ॉल्ट', gu: 'સિસ્ટમ ડિફોલ્ટ' } 
                        },
                        { 
                          id: 'light', 
                          icon: <Sun size={15} />, 
                          title: { en: 'Light Mode', hi: 'लाइट मोड', gu: 'લાઇટ મોડ' } 
                        },
                        { 
                          id: 'dark', 
                          icon: <Moon size={15} />, 
                          title: { en: 'Dark Mode', hi: 'डार्क मोड', gu: 'ડાર્ક મોડ' } 
                        }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setTheme(item.id);
                            setThemeMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                            theme === item.id
                              ? 'bg-blue-600 text-white font-bold shadow-md'
                              : effectiveTheme === 'light'
                              ? 'hover:bg-slate-100 text-slate-700'
                              : 'hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            {item.icon}
                            <span>{item.title[lang] || item.title.en}</span>
                          </span>
                          {theme === item.id && <Check size={14} className="stroke-[3]" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Toggle Menu"
                className="md:hidden text-slate-300 hover:text-white p-2 rounded-xl transition"
              >
                <Menu size={26} />
              </button>
            </div>
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
              className={`fixed inset-0 z-50 flex flex-col p-6 ${effectiveTheme === 'light' ? 'bg-white text-slate-900' : 'bg-slate-950 text-white'}`}
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Menu"
                  className="p-2 text-slate-400 hover:text-white transition"
                >
                  <X size={32} />
                </button>
              </div>

              <nav role="navigation" aria-label="Mobile Navigation" className="flex flex-col items-center justify-center flex-1 gap-7 text-xl font-bold">
                <Link to="/application" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500 transition">
                  {lang === 'en' ? 'Apply Now' : lang === 'hi' ? 'अभी आवेदन करें' : 'હવે અરજી કરો'}
                </Link>
                <Link to="/learn" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500 transition">
                  {lang === 'en' ? 'Learn Signs' : lang === 'hi' ? 'संकेत सीखें' : 'સાઇન શીખો'}
                </Link>
                <Link to="/permanent-licence" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500 transition">
                  {lang === 'en' ? 'Permanent DL' : lang === 'hi' ? 'स्थायी डीएल' : 'કાયમી DL'}
                </Link>
                <Link to="/mock-test" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500 transition">
                  {lang === 'en' ? 'Mock Test' : lang === 'hi' ? 'मॉक टेस्ट' : 'મોક ટેસ્ટ'}
                </Link>
                <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500 transition">
                  {lang === 'en' ? 'Settings' : lang === 'hi' ? 'सेटिंग्स' : 'સેટિંગ્સ'}
                </Link>

                {/* Mobile Drawer Theme Quick Buttons */}
                <div className="flex items-center gap-2 p-1.5 rounded-2xl border border-slate-800 bg-slate-900/60 mt-4">
                  <button
                    onClick={() => setTheme('system')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${theme === 'system' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                  >
                    <Monitor size={14} /> Auto
                  </button>
                  <button
                    onClick={() => setTheme('light')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${theme === 'light' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                  >
                    <Sun size={14} /> Light
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${theme === 'dark' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                  >
                    <Moon size={14} /> Dark
                  </button>
                </div>
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
        
        {/* Floating Chat Helper (Bottom Right) */}
        <ChatHelper />

        {/* 3. FLOATING ACTION BUTTONS (Bottom Left) */}
        
        {/* Floating Language Switcher (Stacked above Settings) */}
        <div className="fixed bottom-24 left-6 z-40">
          <AnimatePresence>
            {langMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className={`absolute bottom-16 left-0 rounded-2xl p-1.5 shadow-2xl backdrop-blur-xl w-40 space-y-1 mb-1 border ${
                  effectiveTheme === 'light'
                    ? 'bg-white border-slate-300 text-slate-800'
                    : 'bg-slate-900 border-slate-700/90 text-slate-100'
                }`}
              >
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  {lang === 'en' ? 'Select Language' : lang === 'hi' ? 'भाषा चुनें' : 'ભાષા પસંદ કરો'}
                </div>
                {[
                  { code: 'en', label: 'English' },
                  { code: 'hi', label: 'हिंदी' },
                  { code: 'gu', label: 'ગુજરાતી' }
                ].map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLang(item.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      lang === item.code
                        ? 'bg-blue-600 text-white shadow-md'
                        : effectiveTheme === 'light'
                        ? 'text-slate-700 hover:bg-slate-100'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {lang === item.code && <Check size={14} className="stroke-[3]" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            aria-label="Change Language"
            title="Change Language / भाषा बदलें / ભાષા બદલો"
            className="w-14 h-14 bg-slate-900 border border-slate-700 text-slate-300 rounded-full flex items-center justify-center shadow-lg shadow-black/50 hover:bg-slate-800 hover:text-white transition-all relative group"
          >
            <Languages size={24} className="group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase border border-slate-900 shadow">
              {lang}
            </span>
          </button>
        </div>

        {/* Floating Settings Button (Bottom Left) */}
        <Link 
          to="/settings" 
          aria-label="App Settings"
          className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-slate-900 border border-slate-700 text-slate-300 rounded-full flex items-center justify-center shadow-lg shadow-black/50 hover:bg-slate-800 hover:text-white transition-all"
        >
          <SettingsIcon size={24} />
        </Link>

        {/* 4. CONTENTINFO FOOTER WITH WHATSAPP REFERRAL BUTTON */}
        <footer role="contentinfo" className={`relative z-10 border-t w-full mt-auto py-8 px-6 transition-colors ${
          effectiveTheme === 'light' ? 'border-slate-200 bg-slate-100/90' : 'border-slate-800/80 bg-slate-950/60'
        }`}>
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Car size={20} className="text-blue-500" />
              <span className={`font-bold tracking-tight ${effectiveTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>Licence Saathi</span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 text-xs text-slate-400 font-medium">
              <Link to="/privacy" className="hover:text-blue-500 transition-colors">
                {lang === 'en' ? 'Privacy Policy' : lang === 'hi' ? 'गोपनीयता नीति' : 'પ્રાઇવસી પોલિસી'}
              </Link>
              <span className="text-slate-700">•</span>
              <Link to="/terms" className="hover:text-blue-500 transition-colors">
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