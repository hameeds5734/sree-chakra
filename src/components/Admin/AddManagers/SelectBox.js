import React, { useEffect, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

import AllServices from '../../../Services/AllServices';

const SelectBox = ({setBranch, branch}) => {
  const [selectItems, setSelectItems] = useState([])

  const handleChange = (event) => {
    setBranch(event.target.value)
  };

  useEffect(()=>{
    axios.get(AllServices.GET_ALL_BRANCHES()).then(response=>{
      console.log(response.data)
      setSelectItems(response.data.branchs)
      setBranch(response.data.branchs[0].id)
    }).catch(error=>{
      console.log(error)
    })
  },[])

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select branch</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={branch}
          label="Select branch"
          onChange={handleChange}
        >
          {
            selectItems.map((data)=>{
              return <MenuItem value={data.id} key={data.id}>{data.branch_name}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectBox;