import "./App.css";
import "./components/header/header.css";
import Header from "./components/header";
import HomePage from "./components/homePage";
import Navigation from "./components/nav";
import ListPage from "./components/listPage";
import ShiftPage from "./components/shiftPage";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createContext } from "react";
export const AppContext = createContext(null);

function App() {
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
    <AppContext.Provider value={{ changePageName }}>
      <Router>
        <div className="App">
          <Header toggleMenuFunc={toggleMenuFunc} pageName={pageName} />
          <Navigation menuState={menu} toggleMenuFunc={toggleMenuFunc} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/shift" element={<ShiftPage />} />
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
