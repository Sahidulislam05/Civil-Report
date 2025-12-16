import { FaArrowUp } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function AllIssueCard({ issue }) {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const hasUpvoted =
    user && Array.isArray(issue.upvotes) && issue.upvotes.includes(user.email);

  const upvoteMutation = useMutation({
    mutationFn: async () => axiosSecure.post(`/issues/${issue._id}/upvote`),

    onMutate: async () => {
      await queryClient.cancelQueries(["all-issues"]);
      const previous = queryClient.getQueryData(["all-issues"]);

      queryClient.setQueryData(["all-issues"], (old) => {
        if (!old) return old;
        return {
          ...old,
          issues: old.issues.map((i) =>
            i._id === issue._id
              ? {
                  ...i,
                  upvoteCount: (i.upvoteCount || 0) + 1,
                  upvotes: [...(i.upvotes || []), user.email],
                }
              : i
          ),
        };
      });

      return { previous };
    },

    onError: (err, _, context) => {
      queryClient.setQueryData(["all-issues"], context.previous);
      toast.error(err.response?.data?.error || "Upvote failed");
    },

    onSettled: () => queryClient.invalidateQueries(["all-issues"]),
  });

  const handleUpvote = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (issue.email === user.email) {
      toast.error("You cannot upvote your own issue");
      return;
    }

    if (hasUpvoted) {
      toast.error("You already upvoted this issue");
      return;
    }

    upvoteMutation.mutate();
  };

  return (
    <div className="card bg-base-100 w-96 shadow-md hover:shadow-xl transition rounded-xl overflow-hidden flex flex-col">
      {issue.image && (
        <figure>
          <img
            src={issue.image}
            alt={issue.title}
            className="w-full h-48 object-cover"
          />
        </figure>
      )}

      <div className="card-body flex flex-col grow">
        {issue.priority === "high" && (
          <span className="badge badge-error absolute top-3 right-3">
            Boosted
          </span>
        )}

        <h2 className="card-title text-lg font-bold line-clamp-2">
          {issue.title}
        </h2>
        <p className="text-gray-500 text-sm line-clamp-3 mt-1">
          {issue.description || "No description provided."}
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          <span className="badge badge-outline">
            {issue.category || "General"}
          </span>
          <span className="badge badge-info">{issue.status}</span>
          <span className="badge badge-success">
            {issue.priority || "Normal"}
          </span>
        </div>

        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <span>Upvotes: {issue.upvoteCount || 0}</span>
          <span>{new Date(issue.createdAt).toLocaleDateString("en-US")}</span>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleUpvote}
            disabled={upvoteMutation.isLoading || hasUpvoted}
            className={`btn btn-sm flex-1 gap-2 ${
              hasUpvoted ? "btn-disabled" : "btn-outline"
            }`}
          >
            <FaArrowUp /> {issue.upvoteCount || 0}
          </button>

          <Link
            to={`/issues-details/${issue._id}`}
            className="btn btn-sm btn-primary flex-1"
          >
            View Details
          </Link>
        </div>

        {hasUpvoted && (
          <p className="text-xs text-green-500 mt-2 text-center">
            You already upvoted
          </p>
        )}
      </div>
    </div>
  );
}
