import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User as UserModel } from "../models/userModel";

export class UserRepository implements IUserRepository {
  async create(
    email: string,
    username: string,
    password: string
  ): Promise<User> {
    return await UserModel.create({ email, username, password });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email });
  }

  async findUser(email: string, password: string): Promise<User | null> {
    return await UserModel.findOne({ email, password });
  }
}
