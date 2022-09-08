import "./shiftListInfo.css";

const ShiftListInfo = ({ shiftData }) => {
  if (shiftData) {
    const { startTime, endTime } = shiftData;
    const baseDate = new Date(startTime);
    const optionsDay = { weekday: "long" };
    const optionsMonth = { month: "short" };
    const num = baseDate.getDate();
    const month = new Intl.DateTimeFormat("en-US", optionsMonth).format(
      baseDate
    );
    const day = new Intl.DateTimeFormat("en-US", optionsDay).format(baseDate);
    const timeStartToDisplay = baseDate.toString().slice(16, 21);
    const timeEndToDisplay = new Date(endTime).toString().slice(16, 21);
    const workingTime = new Date(endTime).getTime() - baseDate.getTime();
    const workingHours = new Date(workingTime).toISOString().slice(11, 16);
    return (
      <div className="info-container">
        <div className="info-container--time">
          <span className="info-container--time-start">
            {timeStartToDisplay}
          </span>
          <span>-</span>
          <span className="info-container--time-end">{timeEndToDisplay}</span>
        </div>
        <div className="info-container--date">
          <span className="info-container--date-month">{month}</span>
          <span>, </span>
          <span className="info-container--date-num">{num}</span> <br />
          <span className="info-container--date-day">{day}</span>
        </div>
        <div className="info-container--hours">
          <span className="info-container--hours-hours">{workingHours}</span>
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
  }
};

export default ShiftListInfo;
