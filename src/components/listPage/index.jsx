import { useEffect, useContext, useState } from "react";
import { AppUIContext } from "../../App";

import "./listPage.css";
import plus from "../../svg/plus.svg";
import ShiftListItem from "./shiftListItem/shiftListItem";
import ShiftListInfo from "./shiftListInfo";
import { useSelector } from "react-redux";
import ListSkeleton from "../../skeleton/listSkeleton";

const ListPage = () => {
  //UI STATE
  const { changePageName } = useContext(AppUIContext);
  useEffect(() => {
    changePageName("My Shifts");
  }, []);

  //DATA

  const { status } = useSelector((state) => state.shifts);

  const shiftsState = useSelector((state) => state.shifts.shifts);
  const [shifts, setShifts] = useState(shiftsState);
  useEffect(() => {
    setShifts(shiftsState);
    console.log("changed");
  }, []);

  const renderShifts = () => {
    if (shifts) {
      return shifts.map((shift) => {
        return <ShiftListItem props={shift} key={shift.id} />;
      });
    }
  };

  return (
    <div className="list-page--container" id="list-container">
      {status === "loading" && <ListSkeleton />}
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
