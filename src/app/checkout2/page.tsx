// "use client"
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
// }

// const CheckoutPage2 = () => {
//   const [cart, setCart] = useState<Product[]>([]);
//   const [coupon, setCoupon] = useState<string>("");
//   const router = useRouter();

//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search);
//     const cartData = searchParams.get("cart");
//     const couponData = searchParams.get("coupon");

//     if (cartData) {
//       const parsedCart = JSON.parse(decodeURIComponent(cartData));
//       setCart(parsedCart);
//     }

//     if (couponData) {
//       setCoupon(couponData);
//     }
//   }, []);

//   return (
//     <div>
//       <h2>Product Details Page</h2>
//       {cart.map((product) => (
//         <div key={product._id}>
//           <Image src={product.image} alt={product.name} width={50} height={50} />
//           <p>{product.name}</p>
//           <p>Price: ₹{product.price}</p>
//           <p>Quantity: {product.quantity}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CheckoutPage2;
