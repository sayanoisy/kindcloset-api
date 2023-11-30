import { Router } from "express";
import adminCharityRouter from "./charity.js";
const adminApiRouter = Router();

adminApiRouter.use("/charity", adminCharityRouter);

export default adminApiRouter;
