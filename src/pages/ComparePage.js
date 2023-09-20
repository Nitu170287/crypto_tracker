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

const ComparePage = () => {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [crypto1Data, setCrypto1Data] = useState();
  const [crypto2Data, setCrypto2Data] = useState();
  const [days, setDays] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  const [priceType, setPriceType] = useState("prices");
  const [ chartData, setChartData] = useState()
  


  useEffect(() => {
    getData();
  }, [getData]);

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
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="coin-days-flex">
            <SelectCoins
              crypto1={crypto1}
              crypto2={crypto2}
              handleCoinsChange={handleCoinsChange}
            />
            <SelectDays
              days={days}
              handleDaysChange={handleDaysChange}
              noPTag={true}
            />
          </div>
          {crypto1Data ? (
            <div className="grey-wrapper">
              <List coin={crypto1Data} />{" "}
            </div>
          ) : null}

          {crypto2Data ? (
            <div className="grey-wrapper">
              <List coin={crypto2Data} />{" "}
              
            </div>
          ) : null}

          {chartData ? (<div className="grey-wrapper">
          <PriceToggle
              priceType={priceType}
              handlePriceChange={handlePriceChange}
            />
          <LineChart chartData={chartData}  priceType={priceType} multiAxis={true}/>
          </div>): null}


          {crypto1Data ? (
            <CoinInfo heading={crypto1Data?.name} desc={crypto1Data?.desc} />
          ) : null}
          {crypto2Data ? (
            <CoinInfo heading={crypto2Data?.name} desc={crypto2Data?.desc} />
          ) : null}
          
          
        </>
      )}
    </div>
  );
};
export default ComparePage;
