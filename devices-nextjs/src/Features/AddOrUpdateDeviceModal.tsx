import { TheButton } from "@/Components/TheButton";
import IOneDevice from "@/app/Models/OneDevice";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

interface AddDeviceModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (device: IOneDevice) => void;
  onDelete?: () => void;
  device?: IOneDevice | null;
}

const newEmptyDeviceObject: IOneDevice = {
  id: 0,
  name: "",
  model: "",
  messagesRecieved: 0,
  messagesMaximum: 0,
  connectionStart: new Date(),
  isOnline: false,
};

const AddDeviceModal: React.FC<AddDeviceModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
  onDelete,
  device: initialDevice = newEmptyDeviceObject,
}) => {
  const [newDevice, setNewDevice] = useState<IOneDevice>(
    initialDevice || newEmptyDeviceObject
  );

  useEffect(() => {
    setNewDevice(initialDevice || newEmptyDeviceObject);
  }, [initialDevice]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDevice((prevDevice) => ({
      ...prevDevice,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewDevice((prevDevice) => ({
      ...prevDevice,
      [name]: checked,
    }));
  };

  const handleDateChange = (date: string | null) => {
    setNewDevice((prevDevice) => ({
      ...prevDevice,
      connectionStart: date || "",
    }));
  };

  const handleSubmit = () => {
    if (!newDevice.name || !newDevice.model) {
      // If name or model is empty, display an error message or handle it as needed
      alert("Name and Model are required.");
      console.error("Name and Model are required.");
      return;
    }

    if (newDevice.messagesRecieved < 0 || newDevice.messagesMaximum < 0) {
      alert("Messages Received and Messages Maximum must be non-negative.");
      console.error(
        "Messages Received and Messages Maximum must be non-negative."
      );
      return;
    }
    onSubmit(newDevice);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this device?")) {
      onDelete?.();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-x01-theme-colors01-primary-colorp-500 w-4/5"
      style={{ content: { margin: "auto", transform: "translateX(0%)" } }}
    >
      <h2 className="bg-x01-theme-colors01-primary-colorp-soft text-5xl">
        {initialDevice?.id
          ? `Update Device [${newDevice.id}]`
          : "Add New Device"}
      </h2>
      <form className="bg-x01-theme-colors01-primary-colorp-300 text-3xl">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newDevice.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Model:
          <input
            type="text"
            name="model"
            value={newDevice.model}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Messages Received:
          <input
            type="number"
            name="messagesRecieved"
            value={newDevice.messagesRecieved}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Messages Maximum:
          <input
            type="number"
            name="messagesMaximum"
            value={newDevice.messagesMaximum}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Connection Start: {newDevice.connectionStart.toString().split("T")[0]}
          {"  "}
          <input
            type="date"
            name="connectionStart"
            value={new Date(newDevice.connectionStart).toISOString()}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </label>
        <br />
        <label className={newDevice.isOnline ? "bg-green-200" : "bg-red-300"}>
          {newDevice.isOnline ? "Online: " : "Offline: "}
          <input
            type="checkbox"
            name="isOnline"
            checked={newDevice.isOnline}
            onChange={handleCheckboxChange}
            className="w-8 h-8 border-2 border-blue-500 rounded-sm bg-white"
          />
        </label>
        <br />
        <br />
        <TheButton
          className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          valueClassName=""
          onClick={handleSubmit}
          text={initialDevice?.id ? "Update-N" : "Add-N"}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          {initialDevice?.id ? "Update" : "Add"}
        </button>
        <br />
      </form>
      <br />
      <div className="grid grid-rows-1 grid-flow-col gap-4 mt-20">
        <button
          onClick={onRequestClose}
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 text-5xl"
        >
          Close?
        </button>{" "}
        <TheButton
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 text-5xl"
          valueClassName=""
          onClick={onRequestClose}
          text="Close?-N"
        />
        {initialDevice?.id && (
          <TheButton
            className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            valueClassName=""
            onClick={handleDelete}
            text="Delete-N"
          />
        )}
        {initialDevice?.id && (
          <button
            type="button"
            onClick={handleDelete}
            className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Delete
          </button>
        )}
      </div>
    </Modal>
  );
};

export default AddDeviceModal;