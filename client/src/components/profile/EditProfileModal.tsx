import React, { useRef, useState, useEffect } from "react";
import { User } from "lucide-react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
// import TextArea from "../ui/TextArea";
import { User as UserType } from "../../types";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    username: string;
    bio: string;
    avatar: File | null;
  }) => Promise<void>;
  user: UserType;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
  user,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    `${import.meta.env.VITE_S3_PATH}/${user.avatar}`
  );

  // Validation states
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset validation when modal reopens
  useEffect(() => {
    if (isOpen) {
      setUsernameError(null);
      setAvatarError(null);
    }
  }, [isOpen]);

  const validateForm = () => {
    let isValid = true;

    // Username validation
    if (!username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    } else if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      isValid = false;
    } else if (username.length > 30) {
      setUsernameError("Username cannot exceed 30 characters");
      isValid = false;
    }

    // Avatar validation
    if (avatarFile) {
      if (!avatarFile.type.startsWith("image/")) {
        setAvatarError("Please select a valid image file");
        isValid = false;
      } else if (avatarFile.size > 5 * 1024 * 1024) {
        setAvatarError("Image size must be less than 5MB");
        isValid = false;
      }
    }

    return isValid;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setAvatarError(null); // Clear previous error

    if (file) {
      // Validate image file
      if (!file.type.startsWith("image/")) {
        setAvatarError("Please select a valid image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setAvatarError("Image size must be less than 5MB");
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    // Validate form before submission
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      await onSave({ username, bio, avatar: avatarFile });
      onClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Profile"
      onConfirm={handleSubmit}
      confirmText={isLoading ? "Saving..." : "Save Changes"}
      isConfirmDisabled={isLoading}
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer group"
          >
            {avatarPreview ? (
              <div className="relative">
                <img
                  src={avatarPreview}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm">Change Photo</span>
                </div>
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <User size={32} className="text-blue-500" />
              </div>
            )}
          </div>
          {avatarError && (
            <p className="mt-2 text-red-500 text-sm">{avatarError}</p>
          )}
        </div>

        <div>
          <Input
            label="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              // Clear error when user types
              if (usernameError) setUsernameError(null);
            }}
            hasError={!!usernameError}
          />
          {usernameError && (
            <p className="mt-1 text-red-500 text-sm">{usernameError}</p>
          )}
        </div>

        {/* <TextArea
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself..."
          rows={4}
        /> */}
      </div>
    </Modal>
  );
};

export default EditProfileModal;
