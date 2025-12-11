import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { getAuth } from "firebase/auth";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verify = async () => {
      if (!sessionId) return;

      try {
        const auth = getAuth();

        // ⚠️ Stripe theke ferar por token expire thake
        // 100% working fix: force refresh token
        const token = await auth.currentUser.getIdToken(true);

        await axios.post(
          `${import.meta.env.VITE_API_URL}/session-status`,
          { sessionId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
      } catch (err) {
        console.log("Payment Verify Error:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [sessionId]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Processing payment...</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Your premium membership is activated.
        </p>

        <Link
          to="/dashboard/profile"
          className="inline-block bg-lime-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition duration-300"
        >
          Go to My Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
