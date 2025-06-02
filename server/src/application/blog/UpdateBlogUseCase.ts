import { Blog } from "../../domain/entities/Blog";
import { IBlogRepository } from "../../domain/repositories/IBlogRepository";

export class UpdateBlogUseCase {
  constructor(private blogRepo: IBlogRepository) {}
  async execute(blogId: string, userId: string, updatedBlog: Partial<Blog>) {
    let udpatedBlog;
    const response = await this.blogRepo.update(blogId, userId, updatedBlog);
    if (response.modifiedCount) {
      udpatedBlog = await this.blogRepo.findById(blogId);
    }
    return { udpatedBlog, message: "Blog updated successfully" };
  }
}
