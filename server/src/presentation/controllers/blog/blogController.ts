import { NextFunction, Request, Response } from "express";
import { BlogDetailsUseCase } from "../../../application/blog/BlogDetailsUseCase";
import { CreateBlogUseCase } from "../../../application/blog/CreateBlogUseCase";
import { DeleteBlogUseCase } from "../../../application/blog/DeleteBlogUseCase";
import { ListAllBlogsUseCase } from "../../../application/blog/ListAllBlogsUseCase";
import { ListUserBlogsUseCase } from "../../../application/blog/ListUserBlogsUseCase";
import { UpdateBlogUseCase } from "../../../application/blog/UpdateBlogUseCase";
import { BlogRepository } from "../../../infrastructure/database/repository/BlogRepository";
import mongoose from "mongoose";

const blogRepository = new BlogRepository();
export class BlogController {
  private createBlogUseCase = new CreateBlogUseCase(blogRepository);
  private upddateBlogUseCase = new UpdateBlogUseCase(blogRepository);
  private blogDetailsUseCase = new BlogDetailsUseCase(blogRepository);
  private deleteBlogUseCase = new DeleteBlogUseCase(blogRepository);
  private listUserBlogsUserCase = new ListUserBlogsUseCase(blogRepository);
  private listAllBlogsUseCase = new ListAllBlogsUseCase(blogRepository);

  createBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, content } = req.body;
      const authorId = new mongoose.Types.ObjectId(req.user?._id!);
      const imageUrl = (req.file as Express.MulterS3.File)?.key;

      const response = await this.createBlogUseCase.execute({
        title,
        content,
        authorId,
        imageUrl,
      });
      res.json(response);
    } catch (error) {
      next(error);
    }
  };
  updateBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogId = req.params.blogId;
      const { title, content } = req.body;
      const userId = req.user?._id!;
      const imageUrl =
        (req.file as Express.MulterS3.File)?.key || req.body.imageUrl;
      const response = await this.upddateBlogUseCase.execute(blogId, userId, {
        title,
        content,
        imageUrl,
      });
      res.json(response);
    } catch (error) {
      next(error);
    }
  };
  blogDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogId = req.params.blogId;
      const response = await this.blogDetailsUseCase.execute(blogId);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };
  deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.blogId;
    const userId = req.user?._id!;
    const response = await this.deleteBlogUseCase.execute(blogId, userId);
    res.json(response);
    try {
    } catch (error) {
      next(error);
    }
  };
  listAllBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.listAllBlogsUseCase.execute();
      res.json(response);
    } catch (error) {
      next(error);
    }
  };
  listUserBlogs = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id!;
    const response = await this.listUserBlogsUserCase.execute(userId);
    res.json(response);
    try {
    } catch (error) {
      next(error);
    }
  };
}
