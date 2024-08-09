// import React from 'react';

// interface FormData {
//   gstNumber: string;
//   businessName: string;
//   businessPhone: string;
//   businessEmail: string;
//   address: string;
//   pinCode: string;
//   city: string;
//   state: string;
//   country: string;
// }

// interface BusinessDetailsFormProps {
//   formData: FormData;
//   handleChange: React.ChangeEventHandler<HTMLInputElement>;
//   handleBusinessDetailsFormSubmit: React.FormEventHandler<HTMLFormElement>;
// }

// const BusinessDetailsForm: React.FC<BusinessDetailsFormProps> = ({
//   formData,
//   handleChange,
//   handleBusinessDetailsFormSubmit,
// }) => {
//   return (
//     <div className="w-full max-w-3xl mx-auto p-0 bg-white rounded-lg">
//       <form onSubmit={handleBusinessDetailsFormSubmit} className="space-y-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="flex flex-col">
//             <label className="text-sm font-medium">Enter GST No.</label>
//             <input
//               type="text"
//               name="gstNumber"
//               value={formData.gstNumber}
//               onChange={handleChange}
//               placeholder="GST Number"
//               className="border border-gray-300 p-2 rounded"
//               required
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-sm font-medium">Business Name</label>
//             <input
//               type="text"
//               name="businessName"
//               value={formData.businessName}
//               onChange={handleChange}
//               placeholder="Business Name"
//               className="border border-gray-300 p-2 rounded"
//               required
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="flex flex-col">
//             <label className="text-sm font-medium">Business Phone</label>
//             <input
//               type="tel"
//               name="businessPhone"
//               value={formData.businessPhone}
//               onChange={handleChange}
//               placeholder="Business Phone"
//               className="border border-gray-300 p-2 rounded"
//               required
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-sm font-medium">Business Email ID</label>
//             <input
//               type="email"
//               name="businessEmail"
//               value={formData.businessEmail}
//               onChange={handleChange}
//               placeholder="Business Email ID"
//               className="border border-gray-300 p-2 rounded"
//               required
//             />
//           </div>
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm font-medium">Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             placeholder="Address"
//             className="border border-gray-300 p-2 rounded"
//             required
//           />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="flex flex-col">
//             <label className="text-sm font-medium">Pin Code</label>
//             <input
//               type="text"
//               name="pinCode"
//               value={formData.pinCode}
//               onChange={handleChange}
//               placeholder="Pin Code"
//               className="border border-gray-300 p-2 rounded"
//               required
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-sm font-medium">City/District/Town</label>
//             <input
//               type="text"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               placeholder="City/District/Town"
//               className="border border-gray-300 p-2 rounded"
//               required
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="relative flex flex-col">
//             <label className="top-2 left-3 text-xs text-gray-500">State</label>
//             <input
//               type="text"
//               name="state"
//               value={formData.state}
//               onChange={handleChange}
//               placeholder="State"
//               className="border border-gray-300 p-2 pl-12 rounded"
//               required
//             />
//           </div>
//           <div className="relative flex flex-col">
//             <label className="top-2 left-3 text-xs text-gray-500">Country</label>
//             <input
//               type="text"
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               placeholder="Country"
//               className="border border-gray-300 p-2 pl-12 rounded"
//               required
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
//         >
//           Save Address
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BusinessDetailsForm;




import React from 'react';

interface FormData {
  gstNumber: string;
  businessName: string;
  businessPhone: string;
  businessEmail: string;
  address: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
}

interface BusinessDetailsFormProps {
  formData: FormData;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleBusinessDetailsFormSubmit: React.FormEventHandler<HTMLFormElement>;
}

const BusinessDetailsForm: React.FC<BusinessDetailsFormProps> = ({
  formData,
  handleChange,
  handleBusinessDetailsFormSubmit,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleBusinessDetailsFormSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Enter GST No.</label>
            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              placeholder="GST Number"
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Business Name"
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Business Phone</label>
            <input
              type="tel"
              name="businessPhone"
              value={formData.businessPhone}
              onChange={handleChange}
              placeholder="Business Phone"
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium">Business Email ID</label>
            <input
              type="email"
              name="businessEmail"
              value={formData.businessEmail}
              onChange={handleChange}
              placeholder="Business Email ID"
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Pin Code</label>
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              placeholder="Pin Code"
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium">City/District/Town</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City/District/Town"
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative flex flex-col">
            <label className="text-sm font-medium">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="relative flex flex-col">
            <label className="text-sm font-medium">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default BusinessDetailsForm;
