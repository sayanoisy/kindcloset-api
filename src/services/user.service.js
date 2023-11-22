import User from "../models/User.js";
import Messages from "../utils/Messages.js";

const getAllUsers = async () => {
  try {
    const users = await User.find();
    if (!users) {
      throw new Error(Messages.NO_USERS_FOUND);
    }
    return users;
  } catch (error) {
    throw error;
  }
};

//some error here
const getUserById = async (id) => {
  console.log("id:", id);
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error(Messages.USER_DOES_NOT_EXIST);
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
      throw new Error(Messages.USER_DOES_NOT_EXIST);
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
      throw new Error(Messages.USER_EXISTS);
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
    await User.findByIdAndUpdate(id, { name: userName });
    const updatedUser = await User.findById(id);

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const updatePhoneNumber = async (id, phoneNumber) => {
  try {
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
