import "./shiftPage.css";
import { useContext, useEffect, useState } from "react";
import { AppUIContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { finishShift } from "../../store-toolkit/shiftSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  countEarningsByMiliSeconds,
  milisecondsToHours,
} from "../../methods/methods";

const ShiftPage = () => {
  //DATA
  const { activeShift } = useSelector((state) => state.shifts);

  //UI
  const { changePageName } = useContext(AppUIContext);
  useEffect(() => {
    changePageName("My Shift");
  }, []);

  const startTime = new Date(activeShift.startTime).toLocaleTimeString();

  const checkLocalTime = () => {
    const time = JSON.parse(localStorage.getItem("shiftTime"));
    if (time) return time;
    return "00:00";
  };

  const [shiftTime, setShiftTime] = useState(checkLocalTime());
  const [earned, setEarned] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setInterval(() => {
      const delta = Date.now() - new Date(activeShift.startTime).getTime();
      const time = milisecondsToHours(delta);
      const earned = countEarningsByMiliSeconds(delta);
      if (earned < 1) {
        setEarned(1);
      } else {
        setEarned(earned);
      }
      setShiftTime(time);
    }, 1000);
  });

  const pseudoChart = {
    position: "absolute",
    top: "-12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "7px solid #00B3B3",
    borderRadius: "50%",
    width: "230px",
    height: "230px",
    marginTop: "5px",
    boxShadow: "0px 15px 20px rgba(0, 0, 179, 0.1)",
    strokeDashoffset: "100",
  };

  return (
    <div className="main" id="main">
      <div className="shift-time">
        <span className="shift-time--start">{startTime}</span>
      </div>
      <div className="shift-chart">
        <div className="pseudo-chart" style={pseudoChart}></div>
        <div className="span-container">
          <span className="status chart-span">ongoing</span>
          <span className="time-passed chart-span">{shiftTime}</span>
          <span className="earned chart-span">{earned}</span>
        </div>
      </div>
      <div className="shift-controls">
        <button className="brake-button">Brake</button>
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
