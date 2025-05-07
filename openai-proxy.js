const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = 'AIzaSyB2dfVOtS25sNyXJqk-u-wON-htJwqFMeY';
const GEMINI_MODEL = 'gemini-2.0-flash';

app.post('/api/openai', async (req, res) => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: req.body.messages.map(m => m.content).join('\n') }
            ]
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    // Adapt Gemini's response to your frontend's expected format
    res.json({
      choices: [
        {
          message: {
            content: data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't find an answer."
          }
        }
      ]
    });
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Proxy error', 
      details: error.message,
      fallback: true
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
}); 