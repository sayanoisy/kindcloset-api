import { StatusCodes } from "http-status-codes";
import Messages from "../utils/Messages.js";
import Donor from "../models/Donor.js";
import userController from "../controllers/user.controller.js";
import userService from "./user.service.js";

const getAllDonors = async () => {
  try {
    const donors = await Donor.find();
    if (donors.length === 0) {
      const error = new Error(Messages.NO_DONOR_FOUND);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return donors;
  } catch (error) {
    throw error;
  }
};

const getDonorById = async (id) => {
  try {
    const donor = await Donor.findById(id);
    if (!donor) {
      const error = new Error(Messages.DONOR_DOES_NOT_EXIST);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return donor;
  } catch (error) {
    throw error;
  }
};

const getDonorByUserId = async (userId) => {
  try {
    const donor = await Donor.findOne({ userId: userId });
    if (!donor) {
      const error = new Error(Messages.DONOR_DOES_NOT_EXIST);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return donor;
  } catch (error) {
    throw error;
  }
};

const saveDonor = async (donor, id) => {
  try {
    const existingDonor = await Donor.findOne({ userId: id });
    if (existingDonor) {
      const error = new Error(Messages.DONOR_EXISTS);
      error.statusCode = StatusCodes.CONFLICT;
      throw error;
    }
    const newDonor = new Donor({
      ...donor,
      userId: id,
    });
    await userService.updateUserRole(id, "donor");
    await newDonor.save();
    return newDonor;
  } catch (error) {
    throw error;
  }
};

const updateDonor = async (id, body) => {
  try {
    const donor = await Donor.findById(id);
    if (!donor) {
      const error = new Error(Messages.DONOR_DOES_NOT_EXIST);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    const updatedDonor = await Donor.findByIdAndUpdate(id, body, {
      new: true,
    });

    return updatedDonor;
  } catch (error) {
    throw error;
  }
};

const deleteDonor = async (id) => {
  try {
    const donor = await Donor.findById(id);
    if (!donor) {
      const error = new Error(Messages.DONOR_DOES_NOT_EXIST);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    await Donor.findByIdAndDelete(id);

    return "Donor deleted successfully";
  } catch (error) {
    throw error;
  }
};

const donorService = {
  getAllDonors,
  getDonorById,
  getDonorByUserId,
  saveDonor,
  updateDonor,
  deleteDonor,
};
export default donorService;
