import react, { useState, useEffect } from "react";
import { DatePicker, Space,Input } from 'antd';
import "./App.css";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import BikeCard from "./components/BikeCard";
import ReactPaginate from "react-paginate";

function App() {
  const [stolenBikes, setStolenBikes] = useState([]);

  // state for the pagination
  const [pageNumber, setPageNumber] = useState(0);
  const casesPerPage = 10;

  const pagesVisited = pageNumber * casesPerPage;

  const displayCases = stolenBikes
    .slice(pagesVisited, pagesVisited + casesPerPage)
    .map((item) => {
      return (
        <BikeCard
          title={item.title || "Title Not Found"}
          description={item.description || "Description Not Found"}
          dateStolen={
            new Date(item.date_stolen * 1000).toLocaleString() ||
            "Date Not Found"
          }
          status={item.status || "No Status"}
          stolenLocation={item.stolen_location || "Location is Unavailable"}
          thumb={
            item.thumb ||
            "https://static.vecteezy.com/system/resources/previews/011/020/201/original/simple-bike-icon-logo-template-on-white-background-free-vector.jpg"
          }
        />
      );
    });

  useEffect(() => {
    const getBikes = async () => {
      const response = await fetch(
        "https://bikeindex.org:443/api/v3/search?stolenness=stolen"
      );
      const data = await response.json();
      setStolenBikes(data.bikes);
      console.log(data.bikes);
    };

    getBikes();
  }, []);

  const pageCount = Math.ceil(stolenBikes.length / casesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
const searchTitle =(e)=> {
  displayCases.filter(e.target.value )
}
  return (
    <div className="App">
      <Header />
      <Space>
        <Input placeholder="Search Case Descriptions" onChange={searchTitle} />
        </Space>
      <SearchBar />
      <p className="total-cases">Total cases : {stolenBikes.length}</p>
      {displayCases}
      <div className="paginate-keys">
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBtn"}
          previousLinkClassName={"prevpageBtn"}
          nextLinkClassName={"nextpageBtn"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
}

export default App;
