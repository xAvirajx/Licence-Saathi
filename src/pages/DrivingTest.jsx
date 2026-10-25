import { useState, useContext } from 'react';
import { AppContext } from '../App';
import { 
  Car, Bike, CheckCircle2, AlertTriangle, Clock, 
  MapPin, ShieldCheck, ArrowRight, ArrowLeft,
  Navigation, Eye, Compass, Layers, ShieldAlert,
  Info, Sparkles, Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DrivingTest() {
  const { lang, effectiveTheme } = useContext(AppContext);

  // Active Vehicle Category: 'twoWheeler' | 'car'
  const [activeCategory, setActiveCategory] = useState('car');

  // Active LMV Maneuver: 'hTrack' | 'reverseS' | 'gradient' | 'parking'
  const [activeLmvTrack, setActiveLmvTrack] = useState('hTrack');

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 flex flex-col font-sans">
      <div className="max-w-4xl mx-auto w-full relative z-10 space-y-10">

        {/* Header & Back Link */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            aria-label="Back to Home"
            className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Compass size={14} />
              <span>Official ADTT Track Blueprints</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {lang === 'en' ? 'Automated Driving Test Guide' : lang === 'hi' ? 'स्वचालित ड्राइविंग टेस्ट गाइड' : 'ઓટોમેટેડ ડ્રાઇવિંગ ટેસ્ટ ટ્રેક ગાઇડ'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {lang === 'en' 
                ? 'Official sensor track layouts, sensor penalty boundaries, and passing benchmarks for Cars & Two-Wheelers.' 
                : 'કાર અને ટુ-વ્હીલર માટે સત્તાવાર RTO સેન્સર ટ્રેક નકશા, નિયમો અને ટેકનિક.'}
            </p>
          </div>
        </div>

        {/* 1. VEHICLE CATEGORY SELECTOR SWITCH */}
        <div className="p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 grid grid-cols-2 gap-2 shadow-xl backdrop-blur-md">
          <button
            onClick={() => setActiveCategory('car')}
            className={`py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2.5 ${
              activeCategory === 'car'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Car size={18} />
            <span>{lang === 'en' ? 'Car Test (LMV - 4 Wheeler)' : lang === 'hi' ? 'कार टेस्ट (LMV)' : 'કાર ટેસ્ટ (LMV - 4 વ્હીલર)'}</span>
          </button>

          <button
            onClick={() => setActiveCategory('twoWheeler')}
            className={`py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2.5 ${
              activeCategory === 'twoWheeler'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Bike size={18} />
            <span>{lang === 'en' ? 'Two-Wheeler (MCWG)' : lang === 'hi' ? 'दोपहिया टेस्ट (MCWG)' : 'ટુ-વ્હીલર ટેસ્ટ (MCWG)'}</span>
          </button>
        </div>

        {/* 2. CAR TEST (LMV) - THE OFFICIAL FULL-SIZE MULTI-TRACK SYSTEM */}
        {activeCategory === 'car' && (
          <div className="space-y-6">

            {/* Sub-Track Switcher for Car Maneuvers */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {[
                { id: 'hTrack', label: { en: '1. The "H" Track', hi: '1. "H" ट्रैक', gu: '1. "H" ટ્રેક' } },
                { id: 'reverseS', label: { en: '2. Reverse "S" Bend', hi: '2. रिवर्स "S" ट्रैक', gu: '2. રિવર્સ "S" ટ્રેક' } },
                { id: 'gradient', label: { en: '3. Gradient Ramp (Hill)', hi: '3. चढ़ाई टेस्ट (रैंप)', gu: '3. ચઢાણ ટેસ્ટ (ગ્રેડિઅન્ટ)' } },
                { id: 'parking', label: { en: '4. Parallel Parking', hi: '4. पैरेलल पार्किंग', gu: '4. પેરેલલ પાર્કિંગ' } }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveLmvTrack(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeLmvTrack === tab.id
                      ? 'bg-blue-600/20 border border-blue-500 text-blue-300 shadow-md shadow-blue-900/30'
                      : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{tab.label[lang] || tab.label.en}</span>
                  {activeLmvTrack === tab.id && <Check size={14} className="stroke-[3]" />}
                </button>
              ))}
            </div>

            {/* CAR TRACK VISUALIZATION CANVAS */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 space-y-6 shadow-2xl">
              
              {/* Dynamic Header based on active track */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800 mb-1">
                    Sensor Monitored ADTT
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    {activeLmvTrack === 'hTrack' && (lang === 'en' ? 'The Official "H" Track Maneuver' : 'સત્તાવાર "H" ટ્રેક પ્રક્રિયા')}
                    {activeLmvTrack === 'reverseS' && (lang === 'en' ? 'Reverse "S" Curved Navigation' : 'રિવર્સ "S" વળાંક ટ્રેક')}
                    {activeLmvTrack === 'gradient' && (lang === 'en' ? 'Gradient Hill Ramp (Rollback Test)' : 'ચઢાણ રેમ્પ ટેસ્ટ (રોલબેક)')}
                    {activeLmvTrack === 'parking' && (lang === 'en' ? 'Parallel Parking Bay' : 'પેરેલલ પાર્કિંગ બોક્સ')}
                  </h2>
                </div>

                <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                  {activeLmvTrack === 'hTrack' && 'Max Time: 180s • Sensors: 24 Coils'}
                  {activeLmvTrack === 'reverseS' && 'Max Time: 120s • Sensors: Dual Camera'}
                  {activeLmvTrack === 'gradient' && 'Max Rollback: 15 cm • Slope: 1:6'}
                  {activeLmvTrack === 'parking' && 'Max Time: 180s • Attempts: ≤ 3'}
                </div>
              </div>

              {/* VECTOR BLUEPRINT SVGS */}
              <div className="relative w-full rounded-2xl bg-slate-950 border border-slate-800/90 p-4 sm:p-6 overflow-hidden flex items-center justify-center min-h-[300px]">
                
                {/* 1. H-TRACK SVG */}
                {activeLmvTrack === 'hTrack' && (
                  <svg viewBox="0 0 700 360" className="w-full max-h-[340px]" xmlns="http://www.w3.org/2000/svg">
                    {/* Asphalt Surface Background */}
                    <rect width="700" height="360" fill="#080e1e" rx="12" />

                    {/* H-Track Road Asphalt */}
                    {/* Left Bay */}
                    <rect x="80" y="40" width="120" height="280" rx="8" fill="#131d33" stroke="#2563eb" stroke-width="2.5" />
                    {/* Right Bay */}
                    <rect x="500" y="40" width="120" height="280" rx="8" fill="#131d33" stroke="#2563eb" stroke-width="2.5" />
                    {/* Center Connecting Street */}
                    <rect x="180" y="130" width="340" height="100" fill="#131d33" stroke="#2563eb" stroke-width="2.5" />

                    {/* Sensor Boundary Curb Lines (Yellow / Red warning marks) */}
                    <line x1="80" y1="40" x2="80" y2="320" stroke="#f59e0b" stroke-width="3" stroke-dasharray="8,6" />
                    <line x1="620" y1="40" x2="620" y2="320" stroke="#f59e0b" stroke-width="3" stroke-dasharray="8,6" />
                    
                    {/* Ground Sensor Dots (Virtual coils) */}
                    {[100, 180, 260].map(y => (
                      <g key={y}>
                        <circle cx="85" cy={y} r="4" fill="#ef4444" />
                        <circle cx="195" cy={y} r="4" fill="#ef4444" />
                        <circle cx="505" cy={y} r="4" fill="#ef4444" />
                        <circle cx="615" cy={y} r="4" fill="#ef4444" />
                      </g>
                    ))}

                    {/* STEP 1: Forward Entry into Left Lane (Cyan Arrow) */}
                    <path d="M 140 310 L 140 70" fill="none" stroke="#38bdf8" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="6,4" />
                    <polygon points="140,55 133,75 147,75" fill="#38bdf8" />
                    <rect x="100" y="275" width="80" height="22" rx="6" fill="#0284c7" />
                    <text x="140" y="290" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">1. ENTRY</text>

                    {/* STEP 2: Reverse into Center Bridge (Emerald Dash) */}
                    <path d="M 140 75 Q 140 180 350 180" fill="none" stroke="#34d399" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="6,4" />
                    <polygon points="365,180 348,173 348,187" fill="#34d399" />
                    <text x="240" y="165" fill="#34d399" font-size="11" font-weight="bold">2. REVERSE THROUGH CENTER</text>

                    {/* STEP 3: Reverse into Right Bay & Forward Exit */}
                    <path d="M 350 180 Q 560 180 560 70" fill="none" stroke="#f59e0b" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="6,4" />
                    <polygon points="560,55 553,75 567,75" fill="#f59e0b" />
                    <text x="440" y="165" fill="#f59e0b" font-size="11" font-weight="bold">3. REVERSE INTO BAY</text>

                    {/* STEP 4: Exit Arrow */}
                    <path d="M 560 70 L 560 310" fill="none" stroke="#22c55e" stroke-width="4.5" stroke-linecap="round" />
                    <polygon points="560,325 553,305 567,305" fill="#22c55e" />
                    <rect x="520" y="275" width="80" height="22" rx="6" fill="#15803d" />
                    <text x="560" y="290" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">4. EXIT</text>

                    {/* Sensor Overhead Cameras */}
                    <circle cx="350" cy="50" r="14" fill="#1e293b" stroke="#38bdf8" stroke-width="2" />
                    <text x="350" y="54" fill="#38bdf8" font-size="9" text-anchor="middle" font-weight="bold">AI CAM</text>
                  </svg>
                )}

                {/* 2. REVERSE 'S' BEND SVG */}
                {activeLmvTrack === 'reverseS' && (
                  <svg viewBox="0 0 700 360" className="w-full max-h-[340px]" xmlns="http://www.w3.org/2000/svg">
                    <rect width="700" height="360" fill="#080e1e" rx="12" />

                    {/* Outer S-Road Shape */}
                    <path 
                      d="M 80 80 Q 250 80 350 180 Q 450 280 620 280" 
                      fill="none" 
                      stroke="#131d33" 
                      stroke-width="110" 
                      stroke-linecap="round" 
                    />
                    {/* Road Borders */}
                    <path 
                      d="M 80 25 Q 270 25 385 140 Q 480 225 620 225" 
                      fill="none" 
                      stroke="#2563eb" 
                      stroke-width="3" 
                    />
                    <path 
                      d="M 80 135 Q 230 135 315 220 Q 420 335 620 335" 
                      fill="none" 
                      stroke="#2563eb" 
                      stroke-width="3" 
                    />

                    {/* Sensor Boundary Warning Lines */}
                    <path 
                      d="M 80 30 Q 268 30 380 145 Q 475 230 620 230" 
                      fill="none" 
                      stroke="#ef4444" 
                      stroke-width="2" 
                      stroke-dasharray="6,4" 
                    />
                    <path 
                      d="M 80 130 Q 235 130 320 215 Q 425 330 620 330" 
                      fill="none" 
                      stroke="#ef4444" 
                      stroke-width="2" 
                      stroke-dasharray="6,4" 
                    />

                    {/* Driving Trajectory in REVERSE */}
                    <path 
                      d="M 600 280 Q 450 280 350 180 Q 250 80 100 80" 
                      fill="none" 
                      stroke="#38bdf8" 
                      stroke-width="5" 
                      stroke-dasharray="8,6" 
                    />
                    <polygon points="85,80 105,73 105,87" fill="#38bdf8" />

                    <rect x="520" y="265" width="80" height="24" rx="6" fill="#1e40af" />
                    <text x="560" y="281" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">REVERSE IN</text>

                    <rect x="90" y="18" width="80" height="24" rx="6" fill="#15803d" />
                    <text x="130" y="34" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">EXIT OUT</text>

                    <text x="350" y="215" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">
                      Zero Curb Contacts Allowed • Use Side Mirrors
                    </text>
                  </svg>
                )}

                {/* 3. GRADIENT RAMP (HILL START) SVG */}
                {activeLmvTrack === 'gradient' && (
                  <svg viewBox="0 0 700 360" className="w-full max-h-[340px]" xmlns="http://www.w3.org/2000/svg">
                    <rect width="700" height="360" fill="#080e1e" rx="12" />

                    {/* Elevation Ramp Silhouette */}
                    <polygon points="60,300 250,300 500,120 640,120 640,300" fill="#131d33" stroke="#2563eb" stroke-width="2" />
                    <line x1="60" y1="300" x2="640" y2="300" stroke="#334155" stroke-width="4" />

                    {/* Inclined Surface */}
                    <line x1="250" y1="300" x2="500" y2="120" stroke="#38bdf8" stroke-width="4" />

                    {/* Mandatory STOP Line on Incline */}
                    <line x1="375" y1="210" x2="410" y2="210" stroke="#ffffff" stroke-width="6" />
                    <circle cx="392" cy="210" r="16" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
                    <text x="392" y="214" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">STOP</text>

                    {/* Rollback 15cm Sensor Zone */}
                    <rect x="300" y="235" width="80" height="18" rx="4" fill="#7f1d1d" stroke="#ef4444" stroke-width="1.5" />
                    <text x="340" y="248" fill="#fecaca" font-size="9" font-weight="bold" text-anchor="middle">
                      MAX 15CM ROLLBACK
                    </text>

                    {/* Car Silhouette on Slope */}
                    <g transform="translate(370, 160) rotate(-35)">
                      <rect width="60" height="26" rx="6" fill="#2563eb" stroke="#ffffff" stroke-width="1.5" />
                      <circle cx="12" cy="26" r="6" fill="#0f172a" stroke="#94a3b8" stroke-width="2" />
                      <circle cx="48" cy="26" r="6" fill="#0f172a" stroke="#94a3b8" stroke-width="2" />
                    </g>

                    {/* Forward Drive-off Arrow */}
                    <path d="M 450 155 L 560 100" fill="none" stroke="#22c55e" stroke-width="4" stroke-dasharray="6,4" />
                    <polygon points="570,95 550,96 558,110" fill="#22c55e" />

                    <text x="350" y="335" fill="#94a3b8" font-size="12" text-anchor="middle">
                      1. Stop car at white line → 2. Pull Handbrake → 3. Accelerate on clutch release without rollback
                    </text>
                  </svg>
                )}

                {/* 4. PARALLEL PARKING SVG */}
                {activeLmvTrack === 'parking' && (
                  <svg viewBox="0 0 700 360" className="w-full max-h-[340px]" xmlns="http://www.w3.org/2000/svg">
                    <rect width="700" height="360" fill="#080e1e" rx="12" />

                    {/* Main Roadway */}
                    <rect x="60" y="60" width="580" height="120" fill="#131d33" stroke="#1e293b" />
                    {/* Parking Bay Cutout */}
                    <rect x="220" y="180" width="260" height="110" fill="#0c1529" stroke="#2563eb" stroke-width="2" stroke-dasharray="6,4" />

                    {/* Virtual Sensor Poles at Box Corners */}
                    {[[220, 180], [480, 180], [220, 290], [480, 290]].map(([x, y], idx) => (
                      <g key={idx}>
                        <circle cx={x} cy={y} r="6" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
                        <line x1={x} y1={y} x2={x} y2={y - 12} stroke="#ef4444" stroke-width="2" />
                      </g>
                    ))}

                    {/* S-Reverse Parking Trajectory */}
                    <path d="M 520 120 Q 380 120 350 235" fill="none" stroke="#38bdf8" stroke-width="4.5" stroke-dasharray="6,4" />
                    <polygon points="350,248 343,230 357,230" fill="#38bdf8" />

                    {/* Parked Car Box */}
                    <rect x="300" y="210" width="100" height="50" rx="8" fill="#1d4ed8" stroke="#60a5fa" stroke-width="2" />
                    <text x="350" y="240" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">PARKED</text>

                    <rect x="520" y="90" width="80" height="24" rx="6" fill="#0284c7" />
                    <text x="560" y="106" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">START POINT</text>

                    <text x="350" y="325" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">
                      Box: 5.0m × 2.2m • Max 3 gear shifts (Reverse → Forward → Reverse)
                    </text>
                  </svg>
                )}

              </div>

              {/* LMV Track Tactical Advice Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <p className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-emerald-400" />
                    <span>Seatbelt & Neutral Start</span>
                  </p>
                  <p className="text-slate-400">Put on seatbelt BEFORE starting the engine. Cameras flag unbelted drivers with instant failure.</p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <p className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-emerald-400" />
                    <span>Sensor Pole Safety Margin</span>
                  </p>
                  <p className="text-slate-400">Maintain at least 15 cm distance from corner curbs. Touching curbs triggers ultrasonic buzzers.</p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <p className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-emerald-400" />
                    <span>Clutch Bite Point on Hill</span>
                  </p>
                  <p className="text-slate-400">Find clutch bite point until the bonnet vibrates before releasing the handbrake on the gradient ramp.</p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <p className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-emerald-400" />
                    <span>Indicator Signals</span>
                  </p>
                  <p className="text-slate-400">Always use left indicator when reversing into parallel parking bay and right indicator when pulling out.</p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 3. TWO-WHEELER (MCWG) - THE OFFICIAL SENSOR FIGURE-8 TRACK */}
        {activeCategory === 'twoWheeler' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800 mb-1">
                  Motorcycle Track (MCWG)
                </div>
                <h2 className="text-xl font-bold text-white">
                  {lang === 'en' ? 'The Official Figure "8" Sensor Track' : 'સત્તાવાર "8" આકારનો સેન્સર ટ્રેક'}
                </h2>
              </div>
              <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                Rule: Zero Foot Touchdowns • Lane Width: 1.8 Meters
              </div>
            </div>

            {/* TWO-WHEELER FIGURE-8 VECTOR BLUEPRINT */}
            <div className="relative w-full rounded-2xl bg-slate-950 border border-slate-800/90 p-4 sm:p-6 flex items-center justify-center min-h-[340px]">
              <svg viewBox="0 0 700 360" className="w-full max-h-[340px]" xmlns="http://www.w3.org/2000/svg">
                <rect width="700" height="360" fill="#080e1e" rx="12" />

                {/* Left Outer Ring */}
                <circle cx="250" cy="180" r="120" fill="#131d33" stroke="#2563eb" stroke-width="3" />
                <circle cx="250" cy="180" r="60" fill="#080e1e" stroke="#2563eb" stroke-width="3" />

                {/* Right Outer Ring */}
                <circle cx="450" cy="180" r="120" fill="#131d33" stroke="#2563eb" stroke-width="3" />
                <circle cx="450" cy="180" r="60" fill="#080e1e" stroke="#2563eb" stroke-width="3" />

                {/* Sensor Perimeter Coils (Red Warning Dots) */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
                  const rad = (deg * Math.PI) / 180;
                  const x1 = 250 + 120 * Math.cos(rad);
                  const y1 = 180 + 120 * Math.sin(rad);
                  const x2 = 450 + 120 * Math.cos(rad);
                  const y2 = 180 + 120 * Math.sin(rad);
                  return (
                    <g key={i}>
                      <circle cx={x1} cy={y1} r="4" fill="#ef4444" />
                      <circle cx={x2} cy={y2} r="4" fill="#ef4444" />
                    </g>
                  );
                })}

                {/* Figure-8 Continuous Driving Trajectory (Cyan Loop) */}
                <path 
                  d="M 120 180 A 90 90 0 1 1 340 180 A 90 90 0 1 0 560 180 A 90 90 0 1 0 340 180 A 90 90 0 1 1 120 180" 
                  fill="none" 
                  stroke="#38bdf8" 
                  stroke-width="5" 
                  stroke-linecap="round" 
                  stroke-dasharray="10,6" 
                />

                {/* ENTRY & EXIT RAMPS */}
                <line x1="70" y1="180" x2="160" y2="180" stroke="#22c55e" stroke-width="5" stroke-linecap="round" />
                <polygon points="175,180 155,173 155,187" fill="#22c55e" />
                <rect x="50" y="145" width="80" height="24" rx="6" fill="#15803d" />
                <text x="90" y="161" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">ENTRY</text>

                <line x1="540" y1="180" x2="630" y2="180" stroke="#f59e0b" stroke-width="5" stroke-linecap="round" />
                <polygon points="645,180 625,173 625,187" fill="#f59e0b" />
                <rect x="570" y="145" width="80" height="24" rx="6" fill="#d97706" />
                <text x="610" y="161" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">EXIT</text>

                {/* Overhead Camera Node */}
                <circle cx="350" cy="180" r="16" fill="#1e293b" stroke="#38bdf8" stroke-width="2" />
                <text x="350" y="184" fill="#38bdf8" font-size="9" text-anchor="middle" font-weight="bold">AI SENSOR</text>

                <text x="350" y="335" fill="#facc15" font-size="12" font-weight="bold" text-anchor="middle">
                  Do NOT touch your foot to the ground • Maintain second gear with steady throttle
                </text>
              </svg>
            </div>

            {/* Two-Wheeler Critical Rules */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-400" />
                  <span>Helmet Chin Strap Fastened</span>
                </p>
                <p className="text-slate-400">Wearing a helmet without clicking the chin strap results in instant refusal at the starting line.</p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-400" />
                  <span>Never Put Foot Down</span>
                </p>
                <p className="text-slate-400">Pressure sensor coils under the asphalt detect weight transfer. Even a 1-second foot touch is a disqualification.</p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-400" />
                  <span>Smooth Continuous Arc</span>
                </p>
                <p className="text-slate-400">Do not brake sharply inside the center transition. Maintain gentle, steady acceleration.</p>
              </div>
            </div>
          </div>
        )}

        {/* 4. TOP 5 REASONS PEOPLE FAIL ON AUTOMATED TRACKS */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-950/30 via-slate-900/80 to-slate-900 border border-red-900/40 space-y-5 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
              <ShieldAlert size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {lang === 'en' ? 'Top 5 Reasons People Fail on ADTT Tracks' : 'ADTT ટ્રેક પર નાપાસ થવાના ટોચના 5 કારણો'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'en' ? 'Automated tracks are evaluated by computers, not humans. There is zero room for negotiation.' : 'આ ટ્રેક પર કમ્પ્યુટર દ્વારા ઓટોમેટિક માર્કિંગ થાય છે, જેમાં કોઈ એજન્ટ કામ આવતો નથી.'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { num: 1, title: { en: 'Putting your foot down (Two-Wheeler)', gu: 'પગ નીચે મુકવો (ટુ-વ્હીલર)' }, desc: { en: 'Touching the asphalt at any point inside the Figure-8 track results in immediate automated disqualification.', gu: '8 આકારના ટ્રેક પર એકવાર પણ પગ જમીન પર અડશે તો કમ્પ્યુટર તરત જ ફેઇલ જાહેર કરશે.' } },
              { num: 2, title: { en: 'Rolling back > 15 cm on the Gradient Ramp (Car)', gu: 'ચઢાણ પર ગાડી પાછળ જવી (કાર)' }, desc: { en: 'When restarting on the hill incline, allowing the car to roll backwards more than 6 inches triggers the fault line.', gu: 'ચઢાણ પરથી ગાડી ઉપાડતી વખતે 15 સેમીથી વધુ પાછળ જશે તો સેન્સર પોઈન્ટ કાપી નાખશે.' } },
              { num: 3, title: { en: 'Hitting boundary curb lines or sensor poles', gu: 'બોર્ડર અથવા સેન્સર થાંભલાને અડવું' }, desc: { en: 'Ultrasonic ground sensors detect tire contact with kerbs. Exceeding 2 curb contacts fails the candidate.', gu: 'ટાયર સાઇડના પથ્થર કે સેન્સર લાઇન પર ચડશે તો તરત જ પેનલ્ટી થશે.' } },
              { num: 4, title: { en: 'Forgetting seatbelt or helmet before starting ignition', gu: 'સીટબેલ્ટ કે હેલ્મેટ વગર એન્જિન શરૂ કરવું' }, desc: { en: 'The initial camera scan requires seatbelt clicked in. Starting the motor without it deducts 20 marks instantly.', gu: 'ગાડી શરૂ કરતા પહેલા જ સીટબેલ્ટ પહેરેલો હોવો ફરજિયાત છે.' } },
              { num: 5, title: { en: 'Exceeding the statutory maneuver time limit', gu: 'સમય મર્યાદા પૂરી થઈ જવી' }, desc: { en: 'Each stage has an internal timer (e.g., 180s on the H-track). Stalling or hesitating too long triggers timeout.', gu: 'H-ટ્રેક માટે 180 સેકન્ડનો સમય હોય છે. વધુ પડતી ધીમી ડ્રાઇવિંગ કરવાથી ટાઇમ આઉટ થઈ જશે.' } }
            ].map(item => (
              <div key={item.num} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-lg bg-red-500/20 text-red-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {item.num}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.title[lang] || item.title.en}</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc[lang] || item.desc.en}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. CALL TO ACTION TO FIND TRACK & PRACTICE KIOSK */}
        <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-white">
              {lang === 'en' ? 'Want to locate your city’s ADTT testing center?' : 'તમારા શહેરનો સત્તાવાર RTO ટેસ્ટ ટ્રેક શોધવો છે?'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'en' ? 'Open our Leaflet & OpenStreetMap interactive locator.' : 'ઓપનસ્ટ્રીટમેપ દ્વારા નજીકના આરટીઓ ટ્રેકની માહિતી જુઓ.'}
            </p>
          </div>

          <Link
            to="/test-day#rto-map"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs sm:text-sm transition shadow-lg shadow-blue-600/30 flex items-center gap-2 shrink-0"
          >
            <MapPin size={16} />
            <span>Find Nearest RTO Track</span>
          </Link>
        </div>

      </div>
    </div>
  );
}