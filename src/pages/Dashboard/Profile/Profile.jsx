import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserInfo from "../../../hooks/useUserInfo";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userInfo, isLoading, refetchUserInfo] = useUserInfo(); // include refetch

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

      window.location.replace(res.data.url); // redirect to Stripe
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Payment failed, please try again.");
    }
  };

  // Check if returning from Stripe after successful payment
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      (async () => {
        try {
          await axiosSecure.post("/session-status", { sessionId });
          refetchUserInfo(); // refetch user info to show premium badge
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

          {userInfo?.premium ? (
            <p className="p-2 px-4 text-xs text-white bg-yellow-500 rounded-full">
              ⭐ Premium User
            </p>
          ) : (
            <p className="p-2 px-4 text-xs text-white bg-gray-600 rounded-full">
              {userInfo?.role}
            </p>
          )}

          {userInfo?.blocked && (
            <p className="bg-red-500 mt-2 text-white px-3 py-1 rounded-lg text-sm">
              Your account is blocked. Please contact authorities.
            </p>
          )}

          <p className="mt-2 text-xl font-medium text-gray-800">
            User ID: {user?.uid}
          </p>

          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <p className="flex flex-col">
                Name
                <span className="font-bold">{user?.displayName}</span>
              </p>

              <p className="flex flex-col">
                Email
                <span className="font-bold">{user?.email}</span>
              </p>

              <div>
                <button className="bg-lime-500 px-10 py-1 rounded-lg text-white hover:bg-lime-800 block mb-1">
                  Update Profile
                </button>

                <button className="bg-lime-500 px-7 py-1 rounded-lg text-white hover:bg-lime-800">
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {!userInfo?.premium && !userInfo?.blocked && (
            <div className="w-full px-6 mt-4">
              <button
                className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-800"
                onClick={handleSubscribe}
              >
                Subscribe (1000tk = 10$)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
