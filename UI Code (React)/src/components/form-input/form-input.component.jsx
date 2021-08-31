// Importing Libraries and stylesheets
import React from "react";
import "./form-input.styles.scss";

// Custom Form Input field for auth page
const FormInput = ({ Component, handleChange, ...otherProps }) => {
  return (
    <div className="form-group">
      <Component className="icon" />
      <input onChange={handleChange} className="form-input" {...otherProps} />
      {otherProps.haserror && (
        <p style={{ fontSize: 11, color: "red", marginTop: 0 }}>
          {otherProps.errormessage}
        </p>
      )}
    </div>
  );
};

export default FormInput;
