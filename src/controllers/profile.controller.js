import { StatusCodes } from "http-status-codes";
import ResponseHandler from "../utils/ResponseHandler.js";
import Messages from "../utils/Messages.js";
import profileService from "../services/profile.service.js";

const updatePhoneNumbervalidation = async (req, res, next) => {
  try {
    const { phoneNumber, otp } = req.body;
    const data = await profileService.updatePhoneNumbervalidation(
      phoneNumber,
      otp
    );
    const response = ResponseHandler(
      StatusCodes.OK,
      Messages.OTP_VALIDATED,
      data
    );
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const profileController = {
  updatePhoneNumbervalidation,
};
export default profileController;
