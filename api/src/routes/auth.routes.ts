import express from "express";
import * as authController from "../controllers/auth.controller";
const router = express.Router();

router.post("/sign-in", authController.signIn);
router.post("/sign-up", authController.signUp);

module.exports = router;
