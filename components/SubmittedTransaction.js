import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from "@mui/material/Grid";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";

function SubmittedTransaction() {
    const [loginUser, setLoginUser] = useState({})
    const [totaluserDetails, settotaluserDetails] = useState([])
   

    useEffect(() => {
        let userData = JSON.parse(sessionStorage.getItem("userdetails"));
        setLoginUser(userData)

        axios.get("http://localhost:3001/transactions")
            .then((res) => {
                settotaluserDetails(res.data)

            })
            .catch((err) => err.message)



    }, [])
    return (
        <Grid container  >
            <Typography style={{marginTop:"20PX",paddingLeft:"20PX"}}>Welcome : {loginUser.role ==="adminUser"?  <b>{loginUser.name}</b>:loginUser.name}</Typography>
            <Grid item xs={12} sx={{ mt: 3 }} >
                <Table>
                    <TableHead style={{ backgroundColor: '#2979ff', color: 'white' }}>
                        <TableRow>

                            <TableCell sx={{ fontWeight: "700" }}>Sno</TableCell>
                            <TableCell sx={{ fontWeight: "700" }}>Total Data</TableCell>
                        </TableRow>
                    </TableHead>
                 
                   <TableBody>
                        {totaluserDetails.map((data, ind) => {
                            return (
                                <TableRow key={ind}>
                                    <TableCell>{ind}</TableCell>
                                    <TableCell>{JSON.stringify(data)}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                   

                </Table>
            </Grid>
        </Grid>

    );
}

export default SubmittedTransaction;