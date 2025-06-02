import { Blog } from "../../domain/entities/Blog";
import { IBlogRepository } from "../../domain/repositories/IBlogRepository";

export class CreateBlogUseCase {
  constructor(private blogRepo: IBlogRepository) {}
  async execute(
    blog: Omit<Blog, "_id" | "createdAt" | "updatedAt" | "isDeleted">
  ) {
    const newBlog = await this.blogRepo.create(blog);
    return { newBlog, message: "Blog created successfully" };
  }
}
