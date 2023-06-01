import React from 'react'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import PinDropIcon from '@mui/icons-material/PinDrop';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './Footer.css'
const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div>
        <div className='footer'>
            <div className="Quick_links">
                <p className='head'>QUICK LINKS</p>
                <span>Home</span>
                <span>About</span>
                <span>Shop</span>
                <span>Contact</span>
            </div>
            <div className="Extra_links">
                <p className='head'>EXTRA LINKS</p>
                <span>Login</span>
                <span>Register</span>
                <span>Cart</span>
                <span>Orders</span>
            </div>
            <div className="Contact_info">
                <p className='head'>CONTACT INFO</p>
                <div className='contact'>
                    <div className='icon'><LocalPhoneIcon  fontSize='small'/></div>
                    <div>+123-456-7890</div>
                </div>
                <div className='contact'>
                    <div className='icon'><LocalPhoneIcon fontSize='small'/></div>
                    <div>+111-222-3333</div>
                </div>
                <div className='contact'>
                    <div className='icon'><EmailIcon fontSize='small'/></div>
                    <div> Sourabhpote007@gmail.com</div>
                </div>
                <div className='contact'>
                    <div className='icon'><PinDropIcon  fontSize='small'/></div>
                    <div> Kolhapur,India - 416502</div>
                </div>

            </div>
            <div className="Follow_Us">
                <p className='head'>FOLLOW US</p>
                <div className='contact'>
                    <div className='icon'><FacebookIcon fontSize='small'/></div>
                    <div>facebook</div>
                </div>
                <div className='contact'>
                    <div className='icon'><TwitterIcon fontSize='small'/></div>
                    <div>Twitter</div>
                </div>
                <div className='contact'>
                    <div className='icon'><InstagramIcon fontSize='small'/></div>
                    <div> Instagran</div>
                </div>
                <div className='contact'>
                    <div className='icon'><LinkedInIcon fontSize='small'/></div>
                    <div>LinkedIn</div>
                </div>
            </div>

        </div>
        <div className='f_end'>Conditons of Use & Sale  &nbsp; &nbsp; Privacy Notice  &nbsp; &nbsp; Interest-Based Ads  &nbsp; &nbsp; © Copyright @ 2023-{year} By <span>&nbsp; Mr. Sourabh Pote &nbsp;</span></div>
        </div>
    )
}

export default Footer
