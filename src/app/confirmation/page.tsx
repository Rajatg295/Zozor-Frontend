"use client"
import React, { useState } from "react";
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
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const cart = JSON.parse(decodeURIComponent(searchParams.get("cart") || "[]"));
  const addresses = JSON.parse(decodeURIComponent(searchParams.get("address") || "[]"));
  const discount = Number(searchParams.get("discount"));
  const total = Number(searchParams.get("total"));
  const coupon = searchParams.get("coupon") || "";

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    if (method === "Cash on Delivery") {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmOrder = async () => {
    try {
      const formData = new FormData();
      
      cart.forEach((item: Product) => {
        formData.append('products[]', JSON.stringify(item));
      });

      formData.append('addresses', JSON.stringify(addresses));
      formData.append('discount', discount.toString());
      formData.append('total', total.toString());
      formData.append('coupon', coupon);
      formData.append('paymentMethod', "Cash on Delivery");
      

      for (const item of cart) {
        if (item.image) {
          const imageBlob = await fetch(item.image).then(res => res.blob());
          formData.append('images[]', imageBlob, `${item.name}.jpg`);
        }
      }
      
console.log(addresses, discount,total,coupon,paymentMethod);

      await axios.post("http://localhost:8080/api/orders", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      router.push('/confirmation');
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Payment</h1>
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
