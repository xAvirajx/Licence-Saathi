export const questionsData = [
  {
    id: 1,
    question: { 
      en: "What should you do when approaching an amber traffic light?", 
      hi: "पीली (एम्बर) ट्रैफिक लाइट के पास पहुँचने पर आपको क्या करना चाहिए?" 
    },
    options: {
      en: ["Speed up to cross quickly", "Stop if safe to do so", "Honk and proceed", "Ignore it"],
      hi: ["जल्दी पार करने के लिए गति बढ़ाएँ", "यदि सुरक्षित हो तो रुकें", "हॉर्न बजाएं और आगे बढ़ें", "इसे अनदेखा करें"]
    },
    correctIndex: 1,
    explanation: { 
      en: "An amber light means you must stop unless it is unsafe to do so.", 
      hi: "पीली लाइट का अर्थ है कि आपको रुकना चाहिए, जब तक कि ऐसा करना असुरक्षित न हो।" 
    }
  },
  {
    id: 2,
    question: { 
      en: "When an ambulance is approaching with flashing lights, you must:", 
      hi: "जब कोई एम्बुलेंस फ्लैशिंग लाइट के साथ आ रही हो, तो आपको:" 
    },
    options: {
      en: ["Drive faster", "Move to the left and allow free passage", "Move to the right", "Stop immediately wherever you are"],
      hi: ["तेज चलाएं", "बाईं ओर जाएँ और रास्ता दें", "दाईं ओर जाएँ", "आप जहाँ हैं वहीं तुरंत रुक जाएँ"]
    },
    correctIndex: 1,
    explanation: { 
      en: "You must give way to emergency vehicles by moving to the left.", 
      hi: "आपको बाईं ओर जाकर आपातकालीन वाहनों को रास्ता देना चाहिए।" 
    }
  },
  {
    id: 3,
    question: { 
      en: "Overtaking is prohibited in which of these situations?", 
      hi: "इनमें से किस स्थिति में ओवरटेकिंग निषिद्ध है?" 
    },
    options: {
      en: ["On a one-way street", "On a straight road", "On a bridge or blind curve", "During daytime"],
      hi: ["वन-वे सड़क पर", "सीधी सड़क पर", "पुल या अंधे मोड़ पर", "दिन के समय"]
    },
    correctIndex: 2,
    explanation: { 
      en: "Overtaking on a curve or bridge is dangerous due to limited visibility.", 
      hi: "सीमित दृश्यता के कारण मोड़ या पुल पर ओवरटेक करना खतरनाक है।" 
    }
  },
  {
    id: 4,
    signId: "pedestrian",
    question: {
      en: "What does this sign mean?",
      hi: "इस चिन्ह का क्या अर्थ है?"
    },
    options: {
      en: ["School zone", "Pedestrian crossing", "Men at work", "No pedestrians allowed"],
      hi: ["स्कूल क्षेत्र", "पैदल यात्री क्रॉसिंग", "काम चल रहा है", "पैदल यात्रियों की अनुमति नहीं है"]
    },
    correctIndex: 1,
    explanation: {
      en: "This sign warns of a pedestrian crossing ahead. Slow down.",
      hi: "यह चिन्ह आगे पैदल यात्री क्रॉसिंग की चेतावनी देता है। गति कम करें।"
    }
  }
];