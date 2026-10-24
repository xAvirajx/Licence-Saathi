import { useState, useContext } from 'react';
import { AppContext } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Search, CheckCircle2, Circle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TrackApp() {
  const { lang } = useContext(AppContext);
  const [appNumber, setAppNumber] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  const sampleData = {
    'LL-948201': {
      type: 'LEARNER LICENCE',
      name: 'Rahul Kumar',
      currentStep: 2,
      steps: [
        { title: 'Application Submitted', date: '12 Oct 2026', done: true },
        { title: 'Document Verification', date: '14 Oct 2026', done: true },
        { title: 'LL Test Pending', date: 'Action Required', done: false },
        { title: 'Licence Approved', date: '-', done: false }
      ]
    },
    'DL-443920': {
      type: 'PERMANENT LICENCE',
      name: 'Priya Sharma',
      currentStep: 4,
      steps: [
        { title: 'Application Submitted', date: '01 Sep 2026', done: true },
        { title: 'Driving Test Passed', date: '15 Sep 2026', done: true },
        { title: 'DL Printing', date: '18 Sep 2026', done: true },
        { title: 'Dispatched via Speed Post', date: '20 Sep 2026', done: true }
      ]
    },
    'LL-112233': {
      type: 'LEARNER LICENCE',
      name: 'Amit Patel',
      currentStep: 1,
      steps: [
        { title: 'Application Submitted', date: '22 Oct 2026', done: true },
        { title: 'Document Verification Failed', date: 'Name mismatch on Aadhaar', done: false, isError: true },
        { title: 'LL Test Pending', date: '-', done: false },
        { title: 'Licence Approved', date: '-', done: false }
      ]
    }
  };

  const handleTrack = (e) => {
    e.preventDefault();
    const query = appNumber.trim().toUpperCase();
    if (!query) return;

    if (sampleData[query]) {
      setStatus(sampleData[query]);
      setError('');
    } else {
      setStatus(null);
      setError(lang === 'en' ? 'Application not found. Try a sample number below.' : 'અરજી મળી નથી. નીચે આપેલ સેમ્પલ નંબર અજમાવો.');
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-6 flex flex-col font-sans overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-2xl mx-auto w-full relative z-10">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl mb-6 shadow-lg">
            <Activity className="text-emerald-400" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {lang === 'en' ? 'Track Application' : lang === 'hi' ? 'आवेदन ट्रैक करें' : 'અરજી ટ્રેક કરો'}
          </h1>
          <p className="text-slate-400">
            {lang === 'en' ? 'Enter your application number to see live status updates.' : lang === 'hi' ? 'लाइव स्थिति देखने के लिए अपना आवेदन नंबर दर्ज करें।' : 'લાઇવ સ્ટેટસ જોવા માટે તમારો એપ્લિકેશન નંબર દાખલ કરો.'}
          </p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl mb-8">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input 
                type="text" 
                value={appNumber}
                onChange={(e) => setAppNumber(e.target.value)}
                placeholder="e.g. DL-443920"
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-4 pl-5 pr-12 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-blue-600/30 w-full sm:w-auto"
            >
              {lang === 'en' ? 'Track' : lang === 'hi' ? 'ट्रैक करें' : 'ટ્રેક કરો'} <Search size={18} />
            </button>
          </form>

          {error && <p className="text-red-400 text-sm mt-4 text-center font-medium">{error}</p>}

          <div className="mt-6">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">
              {lang === 'en' ? 'Try these sample numbers:' : lang === 'hi' ? 'इन नमूना संख्याओं का प्रयास करें:' : 'આ સેમ્પલ નંબર અજમાવો:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(sampleData).map(num => (
                <button 
                  key={num}
                  onClick={() => { setAppNumber(num); setStatus(sampleData[num]); setError(''); }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-slate-300 transition"
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {status && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl"
            >
              <div className="flex justify-between items-start mb-8 pb-6 border-b border-slate-800">
                <div>
                  <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">{status.type}</p>
                  <h2 className="text-2xl font-bold text-white mb-1">{appNumber.toUpperCase()}</h2>
                  <p className="text-slate-400 text-sm">Applicant: <span className="text-white font-medium">{status.name}</span></p>
                </div>
                <div className="w-12 h-12 bg-blue-900/30 border border-blue-500/30 rounded-xl flex items-center justify-center text-blue-400">
                  <ShieldCheck size={24} />
                </div>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                {status.steps.map((step, idx) => {
                  const isDone = step.done;
                  const isError = step.isError;
                  const isCurrent = !isDone && !isError && idx === status.currentStep - 1;

                  return (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-slate-900 bg-slate-800 text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow">
                        {isDone ? (
                          <CheckCircle2 className="text-emerald-400 bg-emerald-950 rounded-full" size={24} />
                        ) : isError ? (
                          <Circle className="text-red-500 fill-red-950/50" size={24} />
                        ) : isCurrent ? (
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                          </span>
                        ) : (
                          <Circle className="text-slate-700" size={16} />
                        )}
                      </div>

                      <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-slate-800 bg-slate-900/50 shadow-sm">
                        <div className="flex flex-col">
                          <h4 className={`font-bold text-sm ${isError ? 'text-red-400' : isDone ? 'text-white' : 'text-slate-400'}`}>{step.title}</h4>
                          <span className={`text-xs mt-1 ${isError ? 'text-red-300/70 font-mono' : 'text-slate-500'}`}>{step.date}</span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}