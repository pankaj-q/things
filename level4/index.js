import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005

app.use(express.json());

app.get('/',(req, res) => {
    return res.status(200).json({
        message: " Hello from level4 "
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})