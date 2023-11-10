const ErrorHandler = (status, message, data = null) => {
  const customErr = new Error();
  customErr.message = message || "Something went wrong";
  customErr.statusCode = status || 500;
  if (data) customErr.data = data;
  throw customErr;
};
export default ErrorHandler;
