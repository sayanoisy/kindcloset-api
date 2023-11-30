import mongoose from "mongoose";
const schema = mongoose.Schema;
const User = new schema({
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
    index: true,
  },
  role: {
    type: String,
    default: "user",
  },
});
export default mongoose.model("User", User);
