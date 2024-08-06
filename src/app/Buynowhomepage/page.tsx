
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from "axios";
import { FaStar } from "react-icons/fa";

interface Address {
    _id?: string;
    name: string;
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

const Buynowhomepage = () => {
    const router = useRouter();

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [coupon, setCoupon] = useState<string>("");
    const [discount, setDiscount] = useState<number>(0);
    const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newAddress, setNewAddress] = useState<Address>({
        name: "",
        room: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pin: "",
        phone: "",
    });
 
    // const fetchAddresses = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:8080/address");
    //         setAddresses(response.data);
    //     } catch (error) {
    //         console.error("Error fetching addresses:", error);
    //     }
    // };

    // useEffect(() => {
    //     fetchAddresses();
    // }, []);



    useEffect(() => {
        const fetchAddresses = async () => {
          try {
            const response = await axios.get('http://localhost:8080/address');
            setAddresses(response.data);
            if (response.data.length > 0) {
              setSelectedAddress(response.data[0]);
            }
          } catch (error) {
            console.error('Error fetching addresses:', error);
          }
        };
    
        fetchAddresses();
      }, []);



      const handleAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = addresses.find((address) => address._id === event.target.value);
        setSelectedAddress(selected || null); // Handle possible undefined case
      };



    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const productData = query.get('product');
        if (productData) {
            setProduct(JSON.parse(decodeURIComponent(productData)));
        }
    }, []);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
    };

    const handleRemoveProduct = () => {
        setProduct(null);
    };

    const coupons: { [key: string]: number } = {
        "DISCOUNT100": 100,
        "DISCOUNT150": 150,
    };

    const handleApplyCoupon = () => {
        if (coupons[coupon]) {
            setDiscount(coupons[coupon]);
        } else {
            alert("Invalid coupon code");
            setDiscount(0);
        }
    };

    const handleAddressFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            const response = await axios.put(`http://localhost:8080/address/${newAddress._id}`, newAddress);
            setAddresses(addresses.map(addr => addr._id === response.data._id ? response.data : addr));
        } else {
            const response = await axios.post("http://localhost:8080/address", newAddress);
            setAddresses([...addresses, response.data]);
        }
        setShowAddressForm(false);
        setIsEditing(false);
        setNewAddress({
            name: "",
            room: "",
            address: "",
            city: "",
            state: "",
            country: "",
            pin: "",
            phone: "",
        });
    };

    const handleEditAddress = (address: Address) => {
        setNewAddress(address);
        setShowAddressForm(true);
        setIsEditing(true);
    };

    const totalPrice = (product.price * quantity) - discount;
    const gst = totalPrice * 0.18;
    const shipping = 50;
    const finalPrice = totalPrice + gst + shipping;
    const totalWithDiscount = totalPrice - discount;


    // const handlePlaceOrder = () => {
    //     const orderData = {
    //       cart: [product],
    //       addresses: selectedAddress ? [selectedAddress] : [],
    //       discount,
    //       total: finalPrice,
    //       coupon
    //     };
    
    //     const encodedData = encodeURIComponent(JSON.stringify(orderData));
    //     router.push(`/BUYNOWconfirmation?data=${encodedData}`);
    //   };






    const handlePlaceOrder = () => {
        if (selectedAddress) {
          console.log('Proceeding with address:', selectedAddress);
          const orderData = {
            cart: [product],
            addresses: [selectedAddress],
            discount,
            total: finalPrice,
            coupon
          };
    
          const encodedData = encodeURIComponent(JSON.stringify(orderData));
          router.push(`/BUYNOWconfirmation?data=${encodedData}`);
        } else {
          console.log('No address selected.');
        }
      };
      
      
      
      
      
      
      
      return (
        <div className="w-full flex justify-center px-4 mt-6 bg-white">
            <div className="lg:w-[65%] md:w-[70%] w-full flex flex-col gap-4 relative bg-white-100 p-4 rounded-[5px] shadow-lg">
                <h2 className="text-lg font-bold mb-4">Checkout</h2>

 

                <div className="mt-4">
                    <h3 className="text-md font-bold mb-2">Delivery Addresses</h3>
                    <div className="flex flex-col gap-2">
                        {addresses.map((address) => (
                            <div
              key={address._id}
              className={`border p-2 rounded flex justify-between items-center ${selectedAddress?._id === address._id ? 'bg-gray-100' : ''}`}
            >                                <div>
                                    <p>{address.name}</p>
                                    <p>{address.room}, {address.address}</p>
                                    <p>{address.city}, {address.state}, {address.country}, {address.pin}</p>
                                    <p>{address.phone}</p>
                                </div>
                                <div className="flex gap-2">
                                <button
                  onClick={() => setSelectedAddress(address)}
                  className={`py-1 px-4 rounded hover:bg-blue-600 ${selectedAddress?._id === address._id ? 'bg-blue-700' : 'bg-blue-500'} text-white`}
                >                                        Select
                                    </button>
                                    <button onClick={() => handleEditAddress(address)} className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => { setShowAddressForm(true); setIsEditing(false); }} className="bg-green-500 text-white py-1 px-4 mt-2 rounded hover:bg-green-600">
                        Add New Address
                    </button>
                    {showAddressForm && (
                        <form onSubmit={handleAddressFormSubmit} className="mt-4 p-4 border rounded">
                            <div className="flex flex-col gap-2">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newAddress.name}
                                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                    required
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Room"
                                    value={newAddress.room}
                                    onChange={(e) => setNewAddress({ ...newAddress, room: e.target.value })}
                                    required
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    value={newAddress.address}
                                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                    required
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={newAddress.city}
                                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                    required
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="State"
                                    value={newAddress.state}
                                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                    required
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Country"
                                    value={newAddress.country}
                                    onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                                    required
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="PIN"
                                    value={newAddress.pin}
                                    onChange={(e) => setNewAddress({ ...newAddress, pin: e.target.value })}
                                    required
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    value={newAddress.phone}
                                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                    required
                                    className="border p-2 rounded"
                                />
                                <button type="submit" className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">
                                    {isEditing ? "Update Address" : "Add Address"}
                                </button>
                                <button onClick={() => setShowAddressForm(false)} type="button" className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4">
                    <Image src={product.image} alt={product.name} width={150} height={150} />
                    <div>
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className="text-gray-500">₹ {product.price.toLocaleString()}</p>
                        <p className="text-gray-500">{product.description}</p>
                        <div className="flex mt-2 gap-2">
                            <button className="bg-green-500 text-white font-bold text-xs px-1 rounded-[3px] flex items-center gap-1">
                                {product.rating} <FaStar className="text-[10px]" />
                            </button>
                            <span className="text-[13px] text-black/70">({product.reviewCount} Reviews)</span>
                        </div>

                        <div className="flex mt-1 gap-2">
                            <span className="text-[14px] font-semibold text-black/50">By: {product.brand}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-[14px] font-semibold text-black/50 line-through">₹ {product.originalPrice.toLocaleString()}</span>
                                <span className="text-[16px] font-bold text-green">{product.discountPercentage}% OFF</span>





                            </div>


                        </div>
                        <div className="flex items-center">
                            <button
                                className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded"
                                onClick={() => handleQuantityChange(quantity - 1)}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span className="mx-2 bg-blue-200 w-8 h-8 flex items-center justify-center rounded">
                                {quantity}
                            </span>
                            <button
                                className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded"
                                onClick={() => handleQuantityChange(quantity + 1)}
                            >
                                +
                            </button>
                            <button
                                onClick={handleRemoveProduct}
                                className="ml-4 bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>

                        <button onClick={handlePlaceOrder} className="ml-[600px] bg-blue-500 text-white py-1 px-4 mt-2 rounded hover:bg-blue-600">
                            Place Order
                        </button>
                    </div>
                </div>


</div>

            <div className="mt-4 ml-5">
                <h3 className="text-md font-bold mb-2">Order Summary</h3>
                <div className="border p-2 rounded">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹ {totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>GST (18%)</span>
                        <span>₹ {gst.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>₹ {shipping.toLocaleString()}

                        </span>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-between">
                            <span>Discount</span>
                            <span>-₹ {discount.toLocaleString()}</span>
                        </div>
                    )}
                    <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>₹ {finalPrice.toLocaleString()}</span>
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
                        <div className="mt-6 ml-9">
                            <h2 className="text-lg font-semibold">Total ₹ {finalPrice.toLocaleString()}</h2>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Buynowhomepage;

