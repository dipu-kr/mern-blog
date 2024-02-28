import User from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();

    user.accessToken = accessToken;
    await user.save({ validateBeforeSave: false });

    return accessToken;
  } catch (error) {
    throw new Error(error.message);
  }
};

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
      const newUser = new User({
        username,
        email,
        password,
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

// SignIn method
export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return res.status(400).json({ message: "User not found!", status: 400 });
    }
    // compare password
    const validPassword = await validUser.isPasswordCorrect(password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Invalid email or password!", status: 400 });
    }
    // generate token
    if (validUser) {
      const token = await generateAccessAndRefreshTokens(validUser?._id);
      const { password: pass, ...rest } = validUser._doc;
      console.log("rest", rest);
      res.status(200).cookie("access_token", token, { httpOnly: true }).json({
        data: rest,
        // token: token,
        status: 200,
        message: "Successfully Sign In!",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error!", status: 500 });
  }
};

export const google = async (req, res) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const validUser = await User.findOne({ email: email });
    // check user exist or not
    if (validUser) {
      const token = await generateAccessAndRefreshTokens(validUser?._id);
      const userExist = await User.findById(validUser?._id);
      const { password, ...rest } = userExist._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json({ data: rest, status: 200 });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: generatedPassword,
        profilePicture: googlePhotoUrl,
      });
      const user = await newUser.save();
      if (user) {
        const token = await generateAccessAndRefreshTokens(user?._id);
        const userExist = await User.findById(user?._id);
        const { password, ...rest } = userExist?._doc;

        res
          .status(200)
          .cookie("access_token", token, { httpOnly: true })
          .json({ data: rest, status: 200 });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: "Server Error!", status: 500 });
  }
};

// logout method
export const logoutUser = async (req, res) => {
  // console.log(req.user._id);
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        accessToken: null,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      status: 200,
      data: null,
      message: "User logged Out",
    });
};

// refresh token method
export const refreshAccessToken = async (req, res) => {
  const incommingRefreshToken =
    req.cookies.access_token ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!incommingRefreshToken) {
    res.status(401).json({ status: 401, message: "Unauthorized request" });
  }

  try {
    const decodedToken = jwt.verify(
      incommingRefreshToken,
      process.env.JWT_SECRET_KEY
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      res.status(401).json({ status: 401, message: "Invalid refresh Token" });
    }

    if (incommingRefreshToken !== user?.accessToken) {
      res
        .status(401)
        .json({ status: 401, message: "Refresh token is expired" });
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const accessToken = await generateAccessAndRefreshTokens(user._id);

    return res.status(200).cookie("access_token", accessToken, options).json({
      status: 200,
      token: accessToken,
      message: "access token refreshed",
    });
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: error?.message || "Invalid refresh token",
    });
  }
};
