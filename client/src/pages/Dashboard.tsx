// Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, Search, LayoutGrid, List } from "lucide-react";
import PostCard from "../components/blog/PostCard";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Loading from "../components/ui/Loading";
import Modal from "../components/ui/Modal";
import ProfileCard from "../components/profile/ProfileCard";
import EditProfileModal from "../components/profile/EditProfileModal";
import { usePosts } from "../hooks/usePosts";

import { RootState } from "@/reducers/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { listUserBlogsServie } from "../api/blog";
import { updateProfle } from "../api/profile";
import { updateUserData } from "../reducers/userSlice";
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userData);
  const { removePost } = usePosts();
  const [error, setError] = useState("");
  const [ownPosts, setOwnPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    postId: string | null;
  }>({
    isOpen: false,
    postId: null,
  });
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Filter posts based on search term
  const filteredPosts = ownPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle delete post
  const handleDeleteClick = (id: string) => {
    setDeleteModal({ isOpen: true, postId: id });
  };

  const handleConfirmDelete = async () => {
    if (deleteModal.postId) {
      const result = await removePost(deleteModal.postId);
      if (result) {
        setOwnPosts((prev) =>
          prev.filter((post) => post._id !== deleteModal.postId)
        );
      }
      setDeleteModal({ isOpen: false, postId: null });
    }
  };

  const handleProfileUpdate = async (data: {
    username: string;
    bio: string;
    avatar: File | null;
  }) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("bio", data.bio);

    if (data.avatar) {
      formData.append("avatar", data.avatar);
    } else if (!data.avatar && !user?.avatar) {
      // Handle avatar removal if needed
      formData.append("avatar", "");
    }

    try {
      const response = await updateProfle(formData);
      if (response.status === 200) {
        // Update Redux store with new user data
        dispatch(
          updateUserData({
            avatar: response.data.avatar,
            username: response.data.username,
          })
        );
        setIsEditProfileOpen(false);
      } else {
        console.error("Profile update failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchOwnPosts = async () => {
      const response = await listUserBlogsServie();
      if (response.status == 200) {
        setOwnPosts(response.data.blogs);
        setIsLoading(false);
      } else {
        setError("Failed to fetch blogs");
        setIsLoading(false);
      }
    };
    fetchOwnPosts();
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <Loading size="lg" text="Loading your posts..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center p-8 bg-red-50 rounded-lg">
            <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
            <p className="text-red-600">{error}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <ProfileCard onEditProfile={() => setIsEditProfileOpen(true)} />
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Posts</h1>
              <p className="text-gray-600 mt-1">Manage your blog posts here</p>
            </div>
            <Button
              className="mt-4 sm:mt-0"
              icon={<PlusCircle size={18} />}
              onClick={() => navigate("/posts/new")}
            >
              Create New Post
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={handleSearchChange}
                icon={<Search size={18} className="text-gray-400" />}
                fullWidth
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">View:</span>
              <button
                className={`p-2 rounded-md ${
                  viewMode === "grid"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <LayoutGrid size={20} />
              </button>
              <button
                className={`p-2 rounded-md ${
                  viewMode === "list"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Posts Found
            </h3>
            {searchTerm ? (
              <p className="text-gray-600 mb-4">
                No posts match your search. Try a different term or clear the
                search.
              </p>
            ) : (
              <p className="text-gray-600 mb-4">
                You haven't created any posts yet. Start by creating your first
                post!
              </p>
            )}
            <Button
              onClick={() => navigate("/posts/new")}
              icon={<PlusCircle size={18} />}
            >
              Create New Post
            </Button>
          </div>
        ) : viewMode === "grid" ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post._id} variants={item}>
                <PostCard post={post} onDelete={handleDeleteClick} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post._id} variants={item}>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-32 h-20 sm:h-20 flex-shrink-0">
                      <img
                        src={`${import.meta.env.VITE_S3_PATH}/${post.imageUrl}`}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-2">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex space-x-3 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/posts/${post._id}`)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/posts/edit/${post._id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteClick(post._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, postId: null })}
        title="Delete Post"
        onConfirm={handleConfirmDelete}
        confirmText="Delete"
      >
        <p className="text-gray-600">
          Are you sure you want to delete this post? This action cannot be
          undone.
        </p>
      </Modal>

      {user && (
        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          onSave={handleProfileUpdate}
          user={user}
        />
      )}
    </div>
  );
};

export default Dashboard;
