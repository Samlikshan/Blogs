import { compare } from "bcrypt";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { HttpException } from "../../shared/errors/httpException";
import {
  comparePasswords,
} from "../../shared/utils/bcryptHelper";

export class LoginUseCase {
  constructor(private userRepo: IUserRepository) {}
  async execute(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new HttpException(404, "User not found");
    }
    const isInvalidCredentials = await comparePasswords(
      password,
      user.password
    );
    if (!isInvalidCredentials) {
      throw new HttpException(400, "Invalid credentials");
    }

    return { user, message: "Login successfull" };
  }
}
