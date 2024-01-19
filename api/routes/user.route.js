import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Api is working");
});

export default router;
