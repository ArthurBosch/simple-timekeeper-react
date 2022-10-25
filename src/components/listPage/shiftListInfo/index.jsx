import "./shiftListInfo.scss";
import { getFormattedDataFromDay } from "../../../methods/methods";
import { useDispatch } from "react-redux";
import {
  toggleDeleteModuleStatus,
  toggleShiftInfo,
  toggleEditModuleStatus,
} from "../../../store-toolkit/shiftInfoSlice";
import { useSelector } from "react-redux";
import edit from "../../../svg/edit.svg";

const ShiftListInfo = () => {
  const { activeShiftInfo, shiftInfoStatus } = useSelector(
    (state) => state.shiftInfo
  );

  const dispatch = useDispatch();

  let { timeStart, timeEnd, wage } = activeShiftInfo;
  const {
    num,
    month,
    day,
    timeStartToDisplay,
    timeEndToDisplay,
    earningsToDisplay,
    workingHours,
  } = getFormattedDataFromDay(timeStart, timeEnd, "long", wage);

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
        <button
          onClick={() => {
            dispatch(toggleEditModuleStatus());
            dispatch(toggleShiftInfo(false));
          }}
        >
          Edit Shift <img src={edit} className="edit-icon" />
        </button>
      </div>
      <div className="info-container--controls-delete">
        <button
          onClick={() => {
            dispatch(toggleDeleteModuleStatus());
            dispatch(toggleShiftInfo());
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ShiftListInfo;
