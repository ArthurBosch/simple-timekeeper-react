import home from "../../svg/home.svg";
import list from "../../svg/list.svg";
import calendar from "../../svg/calendar.svg";
import stats from "../../svg/stats.svg";
import settings from "../../svg/settings.svg";

import { Link } from "react-router-dom";

import "./nav.css";

const Navigation = ({ menuState, toggleMenuFunc }) => {
  return (
    <div className="overlay-container">
      <div
        id="overlay"
        onClick={(e) => {
          if (e.target.closest("ul")) toggleMenuFunc();
          if (e.target.closest("#navigation")) return;
          toggleMenuFunc();
        }}
        className={menuState ? "overlay" : ""}
      >
        <nav
          className="side-navigation"
          style={menuState ? { right: "0vw" } : { right: "-50vw" }}
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
              <a className="nav-link">
                <img src={settings} alt="settings icon" />
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
