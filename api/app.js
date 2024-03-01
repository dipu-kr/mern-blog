import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// { limit: "20kb" }
// { extended: true, limit: "20kb" }
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

// routes declaration
app.use("/api/v1/users", authRouter);
app.use("/api/v1/users", userRouter);

export { app };
