import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoutes";

import logger from "../shared/utils/logger";
import { connectDB } from "../config/database";
import { errorHandler } from "../middlewares/errorHandler";

const app = express();

//config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

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

app.use(errorHandler);
export default app;
