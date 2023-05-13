export const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(err => next(err));
  };
};

export const sendSuccessResponse = (res, statusCode, data) => {
  res.status(statusCode).json({
    status: 'success',
    data,
  });
};

export const filterBody = (object, ...allowedFields) => {
  const newObject = {};
  Object.keys(object).forEach(el => {
    if (allowedFields.includes(el)) newObject[el] = object[el];
  });
  return newObject;
};
