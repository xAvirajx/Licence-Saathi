import { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from '../App';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '../data/faq';

export default function ChatHelper() {
  const { lang } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  
  // 1. Fully expanded initial greeting logic
  let initialGreeting = 'Hi! I am Licence Saathi AI. How can I help you today?';
  if (lang === 'hi') {
    initialGreeting = 'नमस्ते! मैं लाइसेंस साथी एआई हूँ। मैं आज आपकी कैसे मदद कर सकता हूँ?';
  } else if (lang === 'gu') {
    initialGreeting = 'નમસ્તે! હું લાઇસન્સ સાથી AI છું. હું તમને કેવી રીતે મદદ કરી શકું?';
  }

  const [messages, setMessages] = useState([
    { type: 'bot', text: initialGreeting }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 2. Input Placeholder logic
  let placeholderText = "Type your question...";
  if (lang === 'hi') {
    placeholderText = "अपना प्रश्न टाइप करें...";
  } else if (lang === 'gu') {
    placeholderText = "તમારો પ્રશ્ન લખો...";
  }

  // 3. Quick Replies Feature
  const quickReplies = {
    en: ["What documents do I need?", "What are the fees?", "Track DL status"],
    hi: ["मुझे किन दस्तावेजों की आवश्यकता है?", "फीस क्या है?", "डीएल स्थिति ट्रैक करें"],
    gu: ["મારે કયા દસ્તાવેજોની જરૂર છે?", "ફી શું છે?", "DL સ્ટેટસ ટ્રેક કરો"]
  };

  const handleQuickReply = (text) => {
    setInput(text);
    // Use a small timeout to let React update the input state before submitting
    setTimeout(() => {
      const submitBtn = document.getElementById('chat-submit-btn');
      if (submitBtn) submitBtn.click();
    }, 50);
  };

  // 4. Handle sending messages
  const handleSend = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) {
      return;
    }

    const userMessage = input.trim();
    
    setMessages((prev) => [
      ...prev, 
      { type: 'user', text: userMessage }
    ]);
    
    setInput('');
    setIsLoading(true);

    try {
      // Attempt to hit the backend API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage, 
          history: messages,
          lang: lang,
          stage: localStorage.getItem('licenceJourneyStage') || '1'
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      setMessages((prev) => [
        ...prev, 
        { type: 'bot', text: data.reply }
      ]);

    } catch (error) {
      console.warn("API call failed, falling back to offline keyword matcher:", error);
      
      // Offline Fallback logic
      const lowerInput = userMessage.toLowerCase();
      let foundAnswer = null;
      
      for (const faq of faqs) {
        const hasKeyword = faq.keywords.some((kw) => lowerInput.includes(kw));
        
        if (hasKeyword) {
          if (lang === 'hi' && faq.a.hi) {
            foundAnswer = faq.a.hi;
          } else if (lang === 'gu' && faq.a.gu) {
            foundAnswer = faq.a.gu;
          } else {
            foundAnswer = faq.a.en;
          }
          break;
        }
      }
      
      let fallbackReply = foundAnswer;
      
      // Default offline message if no keyword matches
      if (!fallbackReply) {
        if (lang === 'hi') {
          fallbackReply = 'मैं अभी ऑफ़लाइन हूँ, लेकिन आप अधिक जानकारी के लिए parivahan.gov.in या अपने स्थानीय आरटीओ की जांच कर सकते हैं।';
        } else if (lang === 'gu') {
          fallbackReply = 'હું હાલમાં ઓફલાઇન છું, પરંતુ વધુ વિગતો માટે તમે parivahan.gov.in અથવા તમારા સ્થાનિક RTO નો સંપર્ક કરી શકો છો.';
        } else {
          fallbackReply = 'I am currently offline, but you can check parivahan.gov.in or your local RTO for more details.';
        }
      }

      setMessages((prev) => [
        ...prev, 
        { type: 'bot', text: fallbackReply }
      ]);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* LIGHTHOUSE FIX: Added aria-label="Open AI Chat" */}
      <button 
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Chat"
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-500 transition-all ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <MessageCircle size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-[380px] h-[500px] max-h-[70vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            
            {/* Chat Header */}
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <h3 className="font-bold text-white">Licence Saathi AI</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-slate-400 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat History Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
              {messages.map((msg, idx) => {
                const isUser = msg.type === 'user';
                return (
                  <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                        isUser 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              
              {/* Loading Indicator Animation */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-none p-3 flex gap-1">
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
              
              {/* Invisible div to scroll to */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies Buttons */}
            <div className="px-3 pb-3 bg-slate-950 flex gap-2 overflow-x-auto no-scrollbar pt-3">
              {quickReplies[lang].map((reply, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleQuickReply(reply)}
                  className="whitespace-nowrap px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full text-xs font-medium border border-slate-700 transition"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Chat Input Form */}
            <form 
              onSubmit={handleSend} 
              className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2"
            >
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholderText}
                className="flex-1 bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
              <button 
                id="chat-submit-btn" 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 transition"
              >
                <Send size={18} />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}