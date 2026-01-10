import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";
import { Link } from "react-router";

// You can replace these with real images or keep using imports
import bannerImg1 from "../assets/banner1.jpg";
import bannerImg2 from "../assets/banner2.jpg";
import bannerImg3 from "../assets/banner3.png";

const Hero = () => {
  const slides = [
    {
      img: bannerImg1,
      title: "Empowering Citizens, Improving Cities",
      desc: "Report infrastructure issues in your neighborhood and track their resolution in real-time.",
      cta: "Report an Issue",
      link: "/dashboard/report-issue",
    },
    {
      img: bannerImg2,
      title: "Transparency in Public Works",
      desc: "See how your local government is addressing community concerns with open data.",
      cta: "Explore Issues",
      link: "/all-issues",
    },
    {
      img: bannerImg3,
      title: "Join the Community",
      desc: "Vote on pressing matters and have your voice heard by the decision makers.",
      cta: "Join Now",
      link: "/register",
    },
  ];

  return (
    <div className="w-full relative">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        swipeable={true}
        emulateTouch={true}
        interval={5000}
        showArrows={false}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-[600px] lg:h-[750px]">
            <img
              src={slide.img}
              className="w-full h-full object-cover object-center"
              alt={slide.title}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center pl-8 md:pl-20">
              <div className="max-w-2xl text-left text-white space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold leading-tight"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-gray-200"
                >
                  {slide.desc}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link to={slide.link} className="btn btn-primary btn-lg border-none hover:scale-105 transition-transform text-white">
                    {slide.cta}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
