import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

app.use(express.json());

app.get('/product', (req, res) => {
    return res.status(200).json({
        message: "Hello from product Service"
    })
})

app.listen('PORT', () => {
    console.log(`server is running on port ${PORT}`)
})