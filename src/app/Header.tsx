// "use client";
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { FaBars, FaSearch, FaTruck, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
// import Link from 'next/link';

// const Header: React.FC = () => {
//   const [sideCategoriesVisible, setSideCategoriesVisible] = useState(false);

//   const toggleSideCategories = () => {
//     setSideCategoriesVisible(!sideCategoriesVisible);
//   };

//   const handleClickOutside = (event: MouseEvent) => {
//     const target = event.target as HTMLElement;
//     if (sideCategoriesVisible && !target.closest('#sideCategories') && !target.closest('.fa-bars')) {
//       setSideCategoriesVisible(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, [sideCategoriesVisible]);

//   return (
//     <header className="w-full bg-white flex justify-center px-4 shadow-lg shadow-black/10">
//       <div className="lg:w-[90%] md:w-[90%] w-full bg-white flex justify-between py-4">
//         <div className="h-full flex items-center gap-4">
//           <Image 
//             className="lg:w-36 md:w-36 sm:w-36 w-32 h-auto" 
//             src="/assets/images/zlogo.png" 
//             alt="Logo" 
//             width={128}  
//             height={32} 
//           />
//           <FaBars 
//             className="fa-bars text-primary/80 hover:text-primary cursor-pointer hover:scale-110 text-2xl" 
//             onClick={toggleSideCategories} 
//           />
//           <div className="h-full lg:flex hidden lg:w-[400px] ml-6">
//             <input 
//               type="text" 
//               className="w-full h-full border-[1px] border-primary rounded-l-md px-4 py-2 focus:outline-none text-primary text-sm" 
//               placeholder="Search Product, Category, Brands....." 
//             />
//             <button className="bg-gray-500 text-white h-full px-4 rounded-r-md border-[1px] border-primary flex items-center justify-center">
//               <FaSearch className="text-white text-lg" />
//             </button>
//           </div>
//         </div>
//         <div className="h-full flex items-center lg:gap-8 md:gap-8">
//           <a href="#" />
//           <a href="/login">
//             <div className="lg:flex md:flex hidden items-center gap-2 border-b-[1px] border-white hover:border-primary transition ease-in duration-2000">
//               <FaSignOutAlt className="text-lg" />
//               <span className="text-sm font-semibold">Login</span>
//               <i className="fa fa-chevron-down text-md"></i>
//             </div>
//           </a>
//           <a href="/profile">
//             <div className="lg:flex md:flex hidden items-center gap-2 border-b-[1px] border-white hover:border-primary transition ease-in duration-2000">
//               <FaTruck className="text-lg text-primary" />
//               <span className="text-sm font-semibold">Track Orders</span>
//             </div>
//           </a>
//           <a href="/cart">
//             <div className="lg:flex md:flex hidden items-center gap-2 border-b-[1px] border-white hover:border-primary transition ease-in duration-2000">
//               <FaShoppingCart className="text-lg text-primary" />
//               <span className="text-sm font-semibold">Cart</span>
//             </div>
//           </a>
//         </div>
//       </div>

//       <div
//         id="sideCategories"
//         className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg flex-none flex-col lg:gap-4 md:gap-4 gap-2 lg:py-12 md:py-12 py-4 px-4 lg:rounded-[20px] md:rounded-[20px] rounded-[5px] z-50 transition-transform transform ${sideCategoriesVisible ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <Link
//           href="#"
//           className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000"
//         >
//           <Image
//             className="h-12 w-12"
//             src="/assets/images/mobile.png"
//             alt="Mobile Display Screens"
//             width={48}
//             height={48}
//           />
//           <span className="text-lg font-bold">Mobile Display Screens</span>
//         </Link>
//         <Link
//           href="#"
//           className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000"
//         >
//           <Image
//             className="h-12 w-12"
//             src="/assets/images/mobilea.png"
//             alt="Mobile Accessories"
//             width={48}
//             height={48}
//           />
//           <span className="text-lg font-bold">Mobile Accessories</span>
//         </Link>
//         <Link
//           href="#"
//           className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000"
//         >
//           <Image
//             className="h-12 w-12"
//             src="/assets/images/mobiles.png"
//             alt="Mobile Spare Parts"
//             width={48}
//             height={48}
//           />
//           <span className="text-lg font-bold">Mobile Spare Parts</span>
//         </Link>
//         <Link
//           href="#"
//           className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000"
//         >
//           <Image
//             className="h-12 w-12"
//             src="/assets/images/mobilet.png"
//             alt="Mobile Tool Kits"
//             width={48}
//             height={48}
//           />
//           <span className="text-lg font-bold">Mobile Tool Kits</span>
//         </Link>
//         <Link
//           href="/category"
//           className="flex gap-2 items-center text-red-400 transition ease-in duration-2000"
//         >
//           <Image
//             className="h-12 w-12"
//             src="/assets/images/mobilea.png"
//             alt="View All Categories"
//             width={48}
//             height={48}
//           />
//           <span className="text-lg font-semibold">View All Categories</span>
//         </Link>
//       </div>
//     </header>
//   );
// };

// export default Header;



"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { FaBars, FaSearch, FaTruck, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => setIsModalOpen(true);
  const handleMouseLeave = () => setIsModalOpen(false);

  return (
    <header className="w-full bg-white flex justify-center px-4 shadow-lg shadow-black/10">
      <div className="lg:w-[90%] md:w-[90%] w-full bg-white flex justify-between py-4 relative">
        <div className="h-full flex items-center gap-4">
          <Image 
            className="lg:w-36 md:w-36 sm:w-36 w-32 h-auto" 
            src="/assets/images/zlogo.png" 
            alt="Logo" 
            width={128}  
            height={32} 
          />
          <div 
            className="relative group"
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
          >
            <FaBars 
              className="text-primary/80 hover:text-primary cursor-pointer hover:scale-110 text-2xl" 
            />
            {/* Modal for Categories */}
            <div
              id="modalCategories"
              className={`fixed top-16 left-0 w-80 bg-white shadow-lg rounded-lg transition-transform transform ${isModalOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}
              style={{ maxHeight: '80vh', overflowY: 'auto' }}
            >
              <div className="p-4">
                <Link
                  href="#"
                  className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000"
                >
                  <Image
                    className="h-12 w-12"
                    src="/assets/images/mobile.png"
                    alt="Mobile Display Screens"
                    width={48}
                    height={48}
                  />
                  <span className="text-lg font-bold">Mobile Display Screens</span>
                </Link>
                <Link
                  href="#"
                  className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000"
                >
                  <Image
                    className="h-12 w-12"
                    src="/assets/images/mobilea.png"
                    alt="Mobile Accessories"
                    width={48}
                    height={48}
                  />
                  <span className="text-lg font-bold">Mobile Accessories</span>
                </Link>
                <Link
                  href="#"
                  className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000"
                >
                  <Image
                    className="h-12 w-12"
                    src="/assets/images/mobiles.png"
                    alt="Mobile Spare Parts"
                    width={48}
                    height={48}
                  />
                  <span className="text-lg font-bold">Mobile Spare Parts</span>
                </Link>
                <Link
                  href="#"
                  className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000"
                >
                  <Image
                    className="h-12 w-12"
                    src="/assets/images/mobilet.png"
                    alt="Mobile Tool Kits"
                    width={48}
                    height={48}
                  />
                  <span className="text-lg font-bold">Mobile Tool Kits</span>
                </Link>
                <Link
                  href="/category"
                  className="flex gap-2 items-center text-red-400 transition ease-in duration-2000"
                >
                  <Image
                    className="h-12 w-12"
                    src="/assets/images/mobilea.png"
                    alt="View All Categories"
                    width={48}
                    height={48}
                  />
                  <span className="text-lg font-semibold">View All Categories</span>
                </Link>
              </div>
            </div>
          </div>
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
          <a href="#" />
          <a href="/login">
            <div className="lg:flex md:flex hidden items-center gap-2 border-b-[1px] border-white hover:border-primary transition ease-in duration-2000">
              <FaSignOutAlt className="text-lg" />
              <span className="text-sm font-semibold">Login</span>
              <i className="fa fa-chevron-down text-md"></i>
            </div>
          </a>
          <a href="/profile">
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
