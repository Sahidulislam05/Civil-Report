import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const ManageStaff = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch all staff
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["staff"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/staff");
      return res.data;
    },
  });

  // Add Staff Mutation
  const addStaffMutation = useMutation({
    mutationFn: async (staffData) => {
      const res = await axiosSecure.post("/admin/create-staff", staffData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["staff"]);
      toast.success("Staff added successfully");
      setIsModalOpen(false);
      reset();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error || "Failed to add staff");
    },
  });

  // Edit Staff Mutation
  const editStaffMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axiosSecure.patch(`/admin/staff/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["staff"]);
      toast.success("Staff updated successfully");
      setIsModalOpen(false);
      reset();
      setEditingStaff(null);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error || "Failed to update staff");
    },
  });

  // Delete Staff Mutation
  const deleteStaffMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/admin/staff/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["staff"]);
      toast.success("Staff deleted successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error || "Failed to delete staff");
    },
  });

  // Handlers
  const handleAdd = () => {
    setEditingStaff(null);
    reset();
    setIsModalOpen(true);
  };

  const handleEdit = (staff) => {
    setEditingStaff(staff);
    reset(staff);
    setIsModalOpen(true);
  };

  const handleDelete = (staff) => {
    Swal.fire({
      title: `Are you sure you want to delete ${staff.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStaffMutation.mutate(staff._id);
      }
    });
  };

  const onSubmit = (data) => {
    if (editingStaff) {
      const { password, ...updateData } = data;
      editStaffMutation.mutate({ id: editingStaff._id, data: updateData });
    } else {
      addStaffMutation.mutate(data);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-primary">Manage Staff</h2>
        <button
          onClick={handleAdd}
          className="btn btn-primary gap-2 text-white"
        >
          <FaPlus /> Add Staff
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-gray-100">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-50">
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((staff) => (
                <tr key={staff._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-10 h-10 bg-gray-200 flex items-center justify-center">
                          <img
                            src={
                              staff.image ||
                              "https://i.ibb.co/30tG9P9/staff-avatar.png"
                            }
                            alt="Staff"
                          />
                        </div>
                      </div>
                      <div className="font-bold">{staff.name}</div>
                    </div>
                  </td>
                  <td>{staff.email}</td>
                  <td className="capitalize">{staff.role}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleEdit(staff)}
                      className="btn btn-sm btn-ghost"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(staff)}
                      className="btn btn-sm btn-ghost text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h3 className="font-bold text-lg mb-4">
              {editingStaff ? "Edit Staff" : "Add New Staff"}
            </h3>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Name Field */}
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered w-full"
                />
                {errors.name && (
                  <span className="text-red-500 text-xs">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="form-control">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: "Email is required" })}
                  // এডিট করার সময় ইমেইল চেঞ্জ করতে না চাইলে readOnly রাখতে পারেন
                  readOnly={!!editingStaff}
                  className="input input-bordered w-full"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Photo URL */}
              <input
                type="text"
                placeholder="Photo URL"
                {...register("image")}
                className="input input-bordered w-full"
              />

              {/* Password Field (Only for New Staff) */}
              {!editingStaff && (
                <div className="form-control">
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className="input input-bordered w-full"
                  />
                  {errors.password && (
                    <span className="text-red-500 text-xs">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingStaff(null);
                    reset(); // ফর্ম রিসেট করা জরুরি
                  }}
                  className="btn"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-white">
                  {editingStaff ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStaff;
