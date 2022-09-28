import { useEffect } from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditModuleStatus } from "../../../store-toolkit/shiftInfoSlice";
import { asyncAddShift } from "../../../store-toolkit/shiftSlice";
import "./addShift.css";
const AddShift = () => {
  const dispatch = useDispatch();
  const container = useRef();

  const [shift, updateShift] = useState({
    date: new Date().toLocaleDateString("en-CA"),
    timeStart: new Date()
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
      .slice(0, 5),
    timeFinish: new Date()
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
      .slice(0, 5),
  });

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
        "add-shift--container add-shift--container-active";
    }, 100);
  };

  const closeModule = () => {
    container.current.className = "add-shift--container";
    setTimeout(() => {
      dispatch(toggleEditModuleStatus());
    }, 200);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const timeStartString = `${shift.date} ${shift.timeStart}`;
    const timeEndString = `${shift.date} ${shift.timeFinish}`;
    const timeStart = new Date(timeStartString).toISOString();
    const timeEnd = new Date(timeEndString).toISOString();
    const id = new Date().getTime();
    const shiftToSubmit = {
      id: id,
      startTime: timeStart,
      endTime: timeEnd,
    };
    // console.log(shiftToSubmit);
    dispatch(asyncAddShift(shiftToSubmit));
    closeModule();
  };
  return (
    <>
      <div
        className="add-shift--overlay"
        onClick={() => {
          closeModule();
        }}
      ></div>
      <div className="add-shift--container" ref={container}>
        <div className="add-shift--header-container">
          <h1 className="add-shift--header">Add shift</h1>
        </div>
        <form
          className="add-shift--form"
          onSubmit={(e) => {
            submitForm(e);
          }}
        >
          <div className="add-shift--input-container">
            <label htmlFor="date-input">Date</label>
            <input
              type="date"
              name="date-input"
              className="add-shift--date"
              defaultValue={shift.date}
              onChange={(e) => {
                updateShift({
                  ...shift,
                  date: e.target.value,
                });
              }}
            ></input>
          </div>
          <div className="add-shift--input-container">
            <label htmlFor="time-start-input">Time started</label>
            <input
              type="time"
              name="time-start-input"
              className="edit-shift--time"
              defaultValue={shift.timeStart}
              onChange={(e) => {
                updateShift({
                  ...shift,
                  timeStart: e.target.value,
                });
              }}
            ></input>
          </div>
          <div className="add-shift--input-container">
            <label htmlFor="time-end-input">Time finished</label>
            <input
              type="time"
              name="time-end-input"
              className="edit-shift--time"
              defaultValue={shift.timeFinish}
              min={shift.timeStart}
              onChange={(e) => {
                updateShift({
                  ...shift,
                  timeFinish: e.target.value,
                });
              }}
            ></input>
          </div>
          <div className="add-shift--controls">
            <button
              className="add-shift--button-cancel"
              onClick={(e) => {
                e.preventDefault();
                closeModule();
              }}
            >
              {" "}
              Cancel{" "}
            </button>
            <button className="add-shift--button-submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddShift;
