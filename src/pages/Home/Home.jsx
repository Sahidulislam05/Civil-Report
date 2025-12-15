import { motion } from "framer-motion";
import CitizensVoice from "../../_components/CitizensVoice";
import Impact from "../../_components/Impact";
import Banner from "../../components/Banner";
import Features from "../../components/Features";
import HowItWorks from "../../components/HowItWorks";
import LatestResolve from "../../components/LatestResolve";

const Home = () => {
  return (
    <div className="mt-16">
      <div className="w-11/12 mx-auto space-y-16">
        {/* Banner Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Banner />
        </motion.div>

        {/* Latest Resolved Issues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <LatestResolve />
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Features />
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <HowItWorks />
        </motion.div>

        {/* Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Impact />
        </motion.div>

        {/* Citizens Voice Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <CitizensVoice />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
