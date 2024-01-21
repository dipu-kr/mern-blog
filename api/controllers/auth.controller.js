import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

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
    return res.status(400).json({ message: "All field are required" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "User already exist!", status: 400 });
    } else {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res
        .status(201)
        .json({ message: "Registraion Successfull!", status: 201 });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error!", statsu: 500 });
  }
};
