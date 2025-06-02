import { UpdateWriteOpResult } from "mongoose";
import { Blog } from "../entities/Blog";

export interface IBlogRepository {
  create(
    post: Omit<Blog, "_id" | "createdAt" | "updatedAt" | "isDeleted">
  ): Promise<Blog>;
  findById(id: string): Promise<Blog | null>;
  findAll(): Promise<Blog[]>;
  update(
    id: string,
    userId: string,
    Blog: Partial<Blog>
  ): Promise<UpdateWriteOpResult>;
  delete(id: string, userId: string): Promise<UpdateWriteOpResult>;
  findUserBlogs(userId: string): Promise<Blog[] | [] | null>;
}
