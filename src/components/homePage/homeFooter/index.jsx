import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import dobleChevron from "../../../svg/double-chevron.svg";
import { useSelector } from "react-redux";

import {
  countWeeklyHours,
  countAverageDayHours,
  countWeeklyEarningsDemo,
} from "../../../methods/methods";

import "./homeFooter.css";

const HomeFooter = ({ shiftInfo, toggleShiftInfo }) => {
  const [weeklyHours, setWeeklyHours] = useState();
  const [averageHours, setAverageHours] = useState();
  const [weeklyEarnings, setWeeklyEarnings] = useState();

  const dataState = useSelector((state) => state.shifts.shifts);
  const [data, setData] = useState(dataState);
  useEffect(() => {
    setData(dataState);
  });

  useEffect(() => {
    if (data.length > 0) {
      setWeeklyHours(countWeeklyHours(data));
      setAverageHours(countAverageDayHours(data));
      setWeeklyEarnings(countWeeklyEarningsDemo(data));
    }
  }, [data]);

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
                <h3>{weeklyHours}</h3>
                <span>hours</span>
              </div>
              <div className="stats-card">
                <h3>{weeklyEarnings}</h3>
                <span>earned</span>
              </div>
              <div className="stats-card">
                <h3>{averageHours}</h3>
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
