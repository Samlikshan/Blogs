import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImagePlus } from "lucide-react";
import { Post } from "../../types";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/reducers/rootReducer";
import { toast } from "sonner";

interface PostFormProps {
  initialData?: Post;
  onSubmit: (data: FormData) => Promise<void>;
  isLoading: boolean;
}

const PostForm: React.FC<PostFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
}) => {
  const user = useSelector((state: RootState) => state.user.userData);
  const [content, setContent] = useState(initialData?.content || "");
  const [imagePreview, setImagePreview] = useState(initialData?.imageUrl || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      imageUrl: initialData?.imageUrl || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        imageUrl: initialData.imageUrl,
      });
      setContent(initialData.content);
      setImagePreview(
        `${import.meta.env.VITE_S3_PATH}/${initialData.imageUrl}`
      );
    }
  }, [initialData, reset]);

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const imageUrl = reader.result as string;
  //       setValue("imageUrl", imageUrl);
  //       setImagePreview(imageUrl);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Store the file object
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result as string;
        setImagePreview(previewUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleFormSubmit = async (data: any) => {
  //   if (!content) {
  //     alert("Please add some content to your post");
  //     return;
  //   }

  //   await onSubmit({
  //     ...data,
  //     content,
  //     authorId: user?._id,
  //   });
  // };
  const handleFormSubmit = async (data: {
    title: string;
    content: string;
    imageUrl: string;
  }) => {
    if (!content) {
      toast.error("Please add some content to your post");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", content);
    formData.append("authorId", user?._id || "");

    if (imageFile) {
      formData.append("blog-image", imageFile);
    } else if (initialData?.imageUrl) {
      formData.append("imageUrl", initialData.imageUrl);
    }

    await onSubmit(formData);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "blockquote", "code-block"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Input
        label="Post Title"
        placeholder="Enter a compelling title"
        {...register("title", {
          required: "Title is required",
          minLength: {
            value: 5,
            message: "Title must be at least 5 characters",
          },
        })}
        error={errors.title?.message}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Post Image
        </label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {imagePreview ? (
          <div className="mt-4 relative h-48 rounded-md overflow-hidden group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-gray-900"
              >
                Change Image
              </Button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center h-48 bg-gray-50 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <ImagePlus className="h-10 w-10 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              Click to upload an image
            </p>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Post Content
        </label>
        <div className="prose-sm prose-slate max-w-none">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            className="h-64 mb-12"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {initialData ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
