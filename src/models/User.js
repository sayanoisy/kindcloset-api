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
});
export default mongoose.model("User", User);
