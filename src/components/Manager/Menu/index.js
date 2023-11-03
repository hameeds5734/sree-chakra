import React, { useState, useEffect, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PrintIcon from '@mui/icons-material/Print';
import Button from '@mui/material/Button';

import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import { AuthContext } from '../../AuthProvider';

const drawerWidth = 240;
const useStyles = makeStyles({
    menuItem: {
        backgroundColor:'#fff'
    }
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function ManagerMenu({children}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState(false)
  const {user, currentMenu, setCurrentMenu, currentMenuName, setCurrentMenuName} = useContext(AuthContext);

  const handleClick = (no) => {
    setOpenSubmenu(!openSubmenu)
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (urlname, name, no) => {
    setCurrentMenu(no)
    navigate(`${urlname}`)
    setCurrentMenuName(name)
  }

  const LogOut = () => {
    window.location ="/";
    localStorage.clear();
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {currentMenuName}
          </Typography>
          <Typography>{user.name}</Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem button style={{backgroundColor:(currentMenu===0?'#fff':null)}} onClick={()=>handleMenu('/','Bills',0)}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
            <ListItem button style={{backgroundColor:(currentMenu===3?'#fff':null)}} onClick={()=>handleMenu('/amount','Bills Amount',3)}>
              <ListItemIcon>
                <CurrencyRupeeIcon />
              </ListItemIcon>
              <ListItemText primary={'Amount'} />
            </ListItem>
            {/* <ListItem button style={{backgroundColor:(currentMenu===4?'#fff':null)}} onClick={()=>handleMenu('/print','Print Bill',4)}>
              <ListItemIcon>
                <PrintIcon />
              </ListItemIcon>
              <ListItemText primary={'Print Bill'} />
            </ListItem> */}
            <ListItem button style={{backgroundColor:(currentMenu===1?'#fff':null)}} onClick={()=>handleMenu('/addemployee','Add Employee',1)}>
              <ListItemIcon>
                <PersonAddAltIcon />
              </ListItemIcon>
              <ListItemText primary={'Add Employee'} />
            </ListItem>
            <ListItem button style={{backgroundColor:(currentMenu===2?'#fff':null)}} onClick={()=>handleMenu('/viewemployees','View Employees',2)}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={'View Employees'} />
            </ListItem>
            <Divider />
            <ListItem button component="a" href="/login" onClick={()=>{localStorage.clear();}}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div style={{ minHeight:'100%'}}>
        {children}
        </div>
      </Box>
    </Box>
  );
}
