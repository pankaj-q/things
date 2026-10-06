import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { ChatGroq } from "@langchain/groq";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(express.json());

// const ai = new GoogleGenAI({
//   apikey: process.env.GEMINI_API_KEY,
// });

// app.post("/chat", async (req, res) => {
//   const { message } = req.body;
//   const response = await ai.models.generateContent({
//     model: "gemini-3.8-flash",
//     systemInstruction: {
//         parts: [
//             {
//                 text: "You are an assistant and you name is Astra. If you don't the answer don't give the wrong answer"
//             }
//         ]
//     },
//     contents: [
//         {
//             role: "user",
//             parts: [
//                 {
//                     text: message,
//                 },
//             ],
//         },
//     ],
//   });
//   return res.status(201).json({
//     success: true,
//     message: "response genreated well done",
//     ai_response: response.text,
//   });
// });

const llm = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0.7,
  maxTokens: undefined,
  maxRetries: 2,
});

app.get('/ai-chat', async(req, res) => {
    const {input} = req.body;
    const response = await llm.invoke([
        {
            role:"system",
            content:"you are an assistant and your name is ASTRA. dont make false and fake assumption if you dont the answer."
        },
        {
            role:"human",
            content: input,
        }
    ]);
    res.status(200).json({
        success: "true",
        message: "answer generate successfully",
        "ai:": response.content
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

app.get("/", (req, res) => {
  return res.status(200).json({
    message: " Hello from level4 ",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
