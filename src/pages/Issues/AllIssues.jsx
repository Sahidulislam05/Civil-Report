import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import AllIssueCard from "../../_components/AllIssueCard";
import { motion } from "framer-motion";
export default function AllIssues() {
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 9;

  const { data, isLoading } = useQuery({
    queryKey: ["all-issues", status, category, priority, search, page],
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
    <div className="py-12 bg-gray-50 min-h-screen mt-1">
      {/* Citizens Voice Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold text-primary">
              All Reported Issues
            </h2>

            {/* Search */}
            <div className="join">
              <input
                className="input input-bordered join-item w-64"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn join-item btn-primary"
                onClick={() => setPage(1)}
              >
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow mb-8 flex flex-wrap gap-4">
            <select
              className="select select-bordered select-sm"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
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
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Categories</option>
              <option value="Pothole">Pothole</option>
              <option value="Street Light">Street Light</option>
              <option value="Garbage">Garbage</option>
              <option value="Water Leakage">Water Leakage</option>
            </select>

            <select
              className="select select-bordered select-sm"
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Priorities</option>
              <option value="high">High (Boosted)</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          ) : data?.issues?.length === 0 ? (
            <div className="text-center py-20 text-gray-400 font-semibold">
              No issues found
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.issues.map((issue) => (
                  <AllIssueCard key={issue._id} issue={issue} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12 gap-2">
                <button
                  className="btn"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  «
                </button>

                <button className="btn btn-primary">{page}</button>

                <button
                  className="btn"
                  disabled={page >= Math.ceil(data.total / limit)}
                  onClick={() => setPage((p) => p + 1)}
                >
                  »
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
