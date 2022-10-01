import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./editShift.css";
import { convert12to24 } from "../../../methods/methods";
import {
  toggleEditModuleStatus,
  toggleShiftInfo,
  updateActiveShiftInfo,
} from "../../../store-toolkit/shiftInfoSlice";
import { asyncEditShift } from "../../../store-toolkit/shiftSlice";

const EditShift = () => {
  const { activeShiftInfo } = useSelector((state) => state.shiftInfo);
  const { startTime, endTime } = activeShiftInfo;
  const [shiftInfo, setShiftInfo] = useState({
    id: activeShiftInfo.id,
    date: new Date(startTime).toLocaleDateString("en-CA"),
    startTime: convert12to24(new Date(startTime).toLocaleTimeString()),
    endTime: convert12to24(new Date(endTime).toLocaleTimeString()),
  });

  const container = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    openModule();
    document.querySelector(".list-page--container").style.overflowY = "hidden";
    return function cleanup() {
      document.querySelector(".list-page--container").style.overflowY =
        "scroll";
    };
  }, []);

  const openModule = () => {
    setTimeout(() => {
      container.current.className =
        "edit-shift--container edit-shift--container-active";
    }, 100);
  };
  const closeModule = () => {
    dispatch(toggleEditModuleStatus());
    dispatch(toggleShiftInfo(true));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const timeStartString = `${shiftInfo.date} ${shiftInfo.startTime}`;
    const timeEndString = `${shiftInfo.date} ${shiftInfo.endTime}`;
    const startTime = new Date(timeStartString).toISOString();
    const endTime = new Date(timeEndString).toISOString();

    const shift = {
      id: shiftInfo.id,
      startTime: startTime,
      endTime: endTime,
    };
    dispatch(asyncEditShift(shift));
    dispatch(toggleEditModuleStatus());
    dispatch(updateActiveShiftInfo(shift));
    dispatch(toggleShiftInfo(true));
  };
  return (
    <>
      <div
        className="edit-shift--overlay"
        onClick={() => {
          closeModule();
        }}
      ></div>
      <div className="edit-shift--container" ref={container}>
        <div className="edit-shift--header-container">
          <h1 className="edit-shift--header">Edit Shift</h1>
        </div>
        <form className="edit-shift--form">
          <div className="edit-shift--input-container">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date-input"
              className="input-date"
              defaultValue={shiftInfo.date}
              onChange={(e) => {
                setShiftInfo({
                  ...shiftInfo,
                  date: e.target.value,
                });
              }}
            ></input>
          </div>
          <div className="edit-shift--input-container">
            <label htmlFor="time-start">Start Time</label>
            <input
              type="time"
              name="time-start"
              className="input-time"
              defaultValue={shiftInfo.startTime}
              onChange={(e) => {
                setShiftInfo({
                  ...shiftInfo,
                  startTime: e.target.value,
                });
              }}
            ></input>
          </div>
          <div className="edit-shift--input-container">
            <label htmlFor="time-end">Finish Time</label>
            <input
              type="time"
              name="time-end"
              className="input-time"
              defaultValue={shiftInfo.endTime}
              onChange={(e) => {
                setShiftInfo({
                  ...shiftInfo,
                  endTime: e.target.value,
                });
              }}
            ></input>
          </div>
          <div className="edit-shift--controls">
            <button
              className="edit-shift--button-cancel"
              onClick={() => {
                closeModule();
              }}
            >
              Cancel
            </button>
            <button
              className="edit-shift--button-submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditShift;
