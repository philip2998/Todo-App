import jwt from 'jsonwebtoken';
const signJwtToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const sendToken = (statusCode, user, res, token, options) => {
    res.cookie('jwt', token, options);
    user.password = '';
    res.status(statusCode).json({
        status: 'Success',
        token,
        data: { user },
    });
};
const createToken = (user, statusCode, res) => {
    const token = signJwtToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() +
            parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production')
        cookieOptions.secure = true;
    sendToken(statusCode, user, res, token, cookieOptions);
};
export default createToken;
//# sourceMappingURL=JwtToken.js.map