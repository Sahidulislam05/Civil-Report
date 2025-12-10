import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../utils";
import { useNavigate } from "react-router";

const ReportIssue = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Mutation to call /issues API
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload) => await axiosSecure.post("/issues", payload),
    onSuccess: () => toast.success("Issue reported successfully!"),
    onError: (err) =>
      toast.error(err?.response?.data?.error || "Submission failed!"),
  });

  const onSubmit = async (data) => {
    setUploading(true);
    try {
      const imageURL = await imageUpload(data.image[0]);
      console.log("Uploaded Image URL:", imageURL);

      const issueData = {
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        image: imageURL,
        priority: data.priority || "normal",
      };

      await mutateAsync(issueData);
      navigate("/all-issues");
    } catch (error) {
      console.error("Issue submission error:", error);
      toast.error("Failed to submit issue!");
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
            placeholder="e.g. Broken Streetlight"
            className="input input-bordered focus:input-primary"
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
            className="textarea textarea-bordered h-28 focus:textarea-primary"
            placeholder="Describe the issue..."
            {...register("description", { required: true })}
          />
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
              placeholder="Sector 10, Rd 5"
              className="input input-bordered focus:input-primary"
              {...register("location", { required: true })}
            />
            {errors.location && (
              <p className="text-error">Location is required</p>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Evidence (Photo)</span>
          </label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered file-input-primary w-full"
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
