import { Router } from "express";
import charityController from "../../controllers/charity.controller.js";
import ValidateSchema from "../../utils/ValidateSchema.js";
import CharityValidatorSchema from "../../validators/charity.validator.js";

const charityRouter = Router();

charityRouter.get("/get", charityController.getAllCharities);
charityRouter.get("/get/active", charityController.getAllActiveCharities);
charityRouter.get("/get/where/:id", charityController.getCharityById);
charityRouter.get("/get/user", charityController.getCharityByUserId);
charityRouter.post("/get/org", charityController.getCharityByOrganizationName);
charityRouter.post(
  "/save",
  ValidateSchema(CharityValidatorSchema),
  charityController.saveCharity
);
charityRouter.put("/update/:id", charityController.updateCharity);
charityRouter.delete("/delete/:id", charityController.deleteCharity);

export default charityRouter;
