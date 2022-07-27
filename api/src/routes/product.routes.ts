import express from "express";
import * as productController from "../controllers/product.controller";
const router = express.Router();

router.post("/add-product", productController.addProduct);
router.get("/get-all-products", productController.getAllProducts);

module.exports = router;
