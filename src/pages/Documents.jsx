import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { FileText, CheckCircle2, Circle, AlertCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Documents() {
  const { lang } = useContext(AppContext);
  const [ageGroup, setAgeGroup] = useState('18-40'); // 'under18', '18-40', 'over40'
  const [checkedItems, setCheckedItems] = useState(() => {
    return JSON.parse(localStorage.getItem('ls_doc_checks') || '[]');
  });

  useEffect(() => {
    localStorage.setItem('ls_doc_checks', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleCheck = (id) => {
    setCheckedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const documents = [
    {
      id: 'age_proof',
      title: { en: "Age Proof", hi: "आयु प्रमाण", gu: "ઉંમરનો પુરાવો" },
      desc: { en: "Provides official proof of your date of birth.", hi: "आपकी जन्म तिथि का आधिकारिक प्रमाण प्रदान करता है।", gu: "તમારી જન્મ તારીખનો સત્તાવાર પુરાવો પૂરો પાડે છે." },
      examples: { en: "Aadhaar Card, PAN Card, Passport, Birth Certificate, 10th Marksheet", hi: "आधार कार्ड, पैन कार्ड, पासपोर्ट, जन्म प्रमाण पत्र, 10वीं की मार्कशीट", gu: "આધાર કાર્ડ, પાન કાર્ડ, પાસપોર્ટ, જન્મ પ્રમાણપત્ર, 10માની માર્કશીટ" }
    },
    {
      id: 'address_proof',
      title: { en: "Address Proof", hi: "पता प्रमाण", gu: "સરનામાનો પુરાવો" },
      desc: { en: "Confirms your current permanent residence.", hi: "आपके वर्तमान स्थायी निवास की पुष्टि करता है।", gu: "તમારા વર્તમાન કાયમી રહેઠાણની પુષ્ટિ કરે છે." },
      examples: { en: "Aadhaar Card, Passport, Voter ID, Utility Bill (Electricity/Water), Rent Agreement", hi: "आधार कार्ड, पासपोर्ट, वोटर आईडी, उपयोगिता बिल, किराया समझौता", gu: "આધાર કાર્ડ, પાસપોર્ટ, મતદાર ID, વીજળી/પાણીનું બિલ, ભાડા કરાર" }
    },
    {
      id: 'photos',
      title: { en: "Passport Size Photos", hi: "पासपोर्ट आकार की तस्वीरें", gu: "પાસપોર્ટ સાઇઝના ફોટા" },
      desc: { en: "Recent color photographs with a clear background.", hi: "स्पष्ट पृष्ठभूमि के साथ हाल की रंगीन तस्वीरें।", gu: "સ્પષ્ટ બેકગ્રાઉન્ડ સાથે તાજેતરના રંગીન ફોટોગ્રાફ્સ." },
      examples: { en: "4 to 6 identical recent photos, standard 35x45mm size", hi: "4 से 6 समान हाल की तस्वीरें", gu: "4 થી 6 સમાન તાજેતરના ફોટા" }
    },
    {
      id: 'medical_cert',
      condition: ageGroup === 'over40',
      title: { en: "Medical Certificate (Form 1A)", hi: "चिकित्सा प्रमाण पत्र (फॉर्म 1A)", gu: "મેડિકલ સર્ટિફિકેટ (ફોર્મ 1A)" },
      desc: { en: "Required for applicants over 40 years of age, signed by a registered doctor.", hi: "40 वर्ष से अधिक उम्र के आवेदकों के लिए आवश्यक।", gu: "40 વર્ષથી વધુ ઉંમરના અરજદારો માટે જરૂરી." },
      examples: { en: "Form 1A downloaded from Parivahan and signed by MBBS doctor", hi: "परिवहन से डाउनलोड किया गया फॉर्म 1A", gu: "પરિવહન પરથી ડાઉનલોડ કરેલ ફોર્મ 1A" }
    },
    {
      id: 'parent_consent',
      condition: ageGroup === 'under18',
      title: { en: "Parental Consent", hi: "माता-पिता की सहमति", gu: "માતાપિતાની સંમતિ" },
      desc: { en: "Required for applicants between 16-18 applying for gearless vehicles.", hi: "16-18 वर्ष के बीच के आवेदकों के लिए आवश्यक।", gu: "16-18 વર્ષની વયના અરજદારો માટે જરૂરી." },
      examples: { en: "Signature of parent/guardian on the application form", hi: "आवेदन पत्र पर माता-पिता/अभिभावक के हस्ताक्षर", gu: "અરજી ફોર્મ પર વાલીની સહી" }
    }
  ];

  const visibleDocs = documents.filter(doc => doc.condition === undefined || doc.condition === true);
  const allChecked = visibleDocs.every(doc => checkedItems.includes(doc.id));

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-6 flex flex-col font-sans overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto w-full relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl mb-6 shadow-lg">
            <FileText className="text-emerald-400" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {lang === 'en' ? 'Documents Checklist' : lang === 'hi' ? 'दस्तावेज़ चेकलिस्ट' : 'દસ્તાવેજોની સૂચિ'}
          </h1>
          <p className="text-slate-400">
            {lang === 'en' ? 'Select your age group and tick off documents as you gather them.' : lang === 'hi' ? 'अपना आयु वर्ग चुनें और दस्तावेज़ों को इकट्ठा करते ही टिक करें।' : 'તમારું વય જૂથ પસંદ કરો અને દસ્તાવેજો એકત્રિત કરો તેમ ટિક કરો.'}
          </p>
        </div>

        {/* Age Group Filter */}
        <div className="bg-slate-900 border border-slate-800 p-2 rounded-2xl flex mb-8">
          <button onClick={() => setAgeGroup('under18')} className={`flex-1 py-3 px-2 rounded-xl text-sm font-bold transition ${ageGroup === 'under18' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
            {lang === 'en' ? '16-17 Years' : '16-17 वर्ष'}
          </button>
          <button onClick={() => setAgeGroup('18-40')} className={`flex-1 py-3 px-2 rounded-xl text-sm font-bold transition ${ageGroup === '18-40' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
            {lang === 'en' ? '18-40 Years' : '18-40 वर्ष'}
          </button>
          <button onClick={() => setAgeGroup('over40')} className={`flex-1 py-3 px-2 rounded-xl text-sm font-bold transition ${ageGroup === 'over40' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
            {lang === 'en' ? 'Over 40' : '40 से अधिक'}
          </button>
        </div>

        {/* Checklist */}
        <div className="space-y-4 mb-10">
          {visibleDocs.map((doc, idx) => {
            const isChecked = checkedItems.includes(doc.id);
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={doc.id} 
                onClick={() => toggleCheck(doc.id)}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${isChecked ? 'bg-emerald-950/20 border-emerald-500/50' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}
              >
                <div className="flex gap-4 items-start">
                  <div className="mt-1 shrink-0">
                    {isChecked ? <CheckCircle2 className="text-emerald-500" size={24} /> : <Circle className="text-slate-600" size={24} />}
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold mb-1 ${isChecked ? 'text-emerald-400' : 'text-white'}`}>
                      {doc.title[lang]}
                    </h3>
                    <p className="text-sm text-slate-400 mb-3">{doc.desc[lang]}</p>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        {lang === 'en' ? 'Accepted Examples:' : lang === 'hi' ? 'स्वीकृत उदाहरण:' : 'માન્ય ઉદાહરણો:'}
                      </p>
                      <p className="text-sm text-blue-200">{doc.examples[lang]}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link 
            to="/application" 
            className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition shadow-lg ${allChecked ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'}`}
          >
            {lang === 'en' ? 'Ready? Apply Now' : lang === 'hi' ? 'तैयार हैं? अभी आवेदन करें' : 'તૈયાર છો? હવે અરજી કરો'} <ChevronRight size={20} />
          </Link>
        </div>

      </div>
    </div>
  );
}