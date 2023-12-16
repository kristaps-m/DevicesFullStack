/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import IOneDevice from "@/app/Models/OneDevice";
import PropTypes from "prop-types";
import React from "react";

interface Props {
  className: string;
  valueClassName: string;
  text: string;
  openAddDeviceModal?: (device?: IOneDevice | null) => void;
}

export const ButtonDefault = ({
  className,
  valueClassName,
  text = "Button",
  openAddDeviceModal,
}: Props): JSX.Element => {
  const onHandleOpenAddDeviceModal = () => {
    openAddDeviceModal?.();
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-[10px] px-[16px] py-[8px] relative bg-x01-theme-colors01-primary-colorp-300 rounded-[6px] all-[unset] box-border ${className} hover:bg-x01-theme-colors01-primary-colorp-300`}
      onClick={onHandleOpenAddDeviceModal}
    >
      <div
        className={`relative w-fit [font-family:'Inter',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-100 text-[14px] text-center tracking-[-0.20px] leading-[20px] whitespace-nowrap ${valueClassName}`}
      >
        {text}
      </div>
    </button>
  );
};

ButtonDefault.propTypes = {
  text: PropTypes.string,
};
