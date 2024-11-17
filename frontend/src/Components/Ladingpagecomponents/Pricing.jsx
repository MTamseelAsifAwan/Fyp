// Import necessary React components and GSAP library
import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import wave from '../../assets/wave2.svg';

// Define the Pricing component
const Pricing = () => {
  // Use the useEffect hook to run animations when the component mounts
  useEffect(() => {
    // Set up the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Animation for cards with down-to-up effect
    gsap.fromTo('.down-to-up', 
      { opacity: 0, y: 50 },  // Start off-screen below
      {
        opacity: 1, 
        y: 0,
        scrollTrigger: {
          trigger: '.down-to-up',
          start: 'top 80%', 
          end: 'bottom 60%', 
          scrub: 1, 
        },
      }
    );

    // Animation for cards with up-to-down effect
    gsap.fromTo('.up-to-down', 
      { opacity: 0, y: -50 },  // Start off-screen above
      {
        opacity: 1, 
        y: 0,
        scrollTrigger: {
          trigger: '.up-to-down',
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: 1,
        },
      }
    );
  }, []);

  // Return the JSX for the Pricing component
  return (
    <div className="relative">
      {/* Background Image with Opacity Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100"
        style={{ backgroundImage: `url(${wave})` }}
      />
      <div className="absolute inset-0 opacity-90" />
      
      <section className="w-auto ml-4 py-4 shadow-boxy rounded-xl grid justify-center items-center ">
        <div className="container mx-auto text-center">
          <h2 className="block antialiased tracking-normal font-serif text-4xl font-bold leading-[1.3] text-purple-900 mb-4">Pricing</h2>
        </div>
        
        <div className="mt-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Basic Meal Plan */}
            <div className="down-to-up relative flex flex-col bg-clip-border rounded-xl bg-white text-black shadow-md border border-blue-gray-100">
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
                  {['Acess to Basic Team Featues', 'limited support', '3 users', '10gb storage'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-black">
                      <FaCheckCircle className="text-lg text-purple-900 "/>
                      <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit">{item}</p>
                    </li>
                  ))}
                </ul>
                <button className="align-middle select-none font-sans hover:font-bold text-base hover:bg-purple-950 hover:text-white text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-2 px-4 rounded-lg focus:ring focus:ring-green-200 active:opacity-[0.85] block w-full mt-6 border border-purple-900 text-purple-900">Upgrade</button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="up-to-down relative flex flex-col bg-clip-border rounded-xl bg-white text-black shadow-md border border-blue-gray-100">
              <div className="relative bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-transparent text-black shadow-none !m-0 p-6">
                <h5 className="block antialiased tracking-normal font-sans text-xl font-bold leading-snug text-purple-900 capitalize">
                  Pro Plan
                </h5>
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
                  {['Access to all features', 'Priority Support', '5 users', '100gb Storage'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-black">
                      <FaCheckCircle className="text-lg text-purple-900 "/>
                      <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit">{item}</p>
                    </li>
                  ))}
                </ul>
                <button className="align-middle select-none font-sans hover:font-bold text-base hover:bg-purple-950 hover:text-white text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-2 px-4 rounded-lg focus:ring focus:ring-green-200 active:opacity-[0.85] block w-full mt-6 border border-purple-900 text-purple-900">Upgrade</button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="down-to-up relative flex flex-col bg-clip-border rounded-xl bg-white text-black shadow-md border border-blue-gray-100">
              <div className="relative bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-transparent text-black shadow-none !m-0 p-6">
                <h5 className="block antialiased tracking-normal font-sans text-xl font-bold leading-snug text-purple-900 capitalize">
                  Enterprise Plan
                </h5>
                <p className="block antialiased font-sans text-sm leading-normal text-inherit font-normal !text-gray-500">
                  Ideal for large organizations.
                </p>
                <h3 className="antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-blue-gray-900 flex gap-1 mt-4">
                  $100.00 / Month
                  <span className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 -translate-y-0.5 self-end opacity-70"></span>
                </h3>
              </div>
              <div className="p-6 border-t border-blue-gray-50">
                <ul className="flex flex-col gap-3">
                  {['Access to Special Features', 'Dedicated Support', 'Unlimited Users', '1TB Storage'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-black">
                      <FaCheckCircle className="text-lg text-purple-900 "/>
                      <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit">{item}</p>
                    </li>
                  ))}
                </ul>
                <button className="align-middle select-none font-sans hover:font-bold text-base hover:bg-purple-950 hover:text-white text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-2 px-4 rounded-lg focus:ring focus:ring-green-200 active:opacity-[0.85] block w-full mt-6 border border-purple-900 text-purple-900">Upgrade</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;