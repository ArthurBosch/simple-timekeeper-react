import "./deleteModule.css";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { asyncDeleteShift } from "../../../store-toolkit/shiftSlice";
import {
  toggleDeleteModuleStatus,
  toggleShiftInfo,
} from "../../../store-toolkit/shiftInfoSlice";
import { useEffect } from "react";

const DeleteModule = () => {
  const { activeShiftInfo, deleteModuleStatus } = useSelector(
    (state) => state.shiftInfo
  );

  const openModule = () => {
    setTimeout(() => {
      container.current.className =
        "delete-module--container delete-module--container-active";
    }, 100);
  };

  useEffect(() => {
    openModule();
    document.querySelector(".list-page--container").style.overflowY = "hidden";
    return function cleanup() {
      document.querySelector(".list-page--container").style.overflowY =
        "scroll";
    };
  }, []);

  const dispatch = useDispatch();
  const container = useRef();
  if (activeShiftInfo) {
    const { startTime, endTime } = activeShiftInfo;

    const shiftInfoDate = new Date(startTime).toLocaleDateString();
    const shiftInfoStartTime = new Date(startTime).toLocaleTimeString();
    const shiftInfoEndTime = new Date(endTime).toLocaleTimeString();

    const closeModule = (e) => {
      if (e.target.closest("#deleteModule")) return;
      container.current.className = "delete-module--container";
      setTimeout(() => {
        dispatch(toggleDeleteModuleStatus());
        dispatch(toggleShiftInfo(true));
      }, 100);
    };

    const closeModuleOnCancel = () => {
      container.current.className = "delete-module--container";
      setTimeout(() => {
        dispatch(toggleDeleteModuleStatus());
        dispatch(toggleShiftInfo(true));
      }, 100);
    };

    return (
      <>
        <div
          className="delete-module-overlay"
          onClick={(e) => {
            closeModule(e);
          }}
        ></div>

        <div
          className="delete-module--container"
          ref={container}
          id="deleteModule"
        >
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
                  closeModuleOnCancel();
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
