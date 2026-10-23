import { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from '../App';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Groq from 'groq-sdk';
import { faqData } from '../data/faq';
import { rulesConfig } from '../data/config';

// 🚨 Paste your actual key inside these quotes if your .env file isn't working!
const MY_GROQ_KEY = "PASTE_YOUR_ACTUAL_API_KEY_HERE";

const groq = new Groq({ 
    apiKey: import.meta.env.VITE_GROQ_API_KEY, 
    dangerouslyAllowBrowser: true 
});

export default function ChatHelper() {
  const { t, lang } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: lang === 'en' ? "Hi! I'm Licence Saathi. How can I help you get your driving licence?" : "नमस्ते! मैं लाइसेंस साथी हूँ। मैं आपके ड्राइविंग लाइसेंस बनवाने में कैसे मदद कर सकता हूँ?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      if (!groq.apiKey || groq.apiKey === "PASTE_YOUR_ACTUAL_API_KEY_HERE") {
         throw new Error("No API Key Provided!");
      }

      // Call Groq API using the ultra-stable Mixtral model
      const completion = await groq.chat.completions.create({
        messages: [
          { 
            role: "system", 
            content: `You are 'Licence Saathi', a helpful assistant helping people in India get a driving licence. 
            Reply in the language the user writes in (${lang === 'en' ? 'English' : 'Hindi'}). 
            Use short sentences a Class 8 student would understand.
            Here are the rules you know:
            - Minimum age: ${rulesConfig.minimumAge.gearless.age} for gearless, ${rulesConfig.minimumAge.gearedOrCar.age} for car/geared.
            - Fees: LL is ₹${rulesConfig.fees.learnersLicence}, Test is ₹${rulesConfig.fees.learnersTest}.
            - LL is valid for ${rulesConfig.timelines.llValidityMonths} months.
            - You can apply for a DL ${rulesConfig.timelines.dlApplicationWaitDays} days after getting an LL.
            If you are not sure, point them to parivahan.gov.in. 
            NEVER ask for an Aadhaar number, phone number, or personal details.` 
          },
          ...messages.slice(-4), // Send recent context
          { role: "user", content: userMessage }
        ],
        // 👇 FIXED: Using Mixtral to avoid "Model Decommissioned" or "Not Found" 404 errors
        model: "mixtral-8x7b-32768", 
      });

      const reply = completion.choices[0]?.message?.content || "Sorry, I am confused.";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);

    } catch (error) {
      console.error("🚨 AI CRASHED:", error.message);
      
      // OFFLINE FALLBACK MODE (If Groq API fails)
      let fallbackReply = lang === 'en' ? "I'm not sure. Please check parivahan.gov.in or contact your local RTO." : "मुझे यकीन नहीं है। कृपया parivahan.gov.in देखें या अपने स्थानीय आरटीओ से संपर्क करें।";
      
      const lowerInput = userMessage.toLowerCase();
      
      if (lowerInput.includes("name") || lowerInput.includes("who are you") || lowerInput.includes("what do u do")) {
        fallbackReply = lang === 'en' ? "I am Licence Saathi, your driving licence assistant! Ask me about rules, fees, or how to apply." : "मैं लाइसेंस साथी हूँ, आपका ड्राइविंग लाइसेंस सहायक! मुझसे नियमों, शुल्क या आवेदन करने के तरीके के बारे में पूछें।";
      } else {
        const foundFaq = faqData.find(faq => faq.keywords.some(kw => lowerInput.includes(kw)));
        if (foundFaq) fallbackReply = foundFaq.answer[lang];
      }

      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: fallbackReply }]);
        setIsLoading(false);
      }, 600);
      return; 
    }

    setIsLoading(false);
  };

  const quickReplies = lang === 'en' 
    ? ["What is the fee?", "How to apply?", "Required age?"]
    : ["शुल्क क्या है?", "आवेदन कैसे करें?", "आवश्यक आयु?"];

  return (
    <>
      {/* Floating Chat Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform hover:scale-105 z-40 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 right-4 w-[calc(100%-32px)] sm:w-[380px] h-[500px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-zinc-200 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2 font-bold">
                <Bot size={20} /> Ask Licence Saathi
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1.5 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <Bot size={16}/>
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm shadow-md' : 'bg-white border border-zinc-200 text-zinc-800 rounded-bl-sm shadow-sm'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Bot size={16}/>
                  </div>
                  <div className="p-3 bg-white border border-zinc-200 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-blue-600" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length < 3 && !isLoading && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto whitespace-nowrap bg-zinc-50">
                {quickReplies.map((qr, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setInput(qr)}
                    className="px-4 py-2 bg-white border border-blue-200 text-blue-600 text-xs font-semibold rounded-full hover:bg-blue-50 shadow-sm shrink-0 transition-colors"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-zinc-200 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === 'en' ? "Ask a question..." : "एक सवाल पूछें..."}
                className="flex-1 p-3 bg-zinc-100 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-md"
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