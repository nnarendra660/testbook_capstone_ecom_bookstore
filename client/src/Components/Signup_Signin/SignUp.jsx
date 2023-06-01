import React,{ useState,useEffect } from 'react'
import './Common.css'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';

const SignUp = () => {
// LOADER SECTION PART : START
const [Udata,setUData] = useState(false);
useEffect(()=>{
setTimeout(() => {
    setUData(true)
  }, 2000); //2000 ms = 2 seconds.
});
// LOADER SECTION PART : END

    const [udata,setUdata] = useState({
        fname:"",
        email:"",
        mobile:"",
        password:"",
        apassword:""
    });
    // console.log(udata);
    const addData = (e)=>{
        const {name,value} = e.target;
        setUdata(()=>{
            return{
                ...udata,
                [name]:value
            }
        })
    }
    const senddata = async(e)=>{
        e.preventDefault(); //page-will-not-reload
        const {fname, email, mobile, password, apassword} = udata;

        // if(fname === ""){
        //     toast.warn("Please enter your name",{
        //         position:"top-center",
        //     })
        // }else if(email === ""){
        //     toast.warn("Please enter your email",{
        //         position:"top-center",
        //     })
        // }else{
        //     const res = await fetch("register",{
        //         method:"POST",
        //         headers:{
        //             "Content-Type":"application/json"
        //         },
        //         body: JSON.stringify({
        //             fname, email, mobile, password, apassword
        //         })
        //     });
    
        //     const data = await res.json();
        //     console.log(data);
        // }

        const res = await fetch("register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                fname, email, mobile, password, apassword
            })
        });

        const data = await res.json();
        console.log(data);

        if(res.status === 422 || !data){
            // alert("no data")
            toast.warning("Invalid field please fill the above details",{position: "top-center",});
        }else{
            // alert("data successfully added");
            toast.success("Registration successfully ",{position: "top-center",});
            setUdata({...udata,fname:"",email:"",mobile:"",password:"",apassword:""}); //After Submitting form and after clicking continue btn all inputs will empty
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
                        <h1>Sign-Up</h1>
                        <div className="form-data">
                            <label htmlFor="fname">Your Name</label>
                            <input type="text" name="fname" id="fname" onChange={addData} value={udata.fname} placeholder="Enter your name" required/>
                        </div>
                        <div className="form-data">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" onChange={addData} value={udata.email} placeholder="Enter your email" required/>
                        </div>
                        <div className="form-data">
                            <label htmlFor="number">Mobile</label>
                            <input type="text" name="mobile" id="mobile" onChange={addData} value={udata.mobile} placeholder="Enter your mobile" required/>
                        </div>
                        <div className="form-data">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" onChange={addData} value={udata.password} placeholder="Enter your password" required/>
                        </div>
                        <div className="form-data">
                            <label htmlFor="apassword">Password Again</label>
                            <input type="password" name="apassword" id="apassword" onChange={addData} value={udata.cpassword} placeholder="Enter your password again" required/>
                        </div>
                        <button className="signin_btn" onClick={senddata}>Continue</button>
                        <div className="signin_info">
                            <p>Already have an account?</p>
                            <NavLink to="/login" className="In">SignIn</NavLink>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
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

export default SignUp
