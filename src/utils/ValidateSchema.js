import { StatusCodes } from "http-status-codes";
import ErrorHandler from "./ErrorHandler.js";
import Messages from "./Messages.js";

const ValidateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    ErrorHandler(
      StatusCodes.BAD_REQUEST,
      Messages.VALIDATION_ERROR,
      err.errors
    );
  }
};

export default ValidateSchema;
