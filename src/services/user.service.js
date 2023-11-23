import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Messages from "../utils/Messages.js";

const getAllUsers = async () => {
  try {
    const users = await User.find();
    if (!users) {
      const error = new Error(Messages.NO_USERS_FOUND);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return users;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      const error = new Error(Messages.USER_DOES_NOT_EXIST);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByPhoneNumber = async (phoneNumber) => {
  try {
    const user = await User.findOne({ phoneNumber: phoneNumber });
    if (!user) {
      const error = new Error(Messages.USER_DOES_NOT_EXIST);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const saveUser = async (user) => {
  try {
    const existingUser = await User.findOne({ phoneNumber: user.phoneNumber });
    if (existingUser) {
      const error = new Error(Messages.USER_EXISTS);
      error.statusCode = StatusCodes.CONFLICT;
      throw error;
    }
    const newUser = new User({
      name: user.name,
      phoneNumber: user.phoneNumber,
    });
    await newUser.save();

    return newUser;
  } catch (error) {
    throw error;
  }
};

const updateUserName = async (id, userName) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      const error = new Error(Messages.USER_DOES_NOT_EXIST);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    await User.findByIdAndUpdate(id, { name: userName });
    const updatedUser = await User.findById(id);

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const updatePhoneNumber = async (id, phoneNumber) => {
  try {
    let user;
    user = await User.findById(id);
    if (!user) {
      const error = new Error(Messages.USER_DOES_NOT_EXIST);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    user = await User.findOne({ phoneNumber: phoneNumber });
    if (user) {
      const error = new Error(Messages.SAME_NUMBER_EXISTS);
      error.statusCode = StatusCodes.CONFLICT;
      throw error;
    }
    await User.findByIdAndUpdate(id, { phoneNumber: phoneNumber });
    const updatedUser = await User.findById(id);

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const userService = {
  getAllUsers,
  getUserById,
  getUserByPhoneNumber,
  saveUser,
  updateUserName,
  updatePhoneNumber,
};
export default userService;
