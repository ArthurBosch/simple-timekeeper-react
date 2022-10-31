import "./addShift.scss";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAddModuleStatus,
  toggleShiftInfo,
} from "../../../store-toolkit/shiftInfoSlice";
import { asyncAddShift } from "../../../store-toolkit/shiftSlice";
import { convert12to24 } from "../../../methods/methods";

const AddShift = () => {
  const dispatch = useDispatch();
  const container = useRef();

  const { workplaces, activeWorkplace } = useSelector(
    (state) => state.userInfo
  );

  const renderOptions = () => {
    return workplaces.map((workplace) => {
      return (
        <option value={workplace.name} key={workplace.id}>
          {workplace.name}
        </option>
      );
    });
  };

  const [shift, updateShift] = useState({
    date: new Date().toLocaleDateString("en-CA"),
    timeStart: convert12to24(new Date().toLocaleTimeString()),
    timeFinish: convert12to24(new Date().toLocaleTimeString()),
    workplace: activeWorkplace,
  });

  const handleSelect = (e) => {
    const chosenWorkplace = workplaces.find(
      (workplace) => workplace.name === e.target.value
    );
    updateShift({
      ...shift,
      workplace: chosenWorkplace,
    });
  };

  useEffect(() => {
    openModule();
    document.querySelector(".list-page--container").style.overflowY = "hidden";
    return function cleanup() {
      document.querySelector(".list-page--container").style.overflowY =
        "scroll";
      dispatch(toggleShiftInfo());
    };
  }, []);

  const openModule = () => {
    dispatch(toggleShiftInfo());
    setTimeout(() => {
      container.current.className =
        "add-shift--container add-shift--container-active";
    }, 100);
  };

  const closeModule = () => {
    container.current.className = "add-shift--container";
    setTimeout(() => {
      dispatch(toggleAddModuleStatus());
    }, 200);
    dispatch(toggleShiftInfo());
  };

  const submitForm = (e) => {
    e.preventDefault();
    const timeStartString = `${shift.date}T${shift.timeStart}:00`;
    console.log(timeStartString);
    const timeEndString = `${shift.date}T${shift.timeFinish}:00`;
    const timeStart = new Date(timeStartString).toISOString();
    const timeEnd = new Date(timeEndString).toISOString();
    const shiftToSubmit = {
      timeStart: timeStart,
      timeEnd: timeEnd,
      workplaceId: shift.workplace.id,
      wage: shift.workplace.wage,
    };
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
          <div className="add-shift--input-container">
            <label htmlFor="workplace-select">Workplace:</label>
            <select
              onChange={(e) => {
                handleSelect(e);
              }}
            >
              {renderOptions()}
            </select>
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
