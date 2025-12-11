import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  // Fetch user profile info
  const { data: profile, isLoading } = useQuery({
    queryKey: ["user", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/info/${user.email}`);
      return res.data;
    },
    onSuccess: () => {
      setName(user?.name || "");
      setImage(null); // reset file input
    },
  });

  // Update profile mutation
  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.patch(`/user/profile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries(["user", user.email]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update profile");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-primary mb-6">My Profile</h2>

      <div className="mb-6 flex items-center space-x-4">
        <img
          src={user?.image || "/default-avatar.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <p className="font-medium">{user?.name}</p>
          <p className="text-gray-500">{user?.email}</p>
          <p className="text-sm">
            Role: <span className="font-semibold">{profile?.role}</span>
          </p>
          {profile?.premium && (
            <p className="text-sm text-green-600 font-semibold">Premium User</p>
          )}
          {profile?.blocked && (
            <p className="text-sm text-red-600 font-semibold">Blocked</p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label font-medium">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-full ${
            updateMutation.isLoading ? "loading" : ""
          }`}
          disabled={updateMutation.isLoading}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
