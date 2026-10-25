import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ==========================================
// 1. API SETU (apisetu.gov.in) MoRTH DL ENDPOINT
// Conforms to Ministry of Road Transport and Highways Schema v1.0.2
// ==========================================
app.get('/api/apisetu/dl-verification', (req, res) => {
  const { dlNumber } = req.query;

  const mockApiSetuRecords = {
    'DL-443920': {
      status: 'VERIFIED_ACTIVE',
      schemaVersion: '1.0.2',
      issuingAuthority: 'Ministry of Road Transport and Highways (MoRTH)',
      apiSetuOrgId: '001423-morth',
      complianceRule: 'CMVR 1989 Rule 139 & Rule 16',
      responsePayload: {
        dlNumber: 'DL-443920',
        holderName: 'Vikas Sharma',
        issueDate: '2025-08-14',
        validity: { nonTransport: '2045-08-13', transport: 'NA' },
        covDetails: [{ cov: 'LMV (Light Motor Vehicle)', issueDate: '2025-08-14' }],
        rtoCode: 'GJ-01',
        rtoName: 'Ahmedabad RTO (Subhash Bridge)',
        dispatchStatus: 'DISPATCHED_INDIA_POST',
        speedPostTracking: 'EK884920192IN',
        deliveryExpected: 'Within 2-3 business days'
      }
    },
    'LL-948201': {
      status: 'IN_PROGRESS',
      schemaVersion: '1.0.2',
      issuingAuthority: 'Ministry of Road Transport and Highways (MoRTH)',
      apiSetuOrgId: '001423-morth',
      complianceRule: 'CMVR 1989 Rule 11 (Learner Licence)',
      responsePayload: {
        applicationNumber: 'LL-948201',
        holderName: 'Pooja Patel',
        currentStage: 'LL_SLOT_BOOKED',
        testSlotDateTime: '2026-11-04 10:30 AM',
        rtoName: 'Ahmedabad Subhash Bridge',
        biometricsStatus: 'COMPLETED',
        scrutinyStatus: 'APPROVED'
      }
    },
    'LL-112233': {
      status: 'DOCUMENT_QUERY',
      schemaVersion: '1.0.2',
      issuingAuthority: 'Ministry of Road Transport and Highways (MoRTH)',
      apiSetuOrgId: '001423-morth',
      complianceRule: 'CMVR 1989 Rule 4 (Document Scrutiny)',
      responsePayload: {
        applicationNumber: 'LL-112233',
        holderName: 'Karan Mehta',
        currentStage: 'ACTION_REQUIRED',
        queryReason: 'Address Proof photocopy blurred or unreadable',
        actionRequired: 'Re-upload self-attested electricity bill or Aadhaar PDF via Parivahan Sarathi',
        penaltyFee: '₹0 (No charge for initial document re-upload)'
      }
    }
  };

  const record = mockApiSetuRecords[dlNumber] || {
    status: 'NOT_FOUND',
    schemaVersion: '1.0.2',
    error: 'Application or DL Number not found in API Setu Sandbox registry'
  };

  return res.status(200).json({
    gateway: 'API_SETU_MORTH_GATEWAY',
    node: 'SANDBOX_NDLS_01',
    timestamp: new Date().toISOString(),
    ...record
  });
});

// ==========================================
// 2. GEMINI AI CHAT HELPER WITH MULTI-MODEL FALLBACK
// Supports English, Hindi, and Gujarati with Zero-PII Guardrails
// ==========================================
app.post('/api/chat', async (req, res) => {
  const { message, lang = 'en', history = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message text is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      reply: lang === 'gu'
        ? 'સિસ્ટમ એરર: સર્વર પર GEMINI_API_KEY કન્ફિગર કરેલ નથી.'
        : lang === 'hi'
        ? 'सिस्टम त्रुटि: सर्वर पर GEMINI_API_KEY कॉन्फ़िगर नहीं है।'
        : 'System Error: GEMINI_API_KEY is not configured on the server.'
    });
  }

  const systemInstructions = `
You are "License Saathi AI", an expert civic guide for Indian citizens navigating the Parivahan Sarathi driving licence process under the Motor Vehicles Act (CMVR 1989).
Primary Mission:
1. Provide accurate, empathetic, and jargon-free advice on Learner's Licences, Permanent DL tests, document checklists, and Lost DL SOS recoveries.
2. Emphasize official statutory fees (e.g. ₹200 LL fee, ₹400 duplicate DL fee) to protect citizens from touts and agents who overcharge ₹2,000+.
3. Language: Reply in the language requested by the user (${lang === 'gu' ? 'Gujarati' : lang === 'hi' ? 'Hindi' : 'English'}).
4. Privacy & Zero-PII: Never ask for or record real Aadhaar numbers, phone numbers, or OTPs. Remind citizens that official submissions only occur on sarathi.parivahan.gov.in.
5. Tone: Helpful peer, authentic, concise, and structured with bold highlights and bullet points when explaining procedures.
`;

  // Construct conversation contents for Gemini REST API
  const formattedContents = [
    {
      role: 'user',
      parts: [{ text: systemInstructions }]
    },
    ...history.map(item => ({
      role: item.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: item.content || '' }]
    })),
    {
      role: 'user',
      parts: [{ text: message }]
    }
  ];

  // Dynamic fallback order: 3.8-flash -> 2.5-flash -> 1.5-flash
  const modelsToTry = [
    'gemini-2.5-flash',
    'gemini-1.5-flash'
  ];

  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: formattedContents,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 600
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Model ${model} returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        return res.status(200).json({ reply: generatedText, modelUsed: model });
      }
    } catch (err) {
      lastError = err;
      console.warn(`[License Saathi] Fallback triggered from ${model}:`, err.message);
    }
  }

  return res.status(500).json({
    reply: lang === 'gu'
      ? 'ક્ષમા કરશો, AI સર્વિસ હાલમાં વ્યસ્ત છે. કૃપા કરીને થોડી સેકન્ડો પછી ફરી પ્રયાસ કરો.'
      : lang === 'hi'
      ? 'क्षमा करें, AI सेवा अभी व्यस्त है। कृपया कुछ सेकंड बाद पुनः प्रयास करें।'
      : 'Our AI assistant is momentarily overloaded. Please try asking again in a few seconds.',
    details: lastError?.message
  });
});

// ==========================================
// 3. PRODUCTION STATIC ASSETS & SPA ROUTING
// ==========================================
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[License Saathi] Server running on port ${PORT}`);
});