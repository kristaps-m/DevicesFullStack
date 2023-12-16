/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React, { MouseEvent } from "react";

interface Props {
  buttonClassName: string;
  divClassName?: string;
  text: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const TheButton = ({
  buttonClassName,
  divClassName,
  text,
  onClick,
}: Props): JSX.Element => {
  return (
    <button
      className={`${buttonClassName}`}
      // className={`inline-flex items-center justify-center gap-[10px] px-[16px] py-[8px] relative bg-x01-theme-colors01-primary-colorp-300 rounded-[6px] all-[unset] box-border ${className} hover:bg-x01-theme-colors01-primary-colorp-300`}
      onClick={onClick}
    >
      <div
        className={`${divClassName}`}
        // className={`relative w-fit [font-family:'Inter',Helvetica] font-medium text-x01-theme-colors02-neutral-colorn-100 text-[14px] text-center tracking-[-0.20px] leading-[20px] whitespace-nowrap ${divClassName}`}
      >
        {text}
      </div>
    </button>
  );
};

TheButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};
