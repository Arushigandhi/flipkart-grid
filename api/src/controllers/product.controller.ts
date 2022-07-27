import { Request, Response } from "express";
import ProductModel from "../models/product.model";
import UserModel from "../models/user.model";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      isPublic,
      description,
      quantity,
      sellPrice,
      releaseDate,
      images,
    } = req.body;
    const sellerData = await UserModel.findOne({ _id: res.locals.uid });
    if (sellerData && sellerData.isSeller === false) {
      return res.status(400).json({ message: "ERROR_OCCURED_NOT_A_SELLER" });
    }
    const product = new ProductModel({
      name,
      isPublic,
      sellerId: res.locals.uid,
      description,
      quantity,
      sellPrice,
      releaseDate,
      images,
    });
    await product.save();
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "UNKNOWN SERVER ERROR",
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    console.log(products);
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "UNKNOWN_SERVER_ERROR",
    });
  }
};
