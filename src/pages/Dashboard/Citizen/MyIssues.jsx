import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaEdit, FaTrash, FaEye, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const categories = ["Road", "Water", "Electricity", "Sanitation", "Other"]; // example categories

const MyIssues = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingIssue, setEditingIssue] = useState(null);

  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["issues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/issues", {
        params: { email: user.email },
      });
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/issues/${id}/delete`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["issues", user?.email]);
      toast.success("Issue deleted successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to delete issue");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  const editMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axiosSecure.patch(`/issues/${id}/edit`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["issues", user?.email]);
      toast.success("Issue updated successfully");
      setEditingIssue(null);
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to update issue");
    },
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    editMutation.mutate({ id: editingIssue._id, data });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">My Reported Issues</h2>

      {isLoading ? (
        <div className="text-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : issues.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          You have not reported any issues yet.
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-50">
                <th>Issue</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue._id} className="hover:bg-gray-50">
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        className="w-12 h-12 rounded-md"
                        src={issue.image}
                        alt={issue.title}
                      />
                      <div>
                        <p className="font-bold">{issue.title}</p>
                        <p className="text-sm flex items-center gap-1 opacity-60">
                          <FaMapMarkerAlt /> {issue.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>{issue.category}</td>
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
                  <td>{new Date(issue.createdAt).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/issues-details/${issue._id}`}
                      className="btn btn-square btn-sm btn-ghost"
                    >
                      <FaEye />
                    </Link>

                    {issue.status === "pending" && (
                      <>
                        <button
                          onClick={() => setEditingIssue(issue)}
                          className="btn btn-square btn-sm btn-ghost"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => handleDelete(issue._id)}
                          className="btn btn-square btn-sm btn-ghost"
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Issue Modal */}
      {editingIssue && (
        <dialog className="modal modal-open">
          <form
            onSubmit={handleEditSubmit}
            className="modal-box flex flex-col gap-4"
          >
            <h3 className="font-bold text-lg">
              Edit Issue: {editingIssue.title}
            </h3>

            <input
              type="text"
              name="title"
              defaultValue={editingIssue.title}
              placeholder="Title"
              className="input input-bordered w-full"
              required
            />

            <input
              type="text"
              name="location"
              defaultValue={editingIssue.location}
              placeholder="Location"
              className="input input-bordered w-full"
              required
            />

            <select
              name="category"
              defaultValue={editingIssue.category}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <textarea
              name="description"
              defaultValue={editingIssue.description}
              placeholder="Description"
              className="textarea textarea-bordered w-full"
              rows={4}
              required
            />

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => setEditingIssue(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default MyIssues;
