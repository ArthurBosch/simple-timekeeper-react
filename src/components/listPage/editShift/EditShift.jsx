import "./editShift.scss";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { convert12to24 } from "../../../methods/methods";
import {
  toggleEditModuleStatus,
  toggleShiftInfo,
  updateActiveShiftInfo,
} from "../../../store-toolkit/shiftInfoSlice";
import { asyncEditShift } from "../../../store-toolkit/shiftSlice";

const EditShift = () => {
  const { activeShiftInfo } = useSelector((state) => state.shiftInfo);
  const { timeStart, timeEnd } = activeShiftInfo;
  const [shiftInfo, setShiftInfo] = useState({
    id: activeShiftInfo.id,
    date: new Date(timeStart).toLocaleDateString("en-CA"),
    timeStart: convert12to24(new Date(timeStart).toLocaleTimeString()),
    timeEnd: convert12to24(new Date(timeEnd).toLocaleTimeString()),
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
    const timeStartString = `${shiftInfo.date} ${shiftInfo.timeStart}`;
    const timeEndString = `${shiftInfo.date} ${shiftInfo.timeEnd}`;
    const timeStart = new Date(timeStartString).toISOString();
    const timeEnd = new Date(timeEndString).toISOString();

    const shift = {
      id: shiftInfo.id,
      timeStart: timeStart,
      timeEnd: timeEnd,
    };
    dispatch(asyncEditShift(shift));
    dispatch(updateActiveShiftInfo(shift));
    closeModule();
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
              defaultValue={shiftInfo.timeStart}
              onChange={(e) => {
                setShiftInfo({
                  ...shiftInfo,
                  timeStart: e.target.value,
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
              defaultValue={shiftInfo.timeEnd}
              onChange={(e) => {
                setShiftInfo({
                  ...shiftInfo,
                  timeEnd: e.target.value,
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
