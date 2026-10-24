export const signsData = [
  // --- MANDATORY SIGNS (Regulatory / Compulsory) ---
  {
    id: 'stop',
    type: 'mandatory',
    name: { en: "Stop", hi: "रुको (Stop)", gu: "થોભો (Stop)" },
    desc: { en: "Mandatory complete stop. Yield to oncoming traffic before proceeding.", hi: "अनिवार्य रूप से रुकें। आगे बढ़ने से पहले अन्य ट्रैफिक को रास्ता दें।", gu: "ફરજિયાત થભો. આગળ વધતા પહેલા અન્ય વાહનોને રસ્તો આપો." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="7.86,2 16.14,2 22,7.86 22,16.14 16.14,22 7.86,22 2,16.14 2,7.86" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
        <text x="12" y="14.5" fill="#ffffff" fontSize="5.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">STOP</text>
      </svg>
    )
  },
  {
    id: 'give_way',
    type: 'mandatory',
    name: { en: "Give Way / Yield", hi: "रास्ता दें (Give Way)", gu: "રસ્તો આપો (Give Way)" },
    desc: { en: "Give priority to traffic on the major road you are approaching.", hi: "मुख्य सड़क पर चल रहे ट्रैफिक को प्राथमिकता दें।", gu: "મુખ્ય રસ્તા પર આવતા ટ્રાફિકને અગ્રતા આપો." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <polygon points="12,21 3,5 21,5" fill="#ffffff" stroke="#ef4444" strokeWidth="2.5" />
      </svg>
    )
  },
  {
    id: 'no_entry',
    type: 'mandatory',
    name: { en: "No Entry", hi: "प्रवेश निषेध (No Entry)", gu: "પ્રવેશ વર્જિત (No Entry)" },
    desc: { en: "Vehicular entry is strictly prohibited beyond this point.", hi: "इस बिंदु के आगे वाहनों का प्रवेश पूरी तरह वर्जित है.", gu: "આ જગ્યાથી આગળ વાહનોનો પ્રવેશ સખત મનાઈ છે." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <circle cx="12" cy="12" r="10" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
        <rect x="7" y="10.5" width="10" height="3" fill="#ffffff" />
      </svg>
    )
  },
  {
    id: 'one_way',
    type: 'mandatory',
    name: { en: "One Way", hi: "वन वे (One Way)", gu: "વન વે (One Way)" },
    desc: { en: "Traffic is permitted only in the direction of the arrow.", hi: "यातायात केवल तीर की दिशा में ही अनुमत है।", gu: "ટ્રાફિક ફક્ત તીરની દિશામાં જ જઈ શકે છે." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" fill="#1e3a8a" stroke="#ffffff" strokeWidth="2" />
        <path d="M12 16V8M8 11l4-4 4 4" stroke="#ffffff" strokeWidth="2.5" />
      </svg>
    )
  },
  {
    id: 'no_u_turn',
    type: 'mandatory',
    name: { en: "No U-Turn", hi: "यू-टर्न निषेध (No U-Turn)", gu: "યુ-ટર્ન મનાઈ છે (No U-Turn)" },
    desc: { en: "Making a U-turn to reverse your direction is prohibited.", hi: "दिशा बदलने के लिए यू-टर्न लेना मना है।", gu: "દિશા બદલવા માટે યુ-ટર્ન લેવાની મનાઈ છે." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <circle cx="12" cy="12" r="10" fill="#ffffff" stroke="#ef4444" strokeWidth="3" />
        <path d="M8 15a4 4 0 008 0V9" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 11l-2-2-2 2" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="4.5" y1="4.5" x2="19.5" y2="19.5" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'no_parking',
    type: 'mandatory',
    name: { en: "No Parking", hi: "पार्किंग निषेध (No Parking)", gu: "પાર્કિંગ મનાઈ છે (No Parking)" },
    desc: { en: "You cannot park your vehicle in this zone.", hi: "आप इस क्षेत्र में अपना वाहन पार्क नहीं कर सकते।", gu: "આ વિસ્તારમાં તમારું વાહન પાર્ક કરી શકાશે નહીં." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <circle cx="12" cy="12" r="10" fill="#3b82f6" stroke="#ef4444" strokeWidth="3" />
        <text x="12" y="15" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">P</text>
        <line x1="5" y1="19" x2="19" y2="5" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'no_stopping',
    type: 'mandatory',
    name: { en: "No Stopping or Standing", hi: "रुकना मना है (No Stopping)", gu: "રોકવાની મનાઈ છે" },
    desc: { en: "Stopping or parking your vehicle here is strictly prohibited.", hi: "यहाँ वाहन रोकना या खड़ा करना पूरी तरह वर्जित है।", gu: "અહીં વાહન થોભવવું કે પાર્ક કરવું સખત મનાઈ છે." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <circle cx="12" cy="12" r="10" fill="#3b82f6" stroke="#ef4444" strokeWidth="2.5" />
        <line x1="6" y1="6" x2="18" y2="18" stroke="#ef4444" strokeWidth="2.5" />
        <line x1="6" y1="18" x2="18" y2="6" stroke="#ef4444" strokeWidth="2.5" />
      </svg>
    )
  },
  {
    id: 'horn_prohibited',
    type: 'mandatory',
    name: { en: "Horn Prohibited", hi: "हॉर्न बजाना मना है", gu: "હોર્ન વગાડવાની મનાઈ" },
    desc: { en: "Sounding vehicle horns is banned (e.g., near hospitals or schools).", hi: "हॉर्न बजाना प्रतिबंधित है (जैसे अस्पताल या स्कूल के पास)।", gu: "હોર્ન વગાડવાની સખત મનાઈ છે (દા.ત. હોસ્પિટલ કે શાળા પાસે)." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <circle cx="12" cy="12" r="10" fill="#ffffff" stroke="#ef4444" strokeWidth="3" />
        <path d="M6 10h3l4-3v10l-4-3H6z" fill="#1e293b" />
        <path d="M16 9a4 4 0 010 6" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        <line x1="4.5" y1="4.5" x2="19.5" y2="19.5" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'speed_limit_50',
    type: 'mandatory',
    name: { en: "Speed Limit (50 km/h)", hi: "गति सीमा (50 किमी/घंटा)", gu: "સ્પીડ લિમિટ (50 किमी/કલાક)" },
    desc: { en: "Maximum permitted vehicle speed is 50 km/h.", hi: "वाहन की अधिकतम अनुमति प्राप्त गति 50 किमी/घंटा है।", gu: "વાહનની મહત્તમ મંજૂર ઝડપ 50 કિમી/કલાક છે." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <circle cx="12" cy="12" r="10" fill="#ffffff" stroke="#ef4444" strokeWidth="3" />
        <text x="12" y="15.5" fill="#1e293b" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">50</text>
      </svg>
    )
  },
  {
    id: 'compulsory_ahead',
    type: 'mandatory',
    name: { en: "Compulsory Ahead Only", hi: "अनिवार्य आगे बढ़ें", gu: "ફરજિયાત સીધા આગળ વધો" },
    desc: { en: "You must drive straight ahead; turning is not allowed.", hi: "आपको सीधे आगे बढ़ना होगा; मुड़ना मना है।", gu: "તમારે સીધા જ આગળ વધવું પડશે, વાહન વાળી શકાશે નહીં." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <circle cx="12" cy="12" r="10" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
        <path d="M12 18V6M8 10l4-4 4 4" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },

  // --- CAUTIONARY SIGNS (Warning) ---
  {
    id: 'right_curve',
    type: 'cautionary',
    name: { en: "Right Curve Ahead", hi: "आगे दाहिना मोड़", gu: "આગળ જમણો વળાંક" },
    desc: { en: "The road ahead curves sharply to the right. Slow down.", hi: "आगे सड़क दाईं ओर मुड़ती है। गति धीमी करें।", gu: "આગળ રસ્તો જમણી બાજુ વળે છે. વાહનની ઝડપ ઘટાડો." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <polygon points="12,2 22,20 2,20" fill="#ffffff" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M9 16c0-3 2-4 3-6s3-3 3-5" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M13 7l2-2 2 2" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'left_curve',
    type: 'cautionary',
    name: { en: "Left Curve Ahead", hi: "आगे बायां मोड़", gu: "આગળ ડાબો વળાંક" },
    desc: { en: "The road ahead curves sharply to the left.", hi: "आगे सड़क बाईं ओर मुड़ती है।", gu: "આગળ રસ્તો ડાબી બાજુ વળે છે." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <polygon points="12,2 22,20 2,20" fill="#ffffff" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M15 16c0-3-2-4-3-6s-3-3-3-5" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M11 7L9 5l-2 2" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'narrow_bridge',
    type: 'cautionary',
    name: { en: "Narrow Bridge", hi: "संकरा पुल", gu: "સંકડો પુલ" },
    desc: { en: "The bridge ahead is narrower than the road width. Exercise caution.", hi: "आगे का पुल सड़क से संकरा है। सावधानी बरतें.", gu: "આગળનો પુલ રસ્તા કરતા સાંકડો છે. સાવધાની રાખો." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <polygon points="12,2 22,20 2,20" fill="#ffffff" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M6 15h12M7 11h10M8 7h8" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'pedestrian_crossing',
    type: 'cautionary',
    name: { en: "Pedestrian Crossing", hi: "पैदल यात्री पार पथ", gu: "પેડેસ્ટ્રિયન ક્રોસિંગ (પગપાળા માર્ગ)" },
    desc: { en: "Watch out for people crossing the road ahead.", hi: "आगे सड़क पार कर रहे लोगों से सावधान रहें।", gu: "આગળ રસ્તો ઓળંગતા રાહદારીઓથી સાવચેત રહો." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <polygon points="12,2 22,20 2,20" fill="#ffffff" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="12" cy="7" r="1.5" fill="#1e293b" />
        <path d="M10 10l2 2 2-2M10 14h4M12 12v5l-2 3M12 17l2 3" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'school_ahead',
    type: 'cautionary',
    name: { en: "School Ahead", hi: "आगे स्कूल है", gu: "આગળ શાળા છે" },
    desc: { en: "Children may be crossing. Drive slow and cautiously.", hi: "बच्चे सड़क पार कर सकते हैं। वाहन धीरे चलाएं।", gu: "બાળકો રસ્તો ઓળંગતા હોઈ શકે છે. વાહનધીમી ઝડપે ચલાવો." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <polygon points="12,2 22,20 2,20" fill="#ffffff" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M9 10l3-3 3 3M12 7v8M10 17h4" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'men_at_work',
    type: 'cautionary',
    name: { en: "Men At Work", hi: "आदमी काम कर रहे हैं", gu: "રોડનું કામ ચાલુ છે" },
    desc: { en: "Road maintenance or construction work ahead. Proceed with care.", hi: "आगे सड़क निर्माण कार्य चल रहा है। सावधानी से आगे बढ़ें।", gu: "આગળ રસ્તાનું કામ ચાલે છે. સાવધાનીથી વાહન ચલાવો." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <polygon points="12,2 22,20 2,20" fill="#ffffff" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M10 11l4 2M12 8l3 5H9l3-5zM11 15v3M13 15v3" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'roundabout',
    type: 'cautionary',
    name: { en: "Roundabout Ahead", hi: "आगे गोल चक्कर", gu: "આગળ ગોળ સર્કલ છે" },
    desc: { en: "Approaching a circular intersection. Give way to traffic from your right.", hi: "आगे गोल चक्कर है। दाईं ओर के ट्रैफिक को प्राथमिकता दें।", gu: "આગળ ગોળાકાર સર્કલ છે. જમણી બાજુના વાહનોને પ્રાધાન્ય આપો." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <polygon points="12,2 22,20 2,20" fill="#ffffff" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M12 9a3 3 0 100 6 3 3 0 000-6z" stroke="#1e293b" strokeWidth="2" />
        <path d="M12 7v2M12 15v2M9 12H7M17 12h-2" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'slippery_road',
    type: 'cautionary',
    name: { en: "Slippery Road", hi: "फिसलन भरी सड़क", gu: "લપસણો રસ્તो" },
    desc: { en: "Road surface may be slippery when wet. Avoid sudden braking.", hi: "गीले होने पर सड़क फिसलन भरी हो सकती है। अचानक ब्रेक न लगाएं।", gu: "ભીના રસ્તા પર વાહન લપસી શકે છે. અચાનક બ્રેક ન મારવી." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <polygon points="12,2 22,20 2,20" fill="#ffffff" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M7 14c2-1 3-3 5-3s3 2 5 3" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        <circle cx="10" cy="9" r="1" fill="#1e293b" />
        <circle cx="15" cy="11" r="1" fill="#1e293b" />
      </svg>
    )
  },

  // --- INFORMATORY SIGNS ---
  {
    id: 'public_phone',
    type: 'informatory',
    name: { en: "Public Telephone", hi: "सार्वजनिक टेलीफोन", gu: "પબ્લિક ટેલિફોન" },
    desc: { en: "Indicates the availability of a public telephone booth nearby.", hi: "आसपास सार्वजनिक टेलीफोन बूथ की उपलब्धता दर्शाता है।", gu: "નજીકમાં પબ્લિક ટેલિફોન બૂથ ઉપલબ્ધ હોવાનું સૂચવે છે." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#1e3a8a" stroke="#ffffff" strokeWidth="2" />
        <path d="M9 8h6v8H9zM12 11v2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'hospital',
    type: 'informatory',
    name: { en: "Hospital", hi: "अस्पताल", gu: "હોસ્પિટલ" },
    desc: { en: "Indicates a hospital nearby. Maintain quiet and do not honk.", hi: "आसपास अस्पताल है। कृपया शांति बनाए रखें और हॉर्न न बजाएं।", gu: "નજીકમાં હોસ્પિટલ છે. શાંતિ જાળવો અને હોર્ન વગાડશો નહીં." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#1e3a8a" stroke="#ffffff" strokeWidth="2" />
        <path d="M12 7v10M7 12h10" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'fuel_station',
    type: 'informatory',
    name: { en: "Fuel Station", hi: "पैट्रोल पंप", gu: "પેટ્રોલ પમ્પ" },
    desc: { en: "Indicates a petrol or diesel filling station ahead.", hi: "आगे पेट्रोल या डीजल पंप उपलब्ध है।", gu: "આગળ પેટ્રોલ અથવા ડીઝલ પંપ ઉપલબ્ધ છે." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#1e3a8a" stroke="#ffffff" strokeWidth="2" />
        <path d="M8 8h6v9H8zM14 10h2a1 1 0 011 1v3a1 1 0 01-1 1h-2" stroke="#ffffff" strokeWidth="1.8" />
      </svg>
    )
  },
  {
    id: 'parking_lot',
    type: 'informatory',
    name: { en: "Parking Lot", hi: "पार्किंग स्थल", gu: "પાર્કિંગ પ્લોਟ" },
    desc: { en: "Designated area where vehicles are allowed to park.", hi: "निर्धारित क्षेत्र जहां वाहन पार्क करने की अनुमति है।", gu: "નક્કી કરેલ વિસ્તાર જ્યાં વાહનો પાર્ક કરી શકાય છે." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#1e3a8a" stroke="#ffffff" strokeWidth="2" />
        <text x="12" y="16" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">P</text>
      </svg>
    )
  },
  {
    id: 'first_aid',
    type: 'informatory',
    name: { en: "First Aid Post", hi: "प्राथमिक चिकित्सा केंद्र", gu: "પ્રાથમિક સારવાર કેન્દ્ર" },
    desc: { en: "Medical first aid is available at this location.", hi: "इस स्थान पर प्राथमिक चिकित्सा उपलब्ध है।", gu: "આ જગ્યાએ પ્રાથમિક સારવાર ઉપલબ્ધ છે." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#1e3a8a" stroke="#ffffff" strokeWidth="2" />
        <path d="M12 7v10M7 12h10" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'eating_place',
    type: 'informatory',
    name: { en: "Eating Place / Restaurant", hi: "खानपान स्थान (रेस्टोरेंट)", gu: "રેસ્ટોરન્ટ / ખાવા માટેની જગ્યા" },
    desc: { en: "Indicates a restaurant or food joint nearby.", hi: "आसपास रेस्तरां या भोजनालय उपलब्ध है।", gu: "નજીકમાં રેસ્ટોરન્ટ કે ખાવા માટેની જગ્યા ઉપલબ્ધ છે." },
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#1e3a8a" stroke="#ffffff" strokeWidth="2" />
        <path d="M10 7v5M14 7v3M14 12v5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
];