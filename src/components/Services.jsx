import { Wrench, Shield, Users, Globe } from "lucide-react";

const Services = () => {
    const services = [
        {
            icon: <Wrench className="w-10 h-10 text-primary" />,
            title: "Issue Resolution",
            desc: "Direct connection to maintenance teams for quick fixes.",
        },
        {
            icon: <Shield className="w-10 h-10 text-secondary" />,
            title: "Public Safety",
            desc: "Reporting hazards to keep the community safe for everyone.",
        },
        {
            icon: <Users className="w-10 h-10 text-accent" />,
            title: "Community Growth",
            desc: "Fostering a sense of responsibility and care.",
        },
        {
            icon: <Globe className="w-10 h-10 text-blue-400" />,
            title: "Open Data",
            desc: "Transparent access to city infrastructure data.",
        },
    ];

    return (
        <section className="py-20 bg-base-200/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Our Services</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        We provide comprehensive tools and improved channels to ensure your city runs smoothly.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((s, i) => (
                        <div key={i} className="card bg-base-100 shadow-xl hover:-translate-y-2 transition-transform duration-300">
                            <div className="card-body items-center text-center">
                                <div className="mb-4 p-4 bg-base-200 rounded-full">{s.icon}</div>
                                <h3 className="card-title mb-2">{s.title}</h3>
                                <p className="text-gray-500">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
