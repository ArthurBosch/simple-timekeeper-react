import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppDataContext } from "../../../App";
import dobleChevron from "../../../svg/double-chevron.svg";

import "./homeFooter.css";

const HomeFooter = ({ shiftInfo, toggleShiftInfo }) => {
  const { data } = useContext(AppDataContext);

  const [weeklyHours, setWeeklyHours] = useState();
  const [averageHours, setAverageHours] = useState();
  const [weeklyEarnings, setWeeklyEarnings] = useState();

  const getThisWeek = () => {
    let daysAfterSunday = "";
    if (data) {
      const lastSeven = data.slice(0, 7);
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
      daysAfterSunday = lastSeven.slice(0, lastSundayDateIndex + 1);
    }

    return daysAfterSunday;
  };

  const shiftsToMilliseconds = (days) => {
    const milliseconds = days.map((shift) => {
      const delta =
        new Date(shift.endTime).getTime() - new Date(shift.startTime).getTime();
      return delta;
    });
    return milliseconds;
  };

  const milisecondsToHours = (milliseconds) => {
    const milsToMins = milliseconds / 60000;
    const hours = Math.floor(milsToMins / 60)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor(milsToMins % 60)
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const countWeeklyMiliseconds = () => {
    if (data) {
      const daysAfterSunday = getThisWeek();
      const miliseconds = shiftsToMilliseconds(daysAfterSunday);
      const weeklyMlsCount = miliseconds.reduce(
        (partialSum, a) => partialSum + a,
        0
      );
      return weeklyMlsCount;
    }
  };

  const countWeeklyHours = () => {
    return milisecondsToHours(countWeeklyMiliseconds());
  };

  const countAverageDayHours = () => {
    if (data) {
      const days = getThisWeek().length;
      const miliseconds = countWeeklyMiliseconds();
      const averageMiliseconds = miliseconds / days;
      const hours = milisecondsToHours(averageMiliseconds);
      return hours;
    }
  };

  const countWeeklyEarningsDemo = () => {
    if (data) {
      const baseWage = 47;
      const milisecondsThisWeek = countWeeklyMiliseconds();
      const hoursThisWeek = milisecondsThisWeek / 1000 / 60 / 60;
      return `${parseInt(hoursThisWeek * baseWage)} ₪`;
    }
  };

  useEffect(() => {
    setWeeklyHours(countWeeklyHours());
    setAverageHours(countAverageDayHours());
    setWeeklyEarnings(countWeeklyEarningsDemo());
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
