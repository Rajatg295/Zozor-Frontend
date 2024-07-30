import React from 'react';
import Image from 'next/image';


const CheckoutPage: React.FC = () => {
  return (
    <div className="w-full flex justify-center px-4 mt-6">
      <div className="lg:w-[90%] md:w-[90%] w-full flex lg:flex-row md:flex-row flex-col gap-4 relative">
        <div className="w-full gap-4 relative bg-secondary p-4 mt-4">
          
          <div className="flex flex-col">
            <div className="w-full bg-white p-4 rounded-[5px]">
              <div className="w-full overflow-x-auto bg-white p-4 rounded-[5px] grid lg:grid-cols-4 grid-cols-1 lg:gap-4 gap-12">
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
                      <span className="text-sm font-normal line-through">₹ 3,200 </span>₹ 3,200
                    </span>
                    <span className="font-medium text-sm text-green">
                      Save 150 with online payment
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 items-center justify-center lg:col-span-2 col-span-1">
                  {/* Progress Tracking */}
                  <div className="flex">
                    {/* Stage components here */}
                    <StageComponent status="Accepted" date="09 Jul 2023" />
                    <StageComponent status="Processing" date="09 Jul 2023" />
                    <StageComponent status="Packed" />
                    <StageComponent status="Shipped" />
                    <StageComponent status="Delivered" date="09 Jul 2023" />
                  </div>
                </div>
                <div className="flex flex-col items-end justify-center">
                  <span className="font-semibold text-2xl">₹ 3,200.00</span>
                  <span className="font-normal text-sm text-green">
                    Free Shipping <i className="fa fa-truck"></i>
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full bg-white flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between rounded-[5px] mt-4">
              <div className="flex flex-col w-full p-4 rounded-[5px]">
                <span className="font-semibold text-md">Delivery Address</span>
                <span className="font-semibold text-sm">User Name</span>
                <span className="font-normal text-sm">
                  Room Number | Address, City, State, INDIA, - 00000
                </span>
                <span className="font-normal text-sm">Mobile : +91 8888888888</span>
              </div>

              <div className="flex flex-col lg:w-96 md:w-96 sm:w-96 w-full p-4 rounded-[5px]">
                <span className="font-semibold text-md">Order Summary</span>
                <div className="flex justify-between mt-6">
                  <span className="font-normal text-md">Amount </span>
                  <span className="font-normal text-sm">2,800.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-normal text-md">GST </span>
                  <span className="font-normal text-sm">2,800.00</span>
                </div>
                <div className="flex justify-between mt-4">
                  <span className="font-semibold text-md">Amount Payable </span>
                  <span className="font-semibold text-sm">2,800.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-md">Payment Method</span>
                  <span className="font-semibold text-sm">UPIs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for Progress Tracking
const StageComponent: React.FC<{ status: string; date?: string }> = ({ status, date }) => {
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

export default CheckoutPage;
