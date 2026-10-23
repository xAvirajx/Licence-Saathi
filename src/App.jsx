import { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

// Components
import ChatHelper from './components/ChatHelper';

export const AppContext = createContext();

export default function App() {
  const [lang, setLang] = useState('en');

  // Basic global translations (can be expanded later)
  const t = {
    en: { appName: "Licence Saathi" },
    hi: { appName: "लाइसेंस साथी" }
  };

  return (
    <AppContext.Provider value={{ lang, setLang, t }}>
      <Router>
        
        {/* 1. DESKTOP BACKGROUND: Soft gray so the "phone" stands out */}
        <div className="min-h-screen bg-slate-200 flex items-center justify-center">
          
          {/* 2. PHONE SIMULATOR: Acts like a phone frame on desktop, full-screen on mobile */}
          <div className="w-full sm:max-w-[420px] bg-slate-950 min-h-screen sm:min-h-0 sm:h-[90vh] sm:rounded-[2.5rem] sm:shadow-2xl sm:border-[10px] sm:border-slate-800 relative flex flex-col overflow-hidden">
            
            {/* 3. MAIN CONTENT: Fixed the white border & padding issue here! */}
            <main className="flex-1 overflow-y-auto relative bg-slate-950 sm:rounded-[1.8rem]">
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
              
              {/* Floating AI Chatbot */}
              <ChatHelper />
            </main>

          </div>
        </div>

      </Router>
    </AppContext.Provider>
  );
}