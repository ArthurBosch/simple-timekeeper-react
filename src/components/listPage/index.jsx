import { useEffect, useContext } from "react";
import { AppUIContext } from "../../App";
import { useState } from "react";

import "./listPage.css";
import plus from "../../svg/plus.svg";
import ShiftListItem from "./shiftListItem/shiftListItem";
import ShiftListInfo from "./shiftListInfo";
import { useSelector } from "react-redux";

const ListPage = () => {
  //UI STATE
  const { changePageName } = useContext(AppUIContext);
  useEffect(() => {
    changePageName("My Shifts");
  }, []);

  //DATA

  const shifts = useSelector((state) => state.shifts.shifts);

  const renderShifts = () => {
    if (shifts) {
      return shifts.map((shift) => {
        return <ShiftListItem props={shift} key={shift.id} />;
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
      <ShiftListInfo />
    </div>
  );
};

export default ListPage;
