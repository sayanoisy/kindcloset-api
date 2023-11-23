import { StatusCodes } from "http-status-codes";
import ResponseHandler from "../utils/ResponseHandler.js";
import userAuthService from "../services/userAuth.service.js";
import Messages from "../utils/Messages.js";

const signIn = async (req, res, next) => {
  try {
    const { phoneNumber, otp } = req.body;
    const data = await userAuthService.signIn(phoneNumber, otp);
    req.session = {
      jwt: data.token,
    };
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

const logout = async (req, res, next) => {
  try {
    req.session = null;
    const response = ResponseHandler(
      StatusCodes.OK,
      Messages.SUCCESS,
      "Succesfully logged out"
    );
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const otpGenerator = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const data = await userAuthService.otpGenerator(phoneNumber);
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
const userAuthController = {
  signIn,
  otpGenerator,
  logout,
};
export default userAuthController;
