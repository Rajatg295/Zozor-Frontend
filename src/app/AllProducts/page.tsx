"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaCartPlus } from 'react-icons/fa';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const backendUrl = "http://localhost:8080";

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/products`);
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
    console.log('Add to cart:', product);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full flex flex-col items-center px-2 md:px-4 mt-4">
      <div className="w-full flex justify-center px-2 md:px-4 mt-4">
        <div className="lg:w-[90%] md:w-[90%] w-full flex flex-col bg-white p-4 rounded-[5px] gap-4 relative">
          <div className="w-full flex items-center justify-between">
            <span className="text-md font-semibold text-primary">Explore All Products</span>
          </div>

          <div className="w-full bg-secondary rounded-[5px] p-4 border">
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
                        className="py-2 px-4 md:py-3 md:px-5 rounded-[10px] bg-blue-500 text-white border-[1px] border-blue-500 hover:bg-white hover:text-blue-500 transition ease-in duration-2000"
                        onClick={() => handleAddToCart(product)}
                      >
                        <FaCartPlus className="text-[20px] md:text-[25px]" />
                      </button>
                      <Link href="/product">
                        <button className="py-2 px-4 md:py-3 md:px-5 rounded-[10px] bg-red-500 font-semibold text-white border-[1px] border-red-500 hover:bg-white hover:text-red-500 transition ease-in duration-2000">
                          BUY NOW
                        </button>
                      </Link>
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
}
