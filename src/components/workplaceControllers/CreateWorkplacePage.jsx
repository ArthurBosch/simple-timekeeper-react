import { useRef } from "react";
import { useState } from "react";
import "./createWorkplacePage.scss";
import close from "../../svg/close-white.svg";
import { useDispatch } from "react-redux";
import { asyncCreateWorkplace } from "../../store-toolkit/userSlice";
import { useNavigate } from "react-router-dom";

const CreateWorkplace = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [workplace, setWorkplace] = useState({
    name: "Default",
    wage: 0,
    wageType: "hour",
    currency: "CAD",
  });

  const warningConainer = useRef();
  const workplaceWrapper = useRef();

  const toggleWarning = () => {
    warningConainer.current.classList.toggle("_hidden");
    workplaceWrapper.current.classList.toggle("_scrollable");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncCreateWorkplace(workplace));
    navigate("/");
  };
  return (
    <main ref={workplaceWrapper} className="workplace-wrapper">
      <section className="workplace-intro--section">
        <h1>Workplace Description</h1>
        <p>
          We need this info to provide you detailed statistics. We do not share
          this information.{" "}
          <button
            onClick={() => {
              toggleWarning();
            }}
          >
            Press here if you'd wish not to fill this form
          </button>
        </p>
        <div
          ref={warningConainer}
          className="workplace-intro--warning-block _hidden"
        >
          <h4>If you wish to skip this step:</h4>
          <img onClick={toggleWarning} src={close}></img>
          <ul className="warning-list-popup">
            <li className="warning-list">
              <span>
                Your workplace will be named as <strong>Default.</strong>
              </span>
            </li>
            <li>
              <span>Any wage calculations will be unavaliable.</span>
            </li>
            <li>
              <span>
                Any other issues may be expected due to early stages of
                development.
              </span>
            </li>
            <li>
              <span>You might not be able to change it later</span>
            </li>
          </ul>
          <div className="button-container">
            <button>Got it, proceed!</button>
          </div>
        </div>
      </section>
      <section className="workplace-inputs--section">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <fieldset
            onChange={(e) => {
              setWorkplace({ ...workplace, wageType: e.target.value });
            }}
            defaultValue={workplace.wageType}
          >
            <legend>How do you get paid?</legend>
            <label htmlFor="hour">
              Hourly
              <input
                className="input-radio"
                type="radio"
                name="workplace-inputs--input-checkbox"
                value="hour"
                defaultChecked
              />
            </label>
            <label htmlFor="day">
              Daily
              <input
                className="input-radio"
                type="radio"
                name="workplace-inputs--input-checkbox"
                value="day"
              />
            </label>
            <label htmlFor="month">
              Monthly
              <input
                className="input-radio"
                type="radio"
                name="workplace-inputs--input-checkbox"
                value="month"
              />
            </label>
          </fieldset>
          <label>
            <input
              type="text"
              name="workplace-inputs--input-name"
              placeholder="work name"
              required
              onChange={(e) => {
                setWorkplace({ ...workplace, name: e.target.value });
              }}
            />
            <input
              type="number"
              name="workplace-inputs--input-wage"
              placeholder="your wage"
              required
              onChange={(e) => {
                setWorkplace({ ...workplace, wage: parseInt(e.target.value) });
              }}
            />
          </label>
          <label className="currency-select">
            Currency:
            <select
              value={workplace.currency}
              onChange={(e) => {
                setWorkplace({ ...workplace, currency: e.target.value });
              }}
            >
              <option value="RUB">Russian Ruble</option>
              <option value="NIS">Israeli Shekel</option>
              <option value="CAD">Canadian Dollar</option>
              <option value="USD">US Dollar</option>
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
};

export default CreateWorkplace;
