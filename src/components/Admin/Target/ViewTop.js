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
import Box from '@mui/material/Box';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import moment from 'moment';

import Record from '../../../image/record.svg';
import { AuthContext } from '../../AuthProvider';

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

const ViewTop = ({servicePersons}) => {
  
  return (
    <Card elevation={2}>
    <TableContainer sx={{ maxHeight: 450 }}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>ID(username)</b></TableCell>
            <TableCell><b>Employee Name</b></TableCell>
            <TableCell><b>Payment Status</b></TableCell>
            <TableCell><b>Total Amount</b></TableCell>
            <TableCell><b>:</b></TableCell>
            <TableCell><b>Paid</b></TableCell>
            <TableCell><b>Discount</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {servicePersons.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.employee_name}</TableCell>
              <TableCell><b style={{color:row.payment_status =="PENDING"?'red':(row.payment_status=="RECEIVED"?"#0f1d6b":"green")}}>{row.payment_status}</b></TableCell>
              <TableCell>{row.total_amount}</TableCell>
              <TableCell><b>:</b></TableCell>
              <TableCell>{row.payment_status =="PENDING"?"-":row.paid}</TableCell>
              <TableCell>{row.payment_status =="PENDING"?"-":row.discount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Card>
  );
}
export default ViewTop;