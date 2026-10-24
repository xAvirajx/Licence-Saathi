export const signsData = [
  // ==========================================
  // MANDATORY / REGULATORY SIGNS (CIRCULAR & OCTAGON)
  // ==========================================
  {
    id: 'stop',
    type: 'mandatory',
    name: { en: "Stop", hi: "रुको (Stop)", gu: "થોભો (Stop)" },
    desc: { 
      en: "Mandatory complete stop. Check for traffic in all directions before moving.", 
      hi: "अनिवार्य रूप से रुकें। आगे बढ़ने से पहले सभी दिशाओं में यातायात की जांच करें।", 
      gu: "ફરજિયાત સંપૂર્ણ થોભો. આગળ વધતાં પહેલાં બધી બાજુના ટ્રાફિકની તપાસ કરો." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <polygon points="19,5 45,5 59,19 59,45 45,59 19,59 5,45 5,19" fill="#dc2626" stroke="#ffffff" strokeWidth="2.5" />
        <polygon points="20,7 44,7 57,20 57,44 44,57 20,57 7,44 7,20" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.8" />
        <text x="32" y="38" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="0.5">STOP</text>
      </svg>
    )
  },
  {
    id: 'give_way',
    type: 'mandatory',
    name: { en: "Give Way / Yield", hi: "रास्ता दें (Give Way)", gu: "રસ્તો આપો (Give Way)" },
    desc: { 
      en: "Give priority to traffic on the main road you are approaching.", 
      hi: "मुख्य सड़क पर चल रहे वाहनों को प्राथमिकता दें।", 
      gu: "મુખ્ય રસ્તા પરના વાહનોને પ્રાથમિકતા આપો." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <polygon points="32,56 8,14 56,14" fill="#ffffff" stroke="#dc2626" strokeWidth="7" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'no_entry',
    type: 'mandatory',
    name: { en: "No Entry", hi: "प्रवेश निषेध (No Entry)", gu: "પ્રવેશ નિષેધ (No Entry)" },
    desc: { 
      en: "Vehicular entry is strictly prohibited beyond this point.", 
      hi: "इस बिंदु के आगे सभी प्रकार के वाहनों का प्रवेश पूरी तरह से प्रतिबंधित है।", 
      gu: "આ પોઇન્ટથી આગળ કોઈપણ વાહનને પ્રવેશવાની સખત મનાઈ છે." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <circle cx="32" cy="32" r="27" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
        <rect x="12" y="27" width="40" height="10" rx="2" fill="#ffffff" />
      </svg>
    )
  },
  {
    id: 'one_way',
    type: 'mandatory',
    name: { en: "One Way", hi: "वन वे (One Way)", gu: "વન વે (One Way)" },
    desc: { 
      en: "Traffic is permitted only in the direction shown by the arrow.", 
      hi: "यातायात की अनुमति केवल तीर द्वारा दर्शाई गई दिशा में है।", 
      gu: "ટ્રાફિકને ફક્ત તીર દ્વારા દર્શાવેલ દિશામાં જ જવાની મંજૂરી છે." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <circle cx="32" cy="32" r="27" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
        <path d="M32 14 L44 28 H36 V48 H28 V28 H20 Z" fill="#ffffff" />
      </svg>
    )
  },
  {
    id: 'no_u_turn',
    type: 'mandatory',
    name: { en: "No U-Turn", hi: "यू-टर्न निषेध (No U-Turn)", gu: "યુ-ટર્ન મનાઈ (No U-Turn)" },
    desc: { 
      en: "Making a U-turn to reverse driving direction is strictly prohibited.", 
      hi: "वाहन को वापस मोड़ने (यू-टर्न लेने) की सख्त मनाही है।", 
      gu: "વાહનને પાછું વાળવા (યુ-ટર્ન લેવા) પર સખત પ્રતિબંધ છે." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <circle cx="32" cy="32" r="27" fill="#ffffff" stroke="#dc2626" strokeWidth="6" />
        {/* Inverted U arrow contained strictly inside */}
        <path d="M24 40 V28 C24 21 40 21 40 28 V38" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
        <polygon points="18,34 24,44 30,34" fill="#1e293b" />
        {/* Red diagonal slash */}
        <line x1="14" y1="14" x2="50" y2="50" stroke="#dc2626" strokeWidth="5.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'no_parking',
    type: 'mandatory',
    name: { en: "No Parking", hi: "पार्किंग निषेध (No Parking)", gu: "પાર્કિંગ મનાઈ (No Parking)" },
    desc: { 
      en: "You cannot park your vehicle in this designated zone.", 
      hi: "आप इस क्षेत्र में अपना वाहन खड़ा (पार्क) नहीं कर सकते।", 
      gu: "તમે આ વિસ્તારમાં તમારું વાહન પાર્ક કરી શકતા નથી." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <circle cx="32" cy="32" r="27" fill="#2563eb" stroke="#dc2626" strokeWidth="6" />
        <text x="32" y="42" fill="#ffffff" fontSize="28" fontWeight="bold" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif">P</text>
        <line x1="13" y1="13" x2="51" y2="51" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'no_stopping',
    type: 'mandatory',
    name: { en: "No Stopping", hi: "रुकना मना है (No Stopping)", gu: "થોભવાની મનાઈ (No Stopping)" },
    desc: { 
      en: "Stopping or idling your vehicle here is strictly prohibited.", 
      hi: "यहाँ वाहन को धीमा करना या रोकना पूरी तरह से मना है।", 
      gu: "અહીં વાહન ઊભું રાખવાની કે રોકવાની સંપૂર્ણ મનાઈ છે." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <circle cx="32" cy="32" r="27" fill="#2563eb" stroke="#dc2626" strokeWidth="6" />
        <line x1="13" y1="13" x2="51" y2="51" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
        <line x1="51" y1="13" x2="13" y2="51" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'speed_limit_50',
    type: 'mandatory',
    name: { en: "Speed Limit (50 km/h)", hi: "गति सीमा (50 किमी/घंटा)", gu: "સ્પીડ લિમિટ (50 કિમી/કલાક)" },
    desc: { 
      en: "Maximum permitted vehicle speed on this stretch is 50 km/h.", 
      hi: "इस मार्ग पर अधिकतम अनुमत गति 50 किमी/घंटा है।", 
      gu: "આ રસ્તા પર વાહનની મહત્તમ ઝડપ 50 કિમી/કલાક નક્કી કરેલી છે." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <circle cx="32" cy="32" r="27" fill="#ffffff" stroke="#dc2626" strokeWidth="6" />
        <text x="32" y="41" fill="#1e293b" fontSize="22" fontWeight="900" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif">50</text>
      </svg>
    )
  },
  {
    id: 'horn_prohibited',
    type: 'mandatory',
    name: { en: "Horn Prohibited", hi: "हॉर्न बजाना मना है", gu: "હોર્ન વગાડવાની મનાઈ" },
    desc: { 
      en: "Sounding horns is strictly banned (near hospitals, schools, and courts).", 
      hi: "हॉर्न बजाना प्रतिबंधित है (जैसे अस्पताल, स्कूल या अदालत के पास)।", 
      gu: "હોર્ન વગાડવા પર પ્રતિબંધ છે (દા.ત. હોસ્પિટલ કે શાળા નજીક)." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <circle cx="32" cy="32" r="27" fill="#ffffff" stroke="#dc2626" strokeWidth="6" />
        {/* Official horn bulb & trumpet */}
        <path d="M19 32 C19 28 22 28 24 30 L35 25 V39 L24 34 C22 36 19 36 19 32 Z" fill="#1e293b" />
        <ellipse cx="37" cy="32" rx="2" ry="7" fill="#1e293b" />
        {/* Red diagonal slash */}
        <line x1="14" y1="14" x2="50" y2="50" stroke="#dc2626" strokeWidth="5.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'compulsory_ahead',
    type: 'mandatory',
    name: { en: "Compulsory Ahead Only", hi: "अनिवार्य केवल आगे बढ़ें", gu: "ફરજિયાત સીધા જ આગળ વધો" },
    desc: { 
      en: "You must drive straight ahead; left or right turns are not allowed.", 
      hi: "आपको केवल सीधे आगे बढ़ना होगा; मुड़ना मना है।", 
      gu: "તમારે માત્ર સીધા જ આગળ વધવું પડશે; વળવાની મનાઈ છે." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <circle cx="32" cy="32" r="27" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
        <path d="M32 14 L44 28 H36 V48 H28 V28 H20 Z" fill="#ffffff" />
      </svg>
    )
  },

  // ==========================================
  // CAUTIONARY / WARNING SIGNS (EQUILATERAL TRIANGLE)
  // ==========================================
  {
    id: 'right_curve',
    type: 'cautionary',
    name: { en: "Right Curve Ahead", hi: "आगे दाहिना मोड़", gu: "આગળ જમણો વળાંક" },
    desc: { 
      en: "The road ahead turns sharply to the right. Reduce your speed.", 
      hi: "आगे सड़क दाईं ओर मुड़ती है। गति धीमी करें।", 
      gu: "આગળ રસ્તો જમણી બાજુ વળે છે. વાહનની ઝડપ ધીમી કરો." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <polygon points="32,7 7,53 57,53" fill="#ffffff" stroke="#dc2626" strokeWidth="6" strokeLinejoin="round" />
        {/* Accurately bounded arrow curving right */}
        <path d="M28 47 V38 C28 32 38 32 38 27" fill="none" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />
        <polygon points="38,20 32,27 44,27" fill="#1e293b" />
      </svg>
    )
  },
  {
    id: 'left_curve',
    type: 'cautionary',
    name: { en: "Left Curve Ahead", hi: "आगे बायां मोड़", gu: "આગળ ડાબો વળાંક" },
    desc: { 
      en: "The road ahead turns sharply to the left. Drive cautiously.", 
      hi: "आगे सड़क बाईं ओर मुड़ती है। सावधानी से चलाएं।", 
      gu: "આગળ રસ્તો ડાબી બાજુ વળે છે. સાવધાનીપૂર્વક વાહન ચલાવો." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <polygon points="32,7 7,53 57,53" fill="#ffffff" stroke="#dc2626" strokeWidth="6" strokeLinejoin="round" />
        {/* Accurately bounded arrow curving left */}
        <path d="M36 47 V38 C36 32 26 32 26 27" fill="none" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />
        <polygon points="26,20 20,27 32,27" fill="#1e293b" />
      </svg>
    )
  },
  {
    id: 'narrow_bridge',
    type: 'cautionary',
    name: { en: "Narrow Bridge", hi: "संकरा पुल", gu: "સાંકડો પુલ" },
    desc: { 
      en: "The bridge ahead is narrower than the road. Give way to oncoming vehicles.", 
      hi: "आगे का पुल सड़क से संकरा है। सामने से आ रहे वाहनों को रास्ता दें।", 
      gu: "આગળનો પુલ રસ્તા કરતાં સાંકડો છે. સામેથી આવતા વાહનોને જગ્યા આપો." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <polygon points="32,7 7,53 57,53" fill="#ffffff" stroke="#dc2626" strokeWidth="6" strokeLinejoin="round" />
        {/* Official Indian IRC hourglass bridge necking */}
        <path d="M22 47 V39 C27 39 27 34 27 32 C27 30 27 25 22 25 V19" fill="none" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M42 47 V39 C37 39 37 34 37 32 C37 30 37 25 42 25 V19" fill="none" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="24" y1="32" x2="40" y2="32" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    )
  },
  {
    id: 'pedestrian_crossing',
    type: 'cautionary',
    name: { en: "Pedestrian Crossing", hi: "पैदल यात्री पार पथ", gu: "પગપાળા ક્રોસિંગ (ઝીબ્રા ક્રોસિંગ)" },
    desc: { 
      en: "Watch out for pedestrians crossing the road. Stop and yield.", 
      hi: "सड़क पार करने वाले पैदल यात्रियों से सावधान रहें। वाहन रोकें और रास्ता दें।", 
      gu: "રસ્તો ઓળંગતા પદયાત્રીઓ માટે સાવચેત રહો. વાહન રોકીને રસ્તો આપો." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <polygon points="32,7 7,53 57,53" fill="#ffffff" stroke="#dc2626" strokeWidth="6" strokeLinejoin="round" />
        {/* Walking person inside boundaries */}
        <circle cx="32" cy="22" r="3" fill="#1e293b" />
        <path d="M32 25 L31 35" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
        <path d="M25 31 L32 28 L38 31" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M26 43 L30 35 L34 43" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="20" y1="46" x2="44" y2="46" stroke="#1e293b" strokeWidth="2.5" />
        <line x1="22" y1="49" x2="42" y2="49" stroke="#1e293b" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: 'school_ahead',
    type: 'cautionary',
    name: { en: "School Ahead", hi: "आगे स्कूल है", gu: "આગળ શાળા છે" },
    desc: { 
      en: "School zone ahead. Children may be crossing. Drive slowly.", 
      hi: "आगे विद्यालय है। बच्चे सड़क पार कर सकते हैं। गति धीमी रखें।", 
      gu: "આગળ શાળા છે. બાળકો રસ્તો ક્રોસ કરી શકે છે. વાહન ધીમું ચલાવો." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <polygon points="32,7 7,53 57,53" fill="#ffffff" stroke="#dc2626" strokeWidth="6" strokeLinejoin="round" />
        {/* Official Indian IRC School symbol: 2 children walking with bags */}
        <circle cx="28" cy="24" r="2.5" fill="#1e293b" />
        <path d="M28 27 V37 L25 45 M28 37 L31 45" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="23" y="29" width="3" height="5" fill="#1e293b" rx="1" />
        <circle cx="38" cy="30" r="2" fill="#1e293b" />
        <path d="M38 32 V39 L36 45 M38 39 L40 45" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M28 31 L33 33 L38 34" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
        <line x1="20" y1="48" x2="44" y2="48" stroke="#1e293b" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: 'men_at_work',
    type: 'cautionary',
    name: { en: "Men At Work", hi: "सड़क कार्य प्रगति पर है", gu: "કામ ચાલુ છે (મેન એટ વર્ક)" },
    desc: { 
      en: "Road construction or maintenance work ahead. Drive with caution.", 
      hi: "आगे सड़क निर्माण या मरम्मत कार्य चल रहा है। सावधानी से आगे बढ़ें।", 
      gu: "આગળ રસ્તાનું બાંધકામ કે સમારકામ ચાલુ છે. કાળજીપૂર્વક આગળ વધો." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <polygon points="32,7 7,53 57,53" fill="#ffffff" stroke="#dc2626" strokeWidth="6" strokeLinejoin="round" />
        {/* Official Indian IRC Men At Work digging figure */}
        <circle cx="28" cy="23" r="2.5" fill="#1e293b" />
        <path d="M28 26 L32 33 L30 43" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M24 45 L30 43 L36 45" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <line x1="32" y1="31" x2="42" y2="45" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        <polygon points="41,43 45,47 41,48 38,44" fill="#1e293b" />
        <path d="M40 47 Q44 42 48 47 Z" fill="#1e293b" />
      </svg>
    )
  },
  {
    id: 'roundabout',
    type: 'cautionary',
    name: { en: "Roundabout Ahead", hi: "आगे गोल चक्कर", gu: "આગળ ગોળ સર્કલ" },
    desc: { 
      en: "Traffic circle ahead. Give priority to vehicles on your right.", 
      hi: "आगे गोल चक्कर है। अपने दाईं ओर के वाहनों को प्राथमिकता दें।", 
      gu: "આગળ ગોળ સર્કલ છે. તમારી જમણી બાજુના વાહનોને પ્રાથમિકતા આપો." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <polygon points="32,7 7,53 57,53" fill="#ffffff" stroke="#dc2626" strokeWidth="6" strokeLinejoin="round" />
        {/* Roundabout circular rotating arrows */}
        <circle cx="32" cy="35" r="9" fill="none" stroke="#1e293b" strokeWidth="3" strokeDasharray="14 5" />
        <polygon points="33,23 37,27 31,28" fill="#1e293b" />
        <polygon points="43,36 40,41 38,35" fill="#1e293b" />
        <polygon points="21,36 26,35 24,41" fill="#1e293b" />
      </svg>
    )
  },
  {
    id: 'slippery_road',
    type: 'cautionary',
    name: { en: "Slippery Road", hi: "फिसलन भरी सड़क", gu: "લપસણો રસ્તો" },
    desc: { 
      en: "Road surface may be slippery when wet. Avoid harsh steering or braking.", 
      hi: "गीली होने पर सड़क फिसलन भरी हो सकती है। अचानक ब्रेक लगाने से बचें।", 
      gu: "ભીનાશને કારણે રસ્તો લપસણો હોઈ શકે છે. અચાનક બ્રેક મારવાનું ટાળો." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <polygon points="32,7 7,53 57,53" fill="#ffffff" stroke="#dc2626" strokeWidth="6" strokeLinejoin="round" />
        {/* Car silhouette */}
        <rect x="25" y="26" width="14" height="6" rx="2" fill="#1e293b" />
        <path d="M27 26 L29 22 H35 L37 26 Z" fill="#1e293b" />
        {/* S-curve tyre skid tracks */}
        <path d="M26 34 C23 38 29 40 27 46" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M38 34 C35 38 41 40 39 46" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },

  // ==========================================
  // INFORMATORY SIGNS (BLUE RECTANGLE BADGES)
  // ==========================================
  {
    id: 'public_phone',
    type: 'informatory',
    name: { en: "Public Telephone", hi: "सार्वजनिक टेलीफोन", gu: "જાહેર ટેલિફોન" },
    desc: { 
      en: "Indicates the availability of a public telephone booth nearby.", 
      hi: "आसपास सार्वजनिक टेलीफोन बूथ की उपलब्धता को दर्शाता है।", 
      gu: "નજીકમાં જાહેર ટેલિફોન બૂથ હોવાની માહિતી આપે છે." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <rect x="6" y="6" width="52" height="52" rx="10" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2" />
        <rect x="13" y="13" width="38" height="38" rx="6" fill="#ffffff" />
        {/* Telephone Handset */}
        <path d="M22 25 C22 22 25 20 28 22 L31 25 C32 26 32 27 31 28 L29 30 C30 33 32 35 35 36 L37 34 C38 33 39 33 40 34 L43 37 C45 39 43 42 40 42 C30 42 22 34 22 25 Z" fill="#1d4ed8" />
      </svg>
    )
  },
  {
    id: 'hospital',
    type: 'informatory',
    name: { en: "Hospital", hi: "अस्पताल", gu: "હોસ્પિટલ" },
    desc: { 
      en: "Hospital nearby. Maintain silence and avoid honking.", 
      hi: "आसपास अस्पताल है। कृपया शांति बनाए रखें और हॉर्न न बजाएं।", 
      gu: "નજીકમાં હોસ્પિટલ છે. શાંતિ જાળવો અને હોર્ન વગાડશો નહીં." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <rect x="6" y="6" width="52" height="52" rx="10" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2" />
        <rect x="13" y="13" width="38" height="38" rx="6" fill="#ffffff" />
        {/* Red Cross */}
        <path d="M29 18 H35 V24 H41 V30 H35 V36 H29 V30 H23 V24 H29 Z" fill="#dc2626" />
        {/* Hospital Bed */}
        <path d="M19 43 V38 H45 V43 M19 35 V43 M45 35 V43" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="23" cy="37" r="1.5" fill="#1e293b" />
      </svg>
    )
  },
  {
    id: 'fuel_station',
    type: 'informatory',
    name: { en: "Fuel Station", hi: "पेट्रोल पंप", gu: "પેટ્રોલ પમ્પ" },
    desc: { 
      en: "Petrol or diesel refuelling station is available ahead.", 
      hi: "आगे पेट्रोल या डीजल ईंधन भरने का केंद्र उपलब्ध है।", 
      gu: "આગળ પેટ્રોલ કે ડીઝલ પુરાવવાનું સ્ટેશન ઉપલબ્ધ છે." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <rect x="6" y="6" width="52" height="52" rx="10" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2" />
        <rect x="13" y="13" width="38" height="38" rx="6" fill="#ffffff" />
        {/* Accurate Fuel Pump Dispenser */}
        <rect x="20" y="21" width="16" height="24" rx="2" fill="#1e293b" />
        <rect x="23" y="24" width="10" height="6" fill="#ffffff" rx="1" />
        <line x1="20" y1="45" x2="36" y2="45" stroke="#1e293b" strokeWidth="3" />
        {/* Hose and nozzle */}
        <path d="M36 27 H39 C41 27 42 29 42 32 V38 C42 40 40 40 40 38 V34" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        <path d="M40 34 L38 31" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'parking_lot',
    type: 'informatory',
    name: { en: "Parking Lot", hi: "पार्किंग स्थल", gu: "પાર્કિંગ પ્લોટ" },
    desc: { 
      en: "Designated area where you are legally permitted to park vehicles.", 
      hi: "निर्धारित क्षेत्र जहां वाहन पार्क करने की आधिकारिक अनुमति है।", 
      gu: "વાહનો પાર્ક કરવા માટે અધિકૃત જગ્યા." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <rect x="6" y="6" width="52" height="52" rx="10" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2" />
        <text x="32" y="44" fill="#ffffff" fontSize="34" fontWeight="bold" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif">P</text>
      </svg>
    )
  },
  {
    id: 'first_aid',
    type: 'informatory',
    name: { en: "First Aid Post", hi: "प्राथमिक चिकित्सा केंद्र", gu: "પ્રાથમિક સારવાર કેન્દ્ર" },
    desc: { 
      en: "Emergency medical first aid assistance is available here.", 
      hi: "इस स्थान पर आपातकालीन प्राथमिक उपचार उपलब्ध है।", 
      gu: "આ સ્થળે ઇમરજન્સી પ્રાથમિક તબીબી સારવાર ઉપલબ્ધ છે." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <rect x="6" y="6" width="52" height="52" rx="10" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2" />
        <rect x="13" y="13" width="38" height="38" rx="6" fill="#ffffff" />
        {/* Bold Red First Aid Cross */}
        <path d="M28 19 H36 V28 H45 V36 H36 V45 H28 V36 H19 V28 H28 Z" fill="#dc2626" />
      </svg>
    )
  },
  {
    id: 'eating_place',
    type: 'informatory',
    name: { en: "Eating Place / Restaurant", hi: "खानपान स्थान (भोजनालय)", gu: "રેસ્ટોરન્ટ / ભોજનાલય" },
    desc: { 
      en: "Indicates a food joint, restaurant, or refreshments nearby.", 
      hi: "आसपास भोजनालय, होटल या जलपान केंद्र उपलब्ध है।", 
      gu: "નજીકમાં ભોજનાલય, રેસ્ટોરન્ટ કે નાસ્તાની વ્યવસ્થા છે." 
    },
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-md">
        <rect x="6" y="6" width="52" height="52" rx="10" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2" />
        <rect x="13" y="13" width="38" height="38" rx="6" fill="#ffffff" />
        {/* Fork */}
        <path d="M24 21 V27 C24 29 26 30 27 30 V43 M24 21 V25 M27 21 V25 M30 21 V25 M30 21 V27 C30 29 28 30 27 30" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Spoon */}
        <path d="M39 21 C36 21 35 24 35 27 C35 30 37 31 38 31 V43 M38 31 C39 31 41 30 41 27 C41 24 40 21 39 21 Z" fill="#1e293b" />
      </svg>
    )
  }
];