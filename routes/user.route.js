import express from "express";
import {  signupOrLogin } from "../controllers/user.controller.js";
import { isLogin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup",isLogin, signupOrLogin);

export default router;
