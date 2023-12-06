import { Router } from "express";
import ValidateSchema from "../../utils/ValidateSchema.js";
import itemController from "../../controllers/item.controller.js";
import ItemValidatorSchema from "../../validators/item.validator.js";
const itemRouter = Router();

itemRouter.get("/get", itemController.getAllItems);
itemRouter.get("/get/active", itemController.getAllActiveItems);
itemRouter.get("/get/where/:id", itemController.getItemById);
itemRouter.get("/get/user", itemController.getItemByUserId);
itemRouter.post(
  "/save",
  ValidateSchema(ItemValidatorSchema),
  itemController.saveItem
);
itemRouter.put("/update/:id", itemController.updateItem);
itemRouter.delete("/delete/:id", itemController.deleteItem);

export default itemRouter;
