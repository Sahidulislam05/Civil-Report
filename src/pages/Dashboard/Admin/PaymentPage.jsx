import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
} from "recharts";
import { FaMoneyBillWave, FaUsers, FaDownload } from "react-icons/fa";

const PaymentPage = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  // Fetch all payments
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payment");
      return res.data;
    },
  });

  // Stats
  const stats = useMemo(() => {
    const totalPayments = payments.length;
    const totalRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    return { totalPayments, totalRevenue };
  }, [payments]);

  // Filtered payments
  const filteredPayments = useMemo(() => {
    if (!search) return payments;
    return payments.filter(
      (p) =>
        p.email?.toLowerCase().includes(search.toLowerCase()) ||
        (p.type && p.type.toLowerCase().includes(search.toLowerCase()))
    );
  }, [payments, search]);

  // Monthly revenue chart data
  const monthlyRevenue = useMemo(() => {
    const months = {};
    payments.forEach((p) => {
      const date = new Date(p.date || p.createdAt);
      const month = date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      if (!months[month]) months[month] = 0;
      months[month] += p.amount || 0;
    });
    return Object.keys(months).map((m) => ({ month: m, revenue: months[m] }));
  }, [payments]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  // Download invoice
  const handleDownloadInvoice = async (paymentId) => {
    try {
      const res = await axiosSecure.get(`/payment/${paymentId}/invoice`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${paymentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-8">
        Payments Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="stat bg-white shadow-lg rounded-xl border border-gray-100 p-4">
          <div className="stat-figure text-primary text-3xl">
            <FaMoneyBillWave />
          </div>
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value text-primary">{stats.totalRevenue} tk</div>
        </div>

        <div className="stat bg-white shadow-lg rounded-xl border border-gray-100 p-4">
          <div className="stat-figure text-secondary text-3xl">
            <FaUsers />
          </div>
          <div className="stat-title">Total Payments</div>
          <div className="stat-value text-secondary">{stats.totalPayments}</div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by email or type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
      </div>

      {/* Payments Table */}
      {isLoading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-gray-100 mb-8">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-50">
                <th>Email</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((p) => (
                <tr key={p._id}>
                  <td>{p.email}</td>
                  <td>{p.amount} tk</td>
                  <td className="capitalize">{p.type}</td>
                  <td className="capitalize">{p.status || "complete"}</td>
                  <td>{new Date(p.date || p.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => handleDownloadInvoice(p._id)}
                      className="btn btn-sm btn-primary flex items-center gap-2"
                    >
                      <FaDownload /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart: Payment Type Distribution */}
        <div className="card bg-base-100 shadow-xl p-6">
          <h3 className="text-xl font-bold mb-4">Payment Type Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={Object.entries(
                    filteredPayments.reduce((acc, p) => {
                      const type = p.type || "other";
                      acc[type] = (acc[type] || 0) + 1;
                      return acc;
                    }, {})
                  ).map(([name, value]) => ({ name, value }))}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {filteredPayments.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Monthly Revenue */}
        <div className="card bg-base-100 shadow-xl p-6">
          <h3 className="text-xl font-bold mb-4">Monthly Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyRevenue}
                margin={{ top: 20, right: 20, left: -10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
