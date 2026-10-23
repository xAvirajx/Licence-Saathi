import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, Download, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Settings() {
  const { lang, setLang } = useContext(AppContext);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Catch the PWA install prompt from the browser
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 mt-2">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 text-brand-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        
        {/* Language Selection */}
        <div>
          <h2 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
            <Globe size={20} className="text-brand-500"/> Language / भाषा
          </h2>
          <div className="flex gap-3">
            <button 
              onClick={() => setLang('en')} 
              className={`flex-1 py-3 rounded-xl font-bold border-2 transition-colors ${lang === 'en' ? 'bg-brand-50 border-brand-500 text-brand-700' : 'border-gray-200 text-gray-600 hover:border-brand-300'}`}
            >
              English
            </button>
            <button 
              onClick={() => setLang('hi')} 
              className={`flex-1 py-3 rounded-xl font-bold border-2 transition-colors ${lang === 'hi' ? 'bg-brand-50 border-brand-500 text-brand-700' : 'border-gray-200 text-gray-600 hover:border-brand-300'}`}
            >
              हिंदी
            </button>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* PWA Install Button */}
        <div>
          <h2 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
            <Download size={20} className="text-brand-500"/> Install Offline App
          </h2>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-4 text-sm text-blue-800 flex gap-2">
            <Info size={20} className="shrink-0 mt-0.5"/>
            <p>Install Licence Saathi on your phone to use it without internet access!</p>
          </div>
          
          <button 
            onClick={handleInstall}
            disabled={!deferredPrompt}
            className="w-full py-3.5 bg-brand-600 disabled:bg-gray-300 disabled:text-gray-500 text-white font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Download size={20} />
            {deferredPrompt ? "Install App Now" : "App Already Installed (or not supported)"}
          </button>
        </div>

      </div>
    </motion.div>
  );
}