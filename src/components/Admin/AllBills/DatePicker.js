import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import moment from 'moment';

export default function BasicDateRangePicker({setValidDate, setDate1, setDate2}) {
  const [value, setValue] = React.useState([null, null]);

  const viewDate = (selectValue) => {
    console.log(selectValue)
    let m1 = moment(selectValue[0]).format("YYYY-MM-DD");
    let m2 = moment(selectValue[1]).format("YYYY-MM-DD");
    setValue(selectValue)
    if(m1 != 'Invalid date' && m2!= 'Invalid date'){
      setDate1(m1)
      setDate2(m2)
      setValidDate(true)
      console.log(m1 + "true date")
    }else{
      setDate1(null)
      setDate2(null)
      console.log(m1 + "false date")
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Date-from"
        endText="Date-To"
        value={value}
        onChange={(newValue) => {
          viewDate(newValue);
        }}
        maxDate={new Date()}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} size="small" />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} size="small" />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
