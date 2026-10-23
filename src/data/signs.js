export const signsData = [
  {
    id: "stop",
    category: "mandatory",
    title: { en: "Stop", hi: "रुकिए" },
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full"><polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="#EF4444" stroke="white" stroke-width="2"/><text x="50" y="55" font-family="Arial" font-size="24" font-weight="bold" fill="white" text-anchor="middle">STOP</text></svg>`
  },
  {
    id: "give_way",
    category: "mandatory",
    title: { en: "Give Way", hi: "रास्ता दें" },
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full"><polygon points="50,95 5,15 95,15" fill="white" stroke="#EF4444" stroke-width="10"/></svg>`
  },
  {
    id: "no_entry",
    category: "mandatory",
    title: { en: "No Entry", hi: "प्रवेश निषेध" },
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="45" fill="#EF4444"/><rect x="20" y="42" width="60" height="16" fill="white"/></svg>`
  },
  {
    id: "pedestrian",
    category: "cautionary",
    title: { en: "Pedestrian Crossing", hi: "पैदल यात्री क्रॉसिंग" },
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full"><polygon points="50,5 95,50 50,95 5,50" fill="white" stroke="#EF4444" stroke-width="8"/><path d="M40,75 L45,55 L35,50 L45,35 C45,35 50,30 55,35 L65,50 L55,55 L50,75" stroke="black" stroke-width="4" fill="none"/><circle cx="50" cy="25" r="5" fill="black"/></svg>`
  }
];