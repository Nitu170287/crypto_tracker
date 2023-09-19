import { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import axios from "axios";
import SearchBar from "../components/Dashboard/SearchBar";
import PaginationComponent from "../components/Dashboard/paginationComponent";
import Loader from "../components/Common/loader";
import BackToTop from "../components/Common/BackToTop"
import get100Coins from "../functions/get100Coins"

const DashboardPage = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [paginatedCoins, setPaginatedCoin] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = (value - 1) * 10;
    setPaginatedCoin(coins.slice(previousIndex, previousIndex + 10));
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getData()
  }, []);

  const getData = async ()=>{

    const coins = await get100Coins()
    if(coins){
      setCoins(coins);
        setPaginatedCoin(coins.slice(0, 10));
        setIsLoading(false);
  }
    }
    

  return (
    <>
      <Header />
      <BackToTop/>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <SearchBar search={search} onChange={onChange} />
          <TabsComponent coins={search ? filteredCoins : paginatedCoins}  setSearch={setSearch}/>
          {!search && (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </>
  );
};
export default DashboardPage;
