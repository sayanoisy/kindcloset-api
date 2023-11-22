import { StatusCodes } from "http-status-codes";
import Messages from "../utils/Messages.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/index.js";
import generateOtpAndSend from "../utils/GenerateOtp.js";
import validateOtp from "../utils/ValidateOtp.js";

//only one function for both signUp and login
const signIn = async (phoneNumber, inputOtp) => {
  //validate the otp
  const otpValidator = await validateOtp(phoneNumber, inputOtp);
  if (!otpValidator) {
    throw new Error(Messages.INVALID_OTP);
  }
  //find the user in the database
  const userCheck = await User.findOne({ phoneNumber: phoneNumber });
  //if there is no user, create a new user and return a jwt
  if (!userCheck) {
    const newUser = new User({ name: "", phoneNumber });
    await newUser.save();
    const token = jwt.sign(
      {
        name: newUser.name,
        phoneNumber: newUser.phoneNumber,
      },
      JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    return { token };
  }
  //if there is an user, return a jwt
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

const otpGenerator = async (phoneNumber) => {
  try {
    const generatedToken = await generateOtpAndSend(phoneNumber);
    return generatedToken;
  } catch (error) {
    throw error;
  }
};

const userAuthService = {
  signIn,
  otpGenerator,
};
export default userAuthService;
