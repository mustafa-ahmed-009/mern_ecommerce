import React from 'react'
import { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineMenu, HiX } from "react-icons/hi"; 
import logo from "../../../../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between bg-[#2553D3] h-[12vh] px-4 md:px-8 relative w-full">
      {/* Logo */}
      <img src={logo} alt="Logo" className="h-[60%] w-auto object-contain cursor-pointer" onClick={()=>navigate("/")} />

      {/* Search Bar - Always Visible */}
      <input
        type="text"
        className=" bg-white text-center rounded-2xl px-4 py-1 w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] focus:outline-none"
        placeholder="ابحث عن منتج"
      />

      {/* Desktop Icons (Hidden on small screens) */}
      <div className="hidden md:flex items-center gap-x-4">
        <Link to="/login">
          <CgProfile className="text-white text-3xl cursor-pointer hover:text-gray-400 transition duration-200" />
        </Link>
        <Link to="/cart">
          <IoCartOutline className="text-white text-3xl cursor-pointer hover:text-gray-400 transition duration-200" />
        </Link>
      </div>

      {/* Hamburger Menu Button - Visible on Small Screens */}
      <button 
        className="md:hidden text-white text-3xl" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <HiX /> : <HiOutlineMenu />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[12vh] left-0 w-full bg-black text-white flex flex-col items-center py-4 space-y-4 md:hidden">
          <Link to="/login">
            <CgProfile className="text-3xl cursor-pointer hover:text-gray-400 transition duration-200" />
          </Link>
          <Link to="/cart">
            <IoCartOutline className="text-3xl cursor-pointer hover:text-gray-400 transition duration-200" />
          </Link>
        </div>
      )}
    </nav>
  )
}

export default NavBar