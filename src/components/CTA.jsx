import { Link } from "react-router";

const CTA = () => {
    return (
        <section className="py-24 bg-base-100 text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
                <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
                    Join thousands of other citizens who are actively contributing to a better living environment.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/register" className="btn btn-primary btn-lg">
                        Get Started Now
                    </Link>
                    <Link to="/about-us" className="btn btn-outline btn-lg">
                        Learn More
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTA;
