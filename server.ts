import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { OutfitConfig, CulturalAssessment } from './src/types';
import {
  OCCASIONS,
  GARMENTS,
  FABRICS,
  COLORS,
  HEADPIECES,
  JEWELRIES,
  HANDHELDS,
  FOOTWEARS,
  evaluateCulturalOutfit,
} from './src/data/fashionData';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API endpoint: Cultural assessment & AI consultation
app.post('/api/consult', async (req, res) => {
  const { config, userNote } = req.body as { config: OutfitConfig; userNote?: string };

  if (!config) {
    return res.status(400).json({ error: 'Missing outfit configuration' });
  }

  // Fast path or fallback using local historical cultural evaluator
  const localEval = evaluateCulturalOutfit(config);

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY') {
    return res.json(localEval);
  }

  const occ = OCCASIONS.find(o => o.id === config.occasionId) || OCCASIONS[0];
  const garment = GARMENTS.find(g => g.id === config.garmentId) || GARMENTS[0];
  const col = COLORS.find(c => c.id === config.colorId) || COLORS[0];
  const fab = FABRICS.find(f => f.id === config.fabricId) || FABRICS[0];
  const head = HEADPIECES.find(h => h.id === config.headpieceId) || HEADPIECES[0];
  const jew = JEWELRIES.find(j => j.id === config.jewelryId) || JEWELRIES[0];
  const item = HANDHELDS.find(h => h.id === config.handheldId) || HANDHELDS[0];
  const shoe = FOOTWEARS.find(s => s.id === config.footwearId) || FOOTWEARS[0];

  try {
    const prompt = `
Bạn là chuyên gia cố vấn văn hóa & thời trang Việt phục di sản (Sắc Việt Remix).
Đánh giá bản phối trang phục sau:
- Y phục: ${garment.name} (${garment.dynasty}, ${garment.century}, ${garment.formality})
- Dịp mặc: ${occ.name}
- Chất liệu: ${fab.name} (Hành ${fab.element})
- Sắc màu: ${col.name} (Hành ${col.element})
- Phụ kiện đầu: ${head.name}
- Trang sức: ${jew.name}
- Cầm tay: ${item.name}
- Giày dép: ${shoe.name}
${userNote ? `- Yêu cầu thêm: "${userNote}"` : ''}

Yêu cầu trả về JSON:
- harmonyScore (float 0.0 - 10.0)
- traditionStatus ("safe", "caution", hoặc "warning")
- traditionLabel (string ngắn gọn: ví dụ "Chuẩn mực văn hóa ✅", "Phá cách Gen Z ⚡", "Cần lưu ý ⚠️")
- quickAdvice (1 câu ngắn súc tích, ít chữ)
- hasViolation (boolean)
- alertMessage (nếu vi phạm lễ nghi, đưa ra cảnh báo 1 câu)
`;

    const geminiPromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Bạn là chuyên gia cố vấn Việt phục cho thế hệ trẻ, phản hồi cực kỳ súc tích, ít chữ, chuẩn xác theo định dạng JSON.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            harmonyScore: { type: Type.NUMBER },
            traditionStatus: { type: Type.STRING },
            traditionLabel: { type: Type.STRING },
            quickAdvice: { type: Type.STRING },
            hasViolation: { type: Type.BOOLEAN },
            alertMessage: { type: Type.STRING },
          },
          required: ['harmonyScore', 'traditionStatus', 'traditionLabel', 'quickAdvice', 'hasViolation'],
        },
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 4000)
    );

    const response = await Promise.race([geminiPromise, timeoutPromise]);
    const parsed = JSON.parse(response.text || '{}');

    const result: CulturalAssessment = {
      harmonyScore: parsed.harmonyScore || localEval.harmonyScore,
      traditionStatus: parsed.traditionStatus || localEval.traditionStatus,
      traditionLabel: parsed.traditionLabel || localEval.traditionLabel,
      quickAdvice: parsed.quickAdvice || localEval.quickAdvice,
      hasViolation: parsed.hasViolation ?? localEval.hasViolation,
      alertMessage: parsed.alertMessage || localEval.alertMessage,
      historicalContext: localEval.historicalContext,
    };

    return res.json(result);
  } catch (err) {
    return res.json(localEval);
  }
});

// Setup Vite or static serving
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const port = 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Sắc Việt Remix Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
