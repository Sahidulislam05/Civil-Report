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
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    const { name, image, email, password } = data;
    try {
      const imageURL = await imageUpload(image[0]);
      await createUser(email, password);
      await saveUser({ name, email, image: imageURL });
      await updateUser(name, imageURL);
      toast.success("Signup Successful!");
      navigate(from, { replace: true });
    } catch (error) {
      // console.error(error);
      toast.error(error?.code || "Signup Failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-primary">
          Create Your Account
        </h2>
        <p className="text-center text-gray-500">
          Sign up to start reporting issues
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Sahidul Islam"
              className="input input-bordered input-primary w-full"
              {...register("name", { required: "Full Name is required" })}
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="input input-bordered input-secondary w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Profile Photo */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Profile Photo</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-accent w-full"
              {...register("image", { required: "Profile photo is required" })}
            />
            {errors.image && (
              <p className="text-error text-sm mt-1">{errors.image.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              placeholder="********"
              className="input input-bordered input-info w-full"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                  message:
                    "Must include at least one letter, one number, and one special character",
                },
              })}
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full text-white text-lg font-semibold hover:btn-secondary transition-all"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
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
