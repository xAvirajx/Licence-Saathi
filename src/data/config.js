export const rulesConfig = {
  minimumAge: {
    gearless: { age: 16, note: "Requires parent's consent (up to 50cc)" },
    gearedOrCar: { age: 18, note: "Motorcycle with gear or Light Motor Vehicle (Car)" },
    commercial: { age: 20, note: "Transport/Commercial vehicles" }
  },
  fees: {
    learnersLicence: 150, // per vehicle class
    learnersTest: 50,
    drivingTest: 300,
    licenceIssue: 200
  },
  testRules: {
    totalQuestions: 15,
    passMark: 9,
    timePerQuestionSeconds: 30
  },
  timelines: {
    llValidityMonths: 6,
    dlApplicationWaitDays: 30 // Days after LL issue before DL can be applied
  }
};