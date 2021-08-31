// Importing Libraries and stylesheets
import React, { useState, useRef } from "react";
import "./detailed-content.styles.scss";

// Importing Icons and Images
import { ReactComponent as LaptopMan2 } from "../../assets/man-laptop-2.svg";
import { ReactComponent as NetflixLogo } from "../../assets/netflix-logo.svg";
import { ReactComponent as NetflixImg } from "../../assets/netflix-img.svg";
import { ReactComponent as PrimeLogo } from "../../assets/prime-logo.svg";
import { ReactComponent as PrimeImg } from "../../assets/prime-img.svg";
import { ReactComponent as DisneyLogo } from "../../assets/disney-logo.svg";
import { ReactComponent as DisneyImg } from "../../assets/disney-img.svg";

// Importing Components
import DisneyData from "../disney-data/disney-data.component";
import NetflixData from "../netflix-data/netflix-data.component";
import PrimeData from "../prime-data/prime-data.component";

// Component to contain the different individual analysis components
const DetailedContent = () => {
  // State for selection of OTT
  const [selection, setSelection] = useState({
    netflix: false,
    prime: false,
    disney: false,
  });

  // References for OTT selectors
  let netflixSelector = useRef(null);
  let primeSelector = useRef(null);
  let disneySelector = useRef(null);

  return (
    <div className="detailed-content">
      {/* INTRO */}
      <div className="intro">
        <LaptopMan2 className="image" />
        <div>
          <div className="title">Let us have a deeper dive!!</div>
          <div className="text">
            Here you can find a detailed analysis of the top OTTs and also find
            what people feel about these platforms.
          </div>
        </div>
      </div>
      {/* OTT Seleector */}
      <div className="selectors">
        <div
          className="netflix"
          ref={(el) => (netflixSelector = el)}
          onClick={() => {
            setSelection({
              netflix: true,
              prime: false,
              disney: false,
            });
            netflixSelector.classList.add("selected");
            primeSelector.classList.remove("selected");
            disneySelector.classList.remove("selected");
          }}
        >
          <div className="logo-div">
            <NetflixLogo />
          </div>
          <div className="img-div">
            <NetflixImg />
          </div>
        </div>
        <div
          className="prime"
          ref={(el) => (primeSelector = el)}
          onClick={() => {
            setSelection({
              netflix: false,
              prime: true,
              disney: false,
            });
            netflixSelector.classList.remove("selected");
            primeSelector.classList.add("selected");
            disneySelector.classList.remove("selected");
          }}
        >
          <div className="logo-div">
            <PrimeLogo />
          </div>
          <div className="img-div">
            <PrimeImg />
          </div>
        </div>
        <div
          className="disney"
          ref={(el) => (disneySelector = el)}
          onClick={() => {
            setSelection({
              netflix: false,
              prime: false,
              disney: true,
            });
            netflixSelector.classList.remove("selected");
            primeSelector.classList.remove("selected");
            disneySelector.classList.add("selected");
          }}
        >
          <div className="logo-div">
            <DisneyLogo />
          </div>
          <div className="img-div">
            <DisneyImg />
          </div>
        </div>
      </div>
      {/* Netflix Data */}
      {selection.netflix ? <NetflixData /> : null}
      {/* Prime Video Data */}
      {selection.prime ? <PrimeData /> : null}
      {/* Disney+ Hotstar Data */}
      {selection.disney ? <DisneyData /> : null}
    </div>
  );
};

export default DetailedContent;
