export const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => next(err));
    };
};
export const sendSuccessResponse = (res, statusCode, data) => {
    res.status(statusCode).json(data);
};
//# sourceMappingURL=helpers.js.map