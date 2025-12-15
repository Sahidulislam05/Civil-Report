import { motion } from "framer-motion";
import { FaUsers, FaBullseye, FaLightbulb } from "react-icons/fa";

const teamMembers = [
  {
    name: "Sahidul Islam",
    role: "Full Stack Developer",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "John Doe",
    role: "UI/UX Designer",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Jane Smith",
    role: "Backend Developer",
    image: "https://i.pravatar.cc/150?img=45",
  },
];

export default function AboutUs() {
  return (
    <div className="mt-16 w-11/12 mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            About Civil Report
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Empowering Citizens to Report Issues & Make Communities Better
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div className="grid md:grid-cols-3 gap-8 mb-16 text-center">
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
            <FaBullseye className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-500">
              To provide a seamless platform for citizens to report civic issues
              and help authorities resolve them efficiently.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
            <FaLightbulb className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-500">
              To build smarter, safer, and more responsive communities through
              technology and citizen engagement.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
            <FaUsers className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Values</h3>
            <p className="text-gray-500">
              Transparency, accountability, and collaboration are at the heart
              of everything we do.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">
            Join Us in Making Communities Better
          </h3>
          <p className="text-gray-600 mb-6">
            Whether you're a citizen, staff, or developer, your contribution
            matters!
          </p>
          <button
            onClick={() => (window.location.href = "/contact")}
            className="btn btn-primary btn-lg"
          >
            Contact Us
          </button>
        </div>
      </motion.div>
    </div>
  );
}
