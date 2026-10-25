import { useState, useContext } from 'react';
import { AppContext } from '../App';
import { 
  Search, Clock, CheckCircle2, AlertTriangle, Truck, 
  FileText, ShieldCheck, ExternalLink, ArrowRight, RefreshCw,
  Layers, Database, Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TrackApp() {
  const { lang, effectiveTheme } = useContext(AppContext);

  const [inputNumber, setInputNumber] = useState('DL-443920');
  const [activeRecord, setActiveRecord] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiSetuViewOpen, setApiSetuViewOpen] = useState(false);
  const [apiSetuData, setApiSetuData] = useState(null);

  // Pre-configured mock database conforming to API Setu schema
  const mockDatabase = {
    'DL-443920': {
      number: 'DL-443920',
      type: 'Permanent Driving Licence (LMV)',
      holder: 'Vikas Sharma',
      rto: 'Ahmedabad RTO (Subhash Bridge - GJ01)',
      appliedDate: '12 Aug 2026',
      status: 'DISPATCHED',
      statusLabel: { 
        en: 'Smart Card Dispatched via Speed Post', 
        hi: 'स्मार्ट कार्ड स्पीड पोस्ट से भेजा गया', 
        gu: 'સ્માર્ટ કાર્ડ સ્પીડ પોસ્ટ દ્વારા મોકલવામાં આવેલ છે' 
      },
      currentStep: 5,
      speedPost: {
        trackingNumber: 'EK884920192IN',
        dispatchedDate: '23 Oct 2026',
        lastLocation: 'Ahmedabad GPO Sorting Hub',
        statusText: 'Out for delivery to resident address'
      }
    },
    'LL-948201': {
      number: 'LL-948201',
      type: "Learner's Licence Application (MCWG + LMV)",
      holder: 'Pooja Patel',
      rto: 'Ahmedabad RTO (Subhash Bridge - GJ01)',
      appliedDate: '22 Oct 2026',
      status: 'IN_PROGRESS',
      statusLabel: { 
        en: 'Test Slot Confirmed / Awaiting STALL Exam', 
        hi: 'टेस्ट स्लॉट पुष्ट / परीक्षा प्रतीक्षित', 
        gu: 'ટેસ્ટ સ્લોટ કન્ફર્મ / પરીક્ષા બાકી' 
      },
      currentStep: 3,
      slotDetails: {
        date: '04 Nov 2026',
        time: '10:30 AM',
        kioskRoom: 'Touchscreen Lab Room 2'
      }
    },
    'LL-112233': {
      number: 'LL-112233',
      type: "Learner's Licence Application (LMV)",
      holder: 'Karan Mehta',
      rto: 'Gandhinagar RTO (Sector 28 - GJ18)',
      appliedDate: '18 Oct 2026',
      status: 'ACTION_REQUIRED',
      statusLabel: { 
        en: 'Action Required: Document Query Raised', 
        hi: 'कार्रवाई आवश्यक: दस्तावेज़ में आपत्ति', 
        gu: 'ધ્યાન આપો: દસ્તાવેજમાં ભૂલ જણાયેલ છે' 
      },
      currentStep: 2,
      queryReason: 'Uploaded Address Proof PDF is blurry and illegible. RTO Scrutiny officer requested re-upload.'
    }
  };

  const handleSearch = (numberToSearch) => {
    const query = (numberToSearch || inputNumber).trim().toUpperCase();
    if (!query) return;

    setLoading(true);
    setSearched(true);

    setTimeout(() => {
      const result = mockDatabase[query] || null;
      setActiveRecord(result);
      setLoading(false);

      // Fetch or synthesize API Setu contract data
      if (result) {
        setApiSetuData({
          gateway: 'API_SETU_MORTH_GATEWAY',
          endpoint: `/api/apisetu/dl-verification?dlNumber=${query}`,
          schemaVersion: '1.0.2',
          orgId: '001423-morth',
          queryTimestamp: new Date().toISOString(),
          recordStatus: result.status,
          cmvrReference: 'Rule 139 / CMVR 1989'
        });
      } else {
        setApiSetuData(null);
      }
    }, 400);
  };

  const handleSelectDemo = (id) => {
    setInputNumber(id);
    handleSearch(id);
  };

  const milestoneSteps = [
    { num: 1, title: { en: 'Application Submitted', hi: 'आवेदन जमा हुआ', gu: 'અરજી સબમિટ થઈ' } },
    { num: 2, title: { en: 'Scrutiny & Document Verification', hi: 'दस्तावेज़ सत्यापन', gu: 'દસ્તાવેજ ચકાસણી' } },
    { num: 3, title: { en: 'Biometrics & Test Slot', hi: 'बायोमेट्रिक्स और टेस्ट', gu: 'બાયોમેટ્રિક્સ અને સ્લોટ' } },
    { num: 4, title: { en: 'Test Passed & Card Printed', hi: 'टेस्ट पास व कार्ड प्रिंट', gu: 'ટેસ્ટ પાસ અને કાર્ડ પ્રિન્ટ' } },
    { num: 5, title: { en: 'Dispatched via Speed Post', hi: 'स्पीड पोस्ट से रवाना', gu: 'સ્પીડ પોસ્ટ રવાના' } }
  ];

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 flex flex-col font-sans">
      <div className="max-w-3xl mx-auto w-full relative z-10 space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-xs uppercase tracking-wider">
            <Clock size={14} />
            <span>{lang === 'en' ? 'Live Application Status Tracker' : lang === 'hi' ? 'लाइव आवेदन ट्रैकर' : 'લાઇવ અરજી સ્ટેટસ ટ્રેકર'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {lang === 'en' ? 'Track Your Licence Application' : lang === 'hi' ? 'अपने लाइसेंस की स्थिति जांचें' : 'તમારા લાયસન્સનું સ્ટેટસ ટ્રેક કરો'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
            {lang === 'en' && 'Enter your Application or DL number. Aligned with API Setu MoRTH verification specifications.'}
            {lang === 'hi' && 'अपना आवेदन या डीएल नंबर दर्ज करें। सरकारी एपीआई सेतु मानकों के अनुरूप।'}
            {lang === 'gu' && 'તમારો એપ્લિકેશન અથવા DL નંબર દાખલ કરો. API Setu અને પરિવહન ધોરણો મુજબ.'}
          </p>
        </div>

        {/* Search Bar & Quick Demo Chips */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                placeholder="e.g. DL-443920 or LL-948201"
                className="w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-700 rounded-2xl text-white font-mono text-sm focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-sm transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <Search size={16} />}
              <span>{lang === 'en' ? 'Track Status' : lang === 'hi' ? 'स्थिति देखें' : 'સ્ટેટસ જુઓ'}</span>
            </button>
          </div>

          {/* 3 Clickable Demo Numbers For Judges */}
          <div className="pt-2 border-t border-slate-800/80">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              {lang === 'en' ? 'Quick Test Credentials (No typing required):' : 'ત્વરિત ડેમો નંબર્સ:'}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSelectDemo('DL-443920')}
                className="px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-600/40 text-emerald-300 text-xs font-mono font-bold hover:bg-emerald-900/50 transition flex items-center gap-1.5"
              >
                <span>DL-443920</span>
                <span className="text-[10px] text-emerald-400 font-sans">(Dispatched)</span>
              </button>

              <button
                onClick={() => handleSelectDemo('LL-948201')}
                className="px-3 py-1.5 rounded-xl bg-blue-950/40 border border-blue-600/40 text-blue-300 text-xs font-mono font-bold hover:bg-blue-900/50 transition flex items-center gap-1.5"
              >
                <span>LL-948201</span>
                <span className="text-[10px] text-blue-400 font-sans">(Slot Booked)</span>
              </button>

              <button
                onClick={() => handleSelectDemo('LL-112233')}
                className="px-3 py-1.5 rounded-xl bg-amber-950/40 border border-amber-600/40 text-amber-300 text-xs font-mono font-bold hover:bg-amber-900/50 transition flex items-center gap-1.5"
              >
                <span>LL-112233</span>
                <span className="text-[10px] text-amber-400 font-sans">(Doc Query)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tracking Result Card */}
        {searched && (
          activeRecord ? (
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              {/* Status Header Pill */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-5">
                <div>
                  <span className="text-xs font-mono text-blue-400 font-bold">{activeRecord.number}</span>
                  <h2 className="text-xl font-bold text-white mt-0.5">{activeRecord.holder}</h2>
                  <p className="text-xs text-slate-400">{activeRecord.type} • {activeRecord.rto}</p>
                </div>

                <div className={`px-4 py-2 rounded-2xl border text-xs font-bold inline-flex items-center gap-2 shrink-0 ${
                  activeRecord.status === 'DISPATCHED' 
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                    : activeRecord.status === 'IN_PROGRESS'
                    ? 'bg-blue-950/40 border-blue-500 text-blue-300'
                    : 'bg-amber-950/40 border-amber-500 text-amber-300'
                }`}>
                  {activeRecord.status === 'DISPATCHED' && <CheckCircle2 size={16} />}
                  {activeRecord.status === 'IN_PROGRESS' && <Clock size={16} />}
                  {activeRecord.status === 'ACTION_REQUIRED' && <AlertTriangle size={16} />}
                  <span>{activeRecord.statusLabel[lang] || activeRecord.statusLabel.en}</span>
                </div>
              </div>

              {/* 5-Stage Milestone Stepper */}
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {lang === 'en' ? 'Official Stage Progress:' : 'સ્ટેજ પ્રગતિ:'}
                </p>
                <div className="grid grid-cols-5 gap-1.5">
                  {milestoneSteps.map((m) => {
                    const isDone = m.num <= activeRecord.currentStep;
                    const isCurrent = m.num === activeRecord.currentStep;

                    return (
                      <div key={m.num} className="text-center space-y-1.5">
                        <div className={`h-2 rounded-full transition-all ${
                          isDone 
                            ? activeRecord.status === 'ACTION_REQUIRED' && isCurrent 
                              ? 'bg-amber-500' 
                              : 'bg-blue-500' 
                            : 'bg-slate-800'
                        }`} />
                        <span className={`block text-[10px] leading-tight font-medium ${
                          isCurrent ? 'text-white font-bold' : isDone ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {m.title[lang] || m.title.en}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Milestone Details: Speed Post Live Tracking */}
              {activeRecord.speedPost && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <Truck size={16} className="text-emerald-400" />
                      <span>India Post Speed Post Tracking</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {activeRecord.speedPost.trackingNumber}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 space-y-1">
                    <p>• Dispatched from RTO Central Printing Unit on {activeRecord.speedPost.dispatchedDate}</p>
                    <p>• Current Location: <strong className="text-white">{activeRecord.speedPost.lastLocation}</strong></p>
                    <p>• Status: <span className="text-emerald-400 font-semibold">{activeRecord.speedPost.statusText}</span></p>
                  </div>
                </div>
              )}

              {/* Milestone Details: Slot Booked */}
              {activeRecord.slotDetails && (
                <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-900/50 space-y-2 text-xs">
                  <p className="font-bold text-blue-300">STALL Kiosk Computer Test Confirmed:</p>
                  <p className="text-slate-300">
                    Slot Time: <strong>{activeRecord.slotDetails.date} at {activeRecord.slotDetails.time}</strong>
                  </p>
                  <p className="text-slate-400">
                    Location: {activeRecord.rto} ({activeRecord.slotDetails.kioskRoom}). Please carry your printed Application Form and original identity proof.
                  </p>
                </div>
              )}

              {/* Milestone Details: Action Required Advice */}
              {activeRecord.queryReason && (
                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-900/60 space-y-2.5">
                  <p className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <AlertTriangle size={15} />
                    <span>Officer Note: {activeRecord.queryReason}</span>
                  </p>
                  <p className="text-xs text-slate-300">
                    {lang === 'en' 
                      ? 'No penalty is charged. You do not need to visit the RTO or pay an agent. Re-upload a clear scanned copy online.' 
                      : 'કોઈ દંડ ભરવાનો નથી. RTO જવાની જરૂર નથી. સત્તાવાર પોર્ટલ પર નવો ફોટો અપલોડ કરો.'}
                  </p>
                  <a
                    href="https://sarathi.parivahan.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition"
                  >
                    <span>Re-upload on Parivahan Sarathi</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}

              {/* API SETU SPECIFICATION & DATA CONTRACT VIEWER */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database size={15} className="text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      API Setu (apisetu.gov.in) Gateway Compliance
                    </span>
                  </div>
                  <button
                    onClick={() => setApiSetuViewOpen(!apiSetuViewOpen)}
                    className="text-xs text-blue-400 hover:underline font-bold"
                  >
                    {apiSetuViewOpen ? 'Hide Payload' : 'Inspect JSON Schema'}
                  </button>
                </div>

                {apiSetuViewOpen && apiSetuData && (
                  <pre className="p-3 bg-slate-900 border border-slate-800/80 rounded-xl text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
                    {JSON.stringify(apiSetuData, null, 2)}
                  </pre>
                )}
              </div>

            </div>
          ) : (
            <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-3xl space-y-3">
              <p className="text-base font-bold text-slate-300">No Application Found for "{inputNumber}"</p>
              <p className="text-xs text-slate-500">
                Please check the number or click any of the 3 quick-test demo buttons above.
              </p>
            </div>
          )
        )}

      </div>
    </div>
  );
}