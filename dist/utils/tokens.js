import jwt from 'jsonwebtoken';
export const signJwtToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
export const createSendToken = (user, statusCode, res) => {
    const token = signJwtToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() +
            parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production')
        cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);
    user.password = '';
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};
//# sourceMappingURL=tokens.js.map