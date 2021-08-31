// Importing Libraries and stylesheets
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./top-bar.styles.scss";

// Importing Icons and Images
import { ReactComponent as TopBarLogo } from "../../assets/top-logo.svg";

// Component to contain the Top Bar content
const TopBar = () => {
  // Pulling params from redux store
  const auth = useSelector((state) => state.firebase.auth);
  const name = auth.displayName;
  const photo = auth.photoURL;

  // Function to generate a random integer
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // Array of different character imgs for user avatar
  const charArray = [
    "https://img.icons8.com/plasticine/100/000000/rick-sanchez.png",
    "https://img.icons8.com/plasticine/100/000000/morty-smith.png",
    "https://img.icons8.com/plasticine/100/000000/jake.png",
    "https://img.icons8.com/plasticine/100/000000/super-mario.png",
    "https://img.icons8.com/plasticine/100/000000/iron-man.png",
    "https://img.icons8.com/plasticine/100/000000/homer-simpson.png",
    "https://img.icons8.com/plasticine/100/000000/stormtrooper.png",
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-container">
        {/* LOGO */}
        <div className="logo">
          <NavLink exact to="/home">
            <TopBarLogo />
          </NavLink>
        </div>
        {/* Profile */}
        <div className="profile">
          <div className="greetings">Hi {name ? name : "user"} !</div>
          <div className="profile-img">
            <img src={photo ? photo : charArray[getRandomInt(7)]} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
