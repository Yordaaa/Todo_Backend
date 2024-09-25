import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";
import { hashedPassword } from "../utils/hashPassword.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcrypt from "bcryptjs";
import { issueJWT } from "../utils/sighToken.js";

//Register new user
export const registerUser = async (req, res, next) => {
  const { name, password } = req.body;
  console.log(req.body);
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      const errorMessage = error.errors.map((err) => err.msg);
      return next(new errorHandler(errorMessage[0], 400));
    }
    const hashedP = await hashedPassword(password);

    await new userModel({
      name,
      password: hashedP,
    }).save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

//user signin
export const signin = async (req, res, next) => {
  const { name, password } = req.body;
  console.log(req.body.name, req.body.password);
  try {
    const user = await userModel.findOne({ name });

    if (!user) {
      return next(new errorHandler("Invalid Name or password", 401));
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new errorHandler("Invalid Name or password", 401));
    }
    const issuedToken = issueJWT(user._id.toString());

    const { password: pass, ...userInfo } = user._doc;

    res
      .cookie("access_token", issuedToken, { httpOnly: true })
      .status(200)
      .json({ success: true, userInfo });
  } catch (error) {
    next(error);
  }
};

// User sign-out
export const signOut = async (req, res) => {
  res.cookie("access_token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "Successfully signed out" });
};
