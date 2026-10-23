import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { rulesConfig } from '../data/config';
import { ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2, CreditCard, Receipt, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function LlApplication() {
  const { lang } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    bloodGroup: '',
    education: '',
    organDonor: false
  });
  
  // Simulate payment processing
  const [isProcessing, setIsProcessing] = useState(false);
  const [appNumber, setAppNumber] = useState('');

  useEffect(() => {
    // Update progress map when they finish the application
    if (step === 6) {
      localStorage.setItem('licenceJourneyStage', '2');
    }
  }, [step]);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleNext = (e) => {
    if (e) e.preventDefault();
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setAppNumber(`LL-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep(6); // Success Receipt
    }, 2000);
  };

  const formQuestions = [
    {
      step: 1,
      title: { en: "Basic Details", hi: "मूल विवरण" },
      field: (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">{lang === 'en' ? 'Full Name (as per Aadhaar)' : 'पूरा नाम (आधार के अनुसार)'}</label>
          <input 
            type="text" 
            required 
            value={formData.fullName} 
            onChange={e => setFormData({...formData, fullName: e.target.value})}
            className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-4 focus:border-blue-500 outline-none"
            placeholder={lang === 'en' ? 'e.g. Ramesh Kumar' : 'उदा. रमेश कुमार'}
          />
        </div>
      )
    },
    {
      step: 2,
      title: { en: "Contact Info", hi: "संपर्क जानकारी" },
      field: (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">{lang === 'en' ? 'Mobile Number (Linked to Aadhaar)' : 'मोबाइल नंबर (आधार से जुड़ा हुआ)'}</label>
          <input 
            type="tel" 
            required 
            value={formData.phone} 
            onChange={e => setFormData({...formData, phone: e.target.value})}
            className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-4 focus:border-blue-500 outline-none"
            placeholder="10-digit number"
            pattern="[0-9]{10}"
          />
        </div>
      )
    },
    {
      step: 3,
      title: { en: "Medical Info", hi: "चिकित्सा जानकारी" },
      field: (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">{lang === 'en' ? 'Blood Group' : 'रक्त समूह'}</label>
          <select 
            required 
            value={formData.bloodGroup} 
            onChange={e => setFormData({...formData, bloodGroup: e.target.value})}
            className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-4 focus:border-blue-500 outline-none appearance-none"
          >
            <option value="">{lang === 'en' ? 'Select Blood Group' : 'रक्त समूह चुनें'}</option>
            <option value="A+">A+</option><option value="O+">O+</option><option value="B+">B+</option><option value="AB+">AB+</option>
          </select>
          <div className="pt-4 flex items-center gap-3">
            <input 
              type="checkbox" 
              id="donor" 
              checked={formData.organDonor}
              onChange={e => setFormData({...formData, organDonor: e.target.checked})}
              className="w-5 h-5 accent-blue-500"
            />
            <label htmlFor="donor" className="text-sm text-slate-300">
              {lang === 'en' ? 'I am willing to donate my organs in case of accidental death.' : 'मैं दुर्घटना में मृत्यु होने पर अपने अंग दान करने को तैयार हूँ।'}
            </label>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-6 flex flex-col">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {step < 6 && (
        <div className="max-w-xl mx-auto w-full mb-8 relative z-10">
          <div className="flex justify-between text-xs text-slate-400 font-bold mb-2 uppercase tracking-wider">
            <span>{lang === 'en' ? 'Application Form' : 'आवेदन पत्र'}</span>
            <span>{lang === 'en' ? `Step ${step} of ${totalSteps}` : `चरण ${step} / ${totalSteps}`}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <motion.div 
              className="bg-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            
            {/* Form Steps 1 to 3 */}
            {step <= 3 && (
              <motion.form 
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleNext}
                className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="text-blue-400" size={24} />
                  <h2 className="text-2xl font-bold">{formQuestions[step-1].title[lang]}</h2>
                </div>
                
                <div className="mb-8 min-h-[120px]">
                  {formQuestions[step-1].field}
                </div>

                <div className="flex gap-4">
                  {step > 1 && (
                    <button type="button" onClick={handleBack} className="px-6 py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition">
                      <ArrowLeft size={20} />
                    </button>
                  )}
                  <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                    {lang === 'en' ? 'Continue' : 'जारी रखें'} <ArrowRight size={20} />
                  </button>
                </div>
              </motion.form>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <motion.div 
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 shadow-2xl"
              >
                <h2 className="text-2xl font-bold mb-6">{lang === 'en' ? 'Review Details' : 'विवरण की समीक्षा करें'}</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">{lang === 'en' ? 'Name' : 'नाम'}</span>
                    <span className="font-medium">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">{lang === 'en' ? 'Mobile' : 'मोबाइल'}</span>
                    <span className="font-medium">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-slate-400">{lang === 'en' ? 'Blood Group' : 'रक्त समूह'}</span>
                    <span className="font-medium">{formData.bloodGroup}</span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button onClick={handleBack} className="px-6 py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition">
                    {lang === 'en' ? 'Edit' : 'संपादित करें'}
                  </button>
                  <button onClick={handleNext} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold transition shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    {lang === 'en' ? 'Confirm & Proceed' : 'पुष्टि करें और आगे बढ़ें'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Payment Simulator */}
            {step === 5 && (
              <motion.div 
                key="payment"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 text-center shadow-2xl"
              >
                <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CreditCard size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-2">{lang === 'en' ? 'Fee Payment' : 'शुल्क भुगतान'}</h2>
                <div className="text-4xl font-bold text-white mb-6 flex justify-center items-center gap-1">
                  ₹{rulesConfig.fees.learnersLicence + rulesConfig.fees.learnersTest}
                </div>
                <p className="text-sm text-slate-400 mb-8">
                  {lang === 'en' ? `LL Fee (₹${rulesConfig.fees.learnersLicence}) + Test Fee (₹${rulesConfig.fees.learnersTest})` : `एलएल शुल्क (₹${rulesConfig.fees.learnersLicence}) + टेस्ट शुल्क (₹${rulesConfig.fees.learnersTest})`}
                </p>
                
                <button 
                  onClick={handlePayment} 
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition"
                >
                  {isProcessing ? (lang === 'en' ? 'Processing...' : 'प्रोसेस हो रहा है...') : (lang === 'en' ? 'Pay (Simulated)' : 'भुगतान (सिम्युलेटेड)')}
                </button>
              </motion.div>
            )}

            {/* Step 6: Receipt */}
            {step === 6 && (
              <motion.div 
                key="receipt"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-950/20 border border-emerald-900/50 rounded-3xl p-8 text-center shadow-2xl"
              >
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{lang === 'en' ? 'Application Submitted!' : 'आवेदन जमा किया गया!'}</h2>
                
                <div className="bg-slate-900/80 rounded-2xl p-6 my-8 border border-slate-800 text-left">
                  <p className="text-sm text-slate-400 mb-1">{lang === 'en' ? 'Application Number:' : 'आवेदन संख्या:'}</p>
                  <p className="text-2xl font-mono font-bold text-emerald-400 mb-4">{appNumber}</p>
                  <p className="text-sm text-slate-300 flex items-start gap-2">
                    <Receipt size={16} className="shrink-0 mt-0.5" />
                    {lang === 'en' ? 'Take a screenshot of this number. You will need it to take your Mock Test and track your status.' : 'इस नंबर का स्क्रीनशॉट लें। आपको अपने मॉक टेस्ट देने और अपनी स्थिति को ट्रैक करने के लिए इसकी आवश्यकता होगी।'}
                  </p>
                </div>

                <Link to="/" className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-xl font-bold flex justify-center items-center transition">
                  {lang === 'en' ? 'Return to Home' : 'होम पर लौटें'}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}