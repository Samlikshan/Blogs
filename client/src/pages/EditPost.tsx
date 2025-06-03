import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../components/blog/PostForm";
import Loading from "../components/ui/Loading";
import { usePosts } from "../hooks/usePosts";
import { Post } from "../types";
import { getBlogDetailsService, updateBlogService } from "../api/blog";

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPost, editPost } = usePosts();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const response = await getBlogDetailsService(id);

        if (response.status == 200) {
          setPost(response.data.blog);
        } else {
          setError("Post not found");
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, getPost, navigate]);

  const handleSubmit = async (formData: FormData) => {
    if (!id) return;
    setIsSubmitting(true);

    try {
      // Use editPost from usePosts hook
      const updatedPost = await editPost(id, formData);

      if (updatedPost) {
        navigate(`/posts/${id}`);
      } else {
        // setError("Failed to update post");
      }
    } catch (err) {
      console.error("Error updating post:", err);
      setError("An error occurred while updating the post");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <Loading size="lg\" text="Loading post..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto bg-red-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-red-700">{error}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Post</h1>
          {post && (
            <PostForm
              initialData={post}
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPost;
