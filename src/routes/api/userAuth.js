import { Router } from "express";
import userController from "../../controllers/user.controller.js";
import ValidateSchema from "../../utils/ValidateSchema.js";
import SignupValidatorSchema from "../../validators/signup.validator.js";
import LoginValidatorSchema from "../../validators/login.validator.js";

const userRouter = Router();

userRouter.post(
  "/signup",
  ValidateSchema(SignupValidatorSchema),
  userController.signup
);
userRouter.post(
  "/login",
  ValidateSchema(LoginValidatorSchema),
  userController.login
);
userRouter.post(
  "/generate/otp",
  // ValidateSchema(LoginValidatorSchema),
  userController.loginOtpGenerator
);
export default userRouter;
