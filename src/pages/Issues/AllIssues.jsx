import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import IssueCard from "../../_components/IssueCard";
import { FaSearch } from "react-icons/fa";

export default function AllIssues() {
  // Filters & pagination state
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 9;

  // Fetch issues with query params
  const { data, isLoading } = useQuery({
    queryKey: ["issue", status, category, priority, search, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        status,
        category,
        priority,
        search,
        page,
        limit,
      });
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-issues?${params}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  return (
    <div className="py-12 bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-headings font-bold text-primary">
            All Reported Issues
          </h2>
          <div className="join w-full md:w-auto">
            <input
              className="input input-bordered join-item w-full md:w-64"
              placeholder="Search location or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn join-item btn-primary text-white"
              onClick={() => setPage(1)}
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-8 flex flex-wrap gap-4 items-center">
          <span className="font-bold text-gray-500">Filter By:</span>

          <select
            className="select select-bordered select-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <select
            className="select select-bordered select-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="pothole">Pothole</option>
            <option value="streetlight">Streetlight</option>
            <option value="garbage">Garbage</option>
            <option value="water-leak">Water Leak</option>
            {/* Add other categories as needed */}
          </select>

          <select
            className="select select-bordered select-sm"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
          </select>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <>
            {data?.issues.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-bold text-gray-400">
                  No issues found matching your criteria.
                </h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                {data.issues.map((issue) => (
                  <IssueCard key={issue._id} issue={issue} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-12 btn-group">
              <button
                className="btn"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                «
              </button>
              <span className="btn">{page}</span>
              <button
                className="btn"
                onClick={() =>
                  setPage((prev) =>
                    prev < Math.ceil(data.total / limit) ? prev + 1 : prev
                  )
                }
                disabled={page >= Math.ceil(data.total / limit)}
              >
                »
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
