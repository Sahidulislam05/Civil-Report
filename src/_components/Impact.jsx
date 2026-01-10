import { motion } from "framer-motion";

const Impact = () => {
  return (
    <div className="bg-base-100 text-base-content py-16">
      <section className="w-11/12 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-10 text-primary"
        >
          Our Impact & Achievements
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { icon: "🏆", count: "1400+", label: "Issues Resolved" },
            { icon: "👥", count: "800+", label: "Active Users" },
            { icon: "🚀", count: "95%", label: "User Satisfaction" },
            { icon: "🛠", count: "50+", label: "Staff Members" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-base-200 rounded-xl shadow hover:shadow-lg transition-all border border-base-300"
            >
              <p className="text-4xl mb-2">{item.icon}</p>
              <h3 className="text-3xl font-bold text-primary">{item.count}</h3>
              <p className="text-base-content/70 mt-1 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Impact;
