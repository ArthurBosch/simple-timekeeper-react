import "./shiftListInfo.css";
import { countDayEarnings } from "../../../methods/methods";
import { useDispatch } from "react-redux";
import {
  asyncDeleteShift,
  asyncEditShift,
} from "../../../store-toolkit/shiftSlice";
import {
  toggleDeleteModuleStatus,
  toggleShiftInfo,
} from "../../../store-toolkit/shiftInfoSlice";
import { useSelector } from "react-redux";
import edit from "../../../svg/edit.svg";

const ShiftListInfo = () => {
  const { activeShiftInfo, shiftInfoStatus } = useSelector(
    (state) => state.shiftInfo
  );

  const dispatch = useDispatch();

  let timeStartToDisplay = 0;
  let timeEndToDisplay = 0;
  let month = 0;
  let num = 0;
  let day = 0;
  let workingHours = 0;
  let earningsToDisplay = 0;

  if (activeShiftInfo) {
    let { startTime, endTime } = activeShiftInfo;
    if (!endTime) endTime = new Date().toISOString();
    const baseDate = new Date(startTime);
    const optionsDay = { weekday: "long" };
    const optionsMonth = { month: "short" };
    num = baseDate.getDate();
    month = new Intl.DateTimeFormat("en-US", optionsMonth).format(baseDate);
    day = new Intl.DateTimeFormat("en-US", optionsDay).format(baseDate);
    timeStartToDisplay = baseDate.toString().slice(16, 21);
    timeEndToDisplay = new Date(endTime).toString().slice(16, 21);
    const workingTime = new Date(endTime).getTime() - baseDate.getTime();
    workingHours = new Date(workingTime).toISOString().slice(11, 16);

    earningsToDisplay = countDayEarnings(activeShiftInfo);
  }

  return (
    <div
      className={
        shiftInfoStatus
          ? "info-container info-container--active"
          : "info-container"
      }
      id="shiftInfo"
    >
      <div className="info-container--time">
        <span className="info-container--time-start">{timeStartToDisplay}</span>
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
        <span className="info-container--earned-earned">
          {earningsToDisplay}
        </span>
        <span className="info-container--earned-span">earned</span>
      </div>
      <div className="info-container--brake">
        <span className="info-container--brake-minutes">30</span>
        <span className="info-container--brake-span">min. brake</span>
      </div>
      <div className="info-container--controls-edit">
        <button>
          Edit Shift <img src={edit} className="edit-icon" />
        </button>
      </div>
      <div className="info-container--controls-delete">
        <button
          onClick={() => {
            // dispatch(asyncDeleteShift(activeShiftInfo));
            dispatch(toggleDeleteModuleStatus());
            dispatch(toggleShiftInfo());
            // dispatch(toggleShiftInfo());
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ShiftListInfo;
