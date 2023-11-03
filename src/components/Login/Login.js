import './login.css';
import Images from '../../image/images.jpg';
import Bg from '../../image/bg.svg'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';

import { AuthContext } from '../AuthProvider';
import AllServices from '../../Services/AllServices';

const Login = () => {
    const {user, setUser} = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false)
    const [errmsg, setErrMsg]= useState('');
    
    const LoginToApp = () => {
        if(username != '' && password != ''){
            axios.post(AllServices.LOGIN(), {username:username, password:password}).then(response=>{
                console.log(response.data)
                if(response.data.status === 200){
                    localStorage.setItem('loginstatus', true);
                    localStorage.setItem('id', response.data.userData.id);
                    localStorage.setItem('name', response.data.userData.name);
                    localStorage.setItem('username', response.data.userData.username);
                    localStorage.setItem('branch_id', response.data.userData.branch_id);
                    localStorage.setItem('account_type', response.data.userData.account_type);
                    localStorage.setItem('branch_name', response.data.userData.branch_name);
                    setUser(response.data.userData)
                }
                else{
                    if(response.data.status === 400){
                        setErrMsg('This account Branch is not available')
                        setError(true)
                    }else{
                        setErrMsg('Username or Password is incorrect')
                        setError(true)
                    }
                }
            }).catch(error=>{
            })
        }
    }

    useEffect(()=>{
        localStorage.clear();
    },[])

  return (
    <div>
        {/* <img className="wave" src={Wave} /> */}
        <div className="container">
            <div className="img">
                <img src={Bg} style={{width:400}} />
            </div>
            <div className="login-content">
                <div className='form'>
                    <img src={Images} />
                    <h2 style={{fontSize:26}}>Sree Chakra Sewing SYstems</h2>
                    {error?<b style={{color:'red'}}>{errmsg}</b>:null}
                    <br />
                    <br />
                    <TextField id="outlined-basic" label="Username" variant="outlined" size="Normal" style={{width:'100%'}} 
                    onChange={(event)=>{
                        setError(false)
                        setUsername(event.target.value)
                    }}
                    />
                    <br/>
                    <br/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" size="Normal" style={{width:'100%'}}
                    type="password" 
                    onChange={(event)=>{
                        setError(false)
                        setPassword(event.target.value)
                    }}
                    />
                    <br/>
                    <br/>
                    <Button variant="contained" style={{width:'100%',padding:10}} 
                    onClick={LoginToApp}>LOGIN &nbsp;<LoginIcon/></Button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Login;
