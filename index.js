import express from 'express';
import dotenv from 'dotenv'
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001

app.use(express.json());
app.get('/auth', (req,res) => {
    res.status(200).json({
        message: "hello from auth Service"
    })
})

app.listen('/', () => {
    console.log(`server is running on port ${PORT}`)
})