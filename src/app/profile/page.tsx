"use client";

import React, { useState } from "react";
import {
  FaStar,
  FaCartPlus,
  FaUserCircle,
  FaFile,
  FaShoppingBag,
  FaHeart,
} from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import Image from "next/image";
import OrderList from "../Orderlist/page";
import CartPage from "../CartPage";
import MyWishlist from "../Mywishlist/page";
import axios from "axios";

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

const Profile: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("wishlist");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
  const handleSectionClick = (section: string) => {
    setActiveSection(section);
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
    // setShowAddressForm(false);
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
    // setShowAddressForm(true);
    setIsEditing(true);
};


  return (
    <div className="w-full bg-gray-100 flex justify-center px-4 mt-6">
      <div className="lg:w-[90%] md:w-[90%] w-full flex lg:flex-row md:flex-row flex-col gap-4 relative">
        {/* Sidebar Section */}
        <div className="h-max lg:w-64 md:w-64 w-full flex-none flex flex-col lg:gap-4 md:gap-4 gap-2 rounded-[5px] z-40">
          {/* User Info Section */}
          <div className="w-full p-4 bg-red-600 text-black flex gap-4 items-center rounded-[10px]">
            <FaUserCircle className="text-4xl" />
            <div className="flex flex-col">
              <span className="text-xs">Name</span>
              <span className="text-md font-semibold">User Name</span>
            </div>
          </div>

          {/* Menu Items Section */}
          <div className="w-full px-4 bg-white rounded-[10px]">
            <button
              onClick={() => handleSectionClick("address")}
              className={`w-full py-4 border-b-[1px] ${
                activeSection === "address"
                  ? "border-primary"
                  : "border-primary/20"
              } hover:text-primary flex items-center gap-4 transition ease-in duration-2000`}
            >
              <FiMapPin className="text-2xl" />
              <span className="text-md font-medium">My Address</span>
            </button>
            <button
              onClick={() => handleSectionClick("orders")}
              className={`w-full py-4 border-b-[1px] ${
                activeSection === "orders"
                  ? "border-primary"
                  : "border-primary/20"
              } hover:text-primary flex items-center gap-4 transition ease-in duration-2000`}
            >
              <FaFile className="text-2xl" />
              <span className="text-md font-medium">My Orders</span>
            </button>
            <button
              onClick={() => handleSectionClick("business")}
              className={`w-full py-4 border-b-[1px] ${
                activeSection === "business"
                  ? "border-primary"
                  : "border-primary/20"
              } hover:text-primary flex items-center gap-4 transition ease-in duration-2000`}
            >
              <FaShoppingBag className="text-2xl" />
              <span className="text-md font-medium">My Business Details</span>
            </button>
            <button
              onClick={() => handleSectionClick("wishlist")}
              className={`w-full py-4 border-b-[1px] ${
                activeSection === "wishlist"
                  ? "border-primary"
                  : "border-primary/20"
              } hover:text-primary flex items-center gap-4 transition ease-in duration-2000`}
            >
              <FaHeart className="text-2xl" />
              <span className="text-md font-medium">My Wishlist</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full grow">
          {activeSection === "wishlist" && (
            <div className="w-full bg-white p-4 rounded-[10px]">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-md">My Wishlist</span>
              </div>
              <MyWishlist />
            </div>
          )}

          {activeSection === "orders" && (
            <div className="w-full bg-white p-4 rounded-[10px]">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-md">My Orders</span>
              </div>
              <OrderList />
            </div>
          )}

          {activeSection === "address" && (
            <div className="w-full bg-white p-4 rounded-[10px]">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-md">My Address</span>
              </div>
              {/* Additional content for address can go here */}
              <form
                onSubmit={handleAddressFormSubmit}
                className="mt-4 p-4 border rounded"
              >
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={newAddress.name}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, name: e.target.value })
                    }
                    required
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Email Id"
                    value={newAddress.email}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, email: e.target.value })
                    }
                    required
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Room"
                    value={newAddress.room}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, room: e.target.value })
                    }
                    required
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={newAddress.address}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, address: e.target.value })
                    }
                    required
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                    required
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                    required
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    value={newAddress.country}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, country: e.target.value })
                    }
                    required
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="PIN"
                    value={newAddress.pin}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, pin: e.target.value })
                    }
                    required
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    value={newAddress.phone}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, phone: e.target.value })
                    }
                    required
                    className="border p-2 rounded"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                  >
                    {isEditing ? "Update Address" : "Add Address"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeSection === "business" && (
            <div className="w-full bg-white p-4 rounded-[10px]">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-md">
                  My Business Details
                </span>
              </div>
              {/* Additional content for business details can go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
