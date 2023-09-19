import axios from "axios";
export const getCoinPrices = async (id, days,priceType) => {
  console.log("priceType 0", priceType, "++")
  const prices = await axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    )
    .then((response) => {
      console.log("prices:" ,response.data);
      return response.data[priceType];
    })
    .catch((err) => console.log(err));
  return prices;
};
