// Importing Libraries and stylesheets
import React from "react";
import { useDispatch } from "react-redux";
import "./side-bar.styles.scss";

// Importing Icons and Images
import { ReactComponent as LogoIcon } from "../../assets/LOGO2-white.svg";
import { ReactComponent as SideImg } from "../../assets/side-bar-img.svg";
import { ReactComponent as HomeImg } from "../../assets/home.svg";
import { ReactComponent as DashImg } from "../../assets/dashboard.svg";
import { ReactComponent as DetImg } from "../../assets/detail.svg";
import { ReactComponent as HotImg } from "../../assets/hot.svg";
import { ReactComponent as LogOutImg } from "../../assets/logout.svg";

// Importing Components
import MenuItem from "../menu-item/menu-item.component";

// Importing Actions
import { logout } from "../../redux/auth/authActions";

// Component to contain the side menu items
const SideBar = () => {
  // Function to handle the logout functionality
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="side-bar">
      <div className="side-bar-container">
        <div>
          {/* Sidebar Image */}
          <div className="side-img">
            <div className="text">Find an OTT that suits your needs</div>
            <SideImg className="side-bar-img" />
          </div>
          {/* Menu Links to other routes */}
          <MenuItem Component={HomeImg} address="/home">
            Home
          </MenuItem>
          <MenuItem Component={DashImg} address="/dashboard">
            Dashboard
          </MenuItem>
          <MenuItem Component={LogoIcon} address="/recommender">
            Recommender
          </MenuItem>
          <MenuItem Component={DetImg} address="/detailed">
            Detail Analysis
          </MenuItem>
          <MenuItem Component={HotImg} address="/whatshot">
            What's hot
          </MenuItem>
        </div>
        {/* Logout */}
        <div className="logout">
          <MenuItem Component={LogOutImg} onClick={logoutHandler} address="/">
            Log Out
          </MenuItem>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
