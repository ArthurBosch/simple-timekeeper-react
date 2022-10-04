import "./homeMain.css";
import { setNewShift } from "../../../store-toolkit/shiftSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const HomeMain = ({ toggleShiftInfo }) => {
  const dispatch = useDispatch();
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart < touchEnd) {
      toggleShiftInfo(false);
      // console.log("up");
    } else {
      toggleShiftInfo(true);
      // console.log("down");
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
        <select className="preset-select" name="preset">
          <option className="preset-option" value="sheraton">
            Sheraton
          </option>
          <option className="preset-option" value="aroma">
            Aroma
          </option>
          <option className="preset-option" value="extra">
            Extra
          </option>
        </select>
      </div>
      <button
        className="start-shift-button"
        onClick={() => {
          dispatch(setNewShift());
        }}
      >
        Start Shift
      </button>
    </div>
  );
};

export default HomeMain;
