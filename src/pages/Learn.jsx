import { useState, useContext } from 'react';
import { AppContext } from '../App';
import { signsData } from '../data/signs';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Volume2, BookOpen, AlertTriangle, Info, ShieldCheck } from 'lucide-react';

export default function Learn() {
  const { lang, readAloud } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('mandatory');
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleListen = (e, text) => {
    e.stopPropagation();
    if (!window.speechSynthesis) return alert("Text-to-speech not supported in this browser.");
    window.speechSynthesis.cancel(); 
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  const tabs = [
    { 
      id: 'mandatory', 
      icon: <ShieldCheck size={18} />, 
      label: { en: 'Mandatory', hi: 'अनिवार्य' } 
    },
    { 
      id: 'cautionary', 
      icon: <AlertTriangle size={18} />, 
      label: { en: 'Cautionary', hi: 'चेतावनी' } 
    },
    { 
      id: 'informatory', 
      icon: <Info size={18} />, 
      label: { en: 'Informatory', hi: 'सूचनात्मक' } 
    },
    { 
      id: 'rules', 
      icon: <BookOpen size={18} />, 
      label: { en: 'Rules', hi: 'नियम' } 
    }
  ];

  const rulesOfTheRoad = [
    { 
      title: { en: "Keep Left", hi: "बाईं ओर चलें" }, 
      desc: { en: "Always drive on the left side of the road and let traffic pass on your right.", hi: "हमेशा सड़क के बाईं ओर गाड़ी चलाएं और यातायात को अपने दाईं ओर से गुजरने दें।" } 
    },
    { 
      title: { en: "Overtaking", hi: "ओवरटेकिंग" }, 
      desc: { en: "Overtake only from the right side. Never overtake on curves or bridges.", hi: "केवल दाईं ओर से ओवरटेक करें। मोड़ या पुल पर कभी भी ओवरटेक न करें।" } 
    },
    { 
      title: { en: "Intersections", hi: "चौराहे" }, 
      desc: { en: "Slow down at intersections and give way to traffic on the right.", hi: "चौराहों पर गति कम करें और दाईं ओर के यातायात को रास्ता दें।" } 
    },
    { 
      title: { en: "Emergency Vehicles", hi: "आपातकालीन वाहन" }, 
      desc: { en: "Always pull over to the left to allow ambulances and fire engines to pass.", hi: "एम्बुलेंस और फायर इंजनों को गुजरने देने के लिए हमेशा बाईं ओर खींचें।" } 
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-6 flex flex-col font-sans overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl mb-6 shadow-lg">
            <Map className="text-emerald-400" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {lang === 'en' ? 'Learn Road Signs & Rules' : 'सड़क संकेत और नियम सीखें'}
          </h1>
          <p className="text-slate-400">
            {lang === 'en' ? 'Tap any card to flip it and read the explanation.' : 'इसे पलटने और स्पष्टीकरण पढ़ने के लिए किसी भी कार्ड पर टैप करें।'}
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 mb-8 bg-slate-900/50 p-2 rounded-2xl border border-slate-800 backdrop-blur-sm">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.icon} {tab.label[lang]}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full"
          >
            {activeTab === 'rules' ? (
              /* RULES OF THE ROAD */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rulesOfTheRoad.map((rule, idx) => (
                  <div key={idx} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl relative">
                    <button 
                      onClick={(e) => handleListen(e, `${rule.title[lang]}. ${rule.desc[lang]}`)}
                      className="absolute top-6 right-6 w-10 h-10 bg-slate-800 text-blue-400 rounded-full flex items-center justify-center hover:bg-slate-700 transition"
                    >
                      <Volume2 size={18} />
                    </button>
                    <h3 className="text-xl font-bold text-white mb-3 pr-12">{rule.title[lang]}</h3>
                    <p className="text-slate-400 leading-relaxed">{rule.desc[lang]}</p>
                  </div>
                ))}
              </div>
            ) : (
              /* SVG SIGN FLASHCARDS */
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {signsData.filter(s => s.type === activeTab).map(sign => (
                  <div 
                    key={sign.id} 
                    className="relative w-full aspect-[3/4] cursor-pointer"
                    style={{ perspective: '1000px' }}
                    onClick={() => toggleFlip(sign.id)}
                  >
                    <motion.div 
                      className="w-full h-full relative transition-all duration-500"
                      style={{ transformStyle: 'preserve-3d' }}
                      initial={false}
                      animate={{ rotateY: flippedCards[sign.id] ? 180 : 0 }}
                    >
                      {/* FRONT OF CARD */}
                      <div 
                        className="absolute w-full h-full bg-slate-900 border border-slate-700 rounded-2xl p-4 flex flex-col items-center justify-center shadow-lg hover:border-slate-500 transition-colors"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="flex-1 flex items-center justify-center">
                          {sign.icon}
                        </div>
                        <h4 className="text-center font-bold text-white text-sm mt-4">
                          {sign.name[lang]}
                        </h4>
                      </div>

                      {/* BACK OF CARD (Explanation) */}
                      <div 
                        className="absolute w-full h-full bg-blue-900/40 border border-blue-500/50 rounded-2xl p-5 flex flex-col items-center justify-center shadow-lg" 
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <p className="text-center text-sm text-blue-100 font-medium leading-relaxed mb-4">
                          {sign.desc[lang]}
                        </p>
                        <button 
                          onClick={(e) => handleListen(e, sign.desc[lang])}
                          className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-500 transition-colors"
                        >
                          <Volume2 size={20} />
                        </button>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}