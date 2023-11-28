import { StatusCodes } from "http-status-codes";
import ResponseHandler from "../utils/ResponseHandler.js";
import Messages from "../utils/Messages.js";
import donorService from "../services/donor.service.js";

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

const getAllDonors = async (req, res, next) => {
  try {
    const data = await donorService.getAllDonors();
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const getDonorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await objectIdCheck(id);

    const data = await donorService.getDonorById(id);
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const getDonorByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = await donorService.getDonorByUserId(userId);
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const saveDonor = async (req, res, next) => {
  try {
    const body = req.body;
    const id = req.user.id;
    const data = await donorService.saveDonor(body, id);
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

const updateDonor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await objectIdCheck(id);

    const data = await donorService.updateDonor(id, body);
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const deleteDonor = async (req, res, next) => {
  try {
    const { id } = req.params;
    await objectIdCheck(id);

    const data = await donorService.deleteDonor(id);
    const response = ResponseHandler(StatusCodes.OK, Messages.SUCCESS, data);
    return res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const donorController = {
  getAllDonors,
  getDonorById,
  getDonorByUserId,
  saveDonor,
  updateDonor,
  deleteDonor,
};
export default donorController;
