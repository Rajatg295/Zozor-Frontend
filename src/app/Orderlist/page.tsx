// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// interface Order {
//   _id: string;
//   products: any[]; 
//   addresses: any[]; 
//   discount: number;
//   total: number;
//   coupon: string;
//   paymentMethod: string;
//   images: string[];
//   createdAt: string;
// }

// const OrderList = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/orders');
//         console.log('Orders:', response.data);
//         setOrders(response.data);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleViewDetails = (orderId: string) => {
//     router.push(`/orderstatus?orderId=${orderId}`);
//   };

//   return (
//     <div className="w-full flex justify-center px-4 mt-6">
//       <div className="lg:w-[90%] md:w-[90%] w-full flex lg:flex-row md:flex-row flex-col gap-4 relative">
//         <div className="w-full gap-4 relative bg-secondary p-4 mt-4">
//           <div className="w-full bg-white p-4 rounded-[5px]">
//             <h2 className="font-semibold text-lg">Order List</h2>
//             <div className="w-full overflow-x-auto bg-white p-4 rounded-[5px]">
//               {orders.length > 0 ? (
//                 orders.map((order) => (
//                   <div key={order._id} className="p-4 border-b border-gray-300">
//                     <span className="font-medium text-md">Order ID: {order._id}</span>
//                     <button
//                       className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
//                       onClick={() => handleViewDetails(order._id)}
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 ))
//               ) : (
//                 <div>No orders found</div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderList;




"use client";

import React, { useState, useEffect } from "react";
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
  address: string;
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
  products: Product[];
  addresses: Address[];
  progress: ProgressStage[];
}

interface Order {
  _id: string;
  products: any[];
  addresses: any[];
  discount: number;
  total: number;
  coupon: string;
  paymentMethod: string;
  images: string[];
  createdAt: string;
}

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/orders');
        console.log('Orders:', response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="w-full flex justify-center px-4 mt-6">
      <div className="lg:w-[90%] md:w-[90%] w-full flex lg:flex-row md:flex-row flex-col gap-4 relative">
        <div className="w-full gap-4 relative bg-secondary p-4 mt-4">
          <div className="w-full bg-white p-4 rounded-[5px]">
            <div className="w-full overflow-x-auto bg-white p-4 rounded-[5px]">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order._id} className="p-4 border-b border-gray-300 mb-4">
                    <h3 className="font-semibold text-lg">Order ID: {order._id}</h3>
                    <div className="flex flex-col mt-2">
                      {order.products.length > 0 ? (
                        order.products.map((product, index) => (
                          <div key={index} className="flex gap-4 mb-2">
                            <img className="h-24 w-24" src={product.image} alt={product.name} />
                            <div className="flex flex-col gap-2 grow">
                              <span className="font-medium text-md">{product.name}</span>
                              <span className="font-bold text-md">
                                <span className="text-sm font-normal line-through">₹ {product.originalPrice}</span> ₹ {product.price}
                              </span>
                              <span className="font-medium text-sm text-green">{product.discountPercentage}% off</span>
                              <span className="font-medium text-sm">Quantity: {product.quantity}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>No products found</div>
                      )}
                    </div>
                    <div className="flex flex-col mt-4">
                      <h4 className="font-semibold text-md">Delivery Address</h4>
                      {order.addresses.length > 0 ? (
                        <div className="mt-2">
                          <span className="font-semibold text-sm">{order.addresses[0].name}</span>
                          <span className="font-normal text-sm">
                            {order.addresses[0].room} {order.addresses[0].address}, {order.addresses[0].city}, {order.addresses[0].state}, {order.addresses[0].country}, {order.addresses[0].pin}
                          </span>
                          <span className="font-normal text-sm">Mobile: {order.addresses[0].phone}</span>
                        </div>
                      ) : (
                        <div>No address found</div>
                      )}
                    </div>
                    <div className="flex flex-col mt-4">
                      <span className="font-semibold text-md">Discount: ₹ {order.discount}</span>
                      <span className="font-semibold text-md">Total: ₹ {order.total}</span>
                      <span className="font-semibold text-md">Coupon: {order.coupon}</span>
                      <span className="font-semibold text-md">Payment Method: {order.paymentMethod}</span>
                      
                    </div>
                    <div className="flex flex-col mt-4">
                      {order.createdAt && (
                        <span className="font-normal text-sm">Created At: {new Date(order.createdAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div>No orders found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
