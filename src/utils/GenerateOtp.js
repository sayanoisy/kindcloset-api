import generateOTP from "gen-otp";
import twilio from "twilio";
import ErrorHandler from "./ErrorHandler.js";
import Messages from "./Messages.js";
import { StatusCodes } from "http-status-codes";
import {
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER,
  TWILIO_SID,
} from "../config/index.js";

const genOTP = generateOTP({
  length: 4,
  digits: true,
  letters: false,
  symbols: false,
  expiration: "3m",
});

const twilioClient = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

const generateOtpAndSend = async (phoneNumber) => {
  const formattedPhoneNumber = `+91${phoneNumber}`;
  await twilioClient.messages
    .create({
      body: `Your OTP for KindCloset is: ${genOTP.otp}`,
      from: TWILIO_NUMBER,
      to: formattedPhoneNumber,
    })
    .then((message) => {
      return { phoneNumber, message: `OTP sent via SMS: ${message.sid}` };
    })
    .catch((err) => {
      console.log(err);
      ErrorHandler(StatusCodes.UNAUTHORIZED, Messages.ERROR_SENDING_OTP);
    });
};

export default generateOtpAndSend;
