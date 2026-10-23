import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContext } from '../App';
import { 
  ShieldCheck, CheckCircle2, Circle, ArrowRight,
  Menu, X, Clock, Map as MapIcon, MessageSquare
} from 'lucide-react';

export default function Home() {
  const { t } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStage, setActiveStage] = useState(() => {
    const saved = localStorage.getItem('licenceJourneyStage');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('licenceJourneyStage', activeStage.toString());
  }, [activeStage]);

  const openFaqChat = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent('open-chat-helper'));
  };

  const journeyOptions = [
    { id: 0, label: t.journey.opt0.label, subtitle: t.journey.opt0.sub },
    { id: 3, label: t.journey.opt3.label, subtitle: t.journey.opt3.sub },
    { id: 4, label: t.journey.opt4.label, subtitle: t.journey.opt4.sub },
    { id: 5, label: t.journey.opt5.label, subtitle: t.journey.opt5.sub }
  ];

  const stages = [
    { title: t.stages.s1.title, action: t.stages.s1.action, path: "/eligibility" },
    { title: t.stages.s2.title, action: t.stages.s2.action, path: "/application" },
    { title: t.stages.s3.title, action: t.stages.s3.action, path: "/mock-test" },
    { title: t.stages.s4.title, action: t.stages.s4.action, path: "/permanent-licence" },
    { title: t.stages.s5.title, action: t.stages.s5.action, path: "/driving-test" },
    { title: t.stages.s6.title, action: t.stages.s6.action, path: "/track-app" }
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 overflow-hidden pb-12">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <nav className="relative z-50 w-full py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-50 bg-slate-950/0">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="text-blue-400" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">{t.nav.title}</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link to="/mock-test" className="hover:text-white transition-colors">{t.nav.mockTest}</Link>
            <Link to="/learn" className="hover:text-white transition-colors">{t.nav.roadSigns}</Link>
            <a href="#faqs" onClick={openFaqChat} className="hover:text-white transition-colors cursor-pointer">{t.nav.faqs}</a>
          </div>

          <button className="md:hidden text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-slate-800 flex flex-col p-6 gap-6 shadow-2xl z-50">
            <Link to="/mock-test" onClick={() => setMobileMenuOpen(false)} className="font-medium text-slate-300 text-lg">{t.nav.mockTest}</Link>
            <Link to="/learn" onClick={() => setMobileMenuOpen(false)} className="font-medium text-slate-300 text-lg">{t.nav.roadSigns}</Link>
            <a href="#faqs" onClick={openFaqChat} className="font-medium text-slate-300 text-lg cursor-pointer">{t.nav.faqs}</a>
          </div>
        )}
      </nav>

      <section className="relative z-10 pt-4 pb-8 px-6 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-emerald-400 font-medium text-sm rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          {t.home.heroTag}
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-4">
          {t.home.heroTitle} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            {t.home.heroHighlight}
          </span>
        </h1>
      </section>

      <section className="relative z-10 px-6 max-w-4xl mx-auto mb-16">
        <h2 className="text-xl font-bold text-white mb-6 text-center">{t.home.journeyTitle}</h2>
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

        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl">
          <h3 className="text-lg font-bold text-slate-300 mb-8">{t.home.mapTitle}</h3>
          
          <div className="space-y-6 relative">
            <div className="absolute left-[15px] top-[10px] bottom-[30px] w-0.5 bg-slate-800 z-0"></div>

            {stages.map((stage, idx) => {
              const isCompleted = idx < activeStage;
              const isCurrent = idx === activeStage;
              const isLocked = idx > activeStage;

              return (
                <div key={idx} className="relative z-10 flex gap-4 items-start">
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

                  <div className={`flex-1 ${isLocked ? 'opacity-50' : 'opacity-100'}`}>
                    <h4 className={`text-lg font-bold ${isCurrent ? 'text-blue-400' : 'text-white'}`}>
                      {idx + 1}. {stage.title}
                    </h4>
                    
                    {isCurrent && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                        <p className="text-sm text-slate-400 mb-3">{t.home.nextStepLabel}</p>
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

      <section className="relative z-10 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <Link to="/mock-test" className="group block bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-800/80 hover:border-slate-700 transition-all duration-300">
              <div className="w-12 h-12 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="text-indigo-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.features.mock.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">{t.features.mock.desc}</p>
            </Link>

            <Link to="/learn" className="group block bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-800/80 hover:border-slate-700 transition-all duration-300">
              <div className="w-12 h-12 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapIcon className="text-emerald-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.features.signs.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">{t.features.signs.desc}</p>
            </Link>

            <button onClick={openFaqChat} className="text-left group block bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-800/80 hover:border-slate-700 transition-all duration-300">
              <div className="w-12 h-12 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.features.ai.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">{t.features.ai.desc}</p>
            </button>

          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-slate-800/80 mt-12 pt-12 pb-6 px-6 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <ShieldCheck className="text-blue-400" size={28} />
              <span className="text-xl font-bold text-white">{t.nav.title}</span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              {t.footer.mission}
            </p>
          </div>
          
          <div className="flex gap-16 text-center md:text-left">
            <div>
              <h4 className="font-semibold text-white mb-4">{t.footer.quickLinks}</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link to="/eligibility" className="hover:text-blue-400 transition-colors">{t.stages.s1.action}</Link></li>
                <li><Link to="/mock-test" className="hover:text-blue-400 transition-colors">{t.nav.mockTest}</Link></li>
                <li><Link to="/learn" className="hover:text-blue-400 transition-colors">{t.nav.roadSigns}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">{t.footer.support}</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link to="/documents" className="hover:text-blue-400 transition-colors">{t.footer.reqDocs}</Link></li>
                <li><a href="#faqs" onClick={openFaqChat} className="hover:text-blue-400 transition-colors cursor-pointer">{t.nav.faqs}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800/80 text-xs text-slate-500 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Licence Saathi. All rights reserved.</p>
          <p className="max-w-xl md:text-right">
            {t.footer.disclaimer}
          </p>
        </div>
      </footer>
    </div>
  );
}