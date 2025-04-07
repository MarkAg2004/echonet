
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/api/echo', async (req, res) => {
    const userEcho = req.body.echo;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'Ты — эмпатичный резонанс, отражающий чувства человека, без оценок и советов.' },
                    { role: 'user', content: userEcho }
                ],
                max_tokens: 150,
                temperature: 0.8
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const echoResponse = response.data.choices[0].message.content;
        res.json({ reply: echoResponse });
    } catch (error) {
        console.error('Ошибка при обработке эхо:', error);
        res.status(500).json({ error: 'Ошибка при обработке эхо.' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`EchoNet сервер запущен на порту ${PORT}`);
});
