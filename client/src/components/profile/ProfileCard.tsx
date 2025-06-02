import React from "react";
import { User, Settings } from "lucide-react";

import Button from "../ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/reducers/rootReducer";

interface ProfileCardProps {
  onEditProfile: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ onEditProfile }) => {
  const user = useSelector((state: RootState) => state.user.userData);

  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-4">
        <div className="relative group">
          {user.avatar ? (
            <img
              src={`${import.meta.env.VITE_S3_PATH}/${user.avatar}`}
              alt={user.username}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
              <User size={32} className="text-blue-500" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">
            {user.username}
          </h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={<Settings size={16} />}
          onClick={onEditProfile}
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
