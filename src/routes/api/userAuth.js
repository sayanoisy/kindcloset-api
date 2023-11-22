import { Router } from "express";
import userAuthController from "../../controllers/user.auth.controller.js";
import ValidateSchema from "../../utils/ValidateSchema.js";
import SignInValidatorSchema from "../../validators/signIn.validator.js";
import generateOtpValidatorSchema from "../../validators/generate-otp.validator.js";

const userAuthRouter = Router();

userAuthRouter.post(
  "/signin",
  ValidateSchema(SignInValidatorSchema),
  userAuthController.signIn
);

userAuthRouter.post(
  "/generate/otp",
   ValidateSchema(generateOtpValidatorSchema),
   userAuthController.otpGenerator
);

export default userAuthRouter;
