import { StatusCodes } from "http-status-codes";
import ErrorHandler from "../utils/ErrorHandler.js";
import { verifyAdminToken, verifyToken } from "../utils/JwtHandler.js";
import Messages from "../utils/Messages.js";
import rateLimit from "express-rate-limit";

const protectedRequestMiddleware = (req, res, next) => {
  if (!req.session || !req.session.jwt)
    ErrorHandler(StatusCodes.FORBIDDEN, Messages.INVALID_TOKEN);
  req.user = verifyToken(req.session.jwt);
  next();
};

const protectedRequestMiddlewareAdmin = (req, res, next) => {
  if (!req.session || !req.session.jwt)
    ErrorHandler(StatusCodes.FORBIDDEN, Messages.INVALID_TOKEN);
  req.user = verifyAdminToken(req.session.jwt);
  next();
};

const rateLimiter = rateLimit({
  max: 100,
  windowMs: 1 * 60 * 1000, // 1 minute
  skipFailedRequests: true,
  message: "Too Many Request from this IP, please try again after sometime",
  handler: (request, response, next, options) => {
    ErrorHandler(options.statusCode, options.message);
  },
});

export {
  protectedRequestMiddleware,
  protectedRequestMiddlewareAdmin,
  rateLimiter,
};
