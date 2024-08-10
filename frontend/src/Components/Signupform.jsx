import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify
import Navbar2 from './Navbar2';
import wave from '../assets/wave.svg';
import GoogleIcon from '../assets/google.svg';
import formside from '../assets/formside.png';
import { auth } from '../Auth/Firebase'; // Ensure this path is correct

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

    const floatInFromLeft = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 },
    };

    const signUpWithFirebase = useCallback(async (e) => {
        e.preventDefault();
        if (password === confirmpassword) {
            setLoading(true); // Set loading to true when signup starts
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                toast.success('Registration successful!');
                navigate('/dashboard');
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    toast.warn('Email already in use. Please use a different email.');
                } else if (error.code === 'auth/network-request-failed') {
                    toast.error('Network request failed. Please check your internet connection.');
                } else {
                    toast.error(`Error: ${error.message}`);
                }
            } finally {
                setLoading(false); // Set loading to false after signup completes
            }
        } else {
            toast.warn("Passwords do not match");
        }
    }, [email, password, confirmpassword, navigate]);

    const signUpWithGoogle = useCallback(async () => {
        const provider = new GoogleAuthProvider();
        setLoading(true);
        try {
            await signInWithPopup(auth, provider);
            toast.success('Google sign-in successful!');
            navigate('/');
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    return (
        <>
            <Navbar2 />
            <div className="relative">
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-sm text-black block mb-1">Password</label>
                                    <input
                                        type="password"
                                        className="border rounded-lg px-3 py-2 text-sm w-full"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter password"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-sm text-black block mb-1">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="border rounded-lg px-3 py-2 text-sm w-full"
                                        value={confirmpassword}
                                        onChange={(e) => setConfirmpassword(e.target.value)}
                                        placeholder="Confirm password"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <button
                                    className="flex items-center justify-center py-2 px-4 bg-gray-200 hover:bg-gray-300 text-black w-full transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                    type="button"
                                    onClick={signUpWithGoogle}
                                    disabled={loading}
                                >
                                    <img src={GoogleIcon} alt="Google icon" className="w-5 h-5" />
                                    <span className="ml-2">{loading ? 'Please wait...' : 'Sign up with Google'}</span>
                                </button>
                                <div className="mt-4">
                                    <button
                                        className="py-2 px-4 bg-purple-900 hover:bg-purple-950 focus:ring-purple-900 text-white w-full transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Registering...' : 'Register'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default SignupForm;
