const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-headings font-bold text-primary mb-4">
            How It Works
          </h2>
          <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-300">
            Simple steps to make a big impact in your community.
          </p>
        </div>
        <ul className="steps steps-vertical lg:steps-horizontal w-full font-medium">
          <li className="step step-primary" data-content="1">
            Register Account
          </li>
          <li className="step step-primary" data-content="2">
            Snap & Report
          </li>
          <li className="step step-primary" data-content="3">
            Verified by Staff
          </li>
          <li className="step step-primary" data-content="4">
            Problem Resolved
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HowItWorks;
