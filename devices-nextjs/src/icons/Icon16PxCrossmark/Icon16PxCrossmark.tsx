/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

interface Props {
  className: any;
}

export const Icon16PxCrossmark = ({ className }: Props): JSX.Element => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="10"
      viewBox="0 0 10 10"
      width="10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M2.94194 2.05806L5 4.11562L7.05806 2.05806C7.30214 1.81398 7.69786 1.81398 7.94194 2.05806C8.18602 2.30214 8.18602 2.69786 7.94194 2.94194L5.88438 5L7.94194 7.05806C8.18602 7.30214 8.18602 7.69786 7.94194 7.94194C7.69786 8.18602 7.30214 8.18602 7.05806 7.94194L5 5.88438L2.94194 7.94194C2.69786 8.18602 2.30214 8.18602 2.05806 7.94194C1.81398 7.69786 1.81398 7.30214 2.05806 7.05806L4.11562 5L2.05806 2.94194C1.81398 2.69786 1.81398 2.30214 2.05806 2.05806C2.30214 1.81398 2.69786 1.81398 2.94194 2.05806Z"
        fill="#9DA0AF"
        fillRule="evenodd"
      />
    </svg>
  );
};
