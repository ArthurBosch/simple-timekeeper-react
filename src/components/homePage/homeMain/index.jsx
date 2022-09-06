import "./homeMain.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppDataContext } from "../../../App";

const HomeMain = () => {
  const { createNewShift, toggleShiftIsActive } = useContext(AppDataContext);

  const runShift = () => {
    createNewShift();
    toggleShiftIsActive(true);
  };

  return (
    <div className="main" id="id">
      <div className="preset-container">
        <label className="preset-label" htmlFor="preset">
          Preset:
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
      <Link to="/shift" className="start-shift-link">
        <button
          className="start-shift-button"
          onClick={() => {
            runShift();
          }}
        >
          Start Shift
        </button>
      </Link>
    </div>
  );
};

export default HomeMain;
