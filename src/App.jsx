import react, { useState, useEffect } from "react";
import { Space, Input } from "antd";
import { DatePicker } from "antd";
import "./App.css";
import Header from "./components/Header";
import BikeCard from "./components/BikeCard";
import ReactPaginate from "react-paginate";
import { Spinner, Button } from "@chakra-ui/react";

import moment from "moment";
const { RangePicker } = DatePicker;

function App() {
  let [stolenBikes, setStolenBikes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [dates, setdates] = useState([]);

  // state for the search term

  // state for the pagination
  const [pageNumber, setPageNumber] = useState(0);

  const casesPerPage = 10;

  const pagesVisited = pageNumber * casesPerPage;

  const displayCases = stolenBikes
    .slice(pagesVisited, pagesVisited + casesPerPage)
    .filter((val) => {
      if (searchTerm == "") {
        return val;
      } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val;
      }
    })
    .map((item) => {
      return (
        <BikeCard
          key={item.id}
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
      setLoading(true);
      const response = await fetch(
        "https://bikeindex.org:443/api/v3/search?page=1&per_page=100&location=10405&distance=100&stolenness=stolen"
      );
      const data = await response.json();

      console.log(data.bikes);
      setStolenBikes(data.bikes);
      setLoading(false);
    };

    getBikes();
  }, [dates]);

  let temp = [];
  function test() {
    if (dates[0] === "" && dates[1] === "") {
      return;
    } else {
      stolenBikes.filter((single) => {
        if (
          moment(single.date_stolen * 1000).format("YYYY-MM-DD") >= dates[0] &&
          moment(single.date_stolen * 1000).format("YYYY-MM-DD") <= dates[1]
        ) {
          temp.push(single);
        }
      });
    }
    setStolenBikes(temp);
  }

  const pageCount = Math.ceil(stolenBikes.length / casesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // range picker

  console.log(dates);

  return (
    <div className="App">
      <Header />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        {/* search input */}
        <Space>
          <Input
            placeholder="Search Case Descriptions"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Space>
        {/* filter by date picker  */}
        <Space>
          <RangePicker onChange={(date, dateString) => setdates(dateString)} />
        </Space>
        <Button onClick={test}>Find Cases</Button>
      </div>

      {/* total cases number  */}
      <p className="total-cases">Total cases : {stolenBikes.length}</p>

      {loading ? (
         <p style={{textAlign : 'center'}}>
          <Spinner/>
        </p>
      ) : displayCases.length == 0 ? (
        <p style={{ color: "red", textAlign: 'center', marginBottom: '100px' }}>No result Found</p>
      ) : (
        displayCases
      )}
      {/* pagination */}
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
          initialPage={ 1 }
        />
      </div>
    </div>
  );
}

export default App;
