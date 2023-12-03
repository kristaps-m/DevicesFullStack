/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

interface Props {
  className: any;
}

export const PageComponentsWrapper = ({ className }: Props): JSX.Element => {
  return (
    <div className={`flex flex-col w-[1440px] items-start gap-[10px] px-[135px] py-[16px] relative ${className}`}>
      <div className="flex max-w-[1170px] items-start gap-[10px] relative self-stretch w-full flex-[0_0_auto]">
        <p className="relative flex-1 mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-x01-theme-colors02-neutral-colorn-700 text-[14px] tracking-[-0.20px] leading-[22px]">
          © 2023 LCD. All rights reserved.
        </p>
      </div>
    </div>
  );
};
