// Importing Libraries and stylesheets
import React from "react";
import "./feature-card.styles.scss";

// Component to render feature cards of different bgcolor
const FeatureCard = ({ title, bgColor, children }) => {
  return (
    <div
      className="feature-card"
      data-aos="flip-down"
      style={{ backgroundColor: bgColor }}
    >
      <div className="title">{title}</div>
      <div className="info">{children}</div>
    </div>
  );
};

export default FeatureCard;
