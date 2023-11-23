import { StatusCodes } from "http-status-codes";
import ResponseHandler from "../utils/ResponseHandler.js";
import userService from "../services/user.service.js";
import Messages from "../utils/Messages.js";

const getAllUsers = async (req, res, next) => {
  try {
    const data = await userService.getAllUsers();
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await userService.getUserById(id);
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const getUserByPhoneNumber = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const data = await userService.getUserByPhoneNumber(phoneNumber);
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const saveUser = async (req, res, next) => {
  try {
    const data = await userService.saveUser(req.body);
    const response = ResponseHandler(
      StatusCodes.CREATED,
      Messages.SUCCESS,
      data
    );
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const updateUserName = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = await userService.updateUserName(id, name);
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const updatePhoneNumber = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { phoneNumber } = req.body;
    const data = await userService.updatePhoneNumber(id, phoneNumber);
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const userController = {
  getAllUsers,
  getUserById,
  getUserByPhoneNumber,
  saveUser,
  updateUserName,
  updatePhoneNumber,
};
export default userController;
