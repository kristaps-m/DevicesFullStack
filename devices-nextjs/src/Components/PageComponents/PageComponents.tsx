/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Icon24PxApartments1 } from "@/icons/Icon24PxApartments1/Icon24PxApartments1";
import { Icon24PxDashboard1 } from "@/icons/Icon24PxDashboard1";
import { Icon24PxDeviceMonitoring } from "@/icons/Icon24PxDeviceMonitoring";
import { Icon24PxGeneralSettings2 } from "@/icons/Icon24PxGeneralSettings2";
import { IconCustomChevronDown1 } from "@/icons/IconCustomChevronDown1";
import { IconMainLogo } from "@/icons/IconMainLogo";

interface Props {
  className: any;
  logotypeShape: string;
  valueClassName: any;
  icon24PxDeviceMonitoringColor: string;
}

const tailwindCSSForIcons = "!absolute !w-[24px] !h-[24px] !top-0 !left-0";

export const PageComponents = ({
  className,
  logotypeShape = "/img/shape-4.svg",
  valueClassName,
  icon24PxDeviceMonitoringColor = "#9DA0AF",
}: Props): JSX.Element => {
  return (
    <div
      className={`flex flex-col w-[1440px] items-center justify-center gap-[10px] px-[20px] py-[16px] relative bg-x01-theme-colors02-neutral-colorn-800 border-b [border-bottom-style:solid] border-[#e2e3e91a] ${className}`}
    >
      <div className="flex max-w-[1170px] items-center relative self-stretch w-full flex-[0_0_auto]">
        <div className="inline-flex flex-col items-start gap-[100px] pl-0 pr-[52px] py-0 relative flex-[0_0_auto]">
          {"      "}
        </div>
        <div className="inline-flex items-center gap-[32px] relative flex-[0_0_auto]">
          <div className="relative w-[106px] h-[24px]">
            <div className="absolute top-px left-[32px] [font-family:'Inter',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-500 text-[14px] tracking-[-0.20px] leading-[22px] whitespace-nowrap"></div>
            <IconMainLogo className="!absolute !w-full !h-[36px]" />
          </div>
          <div className="relative w-[106px] h-[24px]">
            <div className="absolute top-px left-[32px] [font-family:'Inter',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-500 text-[14px] tracking-[-0.20px] leading-[22px] whitespace-nowrap">
              Dashboard
            </div>
            <Icon24PxDashboard1 className={tailwindCSSForIcons} />
          </div>
          <div className="relative w-[111px] h-[24px]">
            <div className="absolute top-px left-[32px] [font-family:'Inter',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-500 text-[14px] tracking-[-0.20px] leading-[22px] whitespace-nowrap">
              Connectors
            </div>
            <Icon24PxApartments1 className={tailwindCSSForIcons} />
          </div>
          <div className="relative w-[86px] h-[24px]">
            <div
              className={`absolute top-px left-[32px] [font-family:'Inter',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-500 text-[14px] tracking-[-0.20px] leading-[22px] whitespace-nowrap ${valueClassName}`}
            >
              Devices
            </div>
            <Icon24PxDeviceMonitoring
              className={tailwindCSSForIcons}
              color={icon24PxDeviceMonitoringColor}
            />
          </div>
          <div className="relative w-[143px] h-[24px] mr-[-2.00px]">
            <div className="absolute top-px left-[32px] [font-family:'Inter',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-500 text-[14px] tracking-[-0.20px] leading-[22px] whitespace-nowrap">
              General Settings
            </div>
            <Icon24PxGeneralSettings2 className={tailwindCSSForIcons} />
          </div>
        </div>
        <div className="inline-flex items-center justify-end gap-[8px] absolute top-[4px] left-[1066px]">
          <div className="relative w-[34px] h-[32px]">
            <div className="relative w-[32px] h-[32px] rounded-[16px] [background:linear-gradient(180deg,rgb(205.4,209.97,225.96)_0%,rgb(159,166,193)_100%)]">
              <div className="absolute w-[22px] top-[7px] left-[5px] [font-family:'Inter',Helvetica] font-semibold text-x01-theme-colors02-neutral-colorn-800 text-[14px] text-center tracking-[-0.20px] leading-[normal]">
                R
              </div>
            </div>
          </div>
          <div className="inline-flex items-center justify-end gap-[4px] relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-300 text-[14px] tracking-[-0.20px] leading-[22px] whitespace-nowrap">
              Roberts
            </div>
            <IconCustomChevronDown1 className="!relative !w-[8px] !h-[6px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

PageComponents.propTypes = {
  logotypeShape: PropTypes.string,
  icon24PxDeviceMonitoringColor: PropTypes.string,
};
