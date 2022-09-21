import "./homePage.css";
import HomeFooter from "./homeFooter";
import HomeMain from "./homeMain";
import { useState, useContext, useEffect } from "react";
import { AppUIContext } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import { checkLocalActiveShift } from "../../store-toolkit/shiftSlice";
import ShiftPage from "../shiftPage";

const HomePage = ({}) => {
  const [shiftInfo, toggleShiftInfo] = useState(false);
  const { changePageName } = useContext(AppUIContext);
  useEffect(() => {
    changePageName("Start Shift");
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkLocalActiveShift());
  }, []);
  const { activeShiftStatus } = useSelector((state) => state.shifts);

  return (
    <>
      {activeShiftStatus === "active" && <ShiftPage />}
      {activeShiftStatus !== "active" && (
        <div
          className="page-container"
          onClick={(e) => {
            if (e.target.closest("#footer")) return;
            toggleShiftInfo(false);
          }}
        >
          <HomeMain shiftInfo={shiftInfo} toggleShiftInfo={toggleShiftInfo} />
          <HomeFooter shiftInfo={shiftInfo} toggleShiftInfo={toggleShiftInfo} />
        </div>
      )}
    </>
  );
};

export default HomePage;
