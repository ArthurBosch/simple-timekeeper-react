import { useEffect, useContext } from "react";
import { AppDataContext, AppUIContext } from "../../App";
import { useState } from "react";

import "./listPage.css";
import plus from "../../svg/plus.svg";
import ShiftListItem from "./shiftListItem/shiftListItem";
import ShiftListInfo from "./shiftListInfo";
import { PORT } from "../../vars.js";

const ListPage = () => {
  //UI STATE
  const [shiftInfo, toggleShiftInfo] = useState(true);
  const { changePageName } = useContext(AppUIContext);
  const [shiftData, setShiftData] = useState(null);
  useEffect(() => {
    changePageName("My Shifts");
  }, []);

  const toggleShiftInfoFunc = (singleShiftData) => {
    if (shiftData && singleShiftData.id === shiftData.id && shiftInfo) {
      toggleShiftInfo(false);
    } else {
      setShiftData(singleShiftData);
      toggleShiftInfo(true);
    }
  };

  //DATA

  const { data } = useContext(AppDataContext);
  const [shiftsData, updateShiftsData] = useState(data);

  useEffect(() => {
    updateShiftsData(data);
    if (!shiftsData) {
      fetch(`${PORT}/shifts`)
        .then((res) => res.json())
        .then((data) => updateShiftsData(data.reverse()));
    }
  }, []);

  const renderShifts = () => {
    if (shiftsData) {
      return shiftsData.map((shift) => {
        return (
          <ShiftListItem
            props={shift}
            toggleShiftInfoFunc={toggleShiftInfoFunc}
            shiftInfo={shiftInfo}
            key={shift.id}
          />
        );
      });
    }
  };

  return (
    <div className="list-page--container" id="list-container">
      <div className="add-shift">
        <button className="add-shift--button">
          Add shift manually
          <img src={plus} className="plus-sign" />
        </button>
      </div>
      <div className="shift-list">{renderShifts()}</div>
      <ShiftListInfo shiftData={shiftData} shiftInfo={shiftInfo} />
    </div>
  );
};

export default ListPage;
