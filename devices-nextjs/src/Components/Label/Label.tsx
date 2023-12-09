/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Icon16PxCrossmark } from "../../icons/Icon16PxCrossmark";

interface Props {
  clearOption: boolean;
  className: any;
  text: string;
  divClassName: any;
}

export const Label = ({
  clearOption,
  className,
  text = "Value",
  divClassName,
}: Props): JSX.Element => {
  return (
    <div
      className={`inline-flex items-center px-[8px] py-[4px] rounded-[6px] justify-center bg-x01-theme-colors02-neutral-colorn-200 relative ${
        clearOption ? "gap-[4px]" : "gap-[10px]"
      } ${className}`}
    >
      {!clearOption && (
        <div
          className={`relative w-fit [font-family:'Inter',Helvetica] font-medium text-[12px] tracking-[-0.20px] leading-[16px] whitespace-nowrap ${divClassName}`}
        >
          {text}
        </div>
      )}

      {clearOption && (
        <>
          <div className="relative w-fit [font-family:'Inter',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-700 text-[12px] tracking-[-0.20px] leading-[16px] whitespace-nowrap">
            {text}
          </div>
          <Icon16PxCrossmark className="!relative !w-[10px] !h-[10px]" />
        </>
      )}
    </div>
  );
};

Label.propTypes = {
  clearOption: PropTypes.bool,
  text: PropTypes.string,
};
