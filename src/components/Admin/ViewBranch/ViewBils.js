import React, {useEffect, useContext, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import DescriptionIcon from '@mui/icons-material/Description';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import Box from '@mui/material/Box';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';

import Record from '../../../image/record.svg';
import { AuthContext } from '../../AuthProvider';
import moment from 'moment';

const ImageStyle = {
  position: 'fixed',
  top: '70%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  alignSelf:'center'
};

function createData(name, username, password, date, protein) {
  return { name, username, password, date, protein };
}

const rows = [
  createData('Ramesh', 'user1', 'pass1', '9876543211'),
];

const ViewBills = ({bills, getDataById, getMachineDataById, deleteById}) => {
  
  return (
    <Card elevation={2}>
    <TableContainer sx={{ maxHeight: 450 }}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Invoice ID</b></TableCell>
            <TableCell><b>Employee Name</b></TableCell>
            <TableCell><b>Customer Name</b></TableCell>
            <TableCell><b>Date</b></TableCell>
            <TableCell><b>Payment</b></TableCell>
            <TableCell><b>Amount</b></TableCell>
            <TableCell><b>Paid</b></TableCell>
            <TableCell><b>Bill</b></TableCell>
            <TableCell><b>Machines</b></TableCell>
            <TableCell><b>Delete</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bills.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.invoice_id}</TableCell>
              <TableCell>{row.employee_name}</TableCell>
              <TableCell>{row.customer_name}</TableCell>
              <TableCell>{moment(row.bill_date).format('DD-MM-YYYY')}</TableCell>
              <TableCell><b style={{color:row.payment_status =="PENDING"?'red':(row.payment_status=="RECEIVED"?"#0f1d6b":"green")}}>{row.payment_status}</b></TableCell>
              <TableCell>{row.s_charge}</TableCell>
              <TableCell>{row.paid_amount}</TableCell>
              <TableCell>
                <Button variant="contained" style={{width:10,backgroundColor:'#0f1d6b'}} onClick={()=>getDataById(row.id)}>
                  <EditIcon style={{fontSize:16}} />
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="contained" style={{width:10}} onClick={()=>getMachineDataById(row.id)}>
                  <Inventory2Icon style={{fontSize:16}} />
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="contained" style={{width:10,borderColor:'#000',backgroundColor:'#000'}} onClick={()=>deleteById(row.id)}>
                    <DeleteIcon style={{fontSize:16,color:'#fff'}} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {
          bills.length==0?
          <Box sx={ImageStyle}>
              <img src={Record} style={{width:200}} />
          </Box>:null
        }
    </TableContainer>
    </Card>
  );
}
export default ViewBills;