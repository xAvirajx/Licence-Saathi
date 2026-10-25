import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { 
  Languages, Type, SunMoon, Volume2, 
  Trash2, ShieldCheck, CheckCircle2, Check, ArrowLeft,
  Smartphone, HardDrive, Sun, Moon, Monitor,
  Play, BookOpen, Database, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Settings() {
  const { 
    lang, setLang, 
    textSize, setTextSize, 
    highContrast, setHighContrast, 
    readAloud, setReadAloud,
    theme, setTheme,
    effectiveTheme,
    isInstalled,
    deferredPrompt,
    triggerInstallPrompt
  } = useContext(AppContext);

  const [storageSize, setStorageSize] = useState('0 KB');
  const [testVoicePlaying, setTestVoicePlaying] = useState(false);

  // Calculate local storage footprint in KB
  useEffect(() => {
    let totalBytes = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalBytes += (localStorage[key].length + key.length) * 2;
      }
    }
    setStorageSize((totalBytes / 1024).toFixed(1) + ' KB');
  }, []);

  // Voice Test Function
  const handleTestVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this device.');
      return;
    }
    window.speechSynthesis.cancel();
    setTestVoicePlaying(true);

    const testText = 
      lang === 'gu'
        ? 'નમસ્તે! લાયસન્સ સાથી વૉઇસ સહાયક યોગ્ય રીતે કાર્ય કરી રહ્યો છે.'
        : lang === 'hi'
        ? 'नमस्ते! लाइसेंस साथी वॉइस असिस्टेंट सही ढंग से काम कर रहा है।'
        : 'Hello! License Saathi voice guidance is working properly.';

    const utterance = new SpeechSynthesisUtterance(testText);
    utterance.lang = lang === 'gu' ? 'gu-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setTestVoicePlaying(false);
    utterance.onerror = () => setTestVoicePlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleClearData = () => {
    if (window.confirm(
      lang === 'en' 
        ? 'Are you sure you want to reset all mock test scores and journey history?' 
        : lang === 'hi' 
        ? 'क्या आप सभी मॉक टेस्ट स्कोर और यात्रा डेटा रीसेट करना चाहते हैं?' 
        : 'શું તમે તમામ મોક ટેસ્ટ સ્કોર અને પ્રવાસ ડેટા રીસેટ કરવા માંગો છો?'
    )) {
      localStorage.removeItem('licenceJourneyStage');
      localStorage.removeItem('mockTestHistory');
      window.location.reload();
    }
  };

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 flex flex-col font-sans">
      <div className="max-w-2xl mx-auto w-full relative z-10 space-y-6">

        {/* Back Button & Header */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            aria-label="Back to Home"
            className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {lang === 'en' ? 'App Settings' : lang === 'hi' ? 'ऐप सेटिंग्स' : 'એપ સેટિંગ્સ'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              {lang === 'en' ? 'Customize your experience, offline options, and data.' : 'તમારી પસંદગી મુજબ સેટિંગ્સ બદલો.'}
            </p>
          </div>
        </div>

        {/* 1. Language Setting */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Languages size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {lang === 'en' ? 'Language' : lang === 'hi' ? 'भाषा' : 'ભાષા'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'en' ? 'Choose your preferred language across all screens' : 'તમામ સ્ક્રીન માટે પસંદગીની ભાષા પસંદ કરો'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { code: 'en', label: 'English', sub: 'Default' },
              { code: 'hi', label: 'हिंदी', sub: 'Hindi' },
              { code: 'gu', label: 'ગુજરાતી', sub: 'Gujarati' }
            ].map(item => (
              <button
                key={item.code}
                onClick={() => setLang(item.code)}
                className={`p-3 rounded-2xl font-bold text-xs sm:text-sm transition flex flex-col items-center justify-center gap-0.5 ${
                  lang === item.code
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span>{item.label}</span>
                  {lang === item.code && <Check size={14} className="stroke-[3]" />}
                </div>
                <span className={`text-[10px] ${lang === item.code ? 'text-blue-100' : 'text-slate-500'}`}>
                  {item.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Theme Mode Setting */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
              <SunMoon size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {lang === 'en' ? 'Appearance Theme' : lang === 'hi' ? 'थीम मोड' : 'થીમ અને દેખાવ'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'en' ? 'Switch between light, dark, or system default' : 'લાઇટ, ડાર્ક અથવા સિસ્ટમ ડિફોલ્ટ થીમ પસંદ કરો'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { 
                id: 'system', 
                icon: <Monitor size={16} />, 
                title: { en: 'System Default', hi: 'सिस्टम', gu: 'સિસ્ટમ' } 
              },
              { 
                id: 'light', 
                icon: <Sun size={16} />, 
                title: { en: 'Light', hi: 'लाइट', gu: 'લાઇટ' } 
              },
              { 
                id: 'dark', 
                icon: <Moon size={16} />, 
                title: { en: 'Dark', hi: 'डार्क', gu: 'ડાર્ક' } 
              }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setTheme(item.id)}
                className={`py-3 px-2 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 ${
                  theme === item.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.title[lang] || item.title.en}</span>
                {theme === item.id && <Check size={14} className="stroke-[3]" />}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Text Size Setting */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Type size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {lang === 'en' ? 'Text Size' : lang === 'hi' ? 'अक्षर का आकार' : 'અક્ષરનું કદ'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'en' ? 'Scale font size for easier reading' : 'વાંચવામાં સરળતા માટે ફોન્ટ સાઇઝ બદલો'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'normal', size: '16px', label: { en: 'Normal', hi: 'सामान्य', gu: 'સામાન્ય' } },
              { id: 'large', size: '18px', label: { en: 'Large', hi: 'बड़ा', gu: 'મોટા' } },
              { id: 'extra', size: '20px', label: { en: 'Extra', hi: 'अति बड़ा', gu: 'વધુ મોટા' } }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setTextSize(item.id)}
                className={`py-3 rounded-2xl font-bold text-xs sm:text-sm transition flex flex-col items-center justify-center gap-0.5 ${
                  textSize === item.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span>{item.label[lang] || item.label.en}</span>
                  {textSize === item.id && <Check size={14} className="stroke-[3]" />}
                </div>
                <span className={`text-[10px] ${textSize === item.id ? 'text-emerald-100' : 'text-slate-500'}`}>
                  {item.size}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Accessibility: High Contrast & Voice Read-Aloud */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white">
              {lang === 'en' ? 'Accessibility Enhancements' : lang === 'hi' ? 'सुलभता सुविधाएं' : 'સરળતા અને સુલભતા'}
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'en' ? 'High contrast visuals and text-to-speech audio' : 'દ્રશ્ય સ્પષ્ટતા અને ઓડિયો સહાય'}
            </p>
          </div>

          {/* High Contrast Toggle */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <SunMoon size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  {lang === 'en' ? 'High Contrast Mode' : lang === 'hi' ? 'उच्च कंट्रास्ट' : 'હાઇ કોન્ટ્રાસ્ટ'}
                </p>
                <p className="text-[11px] text-slate-400">
                  {lang === 'en' ? 'Deepen borders and boost element saturation' : 'બોર્ડર્સ અને રંગો વધુ સ્પષ્ટ બનાવો'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setHighContrast(!highContrast)}
              aria-label="Toggle High Contrast"
              className={`w-12 h-7 rounded-full transition-colors relative p-1 ${highContrast ? 'bg-amber-500' : 'bg-slate-800'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${highContrast ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Voice Read Aloud Toggle */}
          <div className="flex items-center justify-between py-1 border-t border-slate-800/80 pt-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Volume2 size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  {lang === 'en' ? 'Voice Read Aloud' : lang === 'hi' ? 'ऑडियो वाचन' : 'અવાજમાં સાંભળો'}
                </p>
                <p className="text-[11px] text-slate-400">
                  {lang === 'en' ? 'Read test questions and road signs aloud' : 'પ્રશ્નો અને રોડ સાઇન અવાજમાં સાંભળો'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {readAloud && (
                <button
                  onClick={handleTestVoice}
                  disabled={testVoicePlaying}
                  className="px-2.5 py-1 rounded-lg bg-blue-950 border border-blue-800/80 text-blue-300 text-[10px] font-bold hover:bg-blue-900 transition flex items-center gap-1"
                >
                  <Play size={10} />
                  <span>{testVoicePlaying ? 'Playing...' : 'Test Voice'}</span>
                </button>
              )}

              <button
                onClick={() => setReadAloud(!readAloud)}
                aria-label="Toggle Read Aloud"
                className={`w-12 h-7 rounded-full transition-colors relative p-1 ${readAloud ? 'bg-blue-600' : 'bg-slate-800'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${readAloud ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* 5. SMART PWA INSTALLATION STATUS */}
        {isInstalled ? (
          <div className="p-5 sm:p-6 rounded-3xl bg-emerald-950/20 border border-emerald-900/50 flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800 mb-1">
                  ✓ Installed & Active
                </div>
                <h2 className="text-base font-bold text-white">
                  {lang === 'en' ? 'Running as PWA App' : lang === 'hi' ? 'ऐप मोड में चल रहा है' : 'PWA એપ મોડમાં કાર્યરત'}
                </h2>
                <p className="text-xs text-slate-400">
                  {lang === 'en' ? '100% offline ready with zero-PII local caching.' : 'સંપૂર્ણ ઓફલાઇન સપોર્ટ ઉપલબ્ધ છે.'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                <Smartphone size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">
                  {lang === 'en' ? 'Install App on Device' : lang === 'hi' ? 'डिवाइस पर ऐप इंस्टॉल करें' : 'ડિવાઇસ પર એપ ઇન્સ્ટોલ કરો'}
                </h2>
                <p className="text-xs text-slate-400">
                  {lang === 'en' 
                    ? 'Add to home screen for instant offline access and kiosk test practice.' 
                    : 'ઝડપી ઑફલાઇન એક્સેસ માટે હોમ સ્ક્રીન પર ઉમેરો.'}
                </p>
              </div>
            </div>

            {deferredPrompt ? (
              <button
                onClick={triggerInstallPrompt}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs sm:text-sm transition shadow-lg shadow-blue-600/30 shrink-0"
              >
                {lang === 'en' ? 'Install App' : lang === 'hi' ? 'ऐप इंस्टॉल करें' : 'ઇન્સ્ટોલ કરો'}
              </button>
            ) : (
              <span className="text-[11px] text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                {lang === 'en' ? 'Chrome: Menu (⋮) → Add to Home' : 'Chrome: મેનૂ (⋮) → Add to Home'}
              </span>
            )}
          </div>
        )}

        {/* 6. Offline Storage & Cache Info */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-3 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <HardDrive size={15} className="text-emerald-400" />
              <span>{lang === 'en' ? 'Offline Storage & Cache Status' : 'ઓફલાઇન સ્ટોરેજ સ્ટેટસ'}</span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">{storageSize} used</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300 pt-1">
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>RTO Questions (Cached)</span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>IRC Road Signs (Cached)</span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Kiosk Simulator (Cached)</span>
            </div>
          </div>
        </div>

        {/* 7. Privacy & Data Reset */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                <Trash2 size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">
                  {lang === 'en' ? 'Reset App Data' : lang === 'hi' ? 'डेटा रीसेट करें' : 'ડેટા રીસેટ કરો'}
                </h2>
                <p className="text-xs text-slate-400">
                  {lang === 'en' ? 'Clear scores & journey progress stored on this device' : 'તમામ ટેસ્ટ સ્કોર અને સ્ટેજ હિસ્ટ્રી સાફ કરો'}
                </p>
              </div>
            </div>

            <button
              onClick={handleClearData}
              className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 rounded-xl font-bold text-xs transition shrink-0"
            >
              {lang === 'en' ? 'Reset' : lang === 'hi' ? 'रीसेट' : 'રીસેટ'}
            </button>
          </div>

          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-400">
            <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
            <span>
              {lang === 'en' && 'Zero-PII Guarantee: All data remains securely on your local device only. No personal information is ever transmitted to a server.'}
              {lang === 'hi' && 'शून्य-पीआईआई गारंटी: सभी डेटा केवल आपके फोन पर स्थानीय रूप से संग्रहीत है। कोई भी डेटा सर्वर पर नहीं भेजा जाता।'}
              {lang === 'gu' && 'ઝીરો-PII ગેરંટી: તમામ ડેટા માત્ર તમારા ફોન પર લોકલ સ્ટોરેજમાં રહે છે. કોઈ ડેટા સર્વર પર મોકલવામાં આવતો નથી.'}
            </span>
          </div>
        </div>

        {/* 8. About & Open Government Data (data.gov.in) Attributions */}
        <div className="p-5 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3 text-center sm:text-left text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-slate-800/60 pb-2">
            <span className="font-bold text-slate-300">License Saathi v1.0.0 (Hackathon Edition)</span>
            <div className="flex items-center gap-3 text-xs">
              <Link to="/privacy" className="hover:text-blue-400 transition">Privacy Policy</Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-blue-400 transition">Terms & Disclaimer</Link>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            License Saathi is an independent educational and procedural assistance portal designed to help Indian citizens prepare for their RTO tests. Official applications are processed via parivahan.gov.in.
          </p>

          {/* Open Government Data (OGD) & Standards Attribution Box */}
          <div className="mt-3 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2 text-left">
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <Database size={13} />
              <span>Open Government Data & Standards Attributions</span>
            </p>
            <ul className="text-[11px] text-slate-400 space-y-1.5 list-disc pl-4">
              <li>
                <strong>data.gov.in (MoRTH Datasets):</strong> State-wise RTO codes, passing criteria, and Central Motor Vehicles Rules (CMVR 1989) fee schedules.
              </li>
              <li>
                <strong>API Setu (apisetu.gov.in):</strong> National e-Governance Division (NeGD) MoRTH Driving Licence Verification Schema v1.0.2.
              </li>
              <li>
                <strong>Indian Roads Congress (IRC):</strong> IRC:67-2012 Code of Practice for Road Signs specifications.
              </li>
              <li>
                <strong>OpenStreetMap & Leaflet:</strong> Cartographic tile mapping for Automated Driving Test Tracks (ADTT).
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}