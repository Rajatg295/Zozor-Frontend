"use client";
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineStar } from 'react-icons/ai';
import {FaRegStar,FaUserCircle,FaStarHalfAlt,FaThumbsDown,FaStar,FaCartPlus,FaBoxOpen, FaTruck, FaShare, FaBox, FaCreditCard, FaFile, FaHeadphones, FaQuestionCircle, FaTimesCircle, FaMoneyBill, FaHeart } from 'react-icons/fa';



const ProductPage = () => {

    const [quantity, setQuantity] = useState<number>(1);
    const handleQuantityChange = (delta: number): void => {
        setQuantity(prevQuantity => Math.max(prevQuantity + delta, 1));
      };

      const reviews = [
        { id: 1, name: 'Alice', rating: 4.5, comment: 'Great product! Loved it.' },
        { id: 2, name: 'Bob', rating: 3.0, comment: 'It’s okay, but could be better.' },
        { id: 3, name: 'Charlie', rating: 5.0, comment: 'Excellent! Exceeded my expectations.' },
      ];
      
      const [newReview, setNewReview] = useState({
        name: '',
        rating: 0,
        comment: '',
      });

      const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Review submitted:', newReview);
        setNewReview({ name: '', rating: 0, comment: '' });
      };
    
      const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5;
        const stars = [];
    
        for (let i = 0; i < fullStars; i++) {
          stars.push(<FaStar key={i} className="text-yellow-500" />);
        }
        if (halfStar) {
          stars.push(<FaStarHalfAlt key={fullStars} className="text-yellow-500" />);
        }
        while (stars.length < 5) {
          stars.push(<FaRegStar key={stars.length} className="text-yellow-500" />);
        }
    
        return stars;
      };

      const calculateGST = (price: number, gstRate: number = 18) => {
        return price * (gstRate / 100);
      };

      const product = {
        name: 'Vinspire 3HP Heavy Duty Chaff Cutter without Motor',
        price: 15400,
        originalPrice: 16000,
        discountPercentage: 39,
        rating: 4.5,
        reviewCount: 5,
        image: '/assets/images/product.jpg',
      };

    return (
        <div className="w-full flex justify-center px-4 mt-6">
            <div className="lg:w-[90%] md:w-[90%] w-full flex lg:flex-row md:flex-row flex-col gap-4 relative">
                <div className="w-full grow">
                    <div className="grid lg:grid-cols-2 gap-2">
                        <div className="w-full flex flex-col bg-white p-4 rounded-[5px]">
                            <div className="w-full relative flex items-center justify-center">
                                <div className="absolute top-0 right-0 h-8 w-8 border-[1px] flex justify-center items-center border-primary/30 shadow-lg shadow-black/10">
                                    <FaShare className="text-blue-500 text-lg" />
                                </div>
                                <div className="absolute top-10 right-0 h-8 w-8 border-[1px] flex justify-center items-center border-primary/30 shadow-lg shadow-black/10">
                                    <FaHeart className="text-red-500 text-lg" />
                                </div>
                                <Image className="w-auto h-64" src="/assets/images/product.jpg" alt="Product" width={500} height={400} />
                            </div>

                            <div className="w-full flex overflow-x-auto justify-center gap-6 mt-4">
                                <Image className="h-24 w-24 rounded-[5px] shadow-lg shadow-black/20" src="/assets/images/product.jpg" alt="Product Thumbnail" width={100} height={100} />
                                <Image className="h-24 w-24 rounded-[5px] shadow-lg shadow-black/20" src="/assets/images/product.jpg" alt="Product Thumbnail" width={100} height={100} />
                                <Image className="h-24 w-24 rounded-[5px] shadow-lg shadow-black/20" src="/assets/images/product.jpg" alt="Product Thumbnail" width={100} height={100} />
                                <Image className="h-24 w-24 rounded-[5px] shadow-lg shadow-black/20" src="/assets/images/product.jpg" alt="Product Thumbnail" width={100} height={100} />
                            </div>
                        </div>

                        <div className="w-full flex flex-col bg-white p-4 rounded-[5px]">
                            <div className="px-2 py-2 border-[1px] border-primary/80 bg-primary/5 text-primary font-semibold text-sm rounded-[5px]">
                                <span>The same product has been ordered by you on 9 July 2024 at 00:18 AM</span>
                            </div>

                            <div className="flex mt-2 gap-2 mt-4">
                                <a href="#">
                                    <span className="text-3xl font-bold">Vinspire 3HP Heavy Duty Chaff Cutter without Motor</span>
                                </a>
                            </div>
                            <div className="flex mt-2 gap-2 mt-4">
                                <button className="bg-green text-white font-bold text-xs px-1 rounded-[3px] flex items-center gap-1">4.5 <i className="fa fa-star text-[10px]"></i> </button>
                                <span className="text-[13px] text-black/70">(5 Reviews)</span>
                            </div>

                            <div className="flex mt-1 gap-2 mt-4">
                                <p className="text-sm font-normal text-lightText">
                                    ₹ 15,400 ( Inclusive of all taxes )
                                </p>
                            </div>
                            <div className="flex items-end mt-2">
                                <span className="text-3xl font-bold text-black mr-2">
                                    ₹ 16,000
                                </span>
                                <div className="text-md font-semibold text-gray-500">
                      (GST: ${calculateGST(product.price).toFixed(2)})
                    </div>
                            </div>
                            <p className="text-sm font-normal text-lightText">
                                MRP <span className="line-through">₹ 15,400</span> <span className="font-semibold text-lg text-green ml-1">39% OFF</span>
                            </p>

                            <div className="flex mt-2 gap-2 mt-6">
                                <span className="text-md font-semibold">Normal Size</span>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <button className="border-[1px] border-primary/80 text-primary bg-primary/20 py-0.5 px-2 rounded-[5px] font-semibold text-md">2.5 Sqmm</button>
                                <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">0.7 Sqmm</button>
                                <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">1.5 Sqmm</button>
                                <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">2.5 Sqmm</button>
                                <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">4.5 Sqmm</button>
                                <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">6.5 Sqmm</button>
                            </div>

                            <div className="flex mt-2 gap-2 mt-6">
                                <span className="text-md font-semibold">Color</span>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <button className="border-[1px] border-primary/80 text-primary bg-primary/20 py-0.5 px-2 rounded-[5px] font-semibold text-md">Black</button>
                                <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">Red</button>
                                <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">Blue</button>
                                <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">Green</button>
                                <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">Yellow</button>
                                <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">White</button>
                            </div>

                            <div className="flex mt-2 gap-2 mt-6">
                                <span className="text-md font-semibold">Buy More & Save More</span>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-semibold text-md flex gap-2 flex-col items-center">
                                    <span>Qty 2-4</span>
                                    <span>₹1,663 <span className="font-normal text-xs">/pc</span></span>
                                    <span className="text-green font-bold">77% OFF</span>
                                </button>
                                <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-semibold text-md flex gap-2 flex-col items-center">
                                    <span>Qty 5-10</span>
                                    <span>₹1,663 <span className="font-normal text-xs">/pc</span></span>
                                    <span className="text-green font-bold">77% OFF</span>
                                </button>
                                <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-semibold text-md flex gap-2 flex-col items-center">
                                    <span>Qty 11-20</span>
                                    <span>₹1,663 <span className="font-normal text-xs">/pc</span></span>
                                    <span className="text-green font-bold">77% OFF</span>
                                </button>
                                <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-semibold text-md flex gap-2 flex-col items-center">
                                    <span>Qty 21-50</span>
                                    <span>₹1,663 <span className="font-normal text-xs">/pc</span></span>
                                    <span className="text-green font-bold">77% OFF</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-[1px] border-black/20 text-black p-4 shadow-lg shadow-black/10 mt-6">
      <div className="flex mt-2 gap-2">
        <span className="text-md font-semibold">Zoroz Benefits</span>
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-3 grid-cols-1 gap-4 mt-2 border-b-[1px] border-black/20 pb-4">
        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-medium text-md flex gap-2 items-center">
          <FaFile className="text-primary text-lg" />
          <span>GST Invoice available</span>
        </button>
        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-medium text-md flex gap-2 items-center">
          <FaCreditCard className="text-primary text-lg" />
          <span>Secure Payment</span>
        </button>
        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-medium text-md flex gap-2 items-center">
          <FaHeadphones className="text-primary text-lg" />
          <span>365 Days Help Desk</span>
        </button>
      </div>

      <div className="flex mt-2 gap-2 mt-6">
        <span className="text-md font-semibold">Return & Warranty Policy</span>
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-3 grid-cols-1 gap-4 mt-2 border-bs-[1px] border-black/20">
        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-medium text-md flex gap-2 items-center">
          <FaFile className="text-primary text-lg" />
          <span>Up to 7 Days Returnable</span>
        </button>
        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-medium text-md flex gap-2 items-center">
          <FaQuestionCircle className="text-primary text-lg" />
          <span>Missing Products</span>
        </button>
        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-medium text-md flex gap-2 items-center">
          <FaTimesCircle className="text-primary text-lg" />
          <span>Wrong Product</span>
        </button>
        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-medium text-md flex gap-2 items-center">
          <FaBoxOpen className="text-primary text-lg" />
          <span>Damaged Product</span>
        </button>
        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-medium text-md flex gap-2 items-center">
          <FaThumbsDown className="text-primary text-lg" />
          <span>Defective Product</span>
        </button>
      </div>
    </div>

    <div className="border-[1px] border-black/20 text-black shadow-lg shadow-black/10 mt-6">
      <div className="flex mt-2 gap-2 border-b-[1px] border-black/20 p-4">
        <span className="text-md font-semibold">About This Product</span>
      </div>

      <div className="flex gap-2 p-4">
        <span className="text-md font-semibold">Product Specification</span>
      </div>

      <div className="p-4 border-bs-[1px] border-black/20">
        <table className="border-[1px] w-full border-dashed border-secondary border-collapse">
          <tbody>
            <tr className="w-full">
              <td className="p-2 border-[1px] border-secondary">
                <span className="text-sm font-medium">Brand</span>
              </td>
              <td className="p-2 border-[1px] border-secondary">
                <span className="text-sm font-medium">TWC</span>
              </td>
            </tr>
            <tr className="w-full bg-black/5">
              <td className="p-2 border-[1px] border-secondary">
                <span className="text-sm font-medium">Conductor Material</span>
              </td>
              <td className="p-2 border-[1px] border-secondary">
                <span className="text-sm font-medium">Copper</span>
              </td>
            </tr>
            <tr className="w-full">
              <td className="p-2 border-[1px] border-secondary">
                <span className="text-sm font-medium">Brand</span>
              </td>
              <td className="p-2 border-[1px] border-secondary">
                <span className="text-sm font-medium">TWC</span>
              </td>
            </tr>
            <tr className="w-full bg-black/5">
              <td className="p-2 border-[1px] border-secondary">
                <span className="text-sm font-medium">Customer Care Number</span>
              </td>
              <td className="p-2 border-[1px] border-secondary">
                <span className="text-sm font-medium">098100 83888</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex gap-2 p-4">
        <span className="text-md font-semibold">Product Details</span>
      </div>
      
      <div className="flex flex-col gap-2 px-4">
        <span className="text-sm font-medium">
          brand new replacement button for Oppo Reno 3 pro
        </span>
        <ul className="ml-2">
          <li>
            <span className="text-sm font-medium">
              High quality OEM product, tested and quality checked
            </span>
          </li>
          <li>
            <span className="text-sm font-medium">
              This part is not returnable so please be sure that you are purchasing the proper one
            </span>
          </li>
        </ul>
      </div>
      
      <div className="flex gap-2 p-4">
        <span className="text-md font-semibold">Key Features</span>
      </div>
      
      <div className="flex flex-col gap-2 px-4 pb-4">
        <span className="text-sm font-medium">
          Sufficient length for Various Industrial Setups
        </span>
      </div>
    </div>





                    <div className="w-full bg-white p-4 rounded-[5px] mt-4">
                        <div className="flex justify-between items-center border-b-[1px] border-lightText/60 pb-2">
                            <div className="flex gap-2 items-center">
                                <FaTruck className="text-primary text-xl" />
                                <span className="font-semibold text-md text-black">Shipping & Delivery</span>
                            </div>
                        </div>
                        <div className="flex mt-2 gap-4">
                            <div className="w-full flex items-center">
                                <div className="h-6 w-6 border-[1px] border-primary/30 flex justify-center items-center bg-primary/20 rounded-full text-primary">
                                    <FaTruck className="text-md" />
                                </div>
                                <div className="ml-2">
                                    <p className="text-sm font-semibold text-black">Free Shipping</p>
                                    <p className="text-sm text-lightText">Orders above ₹999</p>
                                </div>
                            </div>
                            <div className="w-full flex items-center">
                                <div className="h-6 w-6 border-[1px] border-primary/30 flex justify-center items-center bg-primary/20 rounded-full text-primary">
                                    <FaBox className="text-md" />
                                </div>
                                <div className="ml-2">
                                    <p className="text-sm font-semibold text-black">Easy Return</p>
                                    <p className="text-sm text-lightText">Within 30 days</p>
                                </div>
                            </div>
                            <div className="w-full flex items-center">
                                <div className="h-6 w-6 border-[1px] border-primary/30 flex justify-center items-center bg-primary/20 rounded-full text-primary">
                                    <FaCreditCard className="text-md" />
                                </div>
                                <div className="ml-2">
                                    <p className="text-sm font-semibold text-black">Secure Payment</p>
                                    <p className="text-sm text-lightText">100% secure transactions</p>
                                </div>
                            </div>
                            <div className="w-full flex items-center">
                                <div className="h-6 w-6 border-[1px] border-primary/30 flex justify-center items-center bg-primary/20 rounded-full text-primary">
                                    <FaFile className="text-md" />
                                </div>
                                <div className="ml-2">
                                    <p className="text-sm font-semibold text-black">Product Warranty</p>
                                    <p className="text-sm text-lightText">2 years warranty</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-white p-4 rounded-[5px] mt-4">
                        <div className="flex justify-between items-center border-b-[1px] border-lightText/60 pb-2">
                            <div className="flex gap-2 items-center">
                                <FaHeadphones className="text-primary text-xl" />
                                <span className="font-semibold text-md text-black">Customer Support</span>
                            </div>
                        </div>
                        <div className="flex mt-2 gap-4">
                            <div className="w-full flex items-center">
                                <div className="h-6 w-6 border-[1px] border-primary/30 flex justify-center items-center bg-primary/20 rounded-full text-primary">
                                    <FaQuestionCircle className="text-md" />
                                </div>
                                <div className="ml-2">
                                    <p className="text-sm font-semibold text-black">Frequently Asked Questions</p>
                                    <p className="text-sm text-lightText">Find answers to common questions</p>
                                </div>
                            </div>
                            <div className="w-full flex items-center">
                                <div className="h-6 w-6 border-[1px] border-primary/30 flex justify-center items-center bg-primary/20 rounded-full text-primary">
                                    <FaTimesCircle className="text-md" />
                                </div>
                                <div className="ml-2">
                                    <p className="text-sm font-semibold text-black">Returns & Exchanges</p>
                                    <p className="text-sm text-lightText">How to return or exchange a product</p>
                                </div>
                            </div>
                            <div className="w-full flex items-center">
                                <div className="h-6 w-6 border-[1px] border-primary/30 flex justify-center items-center bg-primary/20 rounded-full text-primary">
                                    <FaMoneyBill className="text-md" />
                                </div>
                                <div className="ml-2">
                                    <p className="text-sm font-semibold text-black">Payment Issues</p>
                                    <p className="text-sm text-lightText">Troubleshooting payment issues</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-white p-4 rounded-[5px] mt-4">
                        <div className="flex justify-between items-center border-b-[1px] border-lightText/60 pb-2">
                            <div className="flex gap-2 items-center">
                                <FaFile className="text-primary text-xl" />
                                <span className="font-semibold text-md text-black">Documents</span>
                            </div>
                        </div>
                        <div className="flex mt-2 gap-4">
                            <a href="#" className="text-sm font-semibold text-primary underline">
                                Product Brochure
                            </a>
                            <a href="#" className="text-sm font-semibold text-primary underline">
                                Warranty Card
                            </a>
                            <a href="#" className="text-sm font-semibold text-primary underline">
                                Installation Guide
                            </a>
                        </div>

                    </div>
                </div>


      



                <div className="h-max lg:w-80 md:w-80 w-full bg-white flex-none flex flex-col lg:gap-4 md:gap-4 gap-2 rounded-[5px] z-40">
      <div className="flex flex-col p-4">
      <p className="text-sm font-normal text-lightText">
          ₹ 15,400 (Inclusive of all taxes)
        </p>
        <div className="flex items-end mt-2">
          <span className="text-3xl font-bold text-black mr-2">
            ₹ 16,000
          </span>
          <span className="text-sm font-normal text-lightText">
            + ₹ 234 GST
          </span>
        </div>
        <p className="text-sm font-normal text-lightText">
          MRP <span className="line-through">₹ 15,400</span> <span className="font-semibold text-lg text-green ml-1">39% OFF</span>
        </p>
        

        <div className="flex gap-2 mt-4 justify-between">
          <p className="text-md font-semibold">
            Update Qty.
          </p>
          <div className="flex gap-2">
            <button 
              className="px-3 py-1 rounded-[5px] border-[1px] border-blue bg-blue/20 font-semibold"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>
            <input 
              type="number" 
              className="px-3 py-1 w-12 border-[2px] border-black/30 focus:outline-none rounded-[5px]" 
              value={quantity} 
              readOnly
            />
            <button 
              className="px-3 py-1 rounded-[5px] border-[1px] border-blue bg-blue/20 font-semibold"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>
        </div>

        <button className="py-3 px-9 rounded-[10px] bg-blue-500 text-white border-[1px] border-blue transition ease-in duration-2000 mt-6 lg:w-72 md:w-72 w-full flex items-center justify-center gap-2">
  <FaCartPlus className="text-[25px]" />
  <span>ADD TO CART</span>
</button> 
        <Link href="/checkout">
        <button className="py-3 px-5 rounded-[10px] bg-red-500 font-semibold text-white border-[1px] border-primary hover:text-primary transition ease-in duration-2000 mt-2 lg:w-72 md:w-72 w-full">
          BUY NOW
        </button>
        </Link>

        <div className="flex flex-col mt-6">
          <span className="font-semibold text-md">Delivery Details</span>

          <div className="lg:w-72 md:w-72 w-full border-[1px] border-secondary p-1 flex mt-2">
            <input type="text" value="100605" className="border-[0px] focus:outline-none px-4 w-58" />
            <button className="text-sm px-3 py-1.5 rounded-[10px] bg-primary/30 font-semibold text-primary border-[1px] border-primary/30 w-max">
              CHECK
            </button>
          </div>
          <span className="font-normal text-xs">Check serviceability at your location</span>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <div className="flex gap-2">
            <div>
              <FaTruck className="text-lg text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-green">Free Delivery</span>
              <span className="font-normal text-sm">No Shipping Charges on this order</span>
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <FaBox className="text-lg text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Delivery available at 700096 in 5 day(s)</span>
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <FaCreditCard className="text-lg text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-green">Prepaid Payment Only</span>
              <span className="font-normal text-sm">Pay on placing the order</span>
            </div>
          </div>
        </div>
      </div>
    </div>
            </div>
            
            <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Average Rating: 4.2</h3>
        {renderStars(4.2)}
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className="mb-4 p-4 border-b border-gray-200">
              <div className="flex items-center mb-2">
                {renderStars(review.rating)}
                <span className="ml-2 font-semibold">{review.name}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Add Your Review</h3>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="rating" className="block text-sm font-medium mb-1">
              Rating
            </label>
            <select
              id="rating"
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: parseFloat(e.target.value) })}
              className="w-full border border-gray-300 p-2 rounded"
              required
            >
              <option value="0">Select rating</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-1">
              Your Review
            </label>
            <textarea
              id="comment"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>

        </div>
    );
};

export default ProductPage;
