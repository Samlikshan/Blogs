import jwt, { SignOptions } from "jsonwebtoken";

interface JwtPayload {
  _id: string;
  name: string;
  email: string;
  username: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const generateToken = (
  payload: object,
  expiresIn: string | number
): string => {
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    return null;
  }
};
