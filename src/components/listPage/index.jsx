import "./listPage.css";

import plus from "../../svg/plus.svg";
import ShiftListItem from "./shiftListItem/shiftListItem";
import ShiftListInfo from "./shiftListInfo";
import DeleteModule from "./deleteModule/DeleteModule";
import ListSkeleton from "../../skeleton/listSkeleton";
import AddShift from "./addShift/AddShift";
import EditShift from "./editShift/EditShift";

import { useEffect, useContext } from "react";
import { AppUIContext } from "../../App";

import { useSelector, useDispatch } from "react-redux";
import {
  toggleAddModuleStatus,
  toggleShiftInfo,
} from "../../store-toolkit/shiftInfoSlice";

const ListPage = () => {
  const dispatch = useDispatch();
  //UI STATE
  const { changePageName } = useContext(AppUIContext);
  useEffect(() => {
    changePageName("My Shifts");
    return function cleanup() {
      dispatch(toggleShiftInfo());
    };
  }, []);

  //DATA

  const { status, shifts } = useSelector((state) => state.shifts);
  const {
    shiftInfoStatus,
    deleteModuleStatus,
    addModuleStatus,
    editModuleStatus,
    activeShiftInfo,
  } = useSelector((state) => state.shiftInfo);

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
            dispatch(toggleAddModuleStatus());
          }}
        >
          Add shift manually
          <img src={plus} className="plus-sign" />
        </button>
      </div>
      <div className="shift-list">{renderShifts()}</div>
      {activeShiftInfo && <ShiftListInfo />}
      {deleteModuleStatus && <DeleteModule />}
      {addModuleStatus && <AddShift />}
      {editModuleStatus && <EditShift />}
    </div>
  );
};

export default ListPage;
