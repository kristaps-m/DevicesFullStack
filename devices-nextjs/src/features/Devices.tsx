"use client";
import React, { useState, useEffect } from "react";
import agent from "@/api/agent";
import OneDevice from "@/app/models/OneDevice";

interface DataRoot {
  devices: OneDevice[];
}

export default function Devices() {
  const [devicesList, setDevicesList] = useState<OneDevice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    agent.DeviceCatalog.list()
      .then((devices: DataRoot) => {
        setDevicesList(devices.devices);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  // devicesList.push({
  //   id: 1,
  //   name: "Aesvx",
  //   model: "3C IXX",
  //   messagesRecieved: 233,
  //   messagesMaximum: 143,
  //   connectionStart: "2023-09-28 19:26:32",
  // });
  //console.log(devicesList);

  return (
    <div>
      <h1>HELLO</h1>
      {/* {devicesList
        ? devicesList.map((oneDevice) => (
            <div key={oneDevice.id}>
              <p>{oneDevice.name}</p>
            </div>
          ))
        : "Loading"} */}
      {loading ? (
        <h1>LOADING</h1>
      ) : (
        devicesList.map((oneDevice) => (
          <div key={oneDevice.id}>
            <p>{oneDevice.name}</p>
            <p>{oneDevice.model}</p>
            <p>{oneDevice.connectionStart}</p>
            <br />
          </div>
        ))
      )}
    </div>
  );
}
