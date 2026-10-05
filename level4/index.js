import express from 'express'
import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005

app.use(express.json());

const ai = new GoogleGenAI({
  apikey: process.env.GEMINI_API_KEY,
});

app.post('/chat', async(req, res) => {
    const {message} = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message,
    });
    return res.status(200).json({
       message: "response genreated well done",
       "ai:":response.text
    })
})

// const main = async () => {
//     const response = await ai.models.generateContent({
//         model: "gemini-3.5-flash",
//         contents: "Hello from Gemini"
//     })
//     console.log(response.text);
// }
// main();

app.get('/',(req, res) => {
    return res.status(200).json({
        message: " Hello from level4 "
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})