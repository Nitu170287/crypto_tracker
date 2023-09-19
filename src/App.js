import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";

import DashboardPage from "./pages/Dashboard";
import CoinPage from "./pages/Coin";
import ComparePage from "./pages/ComparePage";
import Watchlist from "./pages/WatchList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/coin/:id"  element={<CoinPage/>} />
        <Route path="/compare"  element={<ComparePage/>} />
        <Route path="/watchlist"  element={<Watchlist/>} />
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
