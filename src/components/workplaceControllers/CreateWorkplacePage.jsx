import "./createWorkplacePage.scss";

const CreateWorkplace = () => {
  return (
    <div className="workplace-wrapper">
      <section className="workplace-intro--section">
        <h1>Where do you work?</h1>
        <p>
          In case you work multiple jobs, it would be easier to understand your
          shifts
        </p>
        <div className="workplace-intro--warning-block">
          <h4>If you wish to skip this step:</h4>
          <ul className="warning-list-popup">
            <li className="warning-list">
              <span>Your workplace will be named as Default.</span>
            </li>
            <li>
              <span>Any wage calculations will be unavalidable.</span>
            </li>
            <li>
              <span>
                Any other issues may be expected due to early stages of
                development.
              </span>
            </li>
          </ul>
        </div>
      </section>
      <section className="workplace-inputs--section">
        <form>
          <label htmlFor="workplace-inputs--input-name">Workplace name:</label>
          <input type="text" name="workplace-inputs--input-name" />
          <label htmlFor="workplace-inputs--input-wage">Your wage:</label>
          <input type="number" name="workplace-inputs--input-wage" />
          <fieldset>
            <label htmlFor="workplace-inputs--input-checkbox-hour">
              Hour Rate
            </label>
            <input
              className="input-radio"
              type="radio"
              name="workplace-inputs--input-checkbox-hour"
              value="Hour rate"
            />
            <label htmlFor="workplace-inputs--input-checkbox-day">
              Day rate
            </label>
            <input
              className="input-radio"
              type="radio"
              name="workplace-inputs--input-checkbox"
              value="Day rate"
            />
            <label htmlFor="workplace-inputs--input-checkbox-month">
              Month Rate
            </label>
            <input
              className="input-radio"
              type="radio"
              name="workplace-inputs--input-checkbox"
              value="Month rate"
            />
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default CreateWorkplace;
