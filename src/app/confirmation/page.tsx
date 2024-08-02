// "use client"
// import React, { useState,useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios from "axios";

// interface Product {
//     _id: string;
//     name: string;
//     price: number;
//     image: string;
//     rating: number;
//     reviewCount: number;
//     description: string;
//     brand: string;
//     originalPrice: number;
//     discountPercentage: number;
//     quantity: number;
//     category?: string;
//     stock?: number;
//   }

// const Payment = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
//   const [orderData, setOrderData] = useState<any>(null);

//   // const cart = JSON.parse(decodeURIComponent(searchParams.get("cart") || "[]"));
//   // const addresses = JSON.parse(decodeURIComponent(searchParams.get("address") || "[]"));
//   // const discount = Number(searchParams.get("discount"));
//   // const total = Number(searchParams.get("total"));
//   // const coupon = searchParams.get("coupon") || "";
//   useEffect(() => {
//     const data = searchParams.get("data");
//     if (data) {
//       setOrderData(JSON.parse(decodeURIComponent(data)));
//     }
//   }, [searchParams]);

//   const handlePaymentMethodChange = (method: string) => {
//     setPaymentMethod(method);
//     if (method === "Cash on Delivery") {
//       setShowConfirmModal(true);
//     }
//   };

//   const handleConfirmOrder = async () => {
//     if (!orderData) return;

//     try {
//       const formData = new FormData();

//       if (Array.isArray(orderData.cart)) {
//         orderData.cart.forEach((item: Product, index: number) => {
//           formData.append(`products[${index}]`, JSON.stringify(item));
//         });
//       } else {
//         console.error("orderData.cart is not an array:", orderData.cart);
//         return;
//       }
//       formData.append('addresses', orderData.addresses);
//       formData.append('discount', orderData.discount.toString());
//       formData.append('total', orderData.total.toString());
//       formData.append('coupon', orderData.coupon);
//       formData.append('paymentMethod', paymentMethod);

//       // Assuming your images are in the cart array
//       for (const item of orderData.cart) {
//         if (item.image) {
//           const imageBlob = await fetch(item.image).then(res => res.blob());
//           formData.append('images[]', imageBlob, `${item.name}.jpg`);
//         }
//       }

//       await axios.post("http://localhost:8080/api/orders", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       });

//       router.push('/order-success'); // Navigate to a success page after order is placed
//     } catch (error) {
//       console.error("Error placing order:", error);
//     }
//   };

//   if (!orderData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Confirm Your Order</h1>
//       {/* Display order details here */}
//       <div>
//         <label>
//           <input
//             type="radio"
//             value="Cash on Delivery"
//             checked={paymentMethod === "Cash on Delivery"}
//             onChange={() => handlePaymentMethodChange("Cash on Delivery")}
//           />
//           Cash on Delivery
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="UPI"
//             checked={paymentMethod === "UPI"}
//             onChange={() => setPaymentMethod("UPI")}
//           />
//           UPI
//         </label>
//       </div>

//       {showConfirmModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Confirm Order</h2>
//             <p>Are you sure you want to place the order with Cash on Delivery?</p>
//             <button onClick={handleConfirmOrder}>Confirm</button>
//             <button onClick={() => setShowConfirmModal(false)}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


// export default Payment;


"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

const Payment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      const parsedData = JSON.parse(decodeURIComponent(data));
      parsedData.cart = JSON.parse(parsedData.cart);
      parsedData.addresses = JSON.parse(parsedData.addresses);
      setOrderData(parsedData);

      
    }
  }, [searchParams]);
  

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    if (method === "Cash on Delivery") {
      setShowConfirmModal(true);
    }
  };

  // const handleConfirmOrder = async () => {
  //   if (!orderData || !Array.isArray(orderData.cart)) {
  //     console.error("Invalid orderData or cart is not an array:", orderData);
  //     return;
  //   }
  
  //   try {
  //     const formData = new FormData();
  
  //     orderData.cart.forEach((item: Product, index: number) => {
  //       formData.append(`products[${index}]`, JSON.stringify(item));
  //     });
  //     formData.append('addresses', JSON.stringify(orderData.addresses));
  //     formData.append('discount', orderData.discount.toString());
  //     formData.append('total', orderData.total.toString());
  //     formData.append('coupon', orderData.coupon);
  //     formData.append('paymentMethod', paymentMethod);
  
  //     for (const item of orderData.cart) {
  //       if (item.image) {
  //         const imageBlob = await fetch(item.image).then(res => res.blob());
  //         formData.append('images[]', imageBlob, `${item.name}.jpg`);
  //       }
  //     }
  
  //     await axios.post("http://localhost:8080/api/orders", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data"
  //       }
  //     });
  
  //     router.push('/order-success');
  //   } catch (error) {
  //     console.error("Error placing order:", error);
  //   }
  // };
  

  const handleConfirmOrder = async () => {
    if (!orderData || !Array.isArray(orderData.cart)) {
      console.error("Invalid orderData or cart is not an array:", orderData);
      return;
    }
  
    try {
      const formData = new FormData();
  
      formData.append('products', JSON.stringify(orderData.cart));
      formData.append('addresses', JSON.stringify(orderData.addresses));
      formData.append('discount', orderData.discount.toString());
      formData.append('total', orderData.total.toString());
      formData.append('coupon', orderData.coupon);
      formData.append('paymentMethod', paymentMethod);
  
      for (const item of orderData.cart) {
        if (item.image) {
          const imageBlob = await fetch(item.image).then(res => res.blob());
          formData.append('images[]', imageBlob, `${item.name}.jpg`);
        }
      }
  
      await axios.post("http://localhost:8080/api/orders", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
  
      router.push('/order-success');
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  


  
  if (!orderData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Confirm Your Order</h1>
      <div>
        <label>
          <input
            type="radio"
            value="Cash on Delivery"
            checked={paymentMethod === "Cash on Delivery"}
            onChange={() => handlePaymentMethodChange("Cash on Delivery")}
          />
          Cash on Delivery
        </label>
        <label>
          <input
            type="radio"
            value="UPI"
            checked={paymentMethod === "UPI"}
            onChange={() => setPaymentMethod("UPI")}
          />
          UPI
        </label>
      </div>

      {showConfirmModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Order</h2>
            <p>Are you sure you want to place the order with Cash on Delivery?</p>
            <button onClick={handleConfirmOrder}>Confirm</button>
            <button onClick={() => setShowConfirmModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
