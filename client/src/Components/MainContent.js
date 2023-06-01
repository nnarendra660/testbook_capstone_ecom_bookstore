import React,{ useState,useEffect } from "react";
import Content from './Content/Content'
import Banner from './Banner/Banner'
import PData from './ProductData/Prod';
import TodayDeal from './ProductData/TodayDeal.jsx'
import './MainC.css'
import BookAd from './BookAd/BookAd';
import Footer from './Footer/Footer';
import CircularProgress from '@mui/material/CircularProgress';

const MainContent = () => {
  // LOADER SECTION PART : START
  const [Udata,setUData] = useState(false);
  useEffect(()=>{
  setTimeout(() => {
      setUData(true)
    }, 2000); //2000 ms = 2 seconds.
  });
// LOADER SECTION PART : END
  return (
    <>
        {
      Udata ? (
    <div className='Main'>
      <Content/>
      <div className='Slide_part'>
      <div className='left_slide'>
        <PData title="Upto 80% off"/>
        <br/>
        <Banner/>
      </div>
      <div className="right_slide">
          <div className='SideC'>
          <h4 className='text'>Festive latest launches</h4>
          <img src="https://m.media-amazon.com/images/I/410OFLWe-kL._SX362_BO1,204,203,200_.jpg" alt="rightimg" />
          <a href="/">See more</a>
          </div>
          <div className='SideC'>
          <h4 className='text'>Festive latest launches</h4>
          <img src="https://m.media-amazon.com/images/I/51Vygv5iFmL._SX482_BO1,204,203,200_.jpg" alt="rightimg" />
          <a href="/">See more</a>
          </div>
      </div>
    </div>
    <TodayDeal title="Today's Deal's"/>
    <BookAd/>
    <Footer/>
    </div>
    ):(
      <div className='circle'>
      <CircularProgress/>
      <h2>Loading...</h2>
      </div>
  )
  }
    </>
  )
}

export default MainContent
