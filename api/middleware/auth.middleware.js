import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  // console.log("headers", req.body.headers);
  try {
    const token =
      req.cookies?.access_token ||
      req.body.headers.Authorization?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ status: 401, message: "Unauthorized request" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      res.status(401).json({ status: 401, message: "Invalid Access Token" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "token expired",
    });
  }
};
