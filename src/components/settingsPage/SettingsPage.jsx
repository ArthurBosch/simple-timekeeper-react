import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { AppUIContext } from "../../App";
import "./settingsPage.scss";

const SettingsPage = () => {
  const { changePageName } = useContext(AppUIContext);
  useEffect(() => {
    changePageName("Settings");
  }, []);
  return (
    <main className="settings-main">
      <ul>
        <li>
          <Link to="/createWorkplace">Create workplace</Link>
        </li>
        <li>
          <Link to="/user">User</Link>
        </li>
        <li>
          <Link to="/contact">Contact Me</Link>
        </li>
      </ul>
      <div className="errors"></div>
    </main>
  );
};

export default SettingsPage;
