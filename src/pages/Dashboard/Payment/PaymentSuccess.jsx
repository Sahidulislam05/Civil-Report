import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useUserInfo from "../../../hooks/useUserInfo";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  const [, , refetchUserInfo] = useUserInfo();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) return;

      try {
        const res = await axiosSecure.post("/session-status", { sessionId });
        // console.log("Payment verified:", res.data);

        if (res.data?.premium) {
          await refetchUserInfo();
        }
      } catch (err) {
        // console.error("Payment Verify Error:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, axiosSecure, refetchUserInfo]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Processing payment...</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Your premium membership is now active.
        </p>

        <Link
          to="/dashboard/profile"
          className="inline-block bg-lime-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-lime-600 transition"
        >
          Go to My Profile
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
