import { FaCheckCircle } from 'react-icons/fa'; // Import the check circle icon from react-icons/fa
import { motion } from 'framer-motion';
import wave from '../assets/wave2.svg'

const Pricing = () => {
  const upToDown = {
    hidden: { opacity: 0, y: -50 },  // Start off-screen above
    visible: { opacity: 1, y: 0 },    // Move to its final position
  };

  const downToUp = {
    hidden: { opacity: 0, y: 50 },   // Start off-screen below
    visible: { opacity: 1, y: 0 },    // Move to its final position
  };
  return (
    <div className="relative">
      {/* Background Image with Opacity Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100"
        style={{ backgroundImage: `url(${wave})` }}
      />
      <div className="absolute inset-0  opacity-90" />
    <section className="w-auto ml-4 py-4 shadow-boxy rounded-xl grid justify-center items-center ">
      <div className="container mx-auto text-center">
        <h2 className="block antialiased tracking-normal font-serif text-4xl font-bold leading-[1.3] text-purple-900 mb-4">Pricing</h2>
      </div>
      <div className="mt-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Basic Meal Plan */}
          <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={downToUp}
                transition={{ duration: 2 }}
           className="relative flex flex-col bg-clip-border rounded-xl bg-white text-black shadow-md border border-blue-gray-100"
              >
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
              
              <button className="align-middle select-none font-sans hover:font-bold text-base  hover:bg-purple-950 hover:text-white text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  py-2 px-4 rounded-lg  focus:ring focus:ring-green-200 active:opacity-[0.85] block w-full mt-6 border border-purple-900  text-purple-900 ">Upgrade</button>

            </div>
          </motion.div>
          {/* Family Feast */}
          <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={upToDown}
                transition={{ duration: 1 }}
                className="relative flex flex-col bg-clip-border rounded-xl bg-white text-black shadow-md border border-blue-gray-100"             
                 >
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
              <button className="align-middle select-none font-sans hover:font-bold text-base  hover:bg-purple-950 hover:text-white text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  py-2 px-4 rounded-lg  focus:ring focus:ring-green-200 active:opacity-[0.85] block w-full mt-6 border border-purple-900  text-purple-900 ">Upgrade</button>

            </div>
          </motion.div>
          {/* Special Events */}
          <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={downToUp}
                transition={{ duration: 1 }}
                className="relative flex flex-col bg-clip-border rounded-xl bg-white text-black shadow-md border border-blue-gray-100"
                                 >
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
              <button className="align-middle select-none font-sans hover:font-bold text-base  hover:bg-purple-950 hover:text-white text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  py-2 px-4 rounded-lg   focus:ring focus:ring-green-200 active:opacity-[0.85] block w-full mt-6 border border-purple-900  text-purple-900 ">Upgrade</button>

            </div>
          
          </motion.div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Pricing;
