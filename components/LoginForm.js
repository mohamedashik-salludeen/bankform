/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { loginElements } from "./formElements/Loginelement";
import { useNavigate } from 'react-router-dom';
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
      fetch("http://localhost:3001/users/").then((res) => {
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
    <Container component="main" maxWidth="sm">
      <Box
        sx={{ boxShadow: 4, borderRadius: 2, px: 2, py: 4, marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center", }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" sx={{ mt: 1, width: "520px" }} noValidate onSubmit={handleSubmit}>

          {
            loginElements.map((input) => {
              return (
                <div key={input.name}>
                  <TextField {...input} onChange={(e) => handleChange(e)} value={users[input.name]} />
                </div>
              )
            })
          }

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Sign In </Button>
        </Box>
      </Box>

      <Typography style={{marginTop:"10px"}}>
        {JSON.stringify({
          "role": "adminUser",
          "username": "admin123",
          "password": "aduser123"
        })}
        {JSON.stringify({
          "role": "Existing user",
          "username": "exist123",
          "password": "custom123",
         
        },
        )}

        {JSON.stringify({
          "role": "Existing user",
          "username": "exist500",
          "password": "custom123",
         
        })}
      </Typography>
    </Container>

  );
}

export default LoginForm;