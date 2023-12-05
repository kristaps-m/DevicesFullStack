"use client";
import React, { useEffect, useState } from "react";
import { ButtonDefault } from "../Components/ButtonDefault";
import { IconSearch } from "../Components/IconSearch";
import { Label } from "../Components/Label";
import { PageComponents } from "../Components/PageComponents";
import { PageComponentsWrapper } from "../Components/PageComponentsWrapper";
import OneDevice from "@/app/Models/OneDevice";
import AppPagination, { paginate } from "@/Components/AppPagination";
import Agent from "@/api/Agent";
// import { Right } from "./../Components/Right";

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

export const Devices = (): JSX.Element => {
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
              Devices
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[1440px] pt-0 pb-[174px] px-0 flex-col items-center relative flex-[0_0_auto]">
        <div className="absolute w-[1440px] h-[40px] top-0 left-0 bg-x01-theme-colors02-neutral-colorn-800" />
        <div className="flex-col w-[1172px] items-start flex-[0_0_auto] mt-[-1.00px] mb-[-1.00px] bg-x01-theme-colors02-neutral-colorn-100 rounded-[6px] border border-solid border-[#26337326] shadow-[0px_4px_8px_1px_#0c11260d] flex relative">
          <div className="flex items-center justify-around gap-[12px] px-0 py-[20px] relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-center justify-between px-[20px] py-0 relative flex-1 grow">
              <div className="inline-flex items-start gap-[4px] relative flex-[0_0_auto]">
                <div className="gap-[10px] pl-[16px] pr-[6px] py-[6px] bg-x01-theme-colors02-neutral-colorn-100 border border-solid border-x01-theme-colors02-neutral-colorn-400 inline-flex items-center justify-center relative flex-[0_0_auto] rounded-[6px]">
                  <div className="relative w-fit [font-family:'Inter-Medium',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-800 text-[14px] text-center tracking-[-0.20px] leading-[20px] whitespace-nowrap">
                    Online
                  </div>
                  <Label
                    className="!flex-[0_0_auto]"
                    clearOption={false}
                    text="2"
                    divClassName=""
                  />
                </div>
                <div className="gap-[8px] pl-[16px] pr-[6px] py-[6px] bg-x01-theme-colors01-primary-colorp-300 inline-flex items-center justify-center relative flex-[0_0_auto] rounded-[6px]">
                  <div className="relative w-fit [font-family:'Inter-Medium',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-100 text-[14px] text-center tracking-[-0.20px] leading-[20px] whitespace-nowrap">
                    Offline
                  </div>
                  <Label
                    className="!flex-[0_0_auto] !bg-x01-theme-colors01-primary-colorp-100"
                    clearOption={false}
                    divClassName="!text-x01-theme-colors01-primary-colorp-500"
                    text="3"
                  />
                </div>
              </div>
              <div className="flex flex-col w-[300px] items-start gap-[10px] pl-[12px] pr-[16px] py-[9px] relative bg-x01-theme-colors02-neutral-colorn-200 rounded-[6px]">
                <div className="items-center gap-[8px] self-stretch w-full flex-[0_0_auto] flex relative">
                  <IconSearch className="bg-[url(icon-2.svg)] !relative" />
                  <div className="relative flex-1 [font-family:'Inter-Regular',Helvetica] font-normal text-x01-theme-colors02-neutral-colorn-700 text-[14px] tracking-[-0.20px] leading-[18px]">
                    Quick search..
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col items-start gap-[4px] pt-0 pb-[20px] px-[20px] self-stretch w-full flex-[0_0_auto] flex relative">
            {/* ----------------------------------------------------------- */}
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
                      <div className="relative w-[6px] h-[6px] bg-x02-semantic-colors01-dangerdanger-300 rounded-[3px]" />
                      <div className="flex-col items-start flex-1 grow flex relative">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-800 text-[14px] tracking-[-0.20px] leading-[22px]">
                          Side Entry Intercom
                        </div>
                        <p className="relative self-stretch [font-family:'Inter-Regular',Helvetica] font-normal text-x01-theme-colors02-neutral-colorn-700 text-[12px] tracking-[-0.20px] leading-[16px]">
                          <span className="font-paragraph-extra-small font-[number:var(--paragraph-extra-small-font-weight)] text-[#5c5f70] text-[length:var(--paragraph-extra-small-font-size)] tracking-[var(--paragraph-extra-small-letter-spacing)] leading-[var(--paragraph-extra-small-line-height)] [font-style:var(--paragraph-extra-small-font-style)]">
                            Connection:{" "}
                          </span>
                          <span className="[font-family:'Inter-Medium',Helvetica] font-medium">
                            0%
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
                    <ButtonDefault
                      className="!h-[36px] !gap-[8px] !flex-[0_0_auto] !bg-x01-theme-colors02-neutral-colorn-200"
                      text="Settings"
                      valueClassName="!text-x01-theme-colors02-neutral-colorn-800"
                    />
                    <ButtonDefault
                      className="!h-[36px] !gap-[8px] !flex-[0_0_auto] !bg-x01-theme-colors02-neutral-colorn-200"
                      text="Control"
                      valueClassName="!text-x01-theme-colors02-neutral-colorn-800"
                    />
                    <div className="flex w-[36px] h-[36px] items-center justify-center relative bg-x01-theme-colors02-neutral-colorn-100 rounded-[6px]">
                      {/* <Right className="!relative !w-[16px] !h-[16px]" /> */}
                    </div>
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
            {/* ----------------------------------------------------------- */}
          </div>
          <div className="flex items-center gap-[20px] pl-[20px] pr-[12px] py-[12px] relative self-stretch w-full flex-[0_0_auto] bg-x01-theme-colors02-neutral-colorn-200 rounded-[0px_0px_6px_6px]">
            <p className="relative flex-1 mt-[-1.00px] font-paragraph-default font-[number:var(--paragraph-default-font-weight)] text-x01-theme-colors02-neutral-colorn-700 text-[length:var(--paragraph-default-font-size)] tracking-[var(--paragraph-default-letter-spacing)] leading-[var(--paragraph-default-line-height)] [font-style:var(--paragraph-default-font-style)]">
              Showing {currentPage * pageSize - pageSize + 1} -{" "}
              {currentPage * pageSize} of {theDivicesLength} devices
            </p>
          </div>
          <PageComponentsWrapper className="!absolute !left-0 !top-[846px]" />
        </div>
      </div>
    </div>
  );
};
