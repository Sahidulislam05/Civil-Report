import React from "react";

const CitizensVoice = () => {
  return (
    <div>
      <section className="py-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6">Citizens' Voice</h2>
        <p className="text-center text-gray-600 mb-12">
          What our users say about the system
        </p>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto px-4">
          {[
            {
              name: "Arif Hasan",
              text: "Easy to report issues in my area, great platform!",
              img: "https://i.pravatar.cc/100?img=11",
            },
            {
              name: "Jannat Noor",
              text: "Very fast and transparent issue tracking!",
              img: "https://i.pravatar.cc/100?img=22",
            },
            {
              name: "Farhan Kabir",
              text: "Staff respond quickly, love this system!",
              img: "https://i.pravatar.cc/100?img=33",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="flex items-center gap-4 mb-3">
                <img src={t.img} className="w-14 h-14 rounded-full" />
                <h3 className="font-bold">{t.name}</h3>
              </div>
              <p className="text-gray-600">{t.text}</p>
              <p className="text-yellow-500 mt-2">★★★★★</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CitizensVoice;
