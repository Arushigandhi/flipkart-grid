import express from "express";
import * as productController from "../controllers/product.controller";
const router = express.Router();

router.post("/add-product", productController.addProduct);
router.get("/get-all-products", productController.getAllProducts);
router.post("/record-sold-product", productController.recordSoldProduct);
router.post(
  "/check-if-product-is-sold",
  productController.checkIfProductIsSold
);
router.get("/get-all-product-names", productController.getAllProductNames);

module.exports = router;
