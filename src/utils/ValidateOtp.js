import { StatusCodes } from "http-status-codes";
import otpTokenService from "../services/otpToken.service.js";
import Messages from "./Messages.js";

const validateOtp = async (phoneNumber, inputOtp) => {
  try {
    const currentTime = new Date(Date.now());
    console.log("current time :", currentTime);
    const otpToken = await otpTokenService.findOtpTokenByPhoneNumber(
      phoneNumber
    );
    if (!otpToken) {
      const error = new Error(Messages.INVALID_LOGIN_CREDS);
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }
    const databaseOtp = otpToken.otp;
    const otpExpirationTime = new Date(otpToken.expiresAt);
    console.log("otp expiration time :", otpExpirationTime);
    if (databaseOtp === inputOtp) {
      if (otpExpirationTime < currentTime) {
        const error = new Error(Messages.OTP_EXPIRED);
        error.statusCode = StatusCodes.UNAUTHORIZED;
        throw error;
      }
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

export default validateOtp;
