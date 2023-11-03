import React, { useEffect, useContext, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import SelectBox from './SelectBox';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';

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

const AddManager = () => {
  const {user, setCurrentMenu, setCurrentMenuName} = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [manager, setManager] = useState({
    name:'',
    username:'',
    password:'',
  });
  const [branch, setBranch] = useState('');

  useEffect(()=>{
    setCurrentMenu(1);
    setCurrentMenuName('Add Branch Admin');
  },[])

  const AddNewManager = () => {
    console.log(branch)
    axios.post(AllServices.ADD_MANAGER(), {
      name: manager.name,
      username: manager.username,
      password: manager.password,
      branch_id: branch
    }).then(response=>{
        console.log(response.data)
        setOpen(true);
        if(response.data.status === 200){
            setMsg('New Branch Admin Account Created Successfully!!')
            setManager({
                name:'',
                username:'',
                password:'',
            })
            setBranch('')
        }
        else{
            setMsg('Unable to Create Branch Admin Account')
        }
    }).catch(error=>{
        setOpen(true);
        setMsg('Unable to Create Branch Admin Account')
    })
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography style={{textAlign:'center'}}>
                <h3>{msg}</h3>
            </Typography>
            
            <Button variant="contained" color="primary" style={{width:'40%',marginTop:20,marginLeft:'30%'}}
            onClick={()=>setOpen(false)}>
                    Ok
            </Button>
        </Box>
      </Modal>
      <Container maxWidth="sm">
      <Card elevation={5}>
        <Box sx={{ bgcolor: '#fff', p:2 }}>
          <Box sx={{ m: 3 }}>
            <TextField id="outlined-basic" label="Branch Admin Name" variant="outlined" size="Normal" style={{width:'100%'}} 
            value={manager.name}
            onChange={(event)=>setManager({...manager, name: event.target.value})}/>
          </Box>
          <Box sx={{ m: 3 }}>
            <TextField id="outlined-basic" label="Username" variant="outlined" size="Normal" style={{width:'100%'}} 
            value={manager.username}
            onChange={(event)=>setManager({...manager, username: event.target.value})}/>
          </Box>
          <Box sx={{ m: 3 }}>
            <TextField id="outlined-basic" label="Password" variant="outlined" size="Normal" style={{width:'100%'}} 
            value={manager.password}
            onChange={(event)=>setManager({...manager, password: event.target.value})}/>
          </Box>
          <Box sx={{ m: 3 }}>
            <SelectBox setBranch={setBranch} branch={branch} />
          </Box>
          <Box sx={{ m: 3 }}>
            <Button variant="contained" style={{width:'100%'}} onClick={AddNewManager} 
            disabled={manager.name == '' || manager.user == '' || manager.password ==''? true:false}>Add</Button>
          </Box>
        </Box>
        </Card>
      </Container>
    </React.Fragment>
  );
}
export default AddManager;