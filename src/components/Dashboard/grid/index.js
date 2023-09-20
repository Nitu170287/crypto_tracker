import "./style.css";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { Link } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { updateWatchList } from "../../../functions/updateWatchList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { useEffect, useState } from "react";

const Grid = ({ coin, addedToWatchList, parentUpdateWatchlist }) => {
  //const [watchListUpdate, setWatchListUpdate] = useState(addedToWatchList);

  return (
    <>
      <ToastContainer />

      <Link to={`/coin/${coin.id}`}>
        <div
          className={`grid-container ${
            coin.price_change_percentage_24h < 0 && "grid-container-red"
          }`}
        >
          <div className="coin-info">
            <img src={coin.image} className="coin-logo" />
            <div className="name-col">
              <p className="coin-symbol">{coin.symbol.toUpperCase()}</p>
              <p className="coin-name">{coin.name}</p>
            </div>

            <div
              style={{
                color: coin.price_change_percentage_24h > 0 ? "green" : "red",
                paddingLeft: "3rem",
              }}
              onClick={(e) => {
                e.preventDefault();
                let message = updateWatchList(coin.id);
                toast(message);
                //setWatchListUpdate((prevItems) => !prevItems);
                parentUpdateWatchlist();
              }}
            >
              {addedToWatchList ? (
                <CheckCircleIcon
                  sx={{
                    "&.MuiSvgIcon-root": {
                      width: "3rem",
                      height: "2rem",
                    },
                  }}
                />
              ) : (
                <AddCircleOutlineRoundedIcon
                  sx={{
                    "&.MuiSvgIcon-root": {
                      width: "3rem",
                      height: "2rem",
                    },
                  }}
                />
              )}
            </div>
          </div>
          {coin.price_change_percentage_24h > 0 ? (
            <div className="chip-flex">
              <div className="chip-price">
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </div>
              <div className="icon">
                <TrendingUpIcon />
              </div>
            </div>
          ) : (
            <div className="chip-flex ">
              <div className="chip-price chip-red">
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </div>
              <div className="icon chip-red">
                <TrendingDownIcon />
              </div>
            </div>
          )}
          <div className="curent-price">
            <h3
              style={{
                color:
                  coin.price_change_percentage_24h > 0
                    ? "var(--green"
                    : "var(--red",
              }}
            >
              ${coin.current_price?.toLocaleString()}
            </h3>
            <p className="total-volume">
              Total Volume: {coin.total_volume?.toLocaleString()}
            </p>
            <p className="total-volume">
              Market Cap: ${coin.market_cap?.toLocaleString()}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};
export default Grid;
