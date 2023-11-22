import OtpToken from "../models/OtpToken.js";

const addOtpToken = async (phoneNumber, otp, expiresAt) => {
  const newOtpToken = new OtpToken({ phoneNumber, otp, expiresAt });
  try {
    await newOtpToken.save();

    return newOtpToken;
  } catch (error) {
    throw error;
  }
};

const updateOtpToken = async (phoneNumber, body) => {
  try {
    await OtpToken.findOneAndUpdate(
      { phoneNumber: phoneNumber },
      { $set: body }
    );
    const updatedOtpToken = await OtpToken.findOne({
      phoneNumber: phoneNumber,
    });

    return updatedOtpToken;
  } catch (error) {
    throw error;
  }
};

const findOtpTokenByPhoneNumber = async (phoneNumber) => {
  try {
    const otpTokenCheck = await OtpToken.findOne({ phoneNumber: phoneNumber });

    return otpTokenCheck;
  } catch (error) {
    throw error;
  }
};

//this function helps processing the otp in the database
const processOtp = async (phoneNumber, body) => {
  try {
    //get the otpTokenObject
    const foundOtp = await findOtpTokenByPhoneNumber(phoneNumber);
    //if the otpObject doesn't exist save a new otpObject
    if (!foundOtp) {
      const otpToken = await addOtpToken(phoneNumber, body.otp, body.expiresAt);
      return otpToken;
    }
    //if the otpObject already exists update the existing object with new otp details
    const otpToken = await updateOtpToken(phoneNumber, body);

    return otpToken;
  } catch (error) {
    throw error;
  }
};

const otpTokenService = {
  addOtpToken,
  updateOtpToken,
  findOtpTokenByPhoneNumber,
  processOtp,
};
export default otpTokenService;
