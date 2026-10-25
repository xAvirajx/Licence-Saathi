import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Download, Share, PlusSquare, 
  CheckCircle2, Zap 
} from 'lucide-react';

export default function InstallModal() {
  const { lang, isInstalled, deferredPrompt, triggerInstallPrompt } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. Never show if already running inside the installed standalone PWA
    if (isInstalled) return;

    // 2. Check if user already dismissed or installed in this browser
    const hasSeenModal = localStorage.getItem('ls_pwa_modal_dismissed');
    if (hasSeenModal) return;

    // 3. Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // 4. Trigger pop up after 2.5 seconds on the homepage
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, [isInstalled]);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem('ls_pwa_modal_dismissed', 'true');
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await triggerInstallPrompt();
      setIsOpen(false);
      localStorage.setItem('ls_pwa_modal_dismissed', 'true');
    }
  };

  if (!isOpen || isInstalled) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden text-white"
        >
          {/* Subtle Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={handleDismiss}
            aria-label="Close"
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition rounded-full hover:bg-slate-800"
          >
            <X size={20} />
          </button>

          {/* Logo & Header */}
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-slate-950 p-1 border border-slate-800 shadow-lg shadow-blue-600/20 shrink-0">
              <img src="/pwa-192x192.svg" alt="License Saathi" className="w-full h-full rounded-xl object-contain" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800 mb-1">
                <Zap size={11} />
                <span>Fast & Offline Ready</span>
              </div>
              <h3 className="text-lg font-extrabold text-white leading-tight">
                {lang === 'en' ? 'Install License Saathi' : lang === 'hi' ? 'लाइसेंस साथी ऐप इंस्टॉल करें' : 'લાયસન્સ સાથી એપ ઇન્સ્ટોલ કરો'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'en' ? 'Universal Web App for Laptops & Mobile' : 'લેપટોપ અને મોબાઈલ માટે સત્તાવાર એપ'}
              </p>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-2 mb-6 bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-2xl text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              <span>Full offline access to RTO mock tests & sign flashcards</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              <span>Zero-PII guarantee: 100% private with no tracking</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              <span>Direct install on Laptops, Android & iPhones</span>
            </div>
          </div>

          {/* Conditional Guidance: iOS Safari vs. Laptop / Android */}
          {isIOS ? (
            <div className="space-y-3 bg-blue-950/30 border border-blue-900/50 p-4 rounded-2xl">
              <p className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                How to install on iPhone / iPad:
              </p>
              <div className="space-y-2 text-xs text-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                    <Share size={14} />
                  </div>
                  <span>1. Tap the <strong>Share</strong> button at bottom of Safari</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                    <PlusSquare size={14} />
                  </div>
                  <span>2. Scroll down and tap <strong>Add to Home Screen</strong></span>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="w-full mt-2 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs transition"
              >
                Got It
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              <button
                onClick={handleInstallClick}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <Download size={18} />
                <span>{lang === 'en' ? 'Install App Now' : lang === 'hi' ? 'अभी इंस्टॉल करें' : 'હમણાં ઇન્સ્ટોલ કરો'}</span>
              </button>

              <button
                onClick={handleDismiss}
                className="w-full py-2.5 text-slate-400 hover:text-slate-200 font-semibold text-xs transition text-center"
              >
                {lang === 'en' ? 'Continue in Browser' : 'બ્રાઉઝરમાં ચાલુ રાખો'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}