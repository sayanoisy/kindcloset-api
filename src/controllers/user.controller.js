import { StatusCodes } from "http-status-codes";
import ResponseHandler from "../utils/ResponseHandler.js";
import userService from "../services/userAuth.service.js";
import Messages from "../utils/Messages.js";

const signup = async (req, res, next) => {
  try {
    const { name, phoneNumber } = req.body;
    const data = await userService.signup(name, phoneNumber);
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

const login = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const data = await userService.login(phoneNumber);
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
const loginOtpGenerator = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const data = await userService.loginOtpGenerator(phoneNumber);
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
const userController = {
  signup,
  login,
  loginOtpGenerator,
};
export default userController;
