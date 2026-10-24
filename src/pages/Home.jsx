import { useContext, useState, useRef } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import { Car, FileText, CheckCircle, Navigation, PlayCircle, Menu, X, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { lang } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Journey Map State & Ref for Auto-Scrolling
  const journeyMapRef = useRef(null);
  const [journeyStage, setJourneyStage] = useState(() => {
    return parseInt(localStorage.getItem('licenceJourneyStage') || '0');
  });

  // Handle clicking the 4 Journey Buttons
  const handleJourneyClick = (stageNum) => {
    setJourneyStage(stageNum);
    localStorage.setItem('licenceJourneyStage', stageNum.toString());
    
    // Auto-scroll to the Journey Map
    setTimeout(() => {
      journeyMapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  };

  const features = [
    { 
      icon: <CheckCircle size={24} />, path: "/eligibility", 
      title: { en: "Eligibility Check", hi: "पात्रता जांच", gu: "પાત્રતા તપાસ" }, 
      desc: { en: "See if you meet age & vehicle rules.", hi: "देखें कि क्या आप उम्र और वाहन नियमों को पूरा करते हैं।", gu: "ઉંમર અને વાહનના નિયમો તપાસો." } 
    },
    { 
      icon: <FileText size={24} />, path: "/documents", 
      title: { en: "Documents Needed", hi: "आवश्यक दस्तावेज़", gu: "જરૂરી દસ્તાવેજો" }, 
      desc: { en: "Get the exact list of required proofs.", hi: "आवश्यक प्रमाणों की सटीक सूची प्राप्त करें।", gu: "જરૂરી પુરાવાઓની ચોક્કસ સૂચિ મેળવો." } 
    },
    { 
      icon: <PlayCircle size={24} />, path: "/mock-test", 
      title: { en: "Mock Test", hi: "मॉक टेस्ट", gu: "મોક ટેસ્ટ" }, 
      desc: { en: "Practice the 15-question LL test.", hi: "15-प्रश्नों वाले एलएल टेस्ट का अभ्यास करें।", gu: "15-પ્રશ્નોवाળા LL ટેસ્ટની પ્રેક્ટિસ કરો." } 
    },
    { 
      icon: <Navigation size={24} />, path: "/track-app", 
      title: { en: "Track Status", hi: "स्थिति ट्रैक करें", gu: "સ્ટેટસ ટ્રેક કરો" }, 
      desc: { en: "Track your real-time RTO application.", hi: "अपने रीयल-टाइम आरटीओ आवेदन को ट्रैक करें।", gu: "તમારી RTO અરજીનું સ્ટેટસ તપાસો." } 
    }
  ];

  const journeySteps = [
    { 
      id: 1, path: "/eligibility", 
      text: { en: "Check you can apply", hi: "जांचें कि क्या आप आवेदन कर सकते हैं", gu: "તપાસો કે તમે અરજી કરી શકો છો" },
      btnText: { en: "Check Eligibility", hi: "पात्रता जांचें", gu: "પાત્રતા તપાસો" }
    },
    { 
      id: 2, path: "/application", 
      text: { en: "Apply for a learner's licence", hi: "लर्नर लाइसेंस के लिए आवेदन करें", gu: "લર્નર લાઇસન્સ માટે અરજી કરો" },
      btnText: { en: "Apply Now", hi: "अभी आवेदन करें", gu: "હવે અરજી કરો" }
    },
    { 
      id: 3, path: "/mock-test", 
      text: { en: "Pass the learner's test", hi: "लर्नर टेस्ट पास करें", gu: "લર્નર ટેસ્ટ પાસ કરો" },
      btnText: { en: "Take Mock Test", hi: "मॉक टेस्ट लें", gu: "મોક ટેસ્ટ આપો" }
    },
    { 
      id: 4, path: "/permanent-licence", 
      text: { en: "Wait 30 days & apply for permanent", hi: "30 दिन प्रतीक्षा करें और स्थायी के लिए आवेदन करें", gu: "30 દિવસ રાહ જુઓ અને કાયમી માટે અરજી કરો" },
      btnText: { en: "Check Dates", hi: "तारीखें जांचें", gu: "તારીખો તપાસો" }
    },
    { 
      id: 5, path: "/driving-test", 
      text: { en: "Pass the driving test", hi: "ड्राइविंग टेस्ट पास करें", gu: "ડ્રાઇવિંગ ટેસ્ટ પાસ કરો" },
      btnText: { en: "Prepare for Test", hi: "टेस्ट की तैयारी करें", gu: "ટેસ્ટ માટે તૈયારી કરો" }
    },
    { 
      id: 6, path: "/track-app", 
      text: { en: "Receive your licence", hi: "अपना लाइसेंस प्राप्त करें", gu: "તમારું લાઇસન્સ મેળવો" },
      btnText: { en: "Track Application", hi: "आवेदन ट्रैक करें", gu: "અરજી ટ્રેક કરો" }
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 overflow-hidden pb-24 flex flex-col items-center">
      
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header Container Constrained for Desktop */}
      <div className="w-full max-w-4xl mx-auto relative z-20">
        <header className="w-full p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Car size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Licence Saathi</span>
          </div>

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

          <button 
            onClick={() => setMobileMenuOpen(true)} 
            aria-label="Toggle Menu"
            className="md:hidden text-slate-300 hover:text-white"
          >
            <Menu size={28} />
          </button>
        </header>
      </div>

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

      {/* Main Content Area Constrained for Desktop */}
      <main className="flex-1 relative z-10 w-full max-w-4xl mx-auto px-6 mt-10 flex flex-col">
        
        {/* HERO SECTION */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
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
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
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

        {/* WHERE ARE YOU IN YOUR JOURNEY (4 BUTTONS) */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center md:text-left">
            {lang === 'en' && 'Where are you in your licence journey?'}
            {lang === 'hi' && 'आप अपनी लाइसेंस यात्रा में कहाँ हैं?'}
            {lang === 'gu' && 'તમે તમારી લાઇસન્સ યાત્રામાં ક્યાં છો?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Button 1: Stage 0 */}
            <button onClick={() => handleJourneyClick(0)} className={`p-6 rounded-2xl border text-left transition-all ${journeyStage < 3 ? 'bg-blue-900/30 border-blue-500 shadow-lg shadow-blue-900/20' : 'bg-slate-900/50 border-slate-800 hover:border-slate-600'}`}>
              <div className={`text-lg font-bold mb-1 ${journeyStage < 3 ? 'text-white' : 'text-slate-200'}`}>
                {lang === 'en' && 'Just starting'}
                {lang === 'hi' && 'अभी शुरुआत कर रहे हैं'}
                {lang === 'gu' && 'હમણાં જ શરૂઆત કરી છે'}
              </div>
              <div className={`text-sm ${journeyStage < 3 ? 'text-blue-200' : 'text-slate-400'}`}>
                {lang === 'en' && 'I need to check rules & apply'}
                {lang === 'hi' && 'मुझे नियमों की जांच करनी है और आवेदन करना है'}
                {lang === 'gu' && 'મારે નિયમો તપાસીને અરજી કરવી છે'}
              </div>
            </button>

            {/* Button 2: Stage 3 */}
            <button onClick={() => handleJourneyClick(3)} className={`p-6 rounded-2xl border text-left transition-all ${journeyStage === 3 ? 'bg-blue-900/30 border-blue-500 shadow-lg shadow-blue-900/20' : 'bg-slate-900/50 border-slate-800 hover:border-slate-600'}`}>
              <div className={`text-lg font-bold mb-1 ${journeyStage === 3 ? 'text-white' : 'text-slate-200'}`}>
                {lang === 'en' && "I have a learner's licence"}
                {lang === 'hi' && "मेरे पास लर्नर लाइसेंस है"}
                {lang === 'gu' && "મારી પાસે લર્નર લાઇસન્સ છે"}
              </div>
              <div className={`text-sm ${journeyStage === 3 ? 'text-blue-200' : 'text-slate-400'}`}>
                {lang === 'en' && 'I am waiting to get my permanent DL'}
                {lang === 'hi' && 'मैं स्थायी डीएल का इंतजार कर रहा हूं'}
                {lang === 'gu' && 'હું કાયમી DL ની રાહ જોઈ રહ્યો છું'}
              </div>
            </button>

            {/* Button 3: Stage 4 */}
            <button onClick={() => handleJourneyClick(4)} className={`p-6 rounded-2xl border text-left transition-all ${journeyStage === 4 ? 'bg-blue-900/30 border-blue-500 shadow-lg shadow-blue-900/20' : 'bg-slate-900/50 border-slate-800 hover:border-slate-600'}`}>
              <div className={`text-lg font-bold mb-1 ${journeyStage === 4 ? 'text-white' : 'text-slate-200'}`}>
                {lang === 'en' && "I've booked my driving test"}
                {lang === 'hi' && "मैंने ड्राइविंग टेस्ट बुक कर लिया है"}
                {lang === 'gu' && "મેં ડ્રાઇવિંગ ટેસ્ટ બુક કર્યો છે"}
              </div>
              <div className={`text-sm ${journeyStage === 4 ? 'text-blue-200' : 'text-slate-400'}`}>
                {lang === 'en' && 'I need to prepare for the test day'}
                {lang === 'hi' && 'मुझे टेस्ट के दिन के लिए तैयारी करनी है'}
                {lang === 'gu' && 'મારે ટેસ્ટના દિવસ માટે તૈયારી કરવી છે'}
              </div>
            </button>

            {/* Button 4: Stage 5 */}
            <button onClick={() => handleJourneyClick(5)} className={`p-6 rounded-2xl border text-left transition-all ${journeyStage === 5 ? 'bg-blue-900/30 border-blue-500 shadow-lg shadow-blue-900/20' : 'bg-slate-900/50 border-slate-800 hover:border-slate-600'}`}>
              <div className={`text-lg font-bold mb-1 ${journeyStage === 5 ? 'text-white' : 'text-slate-200'}`}>
                {lang === 'en' && "I've applied & waiting"}
                {lang === 'hi' && "मैंने आवेदन कर दिया है और इंतजार कर रहा हूं"}
                {lang === 'gu' && "મેં અરજી કરી છે અને રાહ જોઈ રહ્યો છું"}
              </div>
              <div className={`text-sm ${journeyStage === 5 ? 'text-blue-200' : 'text-slate-400'}`}>
                {lang === 'en' && 'I want to track my DL status'}
                {lang === 'hi' && 'मैं अपने डीएल की स्थिति ट्रैक करना चाहता हूं'}
                {lang === 'gu' && 'મારે મારા DL નું સ્ટેટસ ટ્રેક કરવું છે'}
              </div>
            </button>

          </div>
        </div>

        {/* JOURNEY MAP STEPPER */}
        <div ref={journeyMapRef} className="bg-slate-900/50 p-6 md:p-10 rounded-3xl border border-slate-800 mb-16 backdrop-blur-sm shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-8">
            {lang === 'en' && 'Your Journey Map'}
            {lang === 'hi' && 'आपका यात्रा मानचित्र'}
            {lang === 'gu' && 'તમારો પ્રવાસ નકશો'}
          </h2>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:h-full before:w-[2px] before:bg-slate-800">
            {journeySteps.map((step) => {
              const isCompleted = journeyStage >= step.id;
              const isCurrent = journeyStage === step.id - 1;
              
              return (
                <div key={step.id} className="relative flex items-start gap-5">
                  
                  {/* Circle Icon */}
                  <div className="z-10 bg-slate-950 rounded-full mt-1 shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="text-emerald-500 bg-emerald-950/50 rounded-full" size={32} />
                    ) : isCurrent ? (
                      <div className="relative flex items-center justify-center w-8 h-8">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-50"></span>
                        <Circle className="text-blue-500 fill-blue-900/50 relative" size={32} />
                      </div>
                    ) : (
                      <Circle className="text-slate-700" size={32} />
                    )}
                  </div>
                  
                  {/* Step Text */}
                  <div className="flex-1 pt-1">
                    <h3 className={`text-lg font-bold mb-2 ${isCompleted || isCurrent ? 'text-white' : 'text-slate-500'}`}>
                      {step.id}. {step.text[lang]}
                    </h3>
                    
                    {/* Action Button (Only shows for the current step) */}
                    <AnimatePresence>
                      {isCurrent && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: 'auto' }} 
                          className="mb-4 overflow-hidden"
                        >
                          <p className="text-slate-400 mb-4 text-sm">
                            {lang === 'en' && "This is your next step. Let's get it done."}
                            {lang === 'hi' && "यह आपका अगला कदम है। चलिए इसे पूरा करते हैं।"}
                            {lang === 'gu' && "આ તમારું આગળનું પગલું છે. ચાલો તેને પૂર્ણ કરીએ."}
                          </p>
                          <Link to={step.path} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-blue-500/30">
                            {step.btnText[lang]} <ArrowRight size={18} />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* FEATURE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-12">
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
        </div>

      </main>

      {/* FOOTER - Restored perfectly */}
      <footer className="relative z-10 border-t border-slate-800/80 w-full max-w-4xl mx-auto mt-12 pt-8 pb-8 px-6 bg-transparent">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Car size={20} className="text-blue-500" />
            <span className="font-bold text-white tracking-tight">Licence Saathi</span>
          </div>
          
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