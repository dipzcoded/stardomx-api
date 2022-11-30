import express from "express";
import { signUp, signIn, getCurrentUser } from "../controllers/users/index.js";
import { jwtExtractMiddleware } from "../middlewares/index.js";
const router = express.Router();
router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.use(jwtExtractMiddleware);
router.route("/currentuser").get(getCurrentUser);
export default router;
