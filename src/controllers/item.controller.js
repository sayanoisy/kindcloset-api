import { StatusCodes } from "http-status-codes";
import ResponseHandler from "../utils/ResponseHandler.js";
import Messages from "../utils/Messages.js";
import itemService from "../services/item.service.js";

//Mongo object id check
const objectIdCheck = async (id) => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  const isValidObjectId = (id) => objectIdRegex.test(id);
  if (!isValidObjectId(id)) {
    const err = new Error("invalid object id");
    err.statusCode = StatusCodes.EXPECTATION_FAILED;
    throw err;
  }
};

const getAllItems = async (req, res, next) => {
  try {
    const data = await itemService.getAllItems();
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const getAllActiveItems = async (req, res, next) => {
  try {
    const data = await itemService.getAllActiveItems();
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const getItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await objectIdCheck(id);

    const data = await itemService.getItemById(id);
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const getItemByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = await itemService.getItemsByUserId(userId);
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const saveItem = async (req, res, next) => {
  try {
    const body = req.body;
    const id = req.user.id;
    const data = await itemService.saveItem(body, id);
    const response = ResponseHandler(
      StatusCodes.CREATED,
      Messages.SUCCESS,
      data
    );
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    await objectIdCheck(id);
    const body = req.body;
    const data = await itemService.updateItem(id, body);
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    await objectIdCheck(id);
    const data = await itemService.deleteItem(id);
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const itemController = {
  getAllItems,
  getAllActiveItems,
  getItemById,
  getItemByUserId,
  saveItem,
  updateItem,
  deleteItem,
};
export default itemController;
