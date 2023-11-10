const ResponseHandler = (status, message, data) => {
  const statusCode = status || 200;
  const msg = message || "Ok";
  const successData = data || {};
  return { success: true, status: statusCode, message: msg, data: successData };
};

export default ResponseHandler;
