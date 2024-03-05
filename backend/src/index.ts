import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'
import 'dotenv/config'

const app = express();

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(cookieParser())


const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
    res.send({ message: "Hola amigo!!! This is the server for my PortFolio" })
});

app.listen(port, () => {
    console.log(`Server is conncted to port:${port}`)
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => {
        console.log("Connected to your DB");
    })
    .catch((error) => (console.log("Connection Failed!!", error)));