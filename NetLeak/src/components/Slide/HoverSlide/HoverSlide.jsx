import './HoverSlide.css'
import React, { useState } from 'react'
import m1 from '../../../assets/movies/1.jpg'


const HoverSlide = ({ image }) => {
    const [hoverDetail, setHoverDetail] = useState(false)

    function showDetail() {
        setHoverDetail(!hoverDetail)
    }

    return (
        <div className='hoverslide-container' onClick={showDetail}>
            <img
                src={m1}
                alt='movie'
            />
            {hoverDetail && (
                <div className='ok'>
                    <p>Violet Evergarden</p>
                    <ul>
                        <li>Anime</li>
                        <li>Tình cảm</li>
                        <li>Hài hước</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default HoverSlide;