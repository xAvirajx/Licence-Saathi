import { useState, useContext } from 'react';
import { AppContext } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Calendar, CheckCircle2, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PermanentLicence() {
  const { lang } = useContext(AppContext);
  const [llDate, setLlDate] = useState('');
  const [result, setResult] = useState(null);

  const calculateDates = (e) => {
    e.preventDefault();
    if (!llDate) return;

    const issueDate = new Date(llDate);
    const today = new Date();
    
    // Minimum 30 days wait
    const minApplyDate = new Date(issueDate);
    minApplyDate.setDate(issueDate.getDate() + 30);
    
    // Maximum 6 months validity
    const maxApplyDate = new Date(issueDate);
    maxApplyDate.setMonth(issueDate.getMonth() + 6);

    const isEligibleNow = today >= minApplyDate && today <= maxApplyDate;
    const isExpired = today > maxApplyDate;

    // Determine correct locale for date formatting
    const localeStr = lang === 'hi' ? 'hi-IN' : lang === 'gu' ? 'gu-IN' : 'en-IN';

    setResult({
      minDate: minApplyDate.toLocaleDateString(localeStr, { day: 'numeric', month: 'short', year: 'numeric' }),
      maxDate: maxApplyDate.toLocaleDateString(localeStr, { day: 'numeric', month: 'short', year: 'numeric' }),
      isEligibleNow,
      isExpired
    });

    // Automatically save journey progress if eligible
    if (isEligibleNow) {
      localStorage.setItem('licenceJourneyStage', '4');
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-6 flex flex-col font-sans overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-2xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl mb-6 shadow-lg">
            <Car className="text-blue-400" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {lang === 'en' && 'Permanent Licence'}
            {lang === 'hi' && 'स्थायी लाइसेंस'}
            {lang === 'gu' && 'કાયમી લાઇસન્સ'}
          </h1>
          <p className="text-slate-400">
            {lang === 'en' && 'Check your dates and book your driving test slot.'}
            {lang === 'hi' && 'अपनी तारीखें जांचें और अपना ड्राइविंग टेस्ट स्लॉट बुक करें।'}
            {lang === 'gu' && 'તમારી તારીખો તપાસો અને ડ્રાઇવિંગ ટેસ્ટ બુક કરો.'}
          </p>
        </div>

        {/* Date Input Form */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl mb-8">
          <form onSubmit={calculateDates}>
            <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
              <Calendar size={16} className="text-indigo-400" />
              {lang === 'en' && "When was your Learner's Licence issued?"}
              {lang === 'hi' && "आपका लर्नर लाइसेंस कब जारी किया गया था?"}
              {lang === 'gu' && "તમારું લર્નર લાઇસન્સ ક્યારે ઇશ્યૂ થયું હતું?"}
            </label>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="date" 
                required
                value={llDate}
                onChange={(e) => setLlDate(e.target.value)}
                onClick={(e) => {
                  // Force open mobile native calendar on touch
                  if (e.target.showPicker) {
                    try { e.target.showPicker(); } catch (err) { /* ignore */ }
                  }
                }}
                className="flex-1 bg-slate-950 border border-slate-700 text-white rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg shrink-0"
              >
                {lang === 'en' && 'Check Dates'}
                {lang === 'hi' && 'तारीखें जांचें'}
                {lang === 'gu' && 'તારીખો તપાસો'}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              
              {/* Dynamic Status Card */}
              <div className={`p-6 rounded-3xl border shadow-xl ${
                result.isExpired 
                  ? 'bg-red-950/30 border-red-900/50' 
                  : result.isEligibleNow 
                    ? 'bg-emerald-950/30 border-emerald-900/50' 
                    : 'bg-blue-950/30 border-blue-900/50'
              }`}>
                
                {/* Date Boxes */}
                <div className="grid grid-cols-2 gap-4 text-center mb-6">
                  <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                      {lang === 'en' && 'Eligible From'}
                      {lang === 'hi' && 'से पात्र'}
                      {lang === 'gu' && 'અરજી શરૂ'}
                    </p>
                    <p className="font-mono text-white font-bold">{result.minDate}</p>
                  </div>
                  <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                      {lang === 'en' && 'Expires On'}
                      {lang === 'hi' && 'को समाप्त'}
                      {lang === 'gu' && 'અંતિમ તારીખ'}
                    </p>
                    <p className="font-mono text-white font-bold">{result.maxDate}</p>
                  </div>
                </div>

                {/* Outcome Messages */}
                <div className="text-center">
                  
                  {/* Expired State */}
                  {result.isExpired ? (
                    <div>
                      <h3 className="text-red-400 font-bold text-xl mb-2">
                        {lang === 'en' && "Learner's Licence Expired"}
                        {lang === 'hi' && 'लर्नर लाइसेंस समाप्त'}
                        {lang === 'gu' && 'લર્નર લાઇસન્સ સમાપ્ત'}
                      </h3>
                      <p className="text-sm text-slate-300">
                        {lang === 'en' && "Your LL is older than 6 months. You must apply for a new Learner's Licence."}
                        {lang === 'hi' && 'आपका एलएल 6 महीने से पुराना है। आपको नए लर्नर लाइसेंस के लिए आवेदन करना होगा।'}
                        {lang === 'gu' && 'તમારું LL 6 મહિનાથી જૂનું છે. તમારે નવા લર્નર લાઇસન્સ માટે અરજી કરવી પડશે.'}
                      </p>
                    </div>
                  
                  /* Eligible State */
                  ) : result.isEligibleNow ? (
                    <div>
                      <h3 className="text-emerald-400 font-bold text-xl mb-2 flex items-center justify-center gap-2">
                        <CheckCircle2 /> 
                        {lang === 'en' && 'You can apply now!'}
                        {lang === 'hi' && 'आप अभी आवेदन कर सकते हैं!'}
                        {lang === 'gu' && 'તમે હવે અરજી કરી શકો છો!'}
                      </h3>
                      <p className="text-sm text-slate-300 mb-6">
                        {lang === 'en' && 'Book your driving test slot at your local RTO below.'}
                        {lang === 'hi' && 'नीचे अपने स्थानीय आरटीओ में अपना ड्राइविंग टेस्ट स्लॉट बुक करें।'}
                        {lang === 'gu' && 'નીચે તમારા સ્થાનિક RTO (આરટીઓ) માં ડ્રાઇવિંગ ટેસ્ટ બુક કરો.'}
                      </p>
                      
                      {/* Slot Booking Simulation */}
                      <div className="bg-slate-900 border border-slate-700 p-4 rounded-2xl text-left">
                        <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
                          {lang === 'en' && 'Simulated Slot Booking'}
                          {lang === 'hi' && 'सिम्युलेटेड स्लॉट बुकिंग'}
                          {lang === 'gu' && 'સ્લોટ બુકિંગ સેમ્પલ'}
                        </h4>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                          {['09:30 AM', '11:00 AM', '02:15 PM'].map(time => (
                            <button 
                              key={time} 
                              onClick={() => alert(
                                lang === 'en' ? `Slot booked for ${time}! (Simulation)` : 
                                lang === 'hi' ? `स्लॉट बुक हो गया: ${time}! (सिमुलेशन)` : 
                                `સ્લોટ બુક થઈ ગયો: ${time}! (સેમ્પલ)`
                              )} 
                              className="min-w-[120px] bg-slate-950 border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 text-slate-300 p-3 rounded-xl flex flex-col items-center justify-center gap-2 transition"
                            >
                              <Clock size={20} />
                              <span className="font-mono text-sm font-bold">{time}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  
                  /* Wait State */
                  ) : (
                    <div>
                      <h3 className="text-blue-400 font-bold text-xl mb-2">
                        {lang === 'en' && 'Not Eligible Yet'}
                        {lang === 'hi' && 'अभी पात्र नहीं हैं'}
                        {lang === 'gu' && 'હજુ પાત્ર નથી'}
                      </h3>
                      <p className="text-sm text-slate-300">
                        {lang === 'en' && 'You must wait 30 days from the issue date to apply for a Permanent DL.'}
                        {lang === 'hi' && 'स्थायी डीएल के लिए आवेदन करने के लिए आपको जारी होने की तारीख से 30 दिन इंतजार करना होगा।'}
                        {lang === 'gu' && 'કાયમી DL (ડીએલ) માટે અરજી કરવા માટે તમારે ઇશ્યૂ તારીખથી 30 દિવસ રાહ જોવી પડશે.'}
                      </p>
                    </div>
                  )}

                </div>
              </div>

              {/* Test Day Checklist */}
              <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <MapPin className="text-emerald-400" size={20} /> 
                  {lang === 'en' && 'Test Day Checklist'}
                  {lang === 'hi' && 'टेस्ट के दिन की चेकलिस्ट'}
                  {lang === 'gu' && 'ટેસ્ટના દિવસની ચેકલિસ્ટ'}
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex gap-3">
                    <CheckCircle2 className="text-blue-400 shrink-0" size={18}/> 
                    {lang === 'en' && "Bring your original Learner's Licence"}
                    {lang === 'hi' && 'अपना मूल लर्नर लाइसेंस लाएँ'}
                    {lang === 'gu' && 'તમારું અસલ લર્નર લાઇસન્સ લાવો'}
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="text-blue-400 shrink-0" size={18}/> 
                    <span>
                      {lang === 'en' && 'Bring the vehicle you applied for (with a '}
                      {lang === 'hi' && 'वह वाहन लाएँ जिसके लिए आपने आवेदन किया था ('}
                      {lang === 'gu' && 'જે વાહન માટે અરજી કરી હોય તે લાવો ('}
                      <span className="font-bold text-red-400">
                        {lang === 'en' && 'Red L Board'}
                        {lang === 'hi' && 'लाल एल बोर्ड'}
                        {lang === 'gu' && 'લાલ L બોર્ડ'}
                      </span>
                      {lang === 'en' && ')'}
                      {lang === 'hi' && ' के साथ)'}
                      {lang === 'gu' && ' સાથે)'}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="text-blue-400 shrink-0" size={18}/> 
                    {lang === 'en' && 'Valid RC, Insurance, and PUC for the vehicle'}
                    {lang === 'hi' && 'वाहन के लिए वैध आरसी, बीमा और पीयूसी'}
                    {lang === 'gu' && 'વાહન માટે માન્ય RC, વીમો અને PUC'}
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="text-blue-400 shrink-0" size={18}/> 
                    {lang === 'en' && 'Wear a helmet (Two-wheeler) or seatbelt (Car)'}
                    {lang === 'hi' && 'हेलमेट (दोपहिया) या सीटबेल्ट (कार) पहनें'}
                    {lang === 'gu' && 'હેલમેટ (ટુ-વ્હીલર) અથવા સીટબેલ્ટ (કાર) પહેરો'}
                  </li>
                </ul>

                {/* Footer Link */}
                <Link to="/driving-test" className="mt-6 flex items-center justify-between w-full bg-slate-950 border border-slate-800 hover:border-slate-600 text-white p-4 rounded-2xl transition group">
                  <span className="font-bold text-sm">
                    {lang === 'en' && 'Learn how to pass the Driving Test'}
                    {lang === 'hi' && 'ड्राइविंग टेस्ट पास करना सीखें'}
                    {lang === 'gu' && 'ડ્રાઇવિંગ ટેસ્ટ કેવી રીતે પાસ કરવો તે શીખો'}
                  </span>
                  <ArrowRight size={18} className="text-slate-500 group-hover:text-white transition" />
                </Link>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}