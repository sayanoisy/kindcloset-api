import { StatusCodes } from "http-status-codes";
import Messages from "../utils/Messages.js";
import Charity from "../models/Charity.js";

const getAllCharities = async () => {
  try {
    const charities = await Charity.find();
    if (charities.length === 0) {
      const error = new Error(Messages.NO_CHARITY_FOUND);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return charities;
  } catch (error) {
    throw error;
  }
};

const getAllActiveCharities = async () => {
  try {
    const charities = await Charity.find({ status: true });
    if (charities.length === 0) {
      const error = new Error(Messages.NO_CHARITY_FOUND);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return charities;
  } catch (error) {
    throw error;
  }
};

const getCharityById = async (id) => {
  try {
    const charity = await Charity.findById(id);
    if (!charity) {
      const error = new Error(Messages.CHARITY_DOES_NOT_EXIST);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return charity;
  } catch (error) {
    throw error;
  }
};

const getCharityByUserId = async (userId) => {
  try {
    const charity = await Charity.findOne({ userId: userId, status: true });
    if (!charity) {
      const error = new Error(Messages.NO_CHARITY_FOUND);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return charity;
  } catch (error) {
    throw error;
  }
};

const getCharityByOrganizationName = async (organizationName) => {
  try {
    const charity = await Charity.find({
      organizationName: organizationName,
      status: true,
    });
    if (charity.length === 0) {
      const error = new Error(Messages.NO_CHARITY_FOUND);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return charity;
  } catch (error) {
    throw error;
  }
};

const saveCharity = async (charity, id) => {
  try {
    const existingCharity = await Charity.findOne({
      userId: id,
      status: true,
    });
    if (existingCharity) {
      const error = new Error(Messages.CHARITY_EXISTS);
      error.statusCode = StatusCodes.CONFLICT;
      throw error;
    }

    const newCharity = new Charity({
      ...charity,
      userId: id,
      status: false,
    });
    await newCharity.save();
    return newCharity;
  } catch (error) {
    throw error;
  }
};

const updateCharity = async (id, body) => {
  try {
    const charity = await Charity.findById(id);
    if (!charity) {
      const error = new Error(Messages.CHARITY_DOES_NOT_EXIST);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    const updatedCharity = await Charity.findByIdAndUpdate(id, body, {
      new: true,
    });

    return updatedCharity;
  } catch (error) {
    throw error;
  }
};

const deleteCharity = async (id) => {
  try {
    const charity = await Charity.findById(id);
    if (!charity) {
      const error = new Error(Messages.CHARITY_DOES_NOT_EXIST);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    const deletedCharity = await Charity.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );

    return deletedCharity;
  } catch (error) {
    throw error;
  }
};

const charityService = {
  getAllCharities,
  getAllActiveCharities,
  getCharityById,
  getCharityByUserId,
  getCharityByOrganizationName,
  saveCharity,
  updateCharity,
  deleteCharity,
};
export default charityService;
