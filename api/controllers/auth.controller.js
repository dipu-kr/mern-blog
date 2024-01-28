import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res
        .status(400)
        .json({ message: "User already exists!", status: 400 });
    } else {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      return res
        .status(201)
        .json({ message: "Registration successful!", status: 201 });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error!", status: 500 });
  }
};

// SignIn method here

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return res.status(400).json({ message: "User not found!", status: 400 });
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Invalid email or password!", status: 400 });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({ data: rest, status: 200, message: "Successfully Sign In!" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error!", status: 500 });
  }
};
