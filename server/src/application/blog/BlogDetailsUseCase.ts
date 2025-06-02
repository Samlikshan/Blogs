import { IBlogRepository } from "../../domain/repositories/IBlogRepository";

export class BlogDetailsUseCase {
  constructor(private blogRepo: IBlogRepository) {}
  async execute(blogId: string) {
    const blog = await this.blogRepo.findById(blogId);

    return { blog, message: "Blogs fetched successfully" };
  }
}
