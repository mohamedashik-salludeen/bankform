import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";

function SubmittedTransaction() {
    const [loginUser, setLoginUser] = useState({})
    const [totaluserDetails, settotaluserDetails] = useState([])
    const usenavigate = useNavigate();

    const NavMainpage = (e) => {
        e.preventDefault();
        usenavigate('/mainpage')
    }


    useEffect(() => {
        let userData = JSON.parse(sessionStorage.getItem("userdetails"));
        let loginUserData = []
        setLoginUser(userData)
        axios.get("http://localhost:3030/transactions")
            .then((res) => {
                if (userData.name !== "admin123") {
                    res.data.forEach((data) => {
                        if (data[userData.name]) {
                            data[userData.name].forEach((itm) => {
                                loginUserData.push(itm)
                            })
                        }
                    })
                    settotaluserDetails(loginUserData)
                }
                else {
                    res.data.forEach((data) => {
                        Object.values(data).forEach((itm) => {
                            if (itm.length) {
                                itm.forEach((datas) => {
                                    loginUserData.push(datas)
                                })
                            }
                        })
                    })

                    settotaluserDetails(loginUserData)
                }
            })
            .catch((err) => err.message)
    }, [])



    return (
        <Grid container style={{ position: "relative", top: "92px", padding: "20px" }}>
            <div className='displayTransc'>Total Transactions: <b>{totaluserDetails.length}</b></div>
            
            <Grid item xs={12} sx={{ mt: 2, }} >
            <div style={{fontSize:"20px"}}>{loginUser.name === "admin123" ? "Admin will see all the transactions of the Users" :null}</div>
            <div style={{fontSize:"22px",fontWeight:"bold",marginBottom:"10px",width:"100%",textAlign:"center"}}>Transactions History</div>
                <Table sx={{boxShadow: 3}}>
                    <TableHead style={{ backgroundColor: '#2979ff',marginTop:"10px" }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "700", color: "#fff" }}>S.No</TableCell>
                            <TableCell sx={{ fontWeight: "700", color: "#fff" }}>Reference Num</TableCell>
                            <TableCell sx={{ fontWeight: "700", color: "#fff" }}> Customer Name</TableCell>
                            <TableCell sx={{ fontWeight: "700", color: "#fff" }}>Transfer Amount</TableCell>
                            <TableCell sx={{ fontWeight: "700", color: "#fff" }}> Transfer Currency</TableCell>
                            <TableCell sx={{ fontWeight: "700", color: "#fff" }}> Beneficiary Bank</TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {totaluserDetails.map((data, ind) => {
                            return (
                                <TableRow key={ind} >
                                    <TableCell  sx={{ fontWeight: "900"}}>{ind + 1}</TableCell>
                                    <TableCell>{data.referenceNum}</TableCell>
                                    <TableCell >{data.customerName}</TableCell>
                                    <TableCell>{data.transferAmount}</TableCell>
                                    <TableCell> {data.transferCurrency}</TableCell>
                                    <TableCell>{data.beneficiaryBank}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>


                </Table>
            </Grid>

            <Grid item xs={3} >
                <Button type="submit" variant="contained" sx={{ mt: 1 }} onClick={(e) => NavMainpage(e)}>Go To MainPage </Button>
            </Grid>




        </Grid >

    );
}

export default SubmittedTransaction;
