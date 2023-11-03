import React, {useEffect, useContext, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Typography } from '@mui/material';

import { AuthContext } from '../../AuthProvider';
import AllServices from '../../../Services/AllServices';
// import emp from '../../../__mocks__/employees';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function createData(employee_name, username, password, carbs, action) {
  return { employee_name, username, password, carbs, action };
}

const rows = [
  createData('Branch 1', 'Ramesh', 'user1', 'pass1', 4.0),
];

const ViewEmployees = () => {
  const {user, setCurrentMenu, setCurrentMenuName} = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [emp, setEmp] = useState([]);
  const [currentEmp, setCurrentEmp] = useState({})

  const [deleteId, setDeleteId] = useState(null)

  const handleClose = () => setOpen(false);

  useEffect(()=>{
    setCurrentMenu(2);
    setCurrentMenuName('View Employees');
  },[])

  useEffect(()=>{
      axios.get(AllServices.GET_EMPLOYEE(user.branch_id)).then(response=>{
        console.log(response.data)
        if(response.data.status === 200){
            setEmp(response.data.emp)
        }
        else{
        }
      }).catch(error=>{
        console.log(error)
      })
  },[])

  const getEmp = () => {
    axios.get(AllServices.GET_EMPLOYEE(user.branch_id)).then(response=>{
      console.log(response.data)
      if(response.data.status === 200){
          setEmp(response.data.emp)
      }
      else{
      }
    }).catch(error=>{
      console.log(error)
    })
  }

  const getDataById = (val) => {
    const filteredRows = emp.filter((row) => {
      return row.id === val;
    });
    setCurrentEmp(filteredRows[0]);
    setOpen(true);
  };

  const UpdateEmp = () => {
    axios.put(AllServices.UPDATE_EMPLOYEE(), {currentEmp}).then(response=>{
      console.log(response.data)
      if(response.data.status === 200){
        getEmp();
      }
      else{
      }
    }).catch(error=>{
      console.log(error)
    })
    setOpen(false);
  }

  const DeleteEmp = () => {
    axios.delete(AllServices.DELETE_EMPLOYEE(deleteId)).then(response=>{
      console.log(response.data)
      if(response.data.status === 200){
        getEmp();
      }
      else{
      }
    }).catch(error=>{
      console.log(error)
    })
    setDeleteOpen(false)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField id="standard-basic" variant="outlined" label="Name" style={{width:'100%',padding:10}} 
          defaultValue={currentEmp?currentEmp.employee_name:null} 
          onChange={(event)=>setCurrentEmp({...currentEmp, employee_name: event.target.value})}
          />
          <TextField id="standard-basic" variant="outlined" label="Username" style={{width:'100%',padding:10}} 
          defaultValue={currentEmp?currentEmp.username:null} 
          onChange={(event)=>setCurrentEmp({...currentEmp, username: event.target.value})}/>
          <TextField id="standard-basic" variant="outlined" label="Password" style={{width:'100%',padding:10}} 
          defaultValue={currentEmp?currentEmp.password:null} 
          onChange={(event)=>setCurrentEmp({...currentEmp, password: event.target.value})}/>
          <Grid container>
            <Grid lg={6} md={6} sm={6} xs={6} item style={{padding:10,alignItems:'center'}} >
              <Button variant="contained" style={{width:'100%',backgroundColor:'#ccc',color:'#000'}}
              onClick={handleClose}>
                Cancel
              </Button>
            </Grid>
            <Grid lg={6} md={6} sm={6} xs={6} item style={{padding:10,alignItems:'center'}} >
              <Button variant="contained" color="primary" style={{width:'100%'}}
              onClick={UpdateEmp}>
                Update
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
        <Box sx={style}>
            <Typography style={{textAlign:'center'}}>
                <h3>Are you sure to remove this employee account</h3>
            </Typography>
            
            <Grid container>
            <Grid lg={6} md={6} sm={6} xs={6} item style={{padding:10,alignItems:'center'}} >
              <Button variant="contained" style={{width:'100%',backgroundColor:'#ccc',color:'#000'}}
              onClick={()=>setDeleteOpen(false)}>
                Cancel
              </Button>
            </Grid>
            <Grid lg={6} md={6} sm={6} xs={6} item style={{padding:10,alignItems:'center'}} >
              <Button variant="contained" color="primary" style={{width:'100%'}}
              onClick={DeleteEmp}>
                Yes
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      
    <Card elevation={3}>
    <TableContainer sx={{ maxHeight: 540 }}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={6}>
              <b>Number of Employees {emp.length}</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Employee Id</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Username</b></TableCell>
            <TableCell><b>Password</b></TableCell>
            <TableCell><b>last invoice id</b></TableCell>
            <TableCell><b>Action</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emp.map((data) => (
            <TableRow
              key={data.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.employee_name}</TableCell>
              <TableCell>{data.username}</TableCell>
              <TableCell>{data.password}</TableCell>
              <TableCell>{data.last_invoice_id}</TableCell>
              <TableCell style={{width:180}}>
                <Button variant="contained" onClick={()=>getDataById(data.id)}>
                    <EditIcon style={{fontSize:16}} />
                </Button>&nbsp;
                <Button variant="contained" style={{backgroundColor:'#0f1d6b'}} 
                onClick={()=>{
                  setDeleteOpen(true)
                  setDeleteId(data.id)
                }}>
                    <DeleteIcon style={{fontSize:16}} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Card>
    </div>
  );
}
export default ViewEmployees;