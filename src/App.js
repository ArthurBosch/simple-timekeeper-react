import "./App.css";
import "./components/header/header.css";
import Header from "./components/header";
import HomePage from "./components/homePage";
import Navigation from "./components/nav";
import ShiftPage from "./components/shiftPage";
import ListPage from "./components/listPage";
import Loader from "./skeleton/loader";
import { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchShifts } from "./store-toolkit/shiftSlice";
import { checkLocalActiveShift } from "./store-toolkit/shiftSlice";

export const AppUIContext = createContext(null);

function App() {
  //DATA
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShifts());
  }, [dispatch]);

  //UI STATE
  const [menuState, toggleMenu] = useState(false);
  const { status } = useSelector((state) => state.shifts);
  const { activeShiftStatus } = useSelector((state) => state.shifts);
  useEffect(() => {
    dispatch(checkLocalActiveShift());
  }, []);
  const toggleMenuFunc = () => {
    if (menuState) {
      toggleMenu(false);
    } else {
      toggleMenu(true);
    }
  };

  const [pageName, changePageName] = useState("Start Shift");

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
                activeShiftStatus !== "active" ? <HomePage /> : <ShiftPage />
              }
            />
            <Route path="/list" element={<ListPage />} />
          </Routes>
          {status === "loading" && <Loader />}
        </div>
      </Router>
    </AppUIContext.Provider>
  );
}

export default App;
