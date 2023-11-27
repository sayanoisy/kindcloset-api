import mongoose from "mongoose";
const schema = mongoose.Schema;
const Charity = new schema({
  organizationName: {
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
  documents: {
    type: [String],
    required: true,
  },
  portfolioLink: {
    type: String,
    required: true,
  },
  accreditationStatus: {
    type: Boolean,
    required: true,
  },
  userId: {
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
export default mongoose.model("Charities", Charity);
