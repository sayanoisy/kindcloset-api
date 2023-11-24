import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Messages from "../utils/Messages.js";
import validateOtp from "../utils/ValidateOtp.js";

const updatePhoneNumbervalidation = async (currentPhoneNumber, currentOtp) => {
  try {
    const user = await User.findOne({ phoneNumber: currentPhoneNumber });
    if (!user) {
      const error = new Error(Messages.USER_DOES_NOT_EXIST);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    const otpValidation = await validateOtp(currentPhoneNumber, currentOtp);
    if (!otpValidation) {
      const error = new Error(Messages.INVALID_OTP);
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }

    return otpValidation;
  } catch (error) {
    throw error;
  }
};

const profileService = {
  updatePhoneNumbervalidation,
};
export default profileService;
