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
      toast.error(error.code);
      console.log(error);
    }
  };

  if (loading && user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md bg-white border shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium block mb-1">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-primary"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium block mb-1">Password</label>
            <input
              type="password"
              placeholder="******"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-primary"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">Password is required</p>
            )}
            <div className="flex justify-end">
              <Link
                to="#"
                className="text-xs font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit */}
          <button className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transition disabled:opacity-60">
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          New here?{" "}
          <Link
            to="/register"
            className="text-primary font-bold hover:underline"
          >
            Create an account
          </Link>
        </p>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
