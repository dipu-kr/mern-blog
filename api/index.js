import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

app.get("/", (req, res) => {
  res.send("hello api");
});
app.listen(process.env.PORT, () => {
  console.log(`server is running on port: ${process.env.PORT}`);
});
