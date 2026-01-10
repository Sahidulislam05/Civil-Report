import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import AllIssueCard from "../../_components/AllIssueCard";
import { motion } from "framer-motion";
import CardSkeleton from "../../components/CardSkeleton";
export default function AllIssues() {
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 9;

  const { data, isLoading } = useQuery({
    queryKey: ["all-issues", status, category, priority, search, sort, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        status,
        category,
        priority,
        search,
        sort,
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
<<<<<<< HEAD
    <div className="py-12 bg-base-200 min-h-screen mt-1">
=======
    <div className="py-12 bg-gray-50 min-h-screen mt-1 mx-auto">
>>>>>>> 28aefc2fca2dc0122df27786cbd21707887882f3
      {/* Citizens Voice Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
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
                className="input input-bordered join-item w-64 bg-base-100"
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
          <div className="bg-base-100 p-4 rounded-lg shadow mb-8 flex flex-wrap gap-4">
            <select
              className="select select-bordered select-sm bg-base-100"
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
              className="select select-bordered select-sm bg-base-100"
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
              className="select select-bordered select-sm bg-base-100"
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

            <select
              className="select select-bordered select-sm bg-base-100"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="votes">Most Voted</option>
            </select>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : data?.issues?.length === 0 ? (
            <div className="text-center py-20 text-base-content/50 font-semibold">
              No issues found
            </div>
          ) : (
            <>
<<<<<<< HEAD
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
=======
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center">
>>>>>>> 28aefc2fca2dc0122df27786cbd21707887882f3
                {data.issues.map((issue) => (
                  <motion.div
                    key={issue._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <AllIssueCard issue={issue} />
                  </motion.div>
                ))}
              </motion.div>

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
