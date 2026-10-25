import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { Monitor, Clock, CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertCircle, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import RtoMap from '../components/RtoMap';

export default function TestDay() {
  const { lang } = useContext(AppContext);
  const [currentStep, setCurrentStep] = useState('instructions'); // 'instructions' | 'kiosk' | 'result'
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  // 3 high-probability questions formatted for the official RTO kiosk layout
  const kioskQuestions = [
    {
      id: 1,
      question: {
        en: "Near a pedestrian crossing, when people are waiting to cross the road, you should:",
        hi: "पैदल यात्री पार पथ के निकट, जब लोग सड़क पार करने की प्रतीक्षा कर रहे हों, तो आपको:",
        gu: "જ્યારે લોકો પેડેસ્ટ્રિયન ક્રોસિંગ પર રસ્તો ઓળંગવાની રાહ જોઈ રહ્યા હોય, ત્યારે તમારે:"
      },
      options: {
        en: [
          "Sound horn and proceed at normal speed",
          "Slow down, sound horn and pass",
          "Stop the vehicle, wait until pedestrians cross, then proceed",
          "Speed up to pass before they cross"
        ],
        hi: [
          "हॉर्न बजाएं और सामान्य गति से आगे बढ़ें",
          "गति धीमी करें, हॉर्न बजाएं और आगे निकलें",
          "वाहन रोकें, पदयात्रियों के पार होने तक प्रतीक्षा करें, फिर आगे बढ़ें",
          "उनके पार करने से पहले तेजी से निकल जाएं"
        ],
        gu: [
          "હોર્ન વગાડીને સામાન્ય ઝડપે આગળ વધવું",
          "ઝડપ ધીમી કરી, હોર્ન વગાડીને પસાર થવું",
          "વાહન થોભાવી, પદયાત્રીઓ રસ્તો ઓળંગી લે ત્યાં સુધી રાહ જોઈને આગળ વધવું",
          "તેઓ રસ્તો ઓળંગે તે પહેલાં ઝડપ વધારવી"
        ]
      },
      correct: 2
    },
    {
      id: 2,
      question: {
        en: "On a road without a footpath, pedestrians should walk:",
        hi: "फुटपाथ रहित सड़क पर, पैदल यात्रियों को चलना चाहिए:",
        gu: "ફૂટપાથ વગરના રસ્તા પર પદયાત્રીઓએ કઈ બાજુ ચાલવું જોઈએ:"
      },
      options: {
        en: [
          "On the right side of the road facing oncoming traffic",
          "On the left side of the road along with traffic",
          "On whichever side has fewer vehicles",
          "In the middle of the roadway"
        ],
        hi: [
          "आने वाले यातायात के सामने सड़क की दाईं ओर",
          "यातायात के साथ सड़क की बाईं ओर",
          "जिस तरफ कम वाहन हों उस तरफ",
          "सड़क के बिल्कुल बीच में"
        ],
        gu: [
          "સામેથી આવતા ટ્રાફિકની સામે રસ્તાની જમણી બાજુ",
          "ટ્રાફિકની સાથે રસ્તાની ડાબી બાજુ",
          "જે બાજુ ઓછા વાહનો હોય તે બાજુ",
          "રસ્તાની બરાબર વચ્ચે"
        ]
      },
      correct: 0
    },
    {
      id: 3,
      question: {
        en: "Free passage must be mandatorily given to which of the following vehicles?",
        hi: "निम्नलिखित में से किन वाहनों को अनिवार्य रूप से रास्ता दिया जाना चाहिए?",
        gu: "નીચેનામાંથી કયા વાહનોને ફરજિયાતપણે રસ્તો આપવો જોઈએ?"
      },
      options: {
        en: [
          "Express buses and heavy trucks",
          "Ambulance and fire service vehicles",
          "VIP motorcades with green flags",
          "Vehicles carrying government officers"
        ],
        hi: [
          "एक्सप्रेस बसें और भारी ट्रक",
          "एम्बुलेंस और अग्निशमन सेवा वाहन",
          "हरे झंडे वाले वीआईपी काफिले",
          "सरकारी अधिकारियों को ले जाने वाले वाहन"
        ],
        gu: [
          "એક્સપ્રેસ બસો અને મોટા ટ્રક",
          "એમ્બ્યુલન્સ અને ફાયર બ્રિગેડ વાહનો",
          "લીલા ઝંડાવાળા વીઆઈપી કાફલા",
          "સરકારી અધિકારીઓને લઈ જતા વાહનો"
        ]
      },
      correct: 1
    }
  ];

  // Kiosk countdown timer
  useEffect(() => {
    let timer;
    if (currentStep === 'kiosk' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (currentStep === 'kiosk' && timeLeft === 0) {
      handleConfirmAnswer();
    }
    return () => clearInterval(timer);
  }, [currentStep, timeLeft]);

  const handleStartExam = () => {
    setCurrentStep('kiosk');
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setUserScore(0);
    setTimeLeft(30);
  };

  const handleConfirmAnswer = () => {
    let isCorrect = selectedAnswer === kioskQuestions[currentQIndex].correct;
    let nextScore = isCorrect ? userScore + 1 : userScore;

    if (currentQIndex + 1 < kioskQuestions.length) {
      setUserScore(nextScore);
      setCurrentQIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setUserScore(nextScore);
      setCurrentStep('result');
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 flex flex-col font-sans">
      <div className="max-w-4xl mx-auto w-full">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full inline-block mb-2">
              {lang === 'en' ? 'RTO Kiosk Simulator' : lang === 'hi' ? 'आरटीओ कियोस्क सिमुलेटर' : 'આરટીઓ કિયોસ્ક સિમ્યુલેટર'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lang === 'en' ? 'Test Day Environment' : lang === 'hi' ? 'परीक्षा दिवस वातावरण' : 'પરીક્ષા દિવસનું વાતાવરણ'}
            </h1>
          </div>
          <Link
            to="/learn"
            className="text-xs sm:text-sm font-semibold bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 px-4 py-2 rounded-xl transition"
          >
            {lang === 'en' ? 'Exit Simulator' : lang === 'hi' ? 'बाहर निकलें' : 'બહાર નીકળો'}
          </Link>
        </div>

        {/* 1. INSTRUCTIONS SCREEN */}
        {currentStep === 'instructions' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center shrink-0">
                <Monitor size={28} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {lang === 'en' ? 'Real Kiosk Layout Simulation' : lang === 'hi' ? 'वास्तविक कियोस्क लेआउट का अनुभव' : 'અસલી કિયોસ્ક લેઆઉટનો અનુભવ'}
                </h2>
                <p className="text-sm text-slate-400">
                  {lang === 'en' ? 'Practice on the interface used at official RTO test centers.' : lang === 'hi' ? 'आरटीओ परीक्षा केंद्रों पर उपयोग किए जाने वाले इंटरफ़ेस पर अभ्यास करें।' : 'સત્તાવાર આરટીઓ કેન્દ્રો પર વપરાતા ઇન્ટરફેસ પર પ્રેક્ટિસ કરો.'}
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-8 text-sm text-slate-300">
              <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-start gap-3">
                <Clock className="text-amber-400 shrink-0 mt-0.5" size={20} />
                <p>
                  {lang === 'en' ? 'You have 30 seconds per question. Unanswered questions count as incorrect.' : lang === 'hi' ? 'प्रत्येक प्रश्न के लिए 30 सेकंड का समय मिलेगा। अनुत्तरित प्रश्न को गलत माना जाएगा।' : 'દરેક પ્રશ્ન માટે 30 સેકન્ડનો સમય મળશે. જવાબ ન આપેલ પ્રશ્ન ખોટો ગણાશે.'}
                </p>
              </div>
              <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="text-blue-400 shrink-0 mt-0.5" size={20} />
                <p>
                  {lang === 'en' ? 'Select an answer using the numbered keys, then press the green Confirm button.' : lang === 'hi' ? 'संख्या कुंजियों से उत्तर चुनें, फिर हरे "पुष्टि करें" बटन को दबाएं।' : 'નંબર બટનથી જવાબ પસંદ કરો, પછી લીલા "પુષ્ટિ કરો" બટન પર ક્લિક કરો.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleStartExam}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40"
            >
              {lang === 'en' ? 'Start 3-Question Kiosk Drill' : lang === 'hi' ? '3-प्रश्नों का कियोस्क अभ्यास शुरू करें' : '3-પ્રશ્નોનું કિયોસ્ક ટેસ્ટ શરૂ કરો'}
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* 2. THE REAL RTO KIOSK UI */}
        {currentStep === 'kiosk' && (
          <div className="bg-slate-100 text-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700">
            {/* KIOSK TOP BLUE STATUS BAR */}
            <div className="bg-[#0f2d59] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center font-bold text-xs uppercase text-slate-300">
                  RTO
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-300">SARATHI LL TEST PORTAL</p>
                  <p className="text-sm font-bold tracking-wide">STALL KIOSK #04</p>
                </div>
              </div>

              {/* Timer Bar */}
              <div className="flex items-center gap-3 bg-[#0a1e3b] px-4 py-2 rounded-xl border border-blue-900/60">
                <Clock size={18} className="text-amber-400 animate-pulse" />
                <span className="font-mono text-lg font-bold text-amber-400">{timeLeft}s</span>
              </div>
            </div>

            {/* KIOSK MAIN CONTENT */}
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center text-xs font-bold text-slate-600 uppercase border-b border-slate-300 pb-3 mb-6">
                <span>QUESTION {currentQIndex + 1} OF {kioskQuestions.length}</span>
                <span>LANGUAGE: {lang === 'gu' ? 'GUJARATI' : lang === 'hi' ? 'HINDI' : 'ENGLISH'}</span>
              </div>

              {/* Question Text */}
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 leading-snug">
                {kioskQuestions[currentQIndex].question[lang] || kioskQuestions[currentQIndex].question.en}
              </h2>

              {/* Answer Choices in Kiosk Format */}
              <div className="space-y-3 mb-8">
                {(kioskQuestions[currentQIndex].options[lang] || kioskQuestions[currentQIndex].options.en).map((opt, idx) => {
                  const isSelected = selectedAnswer === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedAnswer(idx)}
                      className={`w-full text-left p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                        isSelected
                          ? 'border-blue-700 bg-blue-50 text-blue-950 font-bold shadow-md'
                          : 'border-slate-300 bg-white hover:border-slate-400 text-slate-800'
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                        isSelected ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="text-sm sm:text-base leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Kiosk Controls */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={handleConfirmAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-[#15803d] hover:bg-[#166534] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-8 py-3.5 rounded-xl transition flex items-center gap-2 shadow-md uppercase tracking-wider text-sm"
                >
                  {lang === 'en' ? 'Confirm Answer' : lang === 'hi' ? 'उत्तर की पुष्टि करें' : 'જવાબની પુષ્ટિ કરો'}
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. RESULT SCREEN */}
        {currentStep === 'result' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-10 text-center shadow-2xl">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${
              userScore >= 2 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {userScore >= 2 ? <CheckCircle2 size={44} /> : <XCircle size={44} />}
            </div>

            <h2 className="text-3xl font-extrabold text-white mb-2">
              {userScore >= 2
                ? (lang === 'en' ? 'Kiosk Drill Completed!' : lang === 'hi' ? 'कियोस्क अभ्यास पूरा हुआ!' : 'કિયોસ્ક ડ્રિલ પૂર્ણ થઈ!')
                : (lang === 'en' ? 'Needs More Practice' : lang === 'hi' ? 'अधिक अभ्यास की आवश्यकता है' : 'વધુ પ્રેક્ટિસની જરૂર છે')}
            </h2>

            <p className="text-slate-300 mb-6 text-lg">
              {lang === 'en'
                ? `You scored ${userScore} out of ${kioskQuestions.length} under strict kiosk timing.`
                : lang === 'hi'
                ? `आपने सख्त कियोस्क समय सीमा में ${kioskQuestions.length} में से ${userScore} अंक प्राप्त किए।`
                : `તમે કિયોસ્ક સમય મર્યાદા હેઠળ ${kioskQuestions.length} માંથી ${userScore} ગુણ મેળવ્યા.`}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleStartExam}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3.5 rounded-xl transition flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} />
                {lang === 'en' ? 'Retry Drill' : lang === 'hi' ? 'पुनः प्रयास करें' : 'ફરીથી પ્રયાસ કરો'}
              </button>
              <Link
                to="/mock-test"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40"
              >
                {lang === 'en' ? 'Full 15-Q Mock Test' : lang === 'hi' ? 'पूर्ण 15-प्रश्नों का मॉक टेस्ट' : 'સંપૂર્ણ 15-પ્રશ્નોનો મોક ટેસ્ટ'}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}