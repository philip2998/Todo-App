import jwt from 'jsonwebtoken';
export const verifyJwtToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(decoded);
            }
        });
    });
};
//# sourceMappingURL=verifyJwtToken.js.map