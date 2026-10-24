import { useState, createContext, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Settings as SettingsIcon, WifiOff } from 'lucide-react';
import { en } from './i18n/en';
import { hi } from './i18n/hi';
import { gu } from './i18n/gu';
import ChatHelper from './components/ChatHelper';

// Lazy load pages for maximum performance
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
const Privacy = lazy(() => import('./pages/Privacy')); // Added Privacy Policy
const Terms = lazy(() => import('./pages/Terms'));     // Added Terms of Service
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="w-full min-h-[50vh] flex items-center justify-center">
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

  return (
    <AppContext.Provider value={{ lang, setLang, textSize, setTextSize, highContrast, setHighContrast, readAloud, setReadAloud, t }}>
      <div className={`w-full min-h-screen bg-slate-950 flex flex-col relative overflow-x-hidden text-slate-50 font-sans transition-all duration-300 ${highContrast ? 'contrast-150 saturate-150 brightness-110' : ''}`}>
        
        {!isOnline && (
          <div className="bg-amber-500 text-slate-950 px-4 py-2 font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 sticky top-0 z-50 shadow-md">
            <WifiOff size={16} />
            <span>
              {lang === 'en' && "You are offline. Journey map, documents, and mock tests remain available."}
              {lang === 'hi' && "आप ऑफ़लाइन हैं। यात्रा मानचित्र, दस्तावेज़ और मॉक टेस्ट उपलब्ध हैं।"}
              {lang === 'gu' && "તમે ઓફલાઇન છો. પ્રવાસ નકશો, દસ્તાવેજો અને મોક ટેસ્ટ ઉપલબ્ધ છે."}
            </span>
          </div>
        )}

        <main className="flex-1 w-full">
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
        
        <ChatHelper />
        
        <Link 
          to="/settings" 
          aria-label="App Settings"
          className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-slate-900 border border-slate-700 text-slate-300 rounded-full flex items-center justify-center shadow-lg shadow-black/50 hover:bg-slate-800 hover:text-white transition-all"
        >
          <SettingsIcon size={24} />
        </Link>
      </div>
    </AppContext.Provider>
  );
}