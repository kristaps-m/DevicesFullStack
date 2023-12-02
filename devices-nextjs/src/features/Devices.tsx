"use client";
import React, { useState, useEffect } from "react";
import Agent from "@/api/Agent";
import OneDevice from "@/app/Models/OneDevice";
import AppPagination, { paginate } from "@/Component/AppPagination";

interface DataRoot {
  devices: OneDevice[];
}

function calculateDaysDifference(givenDate: string) {
  // Convert the given date string to a Date object
  const givenDateTime: any = new Date(givenDate);

  // Get the current date
  const currentDate: any = new Date();

  // Calculate the difference in milliseconds
  const timeDifference =
    currentDate -
    givenDateTime -
    (Math.floor(Math.random() * 25) + 4) * (1000 * 60 * 60 * 24);

  // Convert the difference to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
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
  // devicesList.push({
  //   id: 1,
  //   name: "Aesvx",
  //   model: "3C IXX",
  //   messagesRecieved: 233,
  //   messagesMaximum: 143,
  //   connectionStart: "2023-09-28 19:26:32",
  // });
  //console.log(devicesList);

  /*
  width: Hug (1,440px)
height: Hug (169px)
padding: 0px, 0px, 20px, 0px
gap: 20px

  */
  return (
    <>
      <div className="w-[1440px] h-[72px] px-5 py-4 bg-gray-800 border-b border-zinc-200 border-opacity-10 flex-col justify-center items-center gap-2.5 inline-flex">
        <div className="self-stretch justify-start items-center inline-flex">
          <div className="pr-[52px] flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="w-[66px] h-10 relative">
              <img
                className="w-[66px] h-10 left-0 top-0 absolute"
                src="https://via.placeholder.com/66x40"
              />
              <img
                className="w-[46.94px] h-[20.80px] left-[9.53px] top-[9.60px] absolute"
                src="https://via.placeholder.com/47x21"
              />
            </div>
          </div>
          <div className="justify-start items-center gap-8 flex">
            <div className="relative">
              {/* <div className="left-[32px] top-[1px] absolute text-neutral-300 text-sm font-medium font-['Inter'] leading-snug">
                Dashboard
              </div> */}
              <div className="text-zinc-200 text-sm font-medium font-['Inter'] leading-snug">
                Dashboard
              </div>
              <div className="w-6 h-6 left-0 top-0 absolute flex-col justify-start items-start inline-flex">
                <div className="w-6 h-6"></div>
              </div>
            </div>
            <div className="relative">
              {/* <div className="left-[32px] top-[1px] absolute text-neutral-300 text-sm font-medium font-['Inter'] leading-snug">
                Connectors
              </div> */}
              <div className="text-zinc-200 text-sm font-medium font-['Inter'] leading-snug">
                Connectors
              </div>
              <div className="w-6 h-6 left-0 top-0 absolute flex-col justify-start items-start inline-flex">
                <div className="w-6 h-6"></div>
              </div>
            </div>
            <div className="relative">
              {/* <div className="left-[32px] top-[1px] absolute text-white text-sm font-medium font-['Inter'] leading-snug">
                Devices
              </div> */}
              <div className="text-zinc-200 text-sm font-medium font-['Inter'] leading-snug">
                Devices
              </div>
              <div className="w-6 h-6 left-0 top-0 absolute flex-col justify-start items-start inline-flex">
                <div className="w-6 h-6"></div>
              </div>
            </div>
            <div className="relative">
              {/* <div className="left-[32px] top-[1px] absolute text-neutral-300 text-sm font-medium font-['Inter'] leading-snug">
                General Settings
              </div> */}
              <div className="text-zinc-200 text-sm font-medium font-['Inter'] leading-snug">
                General Settings
              </div>
              <div className="w-6 h-6 left-0 top-0 absolute flex-col justify-start items-start inline-flex">
                <div className="w-6 h-6"></div>
              </div>
            </div>
          </div>
          <div className="justify-end items-right gap-2 flex">
            <div className="w-8 h-8 relative">
              <div className="w-8 h-8 left-0 top-0 absolute bg-gradient-to-bl from-slate-300 to-slate-400 rounded-full"></div>
              <div className="w-[22px] left-[5px] top-[7px] absolute text-center text-gray-800 text-sm font-semibold font-['Inter']">
                R
              </div>
            </div>
            <div className="justify-end items-center gap-1 flex">
              <div className="text-zinc-200 text-sm font-medium font-['Inter'] leading-snug">
                Roberts
              </div>
              <div className="w-2 h-1.5 relative"></div>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------------------------------ */}
      <div className="w-[1440px] h-[510px] pb-[174px] flex-col justify-start items-center inline-flex">
        <div className="w-[1440px] h-10 bg-gray-800"></div>
        <div className="h-[336px] bg-white rounded-md shadow border border-indigo-900 border-opacity-20 flex-col justify-start items-start flex">
          <div className="self-stretch py-5 justify-between items-center inline-flex">
            <div className="grow shrink basis-0 h-9 px-5 justify-between items-center flex">
              <div className="justify-start items-start gap-1 flex">
                <div className="pl-4 pr-1.5 py-1.5 bg-white rounded-md border border-gray-300 justify-center items-center gap-2.5 flex">
                  <div className="text-center text-gray-800 text-sm font-medium font-['Inter'] leading-tight">
                    Online
                  </div>
                  <div className="px-2 py-1 bg-gray-100 rounded-md justify-center items-center gap-2.5 flex">
                    <div className="text-gray-600 text-xs font-medium font-['Inter'] leading-none">
                      2
                    </div>
                  </div>
                </div>
                <div className="pl-4 pr-1.5 py-1.5 bg-blue-500 rounded-md justify-center items-center gap-2 flex">
                  <div className="text-center text-white text-sm font-medium font-['Inter'] leading-tight">
                    Offline
                  </div>
                  <div className="px-2 py-1 bg-blue-100 rounded-md justify-center items-center gap-2.5 flex">
                    <div className="text-sky-900 text-xs font-medium font-['Inter'] leading-none">
                      3
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[300px] pl-3 pr-4 py-[9px] bg-gray-100 rounded-md flex-col justify-start items-start gap-2.5 inline-flex">
                <div className="self-stretch justify-start items-center gap-2 inline-flex">
                  <div className="w-4 h-4 relative">
                    <div className="w-4 h-4 left-0 top-0 absolute"></div>
                    <img
                      className="w-4 h-4 left-0 top-0 absolute"
                      src="https://via.placeholder.com/16x16"
                    />
                  </div>
                  <div className="grow shrink basis-0 text-gray-600 text-sm font-normal font-['Inter'] leading-[18px]">
                    Quick search..
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          {loading ? (
            <h1>LOADING</h1>
          ) : (
            paginatedPosts.map((oneDevice) => (
              <div
                key={oneDevice.id}
                className="self-stretch h-[214px] px-1 pb-1 flex-col justify-start items-start gap-1 flex"
              >
                <div className="self-stretch pl-5 pr-2 py-3 bg-white rounded-md border border-gray-300 justify-start items-center gap-4 inline-flex">
                  <div className="grow shrink basis-0 h-[38px] justify-start items-center gap-4 flex">
                    <div className="grow shrink basis-0 h-[38px] justify-start items-center gap-3 flex">
                      <div className="w-1.5 h-1.5 bg-rose-700 rounded-full"></div>
                      <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                        <div className="self-stretch text-gray-800 text-sm font-medium font-['Inter'] leading-snug">
                          Main Entry Intercom
                        </div>
                        <div className="self-stretch">
                          <span className="text-gray-600 text-xs font-normal font-['Inter'] leading-none">
                            Connection:{" "}
                          </span>
                          <span className="text-gray-600 text-xs font-medium font-['Inter'] leading-none">
                            0%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                      <div className="self-stretch opacity-70 text-gray-600 text-xs font-normal font-['Inter'] leading-none">
                        Model
                      </div>
                      <div className="self-stretch text-gray-800 text-sm font-medium font-['Inter'] leading-snug">
                        {oneDevice.model}
                      </div>
                    </div>
                    <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                      <div className="self-stretch opacity-70 text-gray-600 text-xs font-normal font-['Inter'] leading-none">
                        Con-stat
                      </div>
                      <div className="self-stretch text-gray-800 text-sm font-medium font-['Inter'] leading-snug">
                        {oneDevice.messagesRecieved}/{oneDevice.messagesMaximum}{" "}
                        messages over{" "}
                        {calculateDaysDifference(oneDevice.connectionStart)}{" "}
                        days
                      </div>
                    </div>
                  </div>
                  <div className="justify-start items-start gap-1 flex">
                    <div className="w-[87px] px-4 py-2 opacity-0 bg-gray-100 rounded-md justify-center items-center gap-2 flex">
                      <div className="text-center text-gray-800 text-sm font-medium font-['Inter'] leading-tight">
                        Settings
                      </div>
                    </div>
                    <div className="w-[81px] px-4 py-2 opacity-0 bg-gray-100 rounded-md justify-center items-center gap-2 flex">
                      <div className="text-center text-gray-800 text-sm font-medium font-['Inter'] leading-tight">
                        Control
                      </div>
                    </div>
                    <div className="w-9 h-9 bg-white rounded-md justify-center items-center flex">
                      <div className="w-4 h-4 relative">
                        <div className="w-4 h-4 left-0 top-0 absolute"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <p>{oneDevice.id}</p>
                <p>{oneDevice.name}</p>
                <p>{oneDevice.model}</p>
                <p>{oneDevice.connectionStart}</p>
                <br /> */}
              </div>
            ))
          )}
          {/*  */}

          {/*  */}
          <AppPagination
            items={theDivicesLength}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
          <div className="self-stretch pl-5 pr-3 py-3 bg-gray-100 rounded-bl-md rounded-br-md justify-start items-center gap-5 inline-flex">
            <div className="grow shrink basis-0 text-gray-600 text-sm font-normal font-['Inter'] leading-snug">
              Showing {currentPage * pageSize - pageSize + 1} -{" "}
              {currentPage * pageSize} of {theDivicesLength} devices
            </div>
          </div>
        </div>
      </div>
    </>
    // <div>
    //   <div className="w-full md:w-440 h-169 p-0 md:p-20 gap-20">SUP</div>
    //   <h1>HELLO</h1>
    //   {/* {devicesList
    //     ? devicesList.map((oneDevice) => (
    //         <div key={oneDevice.id}>
    //           <p>{oneDevice.name}</p>
    //         </div>
    //       ))
    //     : "Loading"} */}
    //   {loading ? (
    //     <h1>LOADING</h1>
    //   ) : (
    //     devicesList.map((oneDevice) => (
    //       <div key={oneDevice.id}>
    //         <p>{oneDevice.id}</p>
    //         <p>{oneDevice.name}</p>
    //         <p>{oneDevice.model}</p>
    //         <p>{oneDevice.connectionStart}</p>
    //         <br />
    //       </div>
    //     ))
    //   )}
    // </div>
  );
}
