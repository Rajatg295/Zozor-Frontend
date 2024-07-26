"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";

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
}

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

    const validCartItems = cartItems.filter(
      (item: any) =>
        item &&
        typeof item.price === "number" &&
        typeof item.originalPrice === "number" &&
        typeof item.name === "string" &&
        typeof item.image === "string"
    );

    setCart(validCartItems);
  }, []);

  return (
    <div className="w-full flex justify-center px-4 mt-6">
      <div className="lg:w-[90%] md:w-[90%] w-full flex lg:flex-row md:flex-row flex-col gap-4 relative">
        <div className="w-full bg-white p-4 rounded-[10px]">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-md">Your Cart</span>
          </div>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="relative flex flex-col space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex bg-white p-4 rounded-[5px] border border-gray-700"
                >
                  <Image
                    className="w-auto h-32 object-cover rounded-[5px]"
                    src={item.image}
                    alt={item.name}
                    width={120}
                    height={80}
                  />
                  <div className="ml-4 flex-1">
                    <h2 className="text-xl font-medium text-black">
                      {item.name}
                    </h2>
                    <p className="text-lg font-semibold text-black">
                      ₹ {item.price ? item.price.toLocaleString() : "N/A"}
                    </p>
                    <p className="text-sm text-black/70">
                      {item.reviewCount
                        ? `${item.reviewCount} Reviews`
                        : "No Reviews"}
                    </p>
                    <p className="text-sm text-black/50">
                      By: {item.brand || "Unknown"}
                    </p>
                    <p className="text-xs text-black/50 line-through">
                      ₹{" "}
                      {item.originalPrice
                        ? item.originalPrice.toLocaleString()
                        : "N/A"}
                    </p>
                    <p className="text-sm font-bold text-green">
                      {item.discountPercentage
                        ? `${item.discountPercentage}% OFF`
                        : "No Discount"}
                    </p>
                    <p className="text-sm text-black mt-2">
                      {item.description || "No Description"}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-yellow-500 font-bold">
                        {item.rating ? `${item.rating} ★` : "No Rating"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-[45px] h-max lg:w-96 md:w-96 w-full flex-none flex flex-col rounded-[5px] z-40">
        <div className="border-[1px] border-primary/30 bg-white">
          <div className="bg-green/10 text-green p-2">
            <span className="font-semibold text-sm">
              Save instantly ₹ 150.00 with online payment
            </span>
          </div>
          <div className="flex justify-between items-center py-4 px-2 border-b-[1px] border-primary/30">
            <span className="font-semibold text-md">Payment Summary</span>
          </div>
          <div className="flex flex-col py-4 border-b-[1px] border-primary/30">
            <PaymentSummaryItem label="Total Amount" amount="₹ 150.00" />
            <PaymentSummaryItem label="Total GST" amount="₹ 150.00" />
            <PaymentSummaryItem label="Total Shipping" amount="₹ 150.00" />
            <PaymentSummaryItem
              label="Total Coupon Discount"
              amount="₹ 150.00"
            />
          </div>
          <div className="flex justify-between text-md font-semibold px-2 py-3">
            <span>Amount Payable</span>
            <span>₹ 150.00</span>
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
                className="p-2 border-[1px] border-black/30 rounded-[5px] text-primary"
              />
              <button className="py-2 px-4 rounded-[5px] bg-black/10 text-black font-semibold text-sm">
                Apply
              </button>
            </div>
            <div className="border-[2px] p-8 mt-2 border-green border-dashed rounded-[10px] flex gap-2">
              <i className="fa fa-money-bill text-lg text-green"></i>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-md">WC1000</span>
                <span className="font-normal text-sm">
                  Flat Rs. 1000 Off on Wires & Cables
                </span>
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

const CartItem: React.FC = () => (
  <div className="w-full bg-white p-4 rounded-[5px] grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 gap-4">
    <div className="mt-2 flex gap-4">
      <Image
        className="h-24 w-24"
        src="/assets/images/product.jpg"
        alt="Product"
        width={96}
        height={96}
      />
      <div className="flex flex-col gap-2 grow">
        <span className="font-medium text-md">
          Volume Side Button Outer for Oppo
        </span>
        <span className="font-bold text-md">
          <span className="text-sm font-normal line-through">₹ 3,200 </span>₹
          3,200
        </span>
        <span className="font-medium text-sm text-green">
          Save 150 with online payment
        </span>
      </div>
    </div>
    <div className="flex gap-2 items-center justify-center">
      <button className="px-3 py-1 h-max rounded-[5px] border-[1px] border-blue bg-blue/20 font-semibold">
        {" "}
        -{" "}
      </button>
      <input
        type="number"
        className="px-3 py-1 w-12 h-max border-[2px] border-black/30 focus:outline-none rounded-[5px]"
        value="1"
      />
      <button className="px-3 py-1 h-max rounded-[5px] border-[1px] border-blue bg-blue/20 font-semibold">
        {" "}
        +{" "}
      </button>
    </div>
    <div className="flex flex-col items-end justify-center">
      <span className="font-semibold text-2xl">₹ 3,200.00</span>
      <span className="font-normal text-sm text-green">
        Free Shipping <i className="fa fa-truck"></i>
      </span>
    </div>
  </div>
);

const PaymentSummaryItem: React.FC<{ label: string; amount: string }> = ({
  label,
  amount,
}) => (
  <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
    <span>{label}</span>
    <span>{amount}</span>
  </div>
);

export default CartPage;
