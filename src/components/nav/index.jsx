import home from "../../svg/home.svg";
import list from "../../svg/list.svg";
import calendar from "../../svg/calendar.svg";
import stats from "../../svg/stats.svg";
import settings from "../../svg/settings.svg";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppUIContext } from "../../App";

import "./nav.scss";
import { useState } from "react";

const Navigation = () => {
  const { menuState, toggleMenuFunc } = useContext(AppUIContext);
  const [touchStart, setTouchStart] = useState({
    x: null,
    y: null,
  });

  const [touchEnd, setTouchEnd] = useState({
    x: null,
    y: null,
  });

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
    if (touchEnd.x - 75 > touchStart.x) {
      toggleMenuFunc();
      return;
    }
  };

  return (
    <div className="overlay-container">
      <div
        id="overlay"
        onClick={(e) => {
          if (e.target.closest("ul")) toggleMenuFunc();
          if (e.target.closest("#navigation")) return;
          toggleMenuFunc();
        }}
        onTouchStart={(e) => {
          handleTouchStart(e);
        }}
        onTouchMove={(e) => {
          handleTouchMove(e);
        }}
        onTouchEnd={() => {
          handleTouchEnd();
        }}
        className={menuState ? "overlay" : ""}
      >
        <nav
          className="side-navigation"
          style={menuState ? { right: "0vw" } : { right: "-65vw" }}
          id="navigation"
        >
          <ul>
            <li className="nav-li">
              <Link to="/" className="nav-link">
                <img src={home} alt="home icon" />
                Home
              </Link>
            </li>
            <li className="nav-li">
              <Link to="/list" className="nav-link">
                <img src={list} alt="list icon" />
                List
              </Link>
            </li>
            <li className="nav-li">
              <a className="nav-link">
                <img src={calendar} alt="calendar icon" />
                Calendar
              </a>
            </li>
            <li className="nav-li">
              <a className="nav-link">
                <img src={stats} alt="stats icon" />
                Stats
              </a>
            </li>
            <li className="nav-li">
              <Link to="/settings" className="nav-link">
                <img src={settings} alt="settings icon" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
