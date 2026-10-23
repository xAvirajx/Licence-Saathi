export const applications = {
  "LL-948201": {
    status: 2, // At 'Test Slot Booked'
    type: "Learner's Licence",
    applicant: "Ramesh Kumar"
  },
  "DL-443920": {
    status: 5, // Fully complete
    type: "Permanent Licence",
    applicant: "Priya Sharma"
  },
  "LL-112233": {
    status: 0, // Just submitted
    type: "Learner's Licence",
    applicant: "Amit Patel"
  }
};

export const timelineSteps = [
  { id: 0, label: { en: "Application Submitted", hi: "आवेदन जमा किया गया" } },
  { id: 1, label: { en: "Documents Verified", hi: "दस्तावेज़ सत्यापित" } },
  { id: 2, label: { en: "Test Slot Booked", hi: "टेस्ट स्लॉट बुक किया गया" } },
  { id: 3, label: { en: "Test Passed", hi: "टेस्ट पास किया" } },
  { id: 4, label: { en: "Licence Printed", hi: "लाइसेंस प्रिंट किया गया" } },
  { id: 5, label: { en: "Sent by Post", hi: "डाक द्वारा भेजा गया" } }
];