import React from "react";
import {
  SiSony,
  SiDell,
  SiLenovo,
  SiApple,
  SiSamsung,
} from "react-icons/si";

const brands = [
  { name: "Sony", Icon: SiSony },
  { name: "Dell", Icon: SiDell },
  { name: "Lenovo", Icon: SiLenovo },
  { name: "Apple", Icon: SiApple },
  { name: "Samsung", Icon: SiSamsung },
];

const Sponsered = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-pink-50 via-white to-sky-50">
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-pink-100 px-4 py-1 text-sm font-semibold text-pink-500">
            Our Partners
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-800">
            Trusted Brands
          </h2>

          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-pink-400 to-sky-400"></div>

          <p className="mx-auto mt-5 max-w-2xl text-gray-600 leading-7">
            We proudly partner with globally recognized brands to deliver
            authentic, high-quality products and provide the best shopping
            experience.
          </p>
        </div>

        {/* Brands */}
        <div className="rounded-3xl bg-white p-8 shadow-lg border border-pink-100">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {brands.map(({ name, Icon }) => (
              <div
                key={name}
                className="group flex flex-col items-center justify-center rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50 to-sky-50 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow">
                  <Icon className="text-4xl text-sky-500 transition duration-300 group-hover:text-pink-500" />
                </div>

                <h3 className="mt-4 text-base font-semibold text-slate-700 group-hover:text-pink-500 transition-colors">
                  {name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsered;