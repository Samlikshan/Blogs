import { User } from "../entities/User";

export interface IUserRepository {
  create(email: string, username: string, password: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findUser(email: string, password: string): Promise<User | null>;
}
