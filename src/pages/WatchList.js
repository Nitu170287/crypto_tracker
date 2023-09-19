import { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import { getCoinData } from "../functions/getCoinData";
import TabsComponent from "../components/Dashboard/Tabs";



const Watchlist = () => {
  const [watchlistCoins, setWatchlistCoins] = useState([]);

  useEffect(() => {
    displayWatchListData();
  }, []);

  async function displayWatchListData() {
    const watchlistData = JSON.parse(
      localStorage.getItem("cryptoWatchList") || "[]"
    );
    console.log("localStorage item", watchlistData);

    for (let i =0; i< watchlistData.length; i++) {
      console.log(watchlistData[i]);
      let data = await getCoinData(watchlistData[i])
      setWatchlistCoins((prevItems) => [...prevItems, data])
    }

    //

    console.log("watch list coins", watchlistCoins);
  }

  return (
    <div>
      <Header />
      {watchlistCoins ? <TabsComponent coins={watchlistCoins}  /> : null}
      
    </div>
  );
};
export default Watchlist;
