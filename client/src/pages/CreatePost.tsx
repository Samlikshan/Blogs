import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/blog/PostForm";
import { usePosts } from "../hooks/usePosts";

import { useSelector } from "react-redux";
import { RootState } from "@/reducers/rootReducer";

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.userData);

  const { addPost } = usePosts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    try {
      // const response = await createBlogService(formData);

      await addPost(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Create New Post
          </h1>
          <PostForm onSubmit={handleSubmit} isLoading={isSubmitting} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
