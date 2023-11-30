import { Router } from "express";
import charityController from "../../controllers/charity.controller.js";

const adminCharityRouter = Router();

adminCharityRouter.get("/approve/:id", charityController.approveCharity);

export default adminCharityRouter;
