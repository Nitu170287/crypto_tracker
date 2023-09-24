import { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import SelectCoins from "../components/compare/selectCoins";
import SelectDays from "../components/Coin/selectDays";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import { coinObject } from "../functions/coinObject";
import Loader from "../components/Common/loader";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/coinInfo";
import { settingChartData } from "../functions/settingChartData";
import LineChart from "../components/Coin/lineChart";
import PriceToggle from "../components/Coin/priceToggle";
import Footer from "../components/Common/Footer";
import { motion } from "framer-motion";

const ComparePage = ({ setMode, mode }) => {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [crypto1Data, setCrypto1Data] = useState();
  const [crypto2Data, setCrypto2Data] = useState();
  const [days, setDays] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setIsLoading(false);
    const data1 = await getCoinData(crypto1);
    const data2 = await getCoinData(crypto2);
    if (data1) {
      coinObject(setCrypto1Data, data1);
    }
    if (data2) {
      coinObject(setCrypto2Data, data2);
    }
    if (data1 && data2) {
      const prices1 = await getCoinPrices(crypto1, days, priceType);
      const prices2 = await getCoinPrices(crypto2, days, priceType);

      settingChartData(setChartData, prices1, prices2);
      console.log("both prices fetches", prices1, prices2);
      setIsLoading(false);
    }
  }

  const handleCoinsChange = async (e, isCoin2) => {
    setIsLoading(true);
    if (isCoin2) {
      setCrypto2(e.target.value);
      const data = await getCoinData(e.target.value);
      coinObject(setCrypto2Data, data);
      const prices1 = await getCoinPrices(crypto1, days, priceType);
      const prices2 = await getCoinPrices(crypto2, days, priceType);
      if (prices1.length > 0 && prices2.length > 0) {
        // settingChartData(setChartData, prices);
        console.log("both prices fetches", prices1, prices2);
        setIsLoading(false);
      }
    } else {
      setCrypto1(e.target.value);
      const data = await getCoinData(e.target.value);
      coinObject(setCrypto1Data, data);
    }
  };

  async function handleDaysChange(e) {
    setIsLoading(true);
    setDays(e.target.value);
    const prices1 = await getCoinPrices(crypto1, e.target.value, priceType);
    const prices2 = await getCoinPrices(crypto2, e.target.value, priceType);
    settingChartData(setChartData, prices1, prices2);
    // console.log("both prices fetches", prices1, prices2);
    setIsLoading(false);
  }

  const handlePriceChange = async (e, newType) => {
    setIsLoading(true);
    setPriceType(newType);

    const prices1 = await getCoinPrices(crypto1, days, newType);
    const prices2 = await getCoinPrices(crypto2, days, newType);
    settingChartData(setChartData, prices1, prices2);
    // console.log("both prices fetches", prices1, prices2);
    setIsLoading(false);
  };

  return (
    <div>
      <Header setMode={setMode} mode={mode} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="coin-days-flex">
            <SelectCoins
              crypto1={crypto1}
              crypto2={crypto2}
              handleCoinsChange={handleCoinsChange}
              mode={mode}
            />
            <SelectDays
              days={days}
              handleDaysChange={handleDaysChange}
              noPTag={true}
              mode={mode}
            />
          </div>
          {crypto1Data ? (
            <motion.div className={"grey-wrapper-"+mode} initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}>
              <List coin={crypto1Data} mode={mode} />{" "}
            </motion.div>
          ) : null}

          {crypto2Data ? (
            <div className={"grey-wrapper-"+mode}>
              <List coin={crypto2Data} mode={mode} />{" "}
            </div>
          ) : null}

          {chartData ? (
            <div className={"grey-wrapper-"+mode}>
              <PriceToggle
                priceType={priceType}
                handlePriceChange={handlePriceChange}
                mode={mode}
              />
              <LineChart
                chartData={chartData}
                priceType={priceType}
                multiAxis={true}
                mode={mode}
              />
            </div>
          ) : null}

          {crypto1Data ? (
            <CoinInfo
              heading={crypto1Data?.name}
              desc={crypto1Data?.desc}
              mode={mode}
            />
          ) : null}
          {crypto2Data ? (
            <CoinInfo
              heading={crypto2Data?.name}
              desc={crypto2Data?.desc}
              mode={mode}
            />
          ) : null}
        </>
      )}
      <Footer />
    </div>
  );
};
export default ComparePage;
