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

// ==========================================
// 1. PERFORMANCE OPTIMIZATION (GZIP / BROTLI)
// ==========================================
// Slashes JavaScript and CSS transfer size by >70%
app.use(compression());

// Body parser with 100kb payload cap
app.use(express.json({ limit: '100kb' }));

// ==========================================
// 2. PRIVACY-SAFE REQUEST & PERFORMANCE LOGGER
// ==========================================
app.use((req, res, next) => {
  const start = Date.now();
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown';

  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    // Intentionally never log req.body to preserve applicant privacy
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms (IP: ${clientIp})`);
  });

  next();
});

// ==========================================
// 3. SLIDING-WINDOW IN-MEMORY RATE LIMITER
// ==========================================
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15-minute sliding window
const MAX_REQUESTS_PER_WINDOW = 25; // 25 queries per window per IP

// Periodically clean up stale entries every 10 minutes
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

  if (!record) {
    rateLimitMap.set(clientIp, { count: 1, startTime: now });
    return next();
  }

  // If window has passed, reset counter
  if (now - record.startTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(clientIp, { count: 1, startTime: now });
    return next();
  }

  // Increment within window
  record.count += 1;

  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((record.startTime + RATE_LIMIT_WINDOW_MS - now) / 1000);
    res.setHeader('Retry-After', retryAfterSeconds);
    console.warn(`[RATE LIMIT EXCEEDED] IP: ${clientIp} exceeded threshold.`);
    return res.status(429).json({
      error: 'Too many requests. Please wait before asking more questions.',
      retryAfter: retryAfterSeconds
    });
  }

  next();
};

// ==========================================
// 4. AI CHAT ENDPOINT WITH DIAGNOSTIC ERROR HANDLING
// ==========================================
app.post('/api/chat', chatRateLimiter, async (req, res) => {
  const { message, history, stage, configData, faqData, lang } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message payload is required' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('[AI CONFIG ERROR] GEMINI_API_KEY environment variable is missing.');
      return res.status(500).json({ error: 'AI service configuration missing on server' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = `
You are Licence Saathi AI, a helpful assistant helping people get a driving licence in India.
- Reply in the language the user writes in (support English, Hindi, and Gujarati).
- Use short sentences a Class 8 student would understand.
- If the answer depends on the state, ask which state they are in.
- Use these facts: CONFIG: ${JSON.stringify(configData || {})} FAQS: ${JSON.stringify(faqData || {})}
- If unsure, point the user to parivahan.gov.in or their local RTO.
- STRICT PRIVACY GUARD: Never ask for, store, or output an Aadhaar number, phone number, or any other personal details.
- User journey stage progress index: ${stage || '1'}. Suggest their next step.
    `.trim();

    const contents = Array.isArray(history)
      ? history.slice(-6).map((h) => ({
          role: h.type === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        }))
      : [];

    contents.push({ role: 'user', parts: [{ text: message.trim() }] });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction,
        maxOutputTokens: 300,
        temperature: 0.7
      }
    });

    return res.status(200).json({ reply: response.text });
  } catch (error) {
    const status = error.status || error.statusCode || 500;
    const errorMessage = error.message || 'Unknown AI error';

    console.error(`[AI GENERATION ERROR] Status: ${status} - Message: ${errorMessage}`);

    if (status === 429) {
      return res.status(429).json({ error: 'AI model rate limit reached. Please try again shortly.' });
    }

    return res.status(500).json({ error: 'Failed to process AI response' });
  }
});

// ==========================================
// 5. REACT FRONTEND STATIC ASSETS & ASSET CACHING
// ==========================================
app.use(
  express.static(path.join(__dirname, 'dist'), {
    maxAge: '1y',
    etag: true,
    setHeaders: (res, filePath) => {
      // index.html must not be cached long-term to ensure immediate deploys
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache, must-revalidate');
      }
    }
  })
);

// Express 5 catch-all handler for React client-side routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ==========================================
// 6. GLOBAL FALLBACK ERROR HANDLER
// ==========================================
app.use((err, req, res, next) => {
  console.error('[UNCAUGHT SERVER ERROR]', err);
  res.status(500).json({ error: 'Internal server error occurred' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Licence Saathi server running on port ${PORT}`));