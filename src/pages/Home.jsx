import { useState, useContext, useRef } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, ArrowRight, Clock, ShieldAlert, 
  FileText, BookOpen, Laptop
} from 'lucide-react';
import InstallModal from '../components/InstallModal';

export default function Home() {
  const { lang, effectiveTheme } = useContext(AppContext);
  const journeyRef = useRef(null);

  // Active Journey Stage (1 to 6)
  const [currentStage, setCurrentStage] = useState(() => {
    return parseInt(localStorage.getItem('licenceJourneyStage') || '6', 10);
  });

  const handleSelectJourney = (stageNum) => {
    setCurrentStage(stageNum);
    localStorage.setItem('licenceJourneyStage', stageNum.toString());
    if (journeyRef.current) {
      journeyRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToJourney = () => {
    if (journeyRef.current) {
      journeyRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const journeySteps = [
    {
      num: 1,
      title: { 
        en: '1. Check you can apply', 
        hi: '1. पात्रता की जांच करें', 
        gu: '1. તમે અરજી કરી શકો છો તે તપાસો' 
      },
      desc: { 
        en: 'Verify your age, vehicle category, and medical requirements.', 
        hi: 'अपनी आयु, वाहन श्रेणी और चिकित्सा आवश्यकताओं को सत्यापित करें।', 
        gu: 'તમારી ઉંમર, વાહન કેટેગરી અને મેડિકલ નિયમો ચકાસો.' 
      },
      link: '/eligibility',
      btnText: { en: 'Check Eligibility', hi: 'पात्रता जांचें', gu: 'પાત્રતા તપાસો' }
    },
    {
      num: 2,
      title: { 
        en: "2. Apply for a learner's licence", 
        hi: '2. लर्नर लाइसेंस के लिए आवेदन करें', 
        gu: '2. લર્નર લાયસન્સ માટે અરજી કરો' 
      },
      desc: { 
        en: 'Complete online form rehearsal, verify documents, and simulate payment.', 
        hi: 'ऑनलाइन फॉर्म रिहर्सल पूरा करें, दस्तावेज सत्यापित करें और शुल्क सिमुलेट करें।', 
        gu: 'ઓનલાઇન ફોર્મ ભરો, દસ્તાવેજો ચકાસો અને ફી સિમ્યુલેટ કરો.' 
      },
      link: '/application',
      btnText: { en: 'Apply Now', hi: 'आवेदन करें', gu: 'અરજી કરો' }
    },
    {
      num: 3,
      title: { 
        en: "3. Pass the learner's test", 
        hi: '3. लर्नर टेस्ट पास करें', 
        gu: '3. લર્નર કમ્પ્યુટર ટેસ્ટ પાસ કરો' 
      },
      desc: { 
        en: 'Rehearse on the authentic RTO touchscreen kiosk simulator with IRC road signs.', 
        hi: 'IRC सड़क संकेतों के साथ वास्तविक आरटीओ टचस्क्रीन कियोस्क सिम्युलेटर पर अभ्यास करें।', 
        gu: 'અસલી RTO ટચસ્ક્રીન કિયોસ્ક સિમ્યુલેટર પર પરીક્ષાની પ્રેક્ટિસ કરો.' 
      },
      link: '/mock-test',
      btnText: { en: 'Take Mock Test', hi: 'मॉक टेस्ट दें', gu: 'મોક ટેસ્ટ આપો' }
    },
    {
      num: 4,
      title: { 
        en: '4. Wait 30 days & apply for permanent', 
        hi: '4. 30 दिन प्रतीक्षा करें और स्थायी डीएल हेतु आवेदन करें', 
        gu: '4. 30 દિવસ રાહ જુઓ અને કાયમી DL માટે અરજી કરો' 
      },
      desc: { 
        en: 'Motor Vehicles Act requires holding LL for 30 days before taking driving test.', 
        hi: 'ड्राइविंग टेस्ट देने से पहले 30 दिनों तक लर्नर लाइसेंस होना अनिवार्य है।', 
        gu: 'ડ્રાઇવિંગ ટેસ્ટ આપતા પહેલા 30 દિવસ સુધી લર્નર લાયસન્સ રાખવું ફરજિયાત છે.' 
      },
      link: '/permanent-licence',
      btnText: { en: 'Check Dates', hi: 'तिथियां जांचें', gu: 'તારીખો તપાસો' }
    },
    {
      num: 5,
      title: { 
        en: '5. Pass the driving test', 
        hi: '5. ड्राइविंग टेस्ट पास करें', 
        gu: '5. પ્રેક્ટિકલ ડ્રાઇવિંગ ટેસ્ટ પાસ કરો' 
      },
      desc: { 
        en: 'Learn track maneuvers: Track 8, Parallel Parking, and Gradient hill starts.', 
        hi: 'ट्रैक तकनीकें सीखें: ट्रैक 8, पैरेलल पार्किंग और चढ़ाई पर वाहन नियंत्रण।', 
        gu: 'RTO ટ્રેકની તૈયારી કરો: 8 આકાર, રિવર્સ પાર્કિંગ અને ચઢાણ ટેસ્ટ.' 
      },
      link: '/driving-test',
      btnText: { en: 'Track Guide', hi: 'ट्रैक गाइड', gu: 'ટ્રેક ગાઇડ' }
    },
    {
      num: 6,
      title: { 
        en: '6. Receive your licence', 
        hi: '6. अपना लाइसेंस प्राप्त करें', 
        gu: '6. તમારું સ્માર્ટ કાર્ડ લાયસન્સ મેળવો' 
      },
      desc: { 
        en: 'Track your dispatched smart card or download virtual DL on DigiLocker.', 
        hi: 'अपने भेजे गए स्मार्ट कार्ड को ट्रैक करें या डिजिलॉकर पर वर्चुअल डीएल डाउनलोड करें।', 
        gu: 'તમારું સ્પીડ પોસ્ટ સ્ટેટસ ટ્રેક કરો અથવા DigiLocker પરથી ડાઉનલોડ કરો.' 
      },
      link: '/track-app',
      btnText: { en: 'Track Status', hi: 'स्थिति ट्रैक करें', gu: 'સ્ટેટસ ટ્રેક કરો' }
    }
  ];

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 flex flex-col font-sans overflow-hidden">
      
      {/* 🚀 Universal One-Time Install Pop-Up (Laptops, Android, & iOS) */}
      <InstallModal />

      <div className="max-w-4xl mx-auto w-full relative z-10 space-y-12">

        {/* 1. HERO SECTION (Image 2 Headline & Gradient Text) */}
        <section className="text-center pt-4 sm:pt-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-medium text-xs sm:text-sm tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{lang === 'en' ? 'Stress-free mParivahan assistance' : lang === 'hi' ? 'तनाव-मुक्त एम-परिवहन सहायता' : 'તણાવમુક્ત mParivahan માર્ગદર્શિકા'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.18]">
            {lang === 'en' && (
              <>
                Getting your driving licence <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  shouldn't feel like a test.
                </span>
              </>
            )}
            {lang === 'hi' && (
              <>
                ड्राइविंग लाइसेंस पाना <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  किसी परीक्षा जैसा नहीं लगना चाहिए।
                </span>
              </>
            )}
            {lang === 'gu' && (
              <>
                ડ્રાઇવિંગ લાયસન્સ મેળવવું <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  મુશ્કેલ પરીક્ષા જેવું ન લાગવું જોઈએ.
                </span>
              </>
            )}
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {lang === 'en' && 'Navigate the Indian RTO process with ease. Check eligibility, gather documents, practice mock tests, and track your status.'}
            {lang === 'hi' && 'भारतीय आरटीओ प्रक्रिया को आसानी से पूरा करें। पात्रता जांचें, दस्तावेज एकत्र करें, मॉक टेस्ट दें और अपनी स्थिति ट्रैक करें।'}
            {lang === 'gu' && 'ભારતીય RTO પ્રક્રિયા સરળતાથી સમજો. પાત્રતા ચકાસો, દસ્તાવેજ તૈયાર કરો, મોક ટેસ્ટ આપો અને સ્ટેટસ ટ્રેક કરો.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center pt-1">
            <button
              onClick={scrollToJourney}
              className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/30 text-sm sm:text-base"
            >
              <span>{lang === 'en' ? 'Start Journey' : lang === 'hi' ? 'यात्रा शुरू करें' : 'પ્રવાસ શરૂ કરો'}</span>
              <ArrowRight size={18} />
            </button>

            <Link
              to="/mock-test"
              className="w-full sm:w-auto px-7 py-3.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-white rounded-2xl font-bold transition text-sm sm:text-base text-center backdrop-blur-md"
            >
              {lang === 'en' ? 'Take Mock Test' : lang === 'hi' ? 'मॉक टेस्ट दें' : 'મોક ટેસ્ટ આપો'}
            </Link>
          </div>
        </section>

        {/* 2. WHERE ARE YOU IN YOUR LICENCE JOURNEY? (With Ambient Green/Teal Backlight) */}
        <section className="space-y-4 relative">
          
          {/* 🌿 Exact Emerald/Teal Ambient Gradient positioned directly behind the Options & Journey Map */}
          {effectiveTheme !== 'light' && (
            <div className="pointer-events-none absolute -top-8 -bottom-16 left-1/2 -translate-x-1/2 w-[120%] max-w-3xl bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.18)_0%,_rgba(6,182,212,0.12)_35%,_transparent_70%)] blur-3xl -z-10" />
          )}

          <div className="text-left">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {lang === 'en' ? 'Where are you in your licence journey?' : lang === 'hi' ? 'आप अपनी लाइसेंस यात्रा में कहाँ हैं?' : 'તમે તમારી લાયસન્સ યાત્રામાં ક્યાં છો?'}
            </h2>
          </div>

          <div className="flex flex-col gap-3 relative z-10">
            {[
              {
                stage: 1,
                title: { 
                  en: 'Just starting', 
                  hi: 'अभी शुरुआत', 
                  gu: 'હમણાં શરૂઆત' 
                },
                sub: { 
                  en: 'I need to check rules & apply', 
                  hi: 'मुझे नियम जांचने और आवेदन करने की आवश्यकता है', 
                  gu: 'મારે નિયમો ચકાસવા અને અરજી કરવી છે' 
                }
              },
              {
                stage: 4,
                title: { 
                  en: "I have a learner's licence", 
                  hi: 'मेरे पास लर्नर लाइसेंस है', 
                  gu: 'મારી પાસે લર્નર લાયસન્સ છે' 
                },
                sub: { 
                  en: 'I am waiting to get my permanent DL', 
                  hi: 'मैं स्थायी डीएल प्राप्त करने की प्रतीक्षा कर रहा हूँ', 
                  gu: 'હું કાયમી DL મેળવવાની રાહ જોઈ રહ્યો છું' 
                }
              },
              {
                stage: 5,
                title: { 
                  en: "I've booked my driving test", 
                  hi: 'मैंने ड्राइविंग टेस्ट बुक कर लिया है', 
                  gu: 'મેં ડ્રાઇવિંગ ટેસ્ટ બુક કર્યો છે' 
                },
                sub: { 
                  en: 'I need to prepare for the test day', 
                  hi: 'मुझे टेस्ट के दिन की तैयारी करनी है', 
                  gu: 'મારે ટેસ્ટના દિવસની તૈયારી કરવી છે' 
                }
              },
              {
                stage: 6,
                title: { 
                  en: "I've applied & waiting", 
                  hi: 'मैंने आवेदन कर दिया है और प्रतीक्षा में हूँ', 
                  gu: 'મેં અરજી કરી છે અને રાહ જોઈ રહ્યો છું' 
                },
                sub: { 
                  en: 'I want to track my DL status', 
                  hi: 'मैं अपने डीएल की स्थिति ट्रैक करना चाहता हूँ', 
                  gu: 'હું મારા DL નું સ્ટેટસ ટ્રેક કરવા માંગુ છું' 
                }
              }
            ].map((choice) => {
              const isSelected = currentStage === choice.stage;

              return (
                <button
                  key={choice.stage}
                  onClick={() => handleSelectJourney(choice.stage)}
                  className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 active:scale-[0.99] ${
                    isSelected
                      ? 'bg-[#0c192f]/85 border-blue-500 shadow-[0_0_22px_rgba(59,130,246,0.25)] ring-1 ring-blue-500/50'
                      : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70'
                  } backdrop-blur-md`}
                >
                  <p className="text-base sm:text-lg font-bold text-white mb-0.5 leading-snug tracking-tight">
                    {choice.title[lang] || choice.title.en}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 font-normal">
                    {choice.sub[lang] || choice.sub.en}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. YOUR JOURNEY MAP (6-Step Stepper with Emerald Accent) */}
        <section ref={journeyRef} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle green ambient reflection on Journey Map top rim */}
          {effectiveTheme !== 'light' && (
            <div className="pointer-events-none absolute -top-16 left-1/4 w-96 h-32 bg-emerald-500/10 blur-3xl rounded-full" />
          )}

          <div className="mb-8 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lang === 'en' ? 'Your Journey Map' : lang === 'hi' ? 'आपका यात्रा मानचित्र' : 'તમારો પ્રવાસ નકશો'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {lang === 'en' 
                ? 'Follow these 6 legal stages to secure your permanent smart card licence without bribes or touts.'
                : 'કોઈ પણ એજન્ટ વગર ડ્રાઇવિંગ લાયસન્સ મેળવવા માટેના 6 સત્તાવાર પગલાં.'}
            </p>
          </div>

          <div className="space-y-6 relative z-10 before:absolute before:inset-0 before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-slate-700 before:to-transparent">
            {journeySteps.map((step) => {
              const isPast = step.num < currentStage;
              const isCurrent = step.num === currentStage;

              return (
                <div key={step.num} className="relative flex items-start gap-4 sm:gap-6 pl-1">
                  {/* Step Marker Circle */}
                  <div className={`relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                    isPast
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-950/50'
                      : isCurrent
                      ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/40 ring-4 ring-blue-500/20'
                      : 'bg-slate-950 border-slate-700 text-slate-500'
                  }`}>
                    {isPast ? (
                      <CheckCircle2 size={20} className="stroke-[2.5]" />
                    ) : (
                      <span className="font-bold text-xs sm:text-sm">{step.num}</span>
                    )}
                  </div>

                  {/* Step Details & Action */}
                  <div className="flex-1 pt-1">
                    <h3 className={`text-base sm:text-lg font-bold transition-colors ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                      {step.title[lang] || step.title.en}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
                      {step.desc[lang] || step.desc.en}
                    </p>

                    {/* Active Action Button */}
                    {isCurrent && (
                      <div className="mt-4">
                        <Link
                          to={step.link}
                          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs sm:text-sm transition shadow-md shadow-blue-600/30"
                        >
                          <span>{step.btnText[lang] || step.btnText.en}</span>
                          <ArrowRight size={15} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. EMERGENCY: LOST LICENCE SOS BANNER */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-950/40 via-slate-900/80 to-slate-900 border border-red-900/40 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-xs uppercase tracking-wider">
                <ShieldAlert size={14} />
                <span>{lang === 'en' ? 'Emergency Assistance' : lang === 'hi' ? 'आपातकालीन सहायता' : 'ઇમરજન્સી સહાય'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {lang === 'en' ? 'Lost or Damaged Driving Licence?' : lang === 'hi' ? 'ड्राइविंग लाइसेंस खो गया या टूट गया?' : 'ડ્રાઇવિંગ લાયસન્સ ખોવાઈ ગયું છે?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
                {lang === 'en' && 'No driving re-test required! File an online police NCR in 5 minutes and apply for a duplicate card for just ₹400 official fee.'}
                {lang === 'hi' && 'दोबारा टेस्ट की जरूरत नहीं! 5 मिनट में ऑनलाइन पुलिस रिपोर्ट दर्ज करें और ₹400 सरकारी शुल्क में डुप्लीकेट कार्ड प्राप्त करें।'}
                {lang === 'gu' && 'કોઈ નવો ટેસ્ટ આપવો નહીં પડે! 5 મિનિટમાં ઓનલાઇન પોલીસ રિપોર્ટ કરી માત્ર ₹400 સરકારી ફીમાં નવું કાર્ડ મેળવો.'}
              </p>
            </div>

            <Link
              to="/lost-licence"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-red-900/40 shrink-0"
            >
              <span>{lang === 'en' ? 'Recover Licence' : lang === 'hi' ? 'लाइसेंस पुनः प्राप्त करें' : 'લાયસન્સ પુનઃપ્રાપ્ત કરો'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* 5. PRACTICE & PREPARATION TOOLS GRID */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lang === 'en' ? 'Practice & Preparation Tools' : lang === 'hi' ? 'अभ्यास और तैयारी उपकरण' : 'પ્રેક્ટિસ અને તૈયારી માટેના સાધનો'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {lang === 'en' ? 'Interactive simulators designed to pass your RTO exams on the first attempt.' : 'પ્રથમ પ્રયાસે RTO પરીક્ષા પાસ કરવા માટેના ખાસ ટૂલ્સ.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/test-day"
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/60 hover:bg-slate-900 transition flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Laptop size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {lang === 'en' ? 'RTO STALL Kiosk Simulator' : lang === 'hi' ? 'आरटीओ कियोस्क सिम्युलेटर' : 'RTO કિયોસ્ક સિમ્યુલેટર'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {lang === 'en' ? 'Experience the exact touchscreen computer test with real 30s timer and controls.' : 'વાસ્તવિક 30 સેકન્ડ ટાઈમર સાથે અસલી RTO કમ્પ્યુટર પરીક્ષાનો અનુભવ.'}
                </p>
              </div>
            </Link>

            <Link
              to="/learn"
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/60 hover:bg-slate-900 transition flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {lang === 'en' ? 'IRC Road Signs Flashcards' : lang === 'hi' ? 'आईआरसी सड़क संकेत' : 'IRC ટ્રાફિક રોડ સાઇન'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {lang === 'en' ? 'Master mandatory, cautionary, and informatory Indian road signs.' : 'ફરજિયાત, ચેતવણી અને માહિતી આપતા તમામ રોડ સાઇન શીખો.'}
                </p>
              </div>
            </Link>

            <Link
              to="/documents"
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/60 hover:bg-slate-900 transition flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <FileText size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {lang === 'en' ? 'Document Advisor' : lang === 'hi' ? 'दस्तावेज़ सलाहकार' : 'જરૂરી દસ્તાવેજ માર્ગદર્શિકા'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {lang === 'en' ? 'Get an exact checklist based on your age, vehicle category, and residence.' : 'તમારી ઉંમર અને વાહન મુજબ કયા દસ્તાવેજો જોઈશે તેનું ચેકલિસ્ટ.'}
                </p>
              </div>
            </Link>

            <Link
              to="/track-app"
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/60 hover:bg-slate-900 transition flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Clock size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {lang === 'en' ? 'Track Application Status' : lang === 'hi' ? 'आवेदन स्थिति ट्रैक करें' : 'અરજી સ્ટેટસ ટ્રેક કરો'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {lang === 'en' ? 'Check your RTO verification, dispatch, and physical card delivery status.' : 'તમારા લાયસન્સનું RTO વેરિફિકેશન અને સ્પીડ પોસ્ટ ટ્રેકિંગ જુઓ.'}
                </p>
              </div>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}