import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
require("dotenv").config();

export const signIn = async (req: Request, res: Response) => {
  try {
    const jwtHash = process.env.JWT_TOKEN_USER;
    if(!jwtHash) {
      return res.status(400).json({
        message: "JWT_TOKEN_USER is not defined in .env file"
      });
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Required values not provided!",
      });
    }
    const user = await UserModel.findOne({
      email,
      verified: true,
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }
    const check = await user.MatchPassword(password);
    if (!check) {
      return res.status(400).json({
        success: false,
        message: "Unknown server error!",
      });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, jwtHash, { expiresIn: 360000 });
    return res.status(200).json({
      success: true,
      user,
      token,
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

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const emailCheck = await UserModel.findOne({
      email,
    });

    if (emailCheck && emailCheck.email.length !== 0) {
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
