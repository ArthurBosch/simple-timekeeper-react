import { useEffect, useContext, useState } from "react";
import { AppUIContext } from "../../App";

import "./listPage.css";
import plus from "../../svg/plus.svg";
import ShiftListItem from "./shiftListItem/shiftListItem";
import ShiftListInfo from "./shiftListInfo";
import DeleteModule from "./deleteModule/DeleteModule";
import { useSelector, useDispatch } from "react-redux";
import ListSkeleton from "../../skeleton/listSkeleton";
import AddShift from "./addShift/AddShift";
import {
  toggleDeleteModuleStatus,
  toggleEditModuleStatus,
  toggleShiftInfo,
} from "../../store-toolkit/shiftInfoSlice";

const ListPage = () => {
  //UI STATE
  const { changePageName } = useContext(AppUIContext);
  useEffect(() => {
    changePageName("My Shifts");
  }, []);

  const { deleteModuleStatus, editModuleStatus } = useSelector(
    (state) => state.shiftInfo
  );

  //DATA

  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.shifts);
  const { shiftInfoStatus } = useSelector((state) => state.shiftInfo);
  const shifts = useSelector((state) => state.shifts.shifts);

  const renderShifts = () => {
    if (shifts) {
      return shifts.map((shift) => {
        return <ShiftListItem props={shift} key={shift.id} />;
      });
    }
  };

  return (
    <div
      className="list-page--container"
      id="listContainer"
      style={
        shiftInfoStatus ? { marginBottom: "42vh" } : { marginBottom: "10px" }
      }
    >
      {status === "loading" && <ListSkeleton />}
      <div className="add-shift">
        <button
          className="add-shift--button"
          onClick={() => {
            dispatch(toggleEditModuleStatus());
            dispatch(toggleShiftInfo());
          }}
        >
          Add shift manually
          <img src={plus} className="plus-sign" />
        </button>
      </div>
      <div className="shift-list">{renderShifts()}</div>
      <ShiftListInfo />
      {deleteModuleStatus && <DeleteModule />}
      {editModuleStatus && <AddShift />}
    </div>
  );
};

export default ListPage;
