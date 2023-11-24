import { Router } from "express";
import userAuthController from "../../controllers/user.auth.controller.js";
import profileController from "../../controllers/profile.controller.js";

const profileRouter = Router();

profileRouter.get("/logout", userAuthController.logout);
profileRouter.post(
  "/change/number",
  profileController.updatePhoneNumbervalidation
);

export default profileRouter;
