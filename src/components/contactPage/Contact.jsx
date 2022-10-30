import { useRef } from "react";
import "./contact.scss";
import telegram from "../../svg/telegram.svg";
import linkedin from "../../svg/linkedin.svg";

const Contact = () => {
  const reportIssueContainer = useRef();
  const toggleReportIssue = () => {
    reportIssueContainer.current.classList.toggle("_hidden");
  };
  return (
    <main className="contact-main">
      <h1>Hello friend!</h1>
      <p>Thanks for using this app</p>
      {/* <div className="report-issue">
        <h3
          onClick={() => {
            toggleReportIssue();
          }}
        >
          Report Issue:
        </h3>
        <div
          ref={reportIssueContainer}
          className="report-issue-form--container _hidden"
        >
          <form>
            <label>
              Your name:
              <input type="text"></input>
            </label>
            <label>
              Your email or any other contact detail:
              <input type="text"></input>
            </label>
            <label>
              Your issue:
              <input type="textarea"></input>
            </label>
            <div className="button-container">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div> */}
      <div className="get-in-touch">
        <h3>Get in touch:</h3>
        <a href="https://t.me/champagneboi">
          <img src={telegram}></img>
        </a>
        <a href="https://www.linkedin.com/in/arthur-bosch-dev/">
          <img src={linkedin}></img>
        </a>
      </div>
    </main>
  );
};

export default Contact;
