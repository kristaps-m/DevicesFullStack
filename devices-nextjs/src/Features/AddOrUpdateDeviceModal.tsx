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
      {/* <div className="flex items-center justify-between">
        <h2 className="bg-x01-theme-colors02-neutral-colorn-300 text-5xl">
          {initialDevice?.id
            ? `Update Device [${newDevice.id}]`
            : "Add New Device"}
        </h2>
        <TheButton
          buttonClassName="py-2 px-4 bg-red-300 text-white font-semibold rounded-lg shadow-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 text-5xl"
          onClick={onRequestClose}
          text="X"
        />
      </div> */}
      {/* New good looking !!!!!!! */}
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
            text="x"
          />
        </div>
        {/* <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update product
        </h2> */}
        {/* <TheButton
          buttonClassName="py-2 px-4 bg-red-300 text-white font-semibold rounded-lg shadow-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 text-5xl"
          onClick={onRequestClose}
          text="X"
        /> */}
        <form action="#">
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Product Name
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
                Model:
              </label>
              <input
                type="text"
                name="model"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={newDevice.model}
                placeholder="Device model"
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

            {/* <div>
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                  <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option selected="">Electronics</option>
                      <option value="TV">TV/Monitors</option>
                      <option value="PC">PC</option>
                      <option value="GA">Gaming/Console</option>
                      <option value="PH">Phones</option>
                  </select>
              </div> */}

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
                {newDevice.connectionStart.toString().split("T")[0]}
                {"  "}
              </label>
              <input
                type="date"
                name="connectionStart"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={new Date(newDevice.connectionStart).toISOString()}
                placeholder="Connection start"
                onChange={(e) => handleDateChange(e.target.value)}
              />
            </div>
            <div>
              <label
                className={
                  newDevice.isOnline
                    ? "block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-green-400"
                    : "block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-red-400"
                }
              >
                {newDevice.isOnline ? "Online: " : "Offline: "}
                <input
                  type="checkbox"
                  name="isOnline"
                  checked={newDevice.isOnline}
                  onChange={handleCheckboxChange}
                  className="w-8 h-8 border-2 border-blue-500 rounded-sm bg-white"
                />
              </label>
            </div>

            {/*  */}
            {/* <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Write a product description here..."
              >
                Standard glass, 3.8GHz 8-core 10th-generation Intel Core i7
                processor, Turbo Boost up to 5.0GHz, 16GB 2666MHz DDR4 memory,
                Radeon Pro 5500 XT with 8GB of GDDR6 memory, 256GB SSD storage,
                Gigabit Ethernet, Magic Mouse 2, Magic Keyboard - US
              </textarea>
            </div> */}
            {/*  */}

            {/*  */}
          </div>
          <div className="flex items-center space-x-4">
            {/* <button
              type="submit"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Update product
            </button> */}
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
      {/* Not good looking form :) */}
      {/* <form className="bg-x01-theme-colors02-neutral-colorn-200 text-3xl">
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
        <label className={newDevice.isOnline ? "bg-green-400" : "bg-red-400"}>
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
      </form> */}
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
