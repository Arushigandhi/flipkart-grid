import { setDefaultResultOrder } from "dns";
import { Request, Response } from "express";
import ProductModel from "../models/product.model";
import SoldProductModel from "../models/soldProduct.model";
import UserModel from "../models/user.model";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, isPublic, description, sellPrice, releaseDate, images } =
      req.body;
    const sellerData = await UserModel.findOne({ _id: res.locals.uid });
    if (sellerData && sellerData.isSeller === false) {
      return res.status(400).json({ message: "ERROR_OCCURED_NOT_A_SELLER" });
    }
    const product = new ProductModel({
      name,
      isPublic,
      sellerId: res.locals.uid,
      description,
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

export const recordSoldProduct = async (req: Request, res: Response) => {
  try {
    const { productId, buyerEmail, buyerName, sno, phoneNumber, sellerId } =
      req.body;
    const product = await ProductModel.findOne({ _id: productId });
    if (!product) {
      return res.status(400).json({ message: "PRODUCT_NOT_FOUND" });
    }
    const soldProduct = new SoldProductModel({
      sellerId: sellerId,
      product: productId,
      buyerEmail,
      buyerName,
      sno,
      phoneNumber,
    });
    await soldProduct.save();
    return res.status(200).json({
      success: true,
      soldProduct,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "UNKNOWN_SERVER_ERROR",
    });
  }
};

export const checkIfProductIsSold = async (req: Request, res: Response) => {
  try {
    const { serialNo, buyerName, buyerEmail } = req.body;
    // find the product with the serialNo
    const soldProduct = await SoldProductModel.findOne({
      sno: serialNo,
      buyerName,
      buyerEmail,
    });
    if (!soldProduct) {
      return res.status(400).json({ message: "PRODUCT_NOT_FOUND" });
    }
    const product = await ProductModel.findOne({ _id: soldProduct.product });
    if (!product) {
      return res.status(400).json({ message: "PRODUCT_NOT_FOUND" });
    }

    const seller = await UserModel.findOne({ _id: soldProduct.sellerId });

    const result = {
      product,
      seller,
      soldProduct,
    };
    return res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "UNKNOWN_SERVER_ERROR",
    });
  }
};
