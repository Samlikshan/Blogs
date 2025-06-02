import { IBlogRepository } from "../../domain/repositories/IBlogRepository";

export class ListAllBlogsUseCase {
  constructor(private blogRepo: IBlogRepository) {}
  async execute() {
    const blogs = await this.blogRepo.findAll();

    return { blogs, message: "Blogs fetched successfully" };
  }
}
