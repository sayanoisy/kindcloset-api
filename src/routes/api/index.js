import { Router } from "express";
import userRouter from "./user.js";
const apiRouter = Router();

apiRouter.use("/user", userRouter);

export default apiRouter;
