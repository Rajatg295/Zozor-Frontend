"use client";
import React, { useEffect, useState } from 'react';
import {FaStar,FaCartPlus, FaUserCircle, FaFile, FaShoppingBag, FaHeart } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import Image from 'next/image';



const products = [
    {
      id: 1,
      imageSrc: '/assets/images/product.jpg',
      rating: 4.5,
      reviews: 5,
      name: 'Vinspire 3HP Heavy Duty Chaff Cutter without Motor',
      brand: 'Vinspire',
      price: 15400,
      originalPrice: 19999,
      discount: '27% OFF'
    },
    {
      id: 2,
      imageSrc: '/assets/images/product.jpg',
      rating: 4.5,
      reviews: 5,
      name: 'Vinspire 3HP Heavy Duty Chaff Cutter without Motor',
      brand: 'Vinspire',
      price: 15400,
      originalPrice: 19999,
      discount: '27% OFF'
    },
    {
      id: 3,
      imageSrc: '/assets/images/product.jpg',
      rating: 4.5,
      reviews: 5,
      name: 'Vinspire 3HP Heavy Duty Chaff Cutter without Motor',
      brand: 'Vinspire',
      price: 15400,
      originalPrice: 19999,
      discount: '27% OFF'
    },
    {
      id: 4,
      imageSrc: '/assets/images/product.jpg',
      rating: 4.5,
      reviews: 5,
      name: 'Vinspire 3HP Heavy Duty Chaff Cutter without Motor',
      brand: 'Vinspire',
      price: 15400,
      originalPrice: 19999,
      discount: '27% OFF'
    },
    {
      id: 5,
      imageSrc: '/assets/images/product.jpg',
      rating: 4.5,
      reviews: 5,
      name: 'Vinspire 3HP Heavy Duty Chaff Cutter without Motor',
      brand: 'Vinspire',
      price: 15400,
      originalPrice: 19999,
      discount: '27% OFF'
    }
  ];

  const Profile: React.FC = () => {
    return (
      <div className="w-full flex justify-center px-4 mt-6">
        <div className="lg:w-[90%] md:w-[90%] w-full flex lg:flex-row md:flex-row flex-col gap-4 relative">
          {/* Sidebar Section */}
          <div className="h-max lg:w-64 md:w-64 w-full flex-none flex flex-col lg:gap-4 md:gap-4 gap-2 rounded-[5px] z-40">
            {/* User Info Section */}
            <div className="w-full p-4 bg-primary text-white flex gap-4 items-center rounded-[10px]">
              <FaUserCircle className="text-4xl" />
              <div className="flex flex-col">
                <span className="text-xs">Name</span>
                <span className="text-md font-semibold">User Name</span>
              </div>
            </div>
  
            {/* Menu Items Section */}
            <div className="w-full px-4 bg-white rounded-[10px]">
              <button className="w-full py-4 border-b-[1px] border-primary/20 hover:text-primary flex items-center gap-4 transition ease-in duration-2000">
                <FiMapPin className="text-2xl" />
                <span className="text-md font-medium">My Address</span>
              </button>
              <button className="w-full py-4 border-b-[1px] border-primary/20 hover:text-primary flex items-center gap-4 transition ease-in duration-2000">
                <FaFile className="text-2xl" />
                <span className="text-md font-medium">My Orders</span>
              </button>
              <button className="w-full py-4 border-b-[1px] border-primary/20 hover:text-primary flex items-center gap-4 transition ease-in duration-2000">
                <FaShoppingBag className="text-2xl" />
                <span className="text-md font-medium">My Business Details</span>
              </button>
              <button className="w-full py-4 border-b-[1px] border-primary/20 hover:text-primary flex items-center gap-4 transition ease-in duration-2000">
                <FaHeart className="text-2xl" />
                <span className="text-md font-medium">My Wishlist</span>
              </button>
            </div>
          </div>
  
          {/* Content Section */}
          <div className="w-full grow hidden">
            <div className="w-full bg-white p-4 rounded-[10px]">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-md">My Wishlist (2 Items)</span>
              </div>
              {/* Additional content for wishlist can go here */}
            </div>
          </div>
        </div>
  
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 bg-secondary p-2 rounded-[10px] mt-4 hidden">
          {products.map((product) => (
            <div key={product.id} className="bg-white px-4 py-8 rounded-[5px] w-full relative">
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={product.imageSrc}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-md"
                />
              </div>
              <div className="flex mb-2 gap-2">
                <button className="bg-green text-white font-bold text-xs px-1 rounded-[3px] flex items-center gap-1">
                  {product.rating} <FaStar className="text-[10px]" />
                </button>
                <span className="text-[13px] text-black/70">({product.reviews} Reviews)</span>
              </div>
              <div className="flex mb-2 gap-2">
                <span className="text-[17px] font-medium text-black/70">{product.name}</span>
              </div>
              <div className="flex mb-1 gap-2">
                <span className="text-[14px] font-semibold text-black/50">By: {product.brand}</span>
              </div>
              <div className="flex mb-3 gap-2">
                <span className="text-2xl font-bold text-black">₹ {product.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[14px] font-semibold text-black/50 line-through">₹ {product.originalPrice.toLocaleString()}</span>
                <span className="text-[16px] font-bold text-green">{product.discount}</span>
              </div>
              <div className="flex justify-between gap-2">
                <button className="py-3 px-5 rounded-[10px] bg-red-500 text-white border-[1px] border-red-500 hover:bg-white hover:text-red-500 transition ease-in duration-2000">
                  <FaCartPlus className="text-[25px]" />
                </button>
                <button className="py-3 px-5 rounded-[10px] bg-blue-500 font-semibold text-white border-[1px] border-blue-500 hover:bg-white hover:text-blue-500 transition ease-in duration-2000">
                  BUY NOW
                </button>
              </div>
            </div>
          ))}
        </div>
  
        {/* Additional sections */}
        {/* Implement other sections similarly */}
        
      </div>
    );
  };
  
  export default Profile;
