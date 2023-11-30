import { StatusCodes } from "http-status-codes";
import { JWT_SECRET_KEY } from "../config/index.js";
import jwt from "jsonwebtoken";
import Messages from "./Messages.js";

const generateToken = (payload, ttl = "1h") => {
  return jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: ttl,
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const error = new Error(Messages.TOKEN_EXPIRED);
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }
    if (err.name === "JsonWebTokenError") {
      const error = new Error(Messages.INVALID_TOKEN);
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }
    const error = new Error(Messages.INVALID_TOKEN);
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }
};

const verifyAdminToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
    if (decodedToken.role !== "admin") {
      const error = new Error(Messages.INVALID_TOKEN);
      error.name = "NotAdminError";
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }
    return decodedToken;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const error = new Error(Messages.TOKEN_EXPIRED);
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }
    if (err.name === "JsonWebTokenError") {
      const error = new Error(Messages.INVALID_TOKEN);
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }
    if (err.name === "NotAdminError") {
      const error = new Error(Messages.UNAUTHORIZED);
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }
    const error = new Error(Messages.INVALID_TOKEN);
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }
};

export { verifyToken, generateToken, verifyAdminToken };
