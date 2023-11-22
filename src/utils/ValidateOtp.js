import otpTokenService from "../services/otpToken.service.js";
import Messages from "./Messages.js";

const validateOtp = async (phoneNumber, inputOtp) => {
  try {
    const otpToken = await otpTokenService.findOtpTokenByPhoneNumber(
      phoneNumber
    );
    if (!otpToken) {
      throw new Error(Messages.INVALID_LOGIN_CREDS);
    }
    const databaseOtp = otpToken.otp;
    if (databaseOtp === inputOtp) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

export default validateOtp;
