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
      className="bg-x01-theme-colors02-neutral-colorn-200 w-4/5"
      style={{ content: { margin: "auto", transform: "translateX(0%)" } }}
    >
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <div className="flex items-center justify-between">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            {initialDevice?.id
              ? `Update Device [${newDevice.id}]`
              : "Add New Device"}
          </h2>
          <TheButton
            buttonClassName="py-2 px-4 bg-red-300 text-white font-semibold rounded-lg shadow-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 text-xl"
            onClick={onRequestClose}
            text="X"
          />
        </div>
        <form action="#">
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Device Name
              </label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={newDevice.name}
                placeholder="Type Device name"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Device Model:
              </label>
              <input
                type="text"
                name="model"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={newDevice.model}
                placeholder="Type Device model"
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Messages Received:
              </label>
              <input
                type="number"
                name="messagesRecieved"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={newDevice.messagesRecieved}
                placeholder="Messages recieved"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Messages Maximum:
              </label>
              <input
                type="number"
                name="messagesMaximum"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={newDevice.messagesMaximum}
                placeholder="Messages maximum"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Connection Start:{" "}
              </label>
              <input
                type="date"
                name="connectionStart"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={newDevice.connectionStart.toString().split("T")[0]}
                placeholder="Connection start"
                onChange={(e) => handleDateChange(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Device Online Status:{" "}
                {newDevice.isOnline ? "Online" : "Offline"}
              </label>
              <div
                className={
                  newDevice.isOnline
                    ? "flex items-center block mb-2 text-sm rounded-lg font-medium text-gray-900 dark:text-white bg-green-400"
                    : "flex items-center block mb-2 text-sm rounded-lg font-medium text-gray-900 dark:text-white bg-red-400"
                }
              >
                <input
                  type="checkbox"
                  name="isOnline"
                  className="w-8 h-8 border-2 border-blue-500 rounded-sm bg-white mx-auto"
                  checked={newDevice.isOnline}
                  onChange={handleCheckboxChange}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <TheButton
              buttonClassName="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              onClick={handleSubmit}
              text={initialDevice?.id ? "Update" : "Add"}
            />
            {initialDevice?.id && (
              <TheButton
                buttonClassName="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                onClick={handleDelete}
                text="Delete?"
              />
            )}
          </div>
        </form>
      </div>
      <br />
      <div className="grid grid-rows-1 grid-flow-col gap-4 mt-20">
        {initialDevice?.id && (
          <TheButton
            buttonClassName="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={handleDelete}
            text="Delete"
          />
        )}
        <TheButton
          buttonClassName="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={handleSubmit}
          text={initialDevice?.id ? "Update" : "Add"}
        />
      </div>
    </Modal>
  );
};

export default AddDeviceModal;
