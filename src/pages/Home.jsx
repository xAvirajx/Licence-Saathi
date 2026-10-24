import { useContext, useState } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import { Car, FileText, CheckCircle, Navigation, PlayCircle, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { lang } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    { 
      icon: <CheckCircle size={24} />, 
      path: "/eligibility", 
      title: { 
        en: "Eligibility Check", 
        hi: "पात्रता जांच", 
        gu: "પાત્રતા તપાસ" 
      }, 
      desc: { 
        en: "See if you meet age & vehicle rules.", 
        hi: "देखें कि क्या आप उम्र और वाहन नियमों को पूरा करते हैं।", 
        gu: "ઉંમર અને વાહનના નિયમો તપાસો." 
      } 
    },
    { 
      icon: <FileText size={24} />, 
      path: "/documents", 
      title: { 
        en: "Documents Needed", 
        hi: "आवश्यक दस्तावेज़", 
        gu: "જરૂરી દસ્તાવેજો" 
      }, 
      desc: { 
        en: "Get the exact list of required proofs.", 
        hi: "आवश्यक प्रमाणों की सटीक सूची प्राप्त करें।", 
        gu: "જરૂરી પુરાવાઓની ચોક્કસ સૂચિ મેળવો." 
      } 
    },
    { 
      icon: <PlayCircle size={24} />, 
      path: "/mock-test", 
      title: { 
        en: "Mock Test", 
        hi: "मॉक टेस्ट", 
        gu: "મોક ટેસ્ટ" 
      }, 
      desc: { 
        en: "Practice the 15-question LL test.", 
        hi: "15-प्रश्नों वाले एलएल टेस्ट का अभ्यास करें।", 
        gu: "15-પ્રશ્નોવાળા LL ટેસ્ટની પ્રેક્ટિસ કરો." 
      } 
    },
    { 
      icon: <Navigation size={24} />, 
      path: "/track-app", 
      title: { 
        en: "Track Status", 
        hi: "स्थिति ट्रैक करें", 
        gu: "સ્ટેટસ ટ્રેક કરો" 
      }, 
      desc: { 
        en: "Track your real-time RTO application.", 
        hi: "अपने रीयल-टाइम आरटीओ आवेदन को ट्रैक करें।", 
        gu: "તમારી RTO અરજીનું સ્ટેટસ તપાસો." 
      } 
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 overflow-hidden pb-12 flex flex-col">
      
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-20 w-full p-6 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Car size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Licence Saathi</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-300">
          <Link to="/application" className="hover:text-white transition">
            {lang === 'en' && 'Apply Now'}
            {lang === 'hi' && 'अभी आवेदन करें'}
            {lang === 'gu' && 'હવે અરજી કરો'}
          </Link>
          <Link to="/learn" className="hover:text-white transition">
            {lang === 'en' && 'Learn Signs'}
            {lang === 'hi' && 'संकेत सीखें'}
            {lang === 'gu' && 'સાઇન શીખો'}
          </Link>
          <Link to="/permanent-licence" className="hover:text-white transition">
            {lang === 'en' && 'Permanent DL'}
            {lang === 'hi' && 'स्थायी डीएल'}
            {lang === 'gu' && 'કાયમી DL'}
          </Link>
        </nav>

        {/* LIGHTHOUSE FIX: Added aria-label="Toggle Menu" */}
        <button 
          onClick={() => setMobileMenuOpen(true)} 
          aria-label="Toggle Menu"
          className="md:hidden text-slate-300 hover:text-white"
        >
          <Menu size={28} />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-slate-950 flex flex-col"
          >
            <div className="p-6 flex justify-end">
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white p-2">
                <X size={32} />
              </button>
            </div>
            
            <nav className="flex flex-col items-center justify-center flex-1 gap-8 text-2xl font-bold">
              <Link to="/application" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-blue-400 transition">
                {lang === 'en' && 'Apply Now'}
                {lang === 'hi' && 'अभी आवेदन करें'}
                {lang === 'gu' && 'હવે અરજી કરો'}
              </Link>
              <Link to="/learn" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-blue-400 transition">
                {lang === 'en' && 'Learn Signs'}
                {lang === 'hi' && 'संकेत सीखें'}
                {lang === 'gu' && 'સાઇન શીખો'}
              </Link>
              <Link to="/permanent-licence" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-blue-400 transition">
                {lang === 'en' && 'Permanent DL'}
                {lang === 'hi' && 'स्थायी डीएल'}
                {lang === 'gu' && 'કાયમી DL'}
              </Link>
              <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-blue-400 transition">
                {lang === 'en' && 'Settings'}
                {lang === 'hi' && 'सेटिंग्स'}
                {lang === 'gu' && 'સેટિંગ્સ'}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center text-center px-6 mt-10 md:mt-20 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          
          <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-sm font-medium tracking-wide mb-6 shadow-lg backdrop-blur-sm">
           <span className="relative flex h-2 w-2">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
           </span>
           {lang === 'en' && 'Stress-free mParivahan assistance'}
           {lang === 'hi' && 'तनाव मुक्त एम-परिवहन सहायता'}
           {lang === 'gu' && 'તણાવ મુક્ત પરિવહન સહાય'}
          </span>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
            {lang === 'en' && "Getting your driving licence shouldn't feel like a test."}
            {lang === 'hi' && "ड्राइविंग लाइसेंस प्राप्त करना एक परीक्षा जैसा नहीं लगना चाहिए।"}
            {lang === 'gu' && "ડ્રાઇવિંગ લાઇસન્સ મેળવવું મુશ્કેલ ન હોવું જોઈએ."}
          </h1>
          
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {lang === 'en' && 'Navigate the Indian RTO process with ease. Check eligibility, gather documents, practice tests, and track your application all in one place.'}
            {lang === 'hi' && 'भारतीय आरटीओ प्रक्रिया को आसानी से नेविगेट करें। पात्रता जांचें, दस्तावेज़ एकत्र करें, अभ्यास परीक्षण करें, और एक ही स्थान पर अपने आवेदन को ट्रैक करें।'}
            {lang === 'gu' && 'ભારતીય RTO પ્રક્રિયાને સરળતાથી સમજો. પાત્રતા તપાસો, દસ્તાવેજો એકત્ર કરો, પ્રેક્ટિસ ટેસ્ટ આપો અને તમારી અરજીને એક જ જગ્યાએ ટ્રેક કરો.'}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/application" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
              {lang === 'en' && 'Start Journey'}
              {lang === 'hi' && 'यात्रा शुरू करें'}
              {lang === 'gu' && 'શરૂઆત કરો'} 
              <ArrowRight size={20} />
            </Link>
            
            <Link to="/mock-test" className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-8 py-4 rounded-xl font-bold transition flex items-center justify-center">
              {lang === 'en' && 'Take Mock Test'}
              {lang === 'hi' && 'मॉक टेस्ट लें'}
              {lang === 'gu' && 'મોક ટેસ્ટ આપો'}
            </Link>
          </div>

        </motion.div>

        {/* Feature Grid */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-20">
          {features.map((feature, idx) => (
            <Link key={idx} to={feature.path} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-slate-600 p-6 rounded-3xl text-left transition group flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 group-hover:bg-blue-900/50 transition-all duration-300">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {feature.title[lang] || feature.title.en}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.desc[lang] || feature.desc.en}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 mt-20 pt-12 pb-6 px-6 bg-slate-950/50 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Car size={20} className="text-blue-500" />
            <span className="font-bold text-white tracking-tight">Licence Saathi</span>
          </div>
          
          {/* LIGHTHOUSE FIX: Changed text-slate-500 to text-slate-400 for better contrast */}
          <p className="text-slate-400 text-sm text-center md:text-left">
            {lang === 'en' && 'Designed to simplify the mParivahan process.'}
            {lang === 'hi' && 'एम-परिवहन प्रक्रिया को सरल बनाने के लिए डिज़ाइन किया गया।'}
            {lang === 'gu' && 'પરિવહન પ્રક્રિયાને સરળ બનાવવા માટે બનાવેલ.'}
          </p>
        </div>
      </footer>

    </div>
  );
}