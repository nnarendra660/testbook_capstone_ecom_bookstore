import React,{ useState,useEffect } from "react";
import './Common.css'
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';

const SignIn = () => {
// LOADER SECTION PART : START
    const [Udata,setUData] = useState(false);
    useEffect(()=>{
    setTimeout(() => {
        setUData(true)
      }, 2000); //2000 ms = 2 seconds.
    });
// LOADER SECTION PART : END
    // Hardik
    const location = useLocation();
    const flag = location.state?.flag || 0;
    console.log(flag,"flag");
    // Hardik
    const history = useNavigate("");
    const [logdata,setData] = useState({
        email:"",
        password:""
    });
    console.log(logdata);
    const addData = (e)=>{
        const {name,value} = e.target;
        setData(()=>{
            return{
                ...logdata,
                [name]:value
            }
        })
    };
    const senddata = async(e)=>{
        e.preventDefault();

        const { email, password} = logdata;
        const res = await fetch("/login", {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        const data = await res.json();
        console.log(data);

        if(res.status === 400 || !data){
            console.log("User not found");
            toast.warn("User not found",{position: "top-center"});
        }else{
            history("/Buynow");
            window.location.reload();
            console.log("User found");
            toast.success("User found",{position: "top-center"});
            setData({...logdata,email:"",password:""});
        }
    }
return (
    <div>
        {
      Udata ? (
        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="https://img.favpng.com/7/22/6/student-library-book-writing-motion-png-favpng-abCZt4H8ne3qf3QHkpHzubSXJ.jpg" alt="" />
                </div>
                <div className="sign_form">
                    <form method='POST'>
                        <h1>Sign-In</h1>
                        <div className="form-data">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" onChange={addData} value={logdata.email} placeholder="Enter your email" required />
                        </div>
                        <div className="form-data">
                            <label htmlFor="password">Password</label>
                            <input type="Password" name="password" id="password" onChange={addData} value={logdata.password} placeholder="Enter your password" required />
                        </div>
                        <button className="signin_btn" onClick={senddata}>Continue</button>
                    </form>
                </div>
                <div className="create_accountinfo">
                    <p>New To Bookly</p>
                    <button><NavLink to="/register" style={{textDecoration:"none"}}>Create Your Bookly Account</NavLink></button>
                </div>
            </div>
            <ToastContainer />
        </section>
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

export default SignIn;
