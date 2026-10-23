import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { signsData } from '../data/signs';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Volume2, BookOpen, AlertTriangle, Info, ShieldCheck } from 'lucide-react';

export default function Learn() {
  const { lang } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('mandatory');
  const [flippedCards, setFlippedCards] = useState({});
  const [hasVoiceSupport, setHasVoiceSupport] = useState(false);

  useEffect(() => {
    const checkVoices = () => {
      if (!window.speechSynthesis) {
        setHasVoiceSupport(false);
        return;
      }
      const voices = window.speechSynthesis.getVoices();
      const targetLangPrefix = lang === 'gu' ? 'gu' : lang === 'hi' ? 'hi' : 'en';
      const found = voices.some(v => v.lang.toLowerCase().startsWith(targetLangPrefix));
      setHasVoiceSupport(found || lang === 'en');
    };

    checkVoices();
    window.speechSynthesis?.addEventListener('voiceschanged', checkVoices);
    return () => window.speechSynthesis?.removeEventListener('voiceschanged', checkVoices);
  }, [lang]);

  const toggleFlip = (id) => setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));

  const handleListen = (e, text) => {
    e.stopPropagation();
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'gu' ? 'gu-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  const tabs = [
    { id: 'mandatory', icon: <ShieldCheck size={18} />, label: { en: 'Mandatory', hi: 'अनिवार्य', gu: 'ફરજિયાત' } },
    { id: 'cautionary', icon: <AlertTriangle size={18} />, label: { en: 'Cautionary', hi: 'चेतावनी', gu: 'ચેતવણી' } },
    { id: 'informatory', icon: <Info size={18} />, label: { en: 'Informatory', hi: 'सूचनात्मक', gu: 'માહિતીપ્રદ' } },
    { id: 'rules', icon: <BookOpen size={18} />, label: { en: 'Rules', hi: 'नियम', gu: 'નિયમો' } }
  ];

  const getSignText = (sign) => {
    if (lang === 'gu') {
      return {
        name: sign.name.gu || sign.name.en,
        desc: sign.desc.gu || sign.desc.en
      };
    }
    return {
      name: sign.name[lang] || sign.name.en,
      desc: sign.desc[lang] || sign.desc.en
    };
  };

  const rulesOfTheRoad = [
    { 
      title: { en: "Keep Left", hi: "बाईं ओर चलें", gu: "હંમેશા ડાબી બાજુ ચાલો" }, 
      desc: { en: "Always drive on the left side of the road and let traffic pass on your right.", hi: "हमेशा सड़क के बाईं ओर गाड़ी चलाएं और यातायात को अपने दाईं ओर से गुजरने दें।", gu: "હંમેશા રસ્તાની ડાબી બાજુ વાહન ચલાવો જેથી સામેથી આવતા વાહનો નીકળી શકે." } 
    },
    { 
      title: { en: "Overtaking", hi: "ओवरटेकिंग", gu: "ઓવરટેકિંગ નિયમ" }, 
      desc: { en: "Overtake only from the right side. Never overtake on curves or bridges.", hi: "केवल दाईं ओर से ओवरटेक करें। मोड़ या पुल पर कभी भी ओवरटेक न करें।", gu: "હંમેશા વાહનની જમણી બાજુથી ઓવરટેક કરો. વળાંક કે પુલ પર ક્યારેય ઓવરટેક ન કરો." } 
    },
    { 
      title: { en: "Intersections", hi: "चौराहे", gu: "ચોક કે ટ્રાફિક જંકશન" }, 
      desc: { en: "Slow down at intersections and give way to traffic on the right.", hi: "चौराहों पर गति कम करें और दाईं ओर के यातायात को रास्ता दें।", gu: "ચોક પર વાહનની ઝડપધીમી કરો અને જમણી બાજુના ટ્રાફિકને જવા દો." } 
    },
    { 
      title: { en: "Emergency Vehicles", hi: "आपातकालीन वाहन", gu: "કટોકટી વાહનો" }, 
      desc: { en: "Always pull over to the left to allow ambulances and fire engines to pass.", hi: "आपको हमेशा बाईं ओर खींचना चाहिए और आपातकालीन वाहनों को मुफ्त मार्ग देना चाहिए।", gu: "એમ્બ્યુલન્સ અને ફાયર બ્રિગેડ જેવા વાહનો માટે હંમેશા સાઈડ આપો." } 
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-6 flex flex-col font-sans overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl mb-6 shadow-lg">
            <Map className="text-emerald-400" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {lang === 'en' ? 'Learn Road Signs & Rules' : lang === 'hi' ? 'सड़क संकेत और नियम सीखें' : 'રોડ સાઇન્સ અને નિયમો શીખો'}
          </h1>
          <p className="text-slate-400">
            {lang === 'en' ? 'Tap any card to flip it and read the explanation.' : lang === 'hi' ? 'इसे पलटने और स्पष्टीकरण पढ़ने के लिए किसी भी कार्ड पर टैप करें।' : 'વિગતો વાંચવા અને કાર્ડ ફ્લિપ કરવા માટે ટેપ કરો.'}
          </p>
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-2 mb-8 bg-slate-900/50 p-2 rounded-2xl border border-slate-800 backdrop-blur-sm">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[110px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.icon} {tab.label[lang] || tab.label.en}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full"
          >
            {activeTab === 'rules' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rulesOfTheRoad.map((rule, idx) => (
                  <div key={idx} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl relative">
                    {hasVoiceSupport && (
                      <button 
                        onClick={(e) => handleListen(e, `${rule.title[lang] || rule.title.en}. ${rule.desc[lang] || rule.desc.en}`)}
                        className="absolute top-6 right-6 w-10 h-10 bg-slate-800 text-blue-400 rounded-full flex items-center justify-center hover:bg-slate-700 transition"
                      >
                        <Volume2 size={18} />
                      </button>
                    )}
                    <h3 className="text-xl font-bold text-white mb-3 pr-12">{rule.title[lang] || rule.title.en}</h3>
                    <p className="text-slate-400 leading-relaxed">{rule.desc[lang] || rule.desc.en}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {signsData.filter(s => s.type === activeTab).map(sign => {
                  const localized = getSignText(sign);
                  return (
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
                        <div 
                          className="absolute w-full h-full bg-slate-900 border border-slate-700 rounded-2xl p-4 flex flex-col items-center justify-center shadow-lg hover:border-slate-500 transition-colors"
                          style={{ backfaceVisibility: 'hidden' }}
                        >
                          <div className="flex-1 flex items-center justify-center">
                            {sign.icon}
                          </div>
                          <h4 className="text-center font-bold text-white text-xs sm:text-sm mt-4">
                            {localized.name}
                          </h4>
                        </div>

                        <div 
                          className="absolute w-full h-full bg-blue-900/40 border border-blue-500/50 rounded-2xl p-4 flex flex-col items-center justify-center shadow-lg" 
                          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        >
                          <p className="text-center text-xs sm:text-sm text-blue-100 font-medium leading-relaxed mb-4">
                            {localized.desc}
                          </p>
                          {hasVoiceSupport && (
                            <button 
                              onClick={(e) => handleListen(e, localized.desc)}
                              className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-500 transition-colors"
                            >
                              <Volume2 size={18} />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}