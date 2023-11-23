import { Router } from "express";
import userController from "../../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/get", userController.getAllUsers);
userRouter.get("/get/:id", userController.getUserById);
userRouter.post("/get", userController.getUserByPhoneNumber);
userRouter.post("/save", userController.saveUser);
userRouter.put("/update/name/:id", userController.updateUserName);
userRouter.put("/update/number/:id", userController.updatePhoneNumber);

export default userRouter;
