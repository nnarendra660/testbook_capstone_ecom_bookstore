import React, { useEffect, useState } from 'react'
import './Buynow.css'
import { Divider } from '@mui/material';
import Option from './Option';
import Subtotal from './Subtotal';
import Right from './Right';
import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';

const Buynow = () => {
  const [cartdata,setCartdata] = useState("");
  // console.log(cartdata);
// LOADER SECTION PART : START
  const [data,setData] = useState(false);
  useEffect(()=>{
    setTimeout(() => {
      setData(true)
    }, 2000); //2000 ms = 2 seconds.
  });
// LOADER SECTION PART : START
  const getdatabuy = async()=>{
    const res = await fetch("/cartdetails",{
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:"include"
    });
    const data = await res.json();
    if(res.status !== 201){
      console.log("error");
    }else{
      setCartdata(data.carts);
    }
  }
  useEffect(()=>{
    // setTimeout(getdatabuy,2000);
    getdatabuy();
  },[]);
  
  return (
    <div>
      {
      data ? (
        <div>
    { cartdata.length ? <div className="buynow_section">
    <div className="buynow_container">
        <div className="left_buy">
            <h1>Shopping Cart</h1>
            <p style={{textAlign:"left"}}>Select all items</p>
            <Divider />
            {
              cartdata.map((e, k)=>{ 
                return (
                  <div>
                    <div className="item_containert">
                                <img src={e.cart.url} alt="imgitem" />
                                <div className="item_details">
                                    <h3>{e.cart.title.shortTitle}</h3>
                                    <h3 style={{color:"#565959"}}>{e.cart.title.longTitle}</h3>
                                    <h3 className="diffrentprice">{e.cart.price.discount}</h3>
                                    <p className="unusuall" style={{textAlign:"left"}}>Usually dispatched in 8 days.</p>
                                    <p style={{textAlign:"left"}}>Eligible for FREE Shipping</p>
                                    {/* <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="logo" /> */}
                                    
                                    <Option deletedata={e.cart.id} get={getdatabuy}/>
                                
                                <span className="leftbuyprice"><h3 className="item_price">Price : {e.cart.price.mrp}</h3></span>
                                </div>
                            </div>
                            <Divider />
                  </div>
                )
              })
            }     
            <br />
                        <Subtotal iteam={cartdata}/>
        </div>
        <Right iteam={cartdata} />
    </div>
  </div> : ""
  }
  </div>
  ):(
    <div className='circle'>
      <CircularProgress/>
      <h2>Loading...</h2>
    </div>
  )
}
  </div>
  )
}

export default Buynow;