import "./shiftPage.css";
import { useContext, useEffect, useState } from "react";
import { AppUIContext, AppDataContext } from "../../App";
import { useNavigate } from "react-router-dom";

const ShiftPage = () => {
  const navigate = useNavigate();
  //DATA
  const { activeShift, finishShift, toggleShiftIsActive } =
    useContext(AppDataContext);

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

  useEffect(() => {
    setInterval(() => {
      const delta = Date.now() - new Date(activeShift.startTime).getTime();
      const time = new Date(delta).toISOString().slice(11, 16);
      localStorage.setItem("shiftTime", JSON.stringify(time));
      setShiftTime(time);
    }, 1000);
  });

  return (
    <div className="main" id="main">
      <div className="shift-time">
        <span className="shift-time--start">{startTime}</span> -
        <span className="shift-time--end">9:30</span>
      </div>
      <div className="shift-chart">
        <div className="span-container">
          <span className="status chart-span">ongoing</span>
          <span className="time-passed chart-span">{shiftTime}</span>
          <span className="earned chart-span">$91.24</span>
        </div>
      </div>
      <div className="shift-controls">
        <button className="brake-button">Brake</button>
        <button
          className="finish-button"
          onClick={() => {
            finishShift();
            navigate("/");
            toggleShiftIsActive(false);
          }}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default ShiftPage;
