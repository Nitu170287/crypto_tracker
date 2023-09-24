import { useState, useEffect } from "react";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme, ThemeProvider } from "@mui/material";
import Grid from "../grid";
import List from "../List";
import "./Style.css";

export default function TabsComponent({
  coins,
  setSearch,
  displayWatchListData,
  mode
}) {
  const [value, setValue] = useState("grid");
  const [watchList, setWatchList] = useState([]);

  function updateWatchlist() {
    let localStorageWatchlist = JSON.parse(
      localStorage.getItem("cryptoWatchList") || "[]"
    );
    setWatchList(localStorageWatchlist);
    if (displayWatchListData) {
      displayWatchListData();
    }
  }

  useEffect(() => {
    updateWatchlist();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const style = {
    color: mode==="dark" ? "var(--white)" : "var(--grey)",
    width: "50vw",
    fontSize: "1.2rem",
    fontWeight: 600,
    fontFamily: "Inter",
    textTransform: "capitalize",
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#E55604",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          variant="fullWidth"
        >
          <Tab label="grid" value="grid" sx={style} />
          <Tab label="list" value="list" sx={style} />
        </TabList>

        <TabPanel value="grid">
          <div className="grid-flex">
            {coins.length > 0 ? (
              coins.map((coin, i) => {
                return (
                  <Grid
                    coin={coin}
                    key={i}
                    parentUpdateWatchlist={updateWatchlist}
                    addedToWatchList={watchList.indexOf(coin.id) > -1}
                    mode={mode}
                  />
                );
              })
            ) : (
              <div className="no-search-result">
                {"Search result not found "}
                <button onClick={() => setSearch("")}>
                  Clear search input
                </button>
              </div>
            )}
          </div>
        </TabPanel>
        <TabPanel value="list">
          <table className="list-table">
            {coins.map((coin, i) => {
              return (
                <List
                  coin={coin}
                  key={i}
                  parentUpdateWatchlist={updateWatchlist}
                  addedToWatchList={watchList.indexOf(coin.id) > -1}
                  mode={mode}
                />
              );
            })}
          </table>
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}
