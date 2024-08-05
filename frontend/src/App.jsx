import './App.css'
import  { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Col from 'react-bootstrap/Col';
import Pricing from './Components/Pricing';
import { FaTicketAlt, FaRobot, FaUsers,FaPaperPlane  } from 'react-icons/fa';
import taskdetails from './assets/Task Details.png'
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import wave from './assets/wave.svg'
import wave2 from './assets/wave2.svg'
import wave3 from './assets/wave3.svg'


const App = () => {
  const mainbtnRef = useRef(null);
  const signbtnRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Zoom in and out effect for mainbtnRef
    gsap.fromTo(mainbtnRef.current,
      { scale: 1 },
      {
        scale: 1.2, // Zoom in to 120%
        duration: 4.5, // Duration of the zoom effect
        repeat: -1, // Repeat indefinitely
        yoyo: true, // Make the effect go back and forth
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: mainbtnRef.current,
          start: 'top 80%',
          end: 'bottom top',
          scrub: true,
        }
      }
    );

    // Zoom in and out effect for signbtnRef
    gsap.fromTo(signbtnRef.current,
      { scale: 1 },
      {
        scale: 1.1, // Zoom in to 110%
        duration: 4.5, // Longer duration for a smoother effect
        repeat: -1, // Repeat indefinitely
        yoyo: true, // Make the effect go back and forth
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: signbtnRef.current,
          start: 'top 100%',
          end: 'bottom top',
          scrub: true,
        }
      }
    );
  }, []);

  const floatInFromLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  const floatInFromRight = {
    hidden: { opacity: 0, x: 1 },
    visible: { opacity: 1, x: 0 },
  };

  const downToUp = {
    hidden: { opacity: 0, y: 5 },   // Start off-screen below
    visible: { opacity: 1, y: 0 },    // Move to its final position
  };
  return (
    <>
   
      
      <div className='bg-white'>
     
   
      <div       className="font-serif justify-center grid grid-cols-1 items-center text-center flex-col sm:px-4 md:px-8 lg:px-12 bg-cover bg-center"
            style={{ backgroundImage: `url(${wave})` }}

      >
        <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={floatInFromLeft}
      transition={{ duration: 2 }}
    >
      <div className="shadow-boxy2 p-5 rounded-2xl bg-white bg-opacity-20">
        <div>
          <h1 className="text-purple-900 font-bold flex justify-center mt-[1rem] text-4xl sm:text-2xl md:text-3xl lg:text-4xl">Welcome</h1>
          <div className="flex justify-center">
            <p className="text-black_color font-bold flex justify-center items-center text-center text-xl sm:text-base md:text-xl lg:text-2xl">
              Great outcomes start with
            </p>
          </div>
          <div className="flex justify-center">
            <p className="font-serif text-black_color font-extrabold justify-center text-center text-xl sm:text-base md:text-xl lg:text-2xl">Sprinty</p>
          </div>
          <div className="flex justify-center">
            <p className="text-black_color font-bold flex justify-center mt-4 mb-5 text-base text-center sm:text-sm md:text-base lg:text-xl">
              Project management tool you need to plan and track work across every team.
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <button ref={mainbtnRef} className="bg-purple-900 py-2 px-4 rounded-lg text-white hover:font-bold hover:bg-purple-950 hover:text-white">
              Get Started
            </button>
          </div>
        </div>
      </div>
      </motion.div>
      </div>
      
      {/* features */}
    
      <div className='grid justify-center items-center grid-cols-1 grid-flow-col mt-14 '>
        <h3 className='text-purple-900 font-serif text-center font-bold text-3xl'>Features That meet your need</h3>
        
      </div>
     
      <div className="relative">
      {/* Background Image with Opacity Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100"
        style={{ backgroundImage: `url(${wave3})` }}
      />
      <div className="absolute inset-0  opacity-90" />

      {/* Feature Cards */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 md:p-8 lg:p-12">
        {[
          { title: "Your Data", description: "Easily manage and access your data in one place" },
          { title: "Secure", description: "Top-notch security features to protect your data." },
          { title: "Customization", description: "Tailor the platform to fit your specific workflow and needs" },
          { title: "Issue Tracking", description: "Easily track all the issues and workflows of your project." },
          { title: "Team Collaboration", description: "Collaborate with your team easily and efficiently" },
          { title: "Reports and Analytics", description: "Get detailed reports and analytics of your project." },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={floatInFromRight}
            transition={{ duration: 1 }}
            className="shadow-lg rounded-xl p-4 bg-white bg-opacity-80"
          >
            <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>

          {/* features2 */}
          <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={floatInFromRight}
                transition={{ duration: 1 }}
                className='grid grid-cols-1 mt-14 pr-28 pl-10 sm:pl-20 sm:pr-28 gap-4'
              >
<FaTicketAlt className="text-3xl text-purple-900 mb-[-1rem]" />
  <p className='w-40 font-serif '>Create task easily</p>
  <FaRobot className=' text-3xl text-purple-900 ml-24 mb-[-1rem]'/>
  <p className='flex justify-center text-center font-serif  w-96'>Fully coustomize workflows</p>
  <FaUsers className=' text-3xl text-button text-purple-900 ml-[11.5rem] mb-[-1rem] '/>
  <p className='flex justify-end text-end w-96 font-serif '> Seamless team collaboration</p>


</motion.div>
<br/>
<br/>
<Pricing/>

<motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={floatInFromLeft}
                transition={{ duration: 1 }}
                className='mt-12 p-6 ml-10 grid grid-flow-row justify-center text-center grid-rows-3'
              >
  <h1 className='text-purple-900 font-bold sm:text-base md:text-xl lg:text-2xl font-serif '>Ready to get started?</h1>
  <p className='font-serif '>Discover the benefits of Sprinty today and start planning and managing your projects.</p>
  <button ref={signbtnRef} className="bg-purple-900 border  text-white border-none rounded-md grid w-24 hover:font-bold hover:bg-purple-950 hover:text-white items-center justify-center lg:ml-64 lg:mt-2 sm:ml-[14rem] md:ml-[16rem] text-danger_light font-sans">Sign in</button>
  </motion.div>
 
 {/* About us */}
 <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={floatInFromRight}
      transition={{ duration: 1 }}
     
    
                className='grid grid-cols-1 grid-flow-row  rounded-2xl p-2 mb-12 ml-3 shadow-boxy'
              >
 <div className='about-us-section mt-1  ml-10 font-bold grid grid-flow-row justify-center text-center '>
              <h1 className='text-purple-900 sm:text-base md:text-xl lg:text-2xl sm:mb[-6rem] font-serif'>About Us</h1>
              <p className='text-black font-serif sm:text-sm md:text-sm lg:text-base  '>
                Sprinty is a leading project management tool designed to help teams plan, track, and manage their projects effortlessly. Our mission is to provide a seamless and efficient platform for teams to collaborate, stay organized, and achieve their project goals. With a focus on customization, security, and ease of use, Sprinty ensures that your team can work together effectively, no matter the project size or complexity.
              </p>
             

              <a className='text-purple-900 underline'href="codewolf@gmail.com">codewolf@gmail.com</a>
              <div className='sm:mr[-39rem]'>
              <img src={taskdetails} alt="task details" className='lg:w-[48rem] lg:h-[38rem] md:w-[56rem] md:h-[34rem] rounded-xl  sm:w-[30rem] grid justify-center items-center lg:ml-72 ' />
            </div>
            </div>
           
            
            </motion.div>
         
      
            </div>  
     
      {/* footer */}
      <footer className='bg-black lg:h-56 lg:pt-3 sm:h-60 sm:w-64 md:w-full font-serif '>
        <h1 className='text-white font-bold text-lg text-center'>Subscribe to our Newsletter</h1>
        <div className='flex justify-center '>
          <input type="text" placeholder='Your Email Address' className='p-1 rounded-md b  text-center' />
          <button className='bg-purple-900 text-white font-bold py-2 px-2 rounded-md hover:bg-purple-950'><FaPaperPlane className='text-sm' /></button>
        </div>
        <div className='p-6 font-bold text-3xl border-b border-warning_light'>
        <h1 className=' text-purple-900 ' >
          Sprity
        </h1>
        </div>
  <div className='grid grid-flow-col mt-4 align-text-bottom '>
  <p className='text-center text-white font-bold text-sm '>Copyright © 2024 Sprinty. All rights reserved.</p>
  
  <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={downToUp}
                transition={{ duration: 1 }}
                className="flex items-center gap-4 sm:ml-4"
              >
  <div className="social-button">
    <button className="relative lg:w-12 lg:h-12 sm:w-8 rounded-full group">
      <div
        className="floater w-full h-full absolute top-0 left-0 bg-pink-600 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"
      ></div>
      <div
        className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-pink-600 rounded-full"
      >
        <svg
          fill="none"
          viewBox="0 0 22 22"
          height="22"
          width="22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.94 6.46809C21.8884 5.2991 21.6994 4.49551 21.4285 3.79911C21.1492 3.05994 20.7194 2.39818 20.1564 1.84802C19.6062 1.28932 18.9401 0.855163 18.2094 0.580194C17.5091 0.309437 16.7096 0.120336 15.5407 0.0688497C14.363 0.0128932 13.9891 0 11.0022 0C8.01527 0 7.64141 0.0128932 6.46808 0.064466C5.29914 0.116039 4.49551 0.305225 3.79932 0.57581C3.05994 0.855163 2.39818 1.28494 1.84802 1.84802C1.28932 2.39813 0.855377 3.06428 0.580193 3.7949C0.309437 4.49551 0.120379 5.2948 0.0688496 6.4637C0.0129362 7.64141 0 8.01527 0 11.0022C0 13.9891 0.0129362 14.363 0.0644659 15.5363C0.116039 16.7053 0.305225 17.5089 0.576025 18.2053C0.855377 18.9444 1.28932 19.6062 1.84802 20.1564C2.39818 20.7151 3.06432 21.1492 3.79494 21.4242C4.49547 21.6949 5.29476 21.884 6.46391 21.9355C7.63702 21.9873 8.0111 22 10.998 22C13.9849 22 14.3588 21.9873 15.5321 21.9355C16.7011 21.884 17.5047 21.695 18.2009 21.4242C18.9321 21.1415 19.5961 20.7091 20.1505 20.1548C20.7048 19.6005 21.1373 18.9365 21.42 18.2053C21.6906 17.5047 21.8798 16.7052 21.9314 15.5363C21.9829 14.363 21.9958 13.9891 21.9958 11.0022C21.9958 8.01527 21.9914 7.64137 21.94 6.46809ZM19.9588 15.4503C19.9114 16.5248 19.731 17.105 19.5805 17.4918C19.2109 18.4502 18.4502 19.2109 17.4918 19.5805C17.105 19.731 16.5206 19.9114 15.4503 19.9586C14.29 20.0103 13.942 20.023 11.0066 20.023C8.07118 20.023 7.71881 20.0103 6.56259 19.9586C5.48816 19.9114 4.90796 19.731 4.52117 19.5805C4.04425 19.4043 3.61014 19.1249 3.25772 18.7596C2.89242 18.4029 2.61306 17.9731 2.43677 17.4961C2.28635 17.1094 2.10589 16.5248 2.05874 15.4547C2.007 14.2943 1.99428 13.9461 1.99428 11.0107C1.99428 8.07535 2.007 7.72298 2.05874 6.56698C2.10589 5.49254 2.28635 4.91235 2.43677 4.52555C2.61306 4.04842 2.89241 3.61439 3.26211 3.26189C3.61865 2.89658 4.04842 2.61723 4.52555 2.44115C4.91235 2.29073 5.49692 2.11023 6.56697 2.06291C7.72736 2.01134 8.07556 1.99844 11.0107 1.99844C13.9505 1.99844 14.2985 2.01134 15.4547 2.06291C16.5292 2.11027 17.1093 2.29069 17.4961 2.44111C17.9731 2.61723 18.4072 2.89658 18.7596 3.26189C19.1249 3.61865 19.4042 4.04842 19.5805 4.52555C19.731 4.91235 19.9114 5.49671 19.9587 6.56698C20.0103 7.72736 20.0232 8.07535 20.0232 11.0107C20.0232 13.9461 20.0104 14.29 19.9588 15.4503Z"
            className="group-hover:fill-[#171543] fill-white duration-300"
          ></path>
          <path
            d="M11.0026 5.35054C7.88252 5.35054 5.35107 7.88182 5.35107 11.0021C5.35107 14.1223 7.88252 16.6536 11.0026 16.6536C14.1227 16.6536 16.6541 14.1223 16.6541 11.0021C16.6541 7.88182 14.1227 5.35054 11.0026 5.35054ZM11.0026 14.668C8.97844 14.668 7.33654 13.0264 7.33654 11.0021C7.33654 8.97774 8.97844 7.33609 11.0025 7.33609C13.0269 7.33609 14.6685 8.97774 14.6685 11.0021C14.6685 13.0264 13.0268 14.668 11.0026 14.668ZM18.1971 5.12706C18.1971 5.85569 17.6063 6.44646 16.8775 6.44646C16.1489 6.44646 15.5581 5.85569 15.5581 5.12706C15.5581 4.39833 16.1489 3.80774 16.8775 3.80774C17.6063 3.80774 18.1971 4.39829 18.1971 5.12706Z"
            className="group-hover:fill-[#171543] fill-white duration-300"
          ></path>
        </svg>
      </div>
    </button>
  </div>
  <div className="social-button">
    <button className="relative lg:w-12 lg:h-12 sm:w-8  rounded-full group">
      <div
        className="floater w-full h-full absolute top-0 left-0 bg-blue-500 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"
      ></div>
      <div
        className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-blue-500 rounded-full"
      >
        <svg
          fill="none"
          viewBox="0 0 22 22"
          height="21"
          width="22"
          
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.8115 9.3155L20.8253 0H18.9263L11.9679 8.08852L6.41015 0H0L8.40433 12.2313L0 22H1.89914L9.24745 13.4583L15.1168 22H21.5269L12.811 9.3155H12.8115ZM10.2103 12.339L9.35878 11.1211L2.58343 1.42964H5.5004L10.9682 9.25094L11.8197 10.4689L18.9272 20.6354H16.0102L10.2103 12.3395V12.339Z"
            className="group-hover:fill-[#171543] fill-white duration-300"
          ></path>
        </svg>
      </div>
    </button>
  </div>
  <div className="social-button">
    <button className="relative lg:w-12 lg:h-12 sm:w-10 rounded-full group">
      <div
        className="floater w-full h-full absolute top-0 left-0 bg-blue-700  rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"
      ></div>
      <div
        className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-blue-700 rounded-full"
      >
        <svg
          fill="none"
          viewBox="0 0 13 22"
          height="22"
          width="13"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.71289 22H4.1898C3.60134 22 3.12262 21.5213 3.12262 20.9328V12.9863H1.06717C0.478672 12.9863 0 12.5074 0 11.9191V8.514C0 7.9255 0.478672 7.44683 1.06717 7.44683H3.12262V5.74166C3.12262 4.05092 3.6535 2.6125 4.65773 1.58207C5.6665 0.546992 7.07627 0 8.7346 0L11.4214 0.00438281C12.0089 0.00537109 12.4868 0.484086 12.4868 1.07151V4.23311C12.4868 4.82157 12.0083 5.30028 11.4199 5.30028L9.61091 5.30093C9.05919 5.30093 8.91868 5.41153 8.88864 5.44543C8.83914 5.50172 8.78023 5.66062 8.78023 6.09954V7.4467H11.284C11.4725 7.4467 11.6551 7.49319 11.812 7.58076C12.1506 7.76995 12.3611 8.12762 12.3611 8.51417L12.3597 11.9193C12.3597 12.5074 11.881 12.9861 11.2926 12.9861H8.78019V20.9328C8.78023 21.5213 8.30139 22 7.71289 22ZM4.41233 20.7103H7.49031V12.4089C7.49031 12.016 7.81009 11.6964 8.20282 11.6964H11.07L11.0712 8.73662H8.20265C7.80991 8.73662 7.49031 8.41706 7.49031 8.02411V6.09959C7.49031 5.59573 7.54153 5.0227 7.92185 4.59198C8.38144 4.07133 9.10568 4.01126 9.61056 4.01126L11.1971 4.01057V1.29375L8.73357 1.28975C6.06848 1.28975 4.41238 2.99574 4.41238 5.7417V8.02407C4.41238 8.4168 4.09277 8.73658 3.7 8.73658H1.28975V11.6964H3.7C4.09277 11.6964 4.41238 12.016 4.41238 12.4089L4.41233 20.7103Z"
            className="group-hover:fill-[#171543] fill-white duration-300"
          ></path>
        </svg>
      </div>
    </button>
  </div>
  <div className="social-button">
    <button className="relative lg:w-12 lg:h-12 sm:w-8  rounded-full group">
      <div
        className="floater w-full h-full absolute top-0 left-0 bg-red-700 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"
      ></div>
      <div
        className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-red-700 rounded-full"
      >
        <svg
          fill="none"
          viewBox="0 0 30 22"
          height="22"
          width="30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.9945 9.70081L12.5775 6.18974C12.2085 5.98783 11.7724 5.99538 11.4108 6.20965C11.0489 6.42415 10.833 6.80311 10.833 7.22372V14.1857C10.833 14.6043 11.0476 14.9826 11.407 15.1973C11.5947 15.3094 11.8028 15.3657 12.0113 15.3657C12.2064 15.3654 12.3984 15.3166 12.57 15.2237L18.9872 11.7731C19.1742 11.6726 19.3305 11.5235 19.4397 11.3415C19.5489 11.1596 19.6069 10.9515 19.6077 10.7393C19.6086 10.527 19.552 10.3184 19.4441 10.1356C19.3362 9.95283 19.1808 9.80259 18.9945 9.70081ZM12.5352 13.3099V8.10662L17.3312 10.7308L12.5352 13.3099Z"
            className="group-hover:fill-[#171543] fill-white duration-300"
          ></path>
          <path
            d="M28.8325 5.19239L28.8312 5.17912C28.8065 4.94533 28.5617 2.86581 27.5508 1.80806C26.3822 0.56396 25.0574 0.412829 24.4203 0.340384C24.3722 0.335071 24.3241 0.329304 24.276 0.323081L24.2253 0.317805C20.3854 0.0385769 14.5862 0.000453846 14.5282 0.000226923L14.5231 0L14.518 0.000226923C14.4599 0.000453846 8.66074 0.0385769 4.7862 0.317805L4.73503 0.323081C4.69379 0.328641 4.64834 0.333747 4.59893 0.339533C3.96916 0.412149 2.65857 0.563563 1.48674 1.8526C0.523851 2.89905 0.245531 4.93404 0.216938 5.16272L0.213648 5.19239C0.204968 5.28969 0 7.60572 0 9.93077V12.1042C0 14.4293 0.204968 16.7453 0.213648 16.8428L0.21518 16.8574C0.239801 17.0875 0.484424 19.1289 1.49071 20.1871C2.58947 21.3895 3.97869 21.5486 4.72595 21.6341C4.84407 21.6476 4.94578 21.6592 5.01511 21.6714L5.08228 21.6807C7.29943 21.8916 14.2509 21.9955 14.5456 21.9998L14.5545 22L14.5634 21.9998C14.6214 21.9995 20.4204 21.9614 24.2604 21.6822L24.3111 21.6769C24.3597 21.6705 24.4142 21.6647 24.474 21.6585C25.1003 21.592 26.4037 21.454 27.5594 20.1823C28.5223 19.1358 28.8008 17.1007 28.8292 16.8723L28.8325 16.8426C28.8412 16.7451 29.0464 14.4293 29.0464 12.1042V9.93077C29.0461 7.60566 28.8412 5.28991 28.8325 5.19239ZM27.344 12.1042C27.344 14.2563 27.1561 16.4725 27.1383 16.6759C27.0661 17.2364 26.7724 18.5239 26.3033 19.0338C25.58 19.8296 24.837 19.9085 24.2945 19.9659C24.234 19.9721 24.1736 19.9789 24.1132 19.9863C20.3991 20.2549 14.8189 20.296 14.5619 20.2976C14.2736 20.2934 7.42372 20.1886 5.2742 19.989C5.16403 19.971 5.04501 19.9572 4.91963 19.9431C4.2834 19.8702 3.41247 19.7704 2.74282 19.0338L2.72705 19.017C2.26611 18.5368 1.98092 17.3328 1.90842 16.6826C1.89492 16.5288 1.70215 14.2864 1.70215 12.1042V9.93077C1.70215 7.78124 1.88964 5.56738 1.9078 5.35975C1.99403 4.69957 2.29317 3.49007 2.74282 3.00117C3.48826 2.18124 4.27432 2.09041 4.7942 2.03034C4.84384 2.02455 4.89013 2.01927 4.93291 2.01371C8.70107 1.74379 14.3214 1.70368 14.5231 1.70215C14.7247 1.70345 20.3431 1.74379 24.0778 2.01371C24.1236 2.0195 24.1737 2.02523 24.2275 2.03147C24.7623 2.0924 25.5705 2.18459 26.3122 2.9757L26.319 2.98301C26.78 3.46324 27.0652 4.68828 27.1376 5.35152C27.1505 5.4967 27.344 7.74397 27.344 9.93077V12.1042Z"
            className="group-hover:fill-[#171543] fill-white duration-300"
          ></path>
        </svg>
      </div>
    </button>
  </div>
</motion.div>


  </div>
    
  </footer>
    
    </>
  )
}

export default App