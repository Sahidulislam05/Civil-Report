import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const BoostSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const auth = getAuth();
    const verifyPayment = async (user) => {
      if (!sessionId || !user) return;

      try {
        const token = await user.getIdToken(true);

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/session-status`,
          { sessionId },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        if (res.data.success && res.data.boosted) {
          setSuccess(true);
          queryClient.invalidateQueries(["issue-details", res.data.issueId]);
          queryClient.invalidateQueries(["issue-timeline", res.data.issueId]);
        } else {
          setSuccess(false);
        }
      } catch (err) {
        // console.log("Payment Verify Error:", err.response?.data || err);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) verifyPayment(user);
      else {
        // console.log("User not logged in!");
        setLoading(false);
        setSuccess(false);
      }
    });

    return () => unsubscribe();
  }, [sessionId]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Processing your payment...</p>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center animate-fadeIn">
        {success ? (
          <>
            <h1 className="text-3xl font-bold text-green-500 mb-4">
              Boost Successful! 🎉
            </h1>
            <p className="text-gray-600 mb-6">
              Your issue priority is now <strong>HIGH</strong>.
            </p>
            <Link
              to={"/all-issues"}
              className="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Back to Issue
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-red-500 mb-4">
              Payment Failed 😢
            </h1>
            <p className="text-gray-600 mb-6">
              There was an error processing your boost. Please try again.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BoostSuccess;
