/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from '@mui/material/Link';
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { loginElements } from "./formElements/Loginelement";
import { useNavigate } from 'react-router-dom';
import loginBackground from "./assets/loginBackground.jpg"
import Logo from "./assets/logo1.png"


function LoginForm() {

  const INIT_STATE = {
    username: "",
    password: "",
  };
  const [users, setUser] = useState(INIT_STATE)
  const usenavigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...users, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch("http://localhost:3030/users/").then((res) => {
        return res.json();
      }).then((responseData) => {

        let valuser = responseData.filter(item => item.username === users.username)
        if (valuser.length > 0) {
          toast.success('Success');
          sessionStorage.setItem('userdetails', JSON.stringify({ "name": users.username, "role": valuser[0].role }));
          usenavigate('/mainpage')
        } else {
          setUser(INIT_STATE);
          toast.error('Please Enter valid credentials');
        }
      }).catch((err) => {
        setUser(INIT_STATE);
        toast.error('Login Failed due to :' + err.message);
      });
    }

  }

  const validate = () => {
    let result = true;
    if (users.username === '' || users.username === null || users.password === '' || users.password === null) {
      result = false;
      toast.error('Fill the fields');
    }
    return result;
  }

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <Container component="main" maxWidth="xl" sx={{ paddingLeft: "0px !important", paddingRight: "0px !important", position: "absolute", top: 0, left: 0 }}>
      <Box sx={{ mt: 1 }}  >
        <form noValidate onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2} style={{
            backgroundImage: `url(${loginBackground})`, backgroundSize: "cover", backgroundRepeat: "no-repeat",
            height: "100vh"
          }}>
            <Grid item xs={9} md={5} className="loginBackground">
              <div className="logincntBlk">
                <img src={Logo} alt="logolog"></img>
                <div><b>SIGN IN TO GLOBAL BANK</b></div>
                <div>Please enter your credentials to proceed</div>
              </div>

              <Grid item xs={12} className="">
                {
                  loginElements.map((input) => {
                    return (
                      <div key={input.name} >
                        <TextField {...input} onChange={(e) => handleChange(e)} value={users[input.name]} focused />
                      </div>
                    )
                  })
                }
                <Grid container spacing={2} sx={{display:"flex",justifyContent:"center",pt:1}}>
                  <Grid item xs={6}  sx={{pt:0}}>
                    <Button type="submit" fullWidth variant="contained" className="logbtnClr" >Sign In </Button>
                  </Grid>
                  
                  <Grid item xs={12} sx={{pt:0,textAlign:"center"}}>
                    <Link href="#" underline="always">
                      {"Forgot Password"}
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>

  );
}

export default LoginForm;
