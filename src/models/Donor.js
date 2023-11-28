import mongoose from "mongoose";
const schema = mongoose.Schema;
const Donor = new schema({
  donorName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactLocation: {
    type: String,
    required: true,
  },
  privacyPreferences: {
    type: Boolean,
    requires: true,
  },
  userId: {
    type: String,
    required: true,
    index: true,
  },
});
export default mongoose.model("Donor", Donor);
