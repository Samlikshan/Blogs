import { NextFunction, Request, Response } from "express";
import { UpdateProfileUseCase } from "../../application/profile/UpdateProfileUseCase";
import { UserRepository } from "../../infrastructure/database/repository/UserRepository";

const userRepository = new UserRepository();

export class ProfileController {
  private updateProfileUseCase = new UpdateProfileUseCase(userRepository);

  updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.body;
      const userId = req.user?._id!;
      const avatar =
        (req.file as Express.MulterS3.File)?.key || req.body.avatar;

      const response = await this.updateProfileUseCase.execute(
        userId,
        username,
        avatar
      );
      res.json(response);
    } catch (error) {
      next(error);
    }
  };
}
