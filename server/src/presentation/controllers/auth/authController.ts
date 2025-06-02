import { NextFunction, Request, Response } from "express";
import { RegisterUseCase } from "../../../application/auth/RegisterUseCase";
import { UserRepository } from "../../../infrastructure/database/repository/UserRepository";
import { LoginUseCase } from "../../../application/auth/LoginUseCase";
import { generateToken, verifyToken } from "../../../shared/utils/jwtHelper";
import { HttpException } from "../../../shared/errors/httpException";

const userRepository = new UserRepository();

export class AuthController {
  private registerUseCase = new RegisterUseCase(userRepository);
  private loginUseCase = new LoginUseCase(userRepository);
  registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;
      const response = await this.registerUseCase.execute(
        username,
        email,
        password
      );
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const response = await this.loginUseCase.execute(email, password);

      //generating tokens
      const accessToken = generateToken(
        {
          _id: response.user._id,
          username: response.user.username,
          email: response.user.email,
        },
        "15m"
      );

      const refreshToken = generateToken(
        {
          _id: response.user._id,
          username: response.user.username,
          email: response.user.email,
        },
        "15d"
      );

      //storing the token in httpOnly cookie
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true, // Only for HTTPS!
        sameSite: "lax",
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true, // Only for HTTPS!
        sameSite: "lax",
      });

      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new HttpException(400, "Refresh token is required");
      }

      let decoded = verifyToken(refreshToken);

      if (!decoded) {
        throw new HttpException(400, "Invalid Refresh token");
      }

      const accessToken = generateToken(
        {
          _id: decoded?._id,
          email: decoded?.email,
          username: decoded.username,
        },
        "15m"
      );

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true, // Only for HTTPS!
        sameSite: "lax",
      });
      res.json({ message: "Token refreshed succssfully" });
    } catch (error) {
      next(error);
    }
  };
}
