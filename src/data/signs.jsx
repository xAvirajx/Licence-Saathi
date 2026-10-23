import React from 'react';

export const signsData = [
  // --- MANDATORY SIGNS (Must Obey) ---
  {
    id: 1, type: "mandatory",
    icon: <svg viewBox="0 0 100 100" className="w-12 h-12"><path d="M 30,10 L 70,10 L 90,30 L 90,70 L 70,90 L 30,90 L 10,70 L 10,30 Z" fill="#ef4444" /><text x="50" y="55" fill="white" fontSize="24" fontWeight="bold" textAnchor="middle">STOP</text></svg>, 
    name: { en: "Stop", hi: "रुकिए" },
    desc: { en: "You must come to a complete stop before the line.", hi: "आपको लाइन से पहले पूरी तरह से रुकना होगा।" }
  },
  {
    id: 2, type: "mandatory",
    icon: <svg viewBox="0 0 100 100" className="w-10 h-10"><rect x="20" y="40" width="60" height="20" fill="#1e293b"/></svg>,
    name: { en: "No Entry", hi: "प्रवेश निषेध" },
    desc: { en: "Vehicles are prohibited from entering.", hi: "वाहनों का प्रवेश वर्जित है।" }
  },
  {
    id: 3, type: "mandatory",
    icon: <svg viewBox="0 0 100 100" className="w-12 h-12"><path d="M50 20 L50 80 M30 40 L50 20 L70 40" stroke="#1e293b" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M80 20 L20 80" stroke="#ef4444" strokeWidth="10" fill="none"/></svg>,
    name: { en: "One Way", hi: "एक तरफा रास्ता" },
    desc: { en: "Traffic is only allowed in one direction.", hi: "यातायात की अनुमति केवल एक दिशा में है।" }
  },
  {
    id: 4, type: "mandatory",
    icon: <svg viewBox="0 0 100 100" className="w-12 h-12"><path d="M30 80 L30 40 A20 20 0 0 1 70 40 L70 60" stroke="#1e293b" strokeWidth="10" fill="none"/><path d="M55 60 L70 75 L85 60" stroke="#1e293b" strokeWidth="10" fill="none"/><path d="M80 20 L20 80" stroke="#ef4444" strokeWidth="10" fill="none"/></svg>,
    name: { en: "No U-Turn", hi: "यू-टर्न निषेध" },
    desc: { en: "Vehicles are not allowed to make a U-Turn.", hi: "वाहनों को यू-टर्न लेने की अनुमति नहीं है।" }
  },
  {
    id: 5, type: "mandatory",
    icon: <svg viewBox="0 0 100 100" className="w-12 h-12"><path d="M30 80 L30 20 L60 20 C75 20 75 50 60 50 L30 50" stroke="#1e293b" strokeWidth="12" fill="none"/><path d="M80 20 L20 80" stroke="#ef4444" strokeWidth="10" fill="none"/></svg>,
    name: { en: "No Parking", hi: "पार्किंग निषेध" },
    desc: { en: "Parking of vehicles is prohibited.", hi: "वाहनों की पार्किंग निषिद्ध है।" }
  },
  {
    id: 6, type: "mandatory",
    icon: <svg viewBox="0 0 100 100" className="w-12 h-12"><path d="M20 60 L40 60 L60 40 L60 80 L40 60" fill="#1e293b"/><path d="M70 45 A15 15 0 0 1 70 75 M80 35 A25 25 0 0 1 80 85" stroke="#1e293b" strokeWidth="6" fill="none"/><path d="M80 20 L20 80" stroke="#ef4444" strokeWidth="10" fill="none"/></svg>,
    name: { en: "Horn Prohibited", hi: "हॉर्न बजाना मना है" },
    desc: { en: "Do not sound the horn (usually near hospitals/schools).", hi: "हॉर्न न बजाएं (अस्पतालों/स्कूलों के पास)।" }
  },
  {
    id: 7, type: "mandatory",
    icon: <svg viewBox="0 0 100 100" className="w-12 h-12"><circle cx="50" cy="50" r="40" stroke="#ef4444" strokeWidth="10" fill="none"/><text x="50" y="65" fill="#1e293b" fontSize="40" fontWeight="bold" textAnchor="middle">50</text></svg>,
    name: { en: "Speed Limit (50)", hi: "गति सीमा (50)" },
    desc: { en: "Do not exceed the speed of 50 km/h.", hi: "50 किमी/घंटा की गति से अधिक न चलें।" }
  },

  // --- CAUTIONARY SIGNS (Warnings) ---
  {
    id: 8, type: "cautionary",
    icon: <svg viewBox="0 0 100 100" className="w-12 h-12"><path d="M30 80 L30 50 A20 20 0 0 1 70 50 L70 20 M55 35 L70 20 L85 35" stroke="#1e293b" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    name: { en: "Right Curve", hi: "दाहिना मोड़" },
    desc: { en: "The road ahead curves to the right.", hi: "आगे की सड़क दाईं ओर मुड़ती है।" }
  },
  {
    id: 9, type: "cautionary",
    icon: <svg viewBox="0 0 100 100" className="w-12 h-12"><path d="M70 80 L70 50 A20 20 0 0 0 30 50 L30 20 M15 35 L30 20 L45 35" stroke="#1e293b" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    name: { en: "Left Curve", hi: "बायां मोड़" },
    desc: { en: "The road ahead curves to the left.", hi: "आगे की सड़क बाईं ओर मुड़ती है।" }
  },
  {
    id: 10, type: "cautionary",
    icon: <svg viewBox="0 0 100 100" className="w-12 h-12"><path d="M20 80 L20 60 L80 60 L80 80 M30 60 L30 40 L70 40 L70 60" stroke="#1e293b" strokeWidth="8" fill="none"/></svg>,
    name: { en: "Narrow Bridge", hi: "संकरा पुल" },
    desc: { en: "The road ahead narrows into a bridge. Reduce speed.", hi: "आगे की सड़क एक पुल में संकरी हो जाती है। गति कम करें।" }
  },
  {
    id: 11, type: "cautionary",
    icon: <svg viewBox="0 0 100 100" className="w-12 h-12"><path d="M30 80 L45 20 L60 80 M45 20 L45 10 A10 10 0 1 1 55 10" stroke="#1e293b" strokeWidth="6" fill="none"/><path d="M10 70 L90 70 M20 85 L80 85" stroke="#1e293b" strokeWidth="8" fill="none"/></svg>,
    name: { en: "Pedestrian Crossing", hi: "पैदल पार पथ" },
    desc: { en: "Pedestrian crossing ahead, be prepared to stop.", hi: "आगे पैदल यात्री क्रॉसिंग है, रुकने के लिए तैयार रहें।" }
  },
  {
    id: 12, type: "cautionary",
    icon: <svg viewBox="0 0 100 100" className="w-12 h-12"><circle cx="40" cy="30" r="10" fill="#1e293b"/><circle cx="65" cy="40" r="8" fill="#1e293b"/><path d="M40 40 L40 80 M30 80 L40 60 L50 80 M65 48 L65 80 M55 80 L65 65 L75 80" stroke="#1e293b" strokeWidth="6" fill="none" strokeLinecap="round"/></svg>,
    name: { en: "School Ahead", hi: "आगे स्कूल है" },
    desc: { en: "School zone ahead. Slow down.", hi: "आगे स्कूल क्षेत्र है। धीमे चलें।" }
  },
  {
    id: 13, type: "cautionary",
    icon: <svg viewBox="0 0 100 100" className="w-12 h-12"><path d="M20 70 L80 70 M30 70 L50 40 L70 70" stroke="#1e293b" strokeWidth="6" fill="none"/><circle cx="50" cy="30" r="10" fill="#1e293b"/><path d="M40 55 L25 45 M60 55 L75 45" stroke="#1e293b" strokeWidth="6" fill="none" strokeLinecap="round"/></svg>,
    name: { en: "Men at Work", hi: "काम चल रहा है" },
    desc: { en: "Construction or repair work is in progress ahead.", hi: "आगे निर्माण या मरम्मत का काम चल रहा है।" }
  },
  {
    id: 14, type: "cautionary",
    icon: <svg viewBox="0 0 100 100" className="w-12 h-12"><circle cx="50" cy="50" r="30" stroke="#1e293b" strokeWidth="8" fill="none" strokeDasharray="20 10"/><path d="M50 20 L60 30 L40 30 Z" fill="#1e293b"/></svg>,
    name: { en: "Roundabout", hi: "गोलचक्कर" },
    desc: { en: "Traffic intersection forming a roundabout ahead.", hi: "आगे गोलचक्कर बनाने वाला ट्रैफिक चौराहा है।" }
  },

  // --- INFORMATORY SIGNS (Helpful info) ---
  {
    id: 15, type: "informatory",
    icon: <svg viewBox="0 0 100 100" className="w-12 h-12"><rect x="20" y="40" width="60" height="20" fill="white"/><rect x="40" y="20" width="20" height="60" fill="white"/></svg>,
    name: { en: "Hospital", hi: "अस्पताल" },
    desc: { en: "Medical facility available nearby.", hi: "चिकित्सा सुविधा पास में उपलब्ध है।" }
  },
  {
    id: 16, type: "informatory",
    icon: <svg viewBox="0 0 100 100" className="w-12 h-12"><path d="M30 20 L70 20 L70 80 L30 80 Z" fill="white"/><circle cx="50" cy="40" r="10" fill="#2563eb"/><path d="M70 50 L85 50 L85 70" stroke="white" strokeWidth="6" fill="none"/></svg>,
    name: { en: "Petrol Pump", hi: "पेट्रोल पंप" },
    desc: { en: "Fuel station available ahead.", hi: "आगे ईंधन स्टेशन उपलब्ध है।" }
  },
  {
    id: 17, type: "informatory",
    icon: <svg viewBox="0 0 100 100" className="w-12 h-12"><path d="M35 25 L55 25 C70 25 70 55 55 55 L35 55 Z" stroke="white" strokeWidth="8" fill="none"/><path d="M35 25 L35 75" stroke="white" strokeWidth="8" fill="none"/></svg>,
    name: { en: "Parking Zone", hi: "पार्किंग क्षेत्र" },
    desc: { en: "Designated area for parking vehicles.", hi: "वाहनों की पार्किंग के लिए निर्धारित क्षेत्र।" }
  },
  {
    id: 18, type: "informatory",
    icon: <svg viewBox="0 0 100 100" className="w-12 h-12"><path d="M20 70 L40 30 L60 30 L80 70" stroke="white" strokeWidth="8" fill="none"/><circle cx="50" cy="20" r="10" fill="white"/></svg>,
    name: { en: "Resting Place", hi: "विश्राम स्थल" },
    desc: { en: "Motel or resting spot available.", hi: "मोटल या विश्राम स्थल उपलब्ध है।" }
  }
];