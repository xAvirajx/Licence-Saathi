import { useState, createContext, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Settings as SettingsIcon, WifiOff } from 'lucide-react';
import { en } from './i18n/en';
import { hi } from './i18n/hi';
import { gu } from './i18n/gu';

// Pages
import Home from './pages/Home';
import Eligibility from './pages/Eligibility';
import Documents from './pages/Documents';
import LlApplication from './pages/LlApplication';
import MockTest from './pages/MockTest';
import TrackApp from './pages/TrackApp';
import PermanentLicence from './pages/PermanentLicence';
import Learn from './pages/Learn';
import DrivingTest from './pages/DrivingTest';
import Settings from './pages/Settings';
import ChatHelper from './components/ChatHelper';

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
              {lang === 'en' && "You are offline. Journey map, documents, mock tests, and rules remain fully available."}
              {lang === 'hi' && "आप ऑफ़लाइन हैं। यात्रा मानचित्र, दस्तावेज़, मॉक टेस्ट और नियम पूरी तरह उपलब्ध हैं।"}
              {lang === 'gu' && "તમે ઓફલાઇન છો. પ્રવાસ નકશો, દસ્તાવેજો, અને મોક ટેસ્ટ ઉપલબ્ધ છે."}
            </span>
          </div>
        )}

        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/application" element={<LlApplication />} />
            <Route path="/mock-test" element={<MockTest />} />
            <Route path="/track-app" element={<TrackApp />} />
            <Route path="/permanent-licence" element={<PermanentLicence />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/driving-test" element={<DrivingTest />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        
        <ChatHelper />
        
        <Link to="/settings" className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-slate-900 border border-slate-700 text-slate-300 rounded-full flex items-center justify-center shadow-lg shadow-black/50 hover:bg-slate-800 hover:text-white transition-all">
          <SettingsIcon size={24} />
        </Link>
      </div>
    </AppContext.Provider>
  );
}