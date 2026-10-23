import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share2, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Documents() {
  const [checkedItems, setCheckedItems] = useState({});

  const docs = [
    { id: 'age', title: 'Proof of Age', desc: 'Birth certificate, 10th marksheet, or PAN card' },
    { id: 'address', title: 'Proof of Address', desc: 'Voter ID, Passport, or recent electricity bill' },
    { id: 'photo', title: 'Passport Photo', desc: 'Recent colour photograph' },
    { id: 'fitness', title: 'Form 1 (Self Declaration)', desc: 'Basic physical fitness declaration form' }
  ];

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent("Here are the documents I need for my Learner's Licence:\n\n- Proof of Age\n- Proof of Address\n- Passport Photo\n- Form 1 (Self Declaration)");
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 mt-2">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 text-brand-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Required Documents</h1>
      </div>

      <div className="bg-brand-50 border border-brand-200 p-4 rounded-xl mb-6">
        <p className="text-brand-800 font-medium text-sm">
          <strong>Tip:</strong> People often get stuck here. Make sure your name is spelled exactly the same across all documents before you apply!
        </p>
      </div>

      <div className="space-y-3">
        {docs.map((doc) => (
          <div 
            key={doc.id} 
            onClick={() => toggleCheck(doc.id)}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex gap-4 ${checkedItems[doc.id] ? 'bg-green-50 border-green-500' : 'bg-white border-gray-200 hover:border-brand-300'}`}
          >
            <div className={`w-6 h-6 shrink-0 rounded flex items-center justify-center border-2 mt-0.5 ${checkedItems[doc.id] ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
              {checkedItems[doc.id] && <Check size={16} strokeWidth={3} />}
            </div>
            <div>
              <h3 className={`font-bold ${checkedItems[doc.id] ? 'text-green-900' : 'text-gray-900'}`}>{doc.title}</h3>
              <p className={`text-sm mt-1 ${checkedItems[doc.id] ? 'text-green-700' : 'text-gray-500'}`}>{doc.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={shareOnWhatsApp}
        className="w-full mt-6 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold py-4 rounded-xl shadow-sm transition-colors text-lg flex items-center justify-center gap-2"
      >
        <Share2 size={20} />
        Share List on WhatsApp
      </button>

      <Link to="/application" className="w-full mt-3 bg-white border-2 border-brand-600 text-brand-600 hover:bg-brand-50 font-bold py-4 rounded-xl shadow-sm transition-colors text-lg flex items-center justify-center">
        Continue to Application
      </Link>
    </motion.div>
  );
}