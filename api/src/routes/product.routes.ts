import express from "express";
import * as productController from "../controllers/product.controller";
// import CheckJWT from "../middleware/checkJWT";

const router = express.Router();

router.post("/add-product", productController.addProduct);
router.get("/get-all-products", productController.getAllProducts);
router.post("/record-sold-product", productController.recordSoldProduct);
router.post(
  "/check-if-product-is-sold",
  productController.checkIfProductIsSold
);
router.get("/get-all-product-names", productController.getAllProductNames);
router.get("/check-warranty", productController.checkIfWarranty);
router.get("/mark-warranty", productController.markWarranty);
router.post("/notify-seller", productController.notifySeller);

module.exports = router;
