import axios from "axios";

const get100Coins = ()=>{

    const myCoin =axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
      )
      .then((response) => {
        // console.log(response);
        // setCoins([...response.data]);
        // setPaginatedCoin([...response.data.slice(0, 10)]);
        // setIsLoading(false);
        return response.data
      })
      .catch((err) => console.log(err));
      return myCoin
}

export default get100Coins