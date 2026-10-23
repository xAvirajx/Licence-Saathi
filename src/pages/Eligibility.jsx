import { useState, useContext } from 'react';
import { AppContext } from '../App';
import { rulesConfig } from '../data/config';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Eligibility() {
  const { t } = useContext(AppContext);
  const [age, setAge] = useState('');
  const [vehicle, setVehicle] = useState('gearless');
  const [result, setResult] = useState(null);

  const checkEligibility = (e) => {
    e.preventDefault();
    const userAge = parseInt(age, 10);
    if (!userAge) return;

    const requiredAge = rulesConfig.minimumAge[vehicle].age;
    
    if (userAge >= requiredAge) {
      setResult({ eligible: true, message: `Yes! You are eligible to apply for a ${vehicle} licence.` });
    } else {
      const waitYears = requiredAge - userAge;
      setResult({ eligible: false, message: `Not yet. You must be ${requiredAge}. You can apply in ${waitYears} year${waitYears > 1 ? 's' : ''}.` });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 mt-2">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 text-brand-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Can I apply?</h1>
      </div>

      <form onSubmit={checkEligibility} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">How old are you?</label>
          <input 
            type="number" 
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-brand-500 focus:ring-0 outline-none transition-colors"
            placeholder="e.g. 19"
            required
            min="10"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Vehicle Type</label>
          <select 
            value={vehicle} 
            onChange={(e) => setVehicle(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-brand-500 focus:ring-0 outline-none bg-white transition-colors"
          >
            <option value="gearless">Two-wheeler without gear (up to 50cc)</option>
            <option value="gearedOrCar">Motorcycle with gear / Car</option>
            <option value="commercial">Commercial / Transport Vehicle</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl shadow-sm transition-colors text-lg">
          Check Eligibility
        </button>
      </form>

      {result && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} 
          className={`p-5 rounded-2xl border-2 flex gap-4 ${result.eligible ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className={`mt-0.5 ${result.eligible ? 'text-green-600' : 'text-red-500'}`}>
            {result.eligible ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
          </div>
          <div>
            <h3 className={`font-bold text-lg ${result.eligible ? 'text-green-800' : 'text-red-800'}`}>
              {result.eligible ? 'You are ready!' : 'Not quite yet'}
            </h3>
            <p className={`mt-1 font-medium ${result.eligible ? 'text-green-700' : 'text-red-700'}`}>
              {result.message}
            </p>
            {result.eligible && (
              <Link to="/documents" className="inline-block mt-3 font-bold text-brand-600 hover:text-brand-800 underline">
                See required documents →
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}