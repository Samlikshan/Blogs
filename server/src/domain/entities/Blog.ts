import mongoose from "mongoose";

export interface Blog {
  _id: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  imageUrl: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
