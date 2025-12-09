import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import { FaEdit, FaTrash, FaEye, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axios from "axios";

const MyIssues = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [editingIssue, setEditingIssue] = useState(null);

  // 🔥 FIXED Query
  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["issues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/my-issues?email=${user.email}`
      );
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axios.delete(`http://localhost:5000/issues/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["issues"]);
      toast.success("Issue deleted");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">My Reported Issues</h2>

      {isLoading ? (
        <div className="text-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
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
                    <span className={`badge ${issue.status}`}>
                      {issue.status}
                    </span>
                  </td>

                  <td>{new Date(issue.createdAt).toLocaleDateString()}</td>

                  <td className="flex gap-2">
                    <Link
                      to={`/issues/${issue._id}`}
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

              {issues.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    No issues found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editingIssue && (
        <EditIssueModal
          issue={editingIssue}
          onClose={() => setEditingIssue(null)}
        />
      )}
    </div>
  );
};

export default MyIssues;
