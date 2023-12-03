/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

interface Props {
  shape: string;
}

export const Logotype = ({ shape = "/img/shape-2.svg" }: Props): JSX.Element => {
  return (
    <div className="relative w-[66px] h-[40px] bg-[url(/img/shape-3.svg)] bg-[100%_100%]">
      <img className="absolute w-[47px] h-[21px] top-[10px] left-[10px]" alt="Shape" src={shape} />
    </div>
  );
};

Logotype.propTypes = {
  shape: PropTypes.string,
};
