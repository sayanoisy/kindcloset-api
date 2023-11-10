import dotenv from "dotenv";
dotenv.config();

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
const LOCALHOST_PORT = process.env.LOCALHOST_PORT;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const OTP_SECRET_KEY = process.env.OTP_SECRET_KEY;
const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_NUMBER = process.env.TWILIO_NUMBER;

export {
  MONGO_CONNECTION_STRING,
  LOCALHOST_PORT,
  JWT_SECRET_KEY,
  OTP_SECRET_KEY,
  TWILIO_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER,
};
