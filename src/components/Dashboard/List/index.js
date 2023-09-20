import "./style.css";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Tooltip from "@mui/material/Tooltip";
import convertNumber from "../../../functions/convertNumver";
import { Link } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { updateWatchList } from "../../../functions/updateWatchList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = ({ coin, addedToWatchList, parentUpdateWatchlist }) => {
  return coin ? (
    <>
      <ToastContainer />

      <Link to={`/coin/${coin.id}`}>
        <tr className="list-row">
          <Tooltip title="Coin logo" placement="bottom-start">
            <td className="td-image mobile-td-img">
              <img src={coin.image} className="coin-logo mobile-coin-logo" />
            </td>
          </Tooltip>
          <td>
            <div className="name-col mobile-name-col">
              <p className="coin-symbol mobile-coin-symbol">
                {coin.symbol?.toUpperCase()}
              </p>
              <p className="coin-name mobile-coin-name">{coin.name}</p>
            </div>
          </td>
          <Tooltip title="Price Change in 24HRS" placement="bottom-start">
            {coin.price_change_percentage_24h > 0 ? (
              <td className="chip-flex">
                <div className="chip-price mobile-chip-price">
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <td className="icon">
                  <TrendingUpIcon />
                </td>
              </td>
            ) : (
              <td className="chip-flex ">
                <div className="chip-price mobile-chip-price chip-red">
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <td className="icon chip-red">
                  <TrendingDownIcon />
                </td>
              </td>
            )}
          </Tooltip>
          <Tooltip title="Current Price" placement="bottom-start">
            <td>
              <h3
                className="mobile-current-price"
                style={{
                  color:
                    coin.price_change_percentage_24h > 0
                      ? "var(--green"
                      : "var(--red",
                }}
              >
                ${coin.current_price.toLocaleString()}
              </h3>
            </td>
          </Tooltip>
          <Tooltip title="Total-volume" placement="bottom-start">
            <td>
              <p className="total-volume mobile-total-volume">
                {coin.total_volume.toLocaleString()}
              </p>
            </td>
          </Tooltip>
          <Tooltip title="Market-cap" placement="bottom-start">
            <td className=" desktop-market-cap">
              <p className="market-cap ">${coin.market_cap.toLocaleString()}</p>
            </td>
          </Tooltip>
          <Tooltip title="Market-cap" placement="bottom-start">
            <td className="mobile-market-cap">
              <p className="market-cap ">${convertNumber(coin.market_cap)}</p>
            </td>
          </Tooltip>
          <Tooltip title="Market-cap" placement="bottom-start">
            <td>
              <div
                style={{
                  color: coin.price_change_percentage_24h > 0 ? "green" : "red",
                  paddingLeft: "3rem",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  let message = updateWatchList(coin.id);
                  toast(message);
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
            </td>
          </Tooltip>
        </tr>
      </Link>
    </>
  ) : null;
};
export default List;
