const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const API_KEY = "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"

app.post('/suggest', async (req, res) => {
  const { skills, experience, education } = req.body;

  const prompt = `You are an expert resume reviewer. 
Skills: ${skills} 
Experience: ${experience} 
Education: ${education}. 
Give clear suggestions to improve this resume.`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "mistralai/mixtral-8x7b-instruct", // free and powerful
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const suggestions = response.data.choices[0].message.content;
    res.json({ suggestions });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get suggestions" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
