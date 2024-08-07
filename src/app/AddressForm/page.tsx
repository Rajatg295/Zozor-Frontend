import React from 'react';

interface AddressFormProps {
  newAddress: {
    name: string;
    email: string;
    room: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pin: string;
    phone: string;
  };
  setNewAddress: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    room: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pin: string;
    phone: string;
  }>>;
  handleAddressFormSubmit: React.FormEventHandler<HTMLFormElement>;
  isEditing: boolean;
}


const AddressForm: React.FC<AddressFormProps> = ({
  newAddress,
  setNewAddress,
  handleAddressFormSubmit,
  isEditing,
}) => {
  return (
    <form onSubmit={handleAddressFormSubmit} className="mt-4 p-4 border rounded border-gray-300">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newAddress.name}
            onChange={(e) =>
              setNewAddress({ ...newAddress, name: e.target.value })
            }
            required
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email Id"
            value={newAddress.email}
            onChange={(e) =>
              setNewAddress({ ...newAddress, email: e.target.value })
            }
            required
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Room"
            value={newAddress.room}
            onChange={(e) =>
              setNewAddress({ ...newAddress, room: e.target.value })
            }
            required
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={newAddress.address}
            onChange={(e) =>
              setNewAddress({ ...newAddress, address: e.target.value })
            }
            required
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="City"
            value={newAddress.city}
            onChange={(e) =>
              setNewAddress({ ...newAddress, city: e.target.value })
            }
            required
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            placeholder="State"
            value={newAddress.state}
            onChange={(e) =>
              setNewAddress({ ...newAddress, state: e.target.value })
            }
            required
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Country"
            value={newAddress.country}
            onChange={(e) =>
              setNewAddress({ ...newAddress, country: e.target.value })
            }
            required
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            placeholder="PIN"
            value={newAddress.pin}
            onChange={(e) =>
              setNewAddress({ ...newAddress, pin: e.target.value })
            }
            required
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          value={newAddress.phone}
          onChange={(e) =>
            setNewAddress({ ...newAddress, phone: e.target.value })
          }
          required
          className="border border-gray-300 p-2 rounded w-auto"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-32 py-1 px-4 rounded hover:bg-blue-600"
          >
          {isEditing ? "Update Address" : "Add Address"}
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
