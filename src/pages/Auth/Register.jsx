import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { imageUpload, saveUser } from "../../utils";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const onSubmit = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];
    try {
      const imageURL = await imageUpload(imageFile);
      await createUser(email, password);
      await saveUser({ name, image: imageURL, email });
      await updateUser(name, imageURL);
      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (error) {
      toast.error(error.code);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-xl border rounded-2xl p-8 space-y-6 animate-fade-in">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-medium mb-1 block">Full Name</label>
            <input
              type="text"
              placeholder="Sahidul Islam"
              className="w-full rounded-lg border px-4 py-3 focus:border-primary outline-none"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">Name is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full rounded-lg border px-4 py-3 focus:border-primary outline-none"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">Email is required</p>
            )}
          </div>

          {/* Profile Photo */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full rounded-lg border px-4 py-2 cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-primary file:text-white file:rounded-md"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">Photo is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium mb-1 block">Password</label>
            <input
              type="password"
              placeholder="******"
              className="w-full rounded-lg border px-4 py-3 focus:border-primary outline-none"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-xs mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-xs mt-1">
                Password must be 6+ chars
              </p>
            )}
          </div>

          {/* Submit */}
          <button className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transition disabled:opacity-60">
            Register
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
