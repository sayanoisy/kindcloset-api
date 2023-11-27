import { Router } from "express";
import userRouter from "./user.js";
import profileRouter from "./profile.js";
import charityRouter from "./charity.js";
const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/profile", profileRouter);
apiRouter.use("/charity", charityRouter);

export default apiRouter;
