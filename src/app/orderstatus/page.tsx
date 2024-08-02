"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  originalPrice: number;
  discountPercentage: number;
  quantity: number;
}

interface Address {
  name: string;
  room: string;
  address:"string",
  city: string;
  state: string;
  country: string;
  pin: string;
  phone: string;
}

interface ProgressStage {
  status: string;
  date?: string;
}

interface OrderDetails {
  products?: Product[];
  addresses?: Address[];
  progress?: ProgressStage[];
}

const Orderstatus = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        console.error("Order ID is missing");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/orders/${orderId}`);
        console.log('Order Details:', response.data);
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) {
    return <div>Loading wait...</div>;
  }

  const { products = [], addresses = [], progress = [] } = orderDetails;

  return (
    <div className="w-full flex justify-center px-4 mt-6">
      <div className="lg:w-[90%] md:w-[90%] w-full flex lg:flex-row md:flex-row flex-col gap-4 relative">
        <div className="w-full gap-4 relative bg-secondary p-4 mt-4">
          <div className="flex flex-col">
            <div className="w-full bg-white p-4 rounded-[5px]">
              <div className="w-full overflow-x-auto bg-white p-4 rounded-[5px] grid lg:grid-cols-4 grid-cols-1 lg:gap-4 gap-12">
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <div key={index} className="mt-2 flex gap-4">
                      <img className="h-24 w-24" src={product.image} alt={product.name} />
                      <div className="flex flex-col gap-2 grow">
                        <span className="font-medium text-md">{product.name}</span>
                        <span className="font-bold text-md">
                          <span className="text-sm font-normal line-through">₹ {product.originalPrice}</span> ₹ {product.price}
                        </span>
                        <span className="font-medium text-sm text-green">{product.discountPercentage}% off</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No products found</div>
                )}
                <div className="flex gap-2 items-center justify-center lg:col-span-2 col-span-1">
                  <div className="flex">
                    {progress.length > 0 ? (
                      progress.map((stage, index) => (
                        <StageComponent key={index} status={stage.status} date={stage.date} />
                      ))
                    ) : (
                      <div>No progress stages</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full bg-white flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between rounded-[5px] mt-4">
              <div className="flex flex-col w-full p-4 rounded-[5px]">
                <span className="font-semibold text-md">Delivery Address</span>
                {addresses.length > 0 ? (
                  <>
                    <span className="font-semibold text-sm">{addresses[0].name}</span>
                    <span className="font-normal text-sm">
                    {addresses[0].room} {addresses[0].address}, {addresses[0].city}, {addresses[0].state}, {addresses[0].country}, {addresses[0].pin}
                    </span>
                    <span className="font-normal text-sm">Mobile : {addresses[0].phone}</span>
                  </>
                ) : (
                  <div>No address found</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for Progress Tracking
const StageComponent = ({ status, date }: { status: string; date?: string }) => {
  return (
    <div className="w-20 h-2 border-t-[1px] border-green relative">
      <i className="fa fa-circle text-sm text-green absolute top-0 left-0 translate-x-[-50%] translate-y-[-50%]"></i>
      <div className="w-16 h-12 flex flex-col justify-center items-center absolute top-0 left-0 translate-x-[-50%]">
        <span className="font-semibold text-xs">{status}</span>
        {date && <span className="font-normal text-xs">{date}</span>}
      </div>
    </div>
  );
};

export default Orderstatus;





