import { useState } from "react";
import dobleChevron from "../../../svg/double-chevron.svg";

import "./homeFooter.css";

const HomeFooter = ({ shiftInfo, toggleShiftInfo }) => {
  return (
    <div
      className="footer"
      id="footer"
      style={shiftInfo ? { bottom: "0px" } : { bottom: "-35vh" }}
    >
      <div className="footer-container">
        <div className="shift-info" id="shiftInfo">
          <div
            className="cirle-button"
            id="circleButton"
            style={
              shiftInfo
                ? { transform: "rotate(180deg)", width: "75px", height: "75px" }
                : {}
            }
            onClick={() => {
              shiftInfo ? toggleShiftInfo(false) : toggleShiftInfo(true);
            }}
          >
            <img src={dobleChevron} />
          </div>
          <div className="shift-info--container">
            <div className="shift-info--header">
              <h2>This week:</h2>
            </div>
            <div className="shift-info--stats">
              <div className="stats-card">
                <h3>34</h3>
                <span>hours</span>
              </div>
              <div className="stats-card">
                <h3>$543</h3>
                <span>earned</span>
              </div>
              <div className="stats-card">
                <h3>9.4</h3>
                <span>average</span>
              </div>
            </div>
            <div className="shift-info--controls">
              <button>More info</button>
              <button>Shift settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
