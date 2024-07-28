/* eslint-disable react/no-unknown-property */
import { useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import Logo from '../assets/logo1-unscreen.gif';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const onToggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log('Menu toggled', menuOpen);
  };

  return (
   <div className='bg-white shadow-xl'>
  <header className="bg-white">
    <nav className="flex justify-between items-center h-12 w-[92%] mx-auto">
      <div className=''>
        <img src={Logo} alt="Example GIF" width={150} height={200} />
      </div>
      <div
        className={`nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 ${menuOpen ? 'top-[6%]' : 'top-[-100%]'} md:w-auto w-full flex items-center px-5`}
      >
        <ul className="flex items-center justify-center ml-14 md:flex-row flex-col md:items-center md:gap-[4vw] sm:items-center gap-8">
          <li>
            <a className="li-items font-sansc " href="#">Home</a>
          </li>
          <li>
            <a className="li-items font-sansc " href="#">Features</a>
          </li>
          <li>
            <a className="li-items font-sansc " href="#">Pricing</a>
          </li>
          <li>
            <a className="li-items font-sansc " href="#">About Us</a>
          </li>
          <li>
            <a className="li-items font-sansc " href="#">Contact Us</a>
          </li>
          <li>
            {menuOpen ? (
              <div className=" flex justify-center flex-row items-center gap-4">
                <button className="border border-purple-900 rounded-md w-24 text-purple-900 font-sans">Sign Up</button>
                <button className="bg-purple-900 text-white border border-none rounded-md w-24 text-danger_light font-sans">Sign in</button>
              </div>
            ) : null
            }
          </li>
        </ul>
      </div>
      <div className=" flex  items-center gap-4">
        <button className={`hidden md:block border border-purple-900 rounded-md w-24 text-purple-900 font-sans`}>Sign Up</button>
        <button className="hidden md:block bg-purple-900 border text-white  border-purple-900 rounded-md w-24 text-danger_light font-sans">Sign In</button>
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
};

export default Navbar;