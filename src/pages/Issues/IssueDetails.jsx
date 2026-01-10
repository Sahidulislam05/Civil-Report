import { useParams, useNavigate, Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FaEdit,
  FaTrash,
  FaBolt,
  FaArrowUp,
  FaMapMarkerAlt,
  FaUserTie,
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
export default function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: issue,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["issue-details", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}`);
      return res.data;
    },
  });

  /* ================= FETCH TIMELINE ================= */
  const { data: timeline = [] } = useQuery({
    queryKey: ["issue-timeline", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}/timeline`);
      return res.data;
    },
  });

  /* ================= DELETE ================= */
  const deleteMutation = useMutation({
    mutationFn: async () => axiosSecure.delete(`/issues/${id}/delete`),
    onSuccess: () => {
      toast.success("Issue deleted");
      queryClient.invalidateQueries(["issue-details", id]);
      queryClient.invalidateQueries(["issue-timeline", id]);
      navigate("/dashboard/my-issues");
    },
    onError: (err) => toast.error(err.response?.data?.error || "Delete failed"),
  });

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This issue will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate();
      }
    });
  };

  /* ================= BOOST ================= */
  const handleBoost = async () => {
    try {
      const res = await axiosSecure.post(`/issues/${id}/boost-checkout`);
      window.location.href = res.data.url;
    } catch (err) {
      toast.error(err.response?.data?.error || "Boost failed");
    }
  };

  /* ================= UPVOTE ================= */
  const upvoteMutation = useMutation({
    mutationFn: async () => axiosSecure.post(`/issues/${id}/upvote`),
    onSuccess: () => {
      queryClient.invalidateQueries(["issue-details", id]);
      queryClient.invalidateQueries(["issue-timeline", id]);
    },
    onError: (err) => {
      if (err.response?.status === 401) navigate("/login");
      else toast.error(err.response?.data?.error || "Upvote failed");
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-32">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );

  // ... (other imports)

  if (isError || !issue)
    return (
      <div className="text-center py-32 text-error">Failed to load issue</div>
    );

  const hasUpvoted =
    user && Array.isArray(issue.upvotes) && issue.upvotes.includes(user.email);

  const isOwner = user?.email === issue.email;
  const canEdit = isOwner && issue.status === "pending";

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mt-2 bg-base-200 min-h-screen transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT COLUMN (Main Content) ================= */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image / Media Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-base-100 rounded-2xl shadow-sm overflow-hidden border border-base-300"
          >
            {issue.image ? (
              <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-[400px] object-cover"
              />
            ) : (
              <div className="w-full h-[400px] bg-base-300 flex items-center justify-center text-base-content/50">
                No Image Available
              </div>
            )}
          </motion.div>

          {/* Overview / Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-base-100 rounded-2xl shadow-sm p-8 border border-base-300"
          >
            <h2 className="text-2xl font-bold mb-4 text-primary">Overview</h2>
            <div className="prose max-w-none text-base-content/80">
              <h1 className="text-3xl font-bold text-base-content mb-4">
                {issue.title}
              </h1>
              <p className="text-lg leading-relaxed">{issue.description}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 pt-6 border-t border-base-200">
              <div className="flex items-center gap-2 text-base-content/70">
                <FaMapMarkerAlt className="text-primary" />
                <span>{issue.location}</span>
              </div>
              <div className="flex items-center gap-2 text-base-content/70">
                <span className="font-semibold">Category:</span>
                <span>{issue.category}</span>
              </div>
              <div className="flex items-center gap-2 text-base-content/70">
                <span className="font-semibold">Votes:</span>
                <span>{issue.upvoteCount || 0}</span>
              </div>
            </div>
          </motion.div>

          {/* Reviews / Comments Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-base-100 rounded-2xl shadow-sm p-8 border border-base-300"
          >
            <h3 className="text-xl font-bold mb-4 text-base-content">
              Community Discussion
            </h3>
            <p className="text-base-content/50 italic">
              No comments yet. be the first to start the discussion.
            </p>
            {/* Can implement comment system later */}
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-base-100 rounded-2xl shadow-sm p-8 border border-base-300"
          >
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Issue Timeline
            </h2>
            <div className="relative border-l-2 border-base-300 pl-8 space-y-8">
              {timeline.length > 0 ? (
                timeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[41px] top-1 w-6 h-6 bg-base-100 border-4 border-primary rounded-full" />
                    <div className="bg-base-200 p-5 rounded-xl border border-base-300 relative">
                      {/* Arrow */}
                      <div className="absolute top-4 -left-2 w-4 h-4 bg-base-200 transform rotate-45 border-l border-b border-base-300"></div>

                      <div className="flex justify-between items-center mb-3">
                        <span className="badge badge-primary badge-outline font-bold">
                          {item.status || "Update"}
                        </span>
                        <span className="text-xs text-base-content/60 font-medium tracking-wide">
                          {new Date(item.time).toLocaleString()}
                        </span>
                      </div>
                      <p className="font-medium text-base-content">
                        {item.message}
                      </p>
                      {item.updatedBy && (
                        <p className="text-sm text-base-content/60 mt-2 flex items-center gap-1">
                          <FaUserTie className="w-3 h-3" /> {item.updatedBy}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-base-content/50">No timeline events yet.</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* ================= RIGHT COLUMN (Sidebar) ================= */}
        <div className="space-y-8">
          {/* Actions Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-base-100 rounded-2xl shadow-sm p-6 border border-base-300 sticky top-24"
          >
            <div className="flex justify-between items-center mb-6">
              <span
                className={`badge badge-lg ${
                  issue.status === "resolved"
                    ? "badge-success text-white"
                    : "badge-info text-white"
                } capitalize px-4 py-3`}
              >
                {issue.status}
              </span>
              <span
                className={`badge badge-lg badge-outline capitalize ${
                  issue.priority === "high" ? "text-error border-error" : ""
                }`}
              >
                {issue.priority} Priority
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button
                className={`btn btn-primary w-full ${
                  hasUpvoted ? "btn-disabled" : ""
                }`}
                onClick={() => {
                  if (!user) navigate("/login");
                  else upvoteMutation.mutate();
                }}
              >
                <FaArrowUp /> {hasUpvoted ? "Upvoted" : "Upvote Issue"} (
                {issue.upvoteCount || 0})
              </button>

              {issue.priority !== "high" && (
                <button
                  onClick={handleBoost}
                  className="btn btn-warning w-full text-white"
                >
                  <FaBolt /> Boost Issue (৳100)
                </button>
              )}

              {canEdit && (
                <Link
                  to={`/edit-issue/${issue._id}`}
                  className="btn btn-outline w-full"
                >
                  <FaEdit /> Edit Issue
                </Link>
              )}

              {isOwner && (
                <button
                  className="btn btn-error btn-outline w-full"
                  onClick={handleDelete}
                  disabled={deleteMutation.isLoading}
                >
                  <FaTrash /> Delete Issue
                </button>
              )}
            </div>

            {/* Staff Info */}
            {issue.assignedTo && (
              <div className="mt-8 pt-6 border-t border-base-200">
                <h4 className="text-sm font-bold text-base-content/50 uppercase tracking-wider mb-4">
                  Assigned Staff
                </h4>
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                      <span className="text-lg">
                        {issue.assignedTo.name[0]}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-base-content">
                      {issue.assignedTo.name}
                    </p>
                    <p className="text-xs text-base-content/60">
                      Verified Staff
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Related Items Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-base-100 rounded-2xl shadow-sm p-6 border border-base-300"
          >
            <h3 className="font-bold text-lg mb-4 text-base-content">
              Related Issues
            </h3>
            {/* Simplified list for mock */}
            <div className="space-y-4">
              <div className="flex gap-3 items-center opacity-60">
                <div className="w-12 h-12 bg-base-200 rounded-lg"></div>
                <div>
                  <div className="h-3 w-32 bg-base-200 rounded mb-1"></div>
                  <div className="h-2 w-20 bg-base-200 rounded"></div>
                </div>
              </div>
              <div className="flex gap-3 items-center opacity-60">
                <div className="w-12 h-12 bg-base-200 rounded-lg"></div>
                <div>
                  <div className="h-3 w-32 bg-base-200 rounded mb-1"></div>
                  <div className="h-2 w-20 bg-base-200 rounded"></div>
                </div>
              </div>
              <p className="text-xs text-center text-base-content/50 mt-2">
                No related issues found currently.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
