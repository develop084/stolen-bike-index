import React from 'react'
import { DatePicker, Space,Input } from 'antd';
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
const { RangePicker } = DatePicker;

import 'antd/dist/reset.css';
function SearchBar() {
  return (
    <div style={{display: 'flex' , alignItems :'center', gap : 20, justifyContent : 'center' , marginTop: 20}}>
        {/* search bar text */}

       

        {/* select by date */}
        <RangePicker />

        {/* button to search  */}
        <Button type="primary" icon={<SearchOutlined />}>
        Search
      </Button>
        
    </div>
  )
}

export default SearchBar