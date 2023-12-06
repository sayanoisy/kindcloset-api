import { StatusCodes } from "http-status-codes";
import Messages from "../utils/Messages.js";
import Item from "../models/Item.js";
import donorService from "./donor.service.js";

const getAllItems = async () => {
  try {
    const items = await Item.find();
    if (items.length === 0) {
      const error = new Error(Messages.NO_ITEM_FOUND);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return items;
  } catch (error) {
    throw error;
  }
};

const getAllActiveItems = async () => {
  try {
    const items = await Item.find({ status: true });
    if (items.length === 0) {
      const error = new Error(Messages.NO_ITEM_FOUND);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return items;
  } catch (error) {
    throw error;
  }
};

const getItemById = async (id) => {
  try {
    const item = await Item.findById(id);
    if (!item) {
      const error = new Error(Messages.ITEM_DOES_NOT_EXIST);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return item;
  } catch (error) {
    throw error;
  }
};

const getItemsByUserId = async (userId) => {
  try {
    const items = await Item.find({ userId: userId, status: true });
    if (items.length === 0) {
      const error = new Error(Messages.NO_ITEM_FOUND);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return items;
  } catch (error) {
    throw error;
  }
};

const saveItem = async (item, id) => {
  try {
    const donor = await donorService.getDonorByUserId(id);
    const donorId = donor._id;
    const newitem = new Item({
      ...item,
      userId: id,
      donorId: donorId,
      status: true,
    });
    await newitem.save();
    return newitem;
  } catch (error) {
    throw error;
  }
};

const updateItem = async (id, body) => {
  try {
    const item = await Item.findById(id);
    if (!item) {
      const error = new Error(Messages.ITEM_DOES_NOT_EXIST);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    const updatedItem = await Item.findByIdAndUpdate(id, body, {
      new: true,
    });

    return updatedItem;
  } catch (error) {
    throw error;
  }
};

const deleteItem = async (id) => {
  try {
    const item = await Item.findById(id);
    if (!item) {
      const error = new Error(Messages.ITEM_DOES_NOT_EXIST);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    const deletedItem = await Item.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );

    return deletedItem;
  } catch (error) {
    throw error;
  }
};

const itemService = {
  getAllItems,
  getAllActiveItems,
  getItemById,
  getItemsByUserId,
  saveItem,
  updateItem,
  deleteItem,
};
export default itemService;
