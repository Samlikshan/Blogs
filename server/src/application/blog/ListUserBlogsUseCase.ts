import { IBlogRepository } from "../../domain/repositories/IBlogRepository";

export class ListUserBlogsUseCase {
  constructor(private blogRepo: IBlogRepository) {}
  async execute(userId: string) {
    const blogs = await this.blogRepo.findUserBlogs(userId);

    return { blogs, message: "Blogs fetched successfully" };
  }
}
