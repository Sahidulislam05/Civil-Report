import { motion } from "framer-motion";
import { Link } from "react-router";
const Banner = () => {
  return (
    <div className="carousel w-full h-[600px] relative overflow-hidden">
      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1596464673678-8d484439c122?q=80&w=2070&auto=format&fit=crop)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center pl-10 md:pl-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white space-y-4"
            >
              <h1 className="text-5xl md:text-7xl font-headings font-bold">
                Report Issues.
                <br />
                Changed City.
              </h1>
              <p className="text-lg opacity-90">
                Join hands to fix potholes, streetlights, and more. <br />
                Your voice matters.
              </p>
              <div className="flex gap-4 pt-4">
                <Link
                  to="/all-issues"
                  className="btn btn-primary border-none text-white px-8"
                >
                  View Issues
                </Link>
                <Link
                  to="/register"
                  className="btn btn-outline text-white px-8 hover:bg-white hover:text-black"
                >
                  Join Now
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle btn-ghost text-white">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle btn-ghost text-white">
            ❯
          </a>
        </div>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1517089596392-fb2a95333723?q=80&w=2070&auto=format&fit=crop)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center pl-10 md:pl-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white space-y-4"
            >
              <h1 className="text-5xl md:text-7xl font-headings font-bold">
                Track Progress <br />
                Real-Time.
              </h1>
              <p className="text-lg opacity-90">
                See how local authorities are resolving your complaints <br />
                from submission to completion.
              </p>
              <div className="flex gap-4 pt-4">
                <Link
                  to="/all-issues"
                  className="btn btn-secondary border-none text-white px-8"
                >
                  Track Now
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle btn-ghost text-white">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle btn-ghost text-white">
            ❯
          </a>
        </div>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className="carousel-item relative w-full">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b7a?q=80&w=2070&auto=format&fit=crop)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center pl-10 md:pl-20">
            <div className="max-w-2xl text-white space-y-4">
              <h1 className="text-5xl md:text-7xl font-headings font-bold">
                Community <br />
                Collaboration.
              </h1>
              <p className="text-lg opacity-90">
                Vote on urgent issues to prioritize them. <br />
                Together we build a better infrastructure.
              </p>
              <div className="flex gap-4 pt-4">
                <Link
                  to="/login"
                  className="btn btn-accent border-none text-white px-8"
                >
                  Get Involved
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle btn-ghost text-white">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle btn-ghost text-white">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
