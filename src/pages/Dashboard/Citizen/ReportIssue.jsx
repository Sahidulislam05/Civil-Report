import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import { imageUpload } from "../../../utils";
import axios from "axios";

const ReportIssue = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [uploading, setUploading] = useState(false);

  // POST Issue Mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(`http://localhost:5000/issues`, payload),
    onSuccess: () => {
      toast.success("Issue reported successfully!");
    },
    onError: () => {
      toast.error("Failed to submit issue!");
    },
    retry: 2,
  });

  // Form Submit
  const onSubmit = async (data) => {
    setUploading(true);
    try {
      const imageURL = await imageUpload(data.image[0]);

      const issueData = {
        title: data.title,
        email: user?.email,
        description: data.description,
        category: data.category,
        location: data.location,
        image: imageURL,
        createdBy: {
          uid: user?.uid,
          name: user?.displayName,

          photoURL: user?.photoURL,
        },
        createdAt: new Date(),
      };

      await mutateAsync(issueData);
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-base-100 p-8 rounded-xl shadow-xl border mt-8">
      <h2 className="text-3xl font-bold mb-6 text-primary">Report an Issue</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Issue Title</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Broken Streetlight"
            className="input input-bordered focus:input-primary"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-error text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-28 focus:textarea-primary"
            placeholder="Describe the issue..."
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
          {errors.description && (
            <p className="text-error text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Category & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Category</span>
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
              <span className="label-text font-semibold">Location</span>
            </label>
            <input
              type="text"
              placeholder="Sector 10, Rd 5"
              className="input input-bordered focus:input-primary"
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p className="text-error text-sm">{errors.location.message}</p>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Evidence (Photo)</span>
          </label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered file-input-primary w-full"
            {...register("image", { required: "Image is required" })}
          />
          {errors.image && (
            <p className="text-error text-sm">{errors.image.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading || isPending}
          className="btn btn-primary w-full text-white"
        >
          {uploading || isPending ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
};

export default ReportIssue;
