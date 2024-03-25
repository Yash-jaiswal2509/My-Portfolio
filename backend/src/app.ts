import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

import userRouter from "./routes/user.routes";

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hola amigo!!! This is the server for my PortFolio" });
});

app.use("/api/v1/users", userRouter);

export { app };
