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

  const upvoteMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.post(`/issues/${issue._id}/upvote`);
    },

    onMutate: async () => {
      await queryClient.cancelQueries(["all-issues"]);

      const previous = queryClient.getQueryData(["all-issues"]);

      queryClient.setQueryData(["all-issues"], (old) => {
        if (!old) return old;

        return {
          ...old,
          issues: old.issues.map((i) =>
            i._id === issue._id
              ? { ...i, upvoteCount: (i.upvoteCount || 0) + 1 }
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

    onSettled: () => {
      queryClient.invalidateQueries(["all-issues"]);
    },
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

    upvoteMutation.mutate();
  };

  return (
    <div className="card bg-white shadow-md relative">
      {/* Boosted badge */}
      {issue.priority === "high" && (
        <span className="badge badge-error absolute top-3 right-3">
          Boosted
        </span>
      )}

      <div className="card-body">
        <h2 className="card-title">{issue.title}</h2>

        <div className="flex gap-2">
          <span className="badge badge-outline">{issue.category}</span>
          <span className="badge badge-info">{issue.status}</span>
        </div>

        <div className="flex justify-between items-center mt-4">
          {/* UPVOTE */}
          <button
            onClick={handleUpvote}
            disabled={upvoteMutation.isLoading}
            className="btn btn-sm btn-outline flex gap-2"
          >
            <FaArrowUp />
            {issue.upvoteCount || 0}
          </button>

          <Link
            to={`/issues-details/${issue._id}`}
            className="btn btn-sm btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
