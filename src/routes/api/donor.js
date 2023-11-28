import { Router } from "express";
import ValidateSchema from "../../utils/ValidateSchema.js";
import donorController from "../../controllers/donor.controller.js";
import DonorValidatorSchema from "../../validators/donor.validator.js";

const donorRouter = Router();

donorRouter.get("/get", donorController.getAllDonors);
donorRouter.get("/get/where/:id", donorController.getDonorById);
donorRouter.get("/get/user", donorController.getDonorByUserId);
donorRouter.post(
  "/save",
  ValidateSchema(DonorValidatorSchema),
  donorController.saveDonor
);
donorRouter.put("/update/:id", donorController.updateDonor);
donorRouter.delete("/delete/:id", donorController.deleteDonor);

export default donorRouter;
