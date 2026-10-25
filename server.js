import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import compression from 'compression';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(compression());
app.use(express.json({ limit: '100kb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown';

  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms (IP: ${clientIp})`);
  });

  next();
});

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 25;

setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now - data.startTime > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}, 10 * 60 * 1000);

const chatRateLimiter = (req, res, next) => {
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const record = rateLimitMap.get(clientIp);

  if (!record || now - record.startTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(clientIp, { count: 1, startTime: now });
    return next();
  }

  record.count += 1;
  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((record.startTime + RATE_LIMIT_WINDOW_MS - now) / 1000);
    res.setHeader('Retry-After', retryAfterSeconds);
    return res.status(429).json({
      error: 'Too many requests. Please wait before asking more questions.',
      retryAfter: retryAfterSeconds
    });
  }

  next();
};

app.post('/api/chat', chatRateLimiter, async (req, res) => {
  const { message, history, stage, configData, faqData, lang } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message text is required' });
  }

  const rawKey = process.env.GEMINI_API_KEY;
  if (!rawKey) {
    console.error('[AI CONFIG ERROR] GEMINI_API_KEY is not set in environment variables.');
    return res.status(500).json({ 
      error: 'GEMINI_API_KEY is missing on Render. Please add it to Render Dashboard -> Environment tab.' 
    });
  }

  const apiKey = rawKey.trim().replace(/^["']|["']$/g, '');

  try {
    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `
You are License Saathi AI, an expert assistant helping people get a driving licence in India.
- Reply in the language the user writes in (English, Hindi, or Gujarati).
- Use short, clear sentences a Class 8 student would understand.
- Provide practical, formatted bullet points when answering about documents, tests, or rules.
- If the answer depends on the state, ask which state they are in.
- Use these facts: CONFIG: ${JSON.stringify(configData || {})} FAQS: ${JSON.stringify(faqData || {})}
- If unsure, point the user to parivahan.gov.in or their local RTO.
- STRICT PRIVACY GUARD: Never ask for, store, or output an Aadhaar number, phone number, or any other personal details.
- User journey stage progress index: ${stage || '1'}. Suggest their next step.
    `.trim();

    let validHistory = [];
    if (Array.isArray(history)) {
      const firstUserIndex = history.findIndex((h) => h.type === 'user');
      if (firstUserIndex !== -1) {
        validHistory = history.slice(firstUserIndex);
      }
    }

    const contents = validHistory.slice(-6).map((h) => ({
      role: h.type === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    }));

    contents.push({ role: 'user', parts: [{ text: message.trim() }] });

    // Turn off thinking tokens so the full token budget is used for the answer text
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        maxOutputTokens: 1000,
        temperature: 0.7,
        thinkingConfig: {
          thinkingBudget: 0
        }
      }
    });

    return res.status(200).json({ reply: response.text });
  } catch (error) {
    const status = error.status || error.statusCode || 500;
    const errorMessage = error.message || 'Unknown AI error';
    console.error(`[AI ERROR] Status: ${status} - Message: ${errorMessage}`);

    return res.status(status).json({ 
      error: errorMessage,
      details: 'Check server logs for detailed stack trace.' 
    });
  }
});

app.use(
  express.static(path.join(__dirname, 'dist'), {
    maxAge: '1y',
    etag: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache, must-revalidate');
      }
    }
  })
);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error('[UNCAUGHT ERROR]', err);
  res.status(500).json({ error: 'Internal server error occurred' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`License Saathi server running on port ${PORT}`));