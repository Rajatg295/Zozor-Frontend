
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  rating: number;
  reviewCount: number;
  description: string;
  brand: string;
  originalPrice: number;
  discountPercentage: number;
  category?: string;
  stock?: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [coupon, setCoupon] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const router = useRouter();

  const coupons: { [key: string]: number } = {
    "DISCOUNT100": 100,
    "DISCOUNT150": 150,
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    const totalPrice = getTotalPriceWithoutExtras();
    setShipping(totalPrice * 0.02);
  }, [cart]);

  const handleCheckout = () => {

    const cartString = JSON.stringify(cart);
    const encodedCart = encodeURIComponent(cartString);
    console.log("Encoded Cart: ", encodedCart);
    const couponQuery = coupon ? `&coupon=${coupon}` : '';
    router.push(`/checkout?cart=${encodedCart}${couponQuery}`);

  };

  const handleQuantityChange = (productId: string, action: 'increase' | 'decrease') => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        return {
          ...item,
          quantity: action === 'increase' ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
        };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleApplyCoupon = () => {
    if (coupons[coupon]) {
      setDiscount(coupons[coupon]);
      const encodedCart = encodeURIComponent(JSON.stringify(cart));
      router.push(`/checkout?cart=${encodedCart}&coupon=${coupon}`);
    } else {
      alert("Invalid coupon code");
      setDiscount(0);
    }
  };

  const getTotalPriceWithoutExtras = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalPrice = () => {
    const totalPrice = getTotalPriceWithoutExtras();
    const gstRate = 0.18;
    const gstAmount = totalPrice * gstRate;
    const totalWithGst = totalPrice + gstAmount;
    const totalWithShipping = totalWithGst + shipping;
    const totalWithDiscount = totalWithShipping - discount;
    return { totalPrice, gstAmount, totalWithGst, totalWithShipping, totalWithDiscount };
  };

  const { totalPrice, gstAmount, totalWithGst, totalWithShipping, totalWithDiscount } = getTotalPrice();

  return (
    <div className="w-full flex justify-center px-4 mt-6">
    <div className="lg:w-[90%] md:w-[90%] w-full flex lg:flex-row md:flex-row flex-col gap-4 relative">
      <div className="w-full lg:w-[calc(100%-400px)] bg-white p-4 rounded-[10px] flex flex-col">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-md">Your Cart</span>
        </div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="relative flex flex-col space-y-4 mr-5">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex bg-white p-4 rounded-[5px] border border-gray-700"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="w-auto h-32 object-cover rounded-[5px]"
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-semibold text-black">{item.name}</h2>
                  <p className="text-gray-500">₹ {item.price.toLocaleString()}</p>
                  <p className="text-sm text-black/70">
                    {item.reviewCount ? `${item.reviewCount} Reviews` : "No Reviews"}
                  </p>
                  <p className="text-sm text-black/50">By: {item.brand || "Unknown"}</p>
                  <p className="text-xs text-black/50 line-through">
                    ₹ {item.originalPrice ? item.originalPrice.toLocaleString() : "N/A"}
                  </p>
                  <p className="text-sm font-bold text-green">
                    {item.discountPercentage ? `${item.discountPercentage}% OFF` : "No Discount"}
                  </p>
                  <p className="text-sm text-black mt-2">{item.description || "No Description"}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-yellow-500 font-bold">
                      {item.rating ? `${item.rating} ★` : "No Rating"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => handleQuantityChange(item._id, 'decrease')}
                      className="bg-gray-200 p-2 rounded"
                    >
                      <FaMinus />
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, 'increase')}
                      className="bg-gray-200 p-2 rounded"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleRemoveFromCart(item._id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6">
              <h2 className="text-lg font-semibold">Total ₹ {totalWithDiscount.toLocaleString()}</h2>
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
  
      <div className="w-full mt-9 lg:w-96 md:w-96 flex-none flex flex-col rounded-[5px] z-40">
        <div className="border-[1px] border-primary/30 bg-white">
          <div className="bg-green/10 text-green p-2">
            <span className="font-semibold text-sm">Save instantly ₹ 150.00 with online payment</span>
          </div>
          <div className="flex justify-between items-center py-4 px-2 border-b-[1px] border-primary/30">
            <span className="font-semibold text-md">Payment Summary</span>
          </div>
          <div className="flex flex-col py-4 border-b-[1px] border-primary/30">
            <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
              <span>Total Amount </span>
              <span>₹ {totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
              <span>Total GST(18%)</span>
              <span>₹ {gstAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
              <span>Total Shipping (2%)</span>
              <span>₹ {shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
              <span>Total Coupon Discount</span>
              <span>₹ {discount.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex justify-between text-md font-semibold px-2 py-3">
            <span>Amount Payable</span>
            <span>₹ {totalWithDiscount.toLocaleString()}</span>
          </div>
        </div>
  
        <div className="border-[1px] border-primary/30 bg-white mt-6">
          <div className="flex justify-between items-center py-4 px-2 border-b-[1px] border-primary/30">
            <span className="font-semibold text-md">Apply Coupon</span>
          </div>
          <div className="flex flex-col py-4 px-3 border-b-[1px] border-primary/30">
            <div className="flex lg:flex-row md:flex-row flex-col gap-2">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="p-2 border-[1px] border-black/30 rounded-[5px] text-primary"
              />
              <button
                onClick={handleApplyCoupon}
                className="py-2 px-4 rounded-[5px] bg-black/10 text-black font-semibold text-sm"
              >
                Apply
              </button>
            </div>
            <div className="border-[2px] p-8 mt-2 border-green border-dashed rounded-[10px] flex gap-2">
              <i className="fa fa-money-bill text-lg text-green"></i>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-md">DISCOUNT100</span>
                <span className="font-normal text-sm">Flat Rs. 100 Off</span>
              </div>
            </div>
            <div className="border-[2px] p-8 mt-2 border-green border-dashed rounded-[10px] flex gap-2">
              <i className="fa fa-money-bill text-lg text-green"></i>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-md">DISCOUNT150</span>
                <span className="font-normal text-sm">Flat Rs. 150 Off</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center text-md text-primary font-semibold px-2 py-3">
          <span>View All Coupons</span>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CartPage;
