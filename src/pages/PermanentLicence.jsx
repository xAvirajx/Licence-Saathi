import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle, FileText, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PermanentLicence() {
  const [llDate, setLlDate] = useState('');
  const [bookingState, setBookingState] = useState('initial'); // 'initial', 'booking', 'confirmed'

  // Mock RTOs (Simulating src/data/rtos.js)
  const rtos = [
    { id: "jk02", name: "JK02 - Jammu" },
    { id: "dl01", name: "DL01 - Delhi North" },
    { id: "mh01", name: "MH01 - Mumbai South" }
  ];

  // Calculate Dates
  let applyDate = "";
  let expireDate = "";
  let isEligibleToday = false;

  if (llDate) {
    const ll = new Date(llDate);
    
    // Eligible after 30 days
    const apply = new Date(ll);
    apply.setDate(apply.getDate() + 30);
    applyDate = apply.toLocaleDateString('en-GB');

    // Expires after 6 months
    const expire = new Date(ll);
    expire.setMonth(expire.getMonth() + 6);
    expireDate = expire.toLocaleDateString('en-GB');

    // Check if today is past the 30-day mark
    isEligibleToday = new Date() >= apply;
  }

  const handleBookClick = () => {
    setBookingState('booking');
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setBookingState('confirmed');
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 mt-2">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 text-brand-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Permanent Licence</h1>
      </div>

      {/* Step 1: Enter Date */}
      {bookingState === 'initial' && (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <Calendar size={20} className="text-brand-500"/> When was your LL issued?
          </h2>
          <input 
            type="date" 
            value={llDate}
            onChange={(e) => setLlDate(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-brand-500 outline-none"
          />
        </div>
      )}

      {/* Date Calculations & Button */}
      {llDate && bookingState === 'initial' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-blue-50 border border-blue-200 p-5 rounded-2xl">
          <div className="flex items-start gap-3">
            <Clock className="text-blue-600 mt-1 shrink-0" size={24} />
            <div className="w-full">
              <h3 className="font-bold text-blue-900 text-lg">Timeline Calculator</h3>
              <div className="mt-3 space-y-2 bg-white p-3 rounded-xl border border-blue-100 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Eligible from:</span>
                  <span className="font-bold text-gray-900">{applyDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expires on:</span>
                  <span className="font-bold text-red-600">{expireDate}</span>
                </div>
              </div>
              
              <button 
                onClick={handleBookClick}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-sm transition-colors"
              >
                Book Test Slot (Simulated)
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 2: Booking Form */}
      <AnimatePresence>
        {bookingState === 'booking' && (
          <motion.form 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} 
            onSubmit={handleConfirm}
            className="bg-white p-5 rounded-2xl shadow-sm border border-brand-200 space-y-5"
          >
            <h2 className="font-bold text-brand-700 text-lg flex items-center gap-2">
              <MapPin size={20}/> Select Test Slot
            </h2>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">RTO Office</label>
              <select className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-brand-500 outline-none bg-white">
                {rtos.map(rto => <option key={rto.id} value={rto.id}>{rto.name}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                <input type="date" required className="w-full p-3 border-2 border-gray-200 rounded-xl outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Time</label>
                <select className="w-full p-3 border-2 border-gray-200 rounded-xl outline-none bg-white">
                  <option>10:00 AM</option>
                  <option>11:30 AM</option>
                  <option>02:00 PM</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl shadow-sm">
              Confirm Booking
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Step 3: Success & Checklist */}
      {bookingState === 'confirmed' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-green-50 border border-green-200 p-5 rounded-2xl text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-green-900 mb-1">Slot Confirmed!</h2>
            <p className="text-green-800 text-sm">Your driving test is booked successfully.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
              <FileText size={20} className="text-brand-500" /> Test-Day Checklist
            </h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-2"><CheckCircle size={18} className="text-gray-400 shrink-0"/> Original Learner's Licence</li>
              <li className="flex gap-2"><CheckCircle size={18} className="text-gray-400 shrink-0"/> Application forms and fees receipt</li>
              <li className="flex gap-2"><CheckCircle size={18} className="text-gray-400 shrink-0"/> Vehicle with valid RC, Insurance, and PUC</li>
              <li className="flex gap-2"><CheckCircle size={18} className="text-gray-400 shrink-0"/> Helmet (mandatory for two-wheelers)</li>
              <li className="flex gap-2"><CheckCircle size={18} className="text-gray-400 shrink-0"/> Appropriate footwear (no sandals/chappals)</li>
            </ul>
          </div>
        </motion.div>
      )}

      {/* Explainer Link (Always visible) */}
      <Link to="/driving-test" className="w-full flex items-center justify-center gap-2 bg-white border-2 border-brand-600 text-brand-600 font-bold p-4 rounded-xl mt-6 hover:bg-brand-50 transition-colors">
        View Driving Test Track Guide
      </Link>
      
    </motion.div>
  );
}