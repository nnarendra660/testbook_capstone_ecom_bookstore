
import React, {useContext, useState, useEffect, } from 'react'
import './cart.css'
import { Divider } from '@mui/material';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { LoginContext } from '../context/ContextProvider';


const Cart = () => {

  
  // console.log(id);
  const {id} = useParams("");
  const history = useNavigate("");
  const {setAccount} = useContext(LoginContext)
  const [inddata,setInddata] = useState("");
  // console.log(inddata);
  const getinddata = async()=>{
    const res = await fetch(`/getProductsone/${id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    });
    const data = await res.json();
    // console.log(data);
    if(res.status !== 201){
      console.log("No Data Available");
    }else{
      console.log("GetData");
      setInddata(data);
    }
  }
  useEffect(()=>{
    // console.log(id,"id");
    setTimeout(getinddata,1000)
  },[id]);
  //add to cart button onclick function
  const addtocart = async(id)=>{
    console.log(id);
    const check = await fetch(`/addcart/${id}`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          inddata
      }),
      credentials: "include"
  });
    const data1 = await check.json();
    // console.log(data1 + "frontend data");

    if(check.status === 401 || !data1){
      console.log("User Invalid");
      alert("User Invalid");
    }else{
      alert("data added successfully to user cart");
      history("/Buynow");
      setAccount(data1); //value pass to setAccount
    }
  }
  return (
    <div className='cart_section'>
    
    { inddata && Object.keys(inddata).length && 

      <div className="cart_container">
        <div className="left_cart">
            <img src={inddata.url} alt="" />
          <div className="cart_btn">
            <button className='cart_btn1' onClick={()=>addtocart(inddata.id)}>Add to Cart</button>
            <NavLink to="/Buynow"><button className='cart_btn2'>Buy Now</button></NavLink>
          </div>
        </div>
        <div className="right_cart">
          <h3>{inddata.title.shortTitle}</h3>
          <h4>{inddata.title.longTitle}</h4>
          <Divider/>
          <p className='mrp'>M.R.P : {inddata.price.mrp}</p>
          
          <div className="discount_box">
            <h5 >Discount : <span style={{ color: "#111" }}>{inddata.price.discount}</span> </h5>
            <h4>FREE Delivery : <span style={{ color: "#111", fontWeight: "600" }}>Oct 8 - 21</span> Details</h4>
            <p style={{ color: "#111" }}>Fastest delivery: <span style={{ color: "#111", fontWeight: "600" }}> Tomorrow 11AM</span></p>
          </div>
          <p className="description">About the Item : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}></span></p>
        </div>
      </div>
    }
    {
      !inddata ? <div className='circle'>
      <CircularProgress/>
      <h2>Loading...</h2>
    </div>:""
    }
    </div>
);
}

export default Cart;
