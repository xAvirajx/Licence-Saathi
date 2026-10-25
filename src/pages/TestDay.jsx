import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { 
  Laptop, CheckCircle2, AlertTriangle, Clock, 
  MapPin, ShieldCheck, ArrowRight, ArrowLeft,
  FileText, CheckSquare, Square, Info, Calendar,
  Camera, Fingerprint, AlertCircle, Sparkles,
  RefreshCw, Award, Compass, HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import RtoMap from '../components/RtoMap';

export default function TestDay() {
  const { lang, effectiveTheme } = useContext(AppContext);

  // Interactive Document Packing Checklist State
  const initialDocs = [
    { id: 'doc1', title: { en: 'Printed Form 2 (Application Form)', hi: 'फॉर्म 2 की प्रिंट कॉपी (आवेदन फॉर्म)', gu: 'ફોર્મ 2 ની પ્રિન્ટેડ કોપી (અરજી ફોર્મ)' }, desc: { en: 'Generated after fee payment with the official barcode.', hi: 'शुल्क भुगतान के बाद बारकोड सहित डाउनलोड किया गया।', gu: 'ફી ભર્યા બાદ બારકોડ સાથે ડાઉનલોડ કરેલ ફોર્મ.' } },
    { id: 'doc2', title: { en: 'Slot Booking Confirmation Slip', hi: 'स्लॉट बुकिंग पुष्टिकरण पर्ची', gu: 'સ્લોટ બુકિંગ કન્ફર્મેશન સ્લિપ' }, desc: { en: 'Shows designated test date, batch timing, and booth number.', hi: 'परीक्षा की तारीख, समय और आरटीओ कक्ष संख्या दर्शाती है।', gu: 'પરીક્ષાની તારીખ, બેચ સમય અને રૂમ નંબર દર્શાવતી સ્લિપ.' } },
    { id: 'doc3', title: { en: 'Original Government Age Proof', hi: 'मूल आयु प्रमाण पत्र', gu: 'અસલ ઉંમરનો પુરાવો' }, desc: { en: 'Original 10th marksheet, Birth Certificate, or Passport for officer verification.', hi: 'अधिकारी सत्यापन हेतु मूल 10वीं मार्कशीट या जन्म प्रमाण पत्र।', gu: 'ચકાસણી માટે ૧૦માની માર્કશીટ અથવા જન્મનો દાખલો.' } },
    { id: 'doc4', title: { en: 'Original Address Proof & Aadhaar', hi: 'मूल पता प्रमाण और आधार कार्ड', gu: 'અસલ સરનામાનો પુરાવો અને આધાર' }, desc: { en: 'Physical Aadhaar Card, Voter ID, or utility bill in your name.', hi: 'भौतिक आधार कार्ड, वोटर आईडी या अपने नाम का बिजली बिल।', gu: 'ઓરિજિનલ આધાર કાર્ડ, ચૂંટણી કાર્ડ અથવા લાઈટ બિલ.' } },
    { id: 'doc5', title: { en: 'Online Fee Payment Receipt', hi: 'ऑनलाइन शुल्क भुगतान रसीद', gu: 'ઓનલાઇન ફી પેમેન્ટની રસીદ' }, desc: { en: 'Proof of ₹200 LL test fee transaction from Sarathi portal.', hi: 'सारथी पोर्टल से ₹200 लर्नर लाइसेंस टेस्ट शुल्क की रसीद।', gu: 'પરિવહન પોર્ટલ પરથી ₹200 LL ટેસ્ટ ફી ભર્યાની રસીદ.' } },
    { id: 'doc6', title: { en: 'Medical Certificate (Form 1 / 1A)', hi: 'चिकित्सा प्रमाण पत्र (फॉर्म 1/1A)', gu: 'મેડિકલ સર્ટિફિકેટ (ફોર્મ 1/1A)' }, desc: { en: 'Self-declaration Form 1 for non-transport, or doctor signed Form 1A if age 40+.', hi: 'गैर-परिवहन के लिए फॉर्म 1, अथवा 40 वर्ष से अधिक होने पर डॉक्टर द्वारा हस्ताक्षरित फॉर्म 1A।', gu: 'સામાન્ય વાહન માટે ફોર્મ 1, અથવા 40+ ઉંમર માટે ડોક્ટર સાઇન કરેલ ફોર્મ 1A.' } }
  ];

  const [checkedDocs, setCheckedDocs] = useState(() => {
    try {
      const saved = localStorage.getItem('ls_testday_packed_docs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleDoc = (id) => {
    const updated = { ...checkedDocs, [id]: !checkedDocs[id] };
    setCheckedDocs(updated);
    localStorage.setItem('ls_testday_packed_docs', JSON.stringify(updated));
  };

  const packedCount = Object.values(checkedDocs).filter(Boolean).length;
  const packedPercentage = Math.round((packedCount / initialDocs.length) * 100);

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 flex flex-col font-sans">
      <div className="max-w-4xl mx-auto w-full relative z-10 space-y-12">

        {/* Back Link & Header */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            aria-label="Back to Home"
            className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Laptop size={14} />
              <span>Official RTO STALL Kiosk & Track Protocol</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {lang === 'en' ? 'RTO Test Day Protocol & Guide' : lang === 'hi' ? 'आरटीओ टेस्ट दिन प्रोटोकॉल और संपूर्ण गाइड' : 'RTO ટેસ્ટ દિવસ પ્રોટોકોલ અને સંપૂર્ણ ગાઇડ'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {lang === 'en' 
                ? 'Everything you need to know from entering the RTO gate to receiving your digital Learner Licence.' 
                : 'RTO ના દરવાજે પ્રવેશવાથી લઈને ડિજિટલ લાયસન્સ મેળવવા સુધીની તમામ સત્તાવાર માહિતી.'}
            </p>
          </div>
        </div>

        {/* 1. INTERACTIVE LEAFLET + OPENSTREETMAP TRACK LOCATOR */}
        <div id="rto-map" className="scroll-mt-6">
          <RtoMap />
        </div>

        {/* 2. PACKING CHECKLIST WITH PROGRESS METER */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800 mb-1">
                ✓ Interactive Checklist
              </div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck size={20} className="text-emerald-400" />
                <span>{lang === 'en' ? 'Documents to Carry in Your Physical Folder' : 'સાથે લઈ જવાના જરૂરી દસ્તાવેજોનું ચેકલિસ્ટ'}</span>
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'en' ? 'Tap each document as you pack it into your file to ensure zero rejections at the entry counter.' : 'તમારી ફાઇલમાં મુકતી વખતે દરેક દસ્તાવેજ પર ક્લિક કરી ચેક કરો.'}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-bold text-slate-300">
                {packedCount} of {initialDocs.length} {lang === 'en' ? 'Packed' : 'તૈયાર'}
              </span>
              <div className="w-32 h-2 bg-slate-950 rounded-full border border-slate-800 overflow-hidden mt-1">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${packedPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {initialDocs.map((doc) => {
              const isChecked = !!checkedDocs[doc.id];
              return (
                <button
                  key={doc.id}
                  onClick={() => toggleDoc(doc.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-emerald-950/30 border-emerald-600/50 shadow-md shadow-emerald-950/30'
                      : 'bg-slate-950 border-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare size={20} className="text-emerald-400 stroke-[2.5]" />
                    ) : (
                      <Square size={20} className="text-slate-500" />
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${isChecked ? 'text-emerald-300 line-through' : 'text-white'}`}>
                      {doc.title[lang] || doc.title.en}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {doc.desc[lang] || doc.desc.en}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
            <Info size={18} className="text-blue-400 shrink-0" />
            <span>
              {lang === 'en' 
                ? 'Original identity proofs are inspected and immediately returned to you on the spot. No originals are retained by the RTO.' 
                : 'ઓરિજિનલ દસ્તાવેજો માત્ર વેરિફિકેશન માટે જોઈને તરત જ પરત કરી દેવામાં આવે છે. RTO કોઈ અસલ દસ્તાવેજ રાખતું નથી.'}
            </span>
          </div>
        </div>

        {/* 3. CHRONOLOGICAL 4-PHASE TEST DAY TIMELINE */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {lang === 'en' ? 'Step-by-Step Test Day Walkthrough' : 'ટેસ્ટ દિવસનું પગલે પગલે સમયપત્રક'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {lang === 'en' ? 'What actually happens inside the RTO compound from arrival to departure.' : 'RTO પરિસરમાં પહોંચવાથી લઈને ટેસ્ટ પૂર્ણ થવા સુધીની પ્રક્રિયા.'}
            </p>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-emerald-500 before:to-transparent">
            
            {/* Phase 1 */}
            <div className="relative flex items-start gap-4 sm:gap-6 pl-1">
              <div className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-950 border-2 border-blue-500 text-blue-300 flex items-center justify-center shrink-0 font-bold text-xs sm:text-sm shadow-md">
                01
              </div>
              <div className="flex-1 pt-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">
                    {lang === 'en' ? 'Arrival & Token Generation' : 'આગમન અને ટોકન મેળવવું'}
                  </h3>
                  <span className="text-[10px] text-blue-400 bg-blue-950 px-2 py-0.5 rounded-full border border-blue-800 font-mono">
                    30 mins before slot
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {lang === 'en'
                    ? 'Report at the security reception counter with your printed Slot Slip. The security operator scans your barcode and issues your electronic queue token for the scrutiny room.'
                    : 'તમારા સ્લોટ સમયથી 30 મિનિટ પહેલાં RTO પહોંચો. રિસેપ્શન કાઉન્ટર પર તમારી સ્લિપ સ્કેન કરીને સ્ક્રુટિની રૂમ માટેનું ઇલેક્ટ્રોનિક ટોકન મેળવો.'}
                </p>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="relative flex items-start gap-4 sm:gap-6 pl-1">
              <div className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-950 border-2 border-indigo-500 text-indigo-300 flex items-center justify-center shrink-0 font-bold text-xs sm:text-sm shadow-md">
                02
              </div>
              <div className="flex-1 pt-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">
                    {lang === 'en' ? 'Biometrics & Document Verification' : 'બાયોમેટ્રિક્સ અને દસ્તાવેજ ચકાસણી'}
                  </h3>
                  <span className="text-[10px] text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-800 font-mono">
                    ~10 mins
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {lang === 'en'
                    ? 'The RTO scrutiny officer checks your physical self-attested documents against online records. You will provide your thumbprint biometric scan and an on-the-spot digital webcam photograph.'
                    : 'RTO અધિકારી તમારા અસલ દસ્તાવેજો ઓનલાઇન રેકોર્ડ સાથે સરખાવશે. ત્યારબાદ તમારો અંગૂઠાનો બાયોમેટ્રિક સ્કેન અને લાઇવ વેબકેમ ફોટો લેવામાં આવશે.'}
                </p>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="relative flex items-start gap-4 sm:gap-6 pl-1">
              <div className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-950 border-2 border-amber-500 text-amber-300 flex items-center justify-center shrink-0 font-bold text-xs sm:text-sm shadow-md">
                03
              </div>
              <div className="flex-1 pt-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">
                    {lang === 'en' ? 'The STALL Touchscreen Kiosk Exam' : 'STALL કમ્પ્યુટર પરીક્ષા'}
                  </h3>
                  <span className="text-[10px] text-amber-400 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-800 font-mono">
                    7.5 mins maximum
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {lang === 'en'
                    ? 'Enter the designated computer test hall and take your seat at the assigned touchscreen booth. You will enter your Application Number and Date of Birth to launch your 15-question exam in your chosen language.'
                    : 'નિયુક્ત કમ્પ્યુટર લેબમાં તમારા ટચસ્ક્રીન બૂથ પર બેસો. તમારો એપ્લિકેશન નંબર અને જન્મતારીખ દાખલ કરીને પસંદ કરેલી ભાષામાં 15 પ્રશ્નોની પરીક્ષા શરૂ કરો.'}
                </p>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="relative flex items-start gap-4 sm:gap-6 pl-1">
              <div className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-950 border-2 border-emerald-500 text-emerald-300 flex items-center justify-center shrink-0 font-bold text-xs sm:text-sm shadow-md">
                04
              </div>
              <div className="flex-1 pt-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">
                    {lang === 'en' ? 'Instant Result & Digital LL Issuance' : 'ત્વરિત પરિણામ અને લાયસન્સ ડાઉનલોડ'}
                  </h3>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800 font-mono">
                    Immediate
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {lang === 'en'
                    ? 'The moment you touch the 9th correct answer, the screen displays a green "PASSED" banner. Your Learner Licence is instantly generated and an SMS link is sent to your registered mobile phone for digital download.'
                    : 'જેવો તમે 9મો સાચો જવાબ આપશો, તરત જ સ્ક્રીન પર "PASSED" નું બેનર આવી જશે. તમારું ડિજિટલ લર્નર લાયસન્સ તાત્કાલિક જનરેટ થઈ જશે અને SMS દ્વારા લિંક આવી જશે.'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 4. OFFICIAL STALL KIOSK RULES & TECHNICAL CHEATSHEET */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock size={20} className="text-blue-400" />
              <span>{lang === 'en' ? 'STALL Touchscreen Exam Specifications (CMVR Rule 11)' : 'STALL કમ્પ્યુટર પરીક્ષાના નિયમો'}</span>
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'en' ? 'Exact parameters configured by the National Informatics Centre (NIC) in state RTOs.' : 'સરકારી નિયમો મુજબ કમ્પ્યુટર સિસ્ટમમાં સેટ કરેલા ચોક્કસ માપદંડો.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-2xl font-black text-white font-mono">15</span>
              <p className="text-xs font-bold text-slate-300">Total Questions</p>
              <p className="text-[11px] text-slate-500">Selected randomly from MoRTH repository</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-2xl font-black text-emerald-400 font-mono">9 / 15</span>
              <p className="text-xs font-bold text-slate-300">Passing Cut-off (60%)</p>
              <p className="text-[11px] text-slate-500">Auto-terminates as soon as you hit 9</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-2xl font-black text-amber-400 font-mono">30s</span>
              <p className="text-xs font-bold text-slate-300">Timer per Question</p>
              <p className="text-[11px] text-slate-500">Expiry automatically marks as incorrect</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-red-950/20 border border-red-900/50 space-y-2 text-xs text-slate-300">
            <p className="font-bold text-red-300 flex items-center gap-1.5">
              <AlertTriangle size={15} />
              <span>Disqualification Traps to Avoid inside Kiosk Room:</span>
            </p>
            <ul className="space-y-1 list-disc pl-4 text-slate-400">
              <li><strong>Mobile Phones:</strong> Bringing an active phone into the testing booth results in an immediate 6-month ban under Rule 11.</li>
              <li><strong>Looking at Neighboring Screens:</strong> The overhead AI surveillance cameras automatically flag head turns and terminate the test session.</li>
              <li><strong>Double Tapping:</strong> Touch each option firmly once; the kiosk hardware locks your answer without confirmation prompts.</li>
            </ul>
          </div>
        </div>

        {/* 5. RETEST PROTOCOL & COOLING PERIOD (CMVR RULE 14) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <RefreshCw size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {lang === 'en' ? 'What if you fail the computer test? (CMVR Rule 14)' : 'જો કમ્પ્યુટર ટેસ્ટમાં નાપાસ થાવ તો શું કરવું?'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'en' ? 'Don’t panic—you do NOT have to restart the application or pay agents.' : 'ગભરાવાની જરૂર નથી—નવી અરજી કરવાની કે એજન્ટને પૈસા આપવાની જરૂર નથી.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <p className="font-bold text-white">1. Mandatory 7-Day Cooling Period</p>
              <p className="text-slate-400">Under Rule 14 of the Central Motor Vehicles Rules, an applicant who fails can re-attempt the test after 7 days.</p>
            </div>
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <p className="font-bold text-white">2. Official ₹50 Retest Fee</p>
              <p className="text-slate-400">Pay only the ₹50 statutory retest fee online via Parivahan Sarathi. Never pay ₹500–₹1,000 to touts outside the gate.</p>
            </div>
          </div>
        </div>

        {/* 6. PRO-TIPS FOR FIRST-TIMERS & CALL TO ACTION */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Practice Makes Confident</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {lang === 'en' ? 'Ready to Rehearse on the Real Kiosk?' : 'શું તમે અસલી કિયોસ્ક સિમ્યુલેટર પર તૈયારી કરવા તૈયાર છો?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
              {lang === 'en' 
                ? 'Practice on our authentic 30-second touchscreen simulator with official IRC road signs and question bank.' 
                : 'વાસ્તવિક 30 સેકન્ડ ટાઈમર અને સત્તાવાર પ્રશ્નો સાથે મોક ટેસ્ટ આપી તમારો આત્મવિશ્વાસ વધારો.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <Link
              to="/mock-test"
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs sm:text-sm transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <span>Take STALL Mock Test</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/learn"
              className="px-5 py-3.5 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white rounded-xl font-bold text-xs sm:text-sm transition text-center"
            >
              <span>Review Road Signs</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}