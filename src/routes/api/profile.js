import { Router } from "express";
import userAuthController from "../../controllers/user.auth.controller.js";

const profileRouter = Router();

profileRouter.get("/logout", userAuthController.logout);

export default profileRouter;
