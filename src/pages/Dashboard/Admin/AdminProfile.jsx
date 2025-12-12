import { use } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../../provider/AuthContext";
import useUserInfo from "../../../hooks/useUserInfo";

const AdminProfile = () => {
  const { user, setUser, updateUser } = use(AuthContext);
  const [userInfo] = useUserInfo();

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const photo = e.target.photo.value.trim();

    if (!name || !photo) {
      toast.error("Please fill in all fields");
      return;
    }

    updateUser({ displayName: name, photoURL: photo })
      .then(() => {
        setUser({ ...user, displayName: name, photoURL: photo });
        toast.success("Profile Updated Successfully!");
      })
      .catch((e) => {
        toast.error(e.code || "Update failed");
        setUser(user);
      });
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center mt-10">
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 px-4 py-10 bg-gray-50 dark:bg-gray-900">
      <title> Profile</title>

      {/* Profile Card */}
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 space-y-6 text-center border border-gray-100 dark:border-gray-700">
        <p className="inline-block px-4 py-1 text-xs text-white bg-gray-700 rounded-full shadow">
          {userInfo?.role || "Admin"}
        </p>

        <div className="grid sm:grid-cols-2 gap-6 text-left">
          {/* Name */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
            <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              {user?.displayName}
            </div>
          </div>

          {/* Email */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Update Form */}
      <form
        onSubmit={handleUpdateProfile}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 space-y-6 border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Update Profile
        </h2>

        <div className="flex justify-center">
          <img
            src={
              user?.photoURL ||
              "https://img.icons8.com/?size=96&id=80850&format=png"
            }
            alt={user?.displayName || "User"}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-purple-500 shadow-md object-cover"
          />
        </div>

        {/* Name */}
        <div>
          <label className="label text-gray-700 dark:text-gray-300 font-semibold">
            Name
          </label>
          <input
            name="name"
            type="text"
            defaultValue={user?.displayName}
            className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
            placeholder="Your Name"
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="label text-gray-700 dark:text-gray-300 font-semibold">
            Photo URL
          </label>
          <input
            name="photo"
            type="text"
            defaultValue={user?.photoURL}
            className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
            placeholder="Profile Photo URL"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
          <button
            type="submit"
            className="btn w-full sm:w-auto bg-linear-to-r from-purple-600 to-purple-800 text-white border-none shadow-md hover:from-purple-700 hover:to-purple-900"
          >
            Update Information
          </button>

          <Link
            to="/"
            className="btn w-full sm:w-auto border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
          >
            Go Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
