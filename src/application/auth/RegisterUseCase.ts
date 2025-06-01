import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { BadRequestException } from "../../shared/errors";
import { HttpException } from "../../shared/errors/httpException";
import { hashPassword } from "../../shared/utils/bcryptHelper";

export class RegisterUseCase {
  constructor(private userRepo: IUserRepository) {}
  async execute(username: string, email: string, password: string) {
    const existingEmail = await this.userRepo.findByEmail(email);

    if (existingEmail) {
      throw new HttpException(400, "Email already in use");
    }
    const hashedPassword = await hashPassword(password);

    const newUser = await this.userRepo.create(email, username, hashedPassword);
    return { newUser, message: "User registerd successfully" };
  }
}
