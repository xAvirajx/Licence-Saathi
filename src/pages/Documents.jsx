import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { documentData } from '../data/documents';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, Circle, AlertCircle, ArrowRight, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Documents() {
  const { lang } = useContext(AppContext);
  const [checkedItems, setCheckedItems] = useState({});
  const [isOver40, setIsOver40] = useState(false);

  // Update progress map when they reach this page
  useEffect(() => {
    const currentStage = parseInt(localStorage.getItem('licenceJourneyStage') || '0', 10);
    if (currentStage < 1) localStorage.setItem('licenceJourneyStage', '1');
  }, []);

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeDocs = [...documentData.common];
  if (isOver40) {
    activeDocs.push(documentData.conditional);
  }

  const progress = activeDocs.filter(doc => checkedItems[doc.id]).length;
  const isComplete = progress === activeDocs.length;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 overflow-hidden py-12 px-6">
      {/* ATMOSPHERIC MESH GRADIENTS */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-2xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl mb-6 shadow-lg">
            <CheckSquare className="text-emerald-400" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {lang === 'en' ? 'Your Document Checklist' : 'आपकी दस्तावेज़ चेकलिस्ट'}
          </h1>
          <p className="text-slate-400">
            {lang === 'en' ? 'Gather these items before starting your application.' : 'अपना आवेदन शुरू करने से पहले इन वस्तुओं को इकट्ठा करें।'}
          </p>
        </div>

        {/* AGE TOGGLE (Dynamic Requirement) */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold">{lang === 'en' ? 'Are you 40 years or older?' : 'क्या आप 40 वर्ष या उससे अधिक उम्र के हैं?'}</h3>
            <p className="text-sm text-slate-400">{lang === 'en' ? 'This changes your required documents.' : 'यह आपके आवश्यक दस्तावेजों को बदलता है।'}</p>
          </div>
          <button 
            onClick={() => setIsOver40(!isOver40)}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out ${isOver40 ? 'bg-blue-600' : 'bg-slate-700'}`}
          >
            <motion.div 
              layout 
              className="w-6 h-6 bg-white rounded-full shadow-md"
              initial={false}
              animate={{ x: isOver40 ? 24 : 0 }}
            />
          </button>
        </div>

        {/* STUCK HERE WARNING BOX */}
        <div className="bg-amber-950/30 border border-amber-900/50 rounded-2xl p-5 mb-8 flex gap-4 items-start">
          <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={24} />
          <div>
            <h4 className="text-amber-500 font-bold mb-1">
              {lang === 'en' ? 'People often get stuck here' : 'लोग अक्सर यहाँ फँस जाते हैं'}
            </h4>
            <p className="text-sm text-amber-200/70 leading-relaxed">
              {lang === 'en' 
                ? 'Make sure your name and date of birth match exactly across ALL your documents. A spelling mismatch between your Proof of Age and Proof of Address is the #1 reason applications get rejected.' 
                : 'सुनिश्चित करें कि आपका नाम और जन्म तिथि आपके सभी दस्तावेजों में बिल्कुल मेल खाते हैं। आपके आयु प्रमाण और पता प्रमाण के बीच वर्तनी का बेमेल होना आवेदनों के अस्वीकृत होने का सबसे बड़ा कारण है।'}
            </p>
          </div>
        </div>

        {/* CHECKLIST */}
        <div className="space-y-4 mb-10">
          {activeDocs.map((doc, idx) => {
            const isChecked = checkedItems[doc.id];
            return (
              <motion.button
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => toggleCheck(doc.id)}
                className={`w-full text-left p-6 rounded-3xl border transition-all duration-300 ${
                  isChecked 
                    ? 'bg-emerald-950/20 border-emerald-900/50' 
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex gap-4 items-start">
                  <div className="mt-1 shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="text-emerald-500" size={28} />
                    ) : (
                      <Circle className="text-slate-600" size={28} />
                    )}
                  </div>
                  <div className={`flex-1 transition-all ${isChecked ? 'opacity-50' : 'opacity-100'}`}>
                    <h3 className={`text-lg font-bold mb-1 ${isChecked ? 'text-emerald-400 line-through' : 'text-white'}`}>
                      {doc.title[lang]}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4">{doc.desc[lang]}</p>
                    
                    <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/50">
                      <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                        {lang === 'en' ? 'Examples:' : 'उदाहरण:'}
                      </p>
                      <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                        {doc.examples[lang].map((ex, i) => (
                          <li key={i}>{ex}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* BOTTOM PROGRESS & CTA */}
        <div className="sticky bottom-6 bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-6 rounded-3xl shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-slate-300">
              {lang === 'en' ? 'Preparation Progress' : 'तैयारी की प्रगति'}
            </span>
            <span className="text-sm font-bold text-blue-400">
              {progress} / {activeDocs.length} {lang === 'en' ? 'Ready' : 'तैयार'}
            </span>
          </div>
          
          <div className="w-full bg-slate-800 rounded-full h-2 mb-6 overflow-hidden">
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-emerald-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(progress / activeDocs.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <Link 
            to="/application" 
            className={`w-full p-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              isComplete 
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {isComplete 
              ? (lang === 'en' ? 'All set! Start Application' : 'सब तैयार! आवेदन शुरू करें')
              : (lang === 'en' ? 'Skip to Application' : 'आवेदन पर जाएं')
            }
            <ArrowRight size={20} />
          </Link>
        </div>

      </div>
    </div>
  );
}