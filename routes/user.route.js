import express from "express";
import {  signupOrLogin } from "../controllers/user.controller.js";
import { isAuthMiddleware, isLogin } from "../middleware/authMiddleware.js";
import { diaryEntries, getDiaryEntries } from "../controllers/diary.entries.model.js";

const router = express.Router();

router.post("/signup",isLogin, signupOrLogin);
router.post("/diary/entries",isAuthMiddleware, diaryEntries);
router.get("/diary/data",isAuthMiddleware, getDiaryEntries);

export default router;
