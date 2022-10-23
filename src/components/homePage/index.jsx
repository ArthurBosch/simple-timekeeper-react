import "./homePage.css";

import HomeFooter from "./homeFooter";
import HomeMain from "./homeMain";

import { useState, useContext, useEffect } from "react";
import { AppUIContext } from "../../App";

const HomePage = () => {
  const [shiftInfo, toggleShiftInfo] = useState(false);
  const { changePageName } = useContext(AppUIContext);
  useEffect(() => {
    changePageName("Start Shift");
  });

  return (
    <div
      className="page-container"
      onClick={(e) => {
        if (e.target.closest("#footer")) return;
        toggleShiftInfo(false);
      }}
    >
      <HomeMain shiftInfo={shiftInfo} toggleShiftInfo={toggleShiftInfo} />
      {/* <HomeFooter shiftInfo={shiftInfo} toggleShiftInfo={toggleShiftInfo} /> */}
    </div>
  );
};

export default HomePage;
