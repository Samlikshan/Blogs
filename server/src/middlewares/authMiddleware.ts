import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "../shared/utils/jwtHelper";
import { HttpException } from "../shared/errors/httpException";

interface UserPayload extends jwt.JwtPayload {
  _id: string;
  email: string;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const authMiddleWare = () => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        res.status(401).json({ message: "Access token missing" });
        return;
      }

      const user = verifyToken(accessToken);
      if (!user) {
        throw new HttpException(403, "Invalid accessToken");
      }
      req.user = {
        _id: user._id,
        username: user.username,
        email: user.email,
      };
      next();
      return;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: "Token expired" });
        return;
      }
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
  };
};
