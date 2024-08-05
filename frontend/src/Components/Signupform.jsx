import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../Auth/Firebase'; // Ensure this path is correct
import wave from '../assets/wave.svg';
import GoogleIcon from '../assets/google.svg';
import GithubIcon from '../assets/github.svg';
import formside from '../assets/formside.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const navigate = useNavigate(); // Use the useNavigate hook for navigation

    const floatInFromLeft = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 },
    };

    const signUpWithFirebase = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (password === confirmpassword) {
            // If both passwords match, register the user in Firebase
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                toast.success('Registration successful!'); // Show success toast
                navigate('/dashboard'); 
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    toast.warn('Email already in use. Please use a different email.'); // Show warning toast for email already in use
                } else {
                    toast.error(`Error: ${error.message}`); // Show error toast for other errors
                }
            }
        } else {
            toast.warn("Passwords do not match"); // Show warning toast for password mismatch
        }
    };

    const signUpWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            toast.success('Google sign-in successful!');
            navigate('/'); // Navigate to the home page after successful sign-in
        } catch (error) {
            toast.error(`Error: ${error.message}`); // Show error toast for sign-in errors
        }
    };

    return (
        <>
            <div className="relative">
                {/* Background Image with Opacity Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{ backgroundImage: `url(${wave})` }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 bg-gray-50 w-screen h-screen">
                    <div className="hidden sm:block">
                        <img src={formside} alt="Form side image" className="object-cover w-full h-full" />
                    </div>
                    <div className="flex items-center justify-center p-4 sm:p-8">
                        <form
                            onSubmit={signUpWithFirebase}
                            className="relative w-full max-w-md mx-auto space-y-6"
                        >
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={floatInFromLeft}
                                transition={{ duration: 2 }}
                                className="font-serif justify-center grid grid-cols-1 items-center text-center flex-col sm:px-4 md:px-8 lg:px-12 bg-cover bg-center"
                            >
                                <h2 className="font-bold text-2xl sm:text-3xl text-purple-900 text-center">
                                    Welcome to Sprinty
                                </h2>
                            </motion.div>
                            <div className="space-y-4">
                                <div>
                                    <label className="font-semibold text-sm text-black block mb-1">Email address</label>
                                    <input
                                        type="email"
                                        className="border rounded-lg px-3 py-2 text-sm w-full"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-sm text-black block mb-1">Password</label>
                                    <input
                                        type="password"
                                        className="border rounded-lg px-3 py-2 text-sm w-full"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter password"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-sm text-black block mb-1">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="border rounded-lg px-3 py-2 text-sm w-full"
                                        id="confirmPassword"
                                        value={confirmpassword}
                                        onChange={(e) => setConfirmpassword(e.target.value)}
                                        placeholder="Confirm password"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <button
                                    className="flex items-center justify-center py-2 px-4 bg-gray-200 hover:bg-gray-300 text-black w-full transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                    type="button"
                                    onClick={signUpWithGoogle}
                                >
                                    <img src={GoogleIcon} alt="Google icon" className="w-5 h-5" />
                                    <span className="ml-2">Sign up with Google</span>
                                </button>
                                {/* <button
                                    className="flex items-center justify-center py-2 px-4 bg-gray-200 hover:bg-gray-300 text-black w-full transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                    type="button"
                                >
                                    <img src={GithubIcon} alt="Github icon" className="w-5 h-5" />
                                    <span className="ml-2">Sign in with Github</span>
                                </button> */}
                                <div className="mt-4">
                                    <button
                                        className="py-2 px-4 bg-purple-900 hover:bg-purple-950 focus:ring-purple-900 text-white w-full transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                        type="submit"
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* ToastContainer for showing notifications */}
            <ToastContainer />
        </>
    );
};

export default SignupForm;
