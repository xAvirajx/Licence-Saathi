import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, CheckCircle2, Circle, ArrowRight,
  Menu, X, Map as MapIcon, Clock, MessageSquare, Play
} from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Load saved progress from localStorage (default to 0: Just starting)
  const [activeStage, setActiveStage] = useState(() => {
    const saved = localStorage.getItem('licenceJourneyStage');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('licenceJourneyStage', activeStage.toString());
  }, [activeStage]);

  const navigate = useNavigate();

  const handleComingSoon = (e) => {
    e.preventDefault();
    alert("This page is being finalized for the hackathon!");
  };

  const journeyOptions = [
    { id: 0, label: "Just starting", subtitle: "I need to check rules & apply" },
    { id: 3, label: "I have a learner's licence", subtitle: "I am waiting to get my permanent DL" },
    { id: 4, label: "I've booked my driving test", subtitle: "I need to prepare for the test day" },
    { id: 5, label: "I've applied & waiting", subtitle: "I want to track my DL status" }
  ];

  const stages = [
    { title: "Check you can apply", action: "Check Eligibility", path: "/eligibility" },
    { title: "Apply for a learner's licence", action: "Start Application", path: "/application" },
    { title: "Pass the learner's test", action: "Take Mock Test", path: "/mock-test" },
    { title: "Wait 30 days & apply for permanent", action: "Book DL Slot", path: "/permanent-licence" },
    { title: "Pass the driving test", action: "Prepare for Test", path: "/driving-test" },
    { title: "Receive your licence", action: "Track Application", path: "/track-app" }
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 overflow-hidden pb-12">
      
      {/* ATMOSPHERIC MESH GRADIENTS */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none"></div>

      {/* NAVIGATION */}
      <nav className="relative z-10 w-full py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="text-blue-400" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Licence Saathi</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link to="/mock-test" className="hover:text-white transition-colors">Mock Tests</Link>
            <Link to="/learn" className="hover:text-white transition-colors">Road Signs</Link>
            <a href="#faqs" onClick={handleComingSoon} className="hover:text-white transition-colors">FAQs</a>
          </div>

          <button className="md:hidden text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 flex flex-col p-6 gap-4 z-50 shadow-2xl">
            <Link to="/mock-test" onClick={() => setMobileMenuOpen(false)} className="font-medium text-slate-300">Mock Tests</Link>
            <Link to="/learn" onClick={() => setMobileMenuOpen(false)} className="font-medium text-slate-300">Road Signs</Link>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-10 pb-8 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-4">
          Getting your driving licence <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            shouldn’t feel like a test.
          </span>
        </h1>
      </section>

      {/* WHERE ARE YOU IN YOUR JOURNEY? */}
      <section className="relative z-10 px-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-6 text-center">Where are you in your licence journey?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {journeyOptions.map((opt) => (
            <button 
              key={opt.id}
              onClick={() => setActiveStage(opt.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                activeStage === opt.id 
                  ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-white text-lg">{opt.label}</div>
              <div className="text-slate-400 text-sm">{opt.subtitle}</div>
            </button>
          ))}
        </div>

        {/* 6-STAGE JOURNEY MAP */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-10">
          <h3 className="text-lg font-bold text-slate-300 mb-8">Your Journey Map</h3>
          
          <div className="space-y-6 relative">
            {/* Vertical Connecting Line */}
            <div className="absolute left-[15px] top-[10px] bottom-[30px] w-0.5 bg-slate-800 z-0"></div>

            {stages.map((stage, idx) => {
              const isCompleted = idx < activeStage;
              const isCurrent = idx === activeStage;
              const isLocked = idx > activeStage;

              return (
                <div key={idx} className="relative z-10 flex gap-4 items-start">
                  {/* Status Icon */}
                  <div className="mt-1 shrink-0 bg-slate-950 rounded-full">
                    {isCompleted ? (
                      <CheckCircle2 className="text-emerald-500 bg-emerald-500/10 rounded-full" size={32} />
                    ) : isCurrent ? (
                      <div className="relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-40"></span>
                        <Circle className="text-blue-500 fill-blue-500/20" size={32} />
                      </div>
                    ) : (
                      <Circle className="text-slate-700" size={32} />
                    )}
                  </div>

                  {/* Content & Action */}
                  <div className={`flex-1 ${isLocked ? 'opacity-50' : 'opacity-100'}`}>
                    <h4 className={`text-lg font-bold ${isCurrent ? 'text-blue-400' : 'text-white'}`}>
                      {idx + 1}. {stage.title}
                    </h4>
                    
                    {isCurrent && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                        <p className="text-sm text-slate-400 mb-3">This is your next step. Let's get it done.</p>
                        <Link 
                          to={stage.path}
                          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-semibold transition-colors shadow-lg shadow-blue-500/20"
                        >
                          {stage.action} <ArrowRight size={18} />
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLEAN FOOTER */}
      <footer className="relative z-10 border-t border-slate-800/80 mt-16 pt-8 pb-6 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto text-xs text-slate-500 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p>Prototype with sample data. Check rules and fees with your state's RTO.</p>
        </div>
      </footer>
    </div>
  );
}