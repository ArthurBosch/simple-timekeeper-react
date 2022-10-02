import { useEffect, useState } from "react";
import dobleChevron from "../../../svg/double-chevron.svg";
import { useSelector } from "react-redux";

import {
  countWeeklyHours,
  countAverageDayHours,
  countWeeklyEarningsDemo,
} from "../../../methods/methods";

import "./homeFooter.css";

const HomeFooter = ({ shiftInfo, toggleShiftInfo }) => {
  const [weeklyState, setWeeklyState] = useState({
    weeklyHours: null,
    averageHours: null,
    weeklyEarnings: null,
  });

  const dataState = useSelector((state) => state.shifts.shifts);

  useEffect(() => {
    if (dataState.length > 0) {
      setWeeklyState({
        weeklyHours: countWeeklyHours(dataState),
        averageHours: countAverageDayHours(dataState),
        weeklyEarnings: countWeeklyEarningsDemo(dataState),
      });
    }
  }, [dataState]);

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
                <h3>{weeklyState.weeklyHours}</h3>
                <span>hours</span>
              </div>
              <div className="stats-card">
                <h3>{weeklyState.weeklyEarnings}</h3>
                <span>earned</span>
              </div>
              <div className="stats-card">
                <h3>{weeklyState.averageHours}</h3>
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
