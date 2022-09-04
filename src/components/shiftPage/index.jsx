import "./shiftPage.css";

const ShiftPage = () => {
  return (
    <div className="main" id="main">
      <div className="shift-time">
        <span className="shift-time--start">12:15</span> -
        <span className="shift-time--end">9:30</span>
      </div>
      <div className="shift-chart">
        <div className="span-container">
          <span className="status chart-span">ongoing</span>
          <span className="time-passed chart-span">3:31</span>
          <span className="earned chart-span">$91.24</span>
        </div>
      </div>
      <div className="shift-controls">
        <button className="brake-button">Brake</button>
        <button className="finish-button">Finish</button>
      </div>
    </div>
  );
};

export default ShiftPage;
