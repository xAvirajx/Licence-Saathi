import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { applications, timelineSteps } from '../data/applications';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, FileText, CheckCircle2, Circle, Activity, ShieldCheck, ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TrackApp() {
  const { lang } = useContext(AppContext);
  const [searchInput, setSearchInput] = useState('');
  const [activeApp, setActiveApp] = useState(null);
  const [error, setError] = useState('');

  // Auto-update journey stage
  useEffect(() => {
    localStorage.setItem('licenceJourneyStage', '5');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const formattedInput = searchInput.trim().toUpperCase();
    
    if (applications[formattedInput]) {
      setActiveApp({ id: formattedInput, ...applications[formattedInput] });
      setError('');
    } else {
      setActiveApp(null);
      setError(lang === 'en' ? 'Application not found. Please check the number.' : 'आवेदन नहीं मिला। कृपया नंबर जांचें।');
    }
  };

  const setSample = (id) => {
    setSearchInput(id);
    setActiveApp({ id, ...applications[id] });
    setError('');
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-6 flex flex-col font-sans overflow-hidden">
      {/* Mesh Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-2xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl mb-6 shadow-lg">
            <Activity className="text-emerald-400" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {lang === 'en' ? 'Track Application' : 'आवेदन को ट्रैक करें'}
          </h1>
          <p className="text-slate-400">
            {lang === 'en' ? 'Enter your application number to see live status updates.' : 'लाइव स्थिति अपडेट देखने के लिए अपना आवेदन नंबर दर्ज करें।'}
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl mb-8">
          <form onSubmit={handleSearch} className="relative flex items-center bg-slate-950 border border-slate-700 rounded-2xl p-2 shadow-inner focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all mb-6">
            <Search className="text-slate-500 ml-4" size={24} />
            <input 
              type="text" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
              placeholder={lang === 'en' ? "e.g. LL-948201" : "उदा. LL-948201"} 
              className="flex-1 bg-transparent px-4 py-3 text-white focus:outline-none placeholder-slate-600 uppercase font-mono tracking-wider"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition shadow-md">
              {lang === 'en' ? 'Track' : 'ट्रैक'}
            </button>
          </form>

          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

          {/* Sample Chips for Judges */}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              {lang === 'en' ? 'Try these sample numbers:' : 'इन नमूना संख्याओं का प्रयास करें:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(applications).map(id => (
                <button 
                  key={id} 
                  onClick={() => setSample(id)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-full text-sm font-mono transition"
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Display */}
        <AnimatePresence mode="wait">
          {activeApp && (
            <motion.div 
              key={activeApp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl mb-8"
            >
              <div className="flex justify-between items-start border-b border-slate-800 pb-6 mb-8">
                <div>
                  <div className="text-xs text-slate-400 font-bold tracking-widest uppercase mb-1">{activeApp.type}</div>
                  <div className="text-2xl font-bold text-white font-mono tracking-wide">{activeApp.id}</div>
                  <div className="text-sm text-slate-400 mt-1">{lang === 'en' ? 'Applicant:' : 'आवेदक:'} <span className="text-slate-200">{activeApp.applicant}</span></div>
                </div>
                <ShieldCheck className="text-blue-500 opacity-50" size={48} />
              </div>

              <div className="relative pl-4 space-y-8">
                {/* Vertical Line Background */}
                <div className="absolute left-[27px] top-[10px] bottom-[10px] w-0.5 bg-slate-800 z-0"></div>

                {timelineSteps.map((step, idx) => {
                  const isCompleted = step.id <= activeApp.status;
                  const isCurrent = step.id === activeApp.status;
                  const isPending = step.id > activeApp.status;

                  return (
                    <div key={step.id} className="relative z-10 flex gap-6 items-center">
                      <div className="shrink-0 bg-slate-950 rounded-full">
                        {isCompleted ? (
                          <div className="relative">
                            {isCurrent && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>}
                            <CheckCircle2 className="text-emerald-500 bg-emerald-500/10 rounded-full relative z-10" size={24} />
                          </div>
                        ) : (
                          <Circle className="text-slate-700 bg-slate-950" size={24} />
                        )}
                      </div>
                      
                      <div className={`flex-1 ${isPending ? 'opacity-40' : 'opacity-100'}`}>
                        <h4 className={`text-lg font-bold ${isCurrent ? 'text-emerald-400' : isCompleted ? 'text-white' : 'text-slate-500'}`}>
                          {step.label[lang]}
                        </h4>
                        {isCurrent && (
                          <p className="text-sm text-emerald-500/80 mt-1">
                            {lang === 'en' ? 'Current Status' : 'वर्तमान स्थिति'}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold transition">
             {lang === 'en' ? 'Back to Home' : 'होम पर वापस जाएं'}
          </Link>
        </div>

      </div>
    </div>
  );
}