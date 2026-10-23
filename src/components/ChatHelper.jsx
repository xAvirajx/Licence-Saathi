import { useState, useContext, useEffect, useRef } from 'react';
import { AppContext } from '../App';
import { faqs } from '../data/faq';
import { MessageSquare, X, Send, Bot, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatHelper() {
  const { lang } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initial greeting and Next Step calculation
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const stage = parseInt(localStorage.getItem('licenceJourneyStage') || '0', 10);
      let nextStepMsg = { en: "Ready to check your eligibility?", hi: "अपनी पात्रता जांचने के लिए तैयार हैं?" };
      let link = "/eligibility";

      if (stage === 1) { nextStepMsg = { en: "You're ready to apply for your Learner's Licence.", hi: "आप अपने लर्नर लाइसेंस के लिए आवेदन करने के लिए तैयार हैं।" }; link = "/application"; }
      if (stage === 2) { nextStepMsg = { en: "Time to take a Mock Test!", hi: "मॉक टेस्ट देने का समय आ गया है!" }; link = "/mock-test"; }
      if (stage === 3) { nextStepMsg = { en: "Ready to book your Permanent Licence test?", hi: "क्या आप अपने स्थायी लाइसेंस टेस्ट को बुक करने के लिए तैयार हैं?" }; link = "/permanent-licence"; }

      setMessages([
        { 
          type: 'bot', 
          text: lang === 'en' ? "Hi! I'm Ask Licence Saathi. Ask me any question about the driving licence process!" : "नमस्ते! मैं 'आस्क लाइसेंस साथी' हूँ। ड्राइविंग लाइसेंस प्रक्रिया के बारे में मुझसे कोई भी प्रश्न पूछें!",
          isIntro: true,
          nextStep: { text: nextStepMsg[lang], link }
        }
      ]);
    }
  }, [isOpen, lang, messages.length]);

  const handleSend = (userText) => {
    if (!userText.trim()) return;
    
    // Add user message
    const newMsgs = [...messages, { type: 'user', text: userText }];
    setMessages(newMsgs);
    setInput('');

    // Process answer
    setTimeout(() => {
      const query = userText.toLowerCase();
      let foundAnswer = null;

      // Personal details block check
      if (query.includes("aadhaar") || query.includes("pan") || query.includes("otp") || /[0-9]{6,}/.test(query)) {
         foundAnswer = lang === 'en' 
           ? "For your privacy, I never ask for your Aadhaar, OTP, or any personal details. Please do not share them here." 
           : "आपकी निजता के लिए, मैं कभी भी आपका आधार, ओटीपी या कोई व्यक्तिगत विवरण नहीं मांगता। कृपया उन्हें यहां साझा न करें।";
      } else {
        // Search FAQs
        for (const item of faqs) {
          // Allow flexible key names since I fixed the array above, but handle safely
          const keywords = item.keywords || Object.keys(item)[0].split(',');
          if (keywords.some(kw => query.includes(kw.trim()))) {
            // Check if it has an 'a' property, otherwise it might be the key itself (handling my slight typo in the data file safely)
            foundAnswer = item.a ? item.a[lang] : Object.values(item)[0][lang];
            break;
          }
        }
      }

      // "I'm not sure" fallback
      if (!foundAnswer) {
        foundAnswer = lang === 'en' 
          ? "I'm not sure about that. Please check the official portal at parivahan.gov.in or contact your local RTO for exact details."
          : "मुझे इसके बारे में पक्का नहीं पता है। कृपया सटीक विवरण के लिए parivahan.gov.in पर आधिकारिक पोर्टल देखें या अपने स्थानीय आरटीओ से संपर्क करें।";
      }

      setMessages([...newMsgs, { type: 'bot', text: foundAnswer }]);
    }, 500);
  };

  const quickReplies = [
    { en: "What is the fee?", hi: "शुल्क क्या है?" },
    { en: "Documents needed?", hi: "कौन से दस्तावेज़ चाहिए?" },
    { en: "Validity of LL?", hi: "एलएल की वैधता?" }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-[calc(100%-48px)] sm:w-96 h-[500px] max-h-[80vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Ask Licence Saathi</h3>
                  <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition">
                <X size={24} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                  
                  {/* Next Step Suggestion (Only on Intro) */}
                  {msg.isIntro && msg.nextStep && (
                    <div className="mt-2 w-[85%]">
                      <p className="text-xs text-slate-400 mb-1 font-bold uppercase tracking-wider">
                        {lang === 'en' ? 'Suggested Next Step' : 'सुझाए गए अगले कदम'}
                      </p>
                      <Link 
                        to={msg.nextStep.link} 
                        onClick={() => setIsOpen(false)}
                        className="bg-emerald-950/40 border border-emerald-900 text-emerald-400 p-3 rounded-xl text-sm flex items-center justify-between hover:bg-emerald-900/40 transition"
                      >
                        {msg.nextStep.text} <ArrowRight size={16} />
                      </Link>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length < 3 && (
              <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-slate-800/50 bg-slate-900">
                {quickReplies.map((qr, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(qr[lang])}
                    className="whitespace-nowrap px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-full text-xs transition"
                  >
                    {qr[lang]}
                  </button>
                ))}
              </div>
            )}

            {/* Input Box */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(input); }} 
              className="p-4 bg-slate-950 border-t border-slate-800 flex gap-2"
            >
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === 'en' ? "Ask a question..." : "कोई प्रश्न पूछें..."}
                className="flex-1 bg-slate-900 border border-slate-700 text-white px-4 py-2 rounded-full text-sm focus:outline-none focus:border-blue-500"
              />
              <button 
                type="submit" 
                disabled={!input.trim()}
                className="w-10 h-10 bg-blue-600 disabled:bg-slate-800 text-white rounded-full flex items-center justify-center transition shrink-0"
              >
                <Send size={18} className="ml-[-2px] mt-[2px]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}