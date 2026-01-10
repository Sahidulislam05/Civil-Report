import { Star } from "lucide-react";

const Testimonials = () => {
    const reviews = [
        {
            name: "Sarah Johnson",
            role: "Community Leader",
            content:
                "This platform has transformed how our neighborhood communicates with the city council. Potholes are fixed in days, not months!",
            rating: 5,
        },
        {
            name: "Mark Davis",
            role: "Local Business Owner",
            content:
                "Finally, a transparent way to report street light outages. It makes my customers feel safer at night.",
            rating: 5,
        },
        {
            name: "Emily Chen",
            role: "Resident",
            content:
                "I love the voting feature. It feels good to see the community come together to solve shared problems.",
            rating: 4,
        },
    ];

    return (
        <section className="py-20 bg-base-200/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">What Citizens Say</h2>
                    <p className="text-gray-500">Voices from the community impacting change.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((r, i) => (
                        <div key={i} className="card bg-base-100 shadow-xl border border-base-200">
                            <div className="card-body">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, idx) => (
                                        <Star
                                            key={idx}
                                            className={`w-5 h-5 ${idx < r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 italic">"{r.content}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral text-neutral-content rounded-full w-12">
                                            <span className="text-xl">{r.name[0]}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{r.name}</h4>
                                        <span className="text-xs text-gray-500 uppercase tracking-wide">
                                            {r.role}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
