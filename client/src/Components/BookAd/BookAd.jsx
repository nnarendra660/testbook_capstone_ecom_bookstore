import React from 'react'
import './BookAd.css'

const BookAd = () => {
    return (
        <div className='BookAd'>
            <div className="LeftAd">
                <div className="New">New Release</div>
                <div className='title'>This Dark <br /> Road to Mercy</div>
                <div className='passage'>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</div>
                <div className="purchase">$6.75 - Purchase</div>
                <div className="Read">Read On Kindle</div>
            </div>
            <div className="RightAd">
                <div className='res'>
                <img src="https://websitedemos.net/kathryn-ebook-author-02/wp-content/uploads/sites/1020/2022/02/hero-image01.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default BookAd
