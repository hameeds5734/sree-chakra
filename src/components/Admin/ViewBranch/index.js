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
import { Typography } from '@mui/material';
import { useParams } from "react-router-dom";
import moment from 'moment';
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { AuthContext } from '../../AuthProvider';
import BasicDateRangePicker from './DatePicker';
import ViewBills from './ViewBils';
import AllServices from '../../../Services/AllServices';
import Emp from '../../../__mocks__/Bills';
import SearchType from './SearchType';
import SelectBox from './SelectBox';

import {ExportCSV} from './ExportCSV';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #666',
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

const ManagerHome = () => {
  const { branch_id } = useParams();
  const classes = useStyles();
  const {user, setCurrentMenu, setCurrentMenuName} = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentBill, setCurrentBill] = useState([])
  const [machine, setMachine] = useState([])

  const [deleteId, setDeleteId] = useState(null)

  const [fileName, setFileName] = useState('SCSAppServiceBills'+ new Date());

  const [bill_amount, setBillAmount] = useState({
    paid_amount:0,
    discount_amount:0,
    admin_message:''
  })

  const [ validDate, setValidDate] = useState(false);
  const [ date1, setDate1 ] = useState(null);
  const [ date2, setDate2 ] = useState(null);
  const [ searchText, setSearchText] = useState('');
  const [ searchType, setSearchType] = useState('ALL');

  const [total, setTotal] = useState(0)
  const [month, setMonth] = useState(0)
  const [today, setToday] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)
  const [recievedCount, setRecievedCount] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)
  const [pay_status, setPaymentStatus] = useState(null)

  const [ bills, setBills] = useState([])

  const handleClose = () => setOpen(false);

  const getDataById = (val) => {
    const filteredRows = bills.filter((row) => {
      return row.id === val;
    });
    setCurrentBill(filteredRows[0]);
    setPaymentStatus(filteredRows[0].payment_status)
    setBillAmount({ paid_amount:filteredRows[0].paid_amount, discount_amount:filteredRows[0].discount_amount, admin_message:filteredRows[0].admin_message})
    setOpen(true);
  };

  const getMachineDataById = (val) => {
    const filteredRows = bills.filter((row) => {
      return row.id === val;
    });
    axios.get(AllServices.GET_MACHINE(filteredRows[0].id)).then(response=>{
      setMachine(response.data)
    }).catch(error=>{
      console.log(error)
    })

    setCurrentBill(filteredRows[0]);
    setPaymentStatus(filteredRows[0].payment_status)
    setOpen2(true);
  };

  const DeleteBill = () => {
    axios.delete(AllServices.DELETE_BILL(deleteId)).then(response=>{
      console.log(response.data)
      if(response.data.status === 200){
        searchBill();
      }
      else{
      }
    }).catch(error=>{
      console.log(error)
    })
    setDeleteOpen(false)
  }

  const deleteById = (id) => {
    setDeleteId(id)
    setDeleteOpen(true)
  }

  const searchBill = () => {
    setFileName('SCSAppServiceBills'+ new Date())
    axios.post(AllServices.SEARCH_BRANCH_BILLS(), { branch_id: branch_id ,date1:date1, date2:date2, searchText:searchText, searchType:searchType }).then(response=>{
      console.log(response.data.bills)
      if(response.data.status === 200){
        setBills(response.data.bills)
      }
      else{
      }
    }).catch(error=>{
      console.log(error)
    })

    axios.get(AllServices.PENDING_BILLS_COUNT(branch_id))
    .then(response=>{
      if(response.data.status === 200){
        setPendingCount(response.data.total)
      }
      else{
      }
    }).catch(error=>{
      console.log(error)
    })
    // recieved
    axios.get(AllServices.RECIEVED_BILLS_COUNT(branch_id))
    .then(response=>{
      if(response.data.status === 200){
        setRecievedCount(response.data.total)
      }
      else{
      }
    }).catch(error=>{
      console.log(error)
    })
    // complete
    axios.get(AllServices.COMPLETED_BILLS_COUNT(branch_id))
    .then(response=>{
      if(response.data.status === 200){
        setCompletedCount(response.data.total)
      }
      else{
      }
    }).catch(error=>{
      console.log(error)
    })
  }

  const Update_Payment = () => {
    axios.put(AllServices.UPDATE_BILL(currentBill.id), { pay_status:pay_status, paid_amount:bill_amount.paid_amount, discount_amount:bill_amount.discount_amount, admin_message: bill_amount.admin_message }).then(response=>{
      if(response.data.status === 200){
        searchBill()
      }
      else{
      }
    }).catch(error=>{
      console.log(error)
    })
    setOpen(false)
  }

    useEffect(()=>{
      axios.get(AllServices.GET_BRANCH_NAME(branch_id)).then(response=>{
        console.log(response.data)
        setCurrentMenuName(response.data.branch_name);
      }).catch(error=>{
        console.log(error)
      })
    },[])
        
    useEffect(()=>{
      // box1
      axios.get(AllServices.TOTAL_BILLS_COUNT(branch_id))
      .then(response=>{
        if(response.data.status === 200){
          setTotal(response.data.total)
        }
        else{
        }
      }).catch(error=>{
        console.log(error)
      })
      // box2
      axios.get(AllServices.TOTAL_BILLS_COUNT(branch_id))
      .then(response=>{
        if(response.data.status === 200){
          setMonth(response.data.total)
        }
        else{
        }
      }).catch(error=>{
        console.log(error)
      })
      // box4
      axios.get(AllServices.TODAY_BILLS_COUNT(branch_id))
      .then(response=>{
        if(response.data.status === 200){
          setToday(response.data.total)
        }
        else{
        }
      }).catch(error=>{
        console.log(error)
      })
      axios.get(AllServices.PENDING_BILLS_COUNT(branch_id))
      .then(response=>{
        if(response.data.status === 200){
          setPendingCount(response.data.total)
        }
        else{
        }
      }).catch(error=>{
        console.log(error)
      })
      // recieved
      axios.get(AllServices.RECIEVED_BILLS_COUNT(branch_id))
      .then(response=>{
        if(response.data.status === 200){
          setRecievedCount(response.data.total)
        }
        else{
        }
      }).catch(error=>{
        console.log(error)
      })
      // complete
      axios.get(AllServices.COMPLETED_BILLS_COUNT(branch_id))
      .then(response=>{
        if(response.data.status === 200){
          setCompletedCount(response.data.total)
        }
        else{
        }
      }).catch(error=>{
        console.log(error)
      })
    },[])

    return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{borderRadius:15,borderColor:'#666',borderWidth:1}}>
        <span style={{textAlign:'center',width:'100%'}}>Bill : <span style={{color:'#666'}}>{currentBill?currentBill.employee_name:null}</span> </span>
        <span style={{textAlign:'center',width:'100%'}}> <b>|</b> Service Persons : <span style={{color:'#666'}}>{currentBill?currentBill.services_persons:null}</span></span>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={4} md={4} lg={4} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <b style={{color:'#111',}}><span>Invoice ID</span></b>
              <b style={{}}>: <span style={{color:'#666'}}>{currentBill?currentBill.invoice_id:null}</span></b>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <b style={{color:'#111',}}>Customer Name </b>
              <b style={{}}>: <span style={{color:'#666'}}>{currentBill?currentBill.customer_name:null}</span></b>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <b style={{color:'#111',}}>Phone Number </b>
              <b style={{}}>: <span style={{color:'#666'}}>{currentBill?currentBill.customer_phoneno:null}</span></b>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Divider style={{backgroundColor:'#ddd'}} />
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={8} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <b style={{color:'#111'}}>Customer Address </b>
              <b> &nbsp;&nbsp;&nbsp;: <span style={{color:'#666'}}>{currentBill?currentBill.customer_address:null}</span></b>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <b style={{color:'#111'}}>Remarks </b>
              <b> &nbsp;&nbsp;&nbsp;: <span style={{color:'#666'}}>{currentBill?currentBill.remarks:null}</span></b>
          </Grid>
          
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Divider style={{backgroundColor:'#ddd'}} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <b style={{color:'#111'}}>Rectification Details </b>
              <b>: <span style={{color:'#666'}}>{currentBill?currentBill.rectification_details:null}</span></b>
          </Grid>
          
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Divider style={{backgroundColor:'#ddd'}} />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <b style={{color:'#111',}}>Nature of Job </b>
              <b style={{}}>: <span style={{color:'#666'}}>{currentBill?currentBill.nature_of_job:null}</span></b>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <b style={{color:'#111',}}>Bill Type </b>
              <b style={{}}>: <span style={{color:'#666'}}>{currentBill?currentBill.bill_type:null}</span></b>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <b style={{color:'#111',}}>Working condition </b>
              <b style={{}}>: <span style={{color:'#666'}}>{currentBill?currentBill.working_condition:null}</span></b>
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <b style={{color:'#111',}}>In Time </b>
              <b style={{}}>: <span style={{color:'#666'}}>{currentBill?currentBill.in_time:null}</span></b>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <b style={{color:'#111',}}>Out Time </b>
              <b style={{}}>: <span style={{color:'#666'}}>{currentBill?currentBill.out_time:null}</span></b>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <b style={{color:'#111',}}>Date </b>
              <b style={{}}>: <span style={{color:'#666'}}>{currentBill?moment(currentBill.bill_date).format('DD-MM-YYYY'):null}</span></b>
          </Grid>
          
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Divider style={{backgroundColor:'#ddd'}} />
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <b style={{color:'#666',}}>Bill Amount </b>
              <b style={{}}>: <span style={{color:'#000'}}>{currentBill?currentBill.s_charge:null}</span></b>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <TextField id="outlined-basic" label="Customer Paid Amount" variant="outlined" size="small" style={{width:'100%',height:0,marginLeft:15}} 
              value={bill_amount.paid_amount}
              onChange={(event)=>setBillAmount({...bill_amount, paid_amount: event.target.value})}
              />
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <TextField id="outlined-basic" label="Discount Amount" variant="outlined" size="small" style={{width:'100%',height:0,marginLeft:15}} 
              value={bill_amount.discount_amount}
              onChange={(event)=>setBillAmount({...bill_amount, discount_amount: event.target.value})}
              />
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <TextField id="outlined-basic" label="Add Message" variant="outlined" size="small" style={{width:'100%',height:0,marginLeft:15}} 
              value={bill_amount.admin_message}
              onChange={(event)=>setBillAmount({...bill_amount, admin_message: event.target.value})}
              />
          </Grid>
          
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Divider style={{backgroundColor:'#ddd'}} />
          </Grid>
        </Grid>
        
          <Grid container>
            <Grid item xs={12} sm={6} md={3} lg={3} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <b style={{color:'#111',width:'50%'}}><span>Bill Type</span></b>
              <b style={{width:'50%'}}>: <span style={{color:'#666'}}>{currentBill?currentBill.payment_method:null}</span></b>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
                <SelectBox status={pay_status} setPaymentStatus={setPaymentStatus} />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3} lg={3} style={{padding:10,alignItems:'center'}} >
              <Button variant="contained" style={{width:'100%',marginTop:6}}
              onClick={Update_Payment}>
                UPDATE
              </Button>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3} lg={3} style={{padding:10,alignItems:'center'}} >
              <Button variant="contained" style={{width:'100%',marginTop:6,backgroundColor:'#ccc',color:'#666'}}
              onClick={handleClose}>
                CLOSE
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={open2}
        onClose={()=>setOpen2(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{borderRadius:15,borderColor:'#666',borderWidth:1}}>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={4} md={4} lg={4} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <b style={{color:'#111',}}><b>Invoice ID</b></b>
              <b>: <b>{currentBill?currentBill.invoice_id:null}</b></b>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <b style={{color:'#111',}}>Customer Name </b>
              <b>: <b>{currentBill?currentBill.customer_name:null}</b></b>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
              <b style={{color:'#111'}}>Phone Number </b>
              <b>: <b>{currentBill?currentBill.customer_phoneno:null}</b></b>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Divider style={{backgroundColor:'#ddd'}} />
          </Grid>
          <Grid container xs={12} sm={12} md={12} lg={12} style={{height:250,overflowY:'scroll',paddingLeft:30,paddingRight:30}}>
          <Grid item xs={1} sm={1} md={1} lg={1} style={{display:'flex',paddingTop:20}}>
              <b style={{fontWeight:'bold'}}>No </b>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} style={{display:'flex',paddingTop:20}}>
              <b style={{fontWeight:'bold'}}>Machine Name </b>
          </Grid>
          <Grid item xs={5} sm={5} md={5} lg={5} style={{display:'flex',paddingTop:20}}>
              <b style={{fontWeight:'bold'}}>Part No </b>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Divider style={{backgroundColor:'#ddd'}} />
          </Grid>
          {
            machine.map((data, index)=>(
            <>
              <Grid item xs={1} sm={1} md={1} lg={1} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
                <span style={{paddingLeft:10}}>{index+1}</span>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
                <span style={{paddingLeft:10}}>{data.machineModel}</span>
              </Grid>
              <Grid item xs={5} sm={5} md={5} lg={5} style={{display:'flex',paddingTop:20,paddingBottom:20}}>
                <span style={{paddingLeft:10}}>{data.partNo}</span>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Divider style={{backgroundColor:'#ddd'}} />
              </Grid>
            </>
            ))
          }
          </Grid>
        </Grid>
        
          <Grid container>
            <Grid item xs={12} sm={6} md={9} lg={9} style={{padding:10,alignItems:'center'}} ></Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} style={{padding:10,alignItems:'center'}} >
              <Button variant="contained" style={{width:'100%',marginTop:6,backgroundColor:'#ccc',color:'#666'}}
              onClick={()=>setOpen2(false)}>
                CLOSE
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={deleteOpen}
        onClose={()=>setDeleteOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{width:400}}>
            <Typography style={{textAlign:'center'}}>
                <h3>Are you sure to remove this Bill</h3>
            </Typography>
            
            <Grid container>
            <Grid lg={6} md={6} sm={6} xs={6} item style={{padding:10,alignItems:'center'}} >
              <Button variant="contained" style={{width:'100%',backgroundColor:'#ccc',color:'#666'}}
              onClick={()=>setDeleteOpen(false)}>
                Cancel
              </Button>
            </Grid>
            <Grid lg={6} md={6} sm={6} xs={6} item style={{padding:10,alignItems:'center'}} >
              <Button variant="contained" color="primary" style={{width:'100%'}}
              onClick={DeleteBill}>
                Yes
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} sm={3} md={3} lg={3}>
            <Card elevation={2}>
                <Item style={{padding:15,backgroundColor:'#ccdce9'}}>
                    <b style={{color:'#333'}}>Total Services <b className={classes.count}>{total===0?"00":(total>9?total:`0${total}`)}</b></b>
                </Item>
            </Card>
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3}>
            <Card elevation={2}>
                <Item style={{padding:15,backgroundColor:'#ccdce9'}}>
                  <b style={{color:'#333'}}>Pending <b className={classes.count}>{pendingCount===0?"00":(pendingCount>9?pendingCount:`0${pendingCount}`)}</b></b>
                </Item>
            </Card>
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3}>
            <Card elevation={2}>
                <Item style={{padding:15,backgroundColor:'#ccdce9'}}>
                  <b style={{color:'#333'}}>Branch Received <b className={classes.count}>{recievedCount===0?"00":(recievedCount>9?recievedCount:`0${recievedCount}`)}</b></b>
                </Item>
            </Card>
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3}>
            <Card elevation={2}>
                <Item style={{padding:15,backgroundColor:'#ccdce9'}}>
                  <b style={{color:'#333'}}>Payment Done <b className={classes.count}>{completedCount===0?"00":(completedCount>9?completedCount:`0${completedCount}`)}</b></b>
                </Item>
            </Card>
        </Grid>
        <Grid item sm={12} xs={12} lg={12}>
          <Grid container>
            <Grid xs={6} md={4} lg={4} item style={{paddingRight:5,marginTop:10}}>
                <BasicDateRangePicker setValidDate={setValidDate} setDate1={setDate1} setDate2={setDate2} />
            </Grid>
            <Grid xs={3} md={3} lg={3} item style={{marginTop:10}}>
              <TextField id="outlined-basic" label="Enter Invoice Id or (Customer Number or Name)" variant="outlined" size="small" 
              style={{width:'100%'}} 
              onChange={(event)=>setSearchText(event.target.value)}/>
            </Grid>
            <Grid xs={2} md={3} lg={2} item style={{marginTop:-5}}>
              <SearchType setSearchType={setSearchType} searchType={searchType} />
            </Grid>
            <Grid xs={2} md={1} lg={2} item style={{marginTop:10}}>
              <Button variant="contained" style={{padding:7,width:'95%'}} onClick={searchBill}><SearchIcon /></Button>
            </Grid>
            <Grid xs={2} md={1} lg={1} item style={{marginTop:10}}>
              {
                bills.length>0?
                <ExportCSV csvData={bills} fileName={fileName} />
                :<Button variant="contained" style={{padding:7,width:'97%',backgroundColor:'#a6a6a6'}}><FileDownloadIcon /></Button>
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box>
        <ViewBills bills={bills} getDataById={getDataById} getMachineDataById={getMachineDataById} deleteById={deleteById} />
      </Box>
    </Box>
    </div>
  );
}
export default ManagerHome;