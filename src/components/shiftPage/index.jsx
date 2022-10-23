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
  const [earned, setEarned] = useState("0 ₪");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (activeShift) {
      setInterval(() => {
        const delta = Date.now() - new Date(activeShift.timeStart).getTime();
        const time = milisecondsToHours(delta);
        setEarned(countEarningsByMiliSeconds(delta));
        setShiftTime(time);
      }, 1000);
    }
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
        <span className="shift-time--start">{timeStart}</span>
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
