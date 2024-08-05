"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { FaBars, FaSearch, FaUserCircle, FaTruck, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';

const Header: React.FC = () => {
  const [sideCategoriesVisible, setSideCategoriesVisible] = useState(false);

  const toggleSideCategories = () => {
    setSideCategoriesVisible(!sideCategoriesVisible);
  };

  return (
    <header className="w-full bg-white flex justify-center px-4 shadow-lg shadow-black/10">
      <div className="lg:w-[90%] md:w-[90%] w-full bg-white flex justify-between py-4">
        <div className="h-full flex items-center gap-4">
          <FaBars 
            className="text-primary/80 hover:text-primary cursor-pointer hover:scale-110 text-2xl" 
            onClick={toggleSideCategories} 
          />
          <Image 
            className="lg:w-36 md:w-36 sm:w-36 w-32 h-auto" 
            src="/assets/images/zlogo.png" 
            alt="Logo" 
            width={128}  
            height={32} 
          />
          <div className="h-full lg:flex hidden lg:w-[400px] ml-6">
            <input 
              type="text" 
              className="w-full h-full border-[1px] border-primary rounded-l-md px-4 py-2 focus:outline-none text-primary text-sm" 
              placeholder="Search Product, Category, Brands....." 
            />
            <button className="bg-gray-500 text-white h-full px-4 rounded-r-md border-[1px] border-primary flex items-center justify-center">
              <FaSearch className="text-white text-lg" />
            </button>
          </div>
        </div>
        <div className="h-full flex items-center lg:gap-8 md:gap-8">
         
          <a href="#">
            
          </a>
          <a href="/login">
          <div className="lg:flex md:flex hidden items-center gap-2 border-b-[1px] border-white hover:border-primary transition ease-in duration-2000">
          <FaSignOutAlt className="text-lg" />
              
              <span className="text-sm font-semibold">Login</span>
              
              <i className="fa fa-chevron-down text-md"></i>
            </div>
            </a>
        <a href="/Order">
            <div className="lg:flex md:flex hidden items-center gap-2 border-b-[1px] border-white hover:border-primary transition ease-in duration-2000">
              <FaTruck className="text-lg text-primary" />
              <span className="text-sm font-semibold">Track Orders</span>
            </div>
          </a>
          <a href="/cart">
            <div className="lg:flex md:flex hidden items-center gap-2 border-b-[1px] border-white hover:border-primary transition ease-in duration-2000">
              <FaShoppingCart className="text-lg text-primary" />
              <span className="text-sm font-semibold">Cart</span>
              
            </div>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
