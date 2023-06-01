import React,{ useEffect } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import { products } from "./ProductDetails";
import './Product.css'
import {getProducts} from '../redux/Actions/action';
import {useDispatch,useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 1,
    }
}

// const sendata = ()=>{
//     navigation("/",{state:e.id})
// }

const PData = ({title}) => {
    const {products} = useSelector(state => state.getProductsdata);
    console.log("data from backend" + products);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProducts());
    },[dispatch]);

    return (
        <div className='con'>
            <div className='Deal'>
                <div className='text'>{title}</div>
                <div className='View'>View All</div>
            </div>
            <Carousel
            responsive={responsive}
            infinite={true}
            draggable={false}
            swipeable={true}
            showDots={false}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            showArrows={false}
            className='Carousel'
            >
                {
                    products.map((e) => {
                        return (
                            <NavLink to={`/getProductsone/${e.id}`} style={{textDecoration:"none"}}>
                            <div>
                                <div className='card'>
                                    <div className='pi'>
                                        <img className='product-Image' src={e.url} alt="product" />
                                    </div>
                                    <h2>{e.title.shortTitle}</h2>
                                    <p className='price'>{e.price.mrp}<span>Deal of the Day</span>  </p>
                                    <p>{e.title.longTitle}</p>
                                    <button>Add to cart</button>
                                </div>
                            </div>
                            </NavLink>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default PData;