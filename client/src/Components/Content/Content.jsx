import React from 'react'
import './Content.css'

const Content = () => {
    return (
        <div className='Content'>
            <img src="https://images.hindustantimes.com/img/2023/01/18/1600x900/bahrisons_1674047224689_1674047243065_1674047243065.jpg" alt="" />
            <div className='p'>Hand Picked Book <br /> To Your Door. <br />
                <button type='submit' >Discover More</button> <br />
                <a href="/"><span>Discover More</span></a>
            </div>
        </div>
    );
}

export default Content
