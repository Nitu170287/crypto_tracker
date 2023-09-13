import { useState } from "react";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme, ThemeProvider } from "@mui/material";
import Grid from "../grid";
import List from "../List";
import "./Style.css";

export default function TabsComponent({ coins,setSearch }) {
  const [value, setValue] = useState("grid");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const style = {
    color: "var(--white)",
    width: "50vw",
    fontSize: "1.2rem",
    fontWeight: 600,
    fontFamily: "Inter",
    textTransform: "capitalize",
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3a80e9",
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
            {
              coins.length > 0 ? 
            coins.map((coin, i) => {
              return <Grid coin={coin} key={i} />;
            }) 
            : <div className="no-search-result">{"Search result not found " }<button onClick={()=>setSearch("")}>Clear search input</button></div>
            }
          </div>
        </TabPanel>
        <TabPanel value="list">
          <table className="list-table">
            {coins.map((coin, i) => {
              return <List coin={coin} key={i} />;
            })}
          </table>
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}