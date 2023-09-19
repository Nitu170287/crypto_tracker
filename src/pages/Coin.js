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
import SelectDays from "../components/Coin/selectDays";
import { settingChartData } from "../functions/settingChartData";
import PriceToggle from "../components/Coin/priceToggle";

const CoinPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [coindata, setCoinData] = useState();
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState();
  const [priceType, setPriceType] = useState("prices" );

  useEffect(() => {
    if (id) {
      getdata();
    }
  }, [id]);

  async function getdata() {
    // setIsLoading(true);
    // console.info("getdata");
    const data = await getCoinData(id);
    if (data) {
      console.info("getdata data", data);
      coinObject(setCoinData, data);
      const prices = await getCoinPrices(id, days, priceType);
      console.info("prices =>", prices);
      if (prices.length > 0) {
        settingChartData(setChartData, prices);
        setIsLoading(false);
      }
    }
  }

  const handleDaysChange = async (event) => {
    // console.info("handleDaysChange");
    setIsLoading(true);
    setDays(event.target.value);
    console.info("handleDaysChange days");
    const prices = await getCoinPrices(id, event.target.value, priceType);
    console.info("prices =>", prices);
    if (prices.length > 0) {
      settingChartData(setChartData, prices);
      setIsLoading(false);
    }
  };

  const handlePriceChange = async (event, newType) => {
    setIsLoading(true);
    setPriceType(newType);
    console.log("newType>>", newType);
    console.log("days>>", days);
    console.log("id>>", id);
    const prices = await getCoinPrices(id, days, newType);
    console.info("handle change prices=> ", prices);
    if (prices.length > 0) {
      settingChartData(setChartData, prices);
      setIsLoading(false);
    }
  };

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
          <div className="grey-wrapper" style={{ padding: " 1rem" }}>
            <SelectDays days={days} handleDaysChange={handleDaysChange} />
            <PriceToggle
              priceType={priceType}
              handlePriceChange={handlePriceChange}
            />
            {chartData ? <LineChart chartData={chartData}  priceType={priceType}/> : null}
          </div>
        </>
      )}
      {coindata && <CoinInfo heading={coindata.name} desc={coindata.desc} />}
    </>
  );
};

export default CoinPage;
