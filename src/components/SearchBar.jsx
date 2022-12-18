import React, { useState } from "react";
import { DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
import "antd/dist/reset.css";

function SearchBar({ caseTime, setStolenBikes }) {
  console.log(dates);

  const filterItem = () => {
    const dayye = caseTime.filter((date) => date > dates[0] && date < dates[1]);
    console.log(dayye);
  };

  console.log(dates);
  return (
    <div>
      {/* date selector */}
      <RangePicker onChange={(date, dateString) => setdates(dateString)} />
      {/* button to search  */}
      <Button type="primary" icon={<SearchOutlined />} onClick={filterItem}>
        Search
      </Button>
    </div>
  );
}

export default SearchBar;
