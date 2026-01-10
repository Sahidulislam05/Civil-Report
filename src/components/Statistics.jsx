const Statistics = () => {
    return (
        <section className="py-20 bg-primary text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="space-y-2">
                        <h3 className="text-5xl font-bold">10k+</h3>
                        <p className="text-blue-100">Issues Reported</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-5xl font-bold">8.5k+</h3>
                        <p className="text-blue-100">Issues Resolved</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-5xl font-bold">50+</h3>
                        <p className="text-blue-100">Cities Covered</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-5xl font-bold">95%</h3>
                        <p className="text-blue-100">Satisfaction Rate</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Statistics;
