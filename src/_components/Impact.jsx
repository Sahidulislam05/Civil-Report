import React from "react";

const Impact = () => {
  return (
    <div>
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">
          Our Impact & Achievements
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 w-11/12 mx-auto text-center">
          {[
            { icon: "🏆", count: "1400+", label: "Issues Resolved" },
            { icon: "👥", count: "800+", label: "Active Users" },
            { icon: "🚀", count: "95%", label: "User Satisfaction" },
            { icon: "🛠", count: "50+", label: "Staff Members" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg"
            >
              <p className="text-4xl">{item.icon}</p>
              <h3 className="text-3xl font-bold mt-2">{item.count}</h3>
              <p className="text-gray-600 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Impact;
