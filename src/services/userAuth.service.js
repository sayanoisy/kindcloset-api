import { StatusCodes } from "http-status-codes";
import Messages from "../utils/Messages.js";
import user from "../models/user.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/index.js";
import generateOtpAndSend from "../utils/GenerateOtp.js";

const signup = async (name, phoneNumber) => {
  const userCheck = await user.findOne({ phoneNumber: phoneNumber });
  if (userCheck) {
    ErrorHandler(StatusCodes.FORBIDDEN, Messages.USER_EXISTS);
  }
  const newUser = new user({ name, phoneNumber });
  await newUser.save();
  const token = jwt.sign(
    {
      name: name,
      phoneNumber: phoneNumber,
    },
    JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
  return { newUser, token };
};

const loginOtpGenerator = async (phoneNumber) => {
  const userCheck = await user.findOne({ phoneNumber: phoneNumber });
  if (!userCheck) {
    ErrorHandler(StatusCodes.FORBIDDEN, Messages.USER_DOES_NOT_EXIST);
  }
  return await generateOtpAndSend(phoneNumber);
};

const login = async (phoneNumber) => {
  const userCheck = await user.findOne({ phoneNumber: phoneNumber });
  if (!userCheck) {
    ErrorHandler(StatusCodes.FORBIDDEN, Messages.USER_DOES_NOT_EXIST);
  }
  const token = jwt.sign(
    {
      name: userCheck.name,
      phoneNumber: userCheck.phoneNumber,
    },
    JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
  return { token };
};
const userService = {
  signup,
  login,
  loginOtpGenerator,
};
export default userService;
