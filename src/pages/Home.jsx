import { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.toLowerCase().includes("mock") || searchQuery.toLowerCase().includes("test")) {
      navigate('/mock-test');
    } else {
      navigate('/eligibility');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      
      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-blue-200 shadow-lg">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">Licence Saathi</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-blue-600 transition">How it Works</a>
            <Link to="/mock-test" className="hover:text-blue-600 transition">Mock Tests</Link>
            <Link to="/learn" className="hover:text-blue-600 transition">Road Signs</Link>
            <Link to="/documents" className="hover:text-blue-600 transition">FAQs</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/eligibility" className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 shadow-md shadow-blue-200 transition-all active:scale-95">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 flex flex-col p-6 gap-4">
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="font-medium text-slate-600">How it Works</a>
            <Link to="/mock-test" onClick={() => setMobileMenuOpen(false)} className="font-medium text-slate-600">Mock Tests</Link>
            <Link to="/learn" onClick={() => setMobileMenuOpen(false)} className="font-medium text-slate-600">Road Signs</Link>
            <Link to="/eligibility" onClick={() => setMobileMenuOpen(false)} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-center mt-2">Get Started</Link>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Soft Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-100/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-block mb-4 px-4 py-1.5 bg-emerald-50 text-emerald-700 font-medium text-sm rounded-full border border-emerald-200">
            ✨ Stress-free mParivahan assistance
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
            Getting your driving licence <br className="hidden md:block" />
            <span className="text-blue-600">shouldn’t feel like a test.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-normal leading-relaxed">
            Step-by-step guidance, simple mock tests, and instant answers for your mParivahan journey.
          </p>

          {/* Interactive Search/Action Box */}
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto flex items-center bg-white border border-slate-200 rounded-full p-2 shadow-xl shadow-slate-200/50 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. How to apply for Learner's Licence?" 
              className="flex-1 bg-transparent px-6 text-slate-800 focus:outline-none placeholder-slate-400 text-sm md:text-base"
            />
            <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
              Start Now
            </button>
          </form>
        </motion.div>
      </section>

      {/* 3-STEP JOURNEY SECTION */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Your journey, simplified.</h2>
            <p className="text-slate-600 text-lg">Three easy steps to get you on the road safely.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-slate-100 z-0 border-t-2 border-dashed border-slate-200"></div>

            <motion.div whileHover={{ y: -5 }} className="relative z-10 bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
              <div className="w-20 h-20 mx-auto bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <FileCheck size={40} />
              </div>
              <div className="inline-block px-3 py-1 bg-white text-slate-500 text-xs font-bold rounded-full mb-4 shadow-sm border border-slate-100">Step 1</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Check Eligibility</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Find out exactly what documents you need and if you qualify, without reading long government PDFs.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="relative z-10 bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
              <div className="w-20 h-20 mx-auto bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <CheckCircle2 size={40} />
              </div>
              <div className="inline-block px-3 py-1 bg-white text-slate-500 text-xs font-bold rounded-full mb-4 shadow-sm border border-slate-100">Step 2</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Practice Easy Tests</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Take stress-free mock exams that look and feel exactly like the real RTO online test.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="relative z-10 bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
              <div className="w-20 h-20 mx-auto bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <Navigation size={40} />
              </div>
              <div className="inline-block px-3 py-1 bg-white text-slate-500 text-xs font-bold rounded-full mb-4 shadow-sm border border-slate-100">Step 3</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Apply with Confidence</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Navigate the mParivahan portal knowing exactly what to click, upload, and expect next.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <Link to="/mock-test" className="group block bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="text-indigo-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Stress-Free Mock Exams</h3>
              <p className="text-slate-600 leading-relaxed font-light">Practice tests that mirror the actual learner's test format. Build your confidence before the real thing.</p>
            </Link>

            <Link to="/learn" className="group block bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Map className="text-emerald-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Visual Traffic Signs</h3>
              <p className="text-slate-600 leading-relaxed font-light">Interactive flashcards with visual aids and audio reading to help you learn road safety concepts fast.</p>
            </Link>

            <div className="group block bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI Saathi Assistant</h3>
              <p className="text-slate-600 leading-relaxed font-light">Ask any procedural question in plain language. Our smart assistant speaks both English and Hindi seamlessly.</p>
            </div>

          </div>
        </div>
      </section>

      {/* CLEAN FOOTER */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <ShieldCheck className="text-blue-600" size={28} />
              <span className="text-xl font-bold text-slate-900">Licence Saathi</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs">
              Making Indian roads safer by making the licensing process simpler and more accessible for everyone.
            </p>
          </div>
          
          <div className="flex gap-12 text-center md:text-left">
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><Link to="/eligibility" className="hover:text-blue-600">Check Eligibility</Link></li>
                <li><Link to="/mock-test" className="hover:text-blue-600">Take a Mock Test</Link></li>
                <li><Link to="/learn" className="hover:text-blue-600">Learn Road Signs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Support</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><Link to="/documents" className="hover:text-blue-600">Required Documents</Link></li>
                <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600">Terms of Use</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-100 text-xs text-slate-400 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Licence Saathi. All rights reserved.</p>
          <p className="max-w-xl text-center md:text-right">
            Disclaimer: Licence Saathi is an independent educational tool. We are not affiliated with the Ministry of Road Transport & Highways or the official Parivahan Sewa portal.
          </p>
        </div>
      </footer>
    </div>
  );
}