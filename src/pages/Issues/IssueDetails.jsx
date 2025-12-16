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

  if (isError || !issue)
    return (
      <div className="text-center py-32 text-red-500">Failed to load issue</div>
    );

  const isOwner = user?.email === issue.email;
  const canEdit = isOwner && issue.status === "pending";

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 mt-2">
      {/* ================= ISSUE CARD ================= */}
      <div className="bg-white shadow-xl rounded-xl p-6 mb-10">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold">{issue.title}</h1>
          {issue.priority === "high" && (
            <span className="badge badge-error">BOOSTED</span>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          <span className="badge badge-outline">{issue.category}</span>
          <span className="badge badge-info capitalize">{issue.status}</span>
          <span className="badge badge-warning capitalize">
            {issue.priority}
          </span>
        </div>

        <p className="mt-6 text-gray-600">{issue.description}</p>
        <p className="mt-4 flex items-center gap-2 text-gray-500">
          <FaMapMarkerAlt /> {issue.location}
        </p>

        {/* ================= STAFF INFO ================= */}
        {issue.assignedTo && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg flex gap-3 items-center">
            <FaUserTie className="text-xl text-primary" />
            <div>
              <p className="font-semibold">{issue.assignedTo.name}</p>
              <p className="text-sm text-gray-500">Assigned Staff</p>
            </div>
          </div>
        )}

        {/* ================= ACTIONS ================= */}
        <div className="flex flex-wrap gap-3 mt-8">
          {canEdit && (
            <Link
              to={`/edit-issue/${issue._id}`}
              className="btn btn-outline flex items-center gap-2"
            >
              <FaEdit /> Edit
            </Link>
          )}

          {isOwner && (
            <button
              className="btn btn-error btn-outline"
              onClick={handleDelete}
              disabled={deleteMutation.isLoading}
            >
              {deleteMutation.isLoading ? "Deleting..." : "Delete"}
            </button>
          )}

          {issue.priority !== "high" && (
            <button onClick={handleBoost} className="btn btn-warning">
              Boost Issue (৳100)
            </button>
          )}

          <button
            className="btn btn-outline"
            onClick={() => {
              if (!user) navigate("/login");
              else upvoteMutation.mutate();
            }}
          >
            <FaArrowUp /> {issue.upvoteCount || 0} Upvotes
          </button>
        </div>
      </div>

      {/* ================= TIMELINE ================= */}
      <div className="bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Issue Timeline</h2>
        <div className="relative border-l-2 border-gray-200 pl-6 space-y-6">
          {timeline.length > 0 ? (
            timeline.map((item, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-3 top-1 w-4 h-4 bg-primary rounded-full" />
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="badge badge-info">
                      {item.status || "Update"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(item.time).toLocaleString()}
                    </span>
                  </div>
                  <p className="font-medium">{item.message}</p>
                  {item.updatedBy && (
                    <p className="text-sm text-gray-500 mt-1">
                      Updated by: {item.updatedBy}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No timeline available</p>
          )}
        </div>
      </div>
    </div>
  );
}
