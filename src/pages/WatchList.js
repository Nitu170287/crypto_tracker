import { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import { getCoinData } from "../functions/getCoinData";
import TabsComponent from "../components/Dashboard/Tabs";
import { Link } from "react-router-dom";

const Watchlist = ({setMode}) => {
  const [watchlistCoins, setWatchlistCoins] = useState([]);

  useEffect(() => {
    displayWatchListData();
  }, [displayWatchListData]);

  async function displayWatchListData() {
    const watchlistData = JSON.parse(
      localStorage.getItem("cryptoWatchList") || "[]"
    );
    console.log("localStorage item", watchlistData);

    let coinArray = [];
    for (let i = 0; i < watchlistData.length; i++) {
      console.log(watchlistData[i]);
      let data = await getCoinData(watchlistData[i]);

      //setting coin object
      let coinObject = {
        id: data.id,
        name: data.name,
        symbol: data.symbol,
        image: data.image.large,
        desc: data.description.en,
        price_change_percentage_24h:
          data.market_data.price_change_percentage_24h,
        total_volume: data.market_data.total_volume.usd,
        current_price: data.market_data.current_price.usd,
        market_cap: data.market_data.market_cap.usd,
      };
      console.log("coin data " + watchlistData[i], coinObject);
      coinArray.push(coinObject);
    }

    //
    setWatchlistCoins(coinArray);
    console.log("watch list coins", watchlistCoins);
  }

  return (
    <div>
      <Header setMode={setMode}  />
      {watchlistCoins.length > 0 ? (
        <TabsComponent
          coins={watchlistCoins}
          displayWatchListData={displayWatchListData}
        />
      ) : (
        <div className="no-search-result">
          <h2>No Coins in Watchlist</h2>
          <Link to="/dashboard">
            <button>Go To Dashboard</button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Watchlist;
