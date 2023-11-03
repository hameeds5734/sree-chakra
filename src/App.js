import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { HashRouter as Router, Route, Link, Routes } from 'react-router-dom';
import LoadingImg from './image/loading.svg';
import { AuthContext } from './components/AuthProvider';
import { Offline, Online } from "react-detect-offline";
import offline from './image/offline.svg'
import './App.css';

const AdminMenu = React.lazy(() => import('./components/Admin/Menu'));
const AddManager = React.lazy(() => import('./components/Admin/AddManagers'));
const AdminHome = React.lazy(() => import('./components/Admin/AdminHome'));
const AdminTarget = React.lazy(() => import('./components/Admin/Target'));
const ViewBranch = React.lazy(() => import('./components/Admin/ViewBranch'));
const ViewManagers = React.lazy(() => import('./components/Admin/ViewManagers'));
const SearchBill = React.lazy(() => import('./components/Admin/SearchBill'));
const AllBills = React.lazy(() => import('./components/Admin/AllBills'));

const ManagerHome = React.lazy(() => import('./components/Manager/ManagerHome'));
const ManagerMenu = React.lazy(() => import('./components/Manager/Menu'));
const Target = React.lazy(() => import('./components/Manager/Target'));
// const PrintBill = React.lazy(() => import('./components/Manager/PrintBill'));
const AddEmployee = React.lazy(() => import('./components/Manager/AddEmployee'));
const ViewEmployees = React.lazy(() => import('./components/Manager/ViewEmployee'));

const Login = React.lazy(() => import('./components/Login/Login'));

const App = () => {
  const [user, setUser] = useState();
  const [currentMenu, setCurrentMenu] = useState(0);
  const [currentMenuName, setCurrentMenuName] = useState('Home');

  const [loading, setLoading] = useState(true);

  const authContext = useMemo(()=>({
    user,
    setUser,
    currentMenu,
    setCurrentMenu,
    currentMenuName,
    setCurrentMenuName
  }));

  useEffect(()=>{
    const getData = async () => {
      let id = await localStorage.getItem('id');
      let name = await localStorage.getItem('name');
      let username = await localStorage.getItem('username');
      let branch_id = await localStorage.getItem('branch_id');
      let account_type = await localStorage.getItem('account_type');
      let branch_name = await localStorage.getItem('branch_name');
      if(id !=null){
        setUser({
          id:id,
          name:name,
          username:username,
          branch_id:branch_id,
          account_type:account_type,
          branch_name: branch_name
        })
        setLoading(false);
      }else{
        setLoading(false);
      }
    }
    getData();
  },[])

  return (
    <AuthContext.Provider value={authContext}>
    {/* <Online> */}
    <Router>
    {
      loading?
    <img src={LoadingImg} style={{width:100,height:100}} className='loadingimg' />
    :<Suspense fallback={
      <img src={LoadingImg} style={{width:100,height:100}} className='loadingimg' />
    }>
      {
        !user?
      <Login />
      :(user.account_type == 0?
      <div className="App">
        <AdminMenu>
          <Routes>
            <Route path='/' element={<AllBills/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/totalamount' element={<AdminTarget/>}></Route>
            <Route path='/branch' element={<AdminHome/>}></Route>
            <Route path='/addmanager' element={<AddManager/>}></Route>
            <Route path='/viewbranch/:branch_id' element={<ViewBranch/>}></Route>
            <Route path='/viewmanagers' element={<ViewManagers/>}></Route>
            <Route path='/searchbill' element={<SearchBill/>}></Route>
          </Routes>
        </AdminMenu>
      </div>
      :<div className="App">
      <ManagerMenu>
        <Routes>
          <Route path='/' element={<ManagerHome/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/amount' element={<Target/>}></Route>
          {/* <Route path='/print' element={<PrintBill/>}></Route> */}
          <Route path='/addemployee' element={<AddEmployee/>}></Route>
          <Route path='/viewemployees' element={<ViewEmployees/>}></Route>
        </Routes>
      </ManagerMenu>
    </div>)
      }
      </Suspense>
      }
    </Router>
    {/* </Online> */}
    {/* <Offline>
      <div className='offline-div'>
        <img src={offline} style={{width:300,height:300}} />
        <h3 style={{textAlign:'center'}}>No Internet Connection</h3>
      </div>
    </Offline> */}
    </AuthContext.Provider>
  );
}

export default App;
