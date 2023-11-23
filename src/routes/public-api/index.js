import { Router } from "express";
import userAuthRouter from "./userAuth.js";
const publicApiRouter = Router();

publicApiRouter.use("/auth", userAuthRouter);

export default publicApiRouter;
