import mongoose from "mongoose";
import { IBlogRepository } from "../../domain/repositories/IBlogRepository";
import { HttpException } from "../../shared/errors/httpException";

export class DeleteBlogUseCase {
  constructor(private blogRepo: IBlogRepository) {}
  async execute(blogId: string, userId: string) {
    const blog = await this.blogRepo.findById(blogId);
    if (blog?.isDeleted) {
      throw new HttpException(400, "Failed to deleted blog");
    }

    if (blog?.authorId._id.toString() != userId) {
      throw new HttpException(400, "Unauthorized access");
    }
    const response = await this.blogRepo.delete(blogId, userId);

    if (!response.modifiedCount) {
      throw new HttpException(400, "Blog Deleting failed");
    }

    return { message: "Blog Deleted successfully" };
  }
}
