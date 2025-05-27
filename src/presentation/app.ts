import express from "express";
import morgan from "morgan";

import { connectDB } from "../config/database";
import logger from "../utils/logger";

export const app = express();

app.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

connectDB();
