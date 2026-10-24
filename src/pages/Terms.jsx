import { useContext } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft, ExternalLink, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Terms() {
  const { lang } = useContext(AppContext);

  const sections = [
    {
      title: {
        en: "Educational & Prototype Disclaimer",
        hi: "शैक्षणिक और प्रोटोटाइप अस्वीकरण",
        gu: "શૈક્ષણિક અને પ્રોટોટાઇપ અસ્વીકરણ"
      },
      desc: {
        en: "Licence Saathi is an independent educational tool designed to assist applicants in understanding the Indian driving licence process. It is not an official government portal and is not directly affiliated with MoRTH, State RTOs, or the official Sarathi mParivahan services.",
        hi: "लाइसेंस साथी एक स्वतंत्र शैक्षणिक उपकरण है जिसे आवेदकों को भारतीय ड्राइविंग लाइसेंस प्रक्रिया को समझने में सहायता के लिए डिज़ाइन किया गया है। यह आधिकारिक सरकारी पोर्टल नहीं है और MoRTH, राज्य आरटीओ या आधिकारिक सारथी एम-परिवहन से संबद्ध नहीं है।",
        gu: "લાઇસન્સ સાથી એ એક શૈક્ષણિક માર્ગદર્શક ટૂલ છે જે ભારતીય ડ્રાઇવિંગ લાઇસન્સ પ્રક્રિયાને સરળતાથી સમજાવવા માટે બનાવવામાં આવ્યું છે. આ સત્તાવાર સરકારી પોર્ટલ નથી અને MoRTH કે રાજ્ય RTO સાથે જોડાયેલું નથી."
      }
    },
    {
      title: {
        en: "State-Wise Rule Variations",
        hi: "राज्य अनुसार नियमों में अंतर",
        gu: "રાજ્ય મુજબ નિયમોમાં તફાવત"
      },
      desc: {
        en: "While rules, mock questions, and fee estimates are updated to match standard Central Motor Vehicles Rules (CMVR), specific RTO fees, slot availability, and test procedures may vary across different Indian states and Union Territories.",
        hi: "हालांकि नियम, मॉक प्रश्न और शुल्क अनुमान केंद्रीय मोटर वाहन नियमों (CMVR) के अनुसार हैं, फिर भी विशिष्ट आरटीओ शुल्क, स्लॉट उपलब्धता और परीक्षण प्रक्रियाएं अलग-अलग राज्यों में भिन्न हो सकती हैं।",
        gu: "નિયમો, મોક પ્રશ્નો અને ફીના અંદાજો કેન્દ્રીય મોટર વ્હીકલ નિયમો અનુસાર છે, તેમ છતાં ચોક્કસ RTO ફી, સ્લોટ અને ટેસ્ટના નિયમો અલગ-અલગ રાજ્યોમાં જુદા હોઈ શકે છે."
      }
    },
    {
      title: {
        en: "Official Submissions & Payments",
        hi: "आधिकारिक आवेदन और भुगतान",
        gu: "સત્તાવાર અરજી અને ફી ચુકવણી"
      },
      desc: {
        en: "All genuine driving licence applications, slot bookings, biometric appointments, and official government fee payments must only be completed on the official Ministry portal: parivahan.gov.in.",
        hi: "सभी वास्तविक ड्राइविंग लाइसेंस आवेदन, स्लॉट बुकिंग, बायोमेट्रिक अपॉइंटमेंट और आधिकारिक सरकारी शुल्क भुगतान केवल आधिकारिक मंत्रालय पोर्टल parivahan.gov.in पर ही पूरे किए जाने चाहिए।",
        gu: "વાસ્તવિક ડ્રાઇવિંગ લાઇસન્સ અરજીઓ, સ્લોટ બુકિંગ અને સરકારી ફીની ચુકવણી હંમેશા સત્તાવાર પોર્ટલ parivahan.gov.in પર જ કરવી જોઈએ."
      }
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-6 flex flex-col font-sans overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none"></div>

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
              <FileText className="text-blue-400" size={32} />
              {lang === 'en' && 'Terms of Service'}
              {lang === 'hi' && 'सेवा की शर्तें'}
              {lang === 'gu' && 'નિયમો અને શરતો'}
            </h1>
            <p className="text-slate-400 mt-1 text-sm">
              {lang === 'en' && 'Usage terms, liability limitations, and official RTO references.'}
              {lang === 'hi' && 'उपयोग की शर्तें, दायित्व सीमाएं और आधिकारिक आरटीओ संदर्भ।'}
              {lang === 'gu' && 'ઉપયોગની શરતો અને સત્તાવાર RTO માર્ગદર્શિકા.'}
            </p>
          </div>
        </div>

        {/* Important Warning Banner */}
        <div className="bg-amber-950/30 border border-amber-800/60 rounded-3xl p-6 mb-8 flex gap-4 items-start shadow-xl">
          <AlertOctagon className="text-amber-400 shrink-0 mt-1" size={28} />
          <div>
            <h2 className="text-base font-bold text-amber-200 mb-1">
              {lang === 'en' && 'Official Portal Reference'}
              {lang === 'hi' && 'आधिकारिक पोर्टल संदर्भ'}
              {lang === 'gu' && 'સત્તાવાર પોર્ટલ સંદર્ભ'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
              {lang === 'en' && 'For official application tracking, slot booking, and legal Driving Licence issuance, visit the official Ministry of Road Transport and Highways portal.'}
              {lang === 'hi' && 'आधिकारिक आवेदन ट्रैकिंग, स्लॉट बुकिंग और कानूनी ड्राइविंग लाइसेंस जारी करने के लिए सड़क परिवहन और राजमार्ग मंत्रालय के आधिकारिक पोर्टल पर जाएं।'}
              {lang === 'gu' && 'સત્તાવાર અરજી ટ્રેકિંગ, સ્લોટ બુકિંગ અને કાયમી લાયસન્સ માટે સડક પરિવહન અને રાજમાર્ગ મંત્રાલયના પોર્ટલની મુલાકાત લો.'}
            </p>
            <a
              href="https://parivahan.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 underline"
            >
              parivahan.gov.in <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-4 mb-10">
          {sections.map((sec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl"
            >
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-blue-400 shrink-0" />
                {sec.title[lang]}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">{sec.desc[lang]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}