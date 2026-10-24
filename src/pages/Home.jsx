import { useContext, useState, useRef } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, Navigation, PlayCircle, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { lang } = useContext(AppContext);

  // Journey Map State & Ref for Auto-Scrolling
  const journeyMapRef = useRef(null);
  const [journeyStage, setJourneyStage] = useState(() => {
    return parseInt(localStorage.getItem('licenceJourneyStage') || '0');
  });

  const handleJourneyClick = (stageNum) => {
    setJourneyStage(stageNum);
    localStorage.setItem('licenceJourneyStage', stageNum.toString());
    setTimeout(() => {
      if (journeyMapRef.current) {
        journeyMapRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  const features = [
    {
      icon: <CheckCircle size={24} />,
      path: "/eligibility",
      title: { en: "Eligibility Check", hi: "पात्रता जांच", gu: "પાત્રતા તપાસ" },
      desc: { 
        en: "See if you meet age & vehicle rules.", 
        hi: "देखें कि क्या आप उम्र और वाहन नियमों को पूरा करते हैं।", 
        gu: "ઉંમર અને વાહનના નિયમો તપાસો." 
      }
    },
    {
      icon: <FileText size={24} />,
      path: "/documents",
      title: { en: "Documents Needed", hi: "आवश्यक दस्तावेज़", gu: "જરૂરી દસ્તાવેજો" },
      desc: { 
        en: "Get the exact list of required proofs.", 
        hi: "आवश्यक प्रमाणों की सटीक सूची प्राप्त करें।", 
        gu: "જરૂરી પુરાવાઓની ચોક્કસ સૂચિ મેળવો." 
      }
    },
    {
      icon: <PlayCircle size={24} />,
      path: "/mock-test",
      title: { en: "Mock Test", hi: "मॉक टेस्ट", gu: "મોક ટેસ્ટ" },
      desc: { 
        en: "Practice the 15-question LL test.", 
        hi: "15-प्रश्नों वाले एलएल टेस्ट का अभ्यास करें।", 
        gu: "15-પ્રશ્નોવાળા LL ટેસ્ટની પ્રેક્ટિસ કરો." 
      }
    },
    {
      icon: <Navigation size={24} />,
      path: "/track-app",
      title: { en: "Track Status", hi: "स्थिति ट्रैक करें", gu: "સ્ટેટસ ટ્રેક કરો" },
      desc: { 
        en: "Track your real-time RTO application.", 
        hi: "अपने रीयल-टाइम आरटीओ आवेदन को ट्रैक करें।", 
        gu: "તમારી RTO અરજીનું સ્ટેટસ તપાસો." 
      }
    }
  ];

  const journeySteps = [
    {
      id: 1,
      path: "/eligibility",
      text: { 
        en: "Check you can apply", 
        hi: "जांचें कि क्या आप आवेदन कर सकते हैं", 
        gu: "તપાસો કે તમે અરજી કરી શકો છો" 
      },
      btnText: { en: "Check Eligibility", hi: "पात्रता जांचें", gu: "પાત્રતા તપાસો" }
    },
    {
      id: 2,
      path: "/application",
      text: { 
        en: "Apply for a learner's licence", 
        hi: "लर्नर लाइसेंस के लिए आवेदन करें", 
        gu: "લર્નર લાઇસન્સ માટે અરજી કરો" 
      },
      btnText: { en: "Apply Now", hi: "अभी आवेदन करें", gu: "હવે અરજી કરો" }
    },
    {
      id: 3,
      path: "/mock-test",
      text: { 
        en: "Pass the learner's test", 
        hi: "लर्नर टेस्ट पास करें", 
        gu: "લર્નર ટેસ્ટ પાસ કરો" 
      },
      btnText: { en: "Take Mock Test", hi: "मॉक टेस्ट लें", gu: "મોક ટેસ્ટ આપો" }
    },
    {
      id: 4,
      path: "/permanent-licence",
      text: { 
        en: "Wait 30 days & apply for permanent", 
        hi: "30 दिन प्रतीक्षा करें और स्थायी के लिए आवेदन करें", 
        gu: "30 દિવસ રાહ જુઓ અને કાયમી માટે અરજી કરો" 
      },
      btnText: { en: "Check Dates", hi: "तारीखें जांचें", gu: "તારીખો તપાસો" }
    },
    {
      id: 5,
      path: "/driving-test",
      text: { 
        en: "Pass the driving test", 
        hi: "ड्राइविंग टेस्ट पास करें", 
        gu: "ડ્રાઇવિંગ ટેસ્ટ પાસ કરો" 
      },
      btnText: { en: "Prepare for Test", hi: "टेस्ट की तैयारी करें", gu: "ટેસ્ટ માટે તૈયારી કરો" }
    },
    {
      id: 6,
      path: "/track-app",
      text: { 
        en: "Receive your licence", 
        hi: "अपना लाइसेंस प्राप्त करें", 
        gu: "તમારું લાઇસન્સ મેળવો" 
      },
      btnText: { en: "Track Application", hi: "आवेदन ट्रैक करें", gu: "અરજી ટ્રેક કરો" }
    }
  ];

  return (
    <div className="relative overflow-hidden pb-12 flex flex-col items-center">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 mt-8 flex flex-col">
        {/* HERO SECTION */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
          {/* Green Pulse Badge */}
          <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold mb-6 shadow-lg">
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
            {lang === 'en' && 'Navigate the Indian RTO process with ease. Check eligibility, gather documents, practice mock tests, and track your status.'}
            {lang === 'hi' && 'भारतीय आरटीओ प्रक्रिया को आसानी से नेविगेट करें। पात्रता जांचें, दस्तावेज़ एकत्र करें, अभ्यास परीक्षण करें, और अपनी स्थिति ट्रैक करें।'}
            {lang === 'gu' && 'ભારતીય RTO પ્રક્રિયાને સરળતાથી સમજો. પાત્રતા તપાસો, દસ્તાવેજો એકત્ર કરો, પ્રેક્ટિસ ટેસ્ટ આપો અને તમારું સ્ટેટસ ટ્રેક કરો.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link to="/application" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30">
              {lang === 'en' && 'Start Journey'}
              {lang === 'hi' && 'यात्रा शुरू करें'}
              {lang === 'gu' && 'શરૂઆત કરો'}
              <ArrowRight size={20} />
            </Link>
            <Link to="/mock-test" className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-8 py-4 rounded-xl font-bold transition">
              {lang === 'en' && 'Take Mock Test'}
              {lang === 'hi' && 'मॉक टेस्ट लें'}
              {lang === 'gu' && 'મોક ટેસ્ટ આપો'}
            </Link>
          </div>
        </motion.div>

        {/* WHERE ARE YOU IN YOUR JOURNEY (4 BUTTONS) */}
        <section aria-label="Journey Stage Selection" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center md:text-left">
            {lang === 'en' && 'Where are you in your licence journey?'}
            {lang === 'hi' && 'आप अपनी लाइसेंस यात्रा में कहाँ हैं?'}
            {lang === 'gu' && 'તમે તમારી લાઇસન્સ યાત્રામાં ક્યાં છો?'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Button 1: Stage 0 */}
            <button onClick={() => handleJourneyClick(0)} className={`p-6 rounded-2xl border text-left transition-all ${journeyStage < 3 ? 'bg-blue-950/40 border-blue-500' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}>
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
            <button onClick={() => handleJourneyClick(3)} className={`p-6 rounded-2xl border text-left transition-all ${journeyStage === 3 ? 'bg-blue-950/40 border-blue-500' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}>
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
            <button onClick={() => handleJourneyClick(4)} className={`p-6 rounded-2xl border text-left transition-all ${journeyStage === 4 ? 'bg-blue-950/40 border-blue-500' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}>
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
            <button onClick={() => handleJourneyClick(5)} className={`p-6 rounded-2xl border text-left transition-all ${journeyStage === 5 ? 'bg-blue-950/40 border-blue-500' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}>
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
        </section>

        {/* JOURNEY MAP STEPPER */}
        <section aria-label="Your Journey Stepper" ref={journeyMapRef} className="bg-slate-900/50 p-6 md:p-10 rounded-3xl border border-slate-800 mb-16 backdrop-blur-md shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-8">
            {lang === 'en' && 'Your Journey Map'}
            {lang === 'hi' && 'आपका यात्रा मानचित्र'}
            {lang === 'gu' && 'તમારો પ્રવાસ નકશો'}
          </h2>

          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-slate-700 before:to-transparent">
            {journeySteps.map((step) => {
              const isCompleted = journeyStage >= step.id;
              const isCurrent = journeyStage === step.id - 1;

              return (
                <div key={step.id} className="relative flex items-start gap-5">
                  {/* Circle Indicator */}
                  <div className="z-10 bg-slate-950 rounded-full mt-1 shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="text-emerald-500 bg-emerald-950/50 rounded-full" size={32} />
                    ) : isCurrent ? (
                      <div className="relative flex items-center justify-center w-8 h-8">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                        <Circle className="text-blue-500 fill-blue-900/50 relative" size={32} />
                      </div>
                    ) : (
                      <Circle className="text-slate-700" size={32} />
                    )}
                  </div>

                  {/* Step Details */}
                  <div className="flex-1 pt-1">
                    <h3 className={`text-lg font-bold mb-2 ${isCompleted || isCurrent ? 'text-white' : 'text-slate-500'}`}>
                      {step.id}. {step.text[lang]}
                    </h3>

                    {/* Step Action Button */}
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
                          <Link
                            to={step.path}
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-blue-600/30 text-sm"
                          >
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
        </section>

        {/* FEATURE GRID */}
        <section aria-label="Feature Highlights" className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
          {features.map((feature, idx) => (
            <Link
              key={idx}
              to={feature.path}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-slate-700 p-6 rounded-3xl transition flex items-start gap-4 group shadow-lg"
            >
              <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shrink-0">
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
        </section>
      </div>
    </div>
  );
}