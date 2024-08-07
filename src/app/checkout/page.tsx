"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaPlus } from "react-icons/fa";

interface Address {
  _id?: string;
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

const Checkout = () => {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editAddressId, setEditAddressId] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const [coupon, setCoupon] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [couponCode, setCouponCode] = useState<string>("");
  const [requestGST, setRequestGST] = useState(false);
  const [newAddress, setNewAddress] = useState<Address>({
    name: "",
    email: "",
    room: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pin: "",
    phone: "",
  });

  const coupons: { [key: string]: number } = {
    DISCOUNT100: 100,
    DISCOUNT150: 150,
  };

  const handleApplyCoupon = () => {
    if (coupons[coupon]) {
      setDiscount(coupons[coupon]);
    } else {
      alert("Invalid coupon code");
      setDiscount(0);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/address");
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  useEffect(() => {
    const cartData = searchParams.get("cart");
    const couponData = searchParams.get("coupon");
    if (cartData) {
      console.log("Cart data received: ", cartData);
      setCart(JSON.parse(decodeURIComponent(cartData)));
      if (couponData && coupons[couponData]) {
        setCoupon(couponData);
        setDiscount(coupons[couponData]);
      }
    } else {
      console.log("No cart data found in searchParams");
    }
  }, [searchParams]);

  useEffect(() => {
    const totalPrice = getTotalPriceWithoutExtras();
    setShipping(totalPrice * 0.02);
  }, [cart]);

  const getTotalPriceWithoutExtras = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editAddressId) {
        await axios.put(
          `http://localhost:8080/address/${editAddressId}`,
          newAddress,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert("Address updated successfully!");
      } else {
        await axios.post("http://localhost:8080/address", newAddress, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        alert("Address saved successfully!");
      }

      setNewAddress({
        name: "",
        email: "",
        room: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pin: "",
        phone: "",
      });
      setEditAddressId(null);
      setIsFormVisible(false);
      fetchAddresses();
    } catch (error: any) {
      console.error("Error saving address:", error.message);
    }
  };

  const handleEdit = (address: Address) => {
    setNewAddress(address);
    setEditAddressId(address._id || null);
    setIsFormVisible(true);
  };

  const handleAddNewAddress = () => {
    setNewAddress({
      name: "",
      email: "",
      room: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pin: "",
      phone: "",
    });
    setEditAddressId(null);
    setIsFormVisible(true);
  };

  const handleDiscard = () => {
    setNewAddress({
      name: "",
      email: "",
      room: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pin: "",
      phone: "",
    });
    setEditAddressId(null);
    setIsFormVisible(false);
  };

  const handleCartQuantityChange = (
    productId: string,
    action: "increase" | "decrease"
  ) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        return {
          ...item,
          quantity:
            action === "increase"
              ? item.quantity + 1
              : Math.max(item.quantity - 1, 1),
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleCartRemove = (productId: string) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
  };

  const getTotalPrice = () => {
    const totalPrice = getTotalPriceWithoutExtras();
    const gstRate = 0.18;
    const gstAmount = totalPrice * gstRate;
    const totalWithGst = totalPrice + gstAmount;
    const totalWithShipping = totalWithGst + shipping;
    const totalWithDiscount = totalWithShipping - discount;
    return {
      totalPrice,
      gstAmount,
      totalWithGst,
      totalWithShipping,
      totalWithDiscount,
    };
  };

  const {
    totalPrice,
    gstAmount,
    totalWithGst,
    totalWithShipping,
    totalWithDiscount,
  } = getTotalPrice();

  // const handlePlaceOrder = () => {
  //   const cartData = JSON.stringify(cart);
  //   const addressData = JSON.stringify(addresses);
  //   const discount = discountValue;
  //   const total = totalValue;
  //   const coupon = couponCode;

  //   const queryString = `?data=${encodeURIComponent(JSON.stringify({
  //     cart: cartData,
  //     addresses: addressData,
  //     discount,
  //     total,
  //     coupon
  //   }))}`;

  //   router.push(`/confirmation${queryString}`);
  // };

  // new

  const handlePlaceOrder = () => {
    const cartData = JSON.stringify(cart);
    const addressData = JSON.stringify(addresses);
    const totalData = getTotalPrice();

    const queryString = `?data=${encodeURIComponent(
      JSON.stringify({
        cart: cartData,
        addresses: addressData,
        discount: discount,
        total: totalData.totalWithDiscount,
        coupon: coupon,
      })
    )}`;

    router.push(`/confirmation${queryString}`);
  };

  return (
    <div className="w-full flex justify-center px-4 mt-6 bg-gray-100">
      <div className="lg:w-[90%] bg-gray-100 md:w-[90%] w-full flex flex-col gap-4 relative bg-white-100 p-4 rounded-[5px]">
        <div className="mt-4">
          <div className="w-full bg-white h-[70px] rounded-[10px] flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="requestGST"
              checked={requestGST}
              onChange={() => setRequestGST(!requestGST)}
              className="ml-5 cursor-pointer"
            />
            <label htmlFor="requestGST" className="text-md font-medium">
              Get GST Invoice
            </label>
          </div>

          <h2 className="text-lg font-bold mb-4 mt-5">Delivery Address</h2>
          {/* <div className="bg-white p-4 rounded-[10px] shadow-md">
            {addresses.length > 0 ? (
              addresses.map((address, index) => (
                <div key={index} className="mb-4">
                  <div className="mb-2">
                    <span className="font-semibold">{address.name}</span>
                  </div>
                  <div className="mb-2">
                    <span>
                      {address.room} | {address.address}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span>
                      {address.city}, {address.state}, {address.country} -{" "}
                      {address.pin}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span>Mobile Number: {address.phone}</span>
                  </div>
                  <div className="mb-2">
                    <span>Email Id: {address.email}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() => handleEdit(address)}
                      className="py-1 px-3 rounded-[5px] bg-red-200 font-semibold text-red-500"
                    >
                      Change Address
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No addresses available.</p>
            )}
          </div> */}
          <div className="bg-white p-4 rounded-[10px] shadow-md max-h-60 overflow-y-auto">
            {addresses.length > 0 ? (
              addresses.map((address, index) => (
                <div key={index} className="mb-4">
                  <div className="mb-2">
                    <span className="font-semibold">{address.name}</span>
                  </div>
                  <div className="mb-2">
                    <span>
                      {address.room} | {address.address}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span>
                      {address.city}, {address.state}, {address.country} -{" "}
                      {address.pin}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span>Mobile Number: {address.phone}</span>
                  </div>
                  <div className="mb-2">
                    <span>Email Id: {address.email}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() => handleEdit(address)}
                      className="py-2 px-3 rounded-[5px] mt-3 bg-red-200 font-semibold text-red-500"
                    >
                      CHANGE DELIVERY ADDRESS
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No addresses available.</p>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleAddNewAddress}
              className="py-3 px-5 rounded-[10px] bg-red-200 font-semibold text-red-500 border-[1px] border-primary hover:text-primary transition ease-in duration-200"
            >
              <i className="fa fa-plus mr-2 text-red-500"></i>
              ADD NEW DELIVERY ADDRESS
            </button>
          </div>
        </div>

        {isFormVisible && (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-2 gap-4 w-full mt-4 p-4 rounded-[5px]">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newAddress.name}
                onChange={handleChange}
                className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
              />
              <input
                type="text"
                name="email"
                placeholder="Email Id"
                value={newAddress.email}
                onChange={handleChange}
                className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
              />
              <input
                type="text"
                name="room"
                placeholder="Room Number"
                value={newAddress.room}
                onChange={handleChange}
                className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={newAddress.address}
                onChange={handleChange}
                className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={newAddress.city}
                onChange={handleChange}
                className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={newAddress.state}
                onChange={handleChange}
                className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={newAddress.country}
                onChange={handleChange}
                className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
              />
              <input
                type="number"
                name="pin"
                placeholder="Pin Code"
                value={newAddress.pin}
                onChange={handleChange}
                className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
              />
              <input
                type="number"
                name="phone"
                placeholder="Phone"
                value={newAddress.phone}
                onChange={handleChange}
                className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
              />
            </div>
            <div className="flex justify-end mt-4 p-4 gap-2">
              <button
                type="submit"
                className="py-3 px-5 rounded-[10px] bg-blue-500 font-semibold text-white border-[1px] border-primary hover:text-primary transition ease-in duration-2000"
              >
                {editAddressId ? "UPDATE ADDRESS" : "SAVE ADDRESS"}
              </button>
              <button
                type="button"
                onClick={handleDiscard}
                className="py-3 px-5 rounded-[10px] bg-red-500 font-semibold text-white border-[1px] border-primary hover:text-primary transition ease-in duration-2000"
              >
                DISCARD
              </button>
            </div>
          </form>
        )}
        <h2 className="text-lg font-semibold">Product Summary</h2>
        <div className="bg-white rounded-[10px] shadow-md h-full">
          <div className="mb-8 mt-5 ml-9">
            {cart.length > 0 ? (
              cart.map((product) => (
                <div key={product._id} className="flex items-center mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                  />
                  <div className="flex-1 ml-4 flex items-center">
                    <h2 className="text-lg font-semibold flex-1">
                      {product.name}
                    </h2>
                    <div className="flex-1 justify-center items-center">
                      <button
                        onClick={() =>
                          handleCartQuantityChange(product._id, "decrease")
                        }
                        className="py-1 px-2 rounded-[5px] bg-blue-100 border border-blue-500 text-black"
                      >
                        -
                      </button>
                      <button
                        onClick={() => handleCartRemove(product._id)}
                        className="ml-2 py-1 px-2 rounded-[5px] bg-red-500 text-white"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() =>
                          handleCartQuantityChange(product._id, "increase")
                        }
                        className="py-1 px-2 ml-2 rounded-[5px] border border-blue-500 bg-blue-100 text-black"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-lg">
                      <p className="mx-2 ml-9">
                        ₹{product.price} x {product.quantity}
                      </p>
                    </div>
                    <div></div>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in the cart.</p>
            )}
          </div>

          <div className="w-full flex rounded-[10px] justify-center">
            <div className="bg-green-100 rounded-[7px] flex justify-between px-4 py-1 w-full mx-5">
              <span className="text-xs">
                Spend 1,000 or more{" "}
                <span className="text-green-800 text-sm">
                  get 5,000 OFF with online payment
                </span>
              </span>
              <button className="w-max rounded-[10px] text-sm font-semibold text-blue-500 px-2">
                <i className="fa fa-plus mr-2"></i> Add Products
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full h-[70px] rounded-[10px] bg-gray-100 justify-end">
          <button
            onClick={handlePlaceOrder}
            className="bg-blue-500 text-white mt-4 py-2 px-4 h-[40px] rounded-md w-half mr-2 max-w-xs"
          >
            Place Order ₹ {totalWithDiscount.toLocaleString()}
          </button>
        </div>
      </div>

      <div className="h-max lg:w-96 md:w-96 w-full flex-none flex flex-col mt-3 bg-gray-100 rounded-[5px] z-40">
        <div className="border-[1px] border-primary/30 rounded-[10px] bg-white">
          <div className="bg-green/10 text-green p-2">
            <span className="font-semibold text-sm">
              Save instantly ₹ 150.00 with online payment
            </span>
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
                className="py-2 px-4 rounded-[5px] bg-green-500 text-white font-semibold text-sm"
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
      </div>
    </div>
  );
};

export default Checkout;
