import { useEffect, useContext } from "react";
import { AppContext } from "../../App";
import "./listPage.css";
import plus from "../../svg/plus.svg";

const ListPage = () => {
  const { changePageName } = useContext(AppContext);
  useEffect(() => {
    changePageName("My Shifts");
  });
  return (
    <div className="list-page--container" id="list-container">
      <div className="add-shift">
        <button className="add-shift--button">
          Add shift manually
          <img src={plus} className="plus-sign" />
        </button>
      </div>
      <div className="shift-list">
        <div className="shift-list--item">
          <div className="shift-list--date">
            <h4 className="date-number">13</h4>
            <span className="date-day">sat</span>
          </div>
          <div className="shift-list--time">
            <span className="time-start">12:15</span> -
            <span className="time-end">21:30</span>
          </div>
          <div className="shift-list--info">
            <button className="info-button">i</button>
          </div>
        </div>
        <div className="shift-list--item">
          <div className="shift-list--date">
            <h4 className="date-number">12</h4>
            <span className="date-day">fri</span>
          </div>
          <div className="shift-list--time">
            <span className="time-start">12:15</span> -
            <span className="time-end">21:30</span>
          </div>
          <div className="shift-list--info">
            <button className="info-button">i</button>
          </div>
        </div>
        <div className="shift-list--item">
          <div className="shift-list--date">
            <h4 className="date-number">11</h4>
            <span className="date-day">thurs</span>
          </div>
          <div className="shift-list--time">
            <span className="time-start">12:15</span> -
            <span className="time-end">21:30</span>
          </div>
          <div className="shift-list--info">
            <button className="info-button">i</button>
          </div>
        </div>
        <div className="shift-list--item">
          <div className="shift-list--date">
            <h4 className="date-number">10</h4>
            <span className="date-day">wed</span>
          </div>
          <div className="shift-list--time">
            <span className="time-start">12:15</span> -
            <span className="time-end">21:30</span>
          </div>
          <div className="shift-list--info">
            <button className="info-button">i</button>
          </div>
        </div>
        <div className="shift-list--item">
          <div className="shift-list--date">
            <h4 className="date-number">9</h4>
            <span className="date-day">tues</span>
          </div>
          <div className="shift-list--time">
            <span className="OFF">OFF</span>
          </div>
          <div className="shift-list--info">
            <button className="info-button">i</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
