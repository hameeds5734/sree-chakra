import React, { useEffect, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

import AllServices from '../../../Services/AllServices';

const SearchMonth = ({setSearchType, searchType}) => {

  const handleChange = (event) => {
    setSearchType(event.target.value)
  };

  return (
    <Box sx={{ minWidth: 140 }} style={{marginRight:10}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" style={{marginTop:0}}>Month</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={searchType}
          defaultValue={searchType}
          label="Month"
          onChange={(event)=>setSearchType(event.target.value)}
          style={{height:40,color:searchType =="PENDING"?'red':(searchType=="RECIEVED"?"#0f1d6b":(searchType=="COMPLETED"?"green":"#000"))}}
        >
            <MenuItem value="ALL" ><b>ALL</b></MenuItem>
            <MenuItem value="01"><b>January</b></MenuItem>
            <MenuItem value="02"><b>February</b></MenuItem>
            <MenuItem value="03"><b>March</b></MenuItem>
            <MenuItem value="04"><b>April</b></MenuItem>
            <MenuItem value="05"><b>May</b></MenuItem>
            <MenuItem value="06"><b>June</b></MenuItem>
            <MenuItem value="07"><b>July</b></MenuItem>
            <MenuItem value="08"><b>August</b></MenuItem>
            <MenuItem value="09"><b>September</b></MenuItem>
            <MenuItem value="10"><b>October</b></MenuItem>
            <MenuItem value="11"><b>November</b></MenuItem>
            <MenuItem value="12"><b>December</b></MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SearchMonth;