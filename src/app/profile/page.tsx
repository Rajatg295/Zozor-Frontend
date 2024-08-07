"use client";

import React, { useState } from "react";

import {
  FaStar,
  FaCartPlus,
  FaUserCircle,
  FaFile,
  FaShoppingBag,
  FaHeart,
  FaPlus,
} from "react-icons/fa";

import { FiMapPin } from "react-icons/fi";
import Image from "next/image";
import OrderList from "../Orderlist/page";
import CartPage from "../CartPage";
import MyWishlist from "../Mywishlist/page";
import axios from "axios";
import BusinessDetailsForm from "../BusinessDetailsForm/page";
import AddressForm from "../AddressForm/page";

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
  const [activeSection, setActiveSection] = useState<string>("profile");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [breadcrumb, setBreadcrumb] = useState<string>("Profile");

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
  const handleSectionClick = (section: string, breadcrumbText: string) => {
    setActiveSection(section);
    setBreadcrumb(`Profile > ${breadcrumbText}`);
  };

  const handleAddressFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      const response = await axios.put(
        `http://localhost:8080/address/${newAddress._id}`,
        newAddress
      );
      setAddresses(
        addresses.map((addr) =>
          addr._id === response.data._id ? response.data : addr
        )
      );
    } else {
      const response = await axios.post(
        "http://localhost:8080/address",
        newAddress
      );
      setAddresses([...addresses, response.data]);
    }
    setIsEditing(false);
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
  };

  const handleEditAddress = (address: Address) => {
    setNewAddress(address);
    setIsEditing(true);
  };

  const [formData, setFormData] = useState({
    gstNumber: "",
    businessName: "",
    businessPhone: "",
    businessEmail: "",
    address: "",
    pinCode: "",
    city: "",
    state: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBusinessDetailsFormSubmit: React.FormEventHandler<
    HTMLFormElement
  > = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="w-full bg-gray-100 flex justify-center px-4 mt-6">
      <div className="lg:w-[90%] md:w-[90%] w-full flex lg:flex-row md:flex-row flex-col gap-4 relative mt-9 mb-9">
        {/* Sidebar Section */}
        <div className="h-max lg:w-64 md:w-64 w-full flex-none flex flex-col lg:gap-4 md:gap-4 gap-2 rounded-[5px] z-40">
          {/* Breadcrumb */}
          <div className="w-full px-4 bg-gray-100 rounded-[10px]">
            <span className="text-md font-medium">{breadcrumb}</span>
          </div>
          {/* User Info Section */}

          <div className="w-full p-4 bg-red-600 text-white flex gap-4 items-center rounded-[10px]">
            <FaUserCircle className="text-4xl" />
            <div className="flex flex-col">
              <span className="text-xs">Name</span>
              <button
                onClick={() => handleSectionClick("profile", "Profile")}
                className={`w-full py-4 ${
                  activeSection === "profile" ? "text-red-200" : "text-black"
                } hover:text-red-200 flex items-center gap-4 transition ease-in duration-2000`}
              >
                <span className="text-md text-white font-semibold">
                  User Name
                </span>
              </button>
            </div>
          </div>

          {/* Menu Items Section */}
          <div className="w-full px-4 bg-white rounded-[10px]">
            <button
              onClick={() => handleSectionClick("address", "My Address")}
              className={`w-full py-4 border-b-[1px] ${
                activeSection === "address" ? "text-red-500" : "text-black"
              } hover:text-red-500 flex items-center gap-4 transition ease-in duration-2000`}
            >
              <FiMapPin className="text-2xl" />
              <span className="text-md font-medium">My Address</span>
            </button>
            <button
              onClick={() => handleSectionClick("orders", "My Orders")}
              className={`w-full py-4 border-b-[1px] ${
                activeSection === "orders" ? "text-red-500" : "text-black"
              } hover:text-red-500 flex items-center gap-4 transition ease-in duration-2000`}
            >
              <FaFile className="text-2xl" />
              <span className="text-md font-medium">My Orders</span>
            </button>
            <button
              onClick={() =>
                handleSectionClick("business", "My Business Details")
              }
              className={`w-full py-4 border-b-[1px] ${
                activeSection === "business" ? "text-red-500" : "text-black"
              } hover:text-red-500 flex items-center gap-4 transition ease-in duration-2000`}
            >
              <FaShoppingBag className="text-2xl" />
              <span className="text-md font-medium">My Business Details</span>
            </button>
            <button
              onClick={() => handleSectionClick("wishlist", "My Wishlist")}
              className={`w-full py-4 ${
                activeSection === "wishlist" ? "text-red-500" : "text-black"
              } hover:text-red-500 flex items-center gap-4 transition ease-in duration-2000`}
            >
              <FaHeart className="text-2xl" />
              <span className="text-md font-medium">My Wishlist</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full mt-9 grow">
          {activeSection === "profile" && (
            <div className="w-full bg-white p-4 rounded-[10px]">
              <div className="flex flex-col gap-4">
                <span className="text-xl font-semibold">My Profile</span>
                <div className="flex gap-4 items-center">
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={newAddress.phone}
                    disabled
                    className="border border-gray-300 p-2 rounded w-half bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-md font-medium">
                      Delivery Address
                    </span>
                    <button className="bg-red-200 text-red-600 py-1 px-2 rounded flex items-center gap-1">
                      <FaPlus />
                      <span>Add New Delivery Address</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-md font-medium">Billing Address</span>
                    <button className="bg-red-200 text-red-600 py-1 px-2 rounded flex items-center gap-1">
                      <FaPlus />
                      <span>Add New Billing Address</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => alert("Logged Out")}
                    className="bg-red-600 text-white py-2 px-4 rounded"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}

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
              <AddressForm
                newAddress={newAddress}
                setNewAddress={setNewAddress}
                handleAddressFormSubmit={handleAddressFormSubmit}
                isEditing={isEditing}
              />
            </div>
          )}

          {activeSection === "business" && (
            <div className="w-full bg-white p-4 rounded-[10px]">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-md">
                  My Business Details
                </span>
              </div>
              <BusinessDetailsForm
                formData={formData}
                handleChange={handleChange}
                handleBusinessDetailsFormSubmit={
                  handleBusinessDetailsFormSubmit
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
