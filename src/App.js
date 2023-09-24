import React, { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";

import DashboardPage from "./pages/Dashboard";
import CoinPage from "./pages/Coin";
import ComparePage from "./pages/ComparePage";
import Watchlist from "./pages/WatchList";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';





function App() {
  
  const [mode, setMode] = useState('dark');

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<HomePage setMode={setMode} mode={mode} />} />
        <Route path="/dashboard" element={<DashboardPage setMode={setMode}  mode={mode} />} />
        <Route path="/coin/:id"  element={<CoinPage setMode={setMode}  mode={mode}/>} />
        <Route path="/compare"  element={<ComparePage setMode={setMode}  mode={mode}/>} />
        <Route path="/watchlist"  element={<Watchlist setMode={setMode}  mode={mode}/>} />
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
