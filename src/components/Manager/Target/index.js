import React, { useEffect, useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import moment from 'moment';
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { AuthContext } from '../../AuthProvider';
import AllServices from '../../../Services/AllServices';
import ViewTop from './ViewTop';
import SearchMonth from './SearchMonth';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const useStyles = makeStyles({
    count: {
        backgroundColor:'#0f1d6b',
        padding:8,
        fontSize:14,
        fontWeight:'bold',
        color:'#fff',
        borderRadius:15
    }
});

const Target = () => {
  const classes = useStyles();
  const {user, setCurrentMenu, setCurrentMenuName} = useContext(AuthContext);
  
  const [ servicePersons, setServicePersons] = useState([])
  const [month, setMonth] = useState(moment(new Date).format('MM'));
  const [year, setYear] = useState(moment(new Date).format('YYYY'));

  useEffect(()=>{
      setCurrentMenu(3);
      setCurrentMenuName('Bills Amount');
  },[])

  useEffect(()=>{
    axios.post(AllServices.GET_EMP_TOTAL_BILLS(user.branch_id), {month:month, year:year})
      .then(response=>{
        if(response.data.status === 200){
          setServicePersons(response.data.empbills)
          console.log(response.data.empbills)
        }
        else{
          setServicePersons([])
        }
      }).catch(error=>{
        console.log(error)
      })
  },[])

  const search = () =>{
    console.log(month)
    axios.post(AllServices.GET_EMP_TOTAL_BILLS(user.branch_id), {month:month, year:year})
      .then(response=>{
        if(response.data.status === 200){
          setServicePersons(response.data.empbills)
          console.log(response.data.empbills)
        }
        else{
          setServicePersons([])
        }
      }).catch(error=>{
        console.log(error)
      })
  }
    

    return (
    <div>
        <Grid container>

        <Grid container style={{width:'50%'}}>
            <Grid xs={4} md={4} lg={4} item style={{marginTop:10}}>
              <SearchMonth setSearchType={setMonth} searchType={month} />
            </Grid>
            <Grid xs={4} md={4} lg={4} item style={{marginTop:10}}>
              <TextField id="outlined-basic" label="Year" variant="outlined" size="small" 
              defaultValue={year}
              type={'number'}
              style={{marginRight:10}}
              onChange={(event)=>setYear(event.target.value)}
              />
            </Grid>
            <Grid xs={2} md={4} lg={4} item style={{marginTop:10}}>
              <Button variant="contained" style={{padding:7,width:'95%'}} onClick={search}><SearchIcon /></Button>
            </Grid>
          </Grid>

          {/* <Grid container style={{width:'50%'}}>
            <Grid xs={4} md={8} lg={8} item style={{marginTop:10}}>
              <TextField id="outlined-basic" label="This Month Target amount" variant="outlined" size="small" 
              style={{width:'97%'}}
              />
            </Grid>
            <Grid xs={2} md={4} lg={4} item style={{marginTop:10}}>
              <Button variant="contained" style={{padding:7,width:'95%'}}>Update Target</Button>
            </Grid>
          </Grid> */}
        </Grid>
        
        <br/>
        <div>
          <ViewTop servicePersons={servicePersons}/>
        </div>
    </div>
  );
}
export default Target;