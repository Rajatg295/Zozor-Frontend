import React from 'react';
import Image from 'next/image'; // Import Image component

const Login: React.FC = () => {
  return (
    <div className="w-full flex justify-center px-4 mt-6">
      <div className="lg:w-[90%] md:w-[90%] w-full flex lg:flex-row md:flex-row flex-col gap-4 relative">
        <div className="w-full bg-white p-4 rounded-[10px]">
          <div className="w-full flex flex-col">
            <div className="w-full flex lg:flex-row md:flex-col sm:flex-row flex-col pb-4 border-b-[1px] border-primary/20">
              <div className="lg:w-[50%] md:w-full sm:w-[50%] w-full flex justify-center">
                {/* Replace <img> with <Image> */}
                <Image
                  src="/assets/images/ecart.png"
                  alt="E-cart"
                  width={300}  // Specify the width
                  height={300} // Specify the height
                  className="w-[300px] h-[300px]" // You can adjust these if needed
                />
              </div>
              <div className="lg:w-[50%] md:w-full sm:w-[50%] w-full">
                <div className="flex flex-col lg:w-[60%] md:w-[80%] sm:w-[70%] w-full h-full justify-center">
                  <span className="font-semibold text-lg">Login or Sign Up</span>
                  <input
                    type="text"
                    placeholder="+91 Enter mobile number"
                    className="w-full py-3 px-4 border-[1px] border-primary/30 mt-4"
                  />
                  <button className="mt-4 py-3 px-5 rounded-[10px] bg-blue-500 font-semibold text-white border-[1px] border-primary hover:bg-white hover:text-primary transition ease-in duration-2000">
                    CONTINUE
                  </button>
                  <div className="w-full flex justify-center flex-col items-center py-8">
                    <span className="font-normal text-sm">Your data are safe with us</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
