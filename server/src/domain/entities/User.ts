import mongoose from "mongoose";

export interface User {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  avatar: string | null | undefined;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
