/* eslint-disable array-callback-return */
import React,{useEffect,useState} from "react";
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";

function Mainpage() {
    const[loginUser,setLoginUser]=useState({})
    const usenavigate=useNavigate();

    const newtransaction=(e)=>{
       e.preventDefault()
       usenavigate('/newtransaction')
    }

    const submitPage=(e)=>{
        e.preventDefault()
        usenavigate('/SubmittedTransaction')
    }

    const logOutchk=(e)=>{
        e.preventDefault()
        usenavigate('/')
        toast.error("session expired")
    }
const Item = styled(Paper)(({ theme }) => ({
   
     padding: theme.spacing(1),
    backgroundColor:  '#1A2027',
    textAlign: 'center',
    color: "#fff",
    height:"150px",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    cursor:"pointer"
  }));

useEffect(()=>{
    let userData = JSON.parse(sessionStorage.getItem("userdetails"));
    setLoginUser(userData)
        
},[])

    return (
        <Box sx={{p:3}}>
            <Typography component="h1" variant="h5">Welcome <span style={{color:"green"}}>{loginUser.name}</span></Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{marginTop:"10px"}}>
                <Grid item xs={6} onClick={(e)=>newtransaction(e)} > <Item>New Transaction</Item></Grid>
                <Grid item xs={6}  onClick={(e)=>submitPage(e)}><Item>Submitted Transaction</Item></Grid>
            </Grid>
            <Button type="submit" variant="contained" sx={{ mt: 3 }} onClick={(e)=>logOutchk(e)} >Logout</Button>
        </Box>

    );
}

export default Mainpage;