import jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyJwtToken = (
  token: string,
  secret: string
): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as JwtPayload);
      }
    });
  });
};
