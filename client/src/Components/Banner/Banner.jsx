import React from 'react'
import './Banner.css'
import Carousel from 'react-material-ui-carousel'
// import { Paper, Button } from '@mui/material'

const data = [
    "https://static.wixstatic.com/media/2da3b0_2809c55ae8b4488fa35b6ee2d69c558d~mv2.jpg/v1/fill/w_560,h_234,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/FlyBookslide.jpg",
    "https://media.licdn.com/dms/image/C5616AQH8deXg78xCgw/profile-displaybackgroundimage-shrink_200_800/0/1659638360147?e=2147483647&v=beta&t=NAXKGSz3E-xlXMXkzN5c0_dhhpLEQ1F__MM1sJW4Z-M",
    "https://images.twinkl.co.uk/tw1n/image/private/t_630_eco/image_repo/06/54/au-l-53135-book-week-reading-quote-display-posters_ver_2.webp",
    "https://www.shutterstock.com/image-vector/book-store-banners-young-man-260nw-2201541613.jpg",
    "https://www.shutterstock.com/image-vector/bookstore-posters-set-design-advertisement-260nw-2248243605.jpg",
    "https://as2.ftcdn.net/v2/jpg/04/32/32/87/1000_F_432328795_gyl6zdxtuKrwTDLSOgLF2NfnHNLkg1oC.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/021/916/224/small/promo-banner-with-stack-of-books-globe-inkwell-quill-plant-lantern-ebook-world-book-day-bookstore-bookshop-library-book-lover-bibliophile-education-for-poster-cover-advertising-vector.jpg",
    "https://t4.ftcdn.net/jpg/04/32/09/47/360_F_432094739_d3zh1pvGancmEPkQyTfGXvJ174sdV2Yy.jpg",
    "https://as2.ftcdn.net/v2/jpg/04/31/66/65/500_F_431666535_J8gf5Eh9sMcpbFda70RkutR8JO9Lqrh0.jpg",
    "https://t4.ftcdn.net/jpg/04/32/09/49/360_F_432094966_9FkDdIbvTStR93EzUiL5iWlkLnfnRqPQ.jpg"
]
const Banner = () => {
    return (
        <div>
            <Carousel className='carasousel' autoPlay={true} animation='slide' fullHeightHover={true} indicators={false} navButtonsAlwaysVisible={true} cycleNavigation={true} navButtonsProps={{style
            :{backgroundColor:"#fff",color:"#494949",borderRadius:0,marginTop:-22,height:"104px"}}}>
                {
                    data.map((imag,i)=>{
                        return(
                            <div key={i}>
                                <img src={imag} alt="" className='banner_img' />
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default Banner
