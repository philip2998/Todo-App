const sendSuccessResponse = (res, statusCode, data) => {
  res.status(statusCode).json({
    status: 'success',
    data,
  });
};

export default sendSuccessResponse;
