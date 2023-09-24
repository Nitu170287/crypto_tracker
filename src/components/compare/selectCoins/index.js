import { useEffect, useState } from "react";
import get100Coins from "../../../functions/get100Coins";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./style.css";

const SelectCoins = ({ crypto1, crypto2, handleCoinsChange,mode }) => {
  //   const [crypto1, setCrypto1] = useState("bitcoin");
  //   const [crypto2, setCrypto2] = useState("ethereum");
  const [allCoins, setAllCoins] = useState([]);

  const styles = {
    height: "2.5rem",
    color: mode==="dark"?"var(--white)": "var(--black)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor:  mode==="dark"?"var(--white)": "var(--black)",
    },
    "& .MuiSvgIcon-root": {
      color:  mode==="dark"?"var(--white)": "var(--black)",
    },
    "&:hover": {
      "&& fieldset": {
        borderColor: "#3e80e9",
      },
    },
  };

  

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const myCoins = await get100Coins();
    setAllCoins(myCoins);
  };

  return (
    <div className="crypto-flex">
      <p>Crypto 1</p>
      <Select
        sx={styles}
        value={crypto1}
        label="crypto 1"
        onChange={(e) => handleCoinsChange(e, false)}
      >
        {allCoins.filter((item)=> item.id !== crypto2).map((coin, i) => (
          <MenuItem key={i} value={coin.id}>{coin.name}</MenuItem>
        ))}
      </Select>

      <p>Crypto 2</p>
      <Select
        sx={styles}
        value={crypto2}
        label="crypto 2"
        onChange={(e) => handleCoinsChange(e, true)}
      >
        {allCoins.filter((item)=> item.id !== crypto1).map((coin, i) => (
          <MenuItem key={i} value={coin.id}>{coin.name}</MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectCoins;
