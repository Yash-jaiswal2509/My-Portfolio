import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes";
import projectRouter from "./routes/project.routes";

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

app.get("/", async (req: Request, res: Response) => {
  res.send({ message: "Hola amigo!!! This is the server for my PortFolio" });
});

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health ok!" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);

export { app };
