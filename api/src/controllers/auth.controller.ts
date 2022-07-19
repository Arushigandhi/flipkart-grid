const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
import { Request, Response } from "express";

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Required values not provided!",
      });
    }

    let jwtHash = process.env.JWT_TOKEN_USER;
    const user = await UserModel.findOne({
      email,
      verified: true,
    });
    const check = await user.MatchPassword(password);
    if (!check) {
      return res.status(400).json({
        success: false,
        message: "Unknown server error!",
      });
    }

    // const userData = await user.GetUserData();
    const token = jwt.sign(user.toJSON(), jwtHash, {
      expiresIn: "10h",
    });
    return res.status(200).json({
      success: true,
      user,
      token,
      //   userData: userData,
    });
  } catch (err) {
    console.log("ERROR");
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "UNKNOWN_SERVER_ERROR",
    });
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const emailCheck = await UserModel.findOne({
      email,
    });

    if (emailCheck && emailCheck.length !== 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists!",
      });
    }
    const newUser = new UserModel(req.body);

    await newUser.save();

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("ERROR");
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "UNKNOWN_SERVER_ERROR",
    });
  }
};
