import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Menu, X, ShoppingCart, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "@/Actions/UserAction";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  const dispatch = useDispatch()
  const { user, isAuth } = useSelector((state) => state.user);

const HandleLogout = () =>{
  dispatch(Logout())
}


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-blue-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
    
          <div className="flex-shrink-0 flex items-center">
            <Link to="/home" className="text-white text-xl font-bold">
      Home
            </Link>
          </div>

   
          <div className="hidden md:flex items-center space-x-4">
            {isAuth ? (
     
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center text-blue-300 hover:text-white transition duration-150"
                >
                  <User className="h-6 w-6 mr-1" />
                  <span className="text-sm font-medium hidden lg:block">
                    {user?.name || "My Account"}
                  </span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-blue-300 hover:bg-gray-700 hover:text-white">
                      Profile
                    </Link>
                    <span onClick={HandleLogout} className="block px-4 py-2 text-sm text-blue-300 hover:bg-gray-700 hover:text-white">
                      Sign out
                    </span>
                  </div>
                )}
              </div>
            ) : (

              <Link to="/login" className="text-blue-300 hover:text-white text-sm font-medium">
                Login
              </Link>
            )}
          </div>

          
          <div className="flex md:hidden items-center">
            <button onClick={toggleMenu} className="text-blue-300 hover:text-white focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

  
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="mt-3 px-2 space-y-1">
              {isAuth ? (
                <>
                  <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-blue-300 hover:text-white hover:bg-gray-700">
                    Profile
                  </Link>
                  <Link to="/logout" className="block px-3 py-2 rounded-md text-base font-medium text-blue-300 hover:text-white hover:bg-gray-700">
                    Sign out
                  </Link>
                </>
              ) : (
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-blue-300 hover:text-white hover:bg-gray-700">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
