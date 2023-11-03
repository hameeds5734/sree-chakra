import React, { useEffect, useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import moment from 'moment';
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Html from 'react-pdf-html';

import { AuthContext } from '../../AuthProvider';
import AllServices from '../../../Services/AllServices';
import PDFImages from '../../../image/pdfimages';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


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

const htmlContent = (machineHtmlData, Bill) => {
  return (`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>invoice</title>
      <style>
          *{
              font-family: Arial;
          
          }
          table {
    border-collapse: collapse;
    
    margin-top: 3%;
    
       }
    
       .label {
    color: white;
    padding: 18px;
    font-family: Arial;
  }
  .other {background-color: #e7e7e7; color: black;} /* Gray */ 
  #invoice p{display: inline-block;}
  
  .footer {
     position:absolute;
     margin-left: 5%;
     
     width: 90%;
     
     text-align: center;
  }
  
  
      </style>
  </head>
  <body>
      <div style="margin-top: 5%;width: 100%;">
      <span class="label other" style="margin-left: 80%;font-weight: bold;">SERVICE REPORT</span>
  
      <table style="margin-left: 5%;width: 90%;">
      <tr>
      <td>
          <div style="display: flex;">
              <img src="${PDFImages.logo}" height="100px" width="100px">
              <img src="${Bill.name_image}" height="100px" width="600px">
          </div>
      </td>
      <td style="text-align: right;font-weight: bold;">Phone: (+91-0452) 4355745<br/><br/>Phone: (+91-0452) 4355785<br/><br/>${Bill.gst}</td>
          
      </tr>
      <tr >
          <td colspan="2" style="font-weight: bold;width: 500px; " ><span>Plot No. 59, Sakthi Velammal First Main Road, Avenue Street, Bye-Pass Road, S.S.Colony, Madurai - 625 016. Tamil Nadu. India.</span></td>
      </tr>
  </table>
      <hr size="4" width="90%" color="#660000">  
     
      <table style="margin-left: 5%;width: 90%;">
          <tr>
      <td  style="width:500px;font-weight: bold;">BILL TO</td>
     
      <td style="text-align: right;width: 500px;font-weight: bold;">${Bill.bill_date}</td>
          </tr>
          <tr>
              <td style="width:500px;">
                  <p style="font-weight: bold;">${Bill.customer_name}</p>
                  <p>${Bill.customer_address}</p>
                  <p>${Bill.customer_phoneno}</p>
              </td>
              <td style="text-align: right;width: 500px;">
                  <div id="invoice" >
                      <p style="font-weight: bold;">INVOICE ID :  </p><p> ${Bill.invoice_id}</p>
                      </div>
              </td>
          </tr>
      </table>
      <div style="margin-left:5%;padding-top:5px;width: 90%;background-color:#D7DBDD;height: 25px;text-align: center;"></div>
  
      <table style="margin-left: 5%;">
          <tr>
   <td style="width: 200px;"><p style="font-weight: bold;">Nature of job </p></td>
   <td>: ${Bill.nature_of_job}</td>
          </tr>
          <tr>
          <td style="width: 200px;"><p style="font-weight: bold;">Rectification Details </p></td>
          <td>: ${Bill.rectification_details}</td>
          </tr>
          ${machineHtmlData}
      </table>
      <hr size="30" width="90%" color="#D7DBDD">  
      <div style="width: 500px;margin-top:2% ;margin-left: 5%;">
      <table>
      <tr>
          <td style="width: 500px;"><p style="font-weight: bold;">Certify that the machine is in Satisfactory working Condition :</p></td>
          <td><p>${Bill.working_condition}</p></td>
          
      </tr>
  </table>
  </div>
  <div style="margin-top:0px;width: 550px;height:300px;float:right;margin-right: 5%;">
  <table style="margin-left:25%;width: 400px;text-align: left;">
      <tr>
          <td><p style="font-weight: bold;">Time in  </p></td>
          <td><p>: ${Bill.in_time}</p></td>
      </tr>
      <tr>
          <td><p style="font-weight: bold;">Time out  </p></td>
          <td><p>: ${Bill.out_time}</p></td>
      </tr>
      <tr>
          <td><p style="font-weight: bold;">Payment Method</p></td>
          <td><p>: ${Bill.payment_method}</p></td>
      </tr>
      <tr>
          <td><p style="font-weight: bold;">Service charges  </p></td>
          <td><p>: ${Bill.s_charge}</p></td>
      </tr>
      <tr>
          <td><p style="font-weight: bold;">Service Engineer Signature (${Bill.employee_name})</p></td>
      </tr>
      <tr>
          <td colspan="2"><img src="${AllServices.GET_SIGN_IMAGE(Bill.s_sign)}" width="300px" height="90px"></td>
      </tr>
  </table>
  </div>
      <div style="margin-top:4%;margin-left:5%;padding-top:5px;width: 40%;background-color:#D7DBDD;height: 25px;text-align: center;">Remarks</div>
      <div style="margin-left:5%;padding-top:15px;width: 40%;background-color:#ede4e4;height: 100px;text-align: center;">${Bill.remarks}</div>
  <table style="margin-left: 5%;width: 300px;">
      <tr><td>
          <p style="font-weight: bold;">Signature of customer (${Bill.signed_by})</p>
      </td>
      </tr>
      <tr>
          <td colspan="2"><img src="${AllServices.GET_SIGN_IMAGE(Bill.c_sign)}" width="300px" height="90px"></td>
          
      </tr>
  </table>
      </div>
      <hr size="4" width="90%" color="#660000">  
  
      <div class="footer">
      
          <table style="text-align: left;width: 1500px;" >
              <tr>
                  <td rowspan="4" style="text-align:center"><b>Scan to Pay</b><br/><img src="${PDFImages.gpay}" style="height: 90px;width:90px;"></td>
                  <td style="padding-bottom: 10px;">B.O.1 : 26B, Nethaji Road, (Near Eagle Masala) Madurai - 625 001. Tamil Nadu. India.</td>
              </tr>
              <tr>
                  <td colspan="2" style="padding-bottom: 10px;">B.O.2 : No. 1/71D1, Main Road, Kamaraj Nagar Bus Stop, Oppo. to EB office, Dhalavaipuram, <br/>Rajapalayam Taluk, 626 188. Tamil Nadu. India.</td>
              </tr>
              <tr>
                  <td colspan="2" style="padding-bottom: 10px;">B.O.3 : Plot No:990, 'H' Block, 2nd Street, 11th Main Road, Anna nagar, Chennai-600 040.Tamilnadu, India.</td>
              </tr>
             
              <tr>
                  <td colspan="2" style="padding-bottom: 10px;">B.O.4:  Maligaikal Building, Sundaragiri 1st Karippai Road, Kalamaserry, Cochin-683 104, Kerala, India</td>
              </tr>
          </table>
        </div>
  </body>
  </html>`
)}

const Target = () => {
  const classes = useStyles();
  const {user, setCurrentMenu, setCurrentMenuName} = useContext(AuthContext);
  
  const [ billData, setBillData] = useState({})
  const [ machine, setMachine] = useState([])
  const [ searchText, setSearchText] = useState('')

  useEffect(()=>{
      setCurrentMenu(4);
      setCurrentMenuName('Print Bill');
  },[])

  useEffect(()=>{
    
  },[])

  const CreatePDF = async () => {
    console.log('create pdf')
    const Bill = {
        employee_name: user.name,
        employee_id: user.employee_id,
        invoice_id:billData.invoice_id,
        customer_name: billData.customer_name,
        customer_address: billData.customer_address,
        customer_phoneno: billData.customer_phoneno == null?"":billData.customer_phoneno,
        bill_date: moment(billData.bill_date).format("YYYY-MM-DD"),
        nature_of_job: billData.nature_of_job,
        rectification_details: billData.rectification_details,
        working_condition: billData.working_condition,
        remarks: billData.remarks,
        s_charge:billData.s_charge === 0?"Free":`Rs.${billData.s_charge}`,
        in_time: billData.in_time,
        out_time: billData.out_time,
        s_sign: billData.s_sign,
        c_sign: billData.c_sign,
        bill_type: billData.bill_type,
        name_image: billData.bill_type === "Spare"?PDFImages.image1:PDFImages.image2,
        gst:billData.bill_type === "Spare"?"GST 33BGQPS2290K1ZU":"GST 33AZDPS2175G1ZE",
        payment_method: billData.payment_method,
        signed_by: billData.signed_by
    }
    const machineHtmlData = machine.map((item)=>{
        return(
            `<tr>
                <td style="width: 300px;"><p style="font-weight: bold;">Machine Name and Model No </p></td>
                <td style="width: 300px;"><p>: ${item.machineModel}</p></td>
                <td style="width: 100px;"><p style="font-weight: bold;">SERIAL NO </p></td>
                <td><p>: ${item.partNo}</p></td>
            </tr>`
        )
    });

    let list= machineHtmlData.join('');
    
    return(
      <div>
          <Html>{htmlContent(list, Bill)}</Html>
      </div>
    )
  }

  const search = () =>{
      axios.post(AllServices.GET_BILL(), {search:searchText}).then(response=>{
        if(response.data.status == 300){
            setBillData({})
        }
        else{
            setBillData(response.data);
            console.log(response.data.id)
            // axios.get(AllServices.GET_SER_SIGN(response.data.id)).then(response=>{
            //     setSSign(response.data)
            // })
            // axios.get(AllServices.GET_CUS_SIGN(response.data.id)).then(response=>{
            //     setCSign(response.data)
            // })
            axios.get(AllServices.GET_MACHINE_DATA(response.data.id)).then(response=>{
                setMachine(response.data)
            })
        }
    }).catch(error=>{
        
    });
  }
    

    return (
    <div>
        <Grid container>

        <Grid container style={{width:'50%'}}>
            <Grid xs={4} md={4} lg={4} item style={{marginTop:10}}>
              <TextField id="outlined-basic" label="Enter Invoice ID" variant="outlined" size="small" 
              defaultValue={search}
              style={{marginRight:10}}
              onChange={(event)=>setSearchText(event.target.value)}
              />
            </Grid>
            <Grid xs={2} md={4} lg={3} item style={{marginTop:10}}>
              <Button variant="contained" style={{padding:7,width:'95%'}} onClick={search}><SearchIcon /></Button>
            </Grid>
            <Grid xs={2} md={4} lg={2} item style={{marginTop:10}}>
              <Button variant="contained" style={{padding:7,width:'100%'}} onClick={search}><PictureAsPdfIcon /></Button>
            </Grid>
          </Grid>

        </Grid>
        
    </div>
  );
}
export default Target;