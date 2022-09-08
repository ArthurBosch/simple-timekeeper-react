import "./App.css";
import "./components/header/header.css";
import Header from "./components/header";
import HomePage from "./components/homePage";
import Navigation from "./components/nav";
import ListPage from "./components/listPage";
import ShiftPage from "./components/shiftPage";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { createContext } from "react";
import { useEffect } from "react";
import { PORT } from "./vars";
export const AppUIContext = createContext(null);
export const AppDataContext = createContext(null);

function App() {
  //DATA STATE

  const [data, setData] = useState();

  useEffect(() => {
    fetch(`${PORT}/shifts`)
      .then((res) => res.json())
      .then((data) => setData(data.reverse()));
  }, []);

  //ACTIVE SHIFT

  const checkActive = () => {
    const shiftIsActive = JSON.parse(localStorage.getItem("ShiftIsActive"));
    if (shiftIsActive !== true) return false;
    return true;
  };

  const [shiftIsActive, setActive] = useState(checkActive());

  const toggleShiftIsActive = (state) => {
    setActive(state);
    localStorage.setItem("ShiftIsActive", JSON.stringify(state));
  };

  const checkActiveShift = () => {
    const activeShift = JSON.parse(localStorage.getItem("activeShift"));
    if (activeShift) return activeShift;
    return null;
  };

  const [activeShift, setActiveShift] = useState(checkActiveShift());

  const createNewShift = () => {
    let newShift = "";
    let newID = new Date().getTime();

    newShift = {
      id: newID,
      startTime: new Date().toISOString(),
      endTime: "",
    };

    setActiveShift(newShift);
    setData([...data, newShift]);
    localStorage.setItem("activeShift", JSON.stringify(newShift));

    fetch(`${PORT}/shifts`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newShift),
    });
  };

  const finishShift = () => {
    const shift = { ...activeShift, endTime: new Date().toISOString() };
    fetch(`${PORT}/shifts/${activeShift.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(shift),
    });

    const newData = data.map((obj) => {
      if (obj.id === activeShift.id) {
        console.log("found");
        return { ...shift };
      }

      return obj;
    });

    setData(newData);
    setActiveShift(null);
    localStorage.removeItem("activeShift");
  };

  //UI STATE
  const [menu, toggleMenu] = useState(false);

  const toggleMenuFunc = () => {
    if (menu) {
      toggleMenu(false);
    } else {
      toggleMenu(true);
    }
  };

  const [pageName, changePageName] = useState("Start Shift");

  return (
    <AppDataContext.Provider
      value={{
        data,
        createNewShift,
        shiftIsActive,
        toggleShiftIsActive,
        activeShift,
        setActiveShift,
        finishShift,
      }}
    >
      <AppUIContext.Provider value={{ changePageName }}>
        <Router>
          <div className="App">
            <Header toggleMenuFunc={toggleMenuFunc} pageName={pageName} />
            <Navigation menuState={menu} toggleMenuFunc={toggleMenuFunc} />
            <Routes>
              <Route
                path="/"
                element={
                  shiftIsActive ? <Navigate to="/shift" /> : <HomePage />
                }
              />
              <Route path="/list" element={<ListPage />} />
              <Route path="/shift" element={<ShiftPage />} />
            </Routes>
          </div>
        </Router>
      </AppUIContext.Provider>
    </AppDataContext.Provider>
  );
}

export default App;
