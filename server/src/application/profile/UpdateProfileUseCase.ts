import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class UpdateProfileUseCase {
  constructor(private userRepo: IUserRepository) {}
  async execute(userId: string, username: string, avatar: string) {
    const user = await this.userRepo.findById(userId);

    await this.userRepo.updateProfile(userId, username, avatar);

    return { avatar, username, message: "Profile updated successfully" };
  }
}
