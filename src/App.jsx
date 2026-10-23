import { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';

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

  // Basic global translations
  const t = {
    en: { appName: "Licence Saathi" },
    hi: { appName: "लाइसेंस साथी" }
  };

  return (
    <AppContext.Provider value={{ lang, setLang, t }}>
      
      {/* 1. TRUE RESPONSIVE WRAPPER: Full width, dark theme base */}
      <div className="w-full min-h-screen bg-slate-950 flex flex-col relative overflow-x-hidden text-slate-50 font-sans">
        
        {/* 2. MAIN CONTENT AREA */}
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
        
        {/* Floating AI Chatbot */}
        <ChatHelper />
      </div>

    </AppContext.Provider>
  );
}