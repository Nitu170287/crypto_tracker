import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";

import DashboardPage from "./pages/Dashboard";
import CoinPage from "./pages/Coin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/coin/:id"  element={<CoinPage/>} />
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
