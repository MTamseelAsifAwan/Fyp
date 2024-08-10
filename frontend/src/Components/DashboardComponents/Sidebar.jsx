import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Auth/Firebase.jsx'; // Adjust the import path to your Firebase config
import { signOut, onAuthStateChanged } from 'firebase/auth';

const Sidebar = ({ onSelect, activeSection }) => {
  const navigate= useNavigate();
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
    <div className="sidebar relative bg-white text-black pt-4 pr-[-2rem] shadow-2xl flex flex-col justify-between" style={{ width: '202px', height: '92vh' }}>
      <ul className="space-y-6 text-black font-serif font-semibold">
        <li
          onClick={() => onSelect('dashboard')}
          className={`flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer ${
            activeSection === 'dashboard'
              ? 'bg-purple-900 text-white'
              : 'hover:bg-slate-200 hover:text-purple-950'
          }`}
        >
          Dashboard
        </li>
        <li
          onClick={() => onSelect('marketing')}
          className={`flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer ${
            activeSection === 'marketing'
              ? 'bg-purple-900 text-white'
              : 'hover:bg-slate-200 hover:text-purple-950'
          }`}
        >
          Marketing
        </li>

        {/* Add more items as needed */}
      </ul>

      {/* Sign Out Button */}
      <li
        onClick={handleSignOut}
        className="flex text-base font-serif items-baseline space-x-2 pl-11 mr-8 rounded-full text-center duration-500 ease-in-out py-4 cursor-pointer  bg-purple-950 text-white hover:bg-red-600"
      >
        Sign Out
      </li>
    </div>
  );
};

export default Sidebar;
