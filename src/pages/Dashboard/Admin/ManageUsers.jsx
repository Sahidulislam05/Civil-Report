import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaUserTimes, FaUserCheck } from "react-icons/fa";

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const toggleBlockMutation = useMutation({
    mutationFn: async ({ id, isBlocked }) => {
      const res = await axiosSecure.patch(`/users/${id}`, { isBlocked });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User status updated");
    },
  });

  const handleBlockToggle = (user) => {
    Swal.fire({
      title: `Are you sure you want to ${
        user.isBlocked ? "Unblock" : "Block"
      } ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleBlockMutation.mutate({
          id: user._id,
          isBlocked: !user.isBlocked,
        });
      }
    });
  };

  const citizens = users?.filter((u) => u.role === "citizen") || [];

  return (
    <div>
      <h2 className="text-3xl font-headings font-bold mb-8 text-primary">
        Manage Citizens
      </h2>
      {isLoading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-gray-100">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-50">
                <th>Name</th>
                <th>Email</th>
                <th>Subscription</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {citizens.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-10 h-10">
                          <img src={user.photoURL} alt="User" />
                        </div>
                      </div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {user.subscription === "premium" ? (
                      <span className="badge badge-warning gap-1">Premium</span>
                    ) : (
                      <span className="badge badge-ghost">Free</span>
                    )}
                  </td>
                  <td>
                    {user.isBlocked ? (
                      <span className="text-error font-bold">Blocked</span>
                    ) : (
                      <span className="text-success font-bold">Active</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleBlockToggle(user)}
                      className={`btn btn-sm ${
                        user.isBlocked
                          ? "btn-success text-white"
                          : "btn-error text-white"
                      }`}
                    >
                      {user.isBlocked ? (
                        <>
                          <FaUserCheck /> Unblock
                        </>
                      ) : (
                        <>
                          <FaUserTimes /> Block
                        </>
                      )}
                    </button>
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

export default ManageUsers;
