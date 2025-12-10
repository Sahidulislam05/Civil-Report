import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaEye, FaFlag } from "react-icons/fa";
import toast from "react-hot-toast";

const AssignedIssues = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [statusFilter, setStatusFilter] = useState("");

  // Fetch assigned issues
  const { data: allIssues = [], isLoading } = useQuery({
    queryKey: ["issues", user.email, statusFilter],
    queryFn: async () => {
      const params = {};
      if (statusFilter) params.status = statusFilter;

      const res = await axiosSecure.get("/issues", { params });
      return res.data;
    },
    keepPreviousData: true,
  });

  // Mutation to update status
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/issues/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["issues", user.email, statusFilter]);
      toast.success("Status updated successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to update status");
    },
  });

  const handleStatusChange = (id, newStatus) => {
    statusMutation.mutate({ id, status: newStatus });
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-headings font-bold text-primary">
          Assigned Tasks
        </h2>
        <select
          className="select select-bordered"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="working">Working</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {allIssues.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No assigned tasks found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-gray-100">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-50">
                <th>Issue</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Change Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {allIssues.map((issue) => (
                <tr
                  key={issue._id}
                  className={issue.priority === "high" ? "bg-orange-50/50" : ""}
                >
                  <td>
                    <div className="font-bold">{issue.title}</div>
                    <div className="text-sm opacity-50">{issue.location}</div>
                  </td>
                  <td>
                    {issue.priority === "high" ? (
                      <span className="badge badge-error text-white gap-1">
                        <FaFlag /> High
                      </span>
                    ) : (
                      <span className="badge badge-ghost">Normal</span>
                    )}
                  </td>
                  <td>
                    <span
                      className={`badge capitalize ${
                        issue.status === "resolved" || issue.status === "closed"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="select select-bordered select-xs w-full max-w-xs"
                      defaultValue={issue.status}
                      onChange={(e) =>
                        handleStatusChange(issue._id, e.target.value)
                      }
                    >
                      <option disabled>Change Status</option>
                      {["in-progress", "working", "resolved", "closed"].map(
                        (s) => (
                          <option key={s} value={s}>
                            {s.replace("-", " ")}
                          </option>
                        )
                      )}
                    </select>
                  </td>
                  <td>
                    <Link
                      to={`/issues/${issue._id}`}
                      className="btn btn-square btn-sm btn-ghost"
                    >
                      <FaEye className="text-primary" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignedIssues;
