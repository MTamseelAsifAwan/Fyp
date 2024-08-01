import React from 'react';
import { motion } from 'framer-motion';

import wave from '../assets/wave.svg';
import GoogleIcon from '../assets/google.svg';
import GithubIcon from '../assets/github.svg';
import formside from '../assets/formside.png';


const SignupForm = () => {
    const floatInFromLeft = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 },
      };


  return (
    <>
    <div className="relative">
      {/* Background Image with Opacity Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${wave})`  }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 bg-gray-50 w-screen h-screen">
        <div className="hidden sm:block">
          <img src={formside} alt="Form side image" className="object-cover w-full h-full" />
        </div>
        <div className="flex items-center justify-center p-4 sm:p-8">
          <form className="relative w-full max-w-md mx-auto space-y-6">
          <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={floatInFromLeft}
      transition={{ duration: 2 }}
      className="font-serif justify-center grid grid-cols-1 items-center text-center flex-col sm:px-4 md:px-8 lg:px-12 bg-cover bg-center"
    > <h2 className="font-bold text-2xl sm:text-3xl text-purple-900 text-center">Welcome to Sprinty</h2>
    </motion.div>
            <div className="space-y-4">
              <div>
                <label className="font-semibold text-sm text-black block mb-1">Email address</label>
                <input
                  type="email"
                  className="border rounded-lg px-3 py-2 text-sm w-full"
                  id="email"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="font-semibold text-sm text-black block mb-1">Password</label>
                <input
                  type="password"
                  className="border rounded-lg px-3 py-2 text-sm w-full"
                  id="password"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="font-semibold text-sm text-black block mb-1">Confirm Password</label>
                <input
                  type="password"
                  className="border rounded-lg px-3 py-2 text-sm w-full"
                  id="confirmPassword"
                  placeholder="Confirm password"
                />
              </div>
            </div>
            <div className="space-y-4">
              <button
                className="flex items-center justify-center py-2 px-4 bg-gray-200 hover:bg-gray-300 text-black w-full transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                type="button"
              >
                <svg
                  viewBox="0 0 24 24"
                  height="25"
                  width="25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#181717"
                    d="M12 0c-6.627 0-12 5.373-12 12 0 5.308 3.438 9.832 8.207 11.42.6.112.82-.261.82-.578v-2.075c-3.338.727-4.047-1.557-4.047-1.557-.545-1.37-1.334-1.733-1.334-1.733-1.089-.743.083-.727.083-.727 1.205.085 1.836 1.237 1.836 1.237 1.072 1.837 2.81 1.307 3.496 1 .107-.775.419-1.307.763-1.606-2.668-.305-5.467-1.334-5.467-5.933 0-1.31.468-2.38 1.237-3.22-.124-.305-.536-1.527.117-3.175 0 0 1.01-.323 3.306 1.238a11.49 11.49 0 0 1 3.01-.405c1.017.004 2.047.139 3.006.405 2.296-1.56 3.306-1.238 3.306-1.238.653 1.648.242 2.87.119 3.175.772.84 1.237 1.91 1.237 3.22 0 4.616-2.805 5.623-5.481 5.917.43.371.815 1.106.815 2.232v3.299c0 .319.216.694.822.576C20.562 21.83 24 17.309 24 12 24 5.373 18.627 0 12 0z"
                  />
                </svg>
                <span className="ml-2">Sign in with Github</span>
              </button>
              <button
                className="flex items-center justify-center py-2 px-4 bg-gray-200 hover:bg-gray-300 text-black w-full transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                type="button"
              >
                <svg
                  viewBox="0 0 24 24"
                  height="25"
                  width="25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707 C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321 C6.4099731,6.9193726,8.977478,5,12,5z"
                    fill="#F44336"
                  ></path>
                  <path
                    d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12 c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458 l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z"
                    fill="#2196F3"
                  ></path>
                  <path
                    d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511 C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215 C5.1484375,13.6044312,5,12.8204346,5,12z"
                    fill="#FFC107"
                  ></path>
                  <path
                    d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959 C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834 C14.7412109,18.5588989,13.4284058,19,12,19z"
                    fill="#00B060"
                  ></path>
                  <path
                    opacity=".1"
                    d="M12,23.75c-3.5316772,0-6.7072754-1.4571533-8.9524536-3.7786865C5.2453613,22.4378052,8.4364624,24,12,24 c3.5305786,0,6.6952515-1.5313721,8.8881226-3.9592285C18.6495972,22.324646,15.4981079,23.75,12,23.75z"
                  ></path>
                  <polygon
                    opacity=".1"
                    points="12,14.25 12,14.5 18.4862061,14.5 18.587492,14.25"
                  ></polygon>
                  <path
                    d="M23.9944458,12.1470337C23.9952393,12.0977783,24,12.0493774,24,12 c0-0.0139771-0.0021973-0.0274658-0.0022583-0.0414429C23.9970703,12.0215454,23.9938965,12.0838013,23.9944458,12.1470337z"
                    fill="#E6E6E6"
                  ></path>
                  <path
                    opacity=".2"
                    d="M12,9.5v0.25h11.7855721c-0.0157471-0.0825195-0.0329475-0.1680908-0.0503426-0.25H12z"
                    fill="#FFF"
                  ></path>
                </svg>
                <span className="ml-2">Sign in with Google</span>
              </button>
              <div className="mt-4">
                <button
                  className="py-2 px-4 bg-purple-900 hover:bg-purple-950 focus:ring-purple-900 text-white w-full transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  type="submit"
                >
                  Log in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  );
};

export default SignupForm;
