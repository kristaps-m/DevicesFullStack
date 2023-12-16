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
    <button className={`${buttonClassName}`} onClick={onClick}>
      <div className={`inline-flex items-center ${divClassName}`}>{text}</div>
    </button>
  );
};

TheButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};
