import "./homeMain.css";
import { setNewShift } from "../../../store-toolkit/shiftSlice";
import { useDispatch } from "react-redux";

const HomeMain = () => {
  const dispatch = useDispatch();

  const runShift = () => {
    dispatch(setNewShift());
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
      <button
        className="start-shift-button"
        onClick={() => {
          runShift();
        }}
      >
        Start Shift
      </button>
    </div>
  );
};

export default HomeMain;
