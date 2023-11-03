import React, { useEffect, useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

import AllServices from '../../../Services/AllServices';
import { AuthContext } from '../../AuthProvider';
import ListBranch from './ListBranch';

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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


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

const AdminHome = () => {
    const classes = useStyles();
    const {user, setCurrentMenu, setCurrentMenuName} = useContext(AuthContext);
    const [branchList, setBranchList] = useState([])
    const [open, setOpen] = useState(false);
    const [errorOpen, setError] = useState(false);
    const [msg, setMsg] = useState('');

    const [newBranchName, setNewBranchName] = useState("");
  
    useEffect(()=>{
        setCurrentMenu(0);
        setCurrentMenuName('Home');
    },[])

    const MoveTo = (id) => {
        window.location =`/viewbranch/${id}`;
    }

    useEffect(()=>{
        axios.get(AllServices.GET_ALL_BRANCHES()).then(response=>{
          setBranchList(response.data.branchs)
        }).catch(error=>{
          console.log(error)
        })
      },[])

      const getAllBranch = () => {
        axios.get(AllServices.GET_ALL_BRANCHES()).then(response=>{
          setBranchList(response.data.branchs)
        }).catch(error=>{
          console.log(error)
        })
      }
      const AddNewBranch = () =>{
        axios.post(AllServices.ADD_BRANCH(), {
          branch_name: newBranchName,
        }).then(response=>{
            setError(true)
            setOpen(false)
            if(response.data.status === 200){
                setMsg('New Branch Added Successfully!!')
                setNewBranchName('')
                getAllBranch();
            }
            else{
                setMsg('Unable to Create Branch')
            }
        }).catch(error=>{
            setError(true)
            setOpen(false)
            setNewBranchName('')
            setMsg('Unable to Create Branch')
        })
      }

    return (
    <Box sx={{ width: '100%' }}>
      <Modal
        open={errorOpen}
        onClose={()=>setError(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography style={{textAlign:'center'}}>
                <h3>{msg}</h3>
            </Typography>
            
            <Button variant="contained" color="primary" style={{width:'40%',marginTop:20,marginLeft:'30%'}}
            onClick={()=>setError(false)}>
                    Ok
            </Button>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField id="standard-basic" variant="outlined" label="Branch Name" style={{width:'100%'}} 
          defaultValue={newBranchName} 
          onChange={(event)=>setNewBranchName(event.target.value)}
          />
          <Grid container>
            <Grid lg={6} md={6} sm={6} xs={6} item style={{padding:10,alignItems:'center'}} >
              <Button variant="contained" style={{width:'100%',backgroundColor:'#ccc',color:'#000'}}
              onClick={()=>setOpen(false)}>
                Cancel
              </Button>
            </Grid>
            <Grid lg={6} md={6} sm={6} xs={6} item style={{padding:10,alignItems:'center'}} >
              <Button variant="contained" color="primary" style={{width:'100%'}}
              disabled={newBranchName == ""? true:false}
              onClick={AddNewBranch}>
                Add Branch
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
            branchList.map((branch)=>{
                return(
                    <Grid item xs={12} sm={6} md={6} lg={6} key={branch.id}>
                        <Card elevation={2}>
                            <Item style={{padding:5}}>
                              <Link to={`/viewbranch/${branch.id}`} style={{textDecoration:'none'}} >
                                <Button style={{textDecoration:'none',width:'100%',padding:15}}>
                                        <b style={{color:'#333'}}>{branch.branch_name}</b>
                                </Button>
                              </Link>
                            </Item>
                        </Card>
                    </Grid>
                )
            })
        }
      </Grid>
      <br/>
      <div style={{textDecoration:'none',position:'absolute'}}>
        <Button variant="contained" onClick={()=>setOpen(true)}>Add Branch &nbsp;<AddBusinessIcon /></Button>
      </div>
      <br/>
      <br/>
      <ListBranch getAllBranch={getAllBranch} branchList={branchList}/>
    </Box>
  );
}
export default  AdminHome;