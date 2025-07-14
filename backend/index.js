import express from 'express';
import qr from 'qr-image';
import cors from 'cors';

const app = express();
const PORT = 5000;

// middleware to parse JSON
app.use(cors());
app.use(express.json());


// Simple homepage route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Route to generate QR code
app.post('/generate', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  // generate QR image as PNG buffer
  const qrPng = qr.imageSync(text, { type: 'png' });

  // send as Base64 so frontend can display it
  const base64Image = Buffer.from(qrPng).toString('base64');
  res.json({ qrCode: `data:image/png;base64,${base64Image}` });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
