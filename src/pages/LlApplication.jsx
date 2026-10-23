import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, CreditCard, FileText } from 'lucide-react';
import { rulesConfig } from '../data/config';
import { motion } from 'framer-motion';

export default function LlApplication() {
  const { t } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Load saved draft or start fresh
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('saathi_ll_draft');
    return saved ? JSON.parse(saved) : {
      fullName: '',
      aadharNumber: '',
      rto: 'jammu',
      bloodGroup: 'O+',
    };
  });

  // Save progress as they type
  useEffect(() => {
    localStorage.setItem('saathi_ll_draft', JSON.stringify(formData));
  }, [formData]);

  const handleNext = (e) => {
    e.preventDefault();
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const totalFee = rulesConfig.fees.learnersLicence + rulesConfig.fees.learnersTest;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 mt-2">
      
      {/* Header & Progress Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/" className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 text-brand-600">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-900">LL Application</h1>
            <p className="text-sm text-gray-500 font-medium">Step {step} of {totalSteps}</p>
          </div>
        </div>
        
        {/* Progress Tracker */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-brand-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
        </div>
      </div>

      {/* Step 1: Personal Details */}
      {step === 1 && (
        <form onSubmit={handleNext} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-5">
          <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <FileText size={20} className="text-brand-500"/> Personal Details
          </h2>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name (As per records)</label>
            <input 
              type="text" 
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-brand-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Blood Group</label>
            <select 
              value={formData.bloodGroup}
              onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-brand-500 outline-none bg-white"
            >
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="O+">O+</option>
              <option value="AB+">AB+</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl shadow-sm">
            Save & Next
          </button>
        </form>
      )}

      {/* Step 2: RTO Selection */}
      {step === 2 && (
        <form onSubmit={handleNext} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-5">
          <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <FileText size={20} className="text-brand-500"/> Select Jurisdiction
          </h2>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Choose your RTO</label>
            <select 
              value={formData.rto}
              onChange={(e) => setFormData({...formData, rto: e.target.value})}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-brand-500 outline-none bg-white"
            >
              <option value="jammu">JK02 - Jammu</option>
              <option value="srinagar">JK01 - Srinagar</option>
              <option value="delhi">DL01 - Delhi North</option>
            </select>
          </div>
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={handleBack} className="w-1/3 bg-gray-100 text-gray-700 font-bold py-3.5 rounded-xl">Back</button>
            <button type="submit" className="w-2/3 bg-brand-600 text-white font-bold py-3.5 rounded-xl">Save & Next</button>
          </div>
        </form>
      )}

      {/* Step 3: Review & Fee Summary */}
      {step === 3 && (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-5">
          <h2 className="font-bold text-gray-800 text-lg">Review Application</h2>
          <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
            <p><span className="text-gray-500">Name:</span> <span className="font-bold">{formData.fullName || 'Not provided'}</span></p>
            <p><span className="text-gray-500">RTO:</span> <span className="font-bold uppercase">{formData.rto}</span></p>
          </div>
          
          <h2 className="font-bold text-gray-800 text-lg mt-4">Fee Summary</h2>
          <div className="bg-brand-50 p-4 rounded-xl space-y-2 text-sm border border-brand-100">
            <div className="flex justify-between"><span className="text-brand-700">Learner's Licence Fee</span> <span className="font-bold">₹{rulesConfig.fees.learnersLicence}</span></div>
            <div className="flex justify-between"><span className="text-brand-700">LL Test Fee</span> <span className="font-bold">₹{rulesConfig.fees.learnersTest}</span></div>
            <hr className="border-brand-200 my-2"/>
            <div className="flex justify-between text-lg"><span className="font-bold text-brand-900">Total</span> <span className="font-bold text-brand-900">₹{totalFee}</span></div>
          </div>

          <div className="flex gap-3 mt-6">
            <button type="button" onClick={handleBack} className="w-1/3 bg-gray-100 text-gray-700 font-bold py-3.5 rounded-xl">Edit</button>
            <button onClick={handleNext} className="w-2/3 bg-green-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2">
              <CreditCard size={20}/> Pay (Simulated)
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Success Receipt */}
      {step === 4 && (
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Successful!</h2>
          <p className="text-gray-600">Your application has been submitted.</p>
          
          <div className="bg-gray-50 p-4 rounded-xl text-left my-4 border border-gray-200 block">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Application Number</p>
            <p className="text-lg font-mono font-bold text-gray-900 mt-1">APP-2026-{Math.floor(1000 + Math.random() * 9000)}</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-left text-sm text-blue-800">
            <strong>Next Step:</strong> You must now prepare for and take your online Learner's Test.
          </div>

          <Link to="/" className="block w-full mt-6 bg-brand-600 text-white font-bold py-3.5 rounded-xl">
            Return to Dashboard
          </Link>
        </motion.div>
      )}

    </motion.div>
  );
}