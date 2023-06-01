
// 1] npx create-react-app client

import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from './Components/Header/Navbar';
import SignIn from './Components/Signup_Signin/SignIn';
import SignUp from './Components/Signup_Signin/SignUp';
import { Routes,Route } from 'react-router-dom';
import CartData from './Components/Cart/CartData';
import Buynow from './Components/Buynow/Buynow';
import MainContent from './Components/MainContent';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const [data,setData] = useState(false);
  useEffect(()=>{
    setTimeout(() => {
      setData(true)
    }, 2000); //2000 ms = 2 seconds.
  })
  return (
    <>
    {
      data ? (
        <>
        <div className='BookStore'>
      
      {/* 3] Create Navbar */}
      <NavBar/>
      {/* //3] create complete frontend desgin using these components */}
      <Routes>
        <Route path='/' element={<MainContent/>} />
        <Route path='/login' element={<SignIn/>} />
        <Route path='/register' element={<SignUp/>} />
        <Route path='/getProductsone/:id' element={<CartData/>} />
        <Route path='/Buynow' element={<Buynow/>} />
      </Routes>
    </div>
        </>
      ):(
        <div className='circle'>
          <CircularProgress/>
          <h2>Loading...</h2>
        </div>
      )
    }
    </>
  );
}

export default App;
