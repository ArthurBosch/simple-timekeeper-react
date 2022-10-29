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
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchShifts } from "./store-toolkit/shiftSlice";
import { checkLocalActiveShift } from "./store-toolkit/shiftSlice";
import Auth from "./components/authPage/Auth";
import CreateWorkplace from "./components/workplaceControllers/CreateWorkplacePage";
import { checkAuth, checkWorkplaces } from "./store-toolkit/userSlice";
import SettingsPage from "./components/settingsPage/SettingsPage";

export const AppUIContext = createContext(null);

function App() {
  //DATA
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShifts());
    dispatch(checkAuth());
    dispatch(checkWorkplaces());
  }, [dispatch]);

  //UI STATE
  const [menuState, toggleMenu] = useState(false);
  const { status } = useSelector((state) => state.shifts);
  const { activeShiftStatus } = useSelector((state) => state.shifts);
  const { loggedIn, noWorkplace } = useSelector((state) => state.userInfo);
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
            <Header />
            <Navigation />
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
            </Routes>
            {status === "loading" && <Loader />}
            {/* {noWorkplace && <CreateWorkplace />} */}
            {/* {noWorkplace && <Navigate to="/createWorkplace" />} */}
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
