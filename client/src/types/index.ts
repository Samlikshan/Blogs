export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  authorId:
    | string
    | {
        username: string;
        email: string;
        _id: string;
        avatar: string;
      };
  author?: User;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
