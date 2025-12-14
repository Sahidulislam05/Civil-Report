import CitizensVoice from "../../_components/CitizensVoice";
import Impact from "../../_components/Impact";
import Banner from "../../components/Banner";
import Features from "../../components/Features";
import HowItWorks from "../../components/HowItWorks";
import LatestResolve from "../../components/LatestResolve";

const Home = () => {
  return (
    <div className="mt-16">
      <div className=" w-11/12 mx-auto">
        <Banner></Banner>
        <LatestResolve></LatestResolve>
        <Features></Features>
        <HowItWorks></HowItWorks>
        <Impact></Impact>
        <CitizensVoice></CitizensVoice>
      </div>
    </div>
  );
};

export default Home;
