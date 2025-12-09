import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import { saveUser } from "../../utils";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await googleLogin();
      await saveUser({
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
      });
      toast.success("Login Successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Google Sign In Failed");
    }
  };

  return (
    <div className="px-8 pb-8">
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline w-full flex items-center gap-2 hover:bg-red-50 hover:border-red-500 hover:text-red-500 transition-all font-bold"
      >
        <FaGoogle /> Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
