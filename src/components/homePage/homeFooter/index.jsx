import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppDataContext } from "../../../App";
import dobleChevron from "../../../svg/double-chevron.svg";

import "./homeFooter.css";

const HomeFooter = ({ shiftInfo, toggleShiftInfo }) => {
  const { data } = useContext(AppDataContext);

  const [weeklyHours, setWeeklyHours] = useState();

  const countWeeklyHours = () => {
    if (data) {
      const lastSeven = data.slice(-7); //get the last 7 days
      const weekdays = lastSeven.map(
        (shift) => new Array(new Date(shift.startTime).toString().split(" "))
      );
      const lastSunday = weekdays.find((day) => day[0][0] === "Sun");
      const lastSundayDate = parseInt(lastSunday[0][2]);
      const lastSundayDateObject = lastSeven.find(
        (shift) => new Date(shift.startTime).getDate() === lastSundayDate
      );
      const lastSundayDateIndex = lastSeven.findIndex(
        (shift) => shift === lastSundayDateObject
      );
      const daysAfterSunday = lastSeven.slice(0, lastSundayDateIndex + 1);
      const weeklyMls = daysAfterSunday.map((shift) => {
        const delta =
          new Date(shift.endTime).getTime() -
          new Date(shift.startTime).getTime();
        return delta;
      });
      const weeklyMlsCount = weeklyMls.reduce(
        (partialSum, a) => partialSum + a,
        0
      );
      const milisecondsToHours = () => {
        const milsToMins = weeklyMlsCount / 60000;
        const hours = Math.floor(milsToMins / 60)
          .toString()
          .padStart(2, "0");
        const minutes = Math.floor(milsToMins % 60)
          .toString()
          .padStart(2, "0");
        return `${hours}:${minutes}`;
      };
      setWeeklyHours(milisecondsToHours());
    }
  };

  useEffect(() => {
    countWeeklyHours();
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
