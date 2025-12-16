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
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-base-100 rounded-xl shadow-xl mt-8">
      <h2 className="text-3xl font-bold mb-6 text-primary">Report an Issue</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            {...register("title", { required: true })}
          />
          {errors.title && <p className="text-error">Title is required</p>}
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-28"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <p className="text-error">Description is required</p>
          )}
        </div>

        {/* Category & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register("category", { required: true })}
            >
              <option value="Street Light">Street Light</option>
              <option value="Pothole">Pothole</option>
              <option value="Water Leakage">Water Leakage</option>
              <option value="Garbage">Garbage</option>
              <option value="Footpath">Footpath</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              {...register("location", { required: true })}
            />
            {errors.location && (
              <p className="text-error">Location is required</p>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Evidence (Photo)</span>
          </label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("image", { required: true })}
          />
          {errors.image && <p className="text-error">Image is required</p>}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={uploading || isPending}
        >
          {uploading || isPending ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
};

export default ReportIssue;
