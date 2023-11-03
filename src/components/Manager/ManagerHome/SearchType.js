import React, { useEffect, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

import AllServices from '../../../Services/AllServices';

const SearchType = ({setSearchType, searchType}) => {

  const handleChange = (event) => {
    setSearchType(event.target.value)
  };

  return (
    <Box sx={{ minWidth: 140,m:2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" style={{marginTop:0}}>Payment status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={searchType}
          defaultValue={searchType}
          label="Payment Status"
          onChange={handleChange}
          style={{height:40,color:searchType =="PENDING"?'red':(searchType=="RECEIVED"?"#0f1d6b":(searchType=="COMPLETED"?"green":"#000"))}}
        >
            <MenuItem value="ALL" ><b>ALL</b></MenuItem>
            <MenuItem value="PENDING" style={{color:'red'}}><b>PENDING</b></MenuItem>
            <MenuItem value="RECEIVED" style={{color:'#0f1d6b'}}><b>RECEIVED</b></MenuItem>
            <MenuItem value="COMPLETED" style={{color:'green'}}><b>COMPLETED</b></MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SearchType;