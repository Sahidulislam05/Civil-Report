import {
  FaClipboardCheck,
  FaMapMarkerAlt,
  FaVoteYea,
  FaUserShield,
} from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaClipboardCheck />,
      title: "Easy Reporting",
      desc: "Report issues with photos and description in seconds.",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Geo-Tagging",
      desc: "Pinpoint exact location of the infrastructure problem.",
    },
    {
      icon: <FaVoteYea />,
      title: "Community Voting",
      desc: "Upvote issues to highlight urgency to authorities.",
    },
    {
      icon: <FaUserShield />,
      title: "Secure Platform",
      desc: "Your data is safe. Track anonymous reports easily.",
    },
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-headings font-bold text-primary mb-4">
            Key Features
          </h2>
          <p className="max-w-xl mx-auto text-gray-600">
            Our platform bridges the gap between citizens and authorities with
            smart tools.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100"
            >
              <div className="card-body items-center text-center">
                <div className="text-4xl text-secondary mb-4 p-4 bg-orange-50 rounded-full">
                  {f.icon}
                </div>
                <h3 className="card-title text-xl font-bold">{f.title}</h3>
                <p className="text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
