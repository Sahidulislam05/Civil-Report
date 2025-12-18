import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../utils";

const ReportIssue = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Mutation to create issue
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload) => await axiosSecure.post("/issues", payload),
    onError: (err) => {
      const status = err?.response?.status;
      const data = err?.response?.data;

      // Free user limit detected
      if (status === 403 && data?.message === "Free user limit reached!") {
        Swal.fire({
          icon: "warning",
          title: "Free User Limit Reached",
          text: "You can submit only 3 issues. Please subscribe for unlimited submissions.",
          showCancelButton: true,
          confirmButtonText: "Subscribe Now",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) navigate("/dashboard/profile");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: data?.message || "Something went wrong",
        });
      }
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Issue Submitted",
        text: "Your issue has been reported successfully!",
      });
      navigate("/dashboard/my-issues");
    },
  });

  const onSubmit = async (data) => {
    setUploading(true);
    try {
      const imageURL = await imageUpload(data.image[0]);

      const issueData = {
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        image: imageURL,
        priority: data.priority || "normal",
      };

      await mutateAsync(issueData);

      // timeline added in backend already
    } catch (error) {
      // console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-3xl bg-base-100 rounded-2xl shadow-2xl overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
        <h2 className="text-3xl font-bold">Report an Issue</h2>
        <p className="text-sm opacity-90 mt-1">
          Help us improve your area by reporting issues
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 md:p-8 space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            placeholder="e.g. Broken street light"
            className={`input input-bordered w-full ${
              errors.title ? "input-error" : ""
            }`}
            {...register("title", { required: true })}
          />
          {errors.title && (
            <p className="text-error text-sm mt-1">
              Title is required
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            placeholder="Describe the issue clearly..."
            className={`textarea textarea-bordered w-full h-32 ${
              errors.description ? "textarea-error" : ""
            }`}
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="text-error text-sm mt-1">
              Description is required
            </p>
          )}
        </div>

        {/* Category & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              className="select select-bordered w-full"
              {...register("category", { required: true })}
            >
              <option disabled value="">
                Select category
              </option>
              <option value="Street Light">Street Light</option>
              <option value="Pothole">Pothole</option>
              <option value="Water Leakage">Water Leakage</option>
              <option value="Garbage">Garbage</option>
              <option value="Footpath">Footpath</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              placeholder="e.g. Dhanmondi, Road 32"
              className={`input input-bordered w-full ${
                errors.location ? "input-error" : ""
              }`}
              {...register("location", { required: true })}
            />
            {errors.location && (
              <p className="text-error text-sm mt-1">
                Location is required
              </p>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">
            Evidence (Photo)
          </label>
          <input
            type="file"
            accept="image/*"
            className={`file-input file-input-bordered w-full ${
              errors.image ? "file-input-error" : ""
            }`}
            {...register("image", { required: true })}
          />
          {errors.image && (
            <p className="text-error text-sm mt-1">
              Image is required
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading || isPending}
          className="btn btn-primary w-full text-lg tracking-wide shadow-md hover:shadow-xl transition-all"
        >
          {uploading || isPending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Submit Report"
          )}
        </button>
      </form>
    </div>
  </div>
);

};

export default ReportIssue;
