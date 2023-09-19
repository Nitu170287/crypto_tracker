import axios from "axios";
export const getCoinData = (id) => {
  const mydata = axios
    .get(`https://api.coingecko.com/api/v3/coins/${id}`)
    .then((response) => {
      // console.log("getCoinData => ", response.data);

      return response.data;
    })
    .catch((err) => console.log(err));
  return mydata;
};
