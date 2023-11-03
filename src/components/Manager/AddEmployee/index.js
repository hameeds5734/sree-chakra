import React, { useEffect, useContext, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Typography } from '@mui/material';

import add from '../../../image/add.svg';
import { AuthContext } from '../../AuthProvider';
import AllServices from '../../../Services/AllServices';

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

const AddEmployee = () => {
    const {user, setCurrentMenu, setCurrentMenuName} = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [employee, setEmployee] = useState({
        employee_name:'',
        username:'',
        password:'',
        branch_id:user.branch_id
    });

    const handleClose = () => setOpen(false);

    useEffect(()=>{
        setCurrentMenu(1);
        setCurrentMenuName('Add Employees');
    },[])

    const AddNewEmployee = () => {
        axios.post(AllServices.ADD_EMPLOYEE(), {employee}).then(response=>{
            console.log(response.data)
            setOpen(true);
            if(response.data.status === 200){
                setMsg('New Employee Account Created Successfully!!')
                setEmployee({
                    employee_name:'',
                    username:'',
                    password:'',
                    branch_id:user.branch_id,
                    account_type:2
                })
            }
            else{
                setMsg('Unable to Create Employee Account')
            }
        }).catch(error=>{
            setOpen(true);
            setMsg('Unable to Create Employee Account')
        })
    }

  return (
    <React.Fragment>
        <CssBaseline />
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography style={{textAlign:'center'}}>
                <h3>{msg}</h3>
            </Typography>
            
            <Button variant="contained" color="primary" style={{width:'40%',marginTop:20,marginLeft:'30%'}}
            onClick={handleClose}>
                    Ok
            </Button>
        </Box>
      </Modal>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item sm={3} xs={12} md={2} lg={3}></Grid>
            <Grid item sm={12} xs={12} md={8} lg={6}>
            <Typography style={{textAlign:'center'}}>
                <h2>{user.branch_name}</h2>
                <h3>Add Service Employees</h3>
                <br/>
            </Typography>
                <Card elevation={3}>
                    <Box sx={{ bgcolor: '#fff', p:2 }}>
                    <Box sx={{ m: 3 }}>
                        <TextField id="outlined-basic" label="Employee Name" variant="outlined" size="Normal" style={{width:'100%'}} 
                        value={employee.employee_name}
                        onChange={(event)=>setEmployee({...employee, employee_name: event.target.value})}/>
                    </Box>
                    <Box sx={{ m: 3 }}>
                        <TextField id="outlined-basic" label="Username" variant="outlined" size="Normal" style={{width:'100%'}} 
                        value={employee.username}
                        onChange={(event)=>setEmployee({...employee, username: event.target.value})}/>
                    </Box>
                    <Box sx={{ m: 3 }}>
                        <TextField id="outlined-basic" label="Password" variant="outlined" size="Normal" style={{width:'100%'}} 
                        value={employee.password}
                        onChange={(event)=>setEmployee({...employee, password: event.target.value})}/>
                    </Box>
                    <Box sx={{ m: 3 }}>
                        <Button variant="contained" style={{width:'100%'}} onClick={AddNewEmployee} 
                        disabled={
                            employee.employee_name!='' && employee.username!='' && employee.password!=''?false:true}
                        >Add</Button>
                    </Box>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    </React.Fragment>
  );
}
export default AddEmployee;