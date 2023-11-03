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
import { Link } from 'react-router-dom';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import { AuthContext } from '../../AuthProvider';
import AllServices from '../../../Services/AllServices';
// import branches from '../../../__mocks__/employees';

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

const ListBranch = ({getAllBranch, branchList}) => {
  const {user, setCurrentMenu, setCurrentMenuName} = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentBch, setCurrentBch] = useState({})

  const [deleteId, setDeleteId] = useState(null)

  const handleClose = () => setOpen(false);

  const getDataById = (val) => {
    const filteredRows = branchList.filter((row) => {
      return row.id === val;
    });
    setCurrentBch(filteredRows[0]);
    setOpen(true);
  };

  const UpdateBch = () => {
    axios.put(AllServices.UPDATE_BRANCH(), {currentBch}).then(response=>{
      console.log(response.data)
      if(response.data.status === 200){
        getAllBranch();
      }
      else{
      }
    }).catch(error=>{
      console.log(error)
    })
    setOpen(false);
  }

  const DeleteBch = () => {
    axios.delete(AllServices.DELETE_BRANCH(deleteId)).then(response=>{
      console.log(response.data)
      if(response.data.status === 200){
        getAllBranch();
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
        <TextField id="standard-basic" variant="outlined" label="Branch Name" style={{width:'100%'}} 
          defaultValue={currentBch?currentBch.branch_name:null} 
          onChange={(event)=>setCurrentBch({...currentBch, branch_name: event.target.value})}
          />
          <Grid container>
            <Grid lg={6} md={6} sm={6} xs={6} item style={{padding:10,alignItems:'center'}} >
              <Button variant="contained" style={{width:'100%',backgroundColor:'#ccc',color:'#000'}}
              onClick={handleClose}>
                Cancel
              </Button>
            </Grid>
            <Grid lg={6} md={6} sm={6} xs={6} item style={{padding:10,alignItems:'center'}} >
              <Button variant="contained" color="primary" style={{width:'100%'}}
              disabled={currentBch.branch_name == ''? true:false}
              onClick={UpdateBch}>
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
                <h3>Are you sure to remove this manager account</h3>
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
              onClick={DeleteBch}>
                Yes
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    
    <Box>
    <Card elevation={3}>
    <TableContainer sx={{ maxHeight: 540 }}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>No</b></TableCell>
            <TableCell><b>Branch Name</b></TableCell>
            <TableCell><b>Edit</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {branchList.map((data, index) => (
            <TableRow
              key={data.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{index+1}</TableCell>
              <TableCell>{data.branch_name}</TableCell>
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
    </Box>
    </div>
  );
}
export default ListBranch;