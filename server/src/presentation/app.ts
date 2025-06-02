import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
import authRouter from "./routes/authRoutes";
import blogRouter from "./routes/blogRoutes";
import profileRouter from "./routes/profileRoutes";

import logger from "../shared/utils/logger";
import { connectDB } from "../config/database";
import { errorHandler } from "../middlewares/errorHandler";

const app = express();

//config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

connectDB();

//routes
app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/profile", profileRouter);
app.use(errorHandler);
export default app;
