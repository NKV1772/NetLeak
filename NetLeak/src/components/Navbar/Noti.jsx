import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './navbar.css'
import React from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import image from '../../assets/images/landscape.jpg'

const Noti = () => {
    const seenNoti = {
        //color: 'rgb(175,175,175)'
    }
    return (
        <>
            <div className='noti'>
                <img
                    src={image}
                />
                <div className='noti-content' >
                    <p className='title' style={seenNoti}>Violet Evergarden</p>
                    <p className='update' style={seenNoti}>"Phát sóng tập 2"</p>
                    <p className='time' style={seenNoti}>3 giờ trước</p>
                </div>
            </div>
        </>
    );
}

export default Noti;