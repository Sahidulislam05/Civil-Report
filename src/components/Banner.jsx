import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../src/assets/banner1.jpg";
import bannerImg2 from "../../src/assets/banner2.jpg";
import bannerImg3 from "../../src/assets/banner3.png";

const Banner = () => {
  return (
    <div className="w-full">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        swipeable={true}
        emulateTouch={true}
        interval={3000}
      >
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[480px] lg:h-[550px]">
          <img
            src={bannerImg1}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[480px] lg:h-[550px]">
          <img
            src={bannerImg2}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[480px] lg:h-[550px]">
          <img
            src={bannerImg3}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
