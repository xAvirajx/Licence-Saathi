import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { rulesConfig } from '../data/config';
import { 
  ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2, 
  CreditCard, Receipt, FileText, UploadCloud, FileCheck2, 
  Sparkles, Lock 
} from 'lucide-react';
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

  // Simulated Document Upload State (Zero PII / Client-Side Only)
  const [docsState, setDocsState] = useState({
    ageProof: { uploading: false, uploaded: false, name: '' },
    addressProof: { uploading: false, uploaded: false, name: '' },
    photo: { uploading: false, uploaded: false, name: '' }
  });

  // Simulated payment processing
  const [isProcessing, setIsProcessing] = useState(false);
  const [appNumber, setAppNumber] = useState('');

  // Total user steps before receipt is generated
  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  useEffect(() => {
    // Save progress to Journey Map stage 2 when the application receipt is rendered
    if (step === 7) {
      localStorage.setItem('licenceJourneyStage', '2');
    }
  }, [step]);

  const handleNext = (e) => {
    if (e) e.preventDefault();
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  // Simulate document upload delay
  const simulateDocUpload = (docKey, sampleFileName) => {
    setDocsState(prev => ({
      ...prev,
      [docKey]: { uploading: true, uploaded: false, name: '' }
    }));

    setTimeout(() => {
      setDocsState(prev => ({
        ...prev,
        [docKey]: { uploading: false, uploaded: true, name: sampleFileName }
      }));
    }, 700);
  };

  // One-click demo helper for hackathon judges
  const handleUploadAllSamples = () => {
    setDocsState({
      ageProof: { uploading: false, uploaded: true, name: 'Sample_Birth_Certificate.pdf' },
      addressProof: { uploading: false, uploaded: true, name: 'Sample_Electricity_Bill.pdf' },
      photo: { uploading: false, uploaded: true, name: 'Sample_Passport_Photo.jpg' }
    });
  };

  const allDocsUploaded = docsState.ageProof.uploaded && docsState.addressProof.uploaded && docsState.photo.uploaded;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setAppNumber(`LL-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep(7); // Final Receipt screen
    }, 1800);
  };

  const formQuestions = [
    {
      step: 1,
      title: { 
        en: "Basic Details", 
        hi: "मूल विवरण", 
        gu: "મૂળ વિગતો" 
      },
      field: (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">
            {lang === 'en' ? 'Full Name (as per ID proof)' : lang === 'hi' ? 'पूरा नाम (पहचान प्रमाण के अनुसार)' : 'પૂરું નામ (ઓળખપત્ર મુજબ)'}
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-4 focus:border-blue-500 focus:outline-none transition-colors"
            placeholder={lang === 'en' ? 'e.g. Ramesh Kumar' : lang === 'hi' ? 'उदा. रमेश कुमार' : 'દા.ત. રમેશ કુમાર'}
          />
        </div>
      )
    },
    {
      step: 2,
      title: { 
        en: "Contact Info", 
        hi: "संपर्क जानकारी", 
        gu: "સંપર્ક માહિતી" 
      },
      field: (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">
            {lang === 'en' ? 'Mobile Number (for RTO OTP)' : lang === 'hi' ? 'मोबाइल नंबर (आरटीओ ओटीपी हेतु)' : 'મોબાઇલ નંબર (RTO OTP માટે)'}
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-4 focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="10-digit mobile number"
            pattern="[0-9]{10}"
          />
        </div>
      )
    },
    {
      step: 3,
      title: { 
        en: "Medical Info", 
        hi: "चिकित्सा जानकारी", 
        gu: "તબીબી વિગતો" 
      },
      field: (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">
            {lang === 'en' ? 'Blood Group' : lang === 'hi' ? 'रक्त समूह' : 'બ્લડ ગ્રૂપ'}
          </label>
          <select
            required
            value={formData.bloodGroup}
            onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-4 focus:border-blue-500 focus:outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="">{lang === 'en' ? 'Select Blood Group' : lang === 'hi' ? 'रक्त समूह चुनें' : 'બ્લડ ગ્રૂપ પસંદ કરો'}</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <div className="pt-4 flex items-center gap-3">
            <input
              type="checkbox"
              id="donor"
              checked={formData.organDonor}
              onChange={e => setFormData({ ...formData, organDonor: e.target.checked })}
              className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
            />
            <label htmlFor="donor" className="text-sm text-slate-300 cursor-pointer">
              {lang === 'en' 
                ? 'I am willing to donate my organs in case of accidental death.' 
                : lang === 'hi' 
                ? 'मैं दुर्घटना में मृत्यु होने पर अपने अंग दान करने को तैयार हूँ।' 
                : 'હું અકસ્માતમાં મૃત્યુના કિસ્સામાં અંગદાન કરવા સંમત છું.'}
            </label>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-4 sm:px-6 flex flex-col font-sans overflow-x-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Progress Bar (Visible across Steps 1 to 6) */}
      {step < 7 && (
        <div className="max-w-xl mx-auto w-full mb-8 relative z-10">
          <div className="flex justify-between text-xs text-slate-400 font-bold mb-2 uppercase tracking-wider">
            <span>{lang === 'en' ? 'Application Form' : lang === 'hi' ? 'आवेदन पत्र' : 'અરજી પત્રક'}</span>
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

            {/* Steps 1 to 3: Question Cards */}
            {step <= 3 && (
              <motion.form
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleNext}
                className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="text-blue-400" size={24} />
                  <h2 className="text-2xl font-bold">{formQuestions[step - 1].title[lang]}</h2>
                </div>

                <div className="mb-8 min-h-[120px]">
                  {formQuestions[step - 1].field}
                </div>

                <div className="flex gap-4">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      aria-label="Back"
                      className="px-6 py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition"
                    >
                      <ArrowLeft size={20} />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition shadow-lg shadow-blue-600/30"
                  >
                    {lang === 'en' ? 'Continue' : lang === 'hi' ? 'जारी रखें' : 'આગળ વધો'}
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.form>
            )}

            {/* Step 4: Simulated Document Upload (Privacy-First) */}
            {step === 4 && (
              <motion.div
                key="doc_simulation"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <UploadCloud className="text-blue-400" size={26} />
                    <h2 className="text-xl sm:text-2xl font-bold">
                      {lang === 'en' ? 'Attach Documents' : lang === 'hi' ? 'दस्तावेज़ संलग्न करें' : 'દસ્તાવેજો જોડો'}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={handleUploadAllSamples}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 rounded-xl hover:bg-emerald-900/60 transition"
                  >
                    <Sparkles size={14} />
                    {lang === 'en' ? 'Attach All Demo Docs' : lang === 'hi' ? 'डेमो दस्तावेज़ जोड़ें' : 'બધા ડેમો દસ્તાવેજ ઉમેરો'}
                  </button>
                </div>

                {/* Privacy Guarantee Note */}
                <div className="mb-6 p-3 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center gap-3 text-xs text-slate-400">
                  <Lock size={16} className="text-emerald-400 shrink-0" />
                  <span>
                    {lang === 'en' && 'Privacy Guard: Simulated locally. No files are uploaded or stored on any server.'}
                    {lang === 'hi' && 'गोपनीयता सुरक्षा: स्थानीय सिमुलेशन। कोई भी वास्तविक फ़ाइल सर्वर पर नहीं भेजी जाती।'}
                    {lang === 'gu' && 'પ્રાઇવસી સુરક્ષા: માત્ર લોકલ સિમ્યુલેશન. કોઈ વાસ્તવિક ફાઇલ સર્વર પર સંગ્રહિત થતી નથી.'}
                  </span>
                </div>

                {/* Upload Slots */}
                <div className="space-y-3.5 mb-8">
                  {/* Slot 1: Age Proof */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-white">
                        {lang === 'en' ? 'Age Proof (Birth Cert / Marksheet)' : lang === 'hi' ? 'आयु प्रमाण (जन्म प्रमाण पत्र / अंकपत्र)' : 'ઉંમરનો પુરાવો (જન્મ પ્રમાણપત્ર / માર્કશીટ)'}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {docsState.ageProof.uploaded ? docsState.ageProof.name : (lang === 'en' ? 'Accepted: PDF, JPG up to 2MB' : 'માન્ય: PDF, JPG')}
                      </p>
                    </div>
                    {docsState.ageProof.uploaded ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1.5 rounded-lg">
                        <FileCheck2 size={15} /> Verified
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled={docsState.ageProof.uploading}
                        onClick={() => simulateDocUpload('ageProof', 'Sample_Age_Proof.pdf')}
                        className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition"
                      >
                        {docsState.ageProof.uploading ? 'Attaching...' : 'Attach Sample'}
                      </button>
                    )}
                  </div>

                  {/* Slot 2: Address Proof */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-white">
                        {lang === 'en' ? 'Address Proof (Electricity / Voter ID)' : lang === 'hi' ? 'निवास प्रमाण (बिजली बिल / वोटर आईडी)' : 'સરનામાનો પુરાવો (વીજળી બિલ / ચૂંટણી કાર્ડ)'}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {docsState.addressProof.uploaded ? docsState.addressProof.name : (lang === 'en' ? 'Accepted: PDF, JPG up to 2MB' : 'માન્ય: PDF, JPG')}
                      </p>
                    </div>
                    {docsState.addressProof.uploaded ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1.5 rounded-lg">
                        <FileCheck2 size={15} /> Verified
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled={docsState.addressProof.uploading}
                        onClick={() => simulateDocUpload('addressProof', 'Sample_Address_Proof.pdf')}
                        className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition"
                      >
                        {docsState.addressProof.uploading ? 'Attaching...' : 'Attach Sample'}
                      </button>
                    )}
                  </div>

                  {/* Slot 3: Passport Photo */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-white">
                        {lang === 'en' ? 'Passport Size Photograph' : lang === 'hi' ? 'पासपोर्ट साइज फोटो' : 'પાસપોર્ટ સાઇઝનો ફોટો'}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {docsState.photo.uploaded ? docsState.photo.name : (lang === 'en' ? 'Accepted: JPG, PNG under 1MB' : 'માન્ય: JPG, PNG')}
                      </p>
                    </div>
                    {docsState.photo.uploaded ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1.5 rounded-lg">
                        <FileCheck2 size={15} /> Verified
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled={docsState.photo.uploading}
                        onClick={() => simulateDocUpload('photo', 'Sample_Passport_Photo.jpg')}
                        className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition"
                      >
                        {docsState.photo.uploading ? 'Attaching...' : 'Attach Sample'}
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!allDocsUploaded}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition shadow-lg shadow-blue-600/30"
                  >
                    {lang === 'en' ? 'Proceed to Review' : lang === 'hi' ? 'समीक्षा के लिए आगे बढ़ें' : 'વિગતો ચકાસણી માટે આગળ વધો'}
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Review Screen */}
            {step === 5 && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl"
              >
                <h2 className="text-2xl font-bold mb-6">
                  {lang === 'en' ? 'Review Details' : lang === 'hi' ? 'विवरण की समीक्षा करें' : 'વિગતોની ચકાસણી કરો'}
                </h2>
                
                <div className="space-y-3.5 mb-8 bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80">
                  <div className="flex justify-between border-b border-slate-800 pb-2.5">
                    <span className="text-slate-400 text-sm">{lang === 'en' ? 'Name' : lang === 'hi' ? 'नाम' : 'નામ'}</span>
                    <span className="font-semibold text-white">{formData.fullName || '—'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2.5">
                    <span className="text-slate-400 text-sm">{lang === 'en' ? 'Mobile' : lang === 'hi' ? 'मोबाइल' : 'મોબાઇલ'}</span>
                    <span className="font-mono text-white">{formData.phone || '—'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2.5">
                    <span className="text-slate-400 text-sm">{lang === 'en' ? 'Blood Group' : lang === 'hi' ? 'रक्त समूह' : 'બ્લડ ગ્રૂપ'}</span>
                    <span className="font-semibold text-white">{formData.bloodGroup || '—'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2.5">
                    <span className="text-slate-400 text-sm">{lang === 'en' ? 'Organ Donor' : lang === 'hi' ? 'अंग दान' : 'અંગદાન'}</span>
                    <span className="font-semibold text-emerald-400">{formData.organDonor ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400 text-sm">{lang === 'en' ? 'Attached Docs' : lang === 'hi' ? 'संलग्न दस्तावेज़' : 'જોડેલા દસ્તાવેજો'}</span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 size={16} /> 3 of 3 Verified
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleBack}
                    className="px-6 py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition"
                  >
                    {lang === 'en' ? 'Edit' : lang === 'hi' ? 'संपादित करें' : 'સુધારો'}
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold transition shadow-lg shadow-emerald-900/40"
                  >
                    {lang === 'en' ? 'Confirm & Proceed' : lang === 'hi' ? 'पुष्टि करें और आगे बढ़ें' : 'પુષ્ટિ કરી આગળ વધો'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 6: Payment Simulator */}
            {step === 6 && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-2xl"
              >
                <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CreditCard size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {lang === 'en' ? 'Fee Payment' : lang === 'hi' ? 'शुल्क भुगतान' : 'સરકારી ફી ચુકવણી'}
                </h2>
                <div className="text-4xl font-extrabold text-white mb-4 flex justify-center items-center gap-1">
                  ₹{(rulesConfig?.fees?.learnersLicence || 150) + (rulesConfig?.fees?.learnersTest || 50)}
                </div>
                <p className="text-sm text-slate-400 mb-8">
                  {lang === 'en'
                    ? `LL Fee (₹${rulesConfig?.fees?.learnersLicence || 150}) + Test Fee (₹${rulesConfig?.fees?.learnersTest || 50})`
                    : `एलएल शुल्क (₹${rulesConfig?.fees?.learnersLicence || 150}) + टेस्ट शुल्क (₹${rulesConfig?.fees?.learnersTest || 50})`}
                </p>

                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition shadow-lg shadow-blue-600/30"
                >
                  {isProcessing 
                    ? (lang === 'en' ? 'Simulating Secure Gateway...' : 'प्रोसेस हो रहा है...') 
                    : (lang === 'en' ? 'Pay & Submit (Simulated)' : 'भुगतान करें (सिम्युलेटेड)')}
                </button>
              </motion.div>
            )}

            {/* Step 7: Receipt */}
            {step === 7 && (
              <motion.div
                key="receipt"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-950/20 border border-emerald-900/50 rounded-3xl p-6 sm:p-8 text-center shadow-2xl"
              >
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-2">
                  {lang === 'en' ? 'Application Submitted!' : lang === 'hi' ? 'आवेदन जमा किया गया!' : 'અરજી સફળતાપૂર્વક જમા થઈ!'}
                </h2>

                <div className="bg-slate-900/80 rounded-2xl p-6 my-8 border border-slate-800 text-left">
                  <p className="text-sm text-slate-400 mb-1">
                    {lang === 'en' ? 'Application Number:' : lang === 'hi' ? 'आवेदन संख्या:' : 'અરજી નંબર:'}
                  </p>
                  <p className="text-2xl font-mono font-bold text-emerald-400 mb-4">{appNumber}</p>
                  <p className="text-sm text-slate-300 flex items-start gap-2">
                    <Receipt size={16} className="shrink-0 mt-0.5 text-emerald-400" />
                    {lang === 'en' 
                      ? 'Take note of this number. You can use it to take your Mock Test and track your live status.'
                      : lang === 'hi'
                      ? 'इस नंबर को नोट कर लें। इसका उपयोग आप मॉक टेस्ट देने और अपनी स्थिति ट्रैक करने के लिए कर सकते हैं।'
                      : 'આ નંબર સાચવી રાખો. તમે તેનો ઉપયોગ મોક ટેસ્ટ આપવા અને સ્ટેટસ ટ્રેક કરવા માટે કરી શકો છો.'}
                  </p>
                </div>

                <Link
                  to="/"
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-xl font-bold flex justify-center items-center transition shadow-lg"
                >
                  {lang === 'en' ? 'Return to Home' : lang === 'hi' ? 'होम पर लौटें' : 'હોમ પેજ પર પાછા જાઓ'}
                </Link>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}