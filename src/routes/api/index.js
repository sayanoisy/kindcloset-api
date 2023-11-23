import { Router } from "express";
import userRouter from "./user.js";
import profileRouter from "./profile.js";
const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/profile", profileRouter);

export default apiRouter;
