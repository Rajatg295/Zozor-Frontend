// "use client";
// import { useRef } from 'react';
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { FaChevronRight, FaLocationArrow, FaMinus, FaStar, FaCartPlus } from "react-icons/fa";
// import './globals.css'
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// const backendUrl = "http://localhost:8080";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   rating: number;
//   reviewCount: number;
//   description: string;
//   brand: string;
//   originalPrice: number;
//   discountPercentage: number;
//   quantity: number;
// }

// const Homepage = () => {

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const slides = [
//     "/assets/images/banner.png",
//     "/assets/images/banner.png",
//     "/assets/images/banner.png"
//   ];

//   const goToNextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };

//   const goToPrevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   const scrollLeft = () => {
//     if (sliderRef.current) {
//       sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
//     }
//   };

//   const scrollRight = () => {
//     if (sliderRef.current) {
//       sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
//     }
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/products`);
//         console.log('Fetched products:', response.data);

//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleAddToCart = (product: Product) => {
//     const cart = JSON.parse(localStorage.getItem('cart') || '[]');
//     const existingProductIndex = cart.findIndex((item: Product) => item.id === product.id);

//     if (existingProductIndex > -1) {
//       cart[existingProductIndex].quantity += 1;
//     } else {
//       cart.push({ ...product, quantity: 1 });
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
//     alert('Product added to cart!');
//   };

//   return (
//     <div className="w-full justify-center px-4 mt-6">
//       <div className="ml-[60px] lg:w-[90%] md:w-[90%] w-full flex flex-col lg:flex-row gap-4 relative">
//   <div
//     id="sideCategories"
//     className="h-max shadow-lg w-80 bg-white flex-none lg:static absolute top-0 left-0 flex-col lg:gap-4 md:gap-4 gap-2 lg:py-12 md:py-12 py-4 px-4 lg:rounded-[20px] md:rounded-[20px] rounded-[5px] z-40 lg:flex md:flex hidden"
//   >
//     <Link href="#" className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000">
//       <Image className="h-12 w-12" src="/assets/images/mobile.png" alt="Mobile Display Screens" width={48} height={48} />
//       <span className="text-lg font-bold">Mobile Display Screens</span>
//     </Link>
//     <Link href="#" className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000">
//       <Image className="h-12 w-12" src="/assets/images/mobilea.png" alt="Mobile Accessories" width={48} height={48} />
//       <span className="text-lg font-bold">Mobile Accessories</span>
//     </Link>
//     <Link href="#" className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000">
//       <Image className="h-12 w-12" src="/assets/images/mobiles.png" alt="Mobile Spare Parts" width={48} height={48} />
//       <span className="text-lg font-bold">Mobile Spare Parts</span>
//     </Link>
//     <Link href="#" className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000">
//       <Image className="h-12 w-12" src="/assets/images/mobilet.png" alt="Mobile Tool Kits" width={48} height={48} />
//       <span className="text-lg font-bold">Mobile Tool Kits</span>
//     </Link>
//     <Link href="/category" className="flex gap-2 items-center text-red-400 transition ease-in duration-2000">
//       <Image className="h-12 w-12" src="/assets/images/mobilea.png" alt="View All Categories" width={48} height={48} />
//       <span className="text-lg font-semibold">View All Categories</span>
//     </Link>
//   </div>

//   <div className="w-full grow relative">

//     <div className="hidden lg:grid md:grid grid-cols-5 gap-2 bg-white mt-4">
//       <div className="w-full border-r-[1px] border-b-[2px] border-primary h-20 flex flex-col items-center justify-center">
//         <span className="text-md font-bold text-primary">SINGHAL</span>
//         <span className="text-xs">Up to 20% OFF</span>
//       </div>
//       <div className="w-full border-r-[1px] border-b-[2px] border-primary h-20 flex flex-col items-center justify-center">
//         <span className="text-md font-bold text-primary">KORES</span>
//         <span className="text-xs">Up to 60% OFF</span>
//       </div>
//       <div className="w-full border-r-[1px] border-black h-20 flex flex-col items-center justify-center">
//         <span className="text-md font-bold text-black">CANDES</span>
//         <span className="text-xs">Up to 65% OFF</span>
//       </div>
//       <div className="w-full border-r-[1px] border-black h-20 flex flex-col items-center justify-center">
//         <span className="text-md font-bold text-black">VINSPIRE</span>
//         <span className="text-xs">Up to 60% OFF</span>
//       </div>
//       <div className="w-full h-20 flex flex-col items-center justify-center">
//         <span className="text-md font-bold text-black">SMARTEN</span>
//         <span className="text-xs">Up to 500 OFF</span>
//       </div>
//     </div>
//   </div>
// </div>

// <div className="w-full flex justify-center px-2 md:px-4 mt-9">
//   <div className="relative lg:w-[90%] md:w-[90%] h-28 px-2 md:px-4 flex items-center w-full gap-4 bg-white overflow-hidden rounded-[5px]">
//     <button
//       onClick={scrollLeft}
//       className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
//     >
//       &lt;
//     </button>

//     <div className="flex overflow-x-auto scroll-smooth whitespace-nowrap gap-4 py-2" ref={sliderRef}>
//       {[1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3].map((index) => (
//         <div key={index} className="inline-block bg-white px-4 py-8 rounded-[5px] w-full max-w-xs">
//           <div className="h-24 w-24 rounded-full shadow-lg shadow-black/20 inline-block">
//             <Image className="h-24 w-24 rounded-full" src={`/assets/images/image${index}.png`} alt={`Image ${index}`} width={96} height={96} />
//           </div>
//         </div>
//       ))}
//     </div>

//     <button
//       onClick={scrollRight}
//       className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
//     >
//       &gt;
//     </button>
//   </div>
// </div>

//       <div className="w-full flex justify-center px-4 mt-4">
//         <div className="lg:w-[90%] md:w-[90%] w-full flex flex-col bg-white p-4 rounded-[5px] gap-4 relative">
//           <div className="w-full flex items-center justify-between">
//             <span className="text-md font-semibold text-primary">RECENTLY VIEWED</span>
//             <Link href="/AllProducts">
//               <button className="bg-primary/20 border-[1px] border-primary/20 text-primary font-bold text-sm px-4 py-1 rounded-[3px] bg-orange-500 transition ease-in duration-2000">
//                 View All
//               </button>
//             </Link>
//           </div>

//           <div className="w-full bg-secondary rounded-[5px] p-4 border shadow-lg">
//             <div className="relative flex overflow-x-auto space-x-4 pb-2">
//               <ul className="flex space-x-4">
//                 {products.map((product) => (
//                   <li key={product.id} className="inline-block bg-white px-4 py-8 rounded-[5px] w-full max-w-xs">
//                     <div className="flex justify-start">
//                     <Link href={`/product/${product.id}`}>
//                   <Image
//                     className="p-8 rounded-t-lg"
//                     src={product.image}
//                     alt={product.name}
//                     width={400}
//                     height={400}
//                   />
//                 </Link>
//                     </div>
//                     <div className="flex mt-2 gap-2">
//                       <button className="bg-green-500 text-white font-bold text-xs px-1 rounded-[3px] flex items-center gap-1">
//                         {product.rating} <FaStar className="text-[10px]" />
//                       </button>
//                       <span className="text-[13px] text-black/70">({product.reviewCount} Reviews)</span>
//                     </div>
//                     <div className="flex mt-2 gap-2">
//                       <a href="#">
//                         <span className="text-[17px] font-medium text-black/70">
//                           {product.name}
//                         </span>
//                       </a>
//                     </div>
//                     <div className="flex mt-1 gap-2">
//                       <span className="text-[14px] font-semibold text-black/50">By: {product.brand}</span>
//                     </div>
//                     <div className="flex mt-3 gap-2">
//                       <span className="text-2xl font-bold text-black">₹ {product.price.toLocaleString()}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-[14px] font-semibold text-black/50 line-through">₹ {product.originalPrice.toLocaleString()}</span>
//                       <span className="text-[16px] font-bold text-green">{product.discountPercentage}% OFF</span>
//                     </div>

//                     <div className="flex justify-between mt-3 gap-2">
//                       <button
//                         className="py-3 px-5 rounded-[10px] bg-blue-500 text-white border-[1px] border-blue-500 hover:bg-white hover:text-blue-500 transition ease-in duration-2000"
//                         onClick={() => handleAddToCart(product)}
//                       >
//                         <FaCartPlus className="text-[25px]" />
//                       </button>
//                       <Link href="/product"><button className="py-3 px-5 rounded-[10px] bg-red-500 font-semibold text-white border-[1px] border-red-500 hover:bg-white hover:text-red-500 transition ease-in duration-2000">
//                         BUY NOW
//                       </button></Link>

//                     </div>
//                   </li>
//                 ))}
//               </ul>
//               <button type="button" className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
//                 &lt;
//               </button>
//               <button type="button" className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
//                 &gt;
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>

//     </div>

//   );
// };

// export default Homepage;

"use client";
import { useRef } from "react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaChevronRight,
  FaLocationArrow,
  FaMinus,
  FaStar,
  FaCartPlus,
} from "react-icons/fa";
import "./globals.css";
import { useRouter } from "next/navigation";
import axios from "axios";

const backendUrl = "http://localhost:8080";

interface Product {
  _id: string;
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

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const slides = [
    "/assets/images/banner.png",
    "/assets/images/banner.png",
    "/assets/images/banner.png",
  ];

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/products`);
        console.log("Fetched products:", response.data);

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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

  // const handleBuyNow = (product: Product) => {
  //   const productQueryString = encodeURIComponent(JSON.stringify(product));
  //   router.push(`/Buynowhomepage?product=${productQueryString}`);
  // };

  const handleBuyNow = (product: Product) => {
    const productQueryString = encodeURIComponent(JSON.stringify(product));
    router.push(`/product?product=${productQueryString}`);
  };
  
  return (
    <div className="w-full justify-center px-4 mt-6">
      <div className="ml-[60px] lg:w-[90%] md:w-[90%] w-full flex flex-col lg:flex-row gap-4 relative">
        <div
          id="sideCategories"
          className="h-max shadow-lg w-80 bg-white flex-none lg:static absolute top-0 left-0 flex-col lg:gap-4 md:gap-4 gap-2 lg:py-12 md:py-12 py-4 px-4 lg:rounded-[20px] md:rounded-[20px] rounded-[5px] z-40 lg:flex md:flex hidden"
        >
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

        <div className="w-full grow relative">
          <div className="hidden lg:grid md:grid grid-cols-5 gap-2 bg-white mt-4">
            <div className="w-full border-r-[1px] border-b-[2px] border-primary h-20 flex flex-col items-center justify-center">
              <span className="text-md font-bold text-primary">SINGHAL</span>
              <span className="text-xs">Up to 20% OFF</span>
            </div>
            <div className="w-full border-r-[1px] border-b-[2px] border-primary h-20 flex flex-col items-center justify-center">
              <span className="text-md font-bold text-primary">KORES</span>
              <span className="text-xs">Up to 60% OFF</span>
            </div>
            <div className="w-full border-r-[1px] border-black h-20 flex flex-col items-center justify-center">
              <span className="text-md font-bold text-black">CANDES</span>
              <span className="text-xs">Up to 65% OFF</span>
            </div>
            <div className="w-full border-r-[1px] border-black h-20 flex flex-col items-center justify-center">
              <span className="text-md font-bold text-black">VINSPIRE</span>
              <span className="text-xs">Up to 60% OFF</span>
            </div>
            <div className="w-full h-20 flex flex-col items-center justify-center">
              <span className="text-md font-bold text-black">SMARTEN</span>
              <span className="text-xs">Up to 500 OFF</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center px-2 md:px-4 mt-9">
        <div className="relative lg:w-[90%] md:w-[90%] h-28 px-2 md:px-4 flex items-center w-full gap-4 bg-white overflow-hidden rounded-[5px]">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
          >
            &lt;
          </button>

          <div
            className="flex overflow-x-auto scroll-smooth whitespace-nowrap gap-4 py-2"
            ref={sliderRef}
          >
            {[1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="inline-block bg-white px-4 py-9 rounded-[5px] w-full max-w-xs"
              >
                <div className="h-24 w-24 rounded-full border-[1px] border-black/20 text-black shadow-lg shadow-black/10 mt-6 inline-block">
                  <Image
                    className="h-24 w-24 rounded-full"
                    src={`/assets/images/image${index}.png`}
                    alt={`Image ${index}`}
                    width={96}
                    height={96}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="w-full flex justify-center px-4 mt-4">
        <div className="lg:w-[90%] md:w-[90%] w-full flex flex-col bg-white p-4 rounded-[5px] gap-4 relative">
          <div className="w-full flex items-center justify-between">
            <span className="text-md font-semibold text-primary">
              RECENTLY VIEWED PRODUCTS
            </span>
            <Link href="/products" className="text-sm flex gap-2 items-center">
              View All <FaChevronRight />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {loading ? (
              <div>Loading...</div>
            ) : (
              products.map((product) => (
                <div
                  key={product._id}
                  className=" p-4 rounded shadow-md flex flex-col items-center justify-center relative"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="object-contain"
                  />
                  <span className="text-[13px] text-black/70">
                    ({product.reviewCount} Reviews)
                  </span>
                  <button className="bg-green-500 text-white font-bold text-xs px-1 rounded-[3px] flex items-center gap-1">
                    {product.rating} <FaStar className="text-[10px]" />
                  </button>
                  <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                  <span className="text-2xl font-bold text-black">
                    ₹ {product.price.toLocaleString()}
                  </span>

                  <span className="text-[14px] font-semibold text-black/50">
                    By: {product.brand}
                  </span>
                  <span className="text-[14px] font-semibold text-black/50 line-through">
                    ₹ {product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-[16px] font-bold text-green">
                    {product.discountPercentage}% OFF
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex bg-blue-500 text-white py-1 px-2 mt-2 rounded hover:bg-blue-600"
                  >
                    <FaCartPlus />
                  </button>
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="bg-blue-500 text-white py-1 px-2 mt-2 rounded hover:bg-blue-600"
                  >
                    Buy now
                  </button>
                </div>
              ))
            )}
          </div>

         

        </div>
      </div>
    </div>
  );
};

export default Homepage;


// const ProductGrid = ({ products, loading }) => {
//   const router = useRouter();

//   const handleAddToCart = (product) => {
//     // Your existing add to cart functionality
//   };

//   const handleBuyNow = (product) => {
//     // Your existing buy now functionality
//   };

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         products.map((product) => (
//           <Link
//             key={product._id}
//             href={{
//               pathname: '/productdetails',
//               query: { ...product },
//             }}
//             passHref
//           >
//             <div
//               className="p-4 rounded shadow-md flex flex-col items-center justify-center relative cursor-pointer"
//               onClick={(e) => {
//                 if (e.target.tagName === 'BUTTON' || e.target.tagName === 'svg') {
//                   e.preventDefault();
//                 }
//               }}
//             >
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 width={150}
//                 height={150}
//                 className="object-contain"
//               />
//               <span className="text-[13px] text-black/70">
//                 ({product.reviewCount} Reviews)
//               </span>
//               <button className="bg-green-500 text-white font-bold text-xs px-1 rounded-[3px] flex items-center gap-1">
//                 {product.rating} <FaStar className="text-[10px]" />
//               </button>
//               <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
//               <span className="text-2xl font-bold text-black">
//                 ₹ {product.price.toLocaleString()}
//               </span>

//               <span className="text-[14px] font-semibold text-black/50">
//                 By: {product.brand}
//               </span>
//               <span className="text-[14px] font-semibold text-black/50 line-through">
//                 ₹ {product.originalPrice.toLocaleString()}
//               </span>
//               <span className="text-[16px] font-bold text-green">
//                 {product.discountPercentage}% OFF
//               </span>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleAddToCart(product);
//                 }}
//                 className="flex bg-blue-500 text-white py-1 px-2 mt-2 rounded hover:bg-blue-600"
//               >
//                 <FaCartPlus />
//               </button>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleBuyNow(product);
//                 }}
//                 className="bg-blue-500 text-white py-1 px-2 mt-2 rounded hover:bg-blue-600"
//               >
//                 Buy now
//               </button>
//             </div>
//           </Link>
//         ))
//       )}
//     </div>
//   );
// };

// export default ProductGrid;