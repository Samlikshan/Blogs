import React from "react";
import { motion } from "framer-motion";
import PostCard from "./PostCard";
import { Post } from "../../types";

interface BlogGridProps {
  posts: Post[];
  showActions?: boolean;
  onDelete?: (id: string) => void;
}

const BlogGrid: React.FC<BlogGridProps> = ({
  posts,
  showActions = false,
  onDelete,
}) => {
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

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {posts.map((post) => (
        <motion.div key={post._id} variants={item}>
          <PostCard post={post} onDelete={onDelete} showActions={showActions} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BlogGrid;
