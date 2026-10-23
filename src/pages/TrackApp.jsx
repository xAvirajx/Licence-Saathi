import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, CheckCircle, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrackApp() {
  const [appNo, setAppNo] = useState('');
  const [searched, setSearched] = useState(false);

  const timeline = [
    { title: "Application Submitted", done: true, date: "12 Oct 2026" },
    { title: "Documents Checked", done: true, date: "14 Oct 2026" },
    { title: "Test Booked", done: true, date: "15 Oct 2026" },
    { title: "Driving Test Passed", done: false, date: "Pending" },
    { title: "Licence Printed", done: false, date: "-" },
    { title: "Sent by Post", done: false, date: "-" },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 mt-2">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 text-brand-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Track Application</h1>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <label className="block text-sm font-bold text-gray-700">Enter Application Number</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={appNo}
            onChange={(e) => setAppNo(e.target.value)}
            placeholder="e.g. APP-2026-1234"
            className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-brand-500 outline-none uppercase"
          />
          <button onClick={() => setSearched(true)} className="bg-brand-600 hover:bg-brand-700 text-white p-3 rounded-xl shadow-sm">
            <Search size={24} />
          </button>
        </div>
        {!searched && <p className="text-xs text-gray-500">Try sample number: APP-2026-8910</p>}
      </div>

      {searched && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-lg mb-6">Application Status</h2>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-3.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {timeline.map((item, index) => (
              <div key={index} className="relative flex items-center gap-4">
                <div className={`z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 ${item.done ? 'border-green-500 text-green-500' : 'border-gray-300 text-gray-300'}`}>
                  {item.done ? <CheckCircle size={20} /> : <Circle size={16} />}
                </div>
                <div>
                  <h3 className={`font-bold ${item.done ? 'text-gray-900' : 'text-gray-400'}`}>{item.title}</h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}