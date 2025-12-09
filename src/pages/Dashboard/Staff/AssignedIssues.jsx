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

  // --------------------------
  // Fetch all issues
  // --------------------------
  const { data: allIssues = [], isLoading } = useQuery({
    queryKey: ["issues", "staff_all"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      return res.data;
    },
  });

  // --------------------------
  // Filter issues assigned to this staff
  // --------------------------
  const assignedIssues = allIssues.filter(
    (i) => i.assignedTo?._id === user._id
  );

  // --------------------------
  // Filter by status if selected
  // --------------------------
  const filteredIssues = statusFilter
    ? assignedIssues.filter((i) => i.status === statusFilter)
    : assignedIssues;

  // --------------------------
  // Mutation to change status
  // --------------------------
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/issues/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["issues"]);
      toast.success("Status updated successfully");
    },
  });

  const handleStatusChange = (id, newStatus) => {
    statusMutation.mutate({ id, status: newStatus });
  };

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
          <option value="in-progress">In Progress</option>
          <option value="working">Working</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <span className="loading loading-spinner"></span>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-gray-100">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-50">
                <th>Issue</th>
                <th>Priority</th>
                <th>Current Status</th>
                <th>Action</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.map((issue) => (
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
                      <option value="in-progress">In Progress</option>
                      <option value="working">Working</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
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
              {filteredIssues.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-400">
                    No assigned tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignedIssues;
