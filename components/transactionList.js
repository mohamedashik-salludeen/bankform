import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const TransactionList = ({ submittedData }) => {

 
 
  

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px", }} >
      <Table>
        <TableHead style={{ backgroundColor: '#2979ff', color: 'white' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "700" }}>
              Customer Name

            </TableCell>
            <TableCell sx={{ fontWeight: "700" }}> Transfer Amount</TableCell>
            <TableCell sx={{ fontWeight: "700" }}>Transfer Currency</TableCell>
            <TableCell sx={{ fontWeight: "700" }}>Reference Num</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(submittedData).map((row, id) => (
            <TableRow key={id}>
              <TableCell>{row.customerName}</TableCell>
              <TableCell>{row.transferAmount}</TableCell>
              <TableCell>{row.transferCurrency}</TableCell>
              <TableCell>{row.referenceNum}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionList;
