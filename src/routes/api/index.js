import { Router } from "express";
import userRouter from "./user.js";
import profileRouter from "./profile.js";
import charityRouter from "./charity.js";
import donorRouter from "./donor.js";
import itemRouter from "./item.js";

const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/profile", profileRouter);
apiRouter.use("/charity", charityRouter);
apiRouter.use("/donor", donorRouter);
apiRouter.use("/item", itemRouter);

export default apiRouter;
