"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar, FaCartPlus, FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Product {
  _id?: number;
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
  category?: string;
  stock?: number;
}

const MyWishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(savedWishlist);
  }, []);

  const handleAddToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProductIndex = cart.findIndex(
      (item: Product) => item._id === product._id
    );

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  const handleBuyNow = (product: Product) => {
    const productQueryString = encodeURIComponent(JSON.stringify(product));
    router.push(`/product?product=${productQueryString}`);
  };

  return (
    <div className="w-full flex flex-col items-center px-2 md:px-4 mt-4">
      <div className="w-full flex justify-center px-2 md:px-4 mt-4">
        <div className="lg:w-[90%] md:w-[90%] w-full flex flex-col bg-white p-4 rounded-[5px] gap-4 relative">
          
          <div className="w-full bg-secondary rounded-[5px] p-4 border">
            <div className="relative flex overflow-x-auto space-x-4 pb-2">
              <ul className="flex space-x-4">
                {wishlist.map((product) => (
                  <li
                    key={product._id}
                    className="inline-block bg-white px-4 py-8 rounded-[5px] w-full max-w-xs"
                  >
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
                      <span className="text-[13px] text-black/70">
                        ({product.reviewCount} Reviews)
                      </span>
                    </div>
                    <div className="flex mt-2 gap-2">
                      <a href="#">
                        <span className="text-[17px] font-medium text-black/70">
                          {product.name}
                        </span>
                      </a>
                    </div>
                    <div className="flex mt-1 gap-2">
                      <span className="text-[14px] font-semibold text-black/50">
                        By: {product.brand}
                      </span>
                    </div>
                    <div className="flex mt-3 gap-2">
                      <span className="text-2xl font-bold text-black">
                        ₹ {product.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold text-black/50 line-through">
                        ₹ {product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-[16px] font-bold text-green">
                        {product.discountPercentage}% OFF
                      </span>
                    </div>
                    <div className="flex justify-between mt-3 gap-2">
                      <button
                        className="py-2 px-4 md:py-3 md:px-5 rounded-[10px] bg-blue-500 text-white border-[1px] border-blue-500 hover:bg-white hover:text-blue-500 transition ease-in duration-2000"
                        onClick={() => handleAddToCart(product)}
                      >
                        <FaCartPlus className="text-[20px] md:text-[25px]" />
                      </button>

                      <button
                        onClick={() => handleBuyNow(product)}
                        className="py-2 px-4 md:py-3 md:px-5 rounded-[10px] bg-red-500 font-semibold text-white border-[1px] border-red-500 hover:bg-white hover:text-red-500 transition ease-in duration-2000"
                      >
                        BUY NOW
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWishlist;
