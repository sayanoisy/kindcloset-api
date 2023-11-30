import generateOTP from "gen-otp";
import twilio from "twilio";
import {
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER,
  TWILIO_SID,
} from "../config/index.js";
import otpTokenService from "../services/otpToken.service.js";

//generating a simple otp based on requirements
const genOTP = generateOTP({
  length: 4,
  digits: true,
  letters: false,
  symbols: false,
  expiration: "4m",
});

//creating the twilioclient
const twilioClient = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

//this function will help us to generate and store an otp and send it to the user's mobile number
const generateOtpAndSend = async (phoneNumber) => {
  try {
    //sending the otp to mobile number through twilio client
    const formattedPhoneNumber = `+91${phoneNumber}`;
    await twilioClient.messages
      .create({
        body: `Your OTP for KindCloset is: ${genOTP.otp}`,
        from: TWILIO_NUMBER,
        to: formattedPhoneNumber,
      })
      .catch((error) => {
        throw error;
      });
    //storing the otp in mongo database
    const savedToken = await otpTokenService.processOtp(phoneNumber, genOTP);
    
    return savedToken;
  } catch (error) {
    throw error;
  }
};

export default generateOtpAndSend;
