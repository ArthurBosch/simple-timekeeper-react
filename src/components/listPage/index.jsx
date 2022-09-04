import { useEffect, useContext } from "react";
import { AppContext } from "../../App";
import "./listPage.css";
import plus from "../../svg/plus.svg";
import ShiftListItem from "./shiftListItem/shiftListItem";
import db from "../../db.json";

const ListPage = () => {
  const { changePageName } = useContext(AppContext);
  useEffect(() => {
    changePageName("My Shifts");
  });

  const shifts = db.shifts;

  const renderShifts = () => {
    return shifts.map((shift) => {
      return <ShiftListItem props={shift} key={shift.id} />;
    });
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
    </div>
  );
};

export default ListPage;
