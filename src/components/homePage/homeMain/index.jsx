import "./homeMain.css";
import { setNewShift } from "../../../store-toolkit/shiftSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeActiveWorkplace } from "../../../store-toolkit/userSlice";

const HomeMain = ({ toggleShiftInfo }) => {
  const dispatch = useDispatch();
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const { workplaces, activeWorkplace } = useSelector(
    (state) => state.userInfo
  );
  const [activeWorkplaceState, setActiveWorkplace] = useState(null);

  useEffect(() => {
    setActiveWorkplace(activeWorkplace);
  }, [activeWorkplace]);

  const renderOptions = () => {
    return workplaces.map((item) => {
      return (
        <option
          className="preset-option"
          value={item.name}
          key={item.id}
          data-item={item.id}
        >
          {item.name}
        </option>
      );
    });
  };

  const handleChange = (e) => {
    const item = workplaces.find((item) => item.name === e.target.value);
    setActiveWorkplace(item);
    dispatch(changeActiveWorkplace(item));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart < touchEnd) {
      toggleShiftInfo(false);
    } else {
      toggleShiftInfo(true);
    }
  };

  return (
    <div
      className="main"
      id="id"
      onTouchStart={(e) => {
        handleTouchStart(e);
      }}
      onTouchMove={(e) => {
        handleTouchMove(e);
      }}
      onTouchEnd={(e) => {
        handleTouchEnd();
      }}
    >
      <div className="preset-container">
        <label className="preset-label" htmlFor="preset">
          Shift at:
        </label>
        <br />
        <select
          className="preset-select"
          name="preset"
          options={workplaces.name}
          defaultValue={activeWorkplaceState}
          onChange={(e) => {
            handleChange(e);
          }}
        >
          {renderOptions()}
        </select>
      </div>
      <button
        className="start-shift-button"
        onClick={() => {
          dispatch(setNewShift(activeWorkplaceState, ...Array(3)));
        }}
      >
        Start Shift
      </button>
    </div>
  );
};

export default HomeMain;
