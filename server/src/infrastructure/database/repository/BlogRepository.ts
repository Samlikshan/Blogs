import { UpdateWriteOpResult } from "mongoose";
import { Blog } from "../../../domain/entities/Blog";
import { Blog as BlogSchema } from "../models/blogModel";
import { IBlogRepository } from "../../../domain/repositories/IBlogRepository";

export class BlogRepository implements IBlogRepository {
  async create(
    post: Omit<Blog, "_id" | "createdAt" | "updatedAt" | "isDeleted">
  ): Promise<Blog> {
    return await BlogSchema.create(post);
  }
  async delete(id: string, userId: string): Promise<UpdateWriteOpResult> {
    return await BlogSchema.updateOne(
      { _id: id, authorId: userId },
      { $set: { isDeleted: true } }
    );
  }
  async findAll(): Promise<Blog[]> {
    return await BlogSchema.find({ isDeleted: false }).populate("authorId");
  }
  async findById(id: string): Promise<Blog | null> {
    return await BlogSchema.findById(id).populate("authorId");
  }

  async findUserBlogs(userId: string): Promise<Blog[] | [] | null> {
    return await BlogSchema.find({
      authorId: userId,
      isDeleted: false,
    }).populate("authorId");
  }

  async update(
    id: string,
    userId: string,
    Blog: Partial<Blog>
  ): Promise<UpdateWriteOpResult> {
    return await BlogSchema.updateOne(
      { _id: id, authorId: userId },
      { $set: { ...Blog } }
    );
  }
}
