import mongoose from "mongoose";
const schema = mongoose.Schema;
const User = new schema({
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
});
export default mongoose.model("user", User);
