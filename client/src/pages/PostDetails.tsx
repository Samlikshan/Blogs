import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Edit, ArrowLeft, User } from "lucide-react";
import Button from "../components/ui/Button";
import Loading from "../components/ui/Loading";

import { Post } from "../types";
import { RootState } from "@/reducers/rootReducer";
import { useSelector } from "react-redux";
import { getBlogDetailsService } from "../api/blog";

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.userData);

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const isAuthor = user && post && user._id === post.authorId;

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <Loading size="lg\" text="Loading post..." />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto bg-red-50 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-red-700 mb-4">
            {error || "Post not found"}
          </h2>
          <Button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button
            variant="outline"
            size="sm"
            icon={<ArrowLeft size={16} />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              {post.author?.avatarUrl ? (
                <img
                  src={`${import.meta.env.VITE_S3_PATH}/${
                    (post.authorId as { avatar: string }).avatar
                  }`}
                  alt={(post.authorId as { username: string }).username}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <User size={24} className="text-blue-500" />
                </div>
              )}
              <div>
                <h3 className="font-medium text-gray-900">
                  {(post.authorId as { username: string }).username ||
                    "Anonymous"}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {post.author?.bio && (
                  <p className="text-sm text-gray-600 mt-1">
                    {post.author.bio}
                  </p>
                )}
              </div>
            </div>

            {isAuthor && (
              <Button
                variant="outline"
                size="sm"
                icon={<Edit size={16} />}
                onClick={() => navigate(`/posts/edit/${post._id}`)}
              >
                Edit Post
              </Button>
            )}
          </div>

          <div className="rounded-lg overflow-hidden mb-8 h-96 relative">
            <img
              src={`${import.meta.env.VITE_S3_PATH}/${post.imageUrl}`}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PostDetails;
