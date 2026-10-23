import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history, stage, configData, faqData, lang } = req.body;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured on server.' });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Construct the system instructions
    const systemInstruction = `
You are Licence Saathi AI, a helpful assistant helping people get a driving licence in India.
- Reply in the exact language the user writes in (match their English or Hindi/Hinglish).
- Use short, simple sentences a Class 8 student would easily understand.
- If the answer depends on the state (like RTO rules or fees), ask which state the user is in.
- Use the following core rules/config and FAQs as your source of truth facts:
CONFIG: ${JSON.stringify(configData)}
FAQS: ${JSON.stringify(faqData)}
- If you aren't sure about something, admit it and point the user to parivahan.gov.in or their local RTO.
- STRICT PRIVACY GUARD: Never ask for, store, or output an Aadhaar number, phone number, RRN, MyNumber, or any other personal details. If a user asks you to retrieve or verify their Aadhaar number, strictly and politely refuse for privacy reasons.
- The user's current saved journey stage progress index is: ${stage} (0: Just starting, 1: Documents/Eligibility, 2: Learner's Licence Test, 3: Waiting 30 days, 4: Permanent Licence Test booked, 5: Applied/Tracking). Use this to naturally suggest their next practical step if relevant.
    `.trim();

    // Format conversation history for Gemini SDK if provided
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        contents.push({
          role: h.type === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        });
      }
    }
    // Add the latest user message
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        maxOutputTokens: 300,
        temperature: 0.7,
      }
    });

    const reply = response.text || "I'm not sure about that. Please check parivahan.gov.in or contact your local RTO.";
    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'Failed to fetch AI response' });
  }
}