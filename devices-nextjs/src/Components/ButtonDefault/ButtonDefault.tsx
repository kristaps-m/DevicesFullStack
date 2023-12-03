/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

interface Props {
  className: any;
  valueClassName: any;
  text: string;
}

export const ButtonDefault = ({ className, valueClassName, text = "Button" }: Props): JSX.Element => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-[10px] px-[16px] py-[8px] relative bg-x01-theme-colors01-primary-colorp-300 rounded-[6px] all-[unset] box-border ${className}`}
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
