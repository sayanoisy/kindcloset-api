import { createLogger, format, transports } from "winston";
const ErrorHandlerMiddleware = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  const errData = err.data || null;

  const logger = createLogger({
    format: format.json(),
    transports: [
      new transports.File({ filename: "error.log", level: "error" }),
    ],
  });

  const response = {
    success: false,
    status: errStatus,
    message: errMsg,
  };

  if (errData) {
    response.data = errData;
  }

  if (errStatus > 499) {
    response.stack = process.env.NODE_ENV === "development" ? err.stack : {};
    logger.log(
      "error",
      JSON.stringify({
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === "development" ? err.stack : {},
      })
    );
  }

  return res.status(errStatus).json(response);
};

export default ErrorHandlerMiddleware;
