import { React,useContext } from 'react'
import { LoginContext } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';

const Option = ({deletedata,get}) => {

  const {setAccount } = useContext(LoginContext);

  const removedata = async(req,res)=>{
    try {
      const res = await fetch(`/remove/${deletedata}`,{
        method:"DELETE",
        headers:{
          Accept:"application/json",
          "Content-type":"application/json"
        },
        credentials:"include"
      });
      const data = await res.json();
      console.log(data);

      if(res.status === 400 || !data){
        console.log("error");
      }else{
        toast.success("item deleted from your cart",{position: "top-center"});
        console.log("item deleted from your cart");
        setAccount(data); //badge value will be Update While User Delete Item From Carts.
        get();
      }
    } catch (error) {
      console.log("error");
    }
  }
  return (
    <div className='add_remove_select'>
    <select >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
    </select>
    <p style={{cursor:"pointer"}} onClick={() => removedata (deletedata) }>Delete </p><span>|</span>
    <p style={{cursor:"pointer"}} className='forremovemdeia'>Save Or Later</p><span>|</span>
    <p className='forremovemdeia'style={{cursor:"pointer"}}>See More Like This</p>
    <ToastContainer />
    </div>
  )
}

export default Option;
