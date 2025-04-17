import express from 'express';
import fetch from 'node-fetch'; // install it using: npm install node-fetch
import cors from 'cors';

const app = express();
const PORT = 3000;

// Use your **new** API key here (not the old one you posted)
const GEMINI_API_KEY = "YOUR_NEW_API_KEY";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// Middleware
app.use(cors());
app.use(express.json());

// Route to handle chat messages
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
