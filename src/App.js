import "./App.css";
import "./components/header/header.css";
import Header from "./components/header";
import HomePage from "./components/homePage";
import Navigation from "./components/nav";
import ShiftPage from "./components/shiftPage";
import ListPage from "./components/listPage";
import Loader from "./skeleton/loader";
import { useState, createContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchShifts } from "./store-toolkit/shiftSlice";
import { checkLocalActiveShift } from "./store-toolkit/shiftSlice";
import Auth from "./components/authPage/Auth";
import CreateWorkplace from "./components/workplaceControllers/CreateWorkplacePage";
import { asyncCheckAuth, checkWorkplaces } from "./store-toolkit/userSlice";
import SettingsPage from "./components/settingsPage/SettingsPage";
import User from "./components/userPage/User";
import Contact from "./components/contactPage/Contact";

export const AppUIContext = createContext(null);

function App() {
  //DATA
  const dispatch = useDispatch();
  const { loggedIn, noWorkplace } = useSelector((state) => state.userInfo);

  useEffect(() => {
    dispatch(asyncCheckAuth());
    if (loggedIn) {
      dispatch(checkWorkplaces());
      dispatch(fetchShifts());
    }
  }, [loggedIn]);

  //UI STATE
  const [menuState, toggleMenu] = useState(false);
  const { status } = useSelector((state) => state.shifts);
  const { activeShiftStatus } = useSelector((state) => state.shifts);
  useEffect(() => {
    dispatch(checkLocalActiveShift());
  }, []);
  const toggleMenuFunc = () => {
    toggleMenu(!menuState);
  };

  const [pageName, changePageName] = useState("Start Shift");

  if (loggedIn) {
    return (
      <AppUIContext.Provider
        value={{ changePageName, pageName, menuState, toggleMenuFunc }}
      >
        <Router>
          <div className="App">
            {!noWorkplace && <Header />}
            {!noWorkplace && <Navigation />}
            <Routes>
              <Route
                path="/"
                element={
                  noWorkplace ? (
                    <CreateWorkplace />
                  ) : activeShiftStatus ? (
                    <ShiftPage />
                  ) : (
                    <HomePage />
                  )
                }
              />
              <Route path="/list" element={<ListPage />} />
              <Route path="/createWorkplace" element={<CreateWorkplace />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/user" element={<User />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            {status === "loading" && <Loader />}
          </div>
        </Router>
      </AppUIContext.Provider>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
