import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  FileCheck, 
  CheckCircle2, 
  Navigation, 
  MessageSquare, 
  Map, 
  Clock,
  Menu,
  X
} from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.toLowerCase().includes("mock") || searchQuery.toLowerCase().includes("test")) {
      navigate('/mock-test');
    } else {
      navigate('/eligibility');
    }
  };

  const handleComingSoon = (e) => {
    e.preventDefault();
    alert("This page is being finalized for the hackathon!");
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 overflow-hidden pb-12">
      
      {/* ATMOSPHERIC MESH GRADIENTS */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* IN-FLOW NAVIGATION (Fixes the Overlap Issue) */}
      <nav className="relative z-10 w-full py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="text-blue-400" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Licence Saathi</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <Link to="/mock-test" className="hover:text-white transition-colors">Mock Tests</Link>
            <Link to="/learn" className="hover:text-white transition-colors">Road Signs</Link>
            <a href="#faqs" onClick={handleComingSoon} className="hover:text-white transition-colors">FAQs</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/eligibility" className="bg-blue-500/10 border border-blue-500/50 text-blue-400 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 flex flex-col p-6 gap-4 z-50 shadow-2xl">
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="font-medium text-slate-300">How it Works</a>
            <Link to="/mock-test" onClick={() => setMobileMenuOpen(false)} className="font-medium text-slate-300">Mock Tests</Link>
            <Link to="/learn" onClick={() => setMobileMenuOpen(false)} className="font-medium text-slate-300">Road Signs</Link>
            <Link to="/eligibility" onClick={() => setMobileMenuOpen(false)} className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-center mt-2">Get Started</Link>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-20 pb-24 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-emerald-400 font-medium text-sm rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Stress-free mParivahan assistance
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
            Getting your driving licence <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              shouldn’t feel like a test.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Step-by-step guidance, simple mock tests, and instant answers for your mParivahan journey.
          </p>

          {/* Search/Action Box */}
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto flex items-center bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-full p-2 shadow-2xl focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. How to apply for Learner's Licence?" 
              className="flex-1 bg-transparent px-6 text-white focus:outline-none placeholder-slate-500 text-sm md:text-base"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              Start Now
            </button>
          </form>
        </motion.div>
      </section>

      {/* 3-STEP JOURNEY SECTION */}
      <section id="how-it-works" className="relative z-10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your journey, simplified.</h2>
            <p className="text-slate-400 text-lg">Three easy steps to get you on the road safely.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 z-0"></div>

            <motion.div whileHover={{ y: -5 }} className="relative z-10 bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-800/80 text-center hover:bg-slate-800/50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-slate-800 border border-slate-700 text-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <FileCheck size={32} />
              </div>
              <div className="inline-block px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-full mb-4 border border-slate-700">Step 1</div>
              <h3 className="text-xl font-bold text-white mb-2">Check Eligibility</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Find out exactly what documents you need and if you qualify, without reading long PDFs.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="relative z-10 bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-800/80 text-center hover:bg-slate-800/50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-slate-800 border border-slate-700 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <CheckCircle2 size={32} />
              </div>
              <div className="inline-block px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-full mb-4 border border-slate-700">Step 2</div>
              <h3 className="text-xl font-bold text-white mb-2">Practice Easy Tests</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Take stress-free mock exams that look and feel exactly like the real RTO online test.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="relative z-10 bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-800/80 text-center hover:bg-slate-800/50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-slate-800 border border-slate-700 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <Navigation size={32} />
              </div>
              <div className="inline-block px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-full mb-4 border border-slate-700">Step 3</div>
              <h3 className="text-xl font-bold text-white mb-2">Apply with Confidence</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Navigate the mParivahan portal knowing exactly what to click, upload, and expect next.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <Link to="/mock-test" className="group block bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-800/80 hover:border-slate-700 transition-all duration-300">
              <div className="w-12 h-12 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="text-indigo-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Stress-Free Mock Exams</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">Practice 15-question tests that mirror the actual learner's test format. Build your confidence before the real thing.</p>
            </Link>

            <Link to="/learn" className="group block bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-800/80 hover:border-slate-700 transition-all duration-300">
              <div className="w-12 h-12 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Map className="text-emerald-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Visual Traffic Signs</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">Interactive flashcards with visual aids and audio reading to help you learn road safety concepts fast.</p>
            </Link>

            <div className="group block bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-800/80 hover:border-slate-700 transition-all duration-300">
              <div className="w-12 h-12 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Saathi Assistant</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">Ask any procedural question in plain language. Our smart assistant speaks both English and Hindi seamlessly.</p>
            </div>

          </div>
        </div>
      </section>

      {/* CLEAN FOOTER */}
      <footer className="relative z-10 border-t border-slate-800/80 mt-12 pt-12 pb-6 px-6 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <ShieldCheck className="text-blue-400" size={28} />
              <span className="text-xl font-bold text-white">Licence Saathi</span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              Making Indian roads safer by making the licensing process simpler and more accessible for everyone.
            </p>
          </div>
          
          <div className="flex gap-16 text-center md:text-left">
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link to="/eligibility" className="hover:text-blue-400 transition-colors">Check Eligibility</Link></li>
                <li><Link to="/mock-test" className="hover:text-blue-400 transition-colors">Take a Mock Test</Link></li>
                <li><Link to="/learn" className="hover:text-blue-400 transition-colors">Learn Road Signs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link to="/documents" className="hover:text-blue-400 transition-colors">Required Documents</Link></li>
                <li><a href="#" onClick={handleComingSoon} className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" onClick={handleComingSoon} className="hover:text-blue-400 transition-colors">Terms of Use</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800/80 text-xs text-slate-500 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Licence Saathi. All rights reserved.</p>
          <p className="max-w-xl md:text-right">
            Disclaimer: Licence Saathi is an independent educational tool. We are not affiliated with the Ministry of Road Transport & Highways or the official Parivahan Sewa portal.
          </p>
        </div>
      </footer>
    </div>
  );
}