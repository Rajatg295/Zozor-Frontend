"use client"
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight, FaLocationArrow, FaMinus, FaStar, FaCartPlus } from "react-icons/fa";
import axios from "axios";





interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  description: string;
  brand: string;
  originalPrice: number;
  discountPercentage: number;
  quantity: number;
}



const CategoryComponent = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products');
        console.log('Fetched products:', response.data); 

        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);



  const handleAddToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProductIndex = cart.findIndex((item: Product) => item.id === product.id);
  
    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };


  return (
    <div className="w-full flex justify-center px-4 mt-6">
      <div className="lg:w-[90%] md:w-[90%] w-full flex lg:flex-row md:flex-row flex-col gap-4 relative">
        <div className="h-max lg:w-80 md:w-80 w-full bg-white flex-none flex flex-col lg:gap-4 md:gap-4 gap-2 rounded-[5px] z-40">
          {/* Category Filter */}
          <div className="w-full flex flex-col gap-2 border-b-[1px] border-primary/30 py-6 px-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-md">Category</span>
              <FaMinus className="text-md" />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex justify-between items-center">
                <Link href="#" className="flex items-center">
                  <FaChevronRight className="mr-2" />
                  <span className="font-medium text-md">Mobile Tool Kits</span>
                </Link>
                <span className="font-medium text-md">(4)</span>
              </div>
            </div>
          </div>

          {/* Price Filter */}
          <div className="w-full flex flex-col gap-2 border-b-[1px] border-primary/30 py-6 px-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-md">Price</span>
              <FaMinus className="text-md" />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex justify-between items-center">
                <label>
                  <input type="checkbox" className="mr-2" />
                  <span className="font-medium text-md">₹1 - ₹500</span>
                </label>
              </div>
              <div className="flex justify-between items-center">
                <label>
                  <input type="checkbox" className="mr-2" />
                  <span className="font-medium text-md">₹501 - ₹1000</span>
                </label>
              </div>
              <div className="flex justify-between items-center">
                <label>
                  <input type="checkbox" className="mr-2" />
                  <span className="font-medium text-md">₹1001 - ₹2000</span>
                </label>
              </div>
            </div>
          </div>

          {/* Brands Filter */}
          <div className="w-full flex flex-col gap-2 border-b-[1px] border-primary/30 py-6 px-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-md">Brands</span>
              <FaMinus className="text-md" />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <input
                type="text"
                className="w-full rounded-[5px] border-[1px] border-primary/30 px-4 py-2"
                placeholder="Search....."
              />
              <div className="flex justify-between items-center">
                <label>
                  <input type="checkbox" className="mr-2" />
                  <span className="font-medium text-md">Oppo</span>
                </label>
              </div>
              <div className="flex justify-between items-center">
                <label>
                  <input type="checkbox" className="mr-2" />
                  <span className="font-medium text-md">Vivo</span>
                </label>
              </div>
              <div className="flex justify-between items-center">
                <label>
                  <input type="checkbox" className="mr-2" />
                  <span className="font-medium text-md">Realme</span>
                </label>
              </div>
            </div>
          </div>

          {/* Availability Filter */}
          <div className="w-full flex flex-col gap-2 border-b-[1px] border-primary/30 py-6 px-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-md">Availability</span>
              <FaMinus className="text-md" />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex justify-between items-center">
                <label>
                  <input type="checkbox" className="mr-2" />
                  <span className="font-medium text-md">Show in stock only</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full grow">
          <div className="w-full flex items-center justify-between">
            <span className="text-lg font-semibold text-primary">RECENTLY VIEWED</span>
          </div>
          <div className="w-full flex lg:flex-row flex-col gap-2 justify-between lg:items-center">
            <span className="text-sm font-normal">Showing 40 out of 273 Products</span>
            <div className="flex lg:flex-row md:flex-row flex-col gap-4">
              <div className="bg-white flex items-center gap-2 w-max">
                <FaLocationArrow />
                <span className="text-sm font-semibold">Delivering to - 700086</span>
                <span className="text-sm font-bold text-primary">Change</span>
              </div>
              <div className="flex items-center gap-2 px-2">
                <span className="text-sm font-semibold text-black/60">Sort By: </span>
                <select
                  name=""
                  id=""
                  className="px-6 py-1 rounded-[5px] border-[1px] border-secondary shadow-md shadow-black/5"
                >
                  <option value="">Popularity</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full bg-secondary rounded-[5px] p-4 border border-gray-700">
            <div className="relative flex overflow-x-auto space-x-4 pb-2">
              <ul className="flex space-x-4">
                {products.map((product) => (
                <li key={product.id} className="inline-block bg-white px-4 py-8 rounded-[5px] w-full max-w-xs">
                    <div className="flex justify-start">
                      <a href="#">
                        <Image
                          className="w-auto h-40 object-cover"
                          src={product.image}
                          alt={product.name}
                          width={300}
                          height={160}
                        />
                      </a>
                    </div>
                    <div className="flex mt-2 gap-2">
                      <button className="bg-green-500 text-white font-bold text-xs px-1 rounded-[3px] flex items-center gap-1">
                        {product.rating} <FaStar className="text-[10px]" />
                      </button>
                      <span className="text-[13px] text-black/70">({product.reviewCount} Reviews)</span>
                    </div>
                    <div className="flex mt-2 gap-2">
                      <a href="#">
                        <span className="text-[17px] font-medium text-black/70">
                          {product.name}
                        </span>
                      </a>
                    </div>
                    <div className="flex mt-1 gap-2">
                      <span className="text-[14px] font-semibold text-black/50">By: {product.brand}</span>
                    </div>
                    <div className="flex mt-3 gap-2">
                      <span className="text-2xl font-bold text-black">₹ {product.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold text-black/50 line-through">₹ {product.originalPrice.toLocaleString()}</span>
                      <span className="text-[16px] font-bold text-green">{product.discountPercentage}% OFF</span>
                    </div>
                    <div className="flex justify-between mt-3 gap-2">
                      <button
                        className="py-3 px-5 rounded-[10px] bg-blue-500 text-white border-[1px] border-blue-500 hover:bg-white hover:text-blue-500 transition ease-in duration-2000"
                        onClick={() => handleAddToCart(product)}
                      >
                        <FaCartPlus className="text-[25px]" />
                      </button>
                      <Link href="/product"><button className="py-3 px-5 rounded-[10px] bg-red-500 font-semibold text-white border-[1px] border-red-500 hover:bg-white hover:text-red-500 transition ease-in duration-2000">
                        BUY NOW
                      </button></Link>
                    </div>
                  </li>
                ))}
              </ul>
              <button type="button" className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
                &lt;
              </button>
              <button type="button" className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
                &gt;
              </button>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default CategoryComponent;
