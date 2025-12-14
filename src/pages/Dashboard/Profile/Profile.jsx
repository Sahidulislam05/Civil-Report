import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserInfo from "../../../hooks/useUserInfo";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userInfo, isLoading, refetchUserInfo] = useUserInfo();

  const handleSubscribe = async () => {
    try {
      const paymentInfo = {
        price: 10,
        email: user.email,
        name: "Premium Subscription",
        description: "Unlimited issue submission access",
      };

      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );

      // redirect immediately
      window.location.replace(res.data.url);
    } catch (err) {
      const message =
        err.response?.data?.message || "Payment failed, please try again.";

      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: message,
        confirmButtonText: "OK",
      });
    }
  };

  // ✅ Check Stripe return status on profile load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      (async () => {
        try {
          await axiosSecure.post("/session-status", { sessionId });
          await refetchUserInfo(); // wait until updated
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          ); // remove session_id from URL
        } catch (err) {
          console.error("Payment status check failed:", err);
        }
      })();
    }
  }, [axiosSecure, refetchUserInfo]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <img
            alt="profile"
            src={user?.photoURL}
            className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white"
          />

          {/* Role tag */}
          <p className="p-2 px-4 text-xs text-white bg-gray-600 rounded-full">
            {userInfo?.role}
          </p>

          {userInfo?.blocked && (
            <div className="w-full bg-red-500 mt-2 text-white px-3 py-2 rounded-lg text-center font-semibold">
              ⛔ Your account is blocked. Please contact authorities.
            </div>
          )}

          <p className="mt-2 text-xl font-medium text-gray-800">
            User ID: {user?.uid}
          </p>

          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <p className="flex flex-col">
                Name
                <span className="font-bold flex items-center gap-2">
                  {user?.displayName}
                  {userInfo?.premium && (
                    <span className="flex items-center gap-1 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">
                      ⭐ Premium
                    </span>
                  )}
                </span>
              </p>

              <p className="flex flex-col">
                Email
                <span className="font-bold">{user?.email}</span>
              </p>
            </div>
          </div>

          {/* Subscription Area */}
          {!userInfo?.premium && (
            <div className="w-full px-6 mt-4">
              <button
                onClick={handleSubscribe}
                disabled={userInfo?.blocked}
                className={`w-full py-2 rounded-lg text-white font-medium ${
                  userInfo?.blocked
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-800"
                }`}
              >
                {userInfo?.blocked
                  ? "Subscription Disabled (Blocked)"
                  : "Subscribe 1000tk"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
