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

interface Address {
  name: string;
  email: string;
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
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>({});
  const toggleDetails = (orderId: string) => {
    setShowDetails((prevDetails) => ({
      ...prevDetails,
      [orderId]: !prevDetails[orderId]
    }));
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/orders");
        console.log("Orders:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    // <div className="w-full flex justify-center px-4 mt-6">
    //   <div className="lg:w-[90%] md:w-[90%] w-full flex lg:flex-row md:flex-row flex-col gap-4 relative">
    //     <div className="w-full gap-4 relative bg-secondary p-4 mt-4">
    //       <div className="w-full bg-white p-4 rounded-[5px]">
    //         <div className="w-full overflow-x-auto bg-white p-4 rounded-[5px]">
    //           {orders.length > 0 ? (
    //             orders.map((order) => (
    //               <div key={order._id} className="p-4 border-b border-gray-300 mb-4">
    //                 <h3 className="font-semibold text-lg">Order ID: {order._id}</h3>
    //                 <div className="flex flex-col mt-2">
    //                   {order.products.length > 0 ? (
    //                     order.products.map((product, index) => (
    //                       <div key={index} className="flex gap-4 mb-2">
    //                         <img className="h-24 w-24" src={product.image} alt={product.name} />
    //                         <div className="flex flex-col gap-2 grow">
    //                           <span className="font-medium text-md">{product.name}</span>
    //                           <span className="font-medium text-md">{product.description}</span>
    //                           <span className="font-medium text-sm">Rating: {product.rating}</span>
    //                           <span className="font-medium text-sm">Reviews: {product.reviewCount}</span>
    //                           <span className="font-medium text-sm">Brand: {product.brand}</span>
    //                           <span className="font-bold text-md">
    //                             <span className="text-sm font-normal line-through">₹ {product.originalPrice}</span> ₹ {product.price}
    //                           </span>
    //                           <span className="font-medium text-sm text-green">{product.discountPercentage}% off</span>
    //                           <span className="font-medium text-sm">Quantity: {product.quantity}</span>
    //                           <span className="font-medium text-sm">Category: {product.category}</span>
    //                           <span className="font-medium text-sm">Stock: {product.stock}</span>
    //                         </div>
    //                       </div>
    //                     ))
    //                   ) : (
    //                     <div>No products found</div>
    //                   )}
    //                 </div>
    //                 <div className="flex flex-col mt-4">
    //                   <h4 className="font-semibold text-md">Delivery Address</h4>
    //                   {order.addresses.length > 0 ? (
    //                     <div className="mt-2">
    //                       <span className="font-semibold text-sm">{order.addresses[0].name}</span>
    //                       <span className="font-normal text-sm">
    //                         {order.addresses[0].room} {order.addresses[0].address}, {order.addresses[0].city}, {order.addresses[0].state}, {order.addresses[0].country}, {order.addresses[0].pin}
    //                       </span>
    //                       <span className="font-normal text-sm">Mobile: {order.addresses[0].phone}</span>
    //                       <span className="font-semibold text-sm">{order.addresses[0].email}</span>
    //                     </div>
    //                   ) : (
    //                     <div>No address found</div>
    //                   )}
    //                 </div>
    //                 <div className="flex flex-col mt-4">
    //                   <span className="font-semibold text-md">Discount: ₹ {order.discount}</span>
    //                   <span className="font-semibold text-md">Total: ₹ {order.total}</span>
    //                   <span className="font-semibold text-md">Coupon: {order.coupon}</span>

    //                   <span className="font-semibold text-md">Payment Method: {order.paymentMethod}</span>

    //                 </div>
    //                 <div className="flex flex-col mt-4">
    //                   {order.createdAt && (
    //                     <span className="font-normal text-sm">Created At: {new Date(order.createdAt).toLocaleDateString()}</span>
    //                   )}
    //                 </div>
    //               </div>
    //             ))
    //           ) : (
    //             <div>No orders found</div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
<div className="w-full flex justify-center px-4 mt-8">
      <div className="lg:w-[90%] md:w-[90%] w-full bg-gray-100 p-6 rounded-lg shadow-lg">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md mb-6">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-800">Order ID: {order._id}</h3>
                  <span className="text-sm text-gray-500 mt-1">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Summary View */}
                <div className="mt-6">
                  {order.products.length > 0 && (
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <img className="h-24 w-24 object-cover rounded-md" src={order.products[0].image} alt={order.products[0].name} />

                      {/* Product Description and Pricing */}
                      <div className="flex-grow">
                        <h4 className="text-lg font-semibold text-gray-700">{order.products[0].name}</h4>
                        <p className="text-sm text-gray-600">{order.products[0].description}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-800">
                            ₹ {order.products[0].price}
                          </span>
                          {order.products.length === 1 && (
                            <span className="text-sm font-medium text-gray-600">({order.products[0].quantity} qty)</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Toggle Details */}
                <div className="mt-6">
                  <button
                    className="text-blue-500 hover:underline focus:outline-none"
                    onClick={() => toggleDetails(order._id)}
                  >
                    {showDetails[order._id] ? 'Hide Details' : 'View Details'}
                  </button>
                </div>

                {/* Detailed View (Initially Hidden) */}
                {showDetails[order._id] && (
                  <div className="mt-6 border-t border-gray-200 pt-4">
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-2">
                        {order.products.map((product, index) => (
                          <div key={index} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <img className="h-24 w-24 object-cover rounded-md" src={product.image} alt={product.name} />
                            <div className="flex flex-col flex-grow">
                              <span className="text-lg font-medium text-gray-700">{product.name}</span>
                              <span className="text-md font-medium text-gray-600">{product.description}</span>
                              <div className="mt-2 flex items-center gap-2">
                                <span className="text-sm text-gray-500">Rating:</span>
                                <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                              </div>
                              <div className="mt-1 flex items-center gap-2">
                                <span className="text-sm text-gray-500">Reviews:</span>
                                <span className="text-sm font-semibold text-gray-700">{product.reviewCount}</span>
                              </div>
                              <div className="mt-1 flex items-center gap-2">
                                <span className="text-sm text-gray-500">Brand:</span>
                                <span className="text-sm font-semibold text-gray-700">{product.brand}</span>
                              </div>
                              <div className="mt-2 flex items-center gap-2">
                                <span className="text-lg font-bold text-gray-800">
                                  <span className="text-sm font-normal line-through text-gray-500">₹ {product.originalPrice}</span> ₹ {product.price}
                                </span>
                                <span className="text-sm font-medium text-green-600">{product.discountPercentage}% off</span>
                              </div>
                              <div className="mt-1 flex items-center gap-2">
                                <span className="text-sm text-gray-500">Quantity:</span>
                                <span className="text-sm font-semibold text-gray-700">{product.quantity}</span>
                              </div>
                              <div className="mt-1 flex items-center gap-2">
                                <span className="text-sm text-gray-500">Category:</span>
                                <span className="text-sm font-semibold text-gray-700">{product.category}</span>
                              </div>
                              <div className="mt-1 flex items-center gap-2">
                                <span className="text-sm text-gray-500">Stock:</span>
                                <span className="text-sm font-semibold text-gray-700">{product.stock}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pricing Details */}
                      <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-md">
                        <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Pricing & Payment Details</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md">
                            <span className="text-md font-semibold text-gray-800">Discount:</span>
                            <span className="text-md font-semibold text-gray-700">₹ {order.discount}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md">
                            <span className="text-md font-semibold text-gray-800">Total:</span>
                            <span className="text-md font-semibold text-gray-700">₹ {order.total}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md">
                            <span className="text-md font-semibold text-gray-800">Coupon:</span>
                            <span className="text-md font-semibold text-gray-700">{order.coupon}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md">
                            <span className="text-md font-semibold text-gray-800">Payment Method:</span>
                            <span className="text-md font-semibold text-gray-700">{order.paymentMethod}</span>
                          </div>
                        </div>
                      </div>

                      {/* Address Information */}
                      <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        {order.addresses.length > 0 ? (
                          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
                            <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Address</h4>
                            <p className="text-md font-semibold text-gray-700">Name: {order.addresses[0].name}</p>
                            <p className="text-md text-gray-600">Room: {order.addresses[0].room}</p>
                            <p className="text-md text-gray-600">Address: {order.addresses[0].address}</p>
                            <p className="text-md text-gray-600">City: {order.addresses[0].city}</p>
                            <p className="text-md text-gray-600">State: {order.addresses[0].state}</p>
                            <p className="text-md text-gray-600">Country: {order.addresses[0].country}</p>
                            <p className="text-md text-gray-600">PIN: {order.addresses[0].pin}</p>
                            <p className="text-md text-gray-600">Mobile: {order.addresses[0].mobile}</p>
                            <p className="text-md text-gray-600">Email: {order.addresses[0].email}</p>
                          </div>
                        ) : (
                          <p className="text-md text-gray-600">No address details available</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-700">No orders found</p>
        )}
      </div>
    </div>


  );
};

export default OrderList;
