import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, BookOpen, Clock, Bot, ChevronDown, Compass } from 'lucide-react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-50 font-sans selection:bg-blue-500/30">
      
      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Compass className="text-blue-500" size={28} />
            <span className="text-xl font-bold tracking-tight text-white">Licence Saathi</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <button className="flex items-center gap-1 hover:text-white transition">Services <ChevronDown size={14}/></button>
            <Link to="/mock-test" className="hover:text-white transition">Mock Tests</Link>
            <Link to="/learn" className="hover:text-white transition">Road Safety</Link>
            <Link to="/documents" className="hover:text-white transition">Resources</Link>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-sm font-medium text-zinc-300 hover:text-white hidden md:block">Log in</button>
            <Link to="/eligibility" className="bg-white text-zinc-950 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-200 transition">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 pt-20 overflow-hidden">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
            alt="Misty winding road" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/60 to-zinc-950"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            A radically simpler way to <br className="hidden md:block" /> get your driving licence.
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Apply online, learn road rules, and pass your tests with step-by-step guidance—without the confusion.
          </p>

          {/* Integrated Input / CTA */}
          <div className="relative max-w-md mx-auto flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1.5 shadow-2xl transition-all focus-within:bg-white/20 focus-within:border-white/40">
            <input 
              type="tel" 
              placeholder="Enter your mobile number" 
              className="flex-1 bg-transparent px-6 text-white focus:outline-none placeholder-zinc-400 text-sm md:text-base"
            />
            <Link to="/eligibility" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-500 transition-colors shadow-lg">
              Start Journey
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION (Deep Dark Mode) */}
      <section className="bg-zinc-950 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Everything you need to hit the <br className="hidden md:block"/> road safely. All in one place.
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <motion.Link to="/application" whileHover={{ y: -5 }} className="group block bg-zinc-900 border border-white/5 rounded-[2rem] p-10 hover:border-white/10 hover:bg-zinc-800/80 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                <FileText className="text-blue-500" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Guided Applications</h3>
              <p className="text-zinc-400 leading-relaxed font-light">Step-by-step help for Learner’s and Permanent Licences. We cut through the red tape so you don't have to.</p>
            </motion.Link>

            <motion.Link to="/learn" whileHover={{ y: -5 }} className="group block bg-zinc-900 border border-white/5 rounded-[2rem] p-10 hover:border-white/10 hover:bg-zinc-800/80 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="text-emerald-500" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Master the Rules</h3>
              <p className="text-zinc-400 leading-relaxed font-light">Traffic signs and road safety concepts made easy. Interactive flashcards and text-to-speech built in.</p>
            </motion.Link>

            <motion.Link to="/mock-test" whileHover={{ y: -5 }} className="group block bg-zinc-900 border border-white/5 rounded-[2rem] p-10 hover:border-white/10 hover:bg-zinc-800/80 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
                <Clock className="text-purple-500" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Mock Tests</h3>
              <p className="text-zinc-400 leading-relaxed font-light">Prepare for your online learner's test with instant feedback. Real RTO formats to build your confidence.</p>
            </motion.Link>

            <motion.div whileHover={{ y: -5 }} className="group block bg-zinc-900 border border-white/5 rounded-[2rem] p-10 hover:border-white/10 hover:bg-zinc-800/80 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
                <Bot className="text-amber-500" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">24/7 Saathi Support</h3>
              <p className="text-zinc-400 leading-relaxed font-light">Conversational guide to answer your procedural questions instantly. Your personal AI driving consultant.</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-950 border-t border-white/10 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Compass className="text-blue-500" size={24} />
              <span className="text-lg font-bold text-white">Licence Saathi</span>
            </div>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              Empowering Indian citizens with a stress-free, transparent pathway to hitting the road safely.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-tight">Products</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><Link to="/eligibility" className="hover:text-white transition">Eligibility Checker</Link></li>
              <li><Link to="/mock-test" className="hover:text-white transition">Mock Testing Engine</Link></li>
              <li><Link to="/learn" className="hover:text-white transition">Sign Glossary</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 tracking-tight">Legal</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-xs text-zinc-600 font-light text-center md:text-left">
          <p>© 2026 Licence Saathi. All rights reserved.</p>
          <p className="mt-2">Disclaimer: Licence Saathi is an independent helper tool designed to simplify driving licence preparation. It is not affiliated with the official mParivahan portal or the Ministry of Road Transport & Highways.</p>
        </div>
      </footer>
    </div>
  );
}