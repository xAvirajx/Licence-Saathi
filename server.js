import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());

// AI Endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history, stage, configData, faqData, lang } = req.body;
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'API key missing' });

    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = `
You are Licence Saathi AI, a helpful assistant helping people get a driving licence in India.
- Reply in the language the user writes in.
- Use short sentences a Class 8 student would understand.
- If the answer depends on the state, ask which state they are in.
- Use these facts: CONFIG: ${JSON.stringify(configData)} FAQS: ${JSON.stringify(faqData)}
- If unsure, point the user to parivahan.gov.in or their local RTO.
- STRICT PRIVACY GUARD: Never ask for, store, or output an Aadhaar number, phone number, or any other personal details.
- User journey stage progress index: ${stage}. Suggest their next step.
    `.trim();

    const contents = history ? history.map(h => ({
      role: h.type === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    })) : [];
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: { systemInstruction, maxOutputTokens: 300, temperature: 0.7 }
    });

    return res.status(200).json({ reply: response.text });
  } catch (error) {
    console.error('AI Error:', error);
    return res.status(500).json({ error: 'Failed to fetch AI response' });
  }
});

// Serve React Frontend
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));