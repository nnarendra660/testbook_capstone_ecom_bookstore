import React, { useEffect, useState } from 'react'

const Subtotal = ({iteam}) => {
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
    <div className="sub_item">
            <h3>Subtotal ({iteam.length}-iteams) :&nbsp;<strong style={{ fontWeight: "700", color: "#111",marginTop: "50px" }}>$&nbsp;{price}</strong></h3>
        </div>
)
}

export default Subtotal;
