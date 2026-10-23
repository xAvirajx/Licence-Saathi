import { useState, useContext } from 'react';
import { AppContext } from '../App';
import { rulesConfig } from '../data/config';
import { motion } from 'framer-motion';
import { ShieldCheck, Calendar, MapPin, Car, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Eligibility() {
  const { lang } = useContext(AppContext);
  const [stateName, setStateName] = useState('Gujarat');
  const [vehicleType, setVehicleType] = useState('geared');
  const [dob, setDob] = useState('');
  const [result, setResult] = useState(null);

  const checkEligibility = (e) => {
    e.preventDefault();
    if (!dob) return;

    const birthDate = new Date(dob);
    const today = new Date();
    
    // Calculate exact age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    const reqAge = rulesConfig.minimumAge[vehicleType].age;
    
    if (age >= reqAge) {
      setResult({
        eligible: true,
        message: {
          en: "Yes, you are old enough to apply for this licence today.",
          hi: "हाँ, आप आज इस लाइसेंस के लिए आवेदन करने के लिए योग्य हैं।"
        }
      });
    } else {
      // Calculate exact date they turn the required age
      const eligibleDate = new Date(birthDate);
      eligibleDate.setFullYear(eligibleDate.getFullYear() + reqAge);
      const dateStr = eligibleDate.toLocaleDateString(lang === 'en' ? 'en-IN' : 'hi-IN', { day: 'numeric', month: 'long', year: 'numeric' });
      
      setResult({
        eligible: false,
        message: {
          en: `No, you need to be ${reqAge}. You can apply on ${dateStr}.`,
          hi: `नहीं, आपकी आयु ${reqAge} वर्ष होनी चाहिए। आप ${dateStr} को आवेदन कर सकते हैं।`
        }
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 overflow-hidden py-12 px-6">
      {/* ATMOSPHERIC MESH GRADIENTS */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-xl mx-auto">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl mb-6 shadow-lg">
            <ShieldCheck className="text-blue-400" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {lang === 'en' ? 'Can I apply?' : 'क्या मैं आवेदन कर सकता हूँ?'}
          </h1>
          <p className="text-slate-400">
            {lang === 'en' ? 'Check if you are eligible before starting the paperwork.' : 'कागजी कार्रवाई शुरू करने से पहले जांच लें कि क्या आप योग्य हैं।'}
          </p>
        </div>

        <form onSubmit={checkEligibility} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl mb-8">
          
          {/* State Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <MapPin size={16} className="text-emerald-400"/> {lang === 'en' ? 'Your State' : 'आपका राज्य'}
            </label>
            <select 
              value={stateName} 
              onChange={(e) => setStateName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-colors appearance-none"
            >
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
              <option value="Karnataka">Karnataka</option>
              {/* Add more states as needed */}
            </select>
          </div>

          {/* Vehicle Type Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <Car size={16} className="text-blue-400"/> {lang === 'en' ? 'Vehicle Type' : 'वाहन का प्रकार'}
            </label>
            <div className="space-y-3">
              {Object.keys(rulesConfig.minimumAge).map((key) => (
                <label key={key} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${vehicleType === key ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-950 border-slate-700 hover:border-slate-500'}`}>
                  <input 
                    type="radio" 
                    name="vehicleType" 
                    value={key} 
                    checked={vehicleType === key} 
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="mr-3 accent-blue-500 w-5 h-5"
                  />
                  <span className="text-sm font-medium text-white">{rulesConfig.minimumAge[key].label[lang]}</span>
                </label>
              ))}
            </div>
          </div>

          {/* DOB Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <Calendar size={16} className="text-indigo-400"/> {lang === 'en' ? 'Date of Birth' : 'जन्म तिथि'}
            </label>
            <input 
              type="date" 
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
          >
            {lang === 'en' ? 'Check Eligibility' : 'पात्रता जांचें'}
          </button>
        </form>

        {/* RESULTS POPUP */}
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-3xl border flex flex-col items-center text-center ${result.eligible ? 'bg-emerald-950/40 border-emerald-800' : 'bg-red-950/40 border-red-800'}`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${result.eligible ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
              {result.eligible ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">
              {result.message[lang]}
            </h3>
            
            {result.eligible && (
              <p className="text-slate-400 text-sm mt-2 mb-6">
                {lang === 'en' ? 'Note: If you are 16-17, you will need a parent\'s consent form.' : 'नोट: यदि आप 16-17 वर्ष के हैं, तो आपको माता-पिता के सहमति पत्र की आवश्यकता होगी।'}
              </p>
            )}

            {result.eligible && (
              <Link 
                to="/documents" 
                className="w-full bg-slate-800 hover:bg-slate-700 text-white p-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {lang === 'en' ? 'Next: See Required Documents' : 'आगे: आवश्यक दस्तावेज देखें'} <ArrowRight size={18} />
              </Link>
            )}
          </motion.div>
        )}

      </div>
    </div>
  );
}