// Importing Libraries and stylesheets
import React from "react";
import "./custom-button.styles.scss";

// Custom Button Component for auth page
const CustomButton = ({ children, onClick, disabled }) => {
  return (
    <button className="custom-button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;
