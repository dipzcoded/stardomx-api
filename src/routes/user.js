import express from "express";
import { signUp } from "../controllers/users/index.js";
const router = express.Router();
router.route("/signup").post(signUp);
export default router;