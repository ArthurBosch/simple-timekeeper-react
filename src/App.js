import "./App.css";
import "./components/header/header.css";
import Header from "./components/header";
import HomePage from "./components/homePage";
import Navigation from "./components/nav";
import ListPage from "./components/listPage";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createContext } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchShifts } from "./store-toolkit/shiftSlice";
export const AppUIContext = createContext(null);

function App() {
  //DATA STATE
  const dispatch = useDispatch();

  //init fetch shifts
  useEffect(() => {
    dispatch(fetchShifts());
  }, [dispatch]);

  //UI STATE
  const [menuState, toggleMenu] = useState(false);

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
            <Route path="/" element={<HomePage />} />
            <Route path="/list" element={<ListPage />} />
          </Routes>
        </div>
      </Router>
    </AppUIContext.Provider>
  );
}

export default App;
