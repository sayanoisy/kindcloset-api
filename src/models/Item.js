import mongoose from "mongoose";
const schema = mongoose.Schema;
const Item = new schema({
  itemType: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  ageGroup: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
    index: true,
  },
  donorId: {
    type: String,
    required: true,
    index: true,
  },
  status: {
    type: Boolean,
    required: true,
    index: true,
  },
});
export default mongoose.model("Item", Item);
