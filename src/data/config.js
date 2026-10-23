export const rulesConfig = {
  minimumAge: {
    gearless: { age: 16, label: { en: "Two-wheeler (without gear, up to 50cc)", hi: "दोपहिया वाहन (बिना गियर, 50cc तक)" } },
    geared: { age: 18, label: { en: "Motorcycle with gear / Car", hi: "गियर वाली मोटरसाइकिल / कार" } },
    commercial: { age: 20, label: { en: "Commercial / Transport Vehicle", hi: "वाणिज्यिक / परिवहन वाहन" } }
  },
  fees: {
    learnersLicence: 150,
    learnersTest: 50,
    drivingTest: 300,
    licenceIssue: 200
  },
  timelines: {
    llValidityMonths: 6,
    dlApplicationWaitDays: 30
  },
  testRules: {
    totalQuestions: 15,
    passMark: 9,
    timePerQuestionSeconds: 30
  }
};