import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { rtos } from '../data/rtos';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, 
  FileText, Car, AlertTriangle, ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PermanentLicence() {
  const { lang } = useContext(AppContext);
  const [llDate, setLlDate] = useState('');
  const [dateStatus, setDateStatus] = useState(null); // 'waiting', 'eligible', 'expired'
  const [calculatedDates, setCalculatedDates] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  
  // Booking Form State
  const [selectedRto, setSelectedRto] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Calculate Dates whenever llDate changes
  useEffect(() => {
    if (!llDate) return;

    const issue = new Date(llDate);
    const today = new Date();
    today.setHours(0,0,0,0);

    // Can apply after 30 days
    const apply = new Date(issue);
    apply.setDate(apply.getDate() + 30);

    // Expires after 6 months
    const expiry = new Date(issue);
    expiry.setMonth(expiry.getMonth() + 6);

    const timeToApply = apply.getTime() - today.getTime();
    const daysToApply = Math.ceil(timeToApply / (1000 * 3600 * 24));

    const timeToExpire = expiry.getTime() - today.getTime();
    const daysToExpire = Math.ceil(timeToExpire / (1000 * 3600 * 24));

    let status = 'eligible';
    if (daysToApply > 0) status = 'waiting';
    if (daysToExpire < 0) status = 'expired';

    setDateStatus(status);
    setCalculatedDates({
      apply: apply.toLocaleDateString(lang === 'en' ? 'en-IN' : 'hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      expiry: expiry.toLocaleDateString(lang === 'en' ? 'en-IN' : 'hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      daysToApply,
      daysToExpire
    });

  }, [llDate, lang]);

  const handleBookSlot = (e) => {
    e.preventDefault();
    setBookingStep(2);
    // Update Journey Map progress
    localStorage.setItem('licenceJourneyStage', '4');
  };

  const checklist = [
    { en: "Original Learner's Licence", hi: "मूल लर्नर लाइसेंस" },
    { en: "Application Form & Fee Receipt", hi: "आवेदन पत्र और शुल्क रसीद" },
    { en: "Vehicle with Valid RC, Insurance & PUC", hi: "वैध आरसी, बीमा और पीयूसी के साथ वाहन" },
    { en: "ISI-Mark Helmet (If testing for Two-Wheeler)", hi: "ISI-मार्क हेलमेट (यदि दोपहिया वाहन का परीक्षण कर रहे हैं)" },
    { en: "Seatbelt functional (If testing for Car)", hi: "सीटबेल्ट कार्यात्मक (यदि कार का परीक्षण कर रहे हैं)" }
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-6 flex flex-col font-sans overflow-hidden">
      {/* Mesh Gradients */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-2xl mx-auto w-full relative z-10">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl mb-6 shadow-lg">
            <Car className="text-blue-400" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {lang === 'en' ? 'Permanent Licence' : 'स्थायी लाइसेंस'}
          </h1>
          <p className="text-slate-400">
            {lang === 'en' ? 'Check your dates and book your driving test slot.' : 'अपनी तिथियों की जांच करें और अपना ड्राइविंग टेस्ट स्लॉट बुक करें।'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {bookingStep === 1 && (
            <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              
              {/* Date Input Card */}
              <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <Calendar size={16} className="text-indigo-400"/> 
                  {lang === 'en' ? 'When was your Learner\'s Licence issued?' : 'आपका लर्नर लाइसेंस कब जारी किया गया था?'}
                </label>
                <input 
                  type="date" 
                  value={llDate}
                  onChange={(e) => setLlDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Status & Countdown Card */}
              {calculatedDates && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-3xl border text-center shadow-xl mb-8 ${
                    dateStatus === 'eligible' ? 'bg-emerald-950/30 border-emerald-900/50' : 
                    dateStatus === 'waiting' ? 'bg-blue-950/30 border-blue-900/50' : 
                    'bg-red-950/30 border-red-900/50'
                  }`}
                >
                  {dateStatus === 'waiting' && (
                    <>
                      <Clock className="mx-auto text-blue-400 mb-2" size={32} />
                      <h3 className="text-xl font-bold text-white mb-2">{lang === 'en' ? 'Please Wait' : 'कृपया प्रतीक्षा करें'}</h3>
                      <p className="text-slate-300 mb-4">
                        {lang === 'en' ? `You must wait ${calculatedDates.daysToApply} more days.` : `आपको ${calculatedDates.daysToApply} और दिन प्रतीक्षा करनी होगी।`}
                      </p>
                      <p className="text-sm text-slate-400">{lang === 'en' ? 'You can apply on:' : 'आप आवेदन कर सकते हैं:'} <strong className="text-blue-400">{calculatedDates.apply}</strong></p>
                    </>
                  )}

                  {dateStatus === 'expired' && (
                    <>
                      <AlertTriangle className="mx-auto text-red-400 mb-2" size={32} />
                      <h3 className="text-xl font-bold text-white mb-2">{lang === 'en' ? 'Licence Expired' : 'लाइसेंस समाप्त'}</h3>
                      <p className="text-slate-300">
                        {lang === 'en' ? 'Your 6-month window has closed. You must apply for a new Learner\'s Licence.' : 'आपकी 6 महीने की विंडो बंद हो गई है। आपको नए लर्नर लाइसेंस के लिए आवेदन करना होगा।'}
                      </p>
                    </>
                  )}

                  {dateStatus === 'eligible' && (
                    <>
                      <CheckCircle2 className="mx-auto text-emerald-400 mb-2" size={32} />
                      <h3 className="text-xl font-bold text-white mb-2">{lang === 'en' ? 'You are Eligible!' : 'आप योग्य हैं!'}</h3>
                      <p className="text-emerald-300 font-bold text-2xl mb-4">
                        {calculatedDates.daysToExpire} {lang === 'en' ? 'days left to apply' : 'आवेदन करने के लिए दिन शेष'}
                      </p>
                      <p className="text-sm text-slate-400 mb-6">
                        {lang === 'en' ? 'Expires on:' : 'को समाप्त हो रहा है:'} <strong className="text-emerald-400">{calculatedDates.expiry}</strong>
                      </p>
                      
                      {/* Slot Booking Simulator Form */}
                      <form onSubmit={handleBookSlot} className="text-left bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                        <h4 className="font-bold text-white mb-4">{lang === 'en' ? 'Simulate Slot Booking' : 'स्लॉट बुकिंग का अनुकरण करें'}</h4>
                        
                        <div className="space-y-4 mb-6">
                          <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">{lang === 'en' ? 'Select RTO' : 'आरटीओ चुनें'}</label>
                            <select required value={selectedRto} onChange={(e) => setSelectedRto(e.target.value)} className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-3 outline-none">
                              <option value="">{lang === 'en' ? 'Choose RTO...' : 'आरटीओ चुनें...'}</option>
                              {rtos.map(rto => <option key={rto.id} value={rto.name[lang]}>{rto.name[lang]}</option>)}
                            </select>
                          </div>
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <label className="block text-xs font-medium text-slate-400 mb-1">{lang === 'en' ? 'Date' : 'तारीख'}</label>
                              <input type="date" required value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-3 outline-none" />
                            </div>
                            <div className="flex-1">
                              <label className="block text-xs font-medium text-slate-400 mb-1">{lang === 'en' ? 'Time' : 'समय'}</label>
                              <select required value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-3 outline-none">
                                <option value="">...</option>
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="12:30 PM">12:30 PM</option>
                                <option value="03:00 PM">03:00 PM</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl font-bold transition shadow-lg">
                          {lang === 'en' ? 'Book Test Slot' : 'टेस्ट स्लॉट बुक करें'}
                        </button>
                      </form>
                    </>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {bookingStep === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              
              <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-3xl p-8 mb-8 shadow-xl">
                <CheckCircle2 className="mx-auto text-emerald-500 mb-4" size={48} />
                <h2 className="text-3xl font-bold text-white mb-2">{lang === 'en' ? 'Slot Confirmed!' : 'स्लॉट की पुष्टि हुई!'}</h2>
                <div className="bg-slate-900 rounded-xl p-4 my-6 text-left border border-slate-800">
                  <p className="text-slate-400 text-sm mb-1">{lang === 'en' ? 'Location:' : 'स्थान:'} <strong className="text-white">{selectedRto}</strong></p>
                  <p className="text-slate-400 text-sm mb-1">{lang === 'en' ? 'Date:' : 'तारीख:'} <strong className="text-white">{selectedDate}</strong></p>
                  <p className="text-slate-400 text-sm">{lang === 'en' ? 'Time:' : 'समय:'} <strong className="text-white">{selectedTime}</strong></p>
                </div>
              </div>

              {/* TEST DAY CHECKLIST */}
              <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 text-left shadow-xl mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FileText className="text-blue-400" /> {lang === 'en' ? 'Test Day Checklist' : 'टेस्ट डे चेकलिस्ट'}
                </h3>
                <ul className="space-y-3">
                  {checklist.map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                      <div className="w-5 h-5 rounded border border-slate-600 shrink-0 mt-0.5"></div>
                      <span className="text-sm text-slate-300">{item[lang]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <Link to="/driving-test" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                  {lang === 'en' ? 'Prepare for Driving Test' : 'ड्राइविंग टेस्ट की तैयारी करें'} <ArrowRight size={20} />
                </Link>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}