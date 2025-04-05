import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { X, Menu, ShoppingCart, User, Package, LogOut } from "lucide-react";
import Logo from "../../assets/logo.png";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between py-4 md:px-4 border-b border-gray-200 bg-white">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-4">
        <img
          src={Logo}
          alt="Logo"
          className="w-[140px] border-2 border-white"
        />
        <h2 className="text-2xl font-bold text-black tracking-wide hover:text-gray-600 transition duration-100 hidden sm:block">
          Kerevat Ordering Page
        </h2>
      </Link>

      {/* Navbar Right */}
      <div className="flex items-center gap-12 sm:gap-4">
        {/* Cart Icon */}
        <div className="relative">
          <Link
            to="/cart"
            className="text-white hover:text-gray-200 transition"
          >
            <ShoppingCart
              size={28}
              className="hover:text-gray-600 cursor-pointer transition"
            />
          </Link>
          {getTotalCartAmount() > 0 && (
            <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#912821] rounded-full"></div>
          )}
        </div>

        {/* Profile Section */}
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="cursor-pointer relative group overflow-hidden border-2 px-8 py-2 border-[#912821] hidden sm:block"
          >
            <span className="font-bold text-white text-xl relative z-10 group-hover:text-[#912821] duration-500">
              Sign in
            </span>
            <span className="absolute top-0 left-0 w-full bg-[#912821] duration-500 group-hover:-translate-x-full h-full"></span>
            <span className="absolute top-0 left-0 w-full bg-[#912821] duration-500 group-hover:translate-x-full h-full"></span>

            <span className="absolute top-0 left-0 w-full bg-[#912821] duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
            <span className="absolute delay-300 top-0 left-0 w-full bg-[#912821] duration-500 group-hover:translate-y-full h-full"></span>
          </button>
        ) : (
          <div className="relative group hidden sm:block">
            <User
              size={28}
              className="hover:text-gray-700 focus:text-gray-700 cursor-pointer transition-colors duration-300"
              aria-label="User settings"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {/* Dropdown Menu */}
            <ul
              className={`absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl text-gray-800 ${
                !dropdownOpen ? "hidden" : "block"
              }`}
            >
              <li
                onClick={() => {
                  navigate("/myorders");
                  setDropdownOpen(false);
                }}
                className="flex items-center space-x-3 px-5 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200 focus:bg-gray-200 focus:outline-none"
              >
                <Package size={20} className="text-indigo-600" />
                <p className="text-lg font-semibold">Orders</p>
              </li>
              <hr />
              <li
                onClick={() => {
                  logout();
                  setDropdownOpen(false);
                }}
                className="flex items-center space-x-3 px-5 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200 focus:bg-gray-200 focus:outline-none"
              >
                <LogOut size={20} className="text-red-500" />
                <p className="text-lg font-semibold">Logout</p>
              </li>
            </ul>
          </div>
        )}

        {/* Mobile Navigation */}
        <div className="sm:hidden">
          <button
            className="p-2 text-gray-600 hover:text-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {!menuOpen ? <Menu size={28} /> : <X />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden absolute top-25 left-0 w-full bg-white shadow-lg p-4">
          {/* Conditionally render the Sign In button */}
          {!token && (
            <button
              onClick={() => setShowLogin(true)}
              className="cursor-pointer relative group overflow-hidden border-2 px-8 py-2 border-[#912821] w-full mb-4"
            >
              <span className="font-bold text-white text-xl relative z-10 group-hover:text-[#912821] duration-500">
                Sign in
              </span>
              <span className="absolute top-0 left-0 w-full bg-[#912821] duration-500 group-hover:-translate-x-full h-full"></span>
              <span className="absolute top-0 left-0 w-full bg-[#912821] duration-500 group-hover:translate-x-full h-full"></span>

              <span className="absolute top-0 left-0 w-full bg-[#912821] duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
              <span className="absolute delay-300 top-0 left-0 w-full bg-[#912821] duration-500 group-hover:translate-y-full h-full"></span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
