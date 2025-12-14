import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const categories = ["Road", "Water", "Electricity", "Sanitation", "Other"];

const EditIssuePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: issue, isLoading } = useQuery({
    queryKey: ["issue", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const [issueData, setIssueData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    image: "",
  });

  // When issue is loaded, set the state
  useEffect(() => {
    if (issue) {
      setIssueData({
        title: issue.title || "",
        description: issue.description || "",
        category: issue.category || "",
        location: issue.location || "",
        image: issue.image || "",
      });
    }
  }, [issue]);

  const editMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(`/issues/${id}/edit`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["issues"]);
      queryClient.invalidateQueries(["issue", id]);
      toast.success("Issue updated successfully");
      navigate(-1);
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to update issue");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editMutation.mutate(issueData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 ">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-12 p-6 bg-base-100 shadow-lg rounded-lg mt-17">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Issue</h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Title</span>
          <input
            type="text"
            className="input input-bordered w-full"
            value={issueData.title}
            onChange={(e) =>
              setIssueData({ ...issueData, title: e.target.value })
            }
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold">Location</span>
          <input
            type="text"
            className="input input-bordered w-full"
            value={issueData.location}
            onChange={(e) =>
              setIssueData({ ...issueData, location: e.target.value })
            }
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold">Category</span>
          <select
            className="select select-bordered w-full"
            value={issueData.category}
            onChange={(e) =>
              setIssueData({ ...issueData, category: e.target.value })
            }
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold">Description</span>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={5}
            value={issueData.description}
            onChange={(e) =>
              setIssueData({ ...issueData, description: e.target.value })
            }
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold">Image URL (optional)</span>
          <input
            type="text"
            className="input input-bordered w-full"
            value={issueData.image}
            onChange={(e) =>
              setIssueData({ ...issueData, image: e.target.value })
            }
          />
        </label>

        {issueData.image && (
          <img
            src={issueData.image}
            alt={issueData.title}
            className="w-full h-64 object-cover rounded-md mt-2"
          />
        )}

        <div className="flex gap-4 mt-4">
          <button type="submit" className="btn btn-primary flex-1">
            Save Changes
          </button>
          <button
            type="button"
            className="btn flex-1"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditIssuePage;
