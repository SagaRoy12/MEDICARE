import express from "express"
import cors from "cors"
import dotenv from "dotenv"
//import cookieParser from "cookie-parser"
import connectDB from "./src/config/database.config.js"
dotenv.config();
const app = express()


const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use(cookieParser()) 




connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});

