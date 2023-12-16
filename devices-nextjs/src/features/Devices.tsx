"use client";
import React, { useEffect, useState } from "react";
import { IconSearch } from "../Components/IconSearch";
import { Label } from "../Components/Label";
import { PageComponents } from "../Components/PageComponents";
import { PageComponentsWrapper } from "../Components/PageComponentsWrapper";
import IOneDevice from "@/app/Models/OneDevice";
import AppPagination, { paginate } from "@/Components/AppPagination";
import Agent from "@/api/agent";
import AddOrUpdateDeviceModal from "./AddOrUpdateDeviceModal";
import { TheButton } from "@/Components/TheButton";

function calculateDaysDifference(givenDate: string | Date) {
  const givenDateTime: any = new Date(givenDate);
  // Get the current date
  const currentDate: any = new Date();
  // Calculate the difference in milliseconds
  const timeDifference = currentDate - givenDateTime;
  // Convert the difference to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}

export const Devices = (): JSX.Element => {
  const [devicesList, setDevicesList] = useState<IOneDevice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [userSearchValue, setUserSearchValue] = useState("");
  const [searchDevicesByOnlineStatus, setSearchOnlineStatus] = useState(true);
  const [onlineDevicesCount, setOnlineDevicesCount] = useState(0);
  const [offlineDevicesCount, setOfflineDevicesCount] = useState(0);
  const pageSize = 10;
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [theDivicesLength, setTheDivicesLength] = useState(0);
  const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<IOneDevice | null>(null);
  const openAddDeviceModal = (device: IOneDevice | null = null) => {
    setSelectedDevice(device);
    setIsAddDeviceModalOpen(true);
  };

  const closeAddDeviceModal = () => {
    setSelectedDevice(null);
    setIsAddDeviceModalOpen(false);
  };

  const handleAddDeviceSubmit = async (updatedDevice: IOneDevice) => {
    try {
      if (selectedDevice) {
        await Agent.DeviceCatalog.updateDevice(updatedDevice);
      } else {
        // If no device is selected, it means we are adding
        await Agent.DeviceCatalog.addDevice(updatedDevice);
      }
      // After updating or adding a device, refresh the list
      fetchDevices();
      closeAddDeviceModal();
    } catch (error) {
      console.error("Error adding device:", error);
    }
  };

  const handleDeviceDelete = async () => {
    if (selectedDevice) {
      try {
        await Agent.DeviceCatalog.removeDevice(selectedDevice.id);
        // After deleting a device, refresh the list
        fetchDevices();
        closeAddDeviceModal();
      } catch (error) {
        console.error("Error deleting device:", error);
      }
    }
  };

  const fetchDevices = async () => {
    try {
      const deviceList = await Agent.DeviceCatalog.getObjectsFiltered(
        userSearchValue,
        searchDevicesByOnlineStatus
      );
      setDevicesList(deviceList);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  useEffect(() => {
    Agent.DeviceCatalog.getObjectsFiltered(
      userSearchValue,
      searchDevicesByOnlineStatus
    )
      .then((data: IOneDevice[]) => {
        setDevicesList(data), setTheDivicesLength(data.length);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, [userSearchValue, searchDevicesByOnlineStatus]);

  const paginatedPosts: IOneDevice[] = paginate(
    devicesList,
    currentPage,
    pageSize
  );

  useEffect(() => {
    Agent.DeviceCatalog.list()
      .then((data: IOneDevice[]) => {
        const theOnlineCount = data.filter((x) => x.isOnline === true).length;
        const theOfflineCount = data.filter((x) => x.isOnline === false).length;
        setOnlineDevicesCount(theOnlineCount);
        setOfflineDevicesCount(theOfflineCount);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col h-[900px] items-start relative bg-x01-theme-colors02-neutral-colorn-300">
      <div className="inline-flex gap-[20px] pt-0 pb-[20px] px-0 bg-x01-theme-colors02-neutral-colorn-800 flex-col items-center relative flex-[0_0_auto]">
        <PageComponents
          className="!flex-[0_0_auto]"
          deviceMonitoringColor="#3498DB"
          logotypeLogotypeClassName="bg-[url(shape-3.svg)]"
          logotypeShape="shape-4.svg"
          valueClassName="!text-x01-theme-colors02-neutral-colorn-100"
        />
        <div className="max-w-[1170px] w-[1170px] items-center gap-[12px] flex-[0_0_auto] flex relative">
          <div className="flex-col items-start gap-[12px] flex-1 grow flex relative">
            <div className="inline-flex items-start gap-[8px] relative flex-[0_0_auto]">
              <div className="relative w-fit [font-family:'Inter-Medium',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-500 text-[14px] tracking-[-0.20px] leading-[normal]">
                Home
              </div>
              <div className="relative w-fit opacity-20 [font-family:'Inter-Medium',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-500 text-[14px] tracking-[-0.20px] leading-[normal]">
                /
              </div>
            </div>
            <div className="relative self-stretch [font-family:'Inter-Medium',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-100 text-[21px] tracking-[-0.30px] leading-[28px]">
              Devices{" "}
              <TheButton
                buttonClassName="!h-[36px] !gap-[8px] !flex-[0_0_auto] bg-x01-theme-colors02-neutral-colorn-800 border border-solid border-x01-theme-colors01-primary-colorp-soft rounded-[6px] hover:bg-x01-theme-colors01-primary-colorp-soft"
                text="Add+"
                onClick={() => openAddDeviceModal()}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[1440px] pt-0 pb-[174px] px-0 flex-col items-center relative flex-[0_0_auto]">
        <div className="absolute w-[1440px] h-[40px] top-0 left-0 bg-x01-theme-colors02-neutral-colorn-800" />
        <div className="flex-col w-[1172px] items-start flex-[0_0_auto] mt-[-1.00px] mb-[-1.00px] bg-x01-theme-colors02-neutral-colorn-100 rounded-[6px] border border-solid border-[#26337326] shadow-[0px_4px_8px_1px_#0c11260d] flex relative">
          <div className="flex items-center justify-around gap-[12px] px-0 py-[20px] relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-center justify-between px-[20px] py-0 relative flex-1 grow">
              {/* -------Online and Offline button section----------- */}
              <div className="inline-flex items-start gap-[4px] relative flex-[0_0_auto]">
                <div
                  className={`gap-[10px] pl-[16px] pr-[6px] py-[6px] border inline-flex items-center justify-center relative flex-[0_0_auto] rounded-[6px] ${
                    searchDevicesByOnlineStatus
                      ? "bg-x01-theme-colors01-primary-colorp-300 border-solid border-x02-semantic-colors01-online-300"
                      : "bg-x01-theme-colors02-neutral-colorn-100 border-solid border-x01-theme-colors02-neutral-colorn-400"
                  }`}
                >
                  <TheButton
                    buttonClassName={`relative w-fit [font-family:'Inter-Medium',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-800 text-[14px] text-center tracking-[-0.20px] leading-[20px] whitespace-nowrap ${
                      searchDevicesByOnlineStatus
                        ? "text-x01-theme-colors02-neutral-colorn-800"
                        : "text-x02-semantic-colors01-online-300"
                    }`}
                    text="Online"
                    onClick={() => setSearchOnlineStatus(true)}
                  />
                  <Label
                    className={`!flex-[0_0_auto] ${
                      searchDevicesByOnlineStatus
                        ? "bg-x02-semantic-colors01-online-300"
                        : "bg-x01-theme-colors02-neutral-colorn-100"
                    }`}
                    clearOption={false}
                    text={`${onlineDevicesCount}`}
                    divClassName=""
                  />
                </div>
                <div
                  className={`gap-[8px] pl-[16px] pr-[6px] py-[6px] border inline-flex items-center justify-center relative flex-[0_0_auto] rounded-[6px] ${
                    searchDevicesByOnlineStatus
                      ? "bg-x01-theme-colors02-neutral-colorn-100 border-solid border-x01-theme-colors02-neutral-colorn-400"
                      : "bg-x01-theme-colors01-primary-colorp-300 border-solid border-x02-semantic-colors01-dangerdanger-300"
                  }`}
                >
                  <TheButton
                    buttonClassName={`relative w-fit [font-family:'Inter-Medium',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-100 text-[14px] text-center tracking-[-0.20px] leading-[20px] whitespace-nowrap ${
                      !searchDevicesByOnlineStatus
                        ? "text-x01-theme-colors02-neutral-colorn-100"
                        : "text-x02-semantic-colors01-dangerdanger-300"
                    }`}
                    text="Offline"
                    onClick={() => setSearchOnlineStatus(false)}
                  />
                  <Label
                    className={`!flex-[0_0_auto] ${
                      !searchDevicesByOnlineStatus
                        ? "bg-x02-semantic-colors01-dangerdanger-300"
                        : "bg-x01-theme-colors01-primary-colorp-300"
                    }`}
                    clearOption={false}
                    divClassName={`${
                      !searchDevicesByOnlineStatus
                        ? "text-x01-theme-colors02-neutral-colorn-100"
                        : "text-x02-semantic-colors01-dangerdanger-300"
                    }`}
                    text={`${offlineDevicesCount}`}
                  />
                </div>
              </div>
              {/* --------- End of (online offline) button section --------- */}
              <AddOrUpdateDeviceModal
                isOpen={isAddDeviceModalOpen}
                onRequestClose={closeAddDeviceModal}
                onSubmit={handleAddDeviceSubmit}
                onDelete={handleDeviceDelete}
                device={selectedDevice}
              />
              <div className="flex flex-col w-[300px] items-start gap-[10px] pl-[12px] pr-[16px] py-[9px] relative bg-x01-theme-colors02-neutral-colorn-200 rounded-[6px]">
                <div className="items-center gap-[8px] self-stretch w-full flex-[0_0_auto] flex relative">
                  <IconSearch className="bg-[url(icon-2.svg)] !relative" />
                  <input
                    type="text"
                    value={userSearchValue}
                    placeholder="Quick search.."
                    onChange={(e) => {
                      setUserSearchValue(e.target.value);
                    }}
                    className="relative flex-1 [font-family:'Inter-Regular',Helvetica] font-normal text-x01-theme-colors02-neutral-colorn-700 text-[14px] tracking-[-0.20px] leading-[18px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col items-start gap-[4px] pt-0 pb-[20px] px-[20px] self-stretch w-full flex-[0_0_auto] flex relative">
            {/* ---------------------- Render paginated Devices --------------------------------- */}
            {loading ? (
              <h1>LOADING</h1>
            ) : (
              paginatedPosts.map((oneDevice) => (
                <div
                  className="flex items-center gap-[16px] pl-[20px] pr-[8px] py-[12px] relative self-stretch w-full flex-[0_0_auto] ml-[-1.00px] mr-[-1.00px] bg-x01-theme-colors02-neutral-colorn-100 rounded-[6px] border border-solid border-x01-theme-colors02-neutral-colorn-500 shadow-[0px_4px_8px_1px_#0c11260d]"
                  key={oneDevice.id}
                >
                  <div className="flex items-center gap-[16px] relative flex-1 grow">
                    <div className="max-w-[250px] items-center gap-[12px] flex relative flex-1 grow">
                      <div
                        className={`relative w-[8px] h-[8px] bg-x02-semantic-colors01-${
                          searchDevicesByOnlineStatus
                            ? "online"
                            : "dangerdanger"
                        }-300 rounded-[3px]`}
                      />
                      <div className="flex-col items-start flex-1 grow flex relative">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-800 text-[14px] tracking-[-0.20px] leading-[22px]">
                          {oneDevice.name}
                        </div>
                        <p className="relative self-stretch [font-family:'Inter-Regular',Helvetica] font-normal text-x01-theme-colors02-neutral-colorn-700 text-[12px] tracking-[-0.20px] leading-[16px]">
                          <span className="font-paragraph-extra-small font-[number:var(--paragraph-extra-small-font-weight)] text-[#5c5f70] text-[length:var(--paragraph-extra-small-font-size)] tracking-[var(--paragraph-extra-small-letter-spacing)] leading-[var(--paragraph-extra-small-line-height)] [font-style:var(--paragraph-extra-small-font-style)]">
                            Connection:{" "}
                          </span>
                          <span className="[font-family:'Inter-Medium',Helvetica] font-medium">
                            {oneDevice.isOnline ? "100%" : "0%"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex-col max-w-[140px] items-start flex relative flex-1 grow">
                      <div className="relative self-stretch mt-[-1.00px] opacity-70 font-paragraph-extra-small font-[number:var(--paragraph-extra-small-font-weight)] text-x01-theme-colors02-neutral-colorn-700 text-[length:var(--paragraph-extra-small-font-size)] tracking-[var(--paragraph-extra-small-letter-spacing)] leading-[var(--paragraph-extra-small-line-height)] [font-style:var(--paragraph-extra-small-font-style)]">
                        Model
                      </div>
                      <div className="relative self-stretch [font-family:'Inter-Medium',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-800 text-[14px] tracking-[-0.20px] leading-[22px]">
                        {oneDevice.model}
                      </div>
                    </div>
                    <div className="flex flex-col items-start relative flex-1 grow">
                      <div className="relative self-stretch mt-[-1.00px] opacity-70 font-paragraph-extra-small font-[number:var(--paragraph-extra-small-font-weight)] text-x01-theme-colors02-neutral-colorn-700 text-[length:var(--paragraph-extra-small-font-size)] tracking-[var(--paragraph-extra-small-letter-spacing)] leading-[var(--paragraph-extra-small-line-height)] [font-style:var(--paragraph-extra-small-font-style)]">
                        Con-stat
                      </div>
                      <p className="relative self-stretch [font-family:'Inter-Medium',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-800 text-[14px] tracking-[-0.20px] leading-[22px]">
                        {oneDevice.messagesRecieved}/{oneDevice.messagesMaximum}{" "}
                        messages over{" "}
                        {calculateDaysDifference(oneDevice.connectionStart)}{" "}
                        days
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-start gap-[4px] relative flex-[0_0_auto]">
                    <TheButton
                      buttonClassName="inline-flex items-center justify-center gap-[10px] px-[16px] py-[8px] relative bg-x01-theme-colors01-primary-colorp-300 rounded-[6px] all-[unset] box-border !h-[36px] !gap-[8px] !flex-[0_0_auto] bg-x01-theme-colors02-neutral-colorn-200 hover:bg-x01-theme-colors01-primary-colorp-300"
                      divClassName="relative w-fit [font-family:'Inter',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-100 text-[14px] text-center tracking-[-0.20px] leading-[20px] whitespace-nowrap !text-x01-theme-colors02-neutral-colorn-800"
                      onClick={() => openAddDeviceModal(oneDevice)}
                      text="Settings"
                    />
                    <TheButton
                      buttonClassName="inline-flex items-center justify-center gap-[10px] px-[16px] py-[8px] relative bg-x01-theme-colors01-primary-colorp-300 rounded-[6px] all-[unset] box-border !h-[36px] !gap-[8px] !flex-[0_0_auto] bg-x01-theme-colors02-neutral-colorn-200"
                      divClassName="relative w-fit [font-family:'Inter',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-100 text-[14px] text-center tracking-[-0.20px] leading-[20px] whitespace-nowrap !text-x01-theme-colors02-neutral-colorn-800"
                      text="Control"
                    />
                    <div className="flex w-[36px] h-[36px] items-center justify-center relative bg-x01-theme-colors02-neutral-colorn-100 rounded-[6px]"></div>
                  </div>
                </div>
              ))
            )}

            <AppPagination
              items={theDivicesLength}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          </div>
          <div className="flex items-center gap-[20px] pl-[20px] pr-[12px] py-[12px] relative self-stretch w-full flex-[0_0_auto] bg-x01-theme-colors02-neutral-colorn-200 rounded-[0px_0px_6px_6px]">
            <p className="relative flex-1 mt-[-1.00px] font-paragraph-default font-[number:var(--paragraph-default-font-weight)] text-x01-theme-colors02-neutral-colorn-700 text-[length:var(--paragraph-default-font-size)] tracking-[var(--paragraph-default-letter-spacing)] leading-[var(--paragraph-default-line-height)] [font-style:var(--paragraph-default-font-style)]">
              Showing {currentPage * pageSize - pageSize + 1} -{" "}
              {theDivicesLength <= pageSize
                ? theDivicesLength
                : currentPage * pageSize}{" "}
              of {theDivicesLength} devices
            </p>
            <PageComponentsWrapper className="!absolute !left-0 !top-[50px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
