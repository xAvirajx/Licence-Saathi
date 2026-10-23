export const signsData = [
  // MANDATORY SIGNS (Must Obey)
  {
    id: 1,
    type: "mandatory",
    icon: "🛑", 
    name: { en: "Stop", hi: "रुकिए" },
    desc: { en: "You must come to a complete stop.", hi: "आपको पूरी तरह से रुकना होगा।" }
  },
  {
    id: 2,
    type: "mandatory",
    icon: "⛔",
    name: { en: "No Entry", hi: "प्रवेश निषेध" },
    desc: { en: "Vehicles are prohibited from entering.", hi: "वाहनों का प्रवेश वर्जित है।" }
  },
  {
    id: 3,
    type: "mandatory",
    icon: "🚳",
    name: { en: "No Bicycles", hi: "साइकिल निषेध" },
    desc: { en: "Bicycles are not allowed on this road.", hi: "इस सड़क पर साइकिल ले जाने की अनुमति नहीं है।" }
  },
  {
    id: 4,
    type: "mandatory",
    icon: "🚷",
    name: { en: "No Pedestrians", hi: "पैदल यात्री निषेध" },
    desc: { en: "Pedestrian crossing or walking is prohibited.", hi: "पैदल पार करना या चलना निषिद्ध है।" }
  },
  {
    id: 5,
    type: "mandatory",
    icon: "🔇",
    name: { en: "Horn Prohibited", hi: "हॉर्न बजाना मना है" },
    desc: { en: "Do not sound the horn (usually near hospitals/schools).", hi: "हॉर्न न बजाएं (अस्पतालों/स्कूलों के पास)।" }
  },
  {
    id: 6,
    type: "mandatory",
    icon: "🔙",
    name: { en: "No U-Turn", hi: "यू-टर्न निषेध" },
    desc: { en: "Vehicles are not allowed to make a U-Turn.", hi: "वाहनों को यू-टर्न लेने की अनुमति नहीं है।" }
  },
  {
    id: 7,
    type: "mandatory",
    icon: "🚫",
    name: { en: "No Parking", hi: "पार्किंग निषेध" },
    desc: { en: "Parking of vehicles is prohibited in this area.", hi: "इस क्षेत्र में वाहनों की पार्किंग निषिद्ध है।" }
  },
  
  // CAUTIONARY SIGNS (Warnings)
  {
    id: 8,
    type: "cautionary",
    icon: "⚠️",
    name: { en: "General Warning", hi: "सामान्य चेतावनी" },
    desc: { en: "Proceed with extreme caution.", hi: "अत्यधिक सावधानी के साथ आगे बढ़ें।" }
  },
  {
    id: 9,
    type: "cautionary",
    icon: "🚸",
    name: { en: "School Ahead", hi: "आगे स्कूल है" },
    desc: { en: "School zone ahead. Slow down.", hi: "आगे स्कूल क्षेत्र है। धीमे चलें।" }
  },
  {
    id: 10,
    type: "cautionary",
    icon: "🚶",
    name: { en: "Pedestrian Crossing", hi: "पैदल पार पथ" },
    desc: { en: "Pedestrian crossing ahead, be prepared to stop.", hi: "आगे पैदल यात्री क्रॉसिंग है, रुकने के लिए तैयार रहें।" }
  },
  {
    id: 11,
    type: "cautionary",
    icon: "🚂",
    name: { en: "Unguarded Level Crossing", hi: "बिना गार्ड वाला रेलवे क्रॉसिंग" },
    desc: { en: "Railway crossing without barriers ahead.", hi: "आगे बिना बैरियर वाली रेलवे क्रॉसिंग है।" }
  },
  {
    id: 12,
    type: "cautionary",
    icon: "🛣️",
    name: { en: "Narrow Road Ahead", hi: "आगे संकरी सड़क है" },
    desc: { en: "The road ahead narrows. Reduce speed.", hi: "आगे की सड़क संकरी हो जाती है। गति कम करें।" }
  },
  {
    id: 13,
    type: "cautionary",
    icon: "🚧",
    name: { en: "Men at Work", hi: "काम चल रहा है" },
    desc: { en: "Construction or repair work is in progress ahead.", hi: "आगे निर्माण या मरम्मत का काम चल रहा है।" }
  },
  {
    id: 14,
    type: "cautionary",
    icon: "🔄",
    name: { en: "Roundabout Ahead", hi: "आगे गोलचक्कर है" },
    desc: { en: "Traffic intersection forming a roundabout ahead.", hi: "आगे गोलचक्कर बनाने वाला ट्रैफिक चौराहा है।" }
  },

  // INFORMATORY SIGNS (Helpful info)
  {
    id: 15,
    type: "informatory",
    icon: "🏥",
    name: { en: "Hospital", hi: "अस्पताल" },
    desc: { en: "Medical facility available nearby.", hi: "चिकित्सा सुविधा पास में उपलब्ध है।" }
  },
  {
    id: 16,
    type: "informatory",
    icon: "⛽",
    name: { en: "Petrol Pump", hi: "पेट्रोल पंप" },
    desc: { en: "Fuel station available ahead.", hi: "आगे ईंधन स्टेशन उपलब्ध है।" }
  },
  {
    id: 17,
    type: "informatory",
    icon: "🅿️",
    name: { en: "Parking Zone", hi: "पार्किंग क्षेत्र" },
    desc: { en: "Designated area for parking vehicles.", hi: "वाहनों की पार्किंग के लिए निर्धारित क्षेत्र।" }
  },
  {
    id: 18,
    type: "informatory",
    icon: "🛏️",
    name: { en: "Resting Place", hi: "विश्राम स्थल" },
    desc: { en: "Motel or resting spot available.", hi: "मोटल या विश्राम स्थल उपलब्ध है।" }
  }
];