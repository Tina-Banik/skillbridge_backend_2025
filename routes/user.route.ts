import { Router } from "express";
import { body } from "express-validator";
const authRoute = Router();
import { login, register, showUser } from "../controllers/user.controller";
import { verifyAccessToken } from "../middlewares/auth.midleware";
authRoute.post("/admin-register",[
     body("username")
      .notEmpty().withMessage("Username is required")
      .isLength({ min: 3 }).withMessage("Username must be at least 3 chars long"),
    body("email")
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Must be a valid email"),
    body("password")
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 chars long"),
    body("role")
      .optional()
      .isIn(["ADMIN", "USER"]).withMessage("Role must be either ADMIN or USER"),
],register);
authRoute.post("/admin-login",login);
authRoute.get("/admin-profile",verifyAccessToken,showUser);
export default authRoute;