import { React, useContext, useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './NavBar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';
import Rightheader from './Rightheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import {getProducts} from '../redux/Actions/action';

const NavBar = () => {
    // const [login,setlogin] = useState(false);

    const { account, setAccount } = useContext(LoginContext);
    // console.log(account);
    const history = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
// SEARCH PRODUCT : START
    const [text,setText] = useState("");
    console.log(text);
    const [liopen,setLiopen] = useState(true);
    const {products} = useSelector(state => state.getProductsdata); 
// SEARCH PRODUCT : START

//DRAWER OPEN?CLOSE : START
    const [dropen, setDrOpen] = useState(false);
//DRAWER OPEN?CLOSE : END

    const getdetailvaliduser = async () => {
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json();
        console.log(data);
        if (res.status !== 201) {
            console.log("error")
        } else {
            // console.log("data valid");
            setAccount(data);
        }
    }
//DRAWER OPEN?CLOSE : START
    const handleopen = ()=> {
        setDrOpen(true);
    }
    const handledrclose = ()=> {
        setDrOpen(false);
    }
//DRAWER OPEN?CLOSE : START

    const Logoutuser = async () => {
        const res2 = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data2 = await res2.json();
        console.log(data2);
        if (res2.status !== 201) {
            console.log("error")
        } else {
            console.log("LogOut Successful");
            toast.success("Logout Successful",{position: "top-center"});
            history("/");
            setAccount(false);
            handleClose()
        }
    }
    const Doublefun = () => {
        setLiopen(true)
        setText('')
    }
    const getText = (items) => {
            setText(items)
            setLiopen(false)
    }

    useEffect(() => {
        getdetailvaliduser();
    },[]);


    // const send = () => {
    //     if(account){
    //         history("/")
    //     }
    // }
    return (
        <>
            <header>
                <nav>
                    <div className="Left">
                        <IconButton className='hamburgur' onClick={handleopen}>
                            <MenuIcon style={{ color: "white" }} />
                        </IconButton>
                        <Drawer open={dropen} onClose={handledrclose}>
                            <Rightheader logclose={handledrclose} logoutuser={Logoutuser}/>
                        </Drawer>
                        <div className="Nav_logo"><NavLink to="/" style={{ textDecoration: "none" }}>Bookly.</NavLink></div>
                        <div className='Nav_Search'>
                            <input type="text" name='search' value={text} onChange={(e)=>getText(e.target.value)} id='search' placeholder='Search Your Book' />
                            <div className="search_icon">
                                <SearchIcon id='Search' />
                            </div>
                            {/* {search filter} */}
                            {
                                text && 
                                <List className='extrasearch' hidden={liopen}>
                                {
                                    products.filter(product => product.title.shortTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
                                        <ListItem>
                                        <NavLink to={`/getProductsone/${product.id}`} onClick={Doublefun}>
                                        {product.title.shortTitle}
                                        </NavLink>

                                        </ListItem>
                                    ))
                                }
                                </List>
                            }
                        </div>
                    </div>
                    <div className="Right">
                        <div className="nav_btn">
                            <NavLink to="/login">SignIn</NavLink>
                        </div>
                        <div className="cart_btn">
                            {account ? <NavLink to="/Buynow">
                                <Badge badgeContent={account.carts.length} color="primary">
                                    <ShoppingCartIcon id='icon' />
                                </Badge>
                            </NavLink> : <NavLink to="/login">
                                <Badge badgeContent={0} color="primary">
                                    <ShoppingCartIcon id='icon' />
                                </Badge>
                            </NavLink>
                            }
                            <p>Cart</p>
                        </div>
                        {account ? <Avatar className="avtar2" id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}>{account.fname[0].toUpperCase()}</Avatar> :
                            <Avatar className="avtar"id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}></Avatar>
                        }
                        <div>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                                <MenuItem onClick={handleClose}><AccountCircleIcon style={{fontSize:25,marginRight:3}}/>My account</MenuItem>
                                {
                                    account ? <MenuItem onClick={Logoutuser} ><LogoutIcon style={{fontSize:20,marginRight:3,marginLeft:5}}/>Logout</MenuItem> : ""
                                }
                                
                            </Menu>
                        </div>
                    </div>
                </nav>
            </header>
            <ToastContainer/>
        </>
    )
}

export default NavBar