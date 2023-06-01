import {React,useContext} from 'react'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from '../context/ContextProvider';
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import "./Rightheader.css"

const Rightheader = ({logclose,logoutuser}) => {
    const { account, setAccount } = useContext(LoginContext);
    return (
    <div>
        <div>
            <div className="rightheader" style={{display:"flex"}}>
                <div className="rigth_nav" style={{display:"flex"}}>
                {account ? <Avatar className="avtar2">{account.fname[0].toUpperCase()}</Avatar> :
                            <Avatar className="avtar"></Avatar>
                        }
                </div>
                {
                    account ? <h3 style={{margin:"30px 0px 0px 30px",color:"#131921"}}>{account.fname.toUpperCase()}</h3>:""
                }
            </div>
            <div className="nav_btn" onClick={()=>logclose()}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/">About us</NavLink>
                <NavLink to="/">Contact us</NavLink>
                <Divider style={{width:"100%",marginLeft:"-20px"}} />
                <br />
                <NavLink to="/">Today's Deal</NavLink>
                {
                    account ? <NavLink to="/Buynow">Your Orders</NavLink> : <NavLink to="/">Your Orders</NavLink> 
                }
                <Divider style={{width:"100%",marginLeft:"-20px"}} />
                <br />
               <div className="flag" style={{flexDirection:"column",marginLeft:"-150px"}}>
                <NavLink to="/">Settings</NavLink>
                <NavLink to="/register">Sign-Up</NavLink>
            </div>
                {
                    account ? 
                    <div className="flag" style={{marginTop:"-20px",marginLeft:"0px"}}>
                        <LogoutIcon style={{fontSize:16,marginRight:4}}/>
                        <h3 style={{cursor:"pointer",fontWeight:500,fontSize:16}} onClick={()=>logoutuser()}>Logout</h3>
                    </div>:
                    <NavLink to="/login">Sign-In</NavLink>
                }
            </div>
        </div>
    </div>
  )
}

export default Rightheader;
