export const documentData = {
  common: [
    {
      id: "age",
      title: { en: "Proof of Age", hi: "आयु का प्रमाण" },
      desc: { en: "An official document showing your correct date of birth.", hi: "आपकी सही जन्म तिथि दर्शाने वाला एक आधिकारिक दस्तावेज।" },
      examples: { en: ["PAN Card", "Birth Certificate", "10th Class Marksheet", "Passport"], hi: ["पैन कार्ड", "जन्म प्रमाण पत्र", "10वीं कक्षा की मार्कशीट", "पासपोर्ट"] }
    },
    {
      id: "address",
      title: { en: "Proof of Address", hi: "पते का प्रमाण" },
      desc: { en: "A document showing where you currently live.", hi: "वह दस्तावेज जो यह दर्शाता है कि आप वर्तमान में कहाँ रहते हैं।" },
      examples: { en: ["Voter ID", "Passport", "Recent Electricity/Water Bill"], hi: ["वोटर आईडी", "पासपोर्ट", "हाल का बिजली/पानी का बिल"] }
    },
    {
      id: "photo",
      title: { en: "Passport Size Photograph", hi: "पासपोर्ट आकार का फोटो" },
      desc: { en: "Recent color photographs with a clear, plain background.", hi: "स्पष्ट पृष्ठभूमि के साथ हाल के रंगीन फोटो।" },
      examples: { en: ["Digital copy for online upload (JPEG)", "2-3 physical copies for RTO"], hi: ["ऑनलाइन अपलोड के लिए डिजिटल कॉपी", "आरटीओ के लिए 2-3 भौतिक प्रतियां"] }
    },
    {
      id: "signature",
      title: { en: "Scanned Signature", hi: "स्कैन किए गए हस्ताक्षर" },
      desc: { en: "Your signature on a blank white paper, scanned clearly.", hi: "एक खाली सफेद कागज पर आपके हस्ताक्षर, स्पष्ट रूप से स्कैन किए गए।" },
      examples: { en: ["Use black or blue ink only", "Keep file size under 50KB"], hi: ["केवल काले या नीले रंग की स्याही का प्रयोग करें", "फ़ाइल का आकार 50KB से कम रखें"] }
    }
  ],
  conditional: {
    id: "medical",
    title: { en: "Medical Certificate (Form 1A)", hi: "चिकित्सा प्रमाण पत्र (फॉर्म 1A)" },
    desc: { en: "Required by law if you are 40 years of age or older.", hi: "यदि आपकी आयु 40 वर्ष या उससे अधिक है, तो कानून द्वारा आवश्यक है।" },
    examples: { en: ["Must be signed by a registered MBBS doctor", "Official format is available on Parivahan"], hi: ["एक पंजीकृत एमबीबीएस डॉक्टर द्वारा हस्ताक्षरित होना चाहिए", "आधिकारिक प्रारूप परिवहन पर उपलब्ध है"] }
  }
};