import { useState, useContext } from 'react';
import { AppContext } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Calendar, MapPin, Car, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Eligibility() {
  const { lang } = useContext(AppContext);
  const [state, setState] = useState('Maharashtra');
  const [vehicleType, setVehicleType] = useState('gearless'); // 'gearless', 'geared', 'commercial'
  const [dob, setDob] = useState('');
  const [result, setResult] = useState(null); // { eligible: boolean, minAge: number, age: number, eligibleDate: string }

  const statesList = [
    "Andhra Pradesh", "Delhi", "Gujarat", "Karnataka", 
    "Maharashtra", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"
  ];

  const handleCheck = (e) => {
    e.preventDefault();
    if (!dob) return;

    const birthDate = new Date(dob);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    let minAge = 18;
    if (vehicleType === 'gearless') minAge = 16;
    if (vehicleType === 'commercial') minAge = 20;

    const isEligible = age >= minAge;

    let eligibleDateStr = "";
    if (!isEligible) {
      const targetDate = new Date(birthDate);
      targetDate.setFullYear(birthDate.getFullYear() + minAge);
      eligibleDateStr = targetDate.toLocaleDateString(lang === 'en' ? 'en-IN' : 'hi-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }

    setResult({
      eligible: isEligible,
      minAge,
      age,
      eligibleDate: eligibleDateStr
    });

    // Save progress to Journey stage 1 if eligible
    if (isEligible) {
      localStorage.setItem('licenceJourneyStage', '1');
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-6 flex flex-col font-sans overflow-hidden">
      {/* Mesh Gradients */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl mb-6 shadow-lg">
            <ShieldCheck className="text-blue-400" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
            {lang === 'en' ? 'Can I apply?' : 'क्या मैं आवेदन कर सकता हूँ?'}
          </h1>
          <p className="text-slate-400 text-sm">
            {lang === 'en' ? 'Check if you are eligible before starting the paperwork.' : 'दुकान का काम शुरू करने से पहले जांच लें कि क्या आप पात्र हैं।'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl mb-8">
          <form onSubmit={handleCheck} className="space-y-6">
            
            {/* State Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-emerald-400" />
                {lang === 'en' ? 'Your State' : 'आपका राज्य'}
              </label>
              <select 
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-colors"
              >
                {statesList.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Vehicle Type Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <Car size={16} className="text-blue-400" />
                {lang === 'en' ? 'Vehicle Type' : 'वाहन का प्रकार'}
              </label>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${vehicleType === 'gearless' ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}>
                  <input 
                    type="radio" 
                    name="vehicleType" 
                    checked={vehicleType === 'gearless'}
                    onChange={() => setVehicleType('gearless')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-white">{lang === 'en' ? 'Two-wheeler (without gear, up to 50cc)' : 'दोपहिया (बिना गियर, 50cc तक)'}</span>
                </label>

                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${vehicleType === 'geared' ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}>
                  <input 
                    type="radio" 
                    name="vehicleType" 
                    checked={vehicleType === 'geared'}
                    onChange={() => setVehicleType('geared')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-white">{lang === 'en' ? 'Motorcycle with gear / Car (LMV)' : 'गियर वाली मोटरसाइकिल / कार (LMV)'}</span>
                </label>

                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${vehicleType === 'commercial' ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}>
                  <input 
                    type="radio" 
                    name="vehicleType" 
                    checked={vehicleType === 'commercial'}
                    onChange={() => setVehicleType('commercial')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-white">{lang === 'en' ? 'Commercial / Transport Vehicle' : 'वाणिज्यिक / परिवहन वाहन'}</span>
                </label>
              </div>
            </div>

            {/* Date of Birth Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <Calendar size={16} className="text-indigo-400" />
                {lang === 'en' ? 'Date of Birth' : 'जन्म तिथि'}
              </label>
              <input 
                type="date" 
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                onClick={(e) => {
                  if (e.target.showPicker) {
                    try { e.target.showPicker(); } catch (err) { /* ignore */ }
                  }
                }}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl font-bold transition shadow-lg shadow-blue-600/30"
            >
              {lang === 'en' ? 'Check Eligibility' : 'पात्रता जांचें'}
            </button>

          </form>
        </div>

        {/* Results Box */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`p-6 rounded-3xl border shadow-xl ${
                result.eligible 
                  ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-100' 
                  : 'bg-red-950/30 border-red-900/50 text-red-100'
              }`}
            >
              <div className="flex items-start gap-4">
                {result.eligible ? (
                  <CheckCircle2 className="text-emerald-400 shrink-0 mt-1" size={32} />
                ) : (
                  <XCircle className="text-red-400 shrink-0 mt-1" size={32} />
                )}
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    {result.eligible 
                      ? (lang === 'en' ? 'You are Eligible to Apply!' : 'आप आवेदन करने के लिए पात्र हैं!') 
                      : (lang === 'en' ? 'Not Eligible Yet' : 'अभी पात्र नहीं हैं')}
                  </h3>
                  <p className="text-sm opacity-90 mb-4">
                    {result.eligible 
                      ? (lang === 'en' 
                          ? `You meet the minimum age requirement of ${result.minAge} years for this vehicle category in ${state}.` 
                          : `आप ${state} में इस वाहन श्रेणी के लिए ${result.minAge} वर्ष की न्यूनतम आयु आवश्यकता को पूरा करते हैं।`)
                      : (lang === 'en' 
                          ? `You are currently ${result.age} years old. The minimum age required is ${result.minAge}. You will become eligible on:` 
                          : `आप वर्तमान में ${result.age} वर्ष के हैं। आवश्यक न्यूनतम आयु ${result.minAge} वर्ष है। आप पात्र हो जाएंगे:`)}
                  </p>

                  {!result.eligible && (
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-red-900/50 font-mono text-red-300 font-bold mb-6">
                      {result.eligibleDate}
                    </div>
                  )}

                  {result.eligible && (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link 
                        to="/documents" 
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl font-bold text-center transition flex items-center justify-center gap-2"
                      >
                        {lang === 'en' ? 'View Documents Checklist' : 'दस्तावेज़ चेकलिस्ट देखें'} <ArrowRight size={18} />
                      </Link>
                      <Link 
                        to="/application" 
                        className="bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-xl font-bold text-center border border-slate-700 transition"
                      >
                        {lang === 'en' ? 'Apply Now' : 'अभी आवेदन करें'}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}