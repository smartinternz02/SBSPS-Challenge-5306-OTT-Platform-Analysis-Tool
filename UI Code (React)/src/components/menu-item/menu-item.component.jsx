// Importing Libraries and stylesheets
import React from "react";
import { NavLink } from "react-router-dom";
import "./menu-item.styles.scss";

// Component to be rendered in the side menu
const MenuItem = ({ children, Component, address, onClick }) => {
  return (
    <div onClick={onClick}>
      <NavLink
        exact
        to={`${address}`}
        activeClassName="active"
        className="menu-item"
      >
        <div className="logo" onClick={onClick}>
          <Component />
        </div>
        <div className="text">{children}</div>
      </NavLink>
    </div>
  );
};

export default MenuItem;
