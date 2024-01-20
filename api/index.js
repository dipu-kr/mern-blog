import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log("Mongodb connected!");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port: ${process.env.PORT}`);
});
