import * as React from 'react';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const useStyles = makeStyles({
    count: {
        backgroundColor:'#0f1d6b',
        padding:20,
        fontSize:20,
        fontWeight:'bold',
        color:'#fff',
        borderRadius:15
    }
});

export default function SearchBill() {
    const classes = useStyles();
    return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item sm={6} xs={12} lg={12}>
                <TextField id="outlined-basic" label="Enter Invoice Id or Customer Phone number" variant="outlined" size="Normal" style={{width:'80%'}} />
                <Button variant="contained" style={{width:'20%',padding:15}}>Search</Button>
        </Grid>
        <Grid item sm={6} xs={12} lg={12}>
            <Item>
                <span style={{color:'#333'}}>Total Services in Branch 2</span>
            </Item>
        </Grid>
      </Grid>
    </Box>
  );
}