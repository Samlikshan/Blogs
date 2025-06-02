// Remove mock data imports and functions
import { useState, useEffect, useCallback } from "react";
import {
  listAllPostsService,
  getBlogDetailsService,
  createBlogService,
  updateBlogService,
  deleteBlogService,
} from "../api/blog";
import { Post } from "@/types";
import { toast } from "sonner";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await listAllPostsService();
      if (response.status === 200) {
        setPosts(response.data.blogs);
      }
    } catch (err) {
      setError("Failed to fetch posts");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const getPost = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getBlogDetailsService(id);
      if (response.status === 200) {
        return response.data.blog;
      }
      return null;
    } catch (err) {
      setError("Failed to fetch post");
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addPost = useCallback(async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await createBlogService(formData);
      if (response.status === 201) {
        const newPost = response.data.blog;
        setPosts((prev) => [...prev, newPost]);
        return newPost;
      }
      return null;
    } catch (err) {
      setError("Failed to create post");
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const editPost = useCallback(async (id: string, formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await updateBlogService(id, formData);

      if (response.status === 200) {
        const updatedPost = response.data.udpatedBlog;
        setPosts((prev) =>
          prev.map((post) => (post._id === id ? updatedPost : post))
        );
        return updatedPost;
      }
      return null;
    } catch (err) {
      setError("Failed to update post");
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removePost = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await deleteBlogService(id);

      if (response.status === 200) {
        setPosts((prev) => prev.filter((post) => post._id !== id));
        return true;
      } else {
        toast.error(response.data.message);
      }
      return false;
    } catch (err) {
      setError("Failed to delete post");
      console.error(err);
      toast.error(err.data.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    posts,
    isLoading,
    error,
    fetchPosts,
    getPost,
    addPost,
    editPost,
    removePost,
  };
};
