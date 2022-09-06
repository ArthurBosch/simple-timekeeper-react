import { useEffect, useContext } from "react";
import { AppDataContext, AppUIContext } from "../../App";
import { useState } from "react";

import "./listPage.css";
import plus from "../../svg/plus.svg";
import ShiftListItem from "./shiftListItem/shiftListItem";
import ShiftListInfo from "./shiftListInfo";

const ListPage = () => {
  //UI STATE
  const [shiftInfo, toggleShiftInfo] = useState(true);
  const { changePageName } = useContext(AppUIContext);
  useEffect(() => {
    changePageName("My Shifts");
  }, []);

  const toggleShiftInfoFunc = () => {
    if (shiftInfo) {
      toggleShiftInfo(false);
    } else {
      toggleShiftInfo(true);
    }
  };

  //DATA
  const { data } = useContext(AppDataContext);
  const renderShifts = () => {
    if (data) {
      return data.reverse().map((shift) => {
        return (
          <ShiftListItem
            props={shift}
            toggleShiftInfoFunc={toggleShiftInfoFunc}
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
      {shiftInfo && <ShiftListInfo />}
    </div>
  );
};

export default ListPage;
