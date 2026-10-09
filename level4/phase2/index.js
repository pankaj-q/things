import express from 'express'
import dotenv from 'dotenv'
import { ChatGroq } from '@langchain/groq';
dotenv.config();
import { PDFParse } from 'pdf-parse';
import fs from 'fs'
import { RecursiveCharacterTextSplitter, SupportedTextSplitterLanguages } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import {QdrantVectorStore} from '@langchain/qdrant'
const app = express();
const PORT = process.env.PORT || 7000

app.use(express.json());

const llm = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 2,
  maxTokens: undefined,
  maxRetries: 2,
})


const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "gemini-embedding-001", // 768 dimensions
  taskType: TaskType.RETRIEVAL_DOCUMENT,
  title: "Document title",
});

const vectorStore  = await QdrantVectorStore.fromExistingCollection(embeddings,{
    url:process.env.QDRANT_URL,
    collectionName:"Pankaj-RAG"
})

const uploadPDF=async() => {
    const pdf = "./Rag.pdf"  
    const buffer = fs.readFileSync(pdf);
    const pdfResult= new PDFParse({data:buffer});
    const Result= await pdfResult.getText();
    const text = Result.text;
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const docs = await splitter.createDocuments([text]);
    await vectorStore.addDocuments(docs);
}
uploadPDF();

app.get('/chat', async(req,res) => {
    const {input} = req.body;
    const response = await llm.invoke(input);
    res.status(200).json({
        success: true,
        Message:"Answer geneate successfully",
        content: response.content 
    })
})

app.listen(PORT, () => {
    console.log(`Server is runnning on port ${PORT}`)
})