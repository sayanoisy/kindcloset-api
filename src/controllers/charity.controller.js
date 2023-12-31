import { StatusCodes } from "http-status-codes";
import ResponseHandler from "../utils/ResponseHandler.js";
import Messages from "../utils/Messages.js";
import charityService from "../services/charity.service.js";

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

const getAllCharities = async (req, res, next) => {
  try {
    const data = await charityService.getAllCharities();
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const getAllActiveCharities = async (req, res, next) => {
  try {
    const data = await charityService.getAllActiveCharities();
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const getCharityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await objectIdCheck(id);

    const data = await charityService.getCharityById(id);
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const getCharityByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = await charityService.getCharityByUserId(userId);
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const getCharityByOrganizationName = async (req, res, next) => {
  try {
    const { organizationName } = req.body;
    const data = await charityService.getCharityByOrganizationName(
      organizationName
    );
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const saveCharity = async (req, res, next) => {
  try {
    const body = req.body;
    const id = req.user.id;
    const data = await charityService.saveCharity(body, id);
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

const updateCharity = async (req, res, next) => {
  try {
    const { id } = req.params;
    await objectIdCheck(id);
    const body = req.body;
    const data = await charityService.updateCharity(id, body);
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const deleteCharity = async (req, res, next) => {
  try {
    const { id } = req.params;
    await objectIdCheck(id);
    const data = await charityService.deleteCharity(id);
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const approveCharity = async (req, res, next) => {
  try {
    const { id } = req.params;
    await objectIdCheck(id);
    const data = await charityService.approveCharity(id);
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const charityController = {
  getAllCharities,
  getAllActiveCharities,
  getCharityById,
  getCharityByUserId,
  getCharityByOrganizationName,
  saveCharity,
  updateCharity,
  deleteCharity,
  approveCharity,
};
export default charityController;
