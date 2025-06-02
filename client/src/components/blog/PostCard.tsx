import React from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, Eye } from "lucide-react";
import { Post } from "../../types";
import Card from "../ui/Card";
import Button from "../ui/Button";

interface PostCardProps {
  post: Post;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onDelete,
  showActions = true,
}) => {
  const navigate = useNavigate();
  const { _id, title, content, imageUrl, createdAt } = post;

  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Create a plain text snippet from HTML content
  const createSnippet = (htmlContent: string, maxLength = 120) => {
    // Create a temporary element to strip HTML tags
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";

    // Truncate text and add ellipsis if needed
    return textContent.length > maxLength
      ? `${textContent.substring(0, maxLength)}...`
      : textContent;
  };

  const handleView = () => {
    navigate(`/posts/${_id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/posts/edit/${_id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    {
      onDelete(_id);
    }
  };

  return (
    <Card className="h-full flex flex-col" hoverable onClick={handleView}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={`${import.meta.env.VITE_S3_PATH}/${imageUrl}`}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-2">{formattedDate}</p>
        <p className="text-gray-700 mb-4 flex-1">{createSnippet(content)}</p>

        {showActions && (
          <div className="flex justify-between mt-auto pt-4 border-t border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              icon={<Eye size={16} />}
              onClick={handleView}
            >
              View
            </Button>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                icon={<Edit size={16} />}
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={<Trash2 size={16} />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PostCard;
