import { Routes, Route } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import { en } from './i18n/en';
import { hi } from './i18n/hi';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Eligibility from './pages/Eligibility';
import Documents from './pages/Documents';
import LlApplication from './pages/LlApplication';
import MockTest from './pages/MockTest';
import TrackApp from './pages/TrackApp';
import PermanentLicence from './pages/PermanentLicence';
import Learn from './pages/Learn';
import DrivingTest from './pages/DrivingTest';
import ChatHelper from './components/ChatHelper';
import Settings from './pages/Settings';

// Create a global context for language and user progress
export const AppContext = createContext();

function App() {
  // Load language from localStorage so it persists on reload
  const [lang, setLang] = useState(() => localStorage.getItem('saathi_lang') || 'en');
  const t = lang === 'en' ? en : hi;

  useEffect(() => {
    localStorage.setItem('saathi_lang', lang);
  }, [lang]);

  return (
    <AppContext.Provider value={{ lang, setLang, t }}>
      {/* Mobile-first layout constraint: Centers on desktop, full width on mobile */}
      <div className="min-h-screen flex flex-col bg-gray-50 max-w-[480px] mx-auto shadow-2xl relative overflow-hidden sm:border-x sm:border-gray-200">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-4 pb-12">
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
          <ChatHelper />
        </main>

        <footer className="bg-gray-100 text-center p-3 text-xs text-gray-500 border-t border-gray-200 font-medium">
          {t.common.prototypeWarning}
        </footer>
      </div>
    </AppContext.Provider>
  );
}

export default App;