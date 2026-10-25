import { useState, useContext } from 'react';
import { AppContext } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, AlertTriangle, FileText, Search, Copy, Check, 
  ExternalLink, Share2, ArrowRight, ArrowLeft, CheckCircle2, 
  HelpCircle, CreditCard, Sparkles, Download, Phone, ShieldCheck 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LostLicence() {
  const { lang } = useContext(AppContext);

  // Workflow steps: 1: Triage -> 2: Find DL Number -> 3: Police Lost Report -> 4: Parivahan Duplicate Application
  const [currentStep, setCurrentStep] = useState(1);
  const [reason, setReason] = useState('lost'); // 'lost' | 'damaged'
  const [knowsDlNumber, setKnowsDlNumber] = useState(null); // true | false
  const [selectedState, setSelectedState] = useState('Gujarat');
  const [copied, setCopied] = useState(false);

  // Checkable checklist for Step 4
  const [checkedItems, setCheckedItems] = useState({
    policeReport: false,
    formLld: false,
    addressProof: false,
    medicalForm: false
  });

  const toggleChecklist = (key) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // State Police Online Lost Property Portals
  const statePolicePortals = {
    'Gujarat': { name: 'Gujarat Police Citizen Portal (e-Cop)', url: 'https://gujhome.gujarat.gov.in/portal/' },
    'Delhi': { name: 'Delhi Police Lost Report Portal', url: 'https://delhipolice.gov.in/lost-and-found' },
    'Maharashtra': { name: 'Maharashtra Police Citizen Portal', url: 'https://mhpolice.maharashtra.gov.in/' },
    'Uttar Pradesh': { name: 'UP Police CCTNS Lost Report (UP COP)', url: 'https://uppolice.gov.in/' },
    'Karnataka': { name: 'Karnataka Police e-Lost Report', url: 'https://ksp.karnataka.gov.in/' },
    'Rajasthan': { name: 'Rajasthan Police Citizen Portal', url: 'https://police.rajasthan.gov.in/' },
    'Madhya Pradesh': { name: 'MP Police Citizen Services', url: 'https://citizen.mppolice.gov.in/' },
    'Other State': { name: 'Parivahan Sarathi Citizen Services', url: 'https://sarathi.parivahan.gov.in/' }
  };

  // Pre-formatted Police Complaint draft for Lost Article Intimation
  const policeReportDraft = {
    en: `Subject: Intimation regarding lost Driving Licence\n\nRespected Sir/Madam,\nI am writing to report the loss of my original Driving Licence. I accidentally misplaced it around [Approx. Date/Time] near [Location/Area]. Despite my best efforts, I have been unable to trace it.\n\nKindly register this lost article intimation and issue an acknowledgment/NCR so that I can apply for a Duplicate Driving Licence at the RTO under the Motor Vehicles Act.\n\nDetails:\n- Name: [Your Full Name]\n- Contact No: [Your Phone Number]\n- Approx. Year of Issue: [e.g. 2021]\n\nThank you.`,
    hi: `विषय: ड्राइविंग लाइसेंस गुम होने की सूचना\n\nमहोदय/महोदया,\nमेरा मूल ड्राइविंग लाइसेंस [तारीख] को [स्थान] के पास कहीं गिर गया या गुम हो गया है। काफी ढूंढने पर भी यह मुझे नहीं मिला।\n\nकृपया मेरी गुमशुदगी की सूचना दर्ज कर पावती/एनसीआर (NCR) जारी करने की कृपा करें, ताकि मैं मोटर वाहन अधिनियम के तहत आरटीओ में डुप्लीकेट लाइसेंस हेतु आवेदन कर सकूं।\n\nविवरण:\n- नाम: [आपका पूरा नाम]\n- मोबाइल नंबर: [आपका फोन नंबर]\n\nधन्यवाद।`,
    gu: `વિષય: ડ્રાઇવિંગ લાયસન્સ ખોવાઈ જવા બાબતની જાણ\n\nઆદરણીય સાહેબ/મેડમ,\nમારું અસલ ડ્રાઇવિંગ લાયસન્સ [તારીખ] ના રોજ [વિસ્તાર/સ્થળ] પાસે ખોવાઈ ગયું છે. ઘણી શોધખોળ કરવા છતાં તે મળી આવેલ નથી.\n\nઆથી નમ્ર વિનંતી કે મારી આ ખોવાયેલી વસ્તુની નોંધણી (NCR/Lost Report) કરી મને પહોંચ આપવા કૃપા કરશો, જેથી હું RTO માં ડુપ્લિકેટ લાયસન્સ માટે અરજી કરી શકું.\n\nવિગત:\n- નામ: [તમારું પૂરું નામ]\n- મોબાઈલ નંબર: [તમારો ફોન નંબર]\n\nઆભાર.`
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(policeReportDraft[lang] || policeReportDraft.en);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // WhatsApp share link for the Lost DL Checklist
  const shareText = 
    lang === 'gu'
      ? `🚨 મારું ડ્રાઇવિંગ લાયસન્સ ખોવાઈ ગયું છે! લાઇસન્સ સાથીના ગાઈડ મુજબ: કોઈ ફરીથી ડ્રાઇવિંગ ટેસ્ટ આપવાની જરૂર નથી. માત્ર ₹400 સરકારી ફીમાં ડુપ્લિકેટ લાયસન્સ મળી જશે. વિગતો: https://licence-saathi-v2.onrender.com/lost-licence`
      : lang === 'hi'
      ? `🚨 मेरा ड्राइविंग लाइसेंस गुम हो गया है! लाइसेंस साथी की 4-चरणीय गाइड: दोबारा कोई ड्राइविंग टेस्ट नहीं देना होगा। मात्र ₹400 सरकारी शुल्क में डुप्लीकेट लाइसेंस प्राप्त करें: https://licence-saathi-v2.onrender.com/lost-licence`
      : `🚨 Lost your Driving Licence? Don't pay ₹3,000 to agents! No driving re-test required. Get a Duplicate DL directly from RTO for ₹400. Guide: https://licence-saathi-v2.onrender.com/lost-licence`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 flex flex-col font-sans">
      <div className="max-w-3xl mx-auto w-full relative z-10">

        {/* Top Emergency Pill & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-xs uppercase tracking-wider mb-3">
            <ShieldAlert size={16} />
            {lang === 'en' ? 'Lost Licence SOS Recovery Guide' : lang === 'hi' ? 'गुमशुदा लाइसेंस आपातकालीन सहायता' : 'ખોવાયેલ લાયસન્સ ઈમરજન્સી માર્ગદર્શિકા'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            {lang === 'en' ? 'Lost Your Driving Licence?' : lang === 'hi' ? 'क्या आपका ड्राइविंग लाइसेंस खो गया है?' : 'શું તમારું ડ્રાઇવિંગ લાયસન્સ ખોવાઈ ગયું છે?'}
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            {lang === 'en' && 'Do not panic and never pay ₹2,000+ to touts. Follow our official 4-step recovery roadmap to get a replacement card.'}
            {lang === 'hi' && 'घबराएं नहीं और दलालों को ₹2,000+ न दें। डुप्लीकेट कार्ड प्राप्त करने के लिए हमारे 4-चरणीय आधिकारिक रोडमैप का पालन करें।'}
            {lang === 'gu' && 'ચિંતા કરશો નહીં અને એજન્ટોને વધારાના પૈસા ન આપો. ડુપ્લિકેટ કાર્ડ મેળવવા માટે અમારા 4-પગલાંના સત્તાવાર રોડમેપનું પાલન કરો.'}
          </p>
        </div>

        {/* Stepper Progress Bar */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {[
            { num: 1, title: { en: 'Triage', hi: 'स्थिति', gu: 'સ્થિતિ' } },
            { num: 2, title: { en: 'DL Number', hi: 'डीएल नंबर', gu: 'DL નંબર' } },
            { num: 3, title: { en: 'Police NCR', hi: 'पुलिस रिपोर्ट', gu: 'પોલીસ રિપોર્ટ' } },
            { num: 4, title: { en: 'Apply Online', hi: 'आवेदन', gu: 'અરજી' } }
          ].map(s => (
            <div key={s.num} className="text-center">
              <div className={`h-1.5 rounded-full mb-2 transition-all ${currentStep >= s.num ? 'bg-blue-600' : 'bg-slate-800'}`} />
              <span className={`text-[11px] font-bold ${currentStep === s.num ? 'text-blue-400' : 'text-slate-500'}`}>
                {s.num}. {s.title[lang] || s.title.en}
              </span>
            </div>
          ))}
        </div>

        {/* Step Container */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <AnimatePresence mode="wait">

            {/* STEP 1: TRIAGE & MYTH-BUSTING */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">1</div>
                  <h2 className="text-xl font-bold">
                    {lang === 'en' ? 'First: What happened to your card?' : lang === 'hi' ? 'सबसे पहले: आपके कार्ड के साथ क्या हुआ?' : 'સૌ પ્રથમ: તમારા કાર્ડ સાથે શું થયું?'}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <button
                    onClick={() => setReason('lost')}
                    className={`p-4 rounded-2xl border-2 text-left transition ${
                      reason === 'lost' 
                        ? 'border-blue-500 bg-blue-950/20 shadow-md' 
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <p className="font-bold text-white mb-1">
                      {lang === 'en' ? 'Lost or Stolen' : lang === 'hi' ? 'गुम हो गया या चोरी हुआ' : 'ખોવાઈ ગયું અથવા ચોરાઈ ગયું'}
                    </p>
                    <p className="text-xs text-slate-400">
                      {lang === 'en' ? 'Requires online Police Lost Property intimation (NCR).' : 'ऑनलाइन पुलिस शिकायत (NCR) की प्रति आवश्यक होगी।'}
                    </p>
                  </button>

                  <button
                    onClick={() => setReason('damaged')}
                    className={`p-4 rounded-2xl border-2 text-left transition ${
                      reason === 'damaged' 
                        ? 'border-blue-500 bg-blue-950/20 shadow-md' 
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <p className="font-bold text-white mb-1">
                      {lang === 'en' ? 'Broken, Torn or Faded' : lang === 'hi' ? 'टूट गया, फट गया या धुंधला' : 'તૂટી ગયું, ફાટી ગયું કે ઝાંખું થયું'}
                    </p>
                    <p className="text-xs text-slate-400">
                      {lang === 'en' ? 'No police report needed! Just surrender the damaged pieces.' : 'पुलिस रिपोर्ट की आवश्यकता नहीं है! केवल पुराना कार्ड जमा करना होगा।'}
                    </p>
                  </button>
                </div>

                {/* Myth Buster Notice Box */}
                <div className="p-4 bg-emerald-950/20 border border-emerald-900/50 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <ShieldCheck size={18} />
                    {lang === 'en' ? 'Crucial Legal Facts (Do Not Worry!):' : lang === 'hi' ? 'महत्वपूर्ण कानूनी तथ्य (चिंता न करें!):' : 'મહત્વના કાનૂની તથ્યો (ચિંતા કરશો નહીં!):'}
                  </div>
                  <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc pl-5">
                    <li>
                      <strong>{lang === 'en' ? 'No Re-Test Required:' : 'दोबारा टेस्ट की जरूरत नहीं:'}</strong> {lang === 'en' ? 'Your driving authority never expires because a plastic card is lost. You do not need to give any driving test again.' : 'प्लास्टिक कार्ड खो जाने से आपका ड्राइविंग अधिकार समाप्त नहीं होता।'}
                    </li>
                    <li>
                      <strong>{lang === 'en' ? 'Legal Digital Copy in 60s:' : '60 सेकंड में डिजिटल कॉपी:'}</strong> {lang === 'en' ? 'Under Rule 139 of CMVR, your virtual DL on DigiLocker or mParivahan app is 100% legally valid for police verification.' : 'DigiLocker અથવા mParivahan પર ઉપલબ્ધ ડિજિટલ DL કાયદેસર રીતે 100% માન્ય છે.'}
                    </li>
                  </ul>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition shadow-lg shadow-blue-600/30 text-sm"
                  >
                    {lang === 'en' ? 'Next: DL Number Check' : lang === 'hi' ? 'अगला: डीएल नंबर जांच' : 'આગળ: DL નંબર તપાસ'}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: FIND YOUR DL NUMBER */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h2 className="text-xl font-bold">
                      {lang === 'en' ? 'Do you know your Driving Licence Number?' : lang === 'hi' ? 'क्या आपको अपना डीएल नंबर याद है?' : 'શું તમને તમારો DL નંબર યાદ છે?'}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {lang === 'en' ? 'Example format: GJ01 20210012345 (15 to 16 characters)' : 'ઉદાહરણ: GJ01 20210012345 (15 થી 16 અક્ષરો)'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setKnowsDlNumber(true)}
                    className={`p-4 rounded-2xl border text-center font-bold text-sm transition ${
                      knowsDlNumber === true
                        ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300'
                        : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {lang === 'en' ? 'Yes, I have it / have a photo' : lang === 'hi' ? 'हाँ, मुझे याद है / फोटो है' : 'હા, મારી પાસે ફોટો/નંબર છે'}
                  </button>

                  <button
                    onClick={() => setKnowsDlNumber(false)}
                    className={`p-4 rounded-2xl border text-center font-bold text-sm transition ${
                      knowsDlNumber === false
                        ? 'border-amber-500 bg-amber-950/30 text-amber-300'
                        : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {lang === 'en' ? 'No, I don’t remember it' : lang === 'hi' ? 'नहीं, मुझे याद नहीं है' : 'ના, મને યાદ નથી'}
                  </button>
                </div>

                {/* If User Does Not Know DL Number */}
                {knowsDlNumber === false && (
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Search size={15} />
                      {lang === 'en' ? '4 Easy Ways to Retrieve Your Number Right Now:' : lang === 'hi' ? 'अपना नंबर तुरंत ढूंढने के 4 आसान तरीके:' : 'તમારો નંબર શોધવાના 4 સરળ રસ્તા:'}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="font-bold text-white mb-1">1. Vehicle Insurance Policy</p>
                        <p className="text-slate-400">Check your car/two-wheeler insurance policy schedule PDF. Your DL number is usually printed under driver details.</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="font-bold text-white mb-1">2. Traffic e-Challan SMS</p>
                        <p className="text-slate-400">Search &ldquo;challan&rdquo; in your SMS inbox or visit echallan.parivahan.gov.in using your vehicle registration number.</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="font-bold text-white mb-1">3. DigiLocker Account</p>
                        <p className="text-slate-400">Log in to digilocker.gov.in using Aadhaar OTP. Pull Ministry of Road Transport → Driving Licence.</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="font-bold text-white mb-1">4. Parivahan Portal Search</p>
                        <p className="text-slate-400">Visit sarathi.parivahan.gov.in → &ldquo;Find Application Number&rdquo; using your Name + Date of Birth.</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition text-sm flex items-center gap-1"
                  >
                    <ArrowLeft size={16} /> {lang === 'en' ? 'Back' : 'पीछे'}
                  </button>

                  <button
                    onClick={() => setCurrentStep(reason === 'lost' ? 3 : 4)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition shadow-lg text-sm"
                  >
                    {reason === 'lost' 
                      ? (lang === 'en' ? 'Next: Police Report' : 'अगला: पुलिस रिपोर्ट') 
                      : (lang === 'en' ? 'Next: Duplicate Application' : 'अगला: आवेदन')}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: STATE POLICE ONLINE NCR GENERATOR */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h2 className="text-xl font-bold">
                      {lang === 'en' ? 'File Online Lost Article Report (NCR)' : lang === 'hi' ? 'ऑनलाइन पुलिस गुमशुदगी रिपोर्ट (NCR) दर्ज करें' : 'ઓનલાઇન પોલીસ ગુમશુદગી નોંધણી (NCR)'}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {lang === 'en' ? 'You do NOT need to visit a police station. Most states offer 100% online lost reports in 5 minutes.' : 'પોલીસ સ્ટેશન જવાની જરૂર નથી. મોટાભાગના રાજ્યોમાં 5 મિનિટમાં ઓનલાઇન રિપોર્ટ થાય છે.'}
                    </p>
                  </div>
                </div>

                {/* State Police Selector */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    {lang === 'en' ? 'Select Your State:' : 'अपना राज्य चुनें:'}
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500"
                  >
                    {Object.keys(statePolicePortals).map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-medium">
                      {statePolicePortals[selectedState]?.name}
                    </span>
                    <a
                      href={statePolicePortals[selectedState]?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 text-xs font-bold transition border border-blue-500/30"
                    >
                      <span>Open Official Portal</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                {/* Copy-Paste Complaint Text Box */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {lang === 'en' ? 'Ready Complaint Text (Copy & Paste):' : 'शिकायत का प्रारूप (कॉपी करें):'}
                    </p>
                    <button
                      onClick={handleCopyText}
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                    </button>
                  </div>
                  <pre className="text-xs text-slate-300 bg-slate-900 p-3 rounded-xl whitespace-pre-wrap font-sans border border-slate-800/80 leading-relaxed">
                    {policeReportDraft[lang] || policeReportDraft.en}
                  </pre>
                  <p className="text-[11px] text-slate-500">
                    * Download the PDF acknowledgment after submitting on the police portal. You will upload this on Parivahan Sarathi.
                  </p>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition text-sm flex items-center gap-1"
                  >
                    <ArrowLeft size={16} /> {lang === 'en' ? 'Back' : 'पीछे'}
                  </button>

                  <button
                    onClick={() => setCurrentStep(4)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition shadow-lg text-sm"
                  >
                    {lang === 'en' ? 'Next: Parivahan Sarathi Guide' : 'अगला: परिवहन सारथी आवेदन'}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: FORM LLD DUPLICATE DL SIMULATOR & APPLICATION CHECKLIST */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">4</div>
                  <div>
                    <h2 className="text-xl font-bold">
                      {lang === 'en' ? 'Apply on Parivahan Sarathi (Form LLD)' : lang === 'hi' ? 'परिवहन सारथी पर आवेदन (फॉर्म LLD)' : 'પરિવહન સારથી પર અરજી (ફોર્મ LLD)'}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {lang === 'en' ? 'Exact RTO government fee breakdown & mandatory documents' : 'સત્તાવાર સરકારી ફી અને જરૂરી દસ્તાવેજો'}
                    </p>
                  </div>
                </div>

                {/* Government Fee Breakdown Card */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <CreditCard size={15} />
                      {lang === 'en' ? 'Official Government Fee:' : 'सरकारी शुल्क:'}
                    </span>
                    <span className="text-xl font-extrabold text-emerald-400 font-mono">₹400</span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span>• Duplicate DL Service Fee (Rule 32):</span>
                      <span className="font-mono">₹200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Smart Card / Form 7 Fee:</span>
                      <span className="font-mono">₹200</span>
                    </div>
                    <div className="flex justify-between pt-1 text-slate-500 text-[11px]">
                      <span>Agent/Broker charge outside RTO:</span>
                      <span className="line-through">₹2,500 – ₹4,000</span>
                    </div>
                  </div>
                </div>

                {/* Document Verification Checklist */}
                <div className="space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {lang === 'en' ? 'Document Checklist (Tick as you collect):' : 'દસ્તાવેજ ચેકલિસ્ટ:'}
                  </p>

                  <div 
                    onClick={() => toggleChecklist('policeReport')}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
                      checkedItems.policeReport ? 'bg-emerald-950/20 border-emerald-800/80' : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${checkedItems.policeReport ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-600'}`}>
                      {checkedItems.policeReport && <Check size={14} className="stroke-[3]" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Online Police Lost Property Report (NCR) Printout</p>
                      <p className="text-[11px] text-slate-400">Generated in Step 3. (Not required if licence is physically damaged).</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => toggleChecklist('formLld')}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
                      checkedItems.formLld ? 'bg-emerald-950/20 border-emerald-800/80' : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${checkedItems.formLld ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-600'}`}>
                      {checkedItems.formLld && <Check size={14} className="stroke-[3]" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Form LLD (Intimation of Loss & Application for Duplicate)</p>
                      <p className="text-[11px] text-slate-400">Filled online automatically on Sarathi; print and sign after fee payment.</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => toggleChecklist('addressProof')}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
                      checkedItems.addressProof ? 'bg-emerald-950/20 border-emerald-800/80' : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${checkedItems.addressProof ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-600'}`}>
                      {checkedItems.addressProof && <Check size={14} className="stroke-[3]" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Copy of Current Address Proof</p>
                      <p className="text-[11px] text-slate-400">Voter ID, Electricity Bill, or Passport photocopy.</p>
                    </div>
                  </div>
                </div>

                {/* Final Launch Actions */}
                <div className="space-y-3 pt-2">
                  <a
                    href="https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/30 text-sm"
                  >
                    <span>{lang === 'en' ? 'Open Official Parivahan Duplicate Portal' : 'સત્તાવાર પરિવહન પોર્ટલ પર જાઓ'}</span>
                    <ExternalLink size={16} />
                  </a>

                  <div className="flex gap-2.5">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-slate-950 border border-[#25D366]/40 font-bold p-3 rounded-xl transition flex items-center justify-center gap-2 text-xs"
                    >
                      <Share2 size={15} />
                      <span>{lang === 'en' ? 'Share Checklist on WhatsApp' : 'વોટ્સએપ પર યાદી મોકલો'}</span>
                    </a>

                    <Link
                      to="/"
                      className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold transition text-xs flex items-center justify-center"
                    >
                      {lang === 'en' ? 'Home' : 'હોમ'}
                    </Link>
                  </div>
                </div>

                <div className="flex justify-start pt-2">
                  <button
                    onClick={() => setCurrentStep(reason === 'lost' ? 3 : 2)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold transition text-xs flex items-center gap-1"
                  >
                    <ArrowLeft size={14} /> {lang === 'en' ? 'Previous Step' : 'પાછળ'}
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}