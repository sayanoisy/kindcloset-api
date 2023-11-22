import mongoose from "mongoose";
const schema = mongoose.Schema;
const OtpToken = new schema({
  phoneNumber: {
    type: String,
    required: true,
    index: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});
export default mongoose.model("OtpToken", OtpToken);
