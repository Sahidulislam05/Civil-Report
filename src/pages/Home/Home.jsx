import { motion } from "framer-motion";
import CitizensVoice from "../../_components/CitizensVoice";
import Impact from "../../_components/Impact";
import Banner from "../../components/Banner";
import Features from "../../components/Features";
import HowItWorks from "../../components/HowItWorks";
import LatestResolve from "../../components/LatestResolve";
import Services from "../../components/Services";
import Statistics from "../../components/Statistics";
import Testimonials from "../../components/Testimonials";
import FAQ from "../../components/FAQ";
import Newsletter from "../../components/Newsletter";
import CTA from "../../components/CTA";

const Home = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 },
  };

  return (
    <div className="bg-base-100 mb-0">
      {/* 1. Hero Section */}
      <motion.div {...fadeInUp}>
        <Banner />
      </motion.div>

      {/* 2. Statistics Section (New) */}
      <motion.div {...fadeInUp}>
        <Statistics />
      </motion.div>

      {/* 3. Latest Resolved Issues (Existing) - Core Listing Preview */}
      <motion.div {...fadeInUp} className="py-10">
        <LatestResolve />
      </motion.div>

      {/* 4. Features Section (Existing) */}
      <motion.div {...fadeInUp}>
        <Features />
      </motion.div>

      {/* 5. Services Section (New) */}
      <motion.div {...fadeInUp}>
        <Services />
      </motion.div>

      {/* 6. How It Works Section (Existing) */}
      <motion.div {...fadeInUp}>
        <HowItWorks />
      </motion.div>

      {/* 7. Impact Section (Existing/Modified) */}
      <motion.div {...fadeInUp}>
        <Impact />
      </motion.div>

      {/* 8. Testimonials Section (New) */}
      <motion.div {...fadeInUp}>
        <Testimonials />
      </motion.div>

      {/* 9. Citizens Voice Section (Existing) - Could be Blog or Community */}
      <motion.div {...fadeInUp}>
        <CitizensVoice />
      </motion.div>

      {/* 10. FAQ Section (New) */}
      <motion.div {...fadeInUp}>
        <FAQ />
      </motion.div>

      {/* 11. CTA Section (New) */}
      <motion.div {...fadeInUp}>
        <CTA />
      </motion.div>

      {/* 12. Newsletter Section (New) */}
      <motion.div {...fadeInUp}>
        <Newsletter />
      </motion.div>
    </div>
  );
};

export default Home;
