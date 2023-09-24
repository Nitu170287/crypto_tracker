import "./style.css";

import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";

export default function SelectDays({ days, handleDaysChange, noPTag, mode }) {
  return (
    <div className="select-days">
      {!noPTag && <p>Price Change In</p>}
      {/* <InputLabel id="demo-simple-select-label">Days</InputLabel> */}
      <Select
        sx={{
          height: "2.5rem",
          color: mode === "dark" ? "var(--white)" : "var(--black)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: mode === "dark" ? "var(--white)" : "var(--black)",
          },
          "& .MuiSvgIcon-root": {
            color: mode === "dark" ? "var(--white)" : "var(--black)",
          },
          "&:hover": {
            "&& fieldset": {
              borderColor: "#3e80e9",
            },
          },
          "@media only screen and (max-width: 800px) ": {
            height: "1.5rem",
            fontSize: "0.8rem",
          },
        }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={days}
        onChange={handleDaysChange}
      >
        <MenuItem value={7}>7 Days</MenuItem>
        <MenuItem value={30}>30 Days</MenuItem>
        <MenuItem value={60}>60 Days</MenuItem>
        <MenuItem value={90}>90 Days</MenuItem>
        <MenuItem value={120}>120 Days</MenuItem>
        <MenuItem value={365}>1 Year</MenuItem>
      </Select>
    </div>
  );
}
