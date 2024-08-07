import React from 'react';
import Image from 'next/image';
import { FaHome, FaUser, FaSearch, FaBook, FaShoppingCart, FaComment, FaEnvelope, FaWallet, FaTruck, FaCreditCard, FaShieldAlt, FaHeadphones } from 'react-icons/fa';
import { FaWhatsapp, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer>
      {/* Mobile Footer */}
      <div className="w-full h-16 border-t-[1px] border-primary bg-white z-40 rounded-t-[10px] p-2 fixed bottom-0 left-0 lg:hidden md:hidden flex">
        <div className="w-full h-full flex justify-between">
          <a href="#" className="flex flex-col items-center justify-center p-4 text-primary">
            <FaHome className="text-xl" />
            <span className="text-xs font-semibold">Home</span>
          </a>
          <a href="#" className="flex flex-col items-center justify-center p-4">
            <FaUser className="text-xl" />
            <span className="text-xs font-semibold">Profile</span>
          </a>
          <a href="#" className="flex flex-col items-center justify-center py-4 px-3 border-[1px] border-black rounded-full">
            <FaSearch className="text-xl" />
          </a>
          <a href="#" className="flex flex-col items-center justify-center p-4">
            <FaBook className="text-xl" />
            <span className="text-xs font-semibold">Orders</span>
          </a>
          <a href="#" className="flex flex-col items-center justify-center p-4">
            <FaShoppingCart className="text-xl" />
            <span className="text-xs font-semibold">My Cart</span>
          </a>
        </div>
      </div>

      {/* Chat Button */}
      <div className="w-max h-max flex flex-col items-center fixed right-6 z-40 bottom-28 hover:scale-110">
        <span className="font-semibold text-sm">Chat Now !</span>
        <button className="h-10 w-10 rounded-full flex items-center justify-center bg-green-600 text-white border-[1px] border-green mt-2">
          <FaComment className="text-lg" />
        </button>
      </div>

      {/* Footer Content */}
      <div className="w-full flex justify-center px-4 mt-4 shadow-lg">
        <div className="lg:w-[90%] md:w-[90%] w-full bg-white p-4 rounded-[5px] relative">
          <div className="w-full grid lg:grid-cols-5 gap-2 lg:border-b-[1px] border-primary/30">
            <div className="shadow-lg w-full lg:p-6 flex flex-col lg:border-r-[1px] border-primary/30">
              <FaWallet className="text-2xl text-primary" />
              <span className="font-semibold text-lg mt-4">Great Value</span>
              <span className="text-sm text-lightText">
                Most <span className="font-bold">popular brands</span> with the widest range of selection <span className="font-bold">at best prices.</span>
              </span>
            </div>
            <div className="shadow-lg w-full lg:p-6 flex flex-col lg:border-r-[1px] border-primary/30">
              <FaTruck className="text-2xl text-primary" />
              <span className="font-semibold text-lg mt-4">Nationwide Delivery</span>
              <span className="text-sm text-lightText">Over 20,000 pincodes <span className="font-bold">serviceable across India.</span></span>
            </div>
            <div className="shadow-lg w-full lg:p-6 flex flex-col lg:border-r-[1px] border-primary/30">
              <FaCreditCard className="text-2xl text-primary" />
              <span className="font-semibold text-lg mt-4">Secure Payment</span>
              <span className="text-sm text-lightText">Partnered with India&apos;s <span className="font-bold">most popular and secure</span> payment solution.</span>
            </div>
            <div className="shadow-lg w-full lg:p-6 flex flex-col lg:border-r-[1px] border-primary/30">
              <FaShieldAlt className="text-2xl text-primary" />
              <span className="font-semibold text-lg mt-4">Buyer Protection</span>
              <span className="text-sm text-lightText">Committed to buyer interests to provide a smooth shopping experience.</span>
            </div>
            <div className="shadow-lg w-full lg:p-6 flex flex-col border-primary/30">
              <FaHeadphones className="text-2xl text-primary" />
              <span className="font-semibold text-lg mt-4">365 Days Help Desk</span>
              <span className="text-sm text-lightText flex items-center gap-2">
                <FaWhatsapp className="text-2xl text-green" /> +91 9311796739
              </span>
            </div>
          </div>
          <div className="shadow-lg w-full mt-4 grid lg:grid-cols-5">
            <div className="w-full lg:col-span-2 flex flex-col p-4">
              <Image className="w-32 h-auto" src="/assets/images/zlogo.png" alt="Logo" width={128} height={32} />
              <span className="font-semibold text-lg mt-6">Address</span>
              <a href="#" className="text-sm text-lightText mt-4 hover:text-primary transition ease-in duration-2000">
                No. 289, Level 01, Tower A,
                <br /> Building 10, DLF Phase 2,
                <br /> Gurugram, Haryana 122018
                <br /> Email: connect@zoroz.in
                <br /> Phone: +91 9311796739
                <br /> Office Time- 09:00 AM to 07:00 PM (Monday to Friday)
              </a>
            </div>
            <div className="shadow-lg w-full flex flex-col p-4">
              <span className="font-semibold text-lg">Products</span>
              <a href="#" className="text-sm text-lightText mt-4 hover:text-primary transition ease-in duration-2000">Mobile Accessories</a>
              <a href="#" className="text-sm text-lightText mt-2 hover:text-primary transition ease-in duration-2000">Mobile Spare Parts</a>
              <a href="#" className="text-sm text-lightText mt-2 hover:text-primary transition ease-in duration-2000">Mobile Tool Kits</a>
              <a href="#" className="text-sm text-lightText mt-2 hover:text-primary transition ease-in duration-2000">Solar Lighting &amp; Essentials</a>
              <a href="#" className="text-sm text-lightText mt-2 hover:text-primary transition ease-in duration-2000">View All Brands</a>
            </div>
            <div className="shadow-lg w-full flex flex-col p-4">
              <span className="font-semibold text-lg">Know About Us</span>
              <a href="#" className="text-sm text-lightText mt-4 hover:text-primary transition ease-in duration-2000">About Us</a>
              <a href="#" className="text-sm text-lightText mt-2 hover:text-primary transition ease-in duration-2000">Privacy Policy</a>
              <a href="#" className="text-sm text-lightText mt-2 hover:text-primary transition ease-in duration-2000">Terms and Conditions</a>
              <a href="#" className="text-sm text-lightText mt-2 hover:text-primary transition ease-in duration-2000">Refund and Return Policy</a>
              <a href="#" className="text-sm text-lightText mt-2 hover:text-primary transition ease-in duration-2000">Ship Delivery</a>
              <a href="#" className="text-sm text-lightText mt-2 hover:text-primary transition ease-in duration-2000">Articles</a>
            </div>
            <div className="shadow-lg w-full flex flex-col p-4">
              <span className="font-semibold text-lg">Get in Touch</span>
              <a href="#" className="text-sm text-lightText mt-4 hover:text-primary transition ease-in duration-2000">+91 9311796739</a>
              <a href="#" className="text-sm text-lightText mt-2 hover:text-primary transition ease-in duration-2000">connect@zoroz.in</a>
            </div>
          </div>
          <div className="w-full grid lg:grid-cols-3 gap-2">
            <div>
              <Image className="mt-5 w-52 h-auto" src="/assets/images/play.png" alt="Play Store" width={208} height={72} />
            </div>
            <div className="flex mt-5 flex-col lg:items-center">
              <a href="#" className="text-blue text-sm">
                <FaEnvelope className="text-xs mr-2" /> connect@zoroz.in
              </a>
              <span className="text-xs text-lightText flex items-center gap-2">In case of any concern, mail us</span>
            </div>
            <div className="mt-5 flex lg:justify-end gap-4">
              <a href="#" className="text-2xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-2xl">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full flex justify-center px-4">
        <div className="lg:w-[90%] md:w-[90%] w-full p-4 rounded-[5px] relative">
          <div className="flex flex-wrap justify-between">
            <div className="flex gap-2">
              <a href="#" className="text-sm text-lightText flex items-center gap-2 pr-2 border-r-[1px] border-black/60">Terms of Use</a>
              <a href="#" className="text-sm text-lightText flex items-center gap-2 pr-2 border-r-[1px] border-black/60">Copyright</a>
              <a href="#" className="text-sm text-lightText flex items-center gap-2 pr-2 border-r-[1px] border-black/60">Privacy Policy</a>
              <a href="#" className="text-sm text-lightText flex items-center gap-2 pr-2 border-r-[1px] border-black/60">Compliance</a>
            </div>
            <div className="flex gap-2">
              <span className="text-sm text-lightText flex items-center gap-2 pr-2">
                Zoroz India Pvt. Ltd. &copy; 2024 Zoroz.com All Rights Reserved | Designed and Developed by Zoroz
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
