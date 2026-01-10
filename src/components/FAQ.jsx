const FAQ = () => {
    const faqs = [
        {
            q: "How do I report an issue?",
            a: "Simply sign up, click on 'Report Issue' in your dashboard, upload a photo, description, and location.",
        },
        {
            q: "Is it anonymous?",
            a: "Yes, you can choose to keep your reports anonymous to the public, though admins will see your details for verification.",
        },
        {
            q: "How long does it take to resolve?",
            a: "Resolution times vary by complexity and city department resources. You can track status in real-time.",
        },
        {
            q: "Can I vote on other issues?",
            a: "Absolutely! Upvoting helps prioritize urgent community matters.",
        },
    ];

    return (
        <section className="py-20 bg-base-100">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-500">Got questions? We've got answers.</p>
                </div>
                <div className="space-y-4">
                    {faqs.map((f, i) => (
                        <div key={i} className="collapse collapse-plus bg-base-200 rounded-xl">
                            <input type="radio" name="my-accordion-3" defaultChecked={i === 0} />
                            <div className="collapse-title text-xl font-medium">
                                {f.q}
                            </div>
                            <div className="collapse-content">
                                <p className="text-gray-500">{f.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
