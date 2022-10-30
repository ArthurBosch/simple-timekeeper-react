import "./homeMain.css";
import { setNewShift } from "../../../store-toolkit/shiftSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AppUIContext } from "../../../App";

import { changeActiveWorkplace } from "../../../store-toolkit/userSlice";

const HomeMain = ({ toggleShiftInfo }) => {
  const { toggleMenuFunc } = useContext(AppUIContext);
  const dispatch = useDispatch();

  const [touchStart, setTouchStart] = useState({
    x: null,
    y: null,
  });

  const [touchEnd, setTouchEnd] = useState({
    x: null,
    y: null,
  });
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
    setTouchStart({
      y: e.targetTouches[0].clientY,
      x: e.targetTouches[0].clientX,
    });
  };

  const handleTouchMove = (e) => {
    setTouchEnd({
      y: e.targetTouches[0].clientY,
      x: e.targetTouches[0].clientX,
    });
  };

  const handleTouchEnd = () => {
    if (touchStart.y - 75 > touchEnd.y) {
      toggleShiftInfo(true);
      return;
    }

    if (touchEnd.y - 75 > touchStart.y) {
      toggleShiftInfo(false);
      return;
    }

    if (touchStart.x - 75 > touchEnd.x) {
      toggleMenuFunc();
      return;
    }

    if (touchEnd.x - 75 > touchStart.x) {
      toggleMenuFunc();
      return;
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
      onTouchEnd={() => {
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
