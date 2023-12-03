"use client";
import React, { useState, useEffect } from "react";
import Agent from "@/api/Agent";
import OneDevice from "@/app/Models/OneDevice";
import AppPagination, { paginate } from "@/Components/AppPagination";

interface DataRoot {
  devices: OneDevice[];
}

export default function Devices() {
  const [devicesList, setDevicesList] = useState<OneDevice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    Agent.DeviceCatalog.list()
      .then((devices: DataRoot) => {
        setDevicesList(devices.devices);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const theDivicesLength = devicesList.length;
  const paginatedPosts: OneDevice[] = paginate(
    devicesList,
    currentPage,
    pageSize
  );

  return (
    <>
      <h1>SUP</h1>
    </>
  );
}
