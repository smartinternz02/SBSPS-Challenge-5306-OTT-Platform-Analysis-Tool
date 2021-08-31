// Importing Libraries and stylesheets
import React from "react";
import "./custom-checkbox.styles.scss";

// Custom Check box component to render styled radio or checkbox inputs for recommender section
const CustomCheckbox = ({ name, imglink, type, value, displayName }) => {
  return (
    <label>
      <input
        className="custom-check-box"
        type={type}
        value={value}
        name={name}
      />
      <span className="span-style">
        <div className="overlay"></div>
        <div className="name">{displayName}</div>
        <img src={imglink} alt="options" />
      </span>
    </label>
  );
};

export default CustomCheckbox;
