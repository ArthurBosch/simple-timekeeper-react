import "./shiftListInfo.css";

const ShiftListInfo = () => {
  return (
    <div className="info-container">
      <div className="info-container--time">
        <span className="info-container--time-start">12:15</span>
        <span>-</span>
        <span className="info-container--time-end">23:15</span>
      </div>
      <div className="info-container--date">
        <span className="info-container--date-month">AUG</span>
        <span className="info-container--date-num">12</span> <br />
        <span className="info-container--date-day">friday</span>
      </div>
      <div className="info-container--hours">
        <span className="info-container--hours-hours">9:30</span>
        <span className="info-container--hours-span">hours</span>
      </div>
      <div className="info-container--earned">
        <span className="info-container--earned-earned">$315</span>
        <span className="info-container--earned-span">earned</span>
      </div>
      <div className="info-container--brake">
        <span className="info-container--brake-minutes">30</span>
        <span className="info-container--brake-span">min. brake</span>
      </div>
    </div>
  );
};

export default ShiftListInfo;
