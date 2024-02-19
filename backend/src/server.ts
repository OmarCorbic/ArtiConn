import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express from "express";
const app = express();

import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user";
import authRouter from "./routes/auth";
import adsRouter from "./routes/ads";

import errorHandler from "./middleware/error-handler";
import authorizeUser from "./middleware/authorization";

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/ads", adsRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
