const Newsletter = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
                <p className="mb-8 text-blue-100 max-w-xl mx-auto">
                    Get the latest updates on city infrastructure projects and community achievements directly to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input input-bordered w-full text-gray-900"
                    />
                    <button className="btn btn-neutral px-8">Subscribe</button>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
