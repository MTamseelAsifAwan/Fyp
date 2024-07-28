import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Import the check circle icon from react-icons/fa

const Pricing = () => {
  return (
    <section className="w-auto ml-4 py-4 shadow-2xl rounded-xl grid justify-center items-center ">
      <div className="container mx-auto text-center">
        <h2 className="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-purple-900 mb-4">Pricing</h2>
      </div>
      <div className="mt-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Basic Meal Plan */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-black shadow-md border border-blue-gray-100">
            <div className="relative bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-transparent text-black shadow-none !m-0 p-6">
              <h5 className="block antialiased tracking-normal font-sans text-xl font-bold leading-snug text-purple-900 capitalize">
                Basic Plan
              </h5>
              <p className="block antialiased font-sans text-sm leading-normal text-inherit font-normal !text-gray-500">
               Suitable for individuals.
              </p>
              <h3 className="antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-blue-gray-900 flex gap-1 mt-4">
                $5.00 / Month
                <span className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-purple-900 -translate-y-0.5 self-end opacity-70"></span>
              </h3>
            </div>
            <div className="p-6 border-t border-blue-gray-50">
              <ul className="flex flex-col gap-3">
                {['Acess to Basic Team Featues', 'limited support', '3 users','10gb storage'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-black">
                  <FaCheckCircle className="text-lg text-purple-900 "/>
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit">{item}</p>
                  </li>
                ))}
              </ul>
              
              <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg  hover:opacity-75 focus:ring focus:ring-green-200 active:opacity-[0.85] block w-full mt-6 border border-purple-900  text-purple-900 hover:bg-[#2b0f61] hover:text-white">Upgrade</button>

            </div>
          </div>
          {/* Family Feast */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-black shadow-md border border-blue-gray-100">
            <div className="relative bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-transparent text-black shadow-none !m-0 p-6">
              <h5 className="block antialiased tracking-normal font-sans text-xl font-bold leading-snug text-purple-900 capitalize">
Pro Plan              </h5>
              <p className="block antialiased font-sans text-sm leading-normal text-inherit font-normal !text-gray-500">
         Best for small teams.
              </p>
              <h3 className="antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-blue-gray-900 flex gap-1 mt-4">
                $25.00 / Month
                <span className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 -translate-y-0.5 self-end opacity-70"></span>
              </h3>
            </div>
            <div className="p-6 border-t border-blue-gray-50">
              <ul className="flex flex-col gap-3">
                {['Access to all features', 'Priority Support', '5 users','100gb Storage'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-black">
                    <FaCheckCircle className="text-lg text-purple-900 "/>
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit">{item}</p>
                  </li>
                ))}
              </ul>
              <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg  border-green-500 text-green-500 hover:opacity-75 focus:ring focus:ring-green-200 active:opacity-[0.85] block w-full mt-6 border border-purple-900  text-purple-900 hover:bg-[#2b0f61] hover:text-white">Upgrade</button>

            </div>
          </div>
          {/* Special Events */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-black shadow-md border border-blue-gray-100">
            <div className="relative bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-transparent text-black shadow-none !m-0 p-6">
              <h5 className="block antialiased tracking-normal font-sans text-xl font-bold leading-snug text-purple-900 capitalize">
Enterprise Plan              </h5>
              <p className="block antialiased font-sans text-sm leading-normal text-inherit font-normal !text-gray-500">
             Ideal for large oraganization.
              </p>
              <h3 className="antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-blue-gray-900 flex gap-1 mt-4">
                $100.00 / Month
                <span className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 -translate-y-0.5 self-end opacity-70"></span>
              </h3>
            </div>
            <div className="p-6 border-t border-blue-gray-50">
              <ul className="flex flex-col gap-3">
                {['Access to Special Features', 'Dedicated Support', 'Unlimited Users','1TB Storage'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-black">
                    <FaCheckCircle className="text-lg text-purple-900 "/>
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit">{item}</p>
                  </li>
                ))}
              </ul>
              <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg  border-green-500 text-green-500 hover:opacity-75 focus:ring focus:ring-green-200 active:opacity-[0.85] block w-full mt-6 border border-purple-900  text-purple-900 hover:bg-[#2b0f61] hover:text-white">Upgrade</button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
