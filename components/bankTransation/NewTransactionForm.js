/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import TransactionList from './transactionList';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { toast } from "react-toastify";


function NewTransactionForm() {
  const INIT_STATE = {
    userType: "",
    referenceNum: "",
    customerName: "",
    customerNumber: "",
    customerAddress: "",
    phoneNumber: "",
    transferAmount: "",
    transferCurrency: "",
    beneficiaryBank: "",
    beneficiaryAccnum: "",
    paymentDetails: "",
    cardDetails: "",
    region: ""
  }
  const INIT_ERR_STATE = {
    fields: '',
    phoneNumber: '',
    phoneNumber_length: '',
    customerNumber: '',
    transferAmount: '',
    beneficiaryBank: '',
    paymentDetails: '',
  };

  const INIT_SUBMIT = {
    addtransaction: false,
    savetransaction: false
  }

  const [transaction, setTransaction] = useState(INIT_STATE)
  const [loginUser, setLoginUser] = useState({})
  const [totalTransaction, setTotalTransaction] = useState([])
  const [error, setError] = useState(INIT_ERR_STATE)
  const [issubmitted, setIssubmitted] = useState(INIT_SUBMIT)
  const usenavigate = useNavigate();
  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    setTransaction(prevState => ({
      ...prevState,
      userType: e.target.value
    }));
  }

  const NavMainpage=(e)=>{
    e.preventDefault();
    usenavigate('/mainpage')
}

  const saveTransaction = (e) => {
    e.preventDefault()
    if (totalTransaction.length) {
  
     let sendObject = { [loginUser.name]: totalTransaction }

      setIssubmitted(prevState => ({
        ...prevState,
        addtransaction: false,
        savetransaction: true
      }));
      axios.post("http://localhost:3030/transactions",sendObject)
        .then((res) => res.data)
        .catch((err) => err.message)
    }
    else {
      toast.error("pls add into transaction")
    }
  }

  const addNewform = (e) => {
    e.preventDefault()
    if (isValidSearch()) {
      setTotalTransaction([...totalTransaction, transaction])
      setTransaction(prevState => ({
        ...prevState,
        transferAmount: "",
        transferCurrency: "",
        beneficiaryBank: "",
        beneficiaryAccnum: "",
        paymentDetails: "",
        cardDetails: "",
        region: ""
      }))

      setIssubmitted(prevState => ({
        ...prevState,
        addtransaction: true,
      }));
    }
  }




  const isValidSearch = () => {
    let errors = true

    let objval = Object.values(transaction)

    if (objval.includes("")) {
      setError(prevState => ({
        ...prevState,
        fields: 'Fill the fields',
      }));

      errors = false;
    } else {
      setError(prevState => ({
        ...prevState,
        fields: '',
      }));
    }

    if (isNaN(transaction.phoneNumber)) {
      setError(prevState => ({
        ...prevState,
        phoneNumber: "Phone number must be a Number",
      }));
      errors = false;
    }
    else {
      setError(prevState => ({
        ...prevState,
        phoneNumber: '',
      }));
    }

    if (transaction.phoneNumber.length !== 10) {
      setError(prevState => ({
        ...prevState,
        phoneNumber_length: "Phone number must be 10 digits",
      }));
      errors = false;
    } else {
      setError(prevState => ({
        ...prevState,
        phoneNumber_length: '',
      }));
    }


    if (isNaN(transaction.customerNumber)) {
      setError(prevState => ({
        ...prevState,
        customerNumber: "Customer Number must be a Number",
      }));
      errors = false;
    } else {
      setError(prevState => ({
        ...prevState,
        customerNumber: '',
      }));
    }

    if (isNaN(transaction.transferAmount)) {
      setError(prevState => ({
        ...prevState,
        transferAmount: "Transfer Amount must be a Number",
      }));
      errors = false;
    } else {
      setError(prevState => ({
        ...prevState,
        transferAmount: '',
      }));
    }

    if (isNaN(transaction.beneficiaryAccnum)) {
      setError(prevState => ({
        ...prevState,
        beneficiaryAccnum: "beneficiary Accnum must be a Number",
      }));
      errors = false;
    } else {
      setError(prevState => ({
        ...prevState,
        beneficiaryAccnum: '',
      }));
    }


    if (!transaction.beneficiaryBank.match(/^[a-z][a-z\s]*$/)) {
      setError(prevState => ({
        ...prevState,
        beneficiaryBank: "Beneficiary Bank must be a Letter"
      }));
      errors = false;
    } else {
      setError(prevState => ({
        ...prevState,
        beneficiaryBank: '',
      }));
    }

    if (!transaction.paymentDetails.match(/^[a-zA-Z]*$/)) {
      setError(prevState => ({
        ...prevState,
        paymentDetails: "Payment Details must be a Letter",
      }));
      errors = false;
    } else {
      setError(prevState => ({
        ...prevState,
        paymentDetails: '',
      }));
    }



    return errors



  };


  useEffect(() => {
    let sessionUser = JSON.parse(sessionStorage.getItem('userdetails'));
    setLoginUser(sessionUser)
   
    axios.get("http://localhost:3030/users")
      .then((res) => {


        let valuser = res.data.filter(item => item.username === sessionUser.name)
        setTransaction(prevState => ({
          ...prevState,
          customerName: valuser[0].username,
          customerNumber: valuser[0].customerNumber,
          referenceNum: valuser[0].referenceNum,
          userType: valuser[0].role,
          customerAddress: valuser[0].customerAddress,
          phoneNumber: valuser[0].phoneNumber,
        }))
      }

      )
      .catch((err) => err.message)


  }, [])




  return (
    <Container component="main" maxWidth="md" style={{position:"relative",top:"92px"}}>

      <form>
        <Grid container>

          <Grid container sx={{ boxShadow: 3, my: 2, p: 2 }} >
            <Grid item xs={12} color="green" >{totalTransaction.length && issubmitted.addtransaction ? "Form: " + totalTransaction.length + " Added if you want to submit or Add transaction" : null} </Grid>
            <Grid item xs={12} >{
              Object.values(error).length ?
                Object.values(error).map((data, id) => {
                  return (
                    <Grid item xs={12} key={id}>
                      <Grid item xs={12} color="red">{data}</Grid>
                    </Grid>
                  )
                }) : null}
            </Grid>
            <Grid item xs={12} >
              <RadioGroup row sx={{ ml: 1, mt: 1 }} onClick={(e) => handleClick(e)} name="userType" >
                <FormControlLabel value="New user" control={<Radio checked={transaction.userType === "New user"} />} label="New" />
                <FormControlLabel value="Existing user" control={<Radio checked={transaction.userType === "Existing user"} />} label="Existing" />
              </RadioGroup>
            </Grid>


            <Grid item xs={12}>
              <TextField
                name="referenceNum"
                label="Reference Number"
                margin="dense"
                variant="outlined"
                fullWidth
                required
                size="small"
                value={transaction.referenceNum}
                onChange={(e) => handleChange(e)}
              />
              <Grid container spacing={1} >
                <Grid item xs={6}>
                  <TextField
                    name="customerNumber"
                    label="customer Number"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                    value={transaction.customerNumber}
                    onChange={(e) => handleChange(e)}
                  />
                  <TextField
                    name="customerName"
                    label="customer Name"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                    value={transaction.customerName}
                    onChange={(e) => handleChange(e)}
                  />

                  <TextField
                    name="customerAddress"
                    label="custome Address"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                    value={transaction.customerAddress}
                    onChange={(e) => handleChange(e)}
                  />
                  <TextField
                    name="phoneNumber"
                    label="phone Number"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                    value={transaction.phoneNumber}
                    onChange={(e) => handleChange(e)}
                  />
                  <TextField
                    name="transferAmount"
                    label="transfer Amount"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                    value={transaction.transferAmount}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Grid item xs={12} sx={{ mt: 1, pb: 0.5 }}>
                    <FormControl fullWidth  >
                      <InputLabel size="small" >transfer Currency</InputLabel>
                      <Select value={transaction.transferCurrency} margin="dense" defaultValue="" name="transferCurrency" label="transfer Currency" size="small" onChange={(e) => handleChange(e)}>
                        <MenuItem value={"AED"}>AED</MenuItem>
                        <MenuItem value={"EUR"}>EUR</MenuItem>
                        <MenuItem value={"CHF"}>CHF</MenuItem>
                        <MenuItem value={"MUR"}>MUR</MenuItem>
                        <MenuItem value={"USD"}>USD</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <TextField
                    name="beneficiaryBank"
                    label="beneficiaryBank"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                    value={transaction.beneficiaryBank}
                    onChange={(e) => handleChange(e)}
                    inputProps={{ style: { textTransform: "uppercase" } }}
                  />
                  <TextField
                    name="beneficiaryAccnum"
                    label="beneficiary Account Number"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                    value={transaction.beneficiaryAccnum}
                    onChange={(e) => handleChange(e)}
                  />

                  <TextField
                    name="paymentDetails"
                    label="payment Details"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required

                    size="small"
                    value={transaction.paymentDetails}
                    onChange={(e) => handleChange(e)}
                  />

                  <TextField
                    name="cardDetails"
                    label="cardDetails"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                    value={transaction.cardDetails}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
              </Grid>
            </Grid>


            <Grid item xs={12} sx={{ mt: 1 }} >
              <FormControl fullWidth  >
                <InputLabel size="small" >Region</InputLabel>
                <Select value={transaction.region} defaultValue="" name="region" label="Region" size="small" onChange={(e) => handleChange(e)}>
                  <MenuItem value={"Port Louis"}>Port Louis</MenuItem>
                  <MenuItem value={"Curepipe"}>Curepipea</MenuItem>
                  <MenuItem value={"Port Mathurin"}>Port Mathurin</MenuItem>
                  <MenuItem value={"Vacoas"}>Vacoas</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>


        </Grid>
      </form>

      <Grid container  >
        <Grid item xs={6} md={4} >
          <Button type="submit" variant="contained" sx={{ mt: 1 }} onClick={(e) => saveTransaction(e)}>Submit </Button>
        </Grid>
        <Grid item xs={6}  md={4} className="grifBtn2">
          <Button type="submit" variant="contained" sx={{ mt: 1 }} onClick={(e) => addNewform(e)}>Add Transaction  </Button>
        </Grid>
        <Grid item xs={12} md={4} className="grifBtn3">
        <Button type="submit" variant="contained" sx={{ mt: 1,float:"right" }}  onClick={(e) => NavMainpage(e)}>Go To MainPage </Button>
        </Grid>
      </Grid>


      <Grid container >
        <Grid item xs={12} >
          {
            issubmitted.savetransaction ? (<TransactionList submittedData={totalTransaction}></TransactionList>) : null
          }

        </Grid>
      </Grid>

    </Container>
  );
}

export default NewTransactionForm;



