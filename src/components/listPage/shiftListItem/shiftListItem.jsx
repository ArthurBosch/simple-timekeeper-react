import { useState } from "react";

const ShiftListItem = ({ props, toggleShiftInfoFunc, shiftInfo }) => {
  const [active, setActive] = useState(false);

  let { startTime, endTime } = props;
  if (!endTime) endTime = new Date().toISOString();

  const baseDate = new Date(startTime);
  const options = { weekday: "short" };
  const num = baseDate.getDate();
  const day = new Intl.DateTimeFormat("en-US", options).format(baseDate);
  const timeStartToDisplay = baseDate.toString().slice(16, 21);
  const timeEndToDisplay = new Date(endTime).toString().slice(16, 21);

  const makeActive = (e) => {
    const activeNow = document.querySelector(".shift-list--item-active");
    if (activeNow) activeNow.className = "shift-list--item";
    if (!active) {
      e.target.closest("#shiftListItem").className = "shift-list--item-active";
      setActive(true);
    } else {
      setActive(false);
    }
  };

  return (
    <div
      className="shift-list--item"
      id="shiftListItem"
      onClick={(e) => {
        toggleShiftInfoFunc(props);
        makeActive(e);
      }}
    >
      <div className="shift-list--date">
        <h4 className="date-number">{num}</h4>
        <span className="date-day">{day}</span>
      </div>
      <div className="shift-list--time">
        <span className="time-start">{timeStartToDisplay}</span>
        <span> - </span>
        <span className="time-end">{timeEndToDisplay}</span>
      </div>
      <div className="shift-list--info">
        <button className="info-button">i</button>
      </div>
    </div>
  );
};

export default ShiftListItem;
