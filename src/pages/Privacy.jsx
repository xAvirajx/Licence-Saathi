import { useContext } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Lock, HardDrive, Cpu, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Privacy() {
  const { lang } = useContext(AppContext);

  const points = [
    {
      icon: <EyeOff className="text-emerald-400" size={24} />,
      title: {
        en: "Zero PII Collection",
        hi: "कोई व्यक्तिगत पहचान डेटा एकत्र नहीं",
        gu: "કોઈ અંગત માહિતી સંગ્રહિત થતી નથી"
      },
      desc: {
        en: "Licence Saathi does not require an account, login, or email. We never collect, store, or transmit your Aadhaar number, phone number, or government credentials.",
        hi: "लाइसेंस साथी को किसी खाते, लॉगिन या ईमेल की आवश्यकता नहीं है। हम आपका आधार नंबर, फ़ोन नंबर या कोई अन्य सरकारी पहचान पत्र कभी संग्रहीत या साझा नहीं करते हैं।",
        gu: "લાઇસન્સ સાથી માટે કોઈ એકાઉન્ટ, લોગિન કે ઇમેઇલની જરૂર નથી. અમે તમારો આધાર નંબર, ફોન નંબર કે કોઈ સરકારી ઓળખપત્ર ક્યારેય એકત્ર કે સંગ્રહિત કરતા નથી."
      }
    },
    {
      icon: <HardDrive className="text-blue-400" size={24} />,
      title: {
        en: "On-Device Local Storage",
        hi: "केवल डिवाइस पर स्थानीय डेटा",
        gu: "માત્ર તમારા ઉપકરણ પર ડેટા"
      },
      desc: {
        en: "Your journey step, mock test history, and document checklist are saved exclusively in your browser's localStorage. You can clear this anytime from App Settings.",
        hi: "आपकी यात्रा की प्रगति, मॉक टेस्ट स्कोर और चेकलिस्ट केवल आपके ब्राउज़र के localStorage में सुरक्षित रहती है। आप इसे ऐप सेटिंग्स से कभी भी हटा सकते हैं।",
        gu: "તમારી પ્રવાસ પ્રગતિ, મોક ટેસ્ટ સ્કોર અને ચેકલિસ્ટ માત્ર તમારા બ્રાઉઝરના localStorage માં રહે છે. તમે એપ સેટિંગ્સમાંથી ગમે ત્યારે તેને સાફ કરી શકો છો."
      }
    },
    {
      icon: <Cpu className="text-purple-400" size={24} />,
      title: {
        en: "AI Chat Queries",
        hi: "एआई चैट प्रश्न",
        gu: "AI ચેટ પ્રશ્નો"
      },
      desc: {
        en: "Questions sent to the AI assistant are processed securely on the backend solely to generate real-time driving licence guidance and are not logged or stored in any database.",
        hi: "एआई सहायक को भेजे गए प्रश्न केवल ड्राइविंग लाइसेंस मार्गदर्शन उत्पन्न करने के लिए सुरक्षित रूप से संसाधित होते हैं और किसी डेटाबेस में संग्रहीत नहीं होते हैं।",
        gu: "AI સહાયકને પૂછવામાં આવતા પ્રશ્નો ફક્ત ડ્રાઇવિંગ લાઇસન્સ માર્ગદર્શન આપવા માટે જ પ્રોસેસ થાય છે અને કોઈ ડેટાબેઝમાં સાચવવામાં આવતા નથી."
      }
    },
    {
      icon: <Lock className="text-amber-400" size={24} />,
      title: {
        en: "Offline First & Secure",
        hi: "सुरक्षित और ऑफ़लाइन सक्षम",
        gu: "સુરક્ષિત અને ઓફલાઇન સક્ષમ"
      },
      desc: {
        en: "All road signs, rules, fee structures, and test questions are cached securely on your device through the Progressive Web App service worker.",
        hi: "सभी सड़क संकेत, नियम, शुल्क संरचना और परीक्षा प्रश्न प्रोग्रेसिव वेब ऐप सर्विस वर्कर के माध्यम से आपके डिवाइस पर सुरक्षित रूप से कैश होते हैं।",
        gu: "બધા રોડ સાઇન્સ, નિયમો, ફી અને પ્રશ્નો પ્રોગ્રેસિવ વેબ એપ સર્વિસ વર્કર દ્વારા તમારા ઉપકરણ પર સુરક્ષિત રીતે સચવાય છે."
      }
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-6 flex flex-col font-sans overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto w-full relative z-10">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            aria-label="Back to Home"
            className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <ShieldCheck className="text-emerald-400" size={32} />
              {lang === 'en' && 'Privacy Policy'}
              {lang === 'hi' && 'गोपनीयता नीति'}
              {lang === 'gu' && 'પ્રાઇવસી પોલિસી'}
            </h1>
            <p className="text-slate-400 mt-1 text-sm">
              {lang === 'en' && 'How Licence Saathi protects your privacy and personal data.'}
              {lang === 'hi' && 'लाइसेंस साथी आपकी गोपनीयता और व्यक्तिगत डेटा की रक्षा कैसे करता है।'}
              {lang === 'gu' && 'લાઇસન્સ સાથી તમારી ગોપનીયતા અને ડેટાનું રક્ષણ કેવી રીતે કરે છે.'}
            </p>
          </div>
        </div>

        {/* Policy Grid */}
        <div className="space-y-4 mb-10">
          {points.map((pt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex gap-5 items-start"
            >
              <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center shrink-0 mt-0.5">
                {pt.icon}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white mb-2">{pt.title[lang]}</h2>
                <p className="text-slate-400 text-sm leading-relaxed">{pt.desc[lang]}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-slate-500">
          <p>
            {lang === 'en' && 'Last updated: October 2026. Built with privacy-first principles.'}
            {lang === 'hi' && 'अंतिम अपडेट: अक्टूबर 2026। गोपनीयता-प्रथम सिद्धांतों के साथ निर्मित।'}
            {lang === 'gu' && 'છેલ્લું અપડેટ: ઓક્ટોબર 2026. પ્રાઇવસી-ફર્સ્ટ સિદ્ધાંતો સાથે બનાવેલ.'}
          </p>
        </div>
      </div>
    </div>
  );
}