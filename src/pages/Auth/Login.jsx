import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useEffect } from "react";
import SocialLogin from "./SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import { saveUser } from "../../utils";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginUser, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const onSubmit = async (data) => {
    try {
      const { user } = await loginUser(data.email, data.password);
      await saveUser({
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
      });
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.code || "Login failed!");
      console.log(error);
    }
  };

  if (loading && user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-100 via-pink-100 to-yellow-100 px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-primary">Login</h2>
        <p className="text-center text-gray-500">
          Welcome back! Please login to continue.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="input input-bordered input-primary w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
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
              className="input input-bordered input-secondary w-full"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            <div className="flex justify-end mt-1">
              <Link
                to="#"
                className="text-xs font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full text-white font-semibold text-lg hover:btn-secondary transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          New here?{" "}
          <Link
            to="/register"
            className="text-primary font-bold hover:underline"
          >
            Create an account
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-500">or continue with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
