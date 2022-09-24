import "./deleteModule.css";
import { useDispatch, useSelector } from "react-redux";
import { asyncDeleteShift } from "../../../store-toolkit/shiftSlice";
import {
  toggleDeleteModuleStatus,
  toggleShiftInfo,
} from "../../../store-toolkit/shiftInfoSlice";

const DeleteModule = () => {
  const { activeShiftInfo } = useSelector((state) => state.shiftInfo);
  const dispatch = useDispatch();
  if (activeShiftInfo) {
    const { startTime, endTime } = activeShiftInfo;

    const shiftInfoDate = new Date(startTime).toLocaleDateString();
    const shiftInfoStartTime = new Date(startTime).toLocaleTimeString();
    const shiftInfoEndTime = new Date(endTime).toLocaleTimeString();

    const closeModule = (e) => {
      if (e.target.closest("#deleteModule")) return;
      dispatch(toggleDeleteModuleStatus());
      dispatch(toggleShiftInfo(true));
    };
    return (
      <>
        <div
          className="delete-module-overlay"
          onClick={(e) => {
            closeModule(e);
          }}
        ></div>

        <div className="delete-module--container" id="deleteModule">
          <div className="delete-module">
            <h1 className="delete-module--header">Delete shift?</h1>
            <span className="delete-module--shift-info-date">
              {shiftInfoDate}
            </span>
            <span className="delete-module--shift-info-start">
              {shiftInfoStartTime} - {shiftInfoEndTime}
            </span>
            <div className="controls-container">
              <button
                className="controls-button-delete"
                onClick={() => {
                  dispatch(asyncDeleteShift(activeShiftInfo));
                  dispatch(toggleDeleteModuleStatus());
                  dispatch(toggleShiftInfo());
                }}
              >
                Delete
              </button>
              <button
                className="controls-button-cancel"
                onClick={() => {
                  dispatch(toggleDeleteModuleStatus());
                  dispatch(toggleShiftInfo(true));
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default DeleteModule;
