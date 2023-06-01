import React, { useEffect, useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Right = ({iteam}) => {
  const [price,setPrice] = useState(0);

  function getPrice(val){
    let amount;
    for (let index = 0; index < val.length; index++) {
      if(val[index] === "$"){
        amount = val.slice(index+1,val.length);
        break;
      }
    } 
    // console.log(amount);
    return Number(amount)
  }
  
  const totalAmount = () => {
    let value = 0;
    // console.log(iteam)
    iteam.map((item)=>{
      const curamount = getPrice(item.cart.price.mrp);
      value = curamount + value
    });
    const finalVal = value.toFixed(2);
    setPrice(finalVal);
  }
  useEffect(()=>{
    totalAmount();
  },[iteam])
  return (
    <div className="right_buy">
    <div className="cost_right">
    <img src="https://img.favpng.com/7/22/6/student-library-book-writing-motion-png-favpng-abCZt4H8ne3qf3QHkpHzubSXJ.jpg" alt="rightimg" />
        <p>Your order is eligible for FREE Delivery. <br />
            <span style={{ color: "#565959" }}> Select this option at checkout. Details</span></p>
        <h3>Subtotal ({iteam.length}-items)&nbsp;: <span style={{ fontWeight: "700" }}>$&nbsp;{price}</span></h3>
        <button className="rightbuy_btn" >Proceed to Buy</button>
        <div className="emi">
            <div>Emi Available</div><div><KeyboardArrowUpIcon/></div>
        </div>
        <span > Your order qualifies for EMI with valid credit cards (not available on purchase of Gold,
            Jewelry, Gift cards and Amazon pay balance top up). Learn more</span>
    </div>
</div>
  )
}

export default Right
