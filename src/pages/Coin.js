import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Common/loader";
import axios from "axios";
import Header from "../components/Common/Header";
import { coinObject } from "../functions/coinObject";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/coinInfo";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import LineChart from "../components/Coin/lineChart";
import { convertDate } from "../functions/converDate";
import SelectDays from "../components/Coin/selectDays"

const CoinPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [coindata, setCoinData] = useState();
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (id) {
      getdata();
    }
  }, [id]);

  async function getdata() {
    const data = await getCoinData(id);
    if (data) {
      coinObject(setCoinData, data);
      const prices = await getCoinPrices(id, days);

      if (prices) {
        console.log("heyyyyy");
        setChartData({
          labels: prices.map((price) => convertDate(price[0])),
          datasets: [
            {
              data: prices.map((price) => price[1]),
              borderColor: "#3a80e9",
              borderWidth : 2,
              fill : true,
              tension : 0.25,
              backgroundColor: "rgba(58, 128, 233, 0.1)",
              pointRadius:0,
              yAxisID: "y",
            },
          ],
        });
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grey-wrapper">
            <List coin={coindata} />
          </div>
          <div className="grey-wrapper">
          <SelectDays/>
            <LineChart chartData={chartData} />
          </div>
        </>
      )}
      {coindata && <CoinInfo heading={coindata.name} desc={coindata.desc} />}
    </>
  );
};

export default CoinPage;
