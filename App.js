import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginForm from './components/bankTransation/LoginForm';
import NewTransactionForm from './components/bankTransation/NewTransactionForm';
import TransactionList from './components/bankTransation/transactionList';
import Mainpage from './components/bankTransation/Mainpage';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SubmittedTransaction from './components/bankTransation/SubmittedTransaction';
import "./App.css"
import logoBank from "./components/bankTransation/assets/logoBank.png"

const App = () => {




  return (
    <div className="App">
      <AppBar position="fixed" style={{ padding: "10px", }}>
        <Toolbar>
          <img
            src={logoBank}
            alt="Logo"
            style={{ maxWidth: "100%", width: "210px" }}
          />

        </Toolbar>
      </AppBar>
      <ToastContainer theme='light' position='top-right'></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm />}></Route>
          <Route path='/mainpage' element={<Mainpage />}></Route>
          <Route path='/newtransaction' element={<NewTransactionForm />}></Route>
          <Route path='/TransactionList' element={<TransactionList />}></Route>
          <Route path='/SubmittedTransaction' element={<SubmittedTransaction />}></Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
};

export default App;

