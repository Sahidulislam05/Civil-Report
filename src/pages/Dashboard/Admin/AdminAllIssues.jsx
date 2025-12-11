import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaUserPlus, FaTimes } from "react-icons/fa";

const AdminAllIssues = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedIssue, setSelectedIssue] = useState(null);

  // Fetch issues
  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["issues", "admin_all"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      return res.data;
    },
  });

  // Fetch staff
  const { data: staff = [] } = useQuery({
    queryKey: ["staff"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/staff");
      return res.data;
    },
  });

  // Assign staff mutation
  const assignMutation = useMutation({
    mutationFn: async ({ issueId, staff }) => {
      const res = await axiosSecure.patch(`/issues/${issueId}`, {
        assignedTo: staff,
        status: "assigned",
      });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["issues"]),
    onError: () => toast.error("Failed to assign staff"),
  });

  // Reject issue mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/issues/${id}`, {
        status: "closed",
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["issues"]);
      toast.success("Issue rejected/closed");
    },
    onError: () => toast.error("Failed to reject issue"),
  });

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject Issue?",
      text: "This will mark the issue as closed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    }).then((result) => {
      if (result.isConfirmed) rejectMutation.mutate(id);
    });
  };

  const handleAssign = async (issueId, staffMember) => {
    await assignMutation.mutateAsync({
      issueId,
      staff: {
        _id: staffMember._id,
        name: staffMember.name,
        email: staffMember.email,
        photoURL: staffMember.photoURL,
      },
    });
    setSelectedIssue(null);
    toast.success(`Assigned to ${staffMember.name}`);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-primary">
        Manage All Issues
      </h2>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-gray-100">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-50">
                <th>Issue</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr
                  key={issue._id}
                  className={issue.priority === "high" ? "bg-orange-50/30" : ""}
                >
                  <td>
                    <div className="font-bold">{issue.title}</div>
                    <div className="text-xs">
                      {issue.category} • {issue.priority}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-outline capitalize">
                      {issue.status}
                    </span>
                  </td>
                  <td>
                    {issue.assignedTo ? (
                      <div className="flex items-center gap-2">
                        {issue.assignedTo.photoURL && (
                          <div className="avatar w-6 h-6 rounded-full">
                            <img src={issue.assignedTo.photoURL} alt="Staff" />
                          </div>
                        )}
                        <span className="text-sm">{issue.assignedTo.name}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">Unassigned</span>
                    )}
                  </td>
                  <td className="flex gap-2">
                    {!issue.assignedTo && issue.status !== "closed" && (
                      <button
                        onClick={() => setSelectedIssue(issue)}
                        className="btn btn-xs btn-primary text-white"
                      >
                        <FaUserPlus /> Assign
                      </button>
                    )}
                    {issue.status === "pending" && (
                      <button
                        onClick={() => handleReject(issue._id)}
                        className="btn btn-xs btn-error text-white"
                      >
                        <FaTimes /> Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Assign Staff Modal */}
      {selectedIssue && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Assign Staff to "{selectedIssue.title}"
            </h3>

            <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
              {staff.map((s) => (
                <div key={s._id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="avatar w-8 h-8 rounded-full">
                      <img src={s.photoURL} alt={s.name} />
                    </div>
                    <span>
                      {s.name} ({s.email})
                    </span>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAssign(selectedIssue._id, s)}
                    disabled={assignMutation.isLoading}
                  >
                    Assign
                  </button>
                </div>
              ))}
              {staff.length === 0 && <p>No staff members found.</p>}
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedIssue(null)}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AdminAllIssues;
