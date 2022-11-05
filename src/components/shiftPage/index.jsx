import "./shiftPage.scss";
import { useContext, useEffect, useState } from "react";
import { AppUIContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { finishShift } from "../../store-toolkit/shiftSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  countEarningsByMiliSeconds,
  milisecondsToHours,
} from "../../methods/methods";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ShiftPage = () => {
  //DATA
  const { activeShift } = useSelector((state) => state.shifts);

  //UI
  const { changePageName } = useContext(AppUIContext);
  useEffect(() => {
    changePageName("My Shift");
  }, []);

  let timeStart = "00:00";
  if (activeShift) {
    timeStart = new Date(activeShift.timeStart).toLocaleTimeString();
  }

  const checkLocalTime = () => {
    const time = JSON.parse(localStorage.getItem("shiftTime"));
    if (time) return time;
    return "00:00";
  };

  const [shiftTime, setShiftTime] = useState(checkLocalTime());
  const [seconds, setSeconds] = useState(0);
  const [earned, setEarned] = useState("0 ₪");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (activeShift) {
      setInterval(() => {
        const delta = Date.now() - new Date(activeShift.timeStart).getTime();
        const time = milisecondsToHours(delta);
        // setSeconds(Math.floor(delta / 60000));
        setSeconds(new Date(delta).getSeconds());
        setEarned(countEarningsByMiliSeconds(delta));
        setShiftTime(time);
      }, 1000);
    }
  }, [activeShift]);

  return (
    <div className="main" id="main">
      <div className="shift-time">
        <span className="shift-time--start">{timeStart}</span>
        <br />
        <span className="shift-started-span">Shift started</span>
      </div>

      <div className="shift-chart">
        <CircularProgressbarWithChildren
          strokeWidth="3"
          maxValue={60}
          value={seconds}
          styles={buildStyles({
            pathTransition:
              seconds === 0 ? "none" : "stroke-dashoffset 0.5s ease 0s",
            pathColor: "#00B3B3",
          })}
        >
          <div className="span-container">
            <span className="status chart-span">ongoing</span>
            <span className="time-passed chart-span">{shiftTime}</span>
            <span className="earned chart-span">{earned}</span>
          </div>
        </CircularProgressbarWithChildren>
      </div>
      <div className="shift-controls">
        {/* <button className="brake-button">Brake</button> */}
        <button
          className="finish-button"
          onClick={() => {
            dispatch(finishShift(activeShift));
            navigate("/");
          }}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default ShiftPage;
