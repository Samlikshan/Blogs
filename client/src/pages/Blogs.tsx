import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, PenSquare } from "lucide-react";
import { format } from "date-fns";
import BlogGrid from "../components/blog/BlogGrid";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Loading from "../components/ui/Loading";
import Pagination from "../components/ui/Pagination";

import { useSelector } from "react-redux";
import { RootState } from "@/reducers/rootReducer";
import { usePosts } from "../hooks/usePosts";

const POSTS_PER_PAGE = 9;

const Blogs: React.FC = () => {
  const navigate = useNavigate();
  const { posts, isLoading } = usePosts();

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Filter posts based on search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  // Featured post (most recent)
  const featuredPost = posts[0];

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <Loading size="lg" text="Loading posts..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section with Featured Post */}
      {featuredPost && (
        <div className="bg-gradient-to-br from-blue-50 to-white mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              className="grid lg:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Welcome to BlogForge
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  Discover amazing stories and share your own with our community
                </p>
                {!isAuthenticated && (
                  <div className="flex gap-4">
                    <Button size="lg" onClick={() => navigate("/register")}>
                      Get Started
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => navigate("/login")}
                    >
                      Sign In
                    </Button>
                  </div>
                )}
              </div>
              <div className="relative">
                <img
                  src={`${import.meta.env.VITE_S3_PATH}/${
                    featuredPost.imageUrl
                  }`}
                  alt="Featured post"
                  className="w-full h-[400px] object-cover rounded-lg shadow-xl"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg">
                  <p className="text-white/80 text-sm mb-2">
                    {format(new Date(featuredPost.createdAt), "MMMM dd, yyyy")}
                  </p>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {featuredPost.title}
                  </h2>
                  <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-gray-900"
                    onClick={() => navigate(`/posts/${featuredPost._id}`)}
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Create Post Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="w-full sm:w-96">
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search size={18} className="text-gray-400" />}
              />
            </div>
            {isAuthenticated && (
              <Button
                icon={<PenSquare size={18} />}
                onClick={() => navigate("/posts/new")}
              >
                Create Post
              </Button>
            )}
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No posts found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or check back later for new
              content.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
              <p className="text-gray-600 mt-1">
                Explore the latest stories from our community
              </p>
            </div>

            <BlogGrid posts={paginatedPosts} />

            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blogs;
