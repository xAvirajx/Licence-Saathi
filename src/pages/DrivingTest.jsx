import { Link } from 'react-router-dom';
import { ArrowLeft, AlertOctagon, Car, Bike } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DrivingTest() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 mt-2">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/permanent-licence" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 text-brand-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Driving Test Guide</h1>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-lg text-gray-800">What happens at the track?</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="font-bold text-brand-700 mb-2 flex items-center gap-2"><Bike size={18}/> Two-Wheeler Test</h3>
            <p className="text-sm text-gray-600">You must ride in a Figure-8 shape without putting your feet on the ground. Indicators must be used correctly when entering and exiting.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="font-bold text-brand-700 mb-2 flex items-center gap-2"><Car size={18}/> Car (LMV) Test</h3>
            <p className="text-sm text-gray-600">You will be tested on parallel parking, driving in reverse on an 'S' track, and smooth up-gradient starting (hill start).</p>
          </div>
        </div>
      </div>

      <div className="bg-red-50 p-5 rounded-2xl shadow-sm border border-red-200 space-y-4">
        <h2 className="font-bold text-red-800 flex items-center gap-2">
          <AlertOctagon size={20} /> 5 Common Reasons People Fail
        </h2>
        <ul className="space-y-3 text-sm text-red-900">
          <li className="flex gap-2"><span className="font-bold">1.</span> Forgetting to fasten the seatbelt or wear a helmet before turning the key.</li>
          <li className="flex gap-2"><span className="font-bold">2.</span> Putting a foot down during the two-wheeler Figure-8 test.</li>
          <li className="flex gap-2"><span className="font-bold">3.</span> Rolling backward on an incline start.</li>
          <li className="flex gap-2"><span className="font-bold">4.</span> Forgetting to use indicators when turning or parking.</li>
          <li className="flex gap-2"><span className="font-bold">5.</span> Hitting the curb or poles during reverse parking.</li>
        </ul>
      </div>
    </motion.div>
  );
}