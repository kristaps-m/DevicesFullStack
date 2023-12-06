import IOneDevice from "@/app/Models/OneDevice";
import React, { useState } from "react";
import Modal from "react-modal";

interface AddDeviceModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (device: IOneDevice) => void; // Add a callback for submitting the form
}

const AddDeviceModal: React.FC<AddDeviceModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
}) => {
  // Add your form logic here
  const [newDevice, setNewDevice] = useState<IOneDevice>({
    id: 0,
    name: "",
    model: "",
    messagesRecieved: 0,
    messagesMaximum: 0,
    connectionStart: new Date(),
    isOnline: false,
  });

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

  // const handleDateChange = (date: Date | null) => {
  //   setNewDevice((prevDevice) => ({
  //     ...prevDevice,
  //     connectionStart: date || new Date(),
  //   }));
  // };

  const handleDateChange = (date: string | null) => {
    setNewDevice((prevDevice) => ({
      ...prevDevice,
      connectionStart: date || "",
    }));
  };

  // const handleSubmit = () => {
  //   // Validate the form fields here if needed
  //   // Call the submit callback with the new device data
  //   onSubmit(newDevice);
  // };
  const handleSubmit = () => {
    // Validate the form fields here
    if (!newDevice.name || !newDevice.model) {
      // If name or model is empty, display an error message or handle it as needed
      console.error("Name and Model are required.");
      return;
    }

    if (newDevice.messagesRecieved < 0 || newDevice.messagesMaximum < 0) {
      // If messagesRecieved or messagesMaximum are negative, display an error message or handle it as needed
      console.error(
        "Messages Received and Messages Maximum must be non-negative."
      );
      return;
    }

    // Optionally, you can add more specific validation based on your requirements

    // If the form fields are valid, call the submit callback with the new device data
    onSubmit(newDevice);
  };

  // console.log(newDevice);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      // Add modal styles and other configurations as needed
    >
      <h2>Add New Device</h2>
      <form>
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
          Connection Start:
          <input
            type="date" // datetime-local
            name="connectionStart"
            value={newDevice.connectionStart.toString()} // .toISOString().slice(0, 16)
            // onChange={(e) => handleDateChange(new Date(e.target.value))}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </label>
        <br />
        <label>
          Is Online:
          <input
            type="checkbox"
            name="isOnline"
            checked={newDevice.isOnline}
            onChange={handleCheckboxChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      {/* <button onClick={onSubmit(newDevice)}>Submit</button> */}
      {/* Add your form fields and submit button */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={onRequestClose}>Close?</button>
    </Modal>
  );
};

export default AddDeviceModal;
