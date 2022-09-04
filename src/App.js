import "./App.css";
import "./components/header/header.css";
import Header from "./components/header";
import HomePage from "./components/homePage";
import Navigation from "./components/nav";
import ListPage from "./components/listPage";
import ShiftPage from "./components/shiftPage";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [menu, toggleMenu] = useState(false);

  const toggleMenuFunc = () => {
    if (menu) {
      toggleMenu(false);
    } else {
      toggleMenu(true);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header toggleMenuFunc={toggleMenuFunc} />
        <Navigation menuState={menu} toggleMenuFunc={toggleMenuFunc} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/shift" element={<ShiftPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
