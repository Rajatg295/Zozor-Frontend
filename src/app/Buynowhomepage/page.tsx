
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from "axios";
import { FaStar } from "react-icons/fa";

interface Address {
    _id?: string;
    name: string;
    email: string,
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
    const [requestGST, setRequestGST] = useState(false);
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
        email: '',
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
        setSelectedAddress(selected || null);
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
            email: '',
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
        <div className="w-full flex justify-center px-4 mt-6 bg-gray-100">
            <div className="lg:w-[90%] md:w-[90%] w-full flex flex-col gap-4 relative bg-white-100 p-4 rounded-[5px]">
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


                    <div className="bg-white p-4 rounded-[10px] shadow-md max-h-60 overflow-y-auto">
                        <div className="flex flex-col gap-2">
                            {addresses.map((address) => (
                                <div
                                    key={address._id}
                                    className={`mb-4 p-4 rounded-[10px] border border-gray-200 ${selectedAddress?._id === address._id ? 'bg-gray-100' : ''}`}
                                >
                                    <div className="mb-2">
                                        <span className="font-semibold">{address.name}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span>{address.room} | {address.address}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span>{address.city}, {address.state}, {address.country} - {address.pin}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span>Mobile Number: {address.phone}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span>Email Id: {address.email}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <button
                                            onClick={() => handleEditAddress(address)}
                                            className="py-2 px-3 rounded-[5px] bg-red-200 font-semibold text-red-500"
                                        >
                                            CHANGE DELIVERY ADDRESS
                                        </button>
                                        <button
                                            onClick={() => setSelectedAddress(address)}
                                            className="py-2 px-3 rounded-[5px] bg-blue-500 text-white font-semibold"
                                        >
                                            Select
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => { setShowAddressForm(true); setIsEditing(false); }}
                                className="py-3 px-5 rounded-[10px] bg-red-200 font-semibold text-red-500 transition ease-in duration-200"
                            >
                                <i className="fa fa-plus mr-2"></i>
                                ADD NEW DELIVERY ADDRESS
                            </button>
                        </div>
                    </div>





                    {showAddressForm && (
                        <form onSubmit={handleAddressFormSubmit} className="w-full">
                            <div className="grid grid-cols-2 gap-4 w-full mt-4 p-4 rounded-[5px]">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newAddress.name}
                                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                    required
                                    className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
                                />
                                <input
                                    type="text"
                                    placeholder="Email Id"
                                    value={newAddress.email}
                                    onChange={(e) => setNewAddress({ ...newAddress, email: e.target.value })}
                                    required
                                    className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
                                />
                                <input
                                    type="text"
                                    placeholder="Room"
                                    value={newAddress.room}
                                    onChange={(e) => setNewAddress({ ...newAddress, room: e.target.value })}
                                    required
                                    className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
                                />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    value={newAddress.address}
                                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                    required
                                    className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
                                />
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={newAddress.city}
                                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                    required
                                    className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
                                />
                                <input
                                    type="text"
                                    placeholder="State"
                                    value={newAddress.state}
                                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                    required
                                    className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
                                />
                                <input
                                    type="text"
                                    placeholder="Country"
                                    value={newAddress.country}
                                    onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                                    required
                                    className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
                                />
                                <input
                                    type="text"
                                    placeholder="PIN"
                                    value={newAddress.pin}
                                    onChange={(e) => setNewAddress({ ...newAddress, pin: e.target.value })}
                                    required
                                    className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
                                />
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    value={newAddress.phone}
                                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                    required
                                    className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
                                />
                            </div>
                            <div className="flex justify-end mt-4 p-4 gap-2">
                                <button type="submit" className="py-3 px-5 rounded-[10px] bg-blue-500 font-semibold text-white border-[1px] border-primary hover:text-primary transition ease-in duration-2000">
                                    {isEditing ? "UPDATE ADDRESS" : "SAVE ADDRESS"}
                                </button>
                                <button onClick={() => setShowAddressForm(false)} type="button" className="py-3 px-5 rounded-[10px] bg-gray-500 font-semibold text-white border-[1px] border-primary hover:text-primary transition ease-in duration-2000">
                                    DISCARD
                                </button>
                            </div>
                        </form>
                    )}

                    <h2 className="mt-5 text-lg font-semibold">Product Summary</h2>


                    <div className="mt-5 bg-white flex flex-col md:flex-row items-center gap-4 rounded-[7px]">
                        {/* Left Column: Product Image and Details */}
                        <div className="mx-5 flex md:w-1/3 items-center">
                            <div className="flex-shrink-0">
                                <Image src={product.image} alt={product.name} width={150} height={150} />
                            </div>
                            <div className="ml-4">
                                <h2 className="text-lg font-semibold">{product.name}</h2>
                                <p className="text-gray-500 mt-1">₹ {product.price.toLocaleString()}</p>
                                <p className="text-gray-500 mt-1">{product.description}</p>
                            </div>
                        </div>

                        {/* Center Column: Quantity Buttons */}
                        <div className="flex flex-col items-center md:w-1/3">
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
                            </div>
                        </div>

                        {/* Right Column: Price Details */}
                        <div className="flex flex-col items-center md:w-1/3">
                            <div className="flex flex-col items-end">
                                <p className="text-gray-500 line-through">₹ {product.originalPrice.toLocaleString()}</p>
                                <p className="text-gray-500 font-semibold mt-1">₹ {product.price.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>






                </div>

                <div className="flex w-full h-[70px] rounded-[10px] bg-white justify-end">
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
                    <div className="flex justify-between items-center py-4 px-2 border-b-[1px] border-primary/30">
                        <span className="font-semibold text-md">Payment Summary</span>
                    </div>
                    <div className="flex flex-col py-4 border-b-[1px] border-primary/30">

                        <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
                            <span>Subtotal</span>
                            <span>₹ {totalPrice.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
                            <span>GST (18%)</span>
                            <span>₹ {gst.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
                            <span>Shipping</span>
                            <span>₹ {shipping.toLocaleString()}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
                                <span>Discount</span>
                                <span>-₹ {discount.toLocaleString()}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-md font-semibold px-2 py-3">
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
                                    className="p-2 border-[1px] border-black/30 rounded-[5px] text-green-500"
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
        </div>
    );
};
export default Buynowhomepage;

