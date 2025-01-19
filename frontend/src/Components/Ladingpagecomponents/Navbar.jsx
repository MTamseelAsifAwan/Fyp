import { useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import Logo from '../../assets/logo1-unscreen.gif';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ scrollToSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const handleSignUp = () => {
    navigate('/signup');
    handleCloseMenu();
  };

  const handleLogin = () => {
    navigate('/login');
    handleCloseMenu();
  };

  return (
    <div className="bg-transparent shadow-boxy3 font-serif fixed top-0 left-0 right-0 z-50">
      <header className="bg-white">
        <nav className="flex justify-between items-center h-12 w-[92%] mx-auto font-serif">
          <div>
            <img src={Logo} alt="Logo" width={150} height={200} />
          </div>

          {/* Mobile menu */}
          <div
            className={`nav-links transition-transform duration-300 ease-in-out md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 ${
              menuOpen ? 'top-[4rem]' : 'top-[-100%]'
            } md:w-auto w-full flex items-center px-5 z-10`}
          >
            <ul className="flex items-center justify-center md:flex-row flex-col md:gap-[4vw] gap-8">
              <li>
                <a
                  className="li-items font-serif cursor-pointer"
                  onClick={() => {
                    scrollToSection('Home');
                    handleCloseMenu();
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="li-items font-serif cursor-pointer"
                  onClick={() => {
                    scrollToSection('Feature');
                    handleCloseMenu();
                  }}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  className="li-items font-serif cursor-pointer"
                  onClick={() => {
                    scrollToSection('About');
                    handleCloseMenu();
                  }}
                >
                  About Us
                </a>
              </li>
              <li>
                <div className="flex flex-col md:hidden gap-4">
                  <button
                    className="border border-purple-900 rounded-md w-24 text-purple-900 font-serif hover:bg-purple-950 hover:text-white"
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </button>
                  <button
                    className="bg-purple-900 text-white border border-none rounded-md w-24 text-danger_light font-serif hover:bg-purple-950"
                    onClick={handleLogin}
                  >
                    Sign In
                  </button>
                </div>
              </li>
            </ul>
          </div>

          {/* Desktop buttons and toggle icon */}
          <div className="flex items-center gap-4">
            <button
              className="hidden md:block border border-purple-900 rounded-md w-24 text-purple-900 font-serif hover:font-bold hover:bg-purple-950 hover:text-white"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
            <button
              className="hidden md:block bg-purple-900 border text-white border-purple-900 rounded-md w-24 text-danger_light font-serif hover:font-bold hover:bg-purple-950 hover:text-white"
              onClick={handleLogin}
            >
              Sign In
            </button>
            {menuOpen ? (
              <IoClose onClick={handleToggleMenu} className="text-3xl cursor-pointer md:hidden" />
            ) : (
              <IoMenu onClick={handleToggleMenu} className="text-3xl cursor-pointer md:hidden" />
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
