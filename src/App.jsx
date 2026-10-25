import { useState, createContext, useEffect, Suspense, lazy, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Settings as SettingsIcon, WifiOff, Car, Menu, X, Share2, 
  Languages, Check, Sun, Moon, Monitor, ChevronDown, ShieldAlert,
  Download, Sparkles
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
const LostLicence = lazy(() => import('./pages/LostLicence'));
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
  
  // Theme state: 'system' | 'light' | 'dark'
  const [theme, setTheme] = useState(() => localStorage.getItem('ls_theme') || 'system');
  const [effectiveTheme, setEffectiveTheme] = useState('dark');
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef(null);

  // Floating language switcher menu state
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // PWA Install Prompt & Standalone Mode Detection
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  // Check if already running in installed standalone mode
  useEffect(() => {
    const checkStandalone = () => {
      const isStandalone = 
        window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true || 
        document.referrer.includes('android-app://');
      
      setIsInstalled(isStandalone);
    };

    checkStandalone();

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Only show banner if user is on browser and hasn't dismissed it
      const dismissed = sessionStorage.getItem('pwa_banner_dismissed');
      if (!dismissed) {
        setShowInstallBanner(true);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const triggerInstallPrompt = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

  const dismissInstallBanner = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem('pwa_banner_dismissed', 'true');
  };

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
      ? `🚗 લાયસન્સ સાથી - સરળ RTO ડ્રાઇવિંગ લાઇસન્સ માર્ગદર્શિકા! પાત્રતા તપાસો, મોક ટેસ્ટ આપો અને રોડ સાઇન શીખો: https://licence-saathi-v2.onrender.com/`
      : lang === 'hi'
      ? `🚗 लाइसेंस साथी - तनाव मुक्त एम-परिवहन सहायता और आरटीओ ड्राइविंग लाइसेंस गाइड! पात्रता जांचें, मॉक टेस्ट दें और रोड साइन्स सीखें: https://licence-saathi-v2.onrender.com/`
      : `🚗 License Saathi - Stress-free mParivahan assistance and RTO driving licence guide for India! Check eligibility, practice mock tests, and learn road signs: https://licence-saathi-v2.onrender.com/`;

  const footerWhatsappUrl = `https://wa.me/?text=${encodeURIComponent(footerShareText)}`;

  return (
    <AppContext.Provider value={{ 
      lang, setLang, 
      textSize, setTextSize, 
      highContrast, setHighContrast, 
      readAloud, setReadAloud, 
      theme, setTheme,
      effectiveTheme,
      isInstalled,
      deferredPrompt,
      triggerInstallPrompt,
      t 
    }}>
      {/* Global Adaptive Scrollbars & Light Mode Stylesheet */}
      <style>{`
        * {
          scrollbar-width: thin;
        }

        .dark-mode, 
        body:not(.light-mode),
        .dark-mode * {
          scrollbar-color: #334155 transparent;
        }
        .dark-mode *::-webkit-scrollbar,
        body:not(.light-mode) *::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .dark-mode *::-webkit-scrollbar-track,
        body:not(.light-mode) *::-webkit-scrollbar-track {
          background: transparent;
        }
        .dark-mode *::-webkit-scrollbar-thumb,
        body:not(.light-mode) *::-webkit-scrollbar-thumb {
          background-color: #334155;
          border-radius: 9999px;
        }
        .dark-mode *::-webkit-scrollbar-thumb:hover,
        body:not(.light-mode) *::-webkit-scrollbar-thumb:hover {
          background-color: #475569;
        }

        .light-mode,
        .light-mode * {
          scrollbar-color: #cbd5e1 transparent;
        }
        .light-mode *::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .light-mode *::-webkit-scrollbar-track {
          background: transparent;
        }
        .light-mode *::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 9999px;
        }
        .light-mode *::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }

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
        .light-mode .bg-slate-900\\/70,
        .light-mode .bg-slate-900\\/80 {
          background-color: #ffffff !important;
          color: #0f172a !important;
          border-color: #cbd5e1 !important;
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.06) !important;
        }
        .light-mode .bg-slate-950\\/50,
        .light-mode .bg-slate-950\\/60,
        .light-mode .bg-slate-950\\/70,
        .light-mode .bg-slate-950\\/80 {
          background-color: #f1f5f9 !important;
          color: #0f172a !important;
          border-color: #e2e8f0 !important;
        }
        .light-mode .bg-slate-800 {
          background-color: #e2e8f0 !important;
          color: #0f172a !important;
        }
        .light-mode .border-slate-800,
        .light-mode .border-slate-800\\/80,
        .light-mode .border-slate-700 {
          border-color: #cbd5e1 !important;
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
          color: #475569 !important;
        }
        .light-mode .text-slate-500 {
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
        .light-mode input::placeholder {
          color: #94a3b8 !important;
        }
        .light-mode .bg-emerald-950\\/50 {
          background-color: #dcfce7 !important;
          color: #16a34a !important;
        }
        .light-mode .fill-blue-900\\/50 {
          fill: #dbeafe !important;
        }
        .light-mode .bg-blue-950\\/40 {
          background-color: #eff6ff !important;
          border-color: #3b82f6 !important;
        }
        .light-mode .text-blue-200 {
          color: #1d4ed8 !important;
        }
        .light-mode .bg-emerald-950\\/20,
        .light-mode .bg-emerald-950\\/30,
        .light-mode .bg-emerald-950\\/40 {
          background-color: #ecfdf5 !important;
          border-color: #a7f3d0 !important;
        }
        .light-mode .bg-red-950\\/20,
        .light-mode .bg-red-950\\/30,
        .light-mode .bg-red-950\\/40 {
          background-color: #fef2f2 !important;
          border-color: #fecaca !important;
        }
        .light-mode .text-red-200,
        .light-mode .text-red-300 {
          color: #b91c1c !important;
        }
        .light-mode .text-emerald-100,
        .light-mode .text-emerald-200 {
          color: #065f46 !important;
        }
        .light-mode .text-blue-100 {
          color: #1e40af !important;
        }
        .light-mode .before\\:bg-gradient-to-b::before {
          background: linear-gradient(to bottom, #2563eb, #cbd5e1, transparent) !important;
        }
        .light-mode .text-slate-700 {
          color: #94a3b8 !important;
        }
        .light-mode header {
          background-color: rgba(255, 255, 255, 0.9) !important;
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

      <div className={`w-full min-h-screen ${effectiveTheme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-50'} flex flex-col relative overflow-x-hidden font-sans transition-colors duration-300 ${highContrast ? 'contrast-150 saturate-150 brightness-110' : ''}`}>
        
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg"
        >
          Skip to main content
        </a>

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

        {/* 1. GLOBAL HEADER */}
        <header role="banner" className={`relative z-30 w-full border-b ${effectiveTheme === 'light' ? 'border-slate-200 bg-white/90' : 'border-slate-800/80 bg-slate-950/80'} backdrop-blur-md`}>
          <div className="max-w-5xl mx-auto p-3.5 sm:px-6 flex items-center justify-between">
            <Link to="/" aria-label="License Saathi Home" className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                <Car size={22} className="text-white" />
              </div>
              <span className={`text-lg sm:text-xl font-bold tracking-tight ${effectiveTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                License Saathi
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav role="navigation" aria-label="Main Navigation" className="hidden md:flex items-center gap-6 font-medium text-sm text-slate-300">
              <Link to="/application" className="hover:text-blue-500 transition">
                {lang === 'en' ? 'Apply Now' : lang === 'hi' ? 'आवेदन करें' : 'અરજી કરો'}
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
              <Link to="/lost-licence" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-bold hover:bg-red-500/20 transition text-xs">
                <ShieldAlert size={14} />
                <span>{lang === 'en' ? 'Lost DL?' : lang === 'hi' ? 'गुमशुदा DL?' : 'ખોવાયેલ DL?'}</span>
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              {/* THEME TOGGLE BUTTON */}
              <div className="relative" ref={themeMenuRef}>
                <button
                  onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                  aria-label="Theme Appearance Settings"
                  title="Change Theme Mode"
                  className={`w-10 h-10 sm:w-auto sm:px-3 rounded-xl border flex items-center justify-center gap-2 transition-all shadow-sm ${
                    effectiveTheme === 'light'
                      ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-100'
                  }`}
                >
                  {effectiveTheme === 'dark' ? (
                    <Moon size={18} className="text-indigo-400 shrink-0" />
                  ) : (
                    <Sun size={18} className="text-amber-500 shrink-0" />
                  )}

                  <span className="hidden sm:inline text-xs font-bold">
                    {theme === 'system'
                      ? (lang === 'en' ? 'System Default' : lang === 'hi' ? 'सिस्टम डिफ़ॉल्ट' : 'સિસ્ટમ ડિફોલ્ટ')
                      : theme === 'light'
                      ? (lang === 'en' ? 'Light' : lang === 'hi' ? 'लाइट' : 'લાઇટ')
                      : (lang === 'en' ? 'Dark' : lang === 'hi' ? 'डार्क' : 'ડાર્ક')}
                  </span>

                  <ChevronDown size={14} className={`hidden sm:inline text-slate-400 transition-transform ${themeMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {themeMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute right-0 top-12 w-60 rounded-2xl p-2 shadow-2xl border z-50 backdrop-blur-xl ${
                        effectiveTheme === 'light'
                          ? 'bg-white border-slate-300 text-slate-800'
                          : 'bg-slate-900 border-slate-700 text-slate-100'
                      }`}
                    >
                      <div className="px-3 py-1.5 border-b border-slate-700/40 mb-1">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {lang === 'en' ? 'Display Appearance' : lang === 'hi' ? 'थीम और रंग मोड' : 'થીમ અને દેખાવ'}
                        </p>
                      </div>

                      {[
                        { 
                          id: 'system', 
                          icon: <Monitor size={16} className="text-blue-500" />, 
                          title: { en: 'System Default', hi: 'सिस्टम डिफ़ॉल्ट', gu: 'સિસ્ટમ ડિફોલ્ટ' },
                          sub: { en: 'Follows device settings', hi: 'डिवाइस सेटिंग का पालन करता है', gu: 'તમારા ઉપકરણ મુજબ બદલાશે' }
                        },
                        { 
                          id: 'light', 
                          icon: <Sun size={16} className="text-amber-500" />, 
                          title: { en: 'Light Mode', hi: 'लाइट मोड', gu: 'લાઇટ મોડ' },
                          sub: { en: 'Clean, high-contrast bright theme', hi: 'स्पष्ट, उच्च-कंट्रास्ट दिन का मोड', gu: 'સ્પષ્ટ અને વાંચવામાં સરળ લાઇટ થીમ' }
                        },
                        { 
                          id: 'dark', 
                          icon: <Moon size={16} className="text-indigo-400" />, 
                          title: { en: 'Dark Mode', hi: 'डार्क मोड', gu: 'ડાર્ક મોડ' },
                          sub: { en: 'Midnight dark theme for night', hi: 'आँखों के लिए आरामदायक रात्रि मोड', gu: 'રાત્રિના સમયે આંખો માટે અનુકૂળ' }
                        }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setTheme(item.id);
                            setThemeMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left ${
                            theme === item.id
                              ? 'bg-blue-600 text-white font-bold shadow-md'
                              : effectiveTheme === 'light'
                              ? 'hover:bg-slate-100 text-slate-800'
                              : 'hover:bg-slate-800 text-slate-200'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="mt-0.5">{item.icon}</span>
                            <div>
                              <p className="text-xs font-bold leading-tight">{item.title[lang] || item.title.en}</p>
                              <p className={`text-[10px] mt-0.5 leading-tight ${theme === item.id ? 'text-blue-100' : 'text-slate-400'}`}>
                                {item.sub[lang] || item.sub.en}
                              </p>
                            </div>
                          </div>
                          {theme === item.id && <Check size={14} className="stroke-[3] shrink-0 ml-2" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Toggle Menu"
                className={`w-10 h-10 rounded-xl border flex items-center justify-center md:hidden transition ${
                  effectiveTheme === 'light'
                    ? 'border-slate-300 text-slate-700 hover:bg-slate-100'
                    : 'border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Menu size={22} />
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

              <nav role="navigation" aria-label="Mobile Navigation" className="flex flex-col items-center justify-center flex-1 gap-6 text-xl font-bold">
                <Link to="/application" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500 transition">
                  {lang === 'en' ? 'Apply Now' : lang === 'hi' ? 'आवेदन करें' : 'અરજી કરો'}
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
                <Link to="/lost-licence" onClick={() => setMobileMenuOpen(false)} className="text-red-400 hover:text-red-300 transition flex items-center gap-2">
                  <ShieldAlert size={20} />
                  <span>{lang === 'en' ? 'Lost DL SOS' : lang === 'hi' ? 'गुमशुदा लाइसेंस सहायता' : 'ખોવાયેલ લાયસન્સ સહાય'}</span>
                </Link>
                <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500 transition">
                  {lang === 'en' ? 'Settings' : lang === 'hi' ? 'सेटिंग्स' : 'સેટિંગ્સ'}
                </Link>

                <div className={`flex items-center gap-2 p-1.5 rounded-2xl border ${effectiveTheme === 'light' ? 'border-slate-300 bg-slate-100' : 'border-slate-800 bg-slate-900/60'} mt-4`}>
                  <button
                    onClick={() => setTheme('system')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${theme === 'system' ? 'bg-blue-600 text-white shadow' : 'text-slate-400'}`}
                  >
                    <Monitor size={14} /> System
                  </button>
                  <button
                    onClick={() => setTheme('light')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${theme === 'light' ? 'bg-blue-600 text-white shadow' : 'text-slate-400'}`}
                  >
                    <Sun size={14} /> Light
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${theme === 'dark' ? 'bg-blue-600 text-white shadow' : 'text-slate-400'}`}
                  >
                    <Moon size={14} /> Dark
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. MAIN REGION */}
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
              <Route path="/lost-licence" element={<LostLicence />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        
        <ChatHelper />

        {/* 3. FLOATING ACTION BUTTONS */}
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
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700/40">
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

        <Link 
          to="/settings" 
          aria-label="App Settings"
          className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-slate-900 border border-slate-700 text-slate-300 rounded-full flex items-center justify-center shadow-lg shadow-black/50 hover:bg-slate-800 hover:text-white transition-all"
        >
          <SettingsIcon size={24} />
        </Link>

        {/* 4. SMART WEB INSTALL POPUP BANNER (Shows ONLY in browser when NOT installed) */}
        <AnimatePresence>
          {showInstallBanner && !isInstalled && deferredPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-24 z-50 max-w-md bg-slate-900/95 border border-blue-500/50 rounded-3xl p-4 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3 text-white"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                  <Download size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold leading-tight">
                    {lang === 'en' ? 'Install License Saathi' : lang === 'hi' ? 'लाइसेंस साथी ऐप इंस्टॉल करें' : 'લાયસન્સ સાથી એપ ઇન્સ્ટોલ કરો'}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                    {lang === 'en' ? 'Get 100% offline access & faster tests' : 'ઓફલાઇન એક્સેસ અને ઝડપી પરિણામો માટે'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={triggerInstallPrompt}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition"
                >
                  {lang === 'en' ? 'Install' : lang === 'hi' ? 'इंस्टॉल' : 'ઇન્સ્ટોલ'}
                </button>
                <button
                  onClick={dismissInstallBanner}
                  aria-label="Dismiss"
                  className="p-1.5 text-slate-400 hover:text-white transition"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. FOOTER */}
        <footer role="contentinfo" className={`relative z-10 border-t w-full mt-auto py-8 px-6 transition-colors ${
          effectiveTheme === 'light' ? 'border-slate-200 bg-slate-100/90' : 'border-slate-800/80 bg-slate-950/60'
        }`}>
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Car size={20} className="text-blue-500" />
              <span className={`font-bold tracking-tight ${effectiveTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>License Saathi</span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 text-xs text-slate-400 font-medium">
              <Link to="/lost-licence" className="hover:text-red-400 transition-colors">
                {lang === 'en' ? 'Lost Licence Help' : lang === 'hi' ? 'गुमशुदा लाइसेंस सहायता' : 'ખોવાયેલ લાયસન્સ'}
              </Link>
              <span className="text-slate-700">•</span>
              <Link to="/privacy" className="hover:text-blue-500 transition-colors">
                {lang === 'en' ? 'Privacy Policy' : lang === 'hi' ? 'गोपनीयता नीति' : 'પ્રાઇવસી પોલિસી'}
              </Link>
              <span className="text-slate-700">•</span>
              <Link to="/terms" className="hover:text-blue-500 transition-colors">
                {lang === 'en' ? 'Terms & Disclaimer' : lang === 'hi' ? 'नियम और अस्वीकरण' : 'નિયમો અને શરતો'}
              </Link>
            </div>

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