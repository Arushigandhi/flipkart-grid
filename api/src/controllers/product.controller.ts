import { setDefaultResultOrder } from "dns";
import { Request, Response } from "express";
import ProductModel from "../models/product.model";
import SoldProductModel from "../models/soldProduct.model";
import UserModel from "../models/user.model";
import RequestModel from "../models/requests.model";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      isPublic,
      sellerId,
      description,
      sellPrice,
      releaseDate,
      images,
      quantity,
      extensionPrice,
    } = req.body;
    const product = new ProductModel({
      name,
      isPublic,
      sellerId,
      description,
      sellPrice,
      releaseDate,
      images,
      quantity,
      extensionPrice,
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
    const products = await ProductModel.find({
      sellerId: req.body.sellerId,
    });
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
    const {
      productName,
      productId,
      buyerEmail,
      buyerName,
      sno,
      phoneNumber,
      sellerId,
    } = req.body;
    const product = await ProductModel.findOne({ _id: productId });
    if (!product) {
      return res.status(400).json({ message: "PRODUCT_NOT_FOUND" });
    }
    const soldProduct = new SoldProductModel({
      sellerId: sellerId,
      product: productId,
      // productName: productName,
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

export const getAllProductNames = async (req: Request, res: Response) => {
  try {
    const productNames = await ProductModel.find({}, "name");
    return res.status(200).json({
      success: true,
      productNames,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "UNKNOWN_SERVER_ERROR",
    });
  }
};

export const checkIfWarranty = async (req: Request, res: Response) => {
  try {
    const product = await SoldProductModel.findOne({
      sno: req.body.serialNo,
    });
    if (!product) {
      return res.status(400).json({ message: "PRODUCT_NOT_FOUND" });
    }
    return res.status(200).json({
      success: true,
      hasWarranty: product.hasWarranty,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "UNKNOWN_SERVER_ERROR",
    });
  }
};

export const markWarranty = async (req: Request, res: Response) => {
  try {
    const product = await SoldProductModel.findOne({
      sno: req.body.serialNo,
    });
    if (!product) {
      return res.status(400).json({ message: "PRODUCT_NOT_FOUND" });
    }
    product.hasWarranty = true;
    await product.save();
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "UNKNOWN_SERVER_ERROR",
    });
  }
};

export const notifySeller = async (req: Request, res: Response) => {
  try {
    const { service, sno, address, buyerId } = req.body;
    const product = await SoldProductModel.findOne({
      sno: sno,
    });
    if (!product) {
      return res.status(400).json({ message: "PRODUCT_NOT_FOUND" });
    }
    const user = await UserModel.findById(product.sellerId);
    if (!user) {
      return res.status(400).json({ message: "USER_NOT_FOUND" });
    }
    const buyer = await UserModel.findById(buyerId);
    if (!buyer) {
      return res.status(400).json({ message: "USER_NOT_FOUND" });
    }
    user.notifications.push({
      service: service,
      address: address,
      sno: sno,
    });
    await user.save();
    const request = new RequestModel({
      service: service,
      address: address,
      sno: sno,
      buyerEmail: buyer.email,
      buyerName: buyer.firstName + " " + buyer.lastName,
      sellerId: product.sellerId,
      buyerId: buyerId,
    });
    await request.save();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "UNKNOWN_SERVER_ERROR",
    });
  }
};

export const getAllRequests = async (req: Request, res: Response) => {
  try {
    const requests = await RequestModel.find({
      sellerId: req.body.sellerId,
    });
    return res.status(200).json({
      success: true,
      requests,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "UNKNOWN_SERVER_ERROR",
    });
  }
};

export const getMyRequests = async (req: Request, res: Response) => {
  try {
    const requests = await RequestModel.find({
      buyerId: req.body.buyerId,
    });
    return res.status(200).json({
      success: true,
      requests,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "UNKNOWN_SERVER_ERROR",
    });
  }
};
