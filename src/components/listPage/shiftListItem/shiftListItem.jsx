import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShiftInfo } from "../../../store-toolkit/shiftInfoSlice";

const ShiftListItem = ({ props }) => {
  const container = useRef(null);
  const { shiftInfoStatus } = useSelector((state) => state.shiftInfo);
  const dispatch = useDispatch();
  let { startTime, endTime } = props;
  if (!endTime) endTime = new Date().toISOString();
  const baseDate = new Date(startTime);
  const options = { weekday: "short" };
  const num = baseDate.getDate();
  const day = new Intl.DateTimeFormat("en-US", options).format(baseDate);
  const timeStartToDisplay = baseDate.toString().slice(16, 21);
  const timeEndToDisplay = new Date(endTime).toString().slice(16, 21);

  const makeActive = (e) => {
    const prev = document.querySelector(".shift-list--item-active");
    if (!prev) {
      container.current.className = "shift-list--item shift-list--item-active";
      return;
    }

    if (
      prev &&
      e.target.closest("#shiftListItem").className === prev.className
    ) {
      prev.className = "shift-list--item";
      container.current.className = "shift-list--item";
      return;
    }

    if (prev) {
      prev.className = "shift-list--item";
      container.current.className = "shift-list--item shift-list--item-active";
    }
  };

  return (
    <div
      className="shift-list--item"
      ref={container}
      id="shiftListItem"
      onClick={(e) => {
        dispatch(toggleShiftInfo(props));
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
