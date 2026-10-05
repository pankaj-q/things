import express from 'express'
import dotenv from 'dotenv'
import proxy from 'express-http-proxy';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003

app.use(express.json())

app.get('/', (req, res) => {
    return res.json({
        message: "Hello from API Gateway"
    })
})
// api Gateway work as an middleware so we use this as app.use not app.get something okay
app.use("/auth", proxy("http://AuthService:8001"));
app.use("/order", proxy("http://ORderService:8002"));
app.use("/prodcut", proxy("http://PorductService:8003"));

app.listen('PORT', () => {
    console.log(`server is running on port ${PORT}`)
})