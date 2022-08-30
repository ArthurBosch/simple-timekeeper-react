import menu from "../../svg/menu.svg";
import "./header.css";

const Header = ({ toggleMenuFunc }) => {
  return (
    <div className="header">
      <div className="header--inner-container">
        <div className="text-container">Start Shift</div>
        <div
          className="nav-container"
          onClick={() => {
            toggleMenuFunc();
          }}
          id="navIcon"
        >
          <img className="menu-icon" src={menu} alt="menu-icon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
