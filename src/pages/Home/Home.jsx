import CitizensVoice from "../../_components/CitizensVoice";
import Impact from "../../_components/Impact";
import Banner from "../../components/Banner";
import Features from "../../components/Features";
import HowItWorks from "../../components/HowItWorks";
import LatestResolve from "../../components/LatestResolve";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LatestResolve></LatestResolve>
      <Features></Features>
      <HowItWorks></HowItWorks>
      <Impact></Impact>
      <CitizensVoice></CitizensVoice>
    </div>
  );
};

export default Home;
