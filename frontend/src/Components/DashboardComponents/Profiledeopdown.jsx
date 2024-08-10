import { useState, useRef, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import { FaUserCircle } from 'react-icons/fa';

import { auth } from '../../Auth/Firebase.jsx'; // Adjust the import path to your Firebase config

const ProfileDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const dropdownMenuRef = useRef(null);
  const navigate = useNavigate(); 

  // Fetch user email on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        navigate('/login'); // Redirect to the login page after sign out
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button 
        onClick={toggleDropdown} 
        className="flex justify-center space-x-2 p-2 border border-gray-300 rounded-full bg-purple-900 text-white text-center items-center hover:bg-purple-950"
      >
       
        <span><FaUserCircle className='text-2xl ' /></span>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div 
          ref={dropdownMenuRef} 
          className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 rounded-lg shadow-lg"
        >
          <div className="flex items-center p-2 border-b border-gray-300">
            <img 
              src="https://via.placeholder.com/40" 
              alt="Profile" 
              className="w-10 h-10 rounded-full" 
            />
            <span className="ml-2">{userEmail}</span>
          </div>
          <div className="py-2">
            <a href="#settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Settings
            </a>
            <a href="#subscription" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Subscription
            </a>
            <button 
              onClick={handleSignOut} 
              className="block w-full px-4 py-2 text-white bg-purple-900 border border-purple-900 rounded-md hover:bg-red-600 hover:border-red-600"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
