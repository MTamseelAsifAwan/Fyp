import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { IoMenu, IoClose } from 'react-icons/io5';
import Logo from '../../assets/logo1-unscreen.gif';
import Profiledropdown from './Profiledeopdown';
const HomeNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const onToggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log('Menu toggled', menuOpen);
  };

 
  return (
    <div className='bg-white shadow-boxy3 font-serif'>
      <header className="bg-white">
        <nav className="flex justify-between items-center h-12 w-[92%] mx-auto font-serif">
          <div className=''>
            <img src={Logo} alt="Logo" width={150} height={200} />
          </div>
          <div
            className={`nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 ${menuOpen ? 'top-[6%]' : 'top-[-100%]'} md:w-auto w-full flex items-center px-5`}
          >
            <ul className="flex items-center justify-center ml-14 md:flex-row flex-col md:items-center md:gap-[4vw] sm:items-center gap-8">
              <li>
                <a className="li-items font-serifc " href="/Dashboard">Home</a>
              </li>
              <li>
                <a className="li-items font-serifc " href="#">Report</a>
              </li>
              <li>
                <a className="li-items font-serifc " href="/Chat">Chat</a>
              </li>
              
            </ul>
          </div>
          <div className="flex items-center gap-4">
            <Profiledropdown /> {/* Add the ThemeDropdown component */}
           
            {menuOpen ? (
              <IoClose onClick={onToggleMenu} className="text-3xl cursor-pointer md:hidden" />
            ) : (
              <IoMenu onClick={onToggleMenu} className="text-3xl cursor-pointer md:hidden" />
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}

export default HomeNavbar;
