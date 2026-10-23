import { useContext } from 'react';
import { AppContext } from '../App';
import { ShieldCheck, Car, Activity, Map, AlertOctagon, CheckCircle2, ChevronRight, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DrivingTest() {
  const { lang } = useContext(AppContext);

  const failReasons = [
    { 
      title: { en: "Putting your foot down (2-Wheeler)", hi: "पैर नीचे रखना (2-पहिया)" },
      desc: { en: "Touching your feet to the ground while navigating the Figure-8 track is an instant fail.", hi: "फिगर-8 ट्रैक को नेविगेट करते समय अपने पैरों को जमीन पर छूना तुरंत फेल होना है।" }
    },
    { 
      title: { en: "Stalling the engine (Car)", hi: "इंजन बंद होना (कार)" },
      desc: { en: "Letting the car stall, especially on an incline (gradient test), leads to heavy point deduction.", hi: "कार को बंद होने देना, विशेष रूप से चढ़ाई (ग्रेडिएंट टेस्ट) पर, भारी पॉइंट कटौती की ओर जाता है।" }
    },
    { 
      title: { en: "Rolling backward on an incline", hi: "चढ़ाई पर पीछे की ओर लुढ़कना" },
      desc: { en: "If the vehicle rolls back even an inch during the gradient test, it is a fail. Use the handbrake.", hi: "यदि वाहन ग्रेडिएंट टेस्ट के दौरान एक इंच भी पीछे लुढ़कता है, तो यह फेल है। हैंडब्रेक का प्रयोग करें।" }
    },
    { 
      title: { en: "Forgetting to use indicators", hi: "संकेतकों का उपयोग करना भूल जाना" },
      desc: { en: "Not using turn signals before entering a turn or changing lanes during the test.", hi: "टेस्ट के दौरान मोड़ में प्रवेश करने या लेन बदलने से पहले टर्न सिग्नल का उपयोग न करना।" }
    },
    { 
      title: { en: "Touching the borders/cones", hi: "सीमाओं/शंकुओं को छूना" },
      desc: { en: "The automated tracks have sensors. Touching the yellow lines or knocking a cone fails the test.", hi: "स्वचालित पटरियों में सेंसर होते हैं। पीली रेखाओं को छूना या शंकु को गिराना टेस्ट को फेल कर देता है।" }
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 py-12 px-6 flex flex-col font-sans overflow-hidden">
      {/* Mesh Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl mb-6 shadow-lg">
            <Map className="text-blue-400" size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {lang === 'en' ? 'The Driving Test' : 'ड्राइविंग टेस्ट'}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {lang === 'en' ? 'Understand the tracks, know what the RTO inspectors look for, and avoid the most common mistakes.' : 'पटरियों को समझें, जानें कि आरटीओ निरीक्षक क्या देखते हैं, और सबसे आम गलतियों से बचें।'}
          </p>
        </div>

        {/* The Tracks Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Two Wheeler Card */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="text-emerald-400" size={28} />
              <h2 className="text-2xl font-bold text-white">{lang === 'en' ? 'Two-Wheeler Test' : 'दोपहिया वाहन टेस्ट'}</h2>
            </div>
            
            <div className="w-full aspect-video bg-slate-950 rounded-2xl border border-slate-700 flex items-center justify-center mb-6 relative overflow-hidden">
              <div className="text-6xl font-bold text-slate-800 opacity-50 absolute">8</div>
              <div className="z-10 text-sm text-emerald-400 font-bold tracking-widest uppercase border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-full">
                {lang === 'en' ? 'The Figure-8 Track' : 'फिगर-8 ट्रैक'}
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-slate-300">
                  {lang === 'en' ? 'You must ride the motorcycle/scooter inside a painted Figure-8 track without touching the borders.' : 'आपको मोटरसाइकिल/स्कूटर को एक पेंट किए गए फिगर-8 ट्रैक के अंदर चलाना होगा बिना सीमाओं को छुए।'}
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-slate-300">
                  {lang === 'en' ? 'You must not put your feet down at any point during the maneuver.' : 'इस दौरान आपको किसी भी समय अपने पैर नीचे नहीं रखने चाहिए।'}
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-slate-300">
                  {lang === 'en' ? 'Helmets are strictly mandatory. Fasten the chin strap.' : 'हेलमेट पूरी तरह से अनिवार्य है। चिन स्ट्रैप को बांधें।'}
                </p>
              </li>
            </ul>
          </div>

          {/* Car Card */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Car className="text-blue-400" size={28} />
              <h2 className="text-2xl font-bold text-white">{lang === 'en' ? 'Car Test (LMV)' : 'कार टेस्ट (LMV)'}</h2>
            </div>
            
            <div className="w-full aspect-video bg-slate-950 rounded-2xl border border-slate-700 flex items-center justify-center mb-6 relative overflow-hidden flex-col gap-2">
              <div className="text-4xl font-bold text-slate-800 opacity-50 absolute">H / S</div>
              <div className="z-10 text-sm text-blue-400 font-bold tracking-widest uppercase border border-blue-500/30 bg-blue-500/10 px-3 py-1 rounded-full">
                {lang === 'en' ? 'The H-Track & Reverse S' : 'H-ट्रैक और रिवर्स S'}
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-slate-300">
                  {lang === 'en' ? 'You will navigate an H-shaped track, requiring forward and reverse driving.' : 'आप एक H-आकार के ट्रैक को नेविगेट करेंगे, जिसमें आगे और पीछे की ओर ड्राइविंग की आवश्यकता होती है।'}
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-slate-300">
                  {lang === 'en' ? 'Gradient Test: Stop the car on a slope and drive forward without rolling backwards.' : 'ग्रेडिएंट टेस्ट: ढलान पर कार को रोकें और पीछे लुढ़के बिना आगे बढ़ें।'}
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-slate-300">
                  {lang === 'en' ? 'Fasten your seatbelt before turning the ignition on.' : 'इग्निशन चालू करने से पहले अपनी सीटबेल्ट बांध लें।'}
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Top 5 Fail Reasons */}
        <div className="bg-red-950/20 border border-red-900/50 rounded-3xl p-8 shadow-xl mb-12">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-red-900/50">
            <AlertOctagon className="text-red-500" size={32} />
            <h2 className="text-2xl font-bold text-white">
              {lang === 'en' ? 'Top 5 Reasons People Fail' : 'लोगों के फेल होने के शीर्ष 5 कारण'}
            </h2>
          </div>
          
          <div className="space-y-6">
            {failReasons.map((reason, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-red-400 font-bold text-sm">{idx + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-200 mb-1">{reason.title[lang]}</h3>
                  <p className="text-sm text-red-200/60 leading-relaxed">{reason.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link 
            to="/track-app" 
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          >
            {lang === 'en' ? 'Next: Track Your Application' : 'अगला: अपने आवेदन को ट्रैक करें'} <ChevronRight size={20} />
          </Link>
        </div>

      </div>
    </div>
  );
}