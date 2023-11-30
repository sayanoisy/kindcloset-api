import { StatusCodes } from "http-status-codes";
import Messages from "../utils/Messages.js";
import User from "../models/User.js";
import generateOtpAndSend from "../utils/GenerateOtp.js";
import validateOtp from "../utils/ValidateOtp.js";
import { generateToken } from "../utils/JwtHandler.js";

//only one function for both signUp and login
const signIn = async (phoneNumber, inputOtp) => {
  try {
    //validate the otp
    const otpValidator = await validateOtp(phoneNumber, inputOtp);
    if (!otpValidator) {
      const error = Error(Messages.INVALID_OTP);
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }
    //find the user in the database
    const userCheck = await User.findOne({ phoneNumber: phoneNumber });
    //if there is no user, create a new user and return a jwt
    if (!userCheck) {
      const newUser = new User({ name: "", phoneNumber });
      await newUser.save();
      //finding the saved user and getting it's id to send in jwt payload
      const savedUser = await User.findOne({ phoneNumber: phoneNumber });
      const payload = {
        id: savedUser._id,
        phoneNumber: savedUser.phoneNumber,
      };
      const token = generateToken(payload);
      return { token };
    }
    //if there is an user, return a jwt
    const payload = {
      id: userCheck._id,
      role: userCheck.role,
      phoneNumber: userCheck.phoneNumber,
    };
    const token = generateToken(payload);
    return { token };
  } catch (error) {
    throw error;
  }
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
